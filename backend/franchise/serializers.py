import uuid
from decimal import Decimal
from datetime import date, timedelta
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.db import transaction, models
from django.db.models import Q
from django.utils import timezone

from users.models import (
    Franchise,
    Products,
    Organization,
    FranchiseUserProfile,
    FranchiseProductAllocation,
)
from .models import (
    OrganizationProduct,
    OrganizationUser,
    UserProductAccess,
    ClientLicenseRequest,
    ClientLicenseRequestItem,
    ClientInvoice,
    ClientInvoiceItem,
)
from .services.remote_provisioning import RemoteProductService, RemoteSoftwareAPIError

User = get_user_model()


# ---------------------------------------------------------------------------
# Franchise Team Member Management (FRANCHISE_IT, SALES, ACCOUNTANT)
# ---------------------------------------------------------------------------

class FranchiseTeamMemberSerializer(serializers.ModelSerializer):
    franchise = serializers.PrimaryKeyRelatedField(queryset=Franchise.objects.all(), required=False)
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, validators=[validate_password])
    email = serializers.EmailField(write_only=True, required=False, allow_blank=True)
    first_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    last_name = serializers.CharField(write_only=True, required=False, allow_blank=True)

    user_id = serializers.IntegerField(source="user.id", read_only=True)
    user_username = serializers.CharField(source="user.username", read_only=True)
    user_email = serializers.CharField(source="user.email", read_only=True)
    user_first_name = serializers.CharField(source="user.first_name", read_only=True)
    user_last_name = serializers.CharField(source="user.last_name", read_only=True)
    franchise_name = serializers.CharField(source="franchise.name", read_only=True)

    class Meta:
        model = FranchiseUserProfile
        fields = [
            "id",
            "franchise",
            "franchise_name",
            "role",
            "user_id",
            "user_username",
            "user_email",
            "user_first_name",
            "user_last_name",
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value

    def create(self, validated_data):
        username = validated_data.pop("username")
        password = validated_data.pop("password")
        email = validated_data.pop("email", "")
        first_name = validated_data.pop("first_name", "")
        last_name = validated_data.pop("last_name", "")

        with transaction.atomic():
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email,
                first_name=first_name,
                last_name=last_name,
                role="",  # Franchise team user, role stored on FranchiseUserProfile
            )
            profile = FranchiseUserProfile.objects.create(
                user=user,
                **validated_data,
            )
        return profile


# ---------------------------------------------------------------------------
# Organization Serializer
# ---------------------------------------------------------------------------

class OrganizationSerializer(serializers.ModelSerializer):
    franchise = serializers.PrimaryKeyRelatedField(queryset=Franchise.objects.all(), required=False)
    franchise_name = serializers.CharField(source="franchise.name", read_only=True)
    subscriptions_count = serializers.SerializerMethodField()
    active_licenses_count = serializers.SerializerMethodField()

    class Meta:
        model = Organization
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "gstin",
            "address",
            "city",
            "state",
            "pincode",
            "country",
            "franchise",
            "franchise_name",
            "subscriptions_count",
            "active_licenses_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_subscriptions_count(self, obj):
        return obj.subscriptions.filter(is_active=True).count()

    def get_active_licenses_count(self, obj):
        total = 0
        for sub in obj.subscriptions.filter(is_active=True):
            total += sub.license_count
        return total


# ---------------------------------------------------------------------------
# Organization Product / SaaS Subscription Serializer
# ---------------------------------------------------------------------------

class OrganizationProductSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source="organization.name", read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2, read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    assigned_by_username = serializers.CharField(source="assigned_by.username", read_only=True)

    used_licenses = serializers.IntegerField(read_only=True)
    available_licenses = serializers.IntegerField(read_only=True)
    is_valid = serializers.BooleanField(read_only=True)

    class Meta:
        model = OrganizationProduct
        fields = [
            "id",
            "organization",
            "organization_name",
            "product",
            "product_name",
            "product_price",
            "license_count",
            "used_licenses",
            "available_licenses",
            "license_key",
            "subscription_start",
            "subscription_end",
            "status",
            "status_display",
            "is_active",
            "is_valid",
            "notes",
            "assigned_by",
            "assigned_by_username",
            "assigned_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "license_key", "assigned_at", "created_at", "updated_at"]

    def validate_license_count(self, value):
        if value < 1:
            raise serializers.ValidationError("License count must be at least 1.")
        return value

    def validate(self, attrs):
        organization = attrs.get("organization") or getattr(self.instance, "organization", None)
        product = attrs.get("product") or getattr(self.instance, "product", None)
        license_count = attrs.get("license_count", getattr(self.instance, "license_count", 0))

        if organization and product:
            franchise = organization.franchise
            if franchise:
                allocation = FranchiseProductAllocation.objects.filter(
                    franchise=franchise, product=product
                ).first()
                if not allocation and product in franchise.products.all():
                    allocation = FranchiseProductAllocation.objects.create(
                        franchise=franchise, product=product, total_licenses=50
                    )
                if not allocation:
                    raise serializers.ValidationError({
                        "product": f"Product '{product.name}' has not been allotted to franchise '{franchise.name}' by ITSOFTLAB360."
                    })

                used_by_others = OrganizationProduct.objects.filter(
                    organization__franchise=franchise,
                    product=product,
                    is_active=True,
                ).exclude(pk=getattr(self.instance, "pk", None)).aggregate(
                    models.Sum("license_count")
                )["license_count__sum"] or 0

                available = max(0, allocation.total_licenses - used_by_others)
                if license_count > available:
                    raise serializers.ValidationError({
                        "license_count": (
                            f"Cannot allot {license_count} licenses for '{product.name}'. "
                            f"Only {available} licenses remain in franchise quota (Total allotted: {allocation.total_licenses}, Used: {used_by_others})."
                        )
                    })

        return attrs


# ---------------------------------------------------------------------------
# User Product Access Serializer
# ---------------------------------------------------------------------------

class UserProductAccessSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source="subscription.product.id", read_only=True)
    product_name = serializers.CharField(source="subscription.product.name", read_only=True)
    organization_name = serializers.CharField(source="organization_user.organization.name", read_only=True)
    username = serializers.CharField(source="organization_user.user.username", read_only=True)

    class Meta:
        model = UserProductAccess
        fields = [
            "id",
            "organization_user",
            "username",
            "organization_name",
            "subscription",
            "product_id",
            "product_name",
            "external_user_id",
            "sync_status",
            "last_synced_at",
            "is_active",
            "permissions",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


# ---------------------------------------------------------------------------
# Assign Product Access (License check enforcement)
# ---------------------------------------------------------------------------

class AssignProductAccessSerializer(serializers.Serializer):
    subscription_id = serializers.IntegerField()
    organization_user_id = serializers.IntegerField()
    external_user_id = serializers.CharField(required=False, allow_blank=True)
    permissions = serializers.DictField(required=False, default=dict)

    def validate(self, attrs):
        subscription_id = attrs.get("subscription_id")
        org_user_id = attrs.get("organization_user_id")

        try:
            subscription = OrganizationProduct.objects.get(id=subscription_id)
        except OrganizationProduct.DoesNotExist:
            raise serializers.ValidationError({"subscription_id": "Subscription not found."})

        try:
            org_user = OrganizationUser.objects.get(id=org_user_id)
        except OrganizationUser.DoesNotExist:
            raise serializers.ValidationError({"organization_user_id": "Organization user not found."})

        if subscription.organization_id != org_user.organization_id:
            raise serializers.ValidationError(
                "The organization user does not belong to the same organization as the subscription."
            )

        if not subscription.is_valid:
            raise serializers.ValidationError(
                f"Subscription for {subscription.product.name} is not active or has expired."
            )

        # Check if user already has access to this subscription
        existing_access = UserProductAccess.objects.filter(
            organization_user=org_user,
            subscription=subscription,
        ).first()

        if existing_access and existing_access.is_active:
            raise serializers.ValidationError(
                f"User already has active access to {subscription.product.name}."
            )

        # Enforce license count limit
        if subscription.available_licenses <= 0 and not existing_access:
            raise serializers.ValidationError(
                f"License limit of {subscription.license_count} reached for {subscription.product.name}. "
                f"All {subscription.used_licenses} licenses are currently assigned."
            )

        attrs["subscription"] = subscription
        attrs["organization_user"] = org_user
        attrs["existing_access"] = existing_access
        return attrs

    def save(self):
        subscription = self.validated_data["subscription"]
        org_user = self.validated_data["organization_user"]
        existing_access = self.validated_data.get("existing_access")
        external_user_id = self.validated_data.get("external_user_id") or f"ext_{org_user.user.id}_{subscription.product.id}"
        permissions = self.validated_data.get("permissions", {})

        if existing_access:
            existing_access.is_active = True
            existing_access.external_user_id = external_user_id
            existing_access.permissions = permissions
            existing_access.sync_status = UserProductAccess.SyncStatus.SYNCED
            existing_access.last_synced_at = timezone.now()
            existing_access.save()
            return existing_access

        access = UserProductAccess.objects.create(
            organization_user=org_user,
            subscription=subscription,
            external_user_id=external_user_id,
            permissions=permissions,
            sync_status=UserProductAccess.SyncStatus.SYNCED,
            last_synced_at=timezone.now(),
            is_active=True,
        )
        return access


# ---------------------------------------------------------------------------
# Organization User Serializer (Provisioning)
# ---------------------------------------------------------------------------

class OrganizationUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, validators=[validate_password], required=False, allow_blank=True)
    email = serializers.EmailField(write_only=True, required=False, allow_blank=True)
    first_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    last_name = serializers.CharField(write_only=True, required=False, allow_blank=True)

    user_id = serializers.IntegerField(source="user.id", read_only=True)
    user_username = serializers.CharField(source="user.username", read_only=True)
    user_email = serializers.CharField(source="user.email", read_only=True)
    user_first_name = serializers.CharField(source="user.first_name", read_only=True)
    user_last_name = serializers.CharField(source="user.last_name", read_only=True)
    organization_name = serializers.CharField(source="organization.name", read_only=True)

    product_accesses = UserProductAccessSerializer(many=True, read_only=True)
    external_product_ids = serializers.DictField(read_only=True)
    active_products = serializers.ListField(read_only=True)

    class Meta:
        model = OrganizationUser
        fields = [
            "id",
            "organization",
            "organization_name",
            "user",
            "user_id",
            "user_username",
            "user_email",
            "user_first_name",
            "user_last_name",
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "role",
            "designation",
            "department",
            "is_active",
            "product_accesses",
            "external_product_ids",
            "active_products",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "user", "created_at", "updated_at", "external_product_ids", "active_products"]

    def create(self, validated_data):
        username = validated_data.pop("username")
        password = validated_data.pop("password", None)
        email = validated_data.pop("email", "")
        first_name = validated_data.pop("first_name", "")
        last_name = validated_data.pop("last_name", "")

        with transaction.atomic():
            user = User.objects.filter(username=username).first()
            if not user:
                user = User.objects.create_user(
                    username=username,
                    password=password or f"P@{uuid.uuid4().hex[:10]}",
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    role="",
                )
            else:
                if password:
                    user.set_password(password)
                if email and not user.email:
                    user.email = email
                if first_name and not user.first_name:
                    user.first_name = first_name
                if last_name and not user.last_name:
                    user.last_name = last_name
                user.save()

            org_user, _ = OrganizationUser.objects.update_or_create(
                user=user,
                organization=validated_data.get("organization"),
                defaults=validated_data,
            )
        return org_user


# ---------------------------------------------------------------------------
# Organization User Provisioning Serializer (Remote API + Multi-Product Sync)
# ---------------------------------------------------------------------------

class ProvisionOrganizationUserSerializer(serializers.Serializer):
    """
    Provisions a user into an Organization and allocates a seat for a subscribed product:
    1. Checks subscription validity & available license count.
    2. Calls the remote software API (via remote_api_url) to create user remotely.
    3. Reuses existing central User/OrganizationUser if user already exists, or creates new.
    4. Saves the external user ID in UserProductAccess.
    5. Decrements available licenses (counts 1 license used).
    """
    organization_id = serializers.IntegerField(required=False)
    product_id = serializers.IntegerField(required=False)
    product_name = serializers.CharField(required=False)

    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=False, allow_blank=True, default="")
    last_name = serializers.CharField(required=False, allow_blank=True, default="")
    password = serializers.CharField(required=False, allow_blank=True, default="")

    role = serializers.ChoiceField(
        choices=OrganizationUser.ROLE_CHOICES,
        default="ORG_EMPLOYEE",
    )
    designation = serializers.CharField(required=False, allow_blank=True, default="")
    department = serializers.CharField(required=False, allow_blank=True, default="")
    permissions = serializers.DictField(required=False, default=dict)

    def validate(self, attrs):
        org_id = attrs.get("organization_id")
        product_id = attrs.get("product_id")
        product_name = attrs.get("product_name")

        request = self.context.get("request")
        if not org_id and request:
            user = request.user
            first_org = user.organization_memberships.first()
            if first_org:
                org_id = first_org.organization_id
                attrs["organization_id"] = org_id

        if not org_id:
            raise serializers.ValidationError({"organization_id": "organization_id is required."})

        try:
            organization = Organization.objects.get(id=org_id)
        except Organization.DoesNotExist:
            raise serializers.ValidationError({"organization_id": "Organization not found."})

        if not product_id and not product_name:
            raise serializers.ValidationError({"product_id": "Either product_id or product_name is required."})

        if product_id:
            subscription = OrganizationProduct.objects.filter(
                organization=organization,
                product_id=product_id,
            ).first()
            if not subscription:
                product = Products.objects.filter(id=product_id).first()
                product_label = product.name if product else f"ID {product_id}"
                raise serializers.ValidationError(
                    {"product": f"Organization '{organization.name}' does not have a subscription for '{product_label}'."}
                )
        else:
            subscription = OrganizationProduct.objects.filter(
                organization=organization,
                product__name__iexact=product_name,
            ).first()
            if not subscription:
                raise serializers.ValidationError(
                    {"product": f"Organization '{organization.name}' does not have a subscription for '{product_name}'."}
                )

        product = subscription.product

        if not subscription.is_valid:
            raise serializers.ValidationError(
                {"subscription": f"Subscription for '{product.name}' is inactive or has expired."}
            )

        username = attrs.get("username")
        email = attrs.get("email")
        existing_user = User.objects.filter(Q(username__iexact=username) | Q(email__iexact=email)).first()

        existing_access = None
        existing_org_user = None
        if existing_user:
            existing_org_user = OrganizationUser.objects.filter(
                organization=organization,
                user=existing_user,
            ).first()
            if existing_org_user:
                existing_access = UserProductAccess.objects.filter(
                    organization_user=existing_org_user,
                    subscription=subscription,
                ).first()
                if existing_access and existing_access.is_active:
                    raise serializers.ValidationError(
                        f"User '{existing_user.username}' already has active access to '{product.name}'."
                    )

        # License seat check: must have at least 1 license free if not reactivating an inactive access
        if subscription.available_licenses <= 0 and not (existing_access and not existing_access.is_active):
            raise serializers.ValidationError(
                f"License limit reached for '{product.name}'. "
                f"All {subscription.license_count} licenses are currently assigned."
            )

        attrs["organization"] = organization
        attrs["product"] = product
        attrs["subscription"] = subscription
        attrs["existing_user"] = existing_user
        attrs["existing_org_user"] = existing_org_user
        attrs["existing_access"] = existing_access
        return attrs

    def save(self):
        org = self.validated_data["organization"]
        product = self.validated_data["product"]
        sub = self.validated_data["subscription"]
        existing_user = self.validated_data.get("existing_user")
        existing_org_user = self.validated_data.get("existing_org_user")
        existing_access = self.validated_data.get("existing_access")

        username = self.validated_data["username"]
        email = self.validated_data["email"]
        first_name = self.validated_data.get("first_name", "")
        last_name = self.validated_data.get("last_name", "")
        password = self.validated_data.get("password")
        role = self.validated_data.get("role", "ORG_EMPLOYEE")
        designation = self.validated_data.get("designation", "")
        department = self.validated_data.get("department", "")
        permissions = self.validated_data.get("permissions", {})

        # Step 1: Call Remote Software API via remote URL
        remote_data = {
            "username": username,
            "email": email,
            "first_name": first_name or (existing_user.first_name if existing_user else ""),
            "last_name": last_name or (existing_user.last_name if existing_user else ""),
            "role": role,
            "designation": designation,
            "department": department,
            "permissions": permissions,
        }

        try:
            remote_result = RemoteProductService.create_remote_user(
                product=product,
                user_data=remote_data,
                subscription=sub,
            )
        except RemoteSoftwareAPIError as err:
            raise serializers.ValidationError({"remote_api_error": str(err)})

        external_user_id = remote_result.get("external_user_id")

        # Step 2: Atomic DB commit in ITSOFTLAB360
        with transaction.atomic():
            user = existing_user
            if not user:
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password=password or f"P@{uuid.uuid4().hex[:10]}",
                    first_name=first_name,
                    last_name=last_name,
                    role="",
                )
            elif password:
                user.set_password(password)
                user.save()

            org_user = existing_org_user
            if not org_user:
                org_user = OrganizationUser.objects.create(
                    organization=org,
                    user=user,
                    role=role,
                    designation=designation,
                    department=department,
                    is_active=True,
                )

            if existing_access:
                existing_access.is_active = True
                existing_access.external_user_id = external_user_id
                existing_access.permissions = permissions
                existing_access.sync_status = UserProductAccess.SyncStatus.SYNCED
                existing_access.last_synced_at = timezone.now()
                existing_access.save()
                access = existing_access
            else:
                access = UserProductAccess.objects.create(
                    organization_user=org_user,
                    subscription=sub,
                    external_user_id=external_user_id,
                    permissions=permissions,
                    sync_status=UserProductAccess.SyncStatus.SYNCED,
                    last_synced_at=timezone.now(),
                    is_active=True,
                )

        sub.refresh_from_db()
        return {
            "organization_user": org_user,
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "product_access": access,
            "product_name": product.name,
            "external_user_id": external_user_id,
            "used_licenses": sub.used_licenses,
            "available_licenses_remaining": sub.available_licenses,
            "is_simulated": remote_result.get("is_simulated", False),
        }


# ---------------------------------------------------------------------------
# Subscription Verification (Used by 12 external industry web portals)
# ---------------------------------------------------------------------------

class VerifySubscriptionRequestSerializer(serializers.Serializer):
    license_key = serializers.UUIDField(required=False)
    organization_id = serializers.IntegerField(required=False)
    product_name = serializers.CharField(required=False)
    product_id = serializers.IntegerField(required=False)
    user_identifier = serializers.CharField(
        required=False,
        help_text="Optional user ID, username, or email to verify user-level license access",
    )


# ===========================================================================
# Franchise Client Sales & Invoicing Serializers
# ===========================================================================

class ClientLicenseRequestItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2, read_only=True)
    subscription_price_per_user = serializers.DecimalField(
        source="product.subscription_price_per_user", max_digits=10, decimal_places=2, read_only=True
    )
    billing_cycle = serializers.CharField(source="product.billing_cycle", read_only=True)

    class Meta:
        model = ClientLicenseRequestItem
        fields = [
            "id",
            "product",
            "product_name",
            "product_price",
            "subscription_price_per_user",
            "billing_cycle",
            "license_count",
            "duration_months",
            "quoted_price",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class ClientLicenseRequestSerializer(serializers.ModelSerializer):
    franchise = serializers.PrimaryKeyRelatedField(queryset=Franchise.objects.all(), required=False)
    requested_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    items = ClientLicenseRequestItemSerializer(many=True, required=False)
    requested_by_username = serializers.CharField(source="requested_by.username", read_only=True)
    franchise_name = serializers.CharField(source="franchise.name", read_only=True)
    invoice_number = serializers.CharField(source="invoice.invoice_number", read_only=True)

    class Meta:
        model = ClientLicenseRequest

        fields = [
            "id",
            "franchise",
            "franchise_name",
            "requested_by",
            "requested_by_username",
            "client_name",
            "client_email",
            "client_phone",
            "organization_name",
            "billing_address",
            "city",
            "state",
            "pincode",
            "country",
            "customer_gstin",
            "quoted_amount",
            "notes",
            "status",
            "invoice",
            "invoice_number",
            "organization",
            "reviewed_by",
            "reviewed_at",
            "rejection_reason",
            "fulfilled_by",
            "fulfilled_at",
            "items",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "invoice",
            "invoice_number",
            "organization",
            "reviewed_by",
            "reviewed_at",
            "rejection_reason",
            "fulfilled_by",
            "fulfilled_at",
            "created_at",
            "updated_at",
        ]

    def validate(self, attrs):
        request_user = self.context.get("request").user if "request" in self.context else None
        franchise = attrs.get("franchise")
        if not franchise and request_user:
            profile = getattr(request_user, "franchise_profile", None)
            if profile and profile.franchise:
                franchise = profile.franchise

        items_data = attrs.get("items", [])
        if franchise and items_data:
            for item in items_data:
                prod = item.get("product")
                req_count = item.get("license_count", 1)
                allocation = FranchiseProductAllocation.objects.filter(
                    franchise=franchise, product=prod
                ).first()
                if not allocation and prod in franchise.products.all():
                    allocation = FranchiseProductAllocation.objects.create(
                        franchise=franchise, product=prod, total_licenses=50
                    )
                if not allocation:
                    raise serializers.ValidationError(
                        f"Product '{prod.name}' is not in your franchise's allotted catalog."
                    )
                if req_count > allocation.available_licenses:
                    raise serializers.ValidationError(
                        f"Cannot request {req_count} licenses for '{prod.name}'. Only {allocation.available_licenses} remaining in franchise quota."
                    )
                # Enforce fixed owner price (Tealogy franchise rule: franchise cannot change price)
                item["quoted_price"] = prod.subscription_price_per_user if (hasattr(prod, "subscription_price_per_user") and prod.subscription_price_per_user and prod.subscription_price_per_user > 0) else prod.price

        return attrs

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        request_user = self.context["request"].user if "request" in self.context else None
        
        # If requested_by not explicitly provided, default to current user
        if not validated_data.get("requested_by") and request_user:
            validated_data["requested_by"] = request_user

        franchise = validated_data.get("franchise")
        if not franchise and request_user:
            profile = getattr(request_user, "franchise_profile", None)
            if profile and profile.franchise:
                franchise = profile.franchise
                validated_data["franchise"] = franchise

        with transaction.atomic():
            total_quoted = Decimal("0.00")
            for item_data in items_data:
                prod = item_data.get("product")
                req_count = item_data.get("license_count", 1)

                allocation = FranchiseProductAllocation.objects.filter(
                    franchise=franchise, product=prod
                ).first()
                if not allocation and franchise and prod in franchise.products.all():
                    allocation = FranchiseProductAllocation.objects.create(
                        franchise=franchise, product=prod, total_licenses=50
                    )
                if not allocation:
                    raise serializers.ValidationError(
                        f"Product '{prod.name}' is not in your franchise's allotted catalog."
                    )
                if req_count > allocation.available_licenses:
                    raise serializers.ValidationError(
                        f"Requested {req_count} licenses for '{prod.name}', but only {allocation.available_licenses} licenses are available under your franchise quota."
                    )

                # Strict price immutability: fixed owner price
                item_data["quoted_price"] = prod.price
                total_quoted += prod.price * req_count

            validated_data["quoted_amount"] = total_quoted
            license_request = ClientLicenseRequest.objects.create(**validated_data)
            for item_data in items_data:
                ClientLicenseRequestItem.objects.create(request=license_request, **item_data)

        return license_request


class ClientInvoiceItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = ClientInvoiceItem
        fields = [
            "id",
            "product",
            "product_name",
            "description",
            "license_count",
            "unit_price",
            "discount_amount",
            "taxable_amount",
            "tax_percentage",
            "tax_amount",
            "total_amount",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class ClientInvoiceSerializer(serializers.ModelSerializer):
    franchise = serializers.PrimaryKeyRelatedField(queryset=Franchise.objects.all(), required=False)
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    items = ClientInvoiceItemSerializer(many=True, required=False)
    created_by_username = serializers.CharField(source="created_by.username", read_only=True)
    franchise_name = serializers.CharField(source="franchise.name", read_only=True)
    license_request_id = serializers.IntegerField(source="license_request.id", read_only=True)

    class Meta:
        model = ClientInvoice

        fields = [
            "id",
            "invoice_number",
            "franchise",
            "franchise_name",
            "created_by",
            "created_by_username",
            "license_request_id",
            "customer_name",
            "customer_email",
            "customer_phone",
            "organization_name",
            "billing_address",
            "billing_city",
            "billing_state",
            "billing_pincode",
            "billing_country",
            "customer_gstin",
            "invoice_date",
            "due_date",
            "subtotal",
            "discount_amount",
            "taxable_amount",
            "tax_amount",
            "total_amount",
            "amount_paid",
            "balance_due",
            "status",
            "payment_method",
            "payment_date",
            "transaction_id",
            "email_sent",
            "email_sent_at",
            "email_recipient",
            "notes",
            "terms_and_conditions",
            "items",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "balance_due",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        if not validated_data.get("invoice_number"):
            validated_data["invoice_number"] = f"INV-FR-{uuid.uuid4().hex[:8].upper()}"

        with transaction.atomic():
            invoice = ClientInvoice.objects.create(**validated_data)
            for item in items_data:
                ClientInvoiceItem.objects.create(invoice=invoice, **item)
        return invoice


class GenerateClientInvoiceFromRequestSerializer(serializers.Serializer):
    """
    Accountant generates a ClientInvoice from a ClientLicenseRequest.
    Computes taxes, line item totals, and links the invoice to the request.
    """

    tax_percentage = serializers.DecimalField(max_digits=5, decimal_places=2, default=Decimal("18.00"))
    discount_amount = serializers.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    due_days = serializers.IntegerField(default=15)
    send_email = serializers.BooleanField(default=True)
    notes = serializers.CharField(required=False, allow_blank=True)
    terms_and_conditions = serializers.CharField(required=False, allow_blank=True)

    def create_invoice(self, license_request, accountant_user):
        if license_request.status not in [ClientLicenseRequest.Status.PENDING, ClientLicenseRequest.Status.REJECTED]:
            raise serializers.ValidationError(
                f"Cannot generate invoice for request with status '{license_request.status}'."
            )

        data = self.validated_data
        tax_pct = data.get("tax_percentage", Decimal("18.00"))
        discount = data.get("discount_amount", Decimal("0.00"))
        due_days = data.get("due_days", 15)

        with transaction.atomic():
            subtotal = Decimal("0.00")
            items_to_create = []

            for req_item in license_request.items.select_related("product").all():
                # Strict owner fixed price: cannot be altered by franchise
                unit_price = req_item.product.price
                line_base = unit_price * req_item.license_count
                subtotal += line_base
                line_tax = (line_base * tax_pct) / Decimal("100.00")
                line_total = line_base + line_tax

                items_to_create.append({
                    "product": req_item.product,
                    "description": f"{req_item.product.name} ({req_item.license_count} user seats, {req_item.duration_months} months)",
                    "license_count": req_item.license_count,
                    "unit_price": unit_price,
                    "discount_amount": Decimal("0.00"),
                    "taxable_amount": line_base,
                    "tax_percentage": tax_pct,
                    "tax_amount": line_tax,
                    "total_amount": line_total,
                })

            taxable_total = max(Decimal("0.00"), subtotal - discount)
            total_tax = (taxable_total * tax_pct) / Decimal("100.00")
            grand_total = taxable_total + total_tax

            today = timezone.now().date()
            due_date = today + timedelta(days=due_days)
            invoice_num = f"INV-FR-{license_request.franchise.id}-{uuid.uuid4().hex[:6].upper()}"

            invoice = ClientInvoice.objects.create(
                invoice_number=invoice_num,
                franchise=license_request.franchise,
                created_by=accountant_user,
                customer_name=license_request.client_name,
                customer_email=license_request.client_email,
                customer_phone=license_request.client_phone or "",
                organization_name=license_request.organization_name,
                billing_address=license_request.billing_address or "",
                billing_city=license_request.city or "",
                billing_state=license_request.state or "",
                billing_pincode=license_request.pincode or "",
                billing_country=license_request.country or "India",
                customer_gstin=license_request.customer_gstin or "",
                invoice_date=today,
                due_date=due_date,
                subtotal=subtotal,
                discount_amount=discount,
                taxable_amount=taxable_total,
                tax_amount=total_tax,
                total_amount=grand_total,
                amount_paid=Decimal("0.00"),
                balance_due=grand_total,
                status=ClientInvoice.Status.SENT if data.get("send_email") else ClientInvoice.Status.DRAFT,
                email_sent=bool(data.get("send_email")),
                email_sent_at=timezone.now() if data.get("send_email") else None,
                email_recipient=license_request.client_email if data.get("send_email") else None,
                notes=data.get("notes", license_request.notes),
                terms_and_conditions=data.get("terms_and_conditions", "Payment due within terms."),
            )

            for item_dict in items_to_create:
                ClientInvoiceItem.objects.create(invoice=invoice, **item_dict)

            # Link back to request
            license_request.invoice = invoice
            license_request.reviewed_by = accountant_user
            license_request.reviewed_at = timezone.now()
            license_request.status = ClientLicenseRequest.Status.INVOICE_GENERATED
            license_request.save()

        return invoice


class MarkClientInvoicePaidSerializer(serializers.Serializer):
    """
    Records payment of a ClientInvoice and transitions status to PAID.
    Transitions related ClientLicenseRequest status to 'PAID' (Queue for IT).
    """

    payment_method = serializers.ChoiceField(choices=ClientInvoice.PaymentMethod.choices, default=ClientInvoice.PaymentMethod.UPI)
    transaction_id = serializers.CharField(max_length=255, default="TXN-MANUAL-VERIFIED")
    amount = serializers.DecimalField(max_digits=12, decimal_places=2, required=False)

    def mark_paid(self, invoice):
        data = self.validated_data
        paid_amount = data.get("amount") or invoice.total_amount

        with transaction.atomic():
            invoice.amount_paid = paid_amount
            invoice.balance_due = max(Decimal("0.00"), invoice.total_amount - paid_amount)
            invoice.payment_method = data.get("payment_method")
            invoice.transaction_id = data.get("transaction_id")
            invoice.payment_date = timezone.now()

            if invoice.balance_due <= Decimal("0.00"):
                invoice.status = ClientInvoice.Status.PAID
            else:
                invoice.status = ClientInvoice.Status.PARTIALLY_PAID

            invoice.save()

            # Transition linked sales request to PAID (Ready for IT handoff)
            req = getattr(invoice, "license_request", None)
            if req and invoice.status == ClientInvoice.Status.PAID:
                req.status = ClientLicenseRequest.Status.PAID
                req.save()

        return invoice


class ITFulfillRequestSerializer(serializers.Serializer):
    """
    Executed by Franchise IT team once payment clears:
    1. Creates/resolves Organization.
    2. Creates OrganizationProduct subscriptions for all requested items
       (enforcing that products were purchased by the Franchise).
    3. Creates Organization Admin (ORG_ADMIN) user.
    4. Guarantees 0 license seats are consumed by the Org Admin.
    """

    org_admin_username = serializers.CharField(max_length=150)
    org_admin_email = serializers.EmailField()
    org_admin_password = serializers.CharField(write_only=True, required=False, default="OrgAdmin@1234")
    org_admin_first_name = serializers.CharField(required=False, default="")
    org_admin_last_name = serializers.CharField(required=False, default="")

    def validate_org_admin_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(f"Username '{value}' already exists.")
        return value

    def fulfill(self, license_request, it_user):
        if license_request.status != ClientLicenseRequest.Status.PAID:
            raise serializers.ValidationError(
                f"Only paid requests can be provisioned by IT. Current status: '{license_request.status}'."
            )

        data = self.validated_data
        franchise = license_request.franchise
        today = timezone.now().date()

        with transaction.atomic():
            # 1. Create Organization
            organization, _ = Organization.objects.get_or_create(
                franchise=franchise,
                name=license_request.organization_name,
                defaults={
                    "email": license_request.client_email,
                    "phone": license_request.client_phone or "",
                    "gstin": license_request.customer_gstin or "",
                    "address": license_request.billing_address or "",
                    "city": license_request.city or "",
                    "state": license_request.state or "",
                    "pincode": license_request.pincode or "",
                    "country": license_request.country or "India",
                },
            )

            # 2. Assign Products from Franchise Inventory
            subscriptions_created = []
            for req_item in license_request.items.select_related("product").all():
                # Guard: ensure product was allotted to franchise and has available quota
                allocation = FranchiseProductAllocation.objects.filter(
                    franchise=franchise, product=req_item.product
                ).first()
                if not allocation and req_item.product in franchise.products.all():
                    allocation = FranchiseProductAllocation.objects.create(
                        franchise=franchise, product=req_item.product, total_licenses=50
                    )
                if not allocation:
                    raise serializers.ValidationError(
                        f"Product '{req_item.product.name}' is not held in your Franchise's allotted catalog."
                    )
                if req_item.license_count > allocation.available_licenses:
                    raise serializers.ValidationError(
                        f"Cannot provision {req_item.license_count} licenses for '{req_item.product.name}'. Only {allocation.available_licenses} remain in franchise quota."
                    )

                end_date = today + timedelta(days=30 * req_item.duration_months)
                sub, _ = OrganizationProduct.objects.get_or_create(
                    organization=organization,
                    product=req_item.product,
                    defaults={
                        "license_count": req_item.license_count,
                        "subscription_start": today,
                        "subscription_end": end_date,
                        "status": OrganizationProduct.Status.ACTIVE,
                        "assigned_by": it_user,
                        "notes": f"Provisioned via ClientLicenseRequest #{license_request.id}",
                    },
                )
                subscriptions_created.append(sub)

            # 3. Create Organization Admin User
            org_admin_user = User.objects.create_user(
                username=data["org_admin_username"],
                email=data["org_admin_email"],
                password=data.get("org_admin_password", "OrgAdmin@1234"),
                first_name=data.get("org_admin_first_name", ""),
                last_name=data.get("org_admin_last_name", ""),
                role="",  # Standard user role, scoped by OrganizationUser
            )

            # 4. Link as ORG_ADMIN in OrganizationUser
            org_membership = OrganizationUser.objects.create(
                organization=organization,
                user=org_admin_user,
                role="ORG_ADMIN",
                designation="Organization Administrator",
            )

            # 5. ZERO LICENSE CONSUMPTION ENFORCEMENT:
            # We explicitly do NOT create any UserProductAccess record for org_admin_user.
            # All subscriptions have used_licenses == 0, full license_count available for employees!
            for sub in subscriptions_created:
                assert sub.used_licenses == 0, "Organization Admin should not consume any license quota!"

            # 6. Mark request as provisioned
            license_request.organization = organization
            license_request.fulfilled_by = it_user
            license_request.fulfilled_at = timezone.now()
            license_request.status = ClientLicenseRequest.Status.PROVISIONED
            license_request.save()

        return {
            "organization_id": organization.id,
            "organization_name": organization.name,
            "org_admin_username": org_admin_user.username,
            "subscriptions_count": len(subscriptions_created),
            "subscriptions": [
                {
                    "product_id": s.product.id,
                    "product_name": s.product.name,
                    "license_count": s.license_count,
                    "available_licenses": s.available_licenses,
                    "license_key": str(s.license_key),
                    "status": s.status,
                }
                for s in subscriptions_created
            ],
        }