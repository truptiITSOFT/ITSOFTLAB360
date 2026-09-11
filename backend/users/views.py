# from django.shortcuts import render
# from django.contrib.auth import get_user_model
# from .serializers import UserSerializer
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import generics, status, permissions, viewsets

# User = get_user_model()
from rest_framework_simplejwt.tokens import RefreshToken
from decimal import Decimal
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models import Q, Sum, Count
from django.utils import timezone
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import status, viewsets, generics, permissions
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import filters

from .models import (
    Products,
    Franchise,
    Invoice,
    FranchiseRequest,
)

from .serializers import (
    UserSerializer,
    ProductsSerializer,
    FranchiseSerializer,
    InvoiceSerializer,
    FranchiseRequestSerializer,
    FranchiseUserProfileSerializer,
)

from .models import FranchiseUserProfile


User = get_user_model()


# ============================================================
# COMMON PERMISSION HELPERS
# ============================================================

def is_internal_user(user):
    """
    Internal ITSOFTLAB360 users.
    """
    return (
        user.is_authenticated
        and user.role in [
            "IT",
            "Admin",
            "Sales",
            "Accountant",
        ]
    )


def is_it(user):
    return (
        user.is_authenticated
        and user.role == "IT"
    )


def is_admin(user):
    return (
        user.is_authenticated
        and user.role == "Admin"
    )


def is_sales(user):
    return (
        user.is_authenticated
        and user.role == "Sales"
    )


def is_accountant(user):
    return (
        user.is_authenticated
        and user.role == "Accountant"
    )


def can_manage_products(user):
    return (
        is_it(user)
        or is_admin(user)
    )


def can_manage_franchises(user):
    return (
        is_it(user)
        or is_admin(user)
    )


def can_manage_invoices(user):
    return (
        is_accountant(user)
        or is_admin(user)
    )


# ============================================================
# USER VIEWSET
# ============================================================

class UserViewSet(viewsets.ModelViewSet):
    """
    Internal ITSOFTLAB360 users.

    Roles:
        IT
        Admin
        Sales
        Accountant
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "role",
        "is_active",
    ]

    search_fields = [
        "username",
        "first_name",
        "last_name",
        "email",
    ]

    ordering_fields = [
        "date_joined",
        "username",
        "email",
    ]

    def get_queryset(self):
        user = self.request.user

        # Admin and IT can see internal users
        if user.role in ["IT", "Admin"]:
            return User.objects.all().order_by("-date_joined")

        # Other roles should only see themselves
        return User.objects.filter(
            id=user.id
        )

    def create(self, request, *args, **kwargs):

        if request.user.role not in ["IT", "Admin"]:
            return Response(
                {
                    "error": "Only IT or Admin users can create internal users."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        return Response(
            self.get_serializer(user).data,
            status=status.HTTP_201_CREATED,
        )

    def destroy(self, request, *args, **kwargs):

        if request.user.role != "IT":
            return Response(
                {
                    "error": "Only IT can delete internal users."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().destroy(
            request,
            *args,
            **kwargs,
        )


# ============================================================
# PRODUCTS
# ============================================================

class ProductsViewSet(viewsets.ModelViewSet):

    queryset = Products.objects.all().order_by("-created_at")
    serializer_class = ProductsSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "name",
        "description",
    ]

    ordering_fields = [
        "name",
        "price",
        "created_at",
    ]

    def create(self, request, *args, **kwargs):

        if not can_manage_products(request.user):
            return Response(
                {
                    "error": "Only IT or Admin can create products."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save(
            created_by=request.user
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):

        if not can_manage_products(request.user):
            return Response(
                {
                    "error": "Only IT or Admin can update products."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().update(
            request,
            *args,
            **kwargs,
        )

    def destroy(self, request, *args, **kwargs):

        if request.user.role != "IT":
            return Response(
                {
                    "error": "Only IT can delete products."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().destroy(
            request,
            *args,
            **kwargs,
        )


# ============================================================
# FRANCHISE
# ============================================================

class FranchiseViewSet(viewsets.ModelViewSet):

    queryset = (
        Franchise.objects
        .all()
        .prefetch_related("products")
        .order_by("-created_at")
    )

    serializer_class = FranchiseSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        filters,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "is_active",
        "products",
    ]

    search_fields = [
        "name",
        "address",
    ]

    ordering_fields = [
        "name",
        "created_at",
    ]

    def get_queryset(self):

        user = self.request.user

        # Internal users can see franchises
        if is_internal_user(user):
            return self.queryset

        # Franchise users can only see their own franchise
        profile = getattr(
            user,
            "franchise_profile",
            None,
        )

        if profile:
            return self.queryset.filter(
                id=profile.franchise_id
            )

        return Franchise.objects.none()

    def create(self, request, *args, **kwargs):

        # IMPORTANT:
        # IT should NOT create franchise directly.
        #
        # It must complete a PAID FranchiseRequest.

        return Response(
            {
                "error": (
                    "Franchises cannot be created directly. "
                    "Complete a paid FranchiseRequest instead."
                )
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    @action(
        detail=True,
        methods=["post"],
        url_path="activate",
    )
    def activate(self, request, pk=None):

        if not can_manage_franchises(request.user):
            return Response(
                {
                    "error": "Only IT or Admin can activate a franchise."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise = self.get_object()

        franchise.is_active = True
        franchise.save(
            update_fields=[
                "is_active",
                "updated_at",
            ]
        )

        return Response(
            {
                "message": "Franchise activated successfully.",
                "id": franchise.id,
                "is_active": franchise.is_active,
            }
        )

    @action(
        detail=True,
        methods=["post"],
        url_path="deactivate",
    )
    def deactivate(self, request, pk=None):

        if not can_manage_franchises(request.user):
            return Response(
                {
                    "error": "Only IT or Admin can deactivate a franchise."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise = self.get_object()

        franchise.is_active = False
        franchise.save(
            update_fields=[
                "is_active",
                "updated_at",
            ]
        )

        return Response(
            {
                "message": "Franchise deactivated successfully.",
                "id": franchise.id,
                "is_active": franchise.is_active,
            }
        )


# ============================================================
# INVOICE
# ============================================================

class InvoiceViewSet(viewsets.ModelViewSet):

    queryset = (
        Invoice.objects
        .select_related(
            "franchise",
        )
        .order_by("-created_at")
    )

    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        filters,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "status",
        "payment_method",
        "franchise",
    ]

    search_fields = [
        "invoice_number",
        "customer_name",
        "customer_email",
        "transaction_id",
    ]

    ordering_fields = [
        "invoice_date",
        "due_date",
        "total_amount",
        "created_at",
    ]

    def get_queryset(self):

        user = self.request.user

        # Internal users
        if is_internal_user(user):
            return self.queryset

        # Franchise users
        profile = getattr(
            user,
            "franchise_profile",
            None,
        )

        if profile:
            return self.queryset.filter(
                franchise_id=profile.franchise_id
            )

        return Invoice.objects.none()

    def create(self, request, *args, **kwargs):

        if not can_manage_invoices(request.user):
            return Response(
                {
                    "error": "Only Accountant or Admin can create invoices."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        invoice = serializer.save()

        return Response(
            self.get_serializer(invoice).data,
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):

        if not can_manage_invoices(request.user):
            return Response(
                {
                    "error": "Only Accountant or Admin can update invoices."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        invoice = self.get_object()

        # Don't allow editing a paid invoice
        if invoice.status == Invoice.Status.PAID:
            return Response(
                {
                    "error": "Paid invoices cannot be modified."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().update(
            request,
            *args,
            **kwargs,
        )

    # --------------------------------------------------------
    # SEND INVOICE
    # --------------------------------------------------------

    @action(
        detail=True,
        methods=["post"],
        url_path="send",
    )
    def send_invoice(self, request, pk=None):

        if not can_manage_invoices(request.user):
            return Response(
                {
                    "error": "Only Accountant or Admin can send invoices."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        invoice = self.get_object()

        if invoice.status not in [
            Invoice.Status.DRAFT,
        ]:
            return Response(
                {
                    "error": (
                        f"Invoice cannot be sent from "
                        f"'{invoice.status}' status."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        invoice.status = Invoice.Status.SENT

        invoice.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        return Response(
            {
                "message": "Invoice sent successfully.",
                "invoice": self.get_serializer(invoice).data,
            }
        )

    # --------------------------------------------------------
    # MARK PAID
    # --------------------------------------------------------

    @action(
        detail=True,
        methods=["post"],
        url_path="mark-paid",
    )
    @transaction.atomic
    def mark_paid(self, request, pk=None):

        if not can_manage_invoices(request.user):
            return Response(
                {
                    "error": "Only Accountant or Admin can mark invoices as paid."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        invoice = (
            Invoice.objects
            .select_for_update()
            .get(pk=pk)
        )

        if invoice.status == Invoice.Status.PAID:
            return Response(
                {
                    "error": "Invoice is already paid."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        amount = request.data.get(
            "amount",
            invoice.balance_due,
        )

        try:
            amount = Decimal(str(amount))
        except Exception:
            return Response(
                {
                    "error": "Invalid payment amount."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if amount <= 0:
            return Response(
                {
                    "error": "Payment amount must be greater than zero."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if amount > invoice.balance_due:
            return Response(
                {
                    "error": "Payment cannot exceed balance due."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        invoice.amount_paid += amount
        invoice.balance_due = (
            invoice.total_amount
            - invoice.amount_paid
        )

        if invoice.balance_due <= 0:
            invoice.amount_paid = invoice.total_amount
            invoice.balance_due = Decimal("0")
            invoice.status = Invoice.Status.PAID
            invoice.payment_date = timezone.now()

            payment_method = request.data.get(
                "payment_method"
            )

            if payment_method:
                invoice.payment_method = payment_method

            invoice.transaction_id = request.data.get(
                "transaction_id"
            )

        else:
            invoice.status = Invoice.Status.PARTIALLY_PAID

        invoice.save()

        # ----------------------------------------------------
        # Automatically move FranchiseRequest to PAID
        # ----------------------------------------------------

        franchise_request = getattr(
            invoice,
            "franchise_request",
            None,
        )

        if (
            franchise_request
            and invoice.status == Invoice.Status.PAID
            and franchise_request.status
            == FranchiseRequest.Status.APPROVED
        ):
            franchise_request.status = (
                FranchiseRequest.Status.PAID
            )

            franchise_request.save(
                update_fields=[
                    "status",
                    "updated_at",
                ]
            )

        return Response(
            {
                "message": "Payment recorded successfully.",
                "invoice": self.get_serializer(invoice).data,
                "franchise_request_status": (
                    franchise_request.status
                    if franchise_request
                    else None
                ),
            }
        )


# ============================================================
# FRANCHISE REQUEST
# ============================================================

class FranchiseRequestViewSet(viewsets.ModelViewSet):

    queryset = (
        FranchiseRequest.objects
        .select_related(
            "requested_by",
            "reviewed_by",
            "invoice",
            "franchise",
            "completed_by",
        )
        .order_by("-created_at")
    )

    serializer_class = FranchiseRequestSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        filters,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "status",
        "requested_by",
        "reviewed_by",
    ]

    search_fields = [
        "proposed_franchise_name",
        "client_name",
        "client_email",
        "client_phone",
    ]

    ordering_fields = [
        "created_at",
        "updated_at",
        "quoted_amount",
    ]

    def get_queryset(self):

        user = self.request.user

        # Admin and IT can see everything
        if user.role in ["Admin", "IT"]:
            return self.queryset

        # Sales sees requests raised by themselves
        if user.role == "Sales":
            return self.queryset.filter(
                requested_by=user
            )

        # Accountant sees requests waiting for review/payment
        if user.role == "Accountant":
            return self.queryset

        return FranchiseRequest.objects.none()

    # --------------------------------------------------------
    # SALES CREATES REQUEST
    # --------------------------------------------------------

    def create(self, request, *args, **kwargs):

        if not is_sales(request.user):
            return Response(
                {
                    "error": "Only Sales can create franchise requests."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        franchise_request = serializer.save(
            requested_by=request.user,
            status=FranchiseRequest.Status.PENDING,
        )

        return Response(
            self.get_serializer(
                franchise_request
            ).data,
            status=status.HTTP_201_CREATED,
        )

    # --------------------------------------------------------
    # ACCOUNTANT APPROVES REQUEST
    # --------------------------------------------------------

    @action(
        detail=True,
        methods=["post"],
        url_path="approve",
    )
    @transaction.atomic
    def approve(self, request, pk=None):

        if not is_accountant(request.user):
            return Response(
                {
                    "error": "Only Accountant can approve franchise requests."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise_request = (
            FranchiseRequest.objects
            .select_for_update()
            .get(pk=pk)
        )

        if franchise_request.status != (
            FranchiseRequest.Status.PENDING
        ):
            return Response(
                {
                    "error": (
                        "Only pending requests can be approved."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        quoted_amount = request.data.get(
            "quoted_amount",
            franchise_request.quoted_amount,
        )

        if quoted_amount is None:
            return Response(
                {
                    "error": "quoted_amount is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            quoted_amount = Decimal(
                str(quoted_amount)
            )
        except Exception:
            return Response(
                {
                    "error": "Invalid quoted amount."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if quoted_amount <= 0:
            return Response(
                {
                    "error": "Quoted amount must be greater than zero."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        franchise_request.quoted_amount = quoted_amount

        # ----------------------------------------------------
        # Create invoice
        # ----------------------------------------------------

        invoice_number = self._generate_invoice_number()

        invoice = Invoice.objects.create(
            invoice_number=invoice_number,

            # Franchise doesn't exist yet
            franchise=None,

            customer_name=(
                franchise_request.client_name
            ),

            customer_email=(
                franchise_request.client_email
            ),

            customer_phone=(
                franchise_request.client_phone
            ),

            invoice_date=timezone.localdate(),

            due_date=(
                timezone.localdate()
            ),

            subtotal=quoted_amount,

            taxable_amount=quoted_amount,

            total_amount=quoted_amount,

            balance_due=quoted_amount,

            status=Invoice.Status.SENT,

        )

        franchise_request.invoice = invoice
        franchise_request.reviewed_by = request.user
        franchise_request.reviewed_at = timezone.now()
        franchise_request.status = (
            FranchiseRequest.Status.APPROVED
        )

        franchise_request.save()

        return Response(
            {
                "message": (
                    "Franchise request approved "
                    "and invoice created successfully."
                ),
                "request": self.get_serializer(
                    franchise_request
                ).data,
                "invoice": InvoiceSerializer(
                    invoice
                ).data,
            },
            status=status.HTTP_200_OK,
        )

    # --------------------------------------------------------
    # ACCOUNTANT REJECTS
    # --------------------------------------------------------

    @action(
        detail=True,
        methods=["post"],
        url_path="reject",
    )
    def reject(self, request, pk=None):

        if not is_accountant(request.user):
            return Response(
                {
                    "error": "Only Accountant can reject franchise requests."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise_request = self.get_object()

        if franchise_request.status not in [
            FranchiseRequest.Status.PENDING,
            FranchiseRequest.Status.APPROVED,
        ]:
            return Response(
                {
                    "error": "This request cannot be rejected now."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        reason = request.data.get(
            "rejection_reason",
            ""
        )

        if not reason:
            return Response(
                {
                    "error": "Rejection reason is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        franchise_request.status = (
            FranchiseRequest.Status.REJECTED
        )

        franchise_request.rejection_reason = reason
        franchise_request.reviewed_by = request.user
        franchise_request.reviewed_at = timezone.now()

        franchise_request.save()

        return Response(
            {
                "message": "Franchise request rejected.",
                "request": self.get_serializer(
                    franchise_request
                ).data,
            }
        )

    # --------------------------------------------------------
    # IT COMPLETES REQUEST
    # --------------------------------------------------------

    @action(
        detail=True,
        methods=["post"],
        url_path="complete",
    )
    @transaction.atomic
    def complete(self, request, pk=None):

        if not is_it(request.user):
            return Response(
                {
                    "error": "Only IT can complete franchise requests."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise_request = (
            FranchiseRequest.objects
            .select_for_update()
            .select_related("invoice")
            .get(pk=pk)
        )

        # ----------------------------------------------------
        # Must be PAID
        # ----------------------------------------------------

        if franchise_request.status != (
            FranchiseRequest.Status.PAID
        ):
            return Response(
                {
                    "error": (
                        "Franchise can only be created "
                        "after the invoice has been fully paid."
                    ),
                    "current_status": franchise_request.status,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if franchise_request.franchise:
            return Response(
                {
                    "error": "Franchise has already been created."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        invoice = franchise_request.invoice

        if not invoice:
            return Response(
                {
                    "error": "No invoice is associated with this request."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if invoice.status != Invoice.Status.PAID:
            return Response(
                {
                    "error": "Associated invoice is not marked as paid."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ----------------------------------------------------
        # Create Franchise
        # ----------------------------------------------------

        franchise = Franchise.objects.create(
            name=franchise_request.proposed_franchise_name,
            address=franchise_request.proposed_address,
            created_by=request.user,
            is_active=True,
        )

        # ----------------------------------------------------
        # Attach invoice to franchise
        # ----------------------------------------------------

        invoice.franchise = franchise
        invoice.save(
            update_fields=[
                "franchise",
                "updated_at",
            ]
        )

        # ----------------------------------------------------
        # Create Franchise User
        # ----------------------------------------------------

        username = request.data.get(
            "username"
        )

        password = request.data.get(
            "password"
        )

        first_name = request.data.get(
            "first_name",
            franchise_request.client_name,
        )

        email = request.data.get(
            "email",
            franchise_request.client_email,
        )

        role = request.data.get(
            "role",
            "FRANCHISE_ADMIN",
        )

        allowed_roles = [
            "FRANCHISE_IT",
            "FRANCHISE_ADMIN",
            "FRANCHISE_SALES",
            "FRANCHISE_ACCOUNTANT",
        ]

        if not username:
            transaction.set_rollback(True)

            return Response(
                {
                    "error": "username is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not password:
            transaction.set_rollback(True)

            return Response(
                {
                    "error": "password is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if role not in allowed_roles:
            transaction.set_rollback(True)

            return Response(
                {
                    "error": "Invalid franchise role.",
                    "allowed_roles": allowed_roles,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(
            username=username
        ).exists():

            transaction.set_rollback(True)

            return Response(
                {
                    "error": "Username already exists."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ----------------------------------------------------
        # Create Django User
        # ----------------------------------------------------

        franchise_user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            role="",  # Generic User has no internal role
        )

        # ----------------------------------------------------
        # Create FranchiseUserProfile
        # ----------------------------------------------------

        franchise_profile = FranchiseUserProfile.objects.create(
            user=franchise_user,
            franchise=franchise,
            role=role,
        )

        # ----------------------------------------------------
        # Complete Request
        # ----------------------------------------------------

        franchise_request.franchise = franchise
        franchise_request.completed_by = request.user
        franchise_request.completed_at = timezone.now()
        franchise_request.status = (
            FranchiseRequest.Status.COMPLETED
        )

        franchise_request.save()

        return Response(
            {
                "message": (
                    "Franchise and franchise user "
                    "created successfully."
                ),

                "franchise": FranchiseSerializer(
                    franchise
                ).data,

                "user": UserSerializer(
                    franchise_user
                ).data,

                "franchise_user": FranchiseUserProfileSerializer(
                    franchise_profile
                ).data,

                "request": self.get_serializer(
                    franchise_request
                ).data,
            },
            status=status.HTTP_201_CREATED,
        )

    # --------------------------------------------------------
    # CANCEL / REOPEN ETC. SHOULD NOT BE DIRECT STATUS EDITS
    # --------------------------------------------------------

    def update(self, request, *args, **kwargs):

        franchise_request = self.get_object()

        # Prevent clients from manually changing workflow state
        protected_fields = {
            "status",
            "invoice",
            "franchise",
            "reviewed_by",
            "reviewed_at",
            "completed_by",
            "completed_at",
        }

        attempted = (
            set(request.data.keys())
            & protected_fields
        )

        if attempted:
            return Response(
                {
                    "error": (
                        "Workflow fields cannot be changed directly."
                    ),
                    "protected_fields": list(attempted),
                    "message": (
                        "Use approve, reject, "
                        "mark-paid, or complete actions."
                    ),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Sales can update their own pending request
        if (
            request.user.role == "Sales"
            and franchise_request.requested_by_id
            != request.user.id
        ):
            return Response(
                {
                    "error": "You can only modify your own requests."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if franchise_request.status not in [
            FranchiseRequest.Status.PENDING,
        ]:
            return Response(
                {
                    "error": (
                        "Only pending requests can be edited."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().update(
            request,
            *args,
            **kwargs,
        )

    @staticmethod
    def _generate_invoice_number():

        year = timezone.now().year

        prefix = f"ITS-{year}-"

        last_invoice = (
            Invoice.objects
            .filter(
                invoice_number__startswith=prefix
            )
            .order_by("-id")
            .first()
        )

        if not last_invoice:
            number = 1
        else:
            try:
                number = (
                    int(
                        last_invoice.invoice_number
                        .split("-")[-1]
                    )
                    + 1
                )
            except (ValueError, IndexError):
                number = (
                    Invoice.objects
                    .filter(
                        invoice_number__startswith=prefix
                    )
                    .count()
                    + 1
                )

        return f"{prefix}{number:05d}"


# ============================================================
# FRANCHISE USER MANAGEMENT
# ============================================================

class FranchiseUserProfileViewSet(viewsets.ModelViewSet):

    queryset = (
        FranchiseUserProfile.objects
        .select_related(
            "user",
            "franchise",
        )
        .order_by("-created_at")
    )

    serializer_class = FranchiseUserProfileSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        filters,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "franchise",
        "role",
    ]

    search_fields = [
        "user__username",
        "user__email",
        "user__first_name",
        "user__last_name",
        "franchise__name",
    ]

    def get_queryset(self):

        user = self.request.user

        # IT/Admin can see all franchise users
        if user.role in ["IT", "Admin"]:
            return self.queryset

        # Franchise user can only see users
        # belonging to their franchise
        profile = getattr(
            user,
            "franchise_profile",
            None,
        )

        if profile:
            return self.queryset.filter(
                franchise_id=profile.franchise_id
            )

        return FranchiseUserProfile.objects.none()

    def create(self, request, *args, **kwargs):

        # Only IT can create during onboarding
        # Admin could be allowed if you want.
        if request.user.role not in [
            "IT",
            "Admin",
        ]:
            return Response(
                {
                    "error": (
                        "Only IT or Admin can create "
                        "franchise users."
                    )
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        profile = serializer.save()

        return Response(
            self.get_serializer(profile).data,
            status=status.HTTP_201_CREATED,
        )

    def destroy(self, request, *args, **kwargs):

        if request.user.role not in [
            "IT",
            "Admin",
        ]:
            return Response(
                {
                    "error": (
                        "Only IT or Admin can delete "
                        "franchise users."
                    )
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().destroy(
            request,
            *args,
            **kwargs,
        )


# ============================================================
# SUPER ADMIN DASHBOARD
# ============================================================

class SuperAdminDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role not in [
            "IT",
            "Admin",
        ]:
            return Response(
                {
                    "error": "You are not authorized to view this dashboard."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        today = timezone.localdate()

        total_products = Products.objects.count()

        active_franchises = Franchise.objects.filter(
            is_active=True
        ).count()

        inactive_franchises = Franchise.objects.filter(
            is_active=False
        ).count()

        total_franchises = Franchise.objects.count()

        total_requests = FranchiseRequest.objects.count()

        pending_requests = FranchiseRequest.objects.filter(
            status=FranchiseRequest.Status.PENDING
        ).count()

        approved_requests = FranchiseRequest.objects.filter(
            status=FranchiseRequest.Status.APPROVED
        ).count()

        paid_requests = FranchiseRequest.objects.filter(
            status=FranchiseRequest.Status.PAID
        ).count()

        completed_requests = FranchiseRequest.objects.filter(
            status=FranchiseRequest.Status.COMPLETED
        ).count()

        rejected_requests = FranchiseRequest.objects.filter(
            status=FranchiseRequest.Status.REJECTED
        ).count()

        total_invoices = Invoice.objects.count()

        paid_invoices = Invoice.objects.filter(
            status=Invoice.Status.PAID
        ).count()

        overdue_invoices = Invoice.objects.filter(
            status=Invoice.Status.OVERDUE
        ).count()

        invoice_totals = Invoice.objects.aggregate(
            total=Sum("total_amount"),
            paid=Sum("amount_paid"),
            balance=Sum("balance_due"),
        )

        total_revenue = (
            invoice_totals["paid"]
            or Decimal("0")
        )

        pending_revenue = (
            invoice_totals["balance"]
            or Decimal("0")
        )

        return Response(
            {
                "date": today,

                "products": {
                    "total": total_products,
                },

                "franchises": {
                    "total": total_franchises,
                    "active": active_franchises,
                    "inactive": inactive_franchises,
                },

                "franchise_requests": {
                    "total": total_requests,
                    "pending": pending_requests,
                    "approved": approved_requests,
                    "paid": paid_requests,
                    "completed": completed_requests,
                    "rejected": rejected_requests,
                },

                "invoices": {
                    "total": total_invoices,
                    "paid": paid_invoices,
                    "overdue": overdue_invoices,
                },

                "revenue": {
                    "total_invoiced": (
                        invoice_totals["total"]
                        or Decimal("0")
                    ),
                    "total_received": total_revenue,
                    "pending": pending_revenue,
                },
            }
        )
        
class LoginView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)  #return user object if username exist & password matches
        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # print(user)
        # employee = Employee.objects.get(user_id=user.id)
        
        if not user.is_active:
            return Response({'detail': 'Your account is inactive'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)