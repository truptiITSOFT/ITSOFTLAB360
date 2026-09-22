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
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .models import (
    Products,
    Franchise,
    Invoice,
    FranchiseRequest,
    FranchiseProductAllocation,
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
from .email_service import send_invoice_email_notification


User = get_user_model()


# ============================================================
# COMMON PERMISSION HELPERS
# ============================================================

def is_internal_user(user):
    """
    Internal ITSOFTLAB360 users.
    """
    if not user or not user.is_authenticated:
        return False
    if user.is_superuser:
        return True
    role = getattr(user, "role", "") or ""
    return role.lower() in ["it", "admin", "sales", "accountant"]


def is_it(user):
    if not user or not user.is_authenticated:
        return False
    role = getattr(user, "role", "") or ""
    return user.is_superuser or role.lower() in ["it", "admin"]


def is_admin(user):
    if not user or not user.is_authenticated:
        return False
    role = getattr(user, "role", "") or ""
    return user.is_superuser or role.lower() == "admin"


def is_sales(user):
    if not user or not user.is_authenticated:
        return False
    role = getattr(user, "role", "") or ""
    return user.is_superuser or role.lower() in ["sales", "admin"]


def is_accountant(user):
    if not user or not user.is_authenticated:
        return False
    role = getattr(user, "role", "") or ""
    return user.is_superuser or role.lower() in ["accountant", "admin"]


def can_manage_products(user):
    return is_it(user) or is_admin(user)


def can_manage_franchises(user):
    return is_it(user) or is_admin(user)


def can_manage_invoices(user):
    return is_accountant(user) or is_admin(user)


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

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return Products.objects.none()

        franchise_profile = getattr(user, "franchise_profile", None)
        if franchise_profile and franchise_profile.franchise:
            # Franchise users ONLY see products allocated to their franchise
            return Products.objects.filter(
                Q(franchise_allocations__franchise=franchise_profile.franchise) |
                Q(franchises=franchise_profile.franchise)
            ).distinct().order_by("-created_at")

        org_profile = getattr(user, "org_profile", None)
        if org_profile and org_profile.organization:
            # Organization members see products subscribed by their organization
            return Products.objects.filter(
                organizationproduct__organization=org_profile.organization,
                organizationproduct__is_active=True
            ).distinct().order_by("-created_at")

        return Products.objects.all().order_by("-created_at")

    def create(self, request, *args, **kwargs):
        if hasattr(request.user, "franchise_profile") and request.user.franchise_profile:
            return Response(
                {
                    "error": "Franchise users cannot create, edit, or delete products. Products and pricing are centrally controlled by ITSOFTLAB360."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

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
        if hasattr(request.user, "franchise_profile") and request.user.franchise_profile:
            return Response(
                {
                    "error": "Franchise users cannot create, edit, or delete products. Products and pricing are centrally controlled by ITSOFTLAB360."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

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

    def partial_update(self, request, *args, **kwargs):
        if hasattr(request.user, "franchise_profile") and request.user.franchise_profile:
            return Response(
                {
                    "error": "Franchise users cannot create, edit, or delete products. Products and pricing are centrally controlled by ITSOFTLAB360."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if not can_manage_products(request.user):
            return Response(
                {
                    "error": "Only IT or Admin can update products."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().partial_update(
            request,
            *args,
            **kwargs,
        )

    def destroy(self, request, *args, **kwargs):
        if hasattr(request.user, "franchise_profile") and request.user.franchise_profile:
            return Response(
                {
                    "error": "Franchise users cannot create, edit, or delete products. Products and pricing are centrally controlled by ITSOFTLAB360."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

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
        DjangoFilterBackend,
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
        DjangoFilterBackend,
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

        recipient = request.data.get("email") or invoice.customer_email
        email_result = None
        if recipient:
            email_result = send_invoice_email_notification(
                invoice,
                recipient_email=recipient,
                custom_notes=request.data.get("notes"),
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
                "email_dispatched": bool(email_result and email_result.get("success")),
            }
        )

    @action(
        detail=True,
        methods=["post"],
        url_path="send-email",
    )
    def send_email(self, request, pk=None):

        if not can_manage_invoices(request.user):
            return Response(
                {
                    "error": "Only Accountant or Admin can send invoice emails."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        invoice = self.get_object()
        recipient = request.data.get("email") or invoice.customer_email
        if not recipient:
            return Response(
                {"error": "Customer email is required to send invoice."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        notes = request.data.get("notes")
        result = send_invoice_email_notification(invoice, recipient_email=recipient, custom_notes=notes)
        if not result.get("success"):
            return Response(
                {"error": result.get("error", "Failed to dispatch email.")},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {
                "message": result["message"],
                "recipient": recipient,
                "invoice": self.get_serializer(invoice).data,
            },
            status=status.HTTP_200_OK,
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

from decimal import Decimal
from django.db import transaction
from django.utils import timezone
from django.contrib.auth import get_user_model

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    FranchiseRequest,
    FranchiseRequestProduct,
    Invoice,
    InvoiceItem,
    Franchise,
    Products,
)

User = get_user_model()


class FranchiseRequestViewSet(viewsets.ModelViewSet):
    """
    Franchise onboarding workflow

    SALES
        ↓
    Create Franchise Request
        ↓
    PENDING
        ↓
    ACCOUNTANT
        ↓
    Approve + Create Invoice
        ↓
    APPROVED
        ↓
    Invoice Paid
        ↓
    PAID
        ↓
    IT
        ↓
    Create Franchise
        ↓
    COMPLETED
    """
    serializer_class = FranchiseRequestSerializer
    queryset = (
        FranchiseRequest.objects
        .select_related(
            "requested_by",
            "reviewed_by",
            "completed_by",
            "invoice",
            "franchise",
        )
        .prefetch_related(
            "requested_products__product",
        )
        .all()
    )

    permission_classes = [permissions.IsAuthenticated]

    # ============================================================
    # QUERYSET / ROLE ACCESS & FILTERING
    # ============================================================
    filter_backends = [
        DjangoFilterBackend,
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

        queryset = self.queryset

        # Internal Admin / IT / Accountant can see all requests
        if user.role in ["IT", "Admin", "Accountant"]:
            return queryset

        # Sales can see requests created by themselves
        if user.role == "Sales":
            return queryset.filter(requested_by=user)

        return queryset.none()

    # ============================================================
    # CREATE REQUEST
    # ============================================================

    def create(self, request, *args, **kwargs):
        """
        Sales creates a franchise request.

        Expected payload:

        {
            "proposed_franchise_name": "ABC Technologies",
            "proposed_address": "Indore, MP",

            "client_name": "ABC Technologies Pvt Ltd",
            "client_email": "client@example.com",
            "client_phone": "9876543210",
            "client_gstin": "23ABCDE1234F1Z5",

            "billing_address": "ABC Office",
            "billing_city": "Indore",
            "billing_state": "Madhya Pradesh",
            "billing_pincode": "452001",
            "billing_country": "India",

            "quoted_amount": "150000",
            "notes": "10 products",

            "product_ids": [1, 2, 3, 4, 5]
        }
        """

        user = request.user

        # --------------------------------------------------------
        # Only Sales can create requests
        # --------------------------------------------------------

        if user.role != "Sales":
            return Response(
                {
                    "detail": "Only Sales users can create franchise requests."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        data = request.data

        # --------------------------------------------------------
        # Required fields
        # --------------------------------------------------------

        required_fields = [
            "proposed_franchise_name",
            "proposed_address",
            "client_name",
            "client_email",
            "client_phone",
            "billing_address",
            "billing_city",
            "billing_state",
            "billing_pincode",
        ]

        missing_fields = [
            field
            for field in required_fields
            if not data.get(field)
        ]

        if missing_fields:
            return Response(
                {
                    "detail": "Required fields are missing.",
                    "fields": missing_fields,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # --------------------------------------------------------
        # Products
        # --------------------------------------------------------

        product_ids = data.get("product_ids", [])

        if not isinstance(product_ids, list) or not product_ids:
            return Response(
                {
                    "detail": "At least one product must be selected."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        products = Products.objects.filter(
            id__in=product_ids
        )

        if products.count() != len(set(product_ids)):
            return Response(
                {
                    "detail": "One or more selected products are invalid."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # --------------------------------------------------------
        # Create request
        # --------------------------------------------------------

        with transaction.atomic():

            franchise_request = FranchiseRequest.objects.create(
                requested_by=user,

                proposed_franchise_name=data[
                    "proposed_franchise_name"
                ],

                proposed_address=data[
                    "proposed_address"
                ],

                client_name=data[
                    "client_name"
                ],

                client_email=data[
                    "client_email"
                ],

                client_phone=data[
                    "client_phone"
                ],

                client_gstin=data.get(
                    "client_gstin"
                ),

                billing_address=data[
                    "billing_address"
                ],

                billing_city=data[
                    "billing_city"
                ],

                billing_state=data[
                    "billing_state"
                ],

                billing_pincode=data[
                    "billing_pincode"
                ],

                billing_country=data.get(
                    "billing_country",
                    "India",
                ),

                quoted_amount=data.get(
                    "quoted_amount"
                ),

                notes=data.get(
                    "notes",
                    "",
                ),

                status=FranchiseRequest.Status.PENDING,
            )

            # ----------------------------------------------------
            # Attach products
            # ----------------------------------------------------

            FranchiseRequestProduct.objects.bulk_create(
                [
                    FranchiseRequestProduct(
                        franchise_request=franchise_request,
                        product=product,
                    )
                    for product in products
                ]
            )

        return Response(
            self._serialize_request(franchise_request),
            status=status.HTTP_201_CREATED,
        )

    # ============================================================
    # DETAIL SERIALIZATION
    # ============================================================

    def _serialize_request(self, obj):

        products = [
            {
                "id": item.product.id,
                "name": item.product.name,
                "description": item.product.description,
                "price": str(item.product.price),
            }
            for item in obj.requested_products.all()
        ]

        return {
            "id": obj.id,

            "requested_by": (
                obj.requested_by.id
                if obj.requested_by
                else None
            ),

            "proposed_franchise_name":
                obj.proposed_franchise_name,

            "proposed_address":
                obj.proposed_address,

            "client": {
                "name": obj.client_name,
                "email": obj.client_email,
                "phone": obj.client_phone,
                "gstin": obj.client_gstin,
            },

            "billing_address": {
                "address": obj.billing_address,
                "city": obj.billing_city,
                "state": obj.billing_state,
                "pincode": obj.billing_pincode,
                "country": obj.billing_country,
            },

            "quoted_amount": (
                str(obj.quoted_amount)
                if obj.quoted_amount is not None
                else None
            ),

            "products": products,

            "status": obj.status,

            "invoice_id": (
                obj.invoice.id
                if obj.invoice
                else None
            ),

            "invoice_number": (
                obj.invoice.invoice_number
                if obj.invoice
                else None
            ),

            "franchise_id": (
                obj.franchise.id
                if obj.franchise
                else None
            ),

            "reviewed_by": (
                obj.reviewed_by.id
                if obj.reviewed_by
                else None
            ),

            "reviewed_at": obj.reviewed_at,

            "rejection_reason":
                obj.rejection_reason,

            "completed_by": (
                obj.completed_by.id
                if obj.completed_by
                else None
            ),

            "completed_at":
                obj.completed_at,

            "created_at":
                obj.created_at,

            "updated_at":
                obj.updated_at,
        }

    # ============================================================
    # RETRIEVE
    # ============================================================

    def retrieve(self, request, *args, **kwargs):

        obj = self.get_object()

        return Response(
            self._serialize_request(obj)
        )

    # ============================================================
    # ACCOUNTANT APPROVE
    # ============================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="approve",
    )
    def approve(self, request, pk=None):

        user = request.user

        if not can_manage_invoices(user):
            return Response(
                {
                    "detail":
                    "Only Accountant or Admin users can approve franchise requests."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise_request = self.get_object()

        if franchise_request.status != FranchiseRequest.Status.PENDING:
            return Response(
                {
                    "detail":
                    "Only pending requests can be approved."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        quoted_amt = request.data.get("quoted_amount")
        if quoted_amt is not None:
            try:
                franchise_request.quoted_amount = Decimal(str(quoted_amt))
            except Exception:
                pass

        franchise_request.status = FranchiseRequest.Status.APPROVED
        franchise_request.reviewed_by = user
        franchise_request.reviewed_at = timezone.now()

        franchise_request.save(
            update_fields=[
                "status",
                "quoted_amount",
                "reviewed_by",
                "reviewed_at",
                "updated_at",
            ]
        )

        return Response(
            {
                "detail": "Franchise request approved.",
                "request_id": franchise_request.id,
                "status": franchise_request.status,
            }
        )

    # ============================================================
    # ACCOUNTANT REJECT
    # ============================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="reject",
    )
    def reject(self, request, pk=None):

        user = request.user

        if not can_manage_invoices(user):
            return Response(
                {
                    "detail":
                    "Only Accountant or Admin users can reject franchise requests."
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
                    "detail":
                    "This request cannot be rejected at this stage."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        reason = request.data.get(
            "rejection_reason"
        )

        if not reason:
            return Response(
                {
                    "detail":
                    "Rejection reason is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        franchise_request.status = FranchiseRequest.Status.REJECTED
        franchise_request.reviewed_by = user
        franchise_request.reviewed_at = timezone.now()
        franchise_request.rejection_reason = reason

        franchise_request.save()

        return Response(
            {
                "detail":
                "Franchise request rejected.",
                "status":
                franchise_request.status,
            }
        )

    # ============================================================
    # CREATE INVOICE FROM REQUEST
    # ============================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="create-invoice",
    )
    @transaction.atomic
    def create_invoice(self, request, pk=None):

        user = request.user

        if not can_manage_invoices(user):
            return Response(
                {
                    "detail":
                    "Only Accountant or Admin users can create invoices."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise_request = (
            FranchiseRequest.objects
            .select_for_update()
            .get(pk=pk)
        )

        if franchise_request.invoice:
            return Response(
                {
                    "detail":
                    "Invoice already exists for this request.",
                    "invoice_id":
                    franchise_request.invoice.id,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If request was still PENDING, auto-approve upon invoice creation
        if franchise_request.status == FranchiseRequest.Status.PENDING:
            franchise_request.status = FranchiseRequest.Status.APPROVED
            franchise_request.reviewed_by = user
            franchise_request.reviewed_at = timezone.now()
            franchise_request.save(
                update_fields=[
                    "status",
                    "reviewed_by",
                    "reviewed_at",
                    "updated_at",
                ]
            )
        elif franchise_request.status != FranchiseRequest.Status.APPROVED:
            return Response(
                {
                    "detail":
                    "Request must be pending or approved before creating an invoice."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        request_products = list(
            franchise_request.requested_products.select_related(
                "product"
            )
        )

        subtotal = Decimal("0.00")
        if request_products:
            for request_product in request_products:
                subtotal += request_product.product.price
        elif franchise_request.quoted_amount:
            subtotal = Decimal(str(franchise_request.quoted_amount))
        else:
            return Response(
                {
                    "detail":
                    "No products or quoted amount found in this request."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Optional discount supplied by accountant
        discount_amount = Decimal(
            str(
                request.data.get(
                    "discount_amount",
                    "0"
                )
            )
        )

        if discount_amount < 0:
            discount_amount = Decimal("0.00")

        if discount_amount > subtotal:
            return Response(
                {
                    "detail":
                    "Discount cannot be greater than subtotal."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        taxable_amount = subtotal - discount_amount

        # --------------------------------------------------------
        # Tax
        # --------------------------------------------------------

        tax_percentage = Decimal(
            str(
                request.data.get(
                    "tax_percentage",
                    "18.00"
                )
            )
        )

        if tax_percentage < 0:
            tax_percentage = Decimal("0.00")

        tax_amount = (
            taxable_amount * tax_percentage / Decimal("100")
        ).quantize(
            Decimal("0.01")
        )

        total_amount = taxable_amount + tax_amount

        # --------------------------------------------------------
        # GST split
        # --------------------------------------------------------

        cgst_amount = Decimal("0.00")
        sgst_amount = Decimal("0.00")
        igst_amount = Decimal("0.00")

        gst_type = request.data.get(
            "gst_type",
            "igst"
        )

        if gst_type == "cgst_sgst":
            cgst_amount = (
                tax_amount / Decimal("2")
            ).quantize(
                Decimal("0.01")
            )
            sgst_amount = tax_amount - cgst_amount
        else:
            igst_amount = tax_amount

        # Compute due date
        due_date = request.data.get("due_date")
        if not due_date and request.data.get("due_days"):
            try:
                days = int(request.data.get("due_days"))
                due_date = (timezone.now() + timezone.timedelta(days=days)).date()
            except Exception:
                due_date = None

        invoice_number = self._generate_invoice_number()

        # ========================================================
        # Create invoice
        # ========================================================

        with transaction.atomic():
            invoice = Invoice.objects.create(
                invoice_number=invoice_number,
                franchise=None,
                customer_name=franchise_request.client_name,
                customer_email=franchise_request.client_email,
                customer_phone=franchise_request.client_phone,
                customer_gstin=franchise_request.client_gstin,
                billing_address=franchise_request.billing_address,
                billing_city=franchise_request.billing_city,
                billing_state=franchise_request.billing_state,
                billing_pincode=franchise_request.billing_pincode,
                billing_country=franchise_request.billing_country or "India",
                invoice_date=timezone.now().date(),
                due_date=due_date,
                subtotal=subtotal,
                discount_amount=discount_amount,
                taxable_amount=taxable_amount,
                tax_amount=tax_amount,
                total_amount=total_amount,
                amount_paid=Decimal("0.00"),
                balance_due=total_amount,
                cgst_amount=cgst_amount,
                sgst_amount=sgst_amount,
                igst_amount=igst_amount,
                status=Invoice.Status.SENT,
                notes=request.data.get("notes") or franchise_request.notes,
                terms_and_conditions=request.data.get(
                    "terms_and_conditions",
                    "Payment due within agreed timeframe.",
                ),
            )

            # ----------------------------------------------------
            # Invoice items
            # ----------------------------------------------------
            invoice_items = []
            if request_products:
                for request_product in request_products:
                    product = request_product.product
                    unit_price = product.price
                    item_taxable_amount = unit_price
                    item_tax_amount = (
                        item_taxable_amount
                        * tax_percentage
                        / Decimal("100")
                    ).quantize(
                        Decimal("0.01")
                    )
                    item_total = item_taxable_amount + item_tax_amount
                    invoice_items.append(
                        InvoiceItem(
                            invoice=invoice,
                            product=product,
                            description=product.description or "",
                            unit_price=unit_price,
                            discount_amount=Decimal("0.00"),
                            taxable_amount=item_taxable_amount,
                            tax_percentage=tax_percentage,
                            tax_amount=item_tax_amount,
                            total_amount=item_total,
                        )
                    )
                InvoiceItem.objects.bulk_create(invoice_items)

            # ----------------------------------------------------
            # Connect invoice to request
            # ----------------------------------------------------
            franchise_request.invoice = invoice
            franchise_request.save(
                update_fields=[
                    "invoice",
                    "updated_at",
                ]
            )

        # Optional send email right on generation
        email_sent = False
        email_message = ""
        should_send = request.data.get("send_email")
        if should_send in [True, "true", "True", 1, "1"]:
            recipient = request.data.get("email") or franchise_request.client_email or invoice.customer_email
            if recipient:
                res_email = send_invoice_email_notification(
                    invoice,
                    recipient_email=recipient,
                    custom_notes=invoice.notes,
                )
                email_sent = res_email.get("success", False)
                email_message = res_email.get("message") or res_email.get("error", "")

        return Response(
            {
                "detail": "Invoice created successfully.",
                "invoice_id": invoice.id,
                "invoice_number": invoice.invoice_number,
                "subtotal": str(invoice.subtotal),
                "discount": str(invoice.discount_amount),
                "taxable_amount": str(invoice.taxable_amount),
                "tax": str(invoice.tax_amount),
                "total": str(invoice.total_amount),
                "status": invoice.status,
                "request_status": franchise_request.status,
                "email_sent": email_sent,
                "email_message": email_message,
            },
            status=status.HTTP_201_CREATED,
        )

    # ============================================================
    # SEND INVOICE EMAIL TO CLIENT
    # ============================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="send-invoice-email",
    )
    def send_invoice_email(self, request, pk=None):

        user = request.user

        if not can_manage_invoices(user):
            return Response(
                {
                    "detail": "Only Accountant or Admin users can send invoice emails."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise_request = self.get_object()

        if not franchise_request.invoice:
            return Response(
                {
                    "detail": "No invoice has been created for this request yet."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        recipient = request.data.get("email") or franchise_request.client_email or franchise_request.invoice.customer_email
        if not recipient:
            return Response(
                {
                    "detail": "Client email is required to send the invoice."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        notes = request.data.get("notes")
        result = send_invoice_email_notification(
            franchise_request.invoice,
            recipient_email=recipient,
            custom_notes=notes,
        )

        if not result.get("success"):
            return Response(
                {
                    "detail": result.get("error", "Failed to send invoice email."),
                    "recipient": recipient,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {
                "detail": result["message"],
                "recipient": recipient,
                "invoice_number": franchise_request.invoice.invoice_number,
                "invoice_id": franchise_request.invoice.id,
            },
            status=status.HTTP_200_OK,
        )

    # ============================================================
    # GENERATE INVOICE NUMBER
    # ============================================================

    def _generate_invoice_number(self):

        last_invoice = (
            Invoice.objects
            .order_by("-id")
            .first()
        )

        if not last_invoice:
            number = 1
        else:
            number = last_invoice.id + 1

        return f"INV-{timezone.now().year}-{number:05d}"

    # ============================================================
    # MARK REQUEST AS PAID
    # ============================================================
    #
    # Normally you should NOT call this manually.
    #
    # Your InvoiceViewSet.mark_paid() should call this logic
    # automatically after the invoice is paid.
    #
    # This endpoint is provided only if you need it.
    # ============================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="mark-paid",
    )
    def mark_paid(self, request, pk=None):

        user = request.user

        if user.role not in [
            "Accountant",
            "Admin",
        ]:
            return Response(
                {
                    "detail":
                    "You do not have permission to mark this request as paid."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise_request = self.get_object()

        if not franchise_request.invoice:
            return Response(
                {
                    "detail":
                    "This request does not have an invoice."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        invoice = franchise_request.invoice

        if invoice.status != Invoice.Status.PAID:
            return Response(
                {
                    "detail":
                    "The invoice must be paid first."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        franchise_request.status = FranchiseRequest.Status.PAID

        franchise_request.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        return Response(
            {
                "detail":
                "Franchise request marked as paid.",
                "status":
                franchise_request.status,
            }
        )

    # ============================================================
    # IT COMPLETES FRANCHISE
    # ============================================================

    @action(
        detail=True,
        methods=["post"],
        url_path="complete",
    )
    def complete(self, request, pk=None):

        user = request.user

        if user.role != "IT" and not user.is_superuser and user.role != "Admin":
            return Response(
                {
                    "detail":
                    "Only IT or Admin users can complete franchise requests."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise_request = self.get_object()

        if franchise_request.status != FranchiseRequest.Status.PAID:
            return Response(
                {
                    "detail":
                    "Franchise can only be created after payment is completed."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if franchise_request.franchise:
            return Response(
                {
                    "detail":
                    "Franchise has already been created.",
                    "franchise_id":
                    franchise_request.franchise.id,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        username = request.data.get("username")
        password = request.data.get("password")
        admin_email = request.data.get("email") or franchise_request.client_email or ""
        admin_first_name = request.data.get("first_name") or franchise_request.client_name or ""
        admin_last_name = request.data.get("last_name") or ""
        role = request.data.get("role") or "FRANCHISE_ADMIN"

        if not username or not password:
            return Response(
                {
                    "detail": "Username and password are required to create the Franchise Admin login."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ========================================================
        # Create Franchise and Franchise Admin User
        # ========================================================

        with transaction.atomic():

            franchise = Franchise.objects.create(

                name=franchise_request.proposed_franchise_name,

                address=franchise_request.proposed_address,

                is_active=True,

                created_by=user,
            )

            # ----------------------------------------------------
            # Attach purchased products
            # ----------------------------------------------------

            product_ids = franchise_request.requested_products.values_list(
                "product_id", flat=True
            )
            products = Products.objects.filter(
                id__in=product_ids
            )

            franchise.products.set(
                products
            )
            for p in products:
                FranchiseProductAllocation.objects.get_or_create(
                    franchise=franchise,
                    product=p,
                    defaults={"total_licenses": 50},
                )

            # ----------------------------------------------------
            # Create or update Franchise Partner User
            # ----------------------------------------------------
            admin_user = User.objects.filter(username=username).first()
            if admin_user:
                admin_user.set_password(password)
                if admin_email and not admin_user.email:
                    admin_user.email = admin_email
                if admin_first_name and not admin_user.first_name:
                    admin_user.first_name = admin_first_name
                admin_user.save()
            else:
                admin_user = User.objects.create_user(
                    username=username,
                    password=password,
                    email=admin_email,
                    first_name=admin_first_name,
                    last_name=admin_last_name,
                    role="",
                )

            # Link FranchiseUserProfile
            FranchiseUserProfile.objects.update_or_create(
                user=admin_user,
                defaults={
                    "franchise": franchise,
                    "role": role,
                },
            )

            # ----------------------------------------------------
            # Connect franchise to request
            # ----------------------------------------------------

            franchise_request.franchise = franchise

            franchise_request.status = (
                FranchiseRequest.Status.COMPLETED
            )

            franchise_request.completed_by = user

            franchise_request.completed_at = timezone.now()

            franchise_request.save(
                update_fields=[
                    "franchise",
                    "status",
                    "completed_by",
                    "completed_at",
                    "updated_at",
                ]
            )

        return Response(
            {
                "detail":
                "Franchise and Franchise Admin credentials created successfully.",

                "franchise_id":
                franchise.id,

                "franchise_name":
                franchise.name,

                "admin_credentials": {
                    "username": admin_user.username,
                    "role": role,
                    "portal": "FRANCHISE",
                    "login_url": "/franchise/login",
                },

                "products":
                [
                    {
                        "id": product.id,
                        "name": product.name,
                    }
                    for product in franchise.products.all()
                ],

                "request_status":
                franchise_request.status,
            },
            status=status.HTTP_201_CREATED,
        )
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
        DjangoFilterBackend,
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

        is_franchise_admin = (
            hasattr(request.user, "franchise_profile")
            and request.user.franchise_profile is not None
            and request.user.franchise_profile.role == "FRANCHISE_ADMIN"
        )

        if (
            request.user.role not in ["IT", "Admin"]
            and not request.user.is_superuser
            and not is_franchise_admin
        ):
            return Response(
                {
                    "error": (
                        "Only IT, Admin, or Franchise Admin can create "
                        "franchise users."
                    )
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        data = request.data.copy() if hasattr(request.data, "copy") else dict(request.data)
        if is_franchise_admin and not request.user.is_superuser and request.user.role not in ["IT", "Admin"]:
            data["franchise"] = request.user.franchise_profile.franchise_id

        serializer = self.get_serializer(
            data=data
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
        requested_portal = request.data.get('portal_type')  # INTERNAL, FRANCHISE, ORGANIZATION, SAAS

        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({'detail': 'Your account is inactive'}, status=status.HTTP_401_UNAUTHORIZED)

        # Determine user portal type and role
        portal_type = "SAAS"
        role = getattr(user, 'role', '') or 'User'
        franchise_id = None
        franchise_name = None
        organization_id = None
        organization_name = None
        active_products = []

        # 1. Check Franchise User
        from .models import FranchiseUserProfile
        franchise_profile = FranchiseUserProfile.objects.filter(user=user).select_related('franchise').first()
        if franchise_profile:
            portal_type = "FRANCHISE"
            role = franchise_profile.role
            franchise_id = franchise_profile.franchise_id
            franchise_name = franchise_profile.franchise.name

        # 2. Check Organization User / Admin
        from franchise.models import OrganizationUser
        org_membership = OrganizationUser.objects.filter(user=user).select_related('organization').first()
        if org_membership:
            if org_membership.role == "ORG_ADMIN":
                portal_type = "ORGANIZATION"
                role = "ORG_ADMIN"
            else:
                portal_type = "SAAS"
                role = org_membership.role
            organization_id = org_membership.organization_id
            organization_name = org_membership.organization.name

            # Attach active SaaS product access
            from franchise.models import UserProductAccess
            accesses = UserProductAccess.objects.filter(
                organization_user=org_membership,
                is_active=True
            ).select_related('subscription__product')
            active_products = [
                {
                    "id": a.subscription.product.id,
                    "name": a.subscription.product.name,
                    "external_user_id": a.external_user_id,
                }
                for a in accesses
            ]

        # 3. Check Internal Staff (IT, Sales, Accountant, Admin, or Superuser)
        if not franchise_profile and not org_membership and (user.is_superuser or user.role in ["Admin", "IT", "Sales", "Accountant"]):
            portal_type = "INTERNAL"
            role = user.role or "Admin"

        # Superuser Universal Access: If superuser logs in with requested portal, allow it
        if user.is_superuser and requested_portal:
            req_clean = requested_portal.upper()
            if req_clean in ["FRANCHISE", "ORGANIZATION", "SAAS", "INTERNAL"]:
                portal_type = req_clean

        # Portal Security / Routing Guard (if portal_type was explicitly requested)
        if requested_portal and not user.is_superuser:
            req_clean = requested_portal.upper()
            if req_clean == "INTERNAL" and portal_type != "INTERNAL":
                target = "/org/login" if portal_type == "ORGANIZATION" else ("/franchise/login" if portal_type == "FRANCHISE" else "/login")
                return Response(
                    {
                        'detail': f'This account belongs to the {portal_type.title()} portal. Please log in at {target}.',
                        'correct_portal': portal_type,
                        'redirect_url': target,
                    },
                    status=status.HTTP_403_FORBIDDEN
                )
            elif req_clean == "FRANCHISE" and portal_type != "FRANCHISE":
                target = "/admin/login" if portal_type == "INTERNAL" else ("/org/login" if portal_type == "ORGANIZATION" else "/login")
                return Response(
                    {
                        'detail': f'This account is not a Franchise member. Please log in at {target}.',
                        'correct_portal': portal_type,
                        'redirect_url': target,
                    },
                    status=status.HTTP_403_FORBIDDEN
                )
            elif req_clean == "ORGANIZATION" and portal_type != "ORGANIZATION":
                target = "/admin/login" if portal_type == "INTERNAL" else ("/franchise/login" if portal_type == "FRANCHISE" else "/login")
                return Response(
                    {
                        'detail': f'This account is not an Organization Admin. Please log in at {target}.',
                        'correct_portal': portal_type,
                        'redirect_url': target,
                    },
                    status=status.HTTP_403_FORBIDDEN
                )

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'portal_type': portal_type,
                'role': role,
                'franchise_id': franchise_id,
                'franchise_name': franchise_name,
                'organization_id': organization_id,
                'organization_name': organization_name,
                'active_products': active_products,
            }
        })