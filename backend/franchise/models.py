import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL

# Re-export models from users app for convenience and backwards-compatibility
from users.models import Franchise, FranchiseUserProfile, Organization

class OrganizationProduct(models.Model):
    """
    Products assigned/sold to an organization by a franchise.
    Tracks subscription validity, status, and allotted license count.

    Example:
        XYZ Hospital
            ├── HRMSM (15 Licenses)
            └── CRM (10 Licenses)
    """

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        ACTIVE = "active", "Active"
        EXPIRED = "expired", "Expired"
        CANCELLED = "cancelled", "Cancelled"

    organization = models.ForeignKey(
        "users.Organization",
        on_delete=models.CASCADE,
        related_name="subscriptions",
    )

    product = models.ForeignKey(
        "users.Products",
        on_delete=models.PROTECT,
        related_name="subscriptions",
    )

    assigned_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_subscriptions",
    )

    assigned_at = models.DateTimeField(
        auto_now_add=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    # --------------------------------------------------
    # Subscription & License Information
    # --------------------------------------------------

    license_count = models.PositiveIntegerField(
        default=1,
        help_text="Total number of licenses allotted for this product",
    )

    license_key = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
        help_text="Unique key used by external applications to verify product subscription",
    )

    subscription_start = models.DateField(
        null=True,
        blank=True,
    )

    subscription_end = models.DateField(
        null=True,
        blank=True,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )

    notes = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["organization", "product"],
                name="unique_organization_product",
            )
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.organization.name} - {self.product.name} ({self.license_count} licenses)"

    @property
    def used_licenses(self):
        """Count of active users currently granted access to this product."""
        return self.assigned_users.filter(is_active=True).count()

    @property
    def available_licenses(self):
        """Remaining unassigned licenses."""
        return max(0, self.license_count - self.used_licenses)

    @property
    def is_valid(self):
        """Check whether subscription is active and within validity period."""
        if not self.is_active or self.status != self.Status.ACTIVE:
            return False
        today = timezone.now().date()
        if self.subscription_start and today < self.subscription_start:
            return False
        if self.subscription_end and today > self.subscription_end:
            return False
        return True


class OrganizationUser(models.Model):
    """
    Connects a User to an Organization (e.g. employee/staff member).
    """

    ROLE_CHOICES = [
        ("ORG_ADMIN", "Organization Admin"),
        ("ORG_MANAGER", "Manager"),
        ("ORG_EMPLOYEE", "Employee"),
    ]

    organization = models.ForeignKey(
        "users.Organization",
        on_delete=models.CASCADE,
        related_name="members",
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="organization_memberships",
    )

    role = models.CharField(
        max_length=30,
        choices=ROLE_CHOICES,
        default="ORG_EMPLOYEE",
    )

    designation = models.CharField(
        max_length=100,
        blank=True,
    )

    department = models.CharField(
        max_length=100,
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["organization", "user"],
                name="unique_organization_user_membership",
            )
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.organization.name} ({self.role})"

    @property
    def external_product_ids(self):
        """Returns mapping of product name -> external_user_id for active subscriptions."""
        return {
            access.subscription.product.name: access.external_user_id
            for access in self.product_accesses.filter(is_active=True).select_related("subscription__product")
            if access.external_user_id
        }

    @property
    def active_products(self):
        """Returns list of product names the user currently has active access to."""
        return [
            access.subscription.product.name
            for access in self.product_accesses.filter(is_active=True).select_related("subscription__product")
        ]


class UserProductAccess(models.Model):
    """
    Allocates a license of a subscribed product to an organization user.
    Records external project database synchronization details.
    """

    class SyncStatus(models.TextChoices):
        SYNCED = "synced", "Synced"
        PENDING = "pending", "Pending"
        FAILED = "failed", "Failed"

    organization_user = models.ForeignKey(
        OrganizationUser,
        on_delete=models.CASCADE,
        related_name="product_accesses",
    )

    subscription = models.ForeignKey(
        OrganizationProduct,
        on_delete=models.CASCADE,
        related_name="assigned_users",
    )

    external_user_id = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="User ID in the project DB (e.g., HRMSM / CRM)",
    )

    sync_status = models.CharField(
        max_length=20,
        choices=SyncStatus.choices,
        default=SyncStatus.SYNCED,
    )

    last_synced_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    permissions = models.JSONField(
        default=dict,
        blank=True,
        help_text="Product-specific role and permissions inside target application",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["organization_user", "subscription"],
                name="unique_user_product_subscription",
            )
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.organization_user.user.username} -> {self.subscription.product.name}"


# ===========================================================================
# Franchise Client Onboarding, Sales, Billing & Invoicing Models
# ===========================================================================

class ClientLicenseRequest(models.Model):
    """
    Initiated by Franchise Sales team when selling licenses to a prospective Client/Organization.
    Accountant reviews this request to generate the ClientInvoice.
    Once paid, IT fulfills this request by provisioning the Organization and Subscriptions.
    """

    class Status(models.TextChoices):
        PENDING = "pending", "Pending Accountant Review"
        INVOICE_GENERATED = "invoice_generated", "Invoice Generated"
        PAID = "paid", "Paid - Ready for IT"
        PROVISIONED = "provisioned", "Completed - Organization Provisioned"
        REJECTED = "rejected", "Rejected"

    franchise = models.ForeignKey(
        "users.Franchise",
        on_delete=models.CASCADE,
        related_name="license_requests",
    )

    requested_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="sales_license_requests",
        help_text="Franchise Sales member who raised this request",
    )

    # Client & Proposed Organization Info
    client_name = models.CharField(max_length=255)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=20, blank=True, null=True)
    organization_name = models.CharField(
        max_length=255,
        help_text="Company / Hospital / School / Enterprise name",
    )

    billing_address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    country = models.CharField(max_length=100, default="India")
    customer_gstin = models.CharField(max_length=15, blank=True, null=True)

    quoted_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Total quoted price",
    )
    notes = models.TextField(blank=True)
    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.PENDING,
    )

    # Fulfillment links
    invoice = models.OneToOneField(
        "ClientInvoice",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="license_request",
    )

    organization = models.OneToOneField(
        "users.Organization",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="client_license_request",
    )

    reviewed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviewed_license_requests",
        help_text="Franchise Accountant who approved or generated invoice",
    )
    reviewed_at = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(blank=True)

    fulfilled_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="fulfilled_license_requests",
        help_text="Franchise IT member who provisioned the Organization",
    )
    fulfilled_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Request for {self.organization_name} by {self.requested_by or 'Unknown'} ({self.status})"


class ClientLicenseRequestItem(models.Model):
    """
    Individual products and seat license counts requested in a ClientLicenseRequest.
    """

    request = models.ForeignKey(
        ClientLicenseRequest,
        on_delete=models.CASCADE,
        related_name="items",
    )

    product = models.ForeignKey(
        "users.Products",
        on_delete=models.PROTECT,
        related_name="requested_client_licenses",
        help_text="Product being subscribed to (must be in Franchise's purchased products)",
    )

    license_count = models.PositiveIntegerField(
        default=1,
        help_text="Number of user seats requested",
    )

    duration_months = models.PositiveIntegerField(
        default=12,
        help_text="Subscription validity in months",
    )

    quoted_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} ({self.license_count} seats) - {self.request.organization_name}"


class ClientInvoice(models.Model):
    """
    Franchise-to-Client Invoice generated by Franchise Accountant.
    Sent to client's email. Once paid, IT can provision the Organization and assign products.
    """

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        SENT = "sent", "Sent to Client"
        PAID = "paid", "Paid"
        PARTIALLY_PAID = "partially_paid", "Partially Paid"
        CANCELLED = "cancelled", "Cancelled"

    class PaymentMethod(models.TextChoices):
        UPI = "upi", "UPI"
        CARD = "card", "Card"
        BANK_TRANSFER = "bank_transfer", "Bank Transfer"
        CHEQUE = "cheque", "Cheque"
        CASH = "cash", "Cash"
        OTHER = "other", "Other"

    invoice_number = models.CharField(
        max_length=60,
        unique=True,
        help_text="Unique invoice number, e.g. INV-FR-{franchise_id}-{seq}",
    )

    franchise = models.ForeignKey(
        "users.Franchise",
        on_delete=models.CASCADE,
        related_name="client_invoices",
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="client_invoices_created",
        help_text="Franchise Accountant who created this invoice",
    )

    customer_name = models.CharField(max_length=255)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20, blank=True, null=True)
    organization_name = models.CharField(max_length=255)

    billing_address = models.TextField(blank=True, null=True)
    billing_city = models.CharField(max_length=100, blank=True, null=True)
    billing_state = models.CharField(max_length=100, blank=True, null=True)
    billing_pincode = models.CharField(max_length=10, blank=True, null=True)
    billing_country = models.CharField(max_length=100, default="India")
    customer_gstin = models.CharField(max_length=15, blank=True, null=True)

    invoice_date = models.DateField(default=timezone.now)
    due_date = models.DateField(blank=True, null=True)

    # Financial breakdown
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    taxable_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    balance_due = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    # Status & Payment Tracking
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT,
    )
    payment_method = models.CharField(
        max_length=30,
        choices=PaymentMethod.choices,
        blank=True,
        null=True,
    )
    payment_date = models.DateTimeField(blank=True, null=True)
    transaction_id = models.CharField(max_length=255, blank=True, null=True)

    # Email Dispatch Tracking
    email_sent = models.BooleanField(default=False)
    email_sent_at = models.DateTimeField(blank=True, null=True)
    email_recipient = models.EmailField(blank=True, null=True)

    notes = models.TextField(blank=True, null=True)
    terms_and_conditions = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.invoice_number} - {self.organization_name} ({self.status})"

    def save(self, *args, **kwargs):
        if self.total_amount is not None:
            self.balance_due = self.total_amount - (self.amount_paid or 0)
        super().save(*args, **kwargs)


class ClientInvoiceItem(models.Model):
    """
    Line items within a ClientInvoice.
    """

    invoice = models.ForeignKey(
        ClientInvoice,
        on_delete=models.CASCADE,
        related_name="items",
    )

    product = models.ForeignKey(
        "users.Products",
        on_delete=models.PROTECT,
        related_name="client_invoice_items",
    )

    description = models.TextField(blank=True)
    license_count = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    taxable_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=18)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.invoice.invoice_number} - {self.product.name} ({self.license_count} seats)"