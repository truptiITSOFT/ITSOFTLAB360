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
    # QUERYSET / ROLE ACCESS
    # ============================================================

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

        if user.role != "Accountant":
            return Response(
                {
                    "detail":
                    "Only Accountant users can approve franchise requests."
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

        # --------------------------------------------------------
        # Check products
        # --------------------------------------------------------

        request_products = franchise_request.requested_products.select_related(
            "product"
        )

        if not request_products.exists():
            return Response(
                {
                    "detail":
                    "This request has no products selected."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # --------------------------------------------------------
        # Approve request
        # --------------------------------------------------------

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

        if user.role != "Accountant":
            return Response(
                {
                    "detail":
                    "Only Accountant users can reject franchise requests."
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
    def create_invoice(self, request, pk=None):

        user = request.user

        if user.role != "Accountant":
            return Response(
                {
                    "detail":
                    "Only Accountant users can create invoices."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        franchise_request = self.get_object()

        if franchise_request.status != FranchiseRequest.Status.APPROVED:
            return Response(
                {
                    "detail":
                    "Request must be approved before creating an invoice."
                },
                status=status.HTTP_400_BAD_REQUEST,
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

        request_products = list(
            franchise_request.requested_products.select_related(
                "product"
            )
        )

        if not request_products:
            return Response(
                {
                    "detail":
                    "No products found in this request."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ========================================================
        # Invoice data
        # ========================================================

        invoice_number = self._generate_invoice_number()

        subtotal = Decimal("0.00")

        for request_product in request_products:
            subtotal += request_product.product.price

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
                    "0"
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

                billing_country=franchise_request.billing_country,

                invoice_date=timezone.now().date(),

                due_date=request.data.get(
                    "due_date"
                ),

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

                notes=franchise_request.notes,

                terms_and_conditions=request.data.get(
                    "terms_and_conditions",
                    "",
                ),
            )

            # ----------------------------------------------------
            # Invoice items
            # ----------------------------------------------------

            invoice_items = []

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

                item_total = (
                    item_taxable_amount
                    + item_tax_amount
                )

                invoice_items.append(
                    InvoiceItem(
                        invoice=invoice,
                        product=product,
                        description=product.description,
                        unit_price=unit_price,
                        discount_amount=Decimal("0.00"),
                        taxable_amount=item_taxable_amount,
                        tax_percentage=tax_percentage,
                        tax_amount=item_tax_amount,
                        total_amount=item_total,
                    )
                )

            InvoiceItem.objects.bulk_create(
                invoice_items
            )

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

        return Response(
            {
                "detail":
                "Invoice created successfully.",

                "invoice_id":
                invoice.id,

                "invoice_number":
                invoice.invoice_number,

                "subtotal":
                str(invoice.subtotal),

                "discount":
                str(invoice.discount_amount),

                "taxable_amount":
                str(invoice.taxable_amount),

                "tax":
                str(invoice.tax_amount),

                "total":
                str(invoice.total_amount),

                "status":
                invoice.status,

                "request_status":
                franchise_request.status,
            },
            status=status.HTTP_201_CREATED,
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

        if user.role != "IT":
            return Response(
                {
                    "detail":
                    "Only IT users can complete franchise requests."
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

        # ========================================================
        # Create Franchise
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

            products = Products.objects.filter(
                franchiserequestproduct__franchise_request=franchise_request
            )

            franchise.products.set(
                products
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
                "Franchise created successfully.",

                "franchise_id":
                franchise.id,

                "franchise_name":
                franchise.name,

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