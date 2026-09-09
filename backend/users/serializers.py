from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from rest_framework import serializers

from .models import Products, Franchise, Invoice, FranchiseRequest, FranchiseUserProfile

# Adjust this import to wherever FranchiseUserProfile actually lives.
# from .franchise_user_models import FranchiseUserProfile

User = get_user_model()


def display_name(obj):
    """Best-effort human-readable label for a related User/Franchise/etc."""
    if obj is None:
        return None
    for attr in ("get_full_name", "full_name", "name"):
        value = getattr(obj, attr, None)
        if callable(value):
            value = value()
        if value:
            return value
    return str(obj)


# ---------------------------------------------------------------------------
# User / auth
# ---------------------------------------------------------------------------

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "role", "password"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


# ---------------------------------------------------------------------------
# Products
# ---------------------------------------------------------------------------

class ProductsSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()

    class Meta:
        model = Products
        fields = ["id", "name", "description", "price", "created_by", "created_by_name", "created_at", "updated_at"]
        read_only_fields = ["id", "created_by", "created_at", "updated_at"]

    def get_created_by_name(self, obj):
        return display_name(obj.created_by)


# ---------------------------------------------------------------------------
# Franchise
# ---------------------------------------------------------------------------

class FranchiseSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    product_names = serializers.SerializerMethodField()

    class Meta:
        model = Franchise
        fields = [
            "id", "name", "address", "is_active",
            "products", "product_names",
            "created_by", "created_by_name",
            "created_at", "updated_at",
        ]
        read_only_fields = fields  # Franchise is never written directly through this serializer —
        # see FranchiseRequestViewSet.create_franchise; this is read-only end to end.

    def get_created_by_name(self, obj):
        return display_name(obj.created_by)

    def get_product_names(self, obj):
        return [p.name for p in obj.products.all()]


# ---------------------------------------------------------------------------
# Franchise User Profile (client logins)
# ---------------------------------------------------------------------------

class FranchiseUserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    franchise_name = serializers.CharField(source="franchise.name", read_only=True)

    class Meta:
        model = FranchiseUserProfile
        fields = ["id", "user", "username", "franchise", "franchise_name", "role", "created_at", "updated_at"]
        read_only_fields = fields


# ---------------------------------------------------------------------------
# Invoice
# ---------------------------------------------------------------------------

class InvoiceSerializer(serializers.ModelSerializer):
    franchise_name = serializers.SerializerMethodField()
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = Invoice
        fields = [
            "id", "invoice_number",
            "franchise", "franchise_name",
            "customer_name", "customer_email", "customer_phone", "customer_gstin",
            "billing_address", "billing_city", "billing_state", "billing_pincode", "billing_country",
            "shipping_address", "shipping_city", "shipping_state", "shipping_pincode", "shipping_country",
            "invoice_date", "due_date",
            "subtotal", "discount_amount", "taxable_amount", "tax_amount", "total_amount",
            "amount_paid", "balance_due",
            "cgst_amount", "sgst_amount", "igst_amount",
            "status", "status_display",
            "payment_method", "payment_date", "transaction_id",
            "notes", "terms_and_conditions",
            "created_at", "updated_at",
        ]
        read_only_fields = ["id", "balance_due", "created_at", "updated_at"]

    def get_franchise_name(self, obj):
        return obj.franchise.name if obj.franchise else None


# ---------------------------------------------------------------------------
# Franchise Request (the onboarding workflow)
# ---------------------------------------------------------------------------

class FranchiseRequestSerializer(serializers.ModelSerializer):
    requested_by_name = serializers.SerializerMethodField()
    reviewed_by_name = serializers.SerializerMethodField()
    completed_by_name = serializers.SerializerMethodField()
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    invoice = InvoiceSerializer(read_only=True)
    franchise = FranchiseSerializer(read_only=True)

    class Meta:
        model = FranchiseRequest
        fields = [
            "id",
            "requested_by", "requested_by_name",
            "proposed_franchise_name", "proposed_address",
            "client_name", "client_email", "client_phone",
            "quoted_amount", "notes",
            "status", "status_display",
            "invoice",
            "reviewed_by", "reviewed_by_name", "reviewed_at", "rejection_reason",
            "franchise",
            "completed_by", "completed_by_name", "completed_at",
            "created_at", "updated_at",
        ]
        read_only_fields = [
            "id", "requested_by", "status", "invoice",
            "reviewed_by", "reviewed_at", "rejection_reason",
            "franchise", "completed_by", "completed_at",
            "created_at", "updated_at",
        ]

    def get_requested_by_name(self, obj):
        return display_name(obj.requested_by)

    def get_reviewed_by_name(self, obj):
        return display_name(obj.reviewed_by)

    def get_completed_by_name(self, obj):
        return display_name(obj.completed_by)


class FranchiseRequestCreateSerializer(serializers.ModelSerializer):
    """What a Sales user actually submits — the rest of the fields on
    FranchiseRequest are set by the workflow (accountant/IT), not the requester."""

    class Meta:
        model = FranchiseRequest
        fields = [
            "id", "proposed_franchise_name", "proposed_address",
            "client_name", "client_email", "client_phone",
            "quoted_amount", "notes",
        ]
        read_only_fields = ["id"]


class ApproveFranchiseRequestSerializer(serializers.Serializer):
    """Body for POST /franchise-requests/{id}/approve/ — accountant raises the invoice here."""

    invoice_number = serializers.CharField(max_length=50)
    invoice_date = serializers.DateField()
    due_date = serializers.DateField(required=False, allow_null=True)
    total_amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    subtotal = serializers.DecimalField(max_digits=12, decimal_places=2, required=False)
    tax_amount = serializers.DecimalField(max_digits=12, decimal_places=2, required=False)
    notes = serializers.CharField(required=False, allow_blank=True)


class RejectFranchiseRequestSerializer(serializers.Serializer):
    reason = serializers.CharField(allow_blank=True, required=False)


class MarkInvoicePaidSerializer(serializers.Serializer):
    payment_method = serializers.ChoiceField(choices=Invoice.PaymentMethod.choices, required=False)
    transaction_id = serializers.CharField(required=False, allow_blank=True)
    amount_paid = serializers.DecimalField(max_digits=12, decimal_places=2, required=False)


class CreateFranchiseSerializer(serializers.Serializer):
    """Body for POST /franchise-requests/{id}/create_franchise/ — IT sets up
    the franchise + its login here. Only allowed once the request is PAID."""

    franchise_name = serializers.CharField(max_length=100, required=False)
    address = serializers.CharField(required=False)
    product_ids = serializers.ListField(child=serializers.IntegerField(), required=False, allow_empty=True)

    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, validators=[validate_password])
    email = serializers.EmailField(required=False, allow_blank=True)
    role = serializers.ChoiceField(choices=FranchiseUserProfile.ROLE_CHOICES, default="FRANCHISE_ADMIN")

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("That username is already taken.")
        return value