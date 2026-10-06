from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Adjust this import to wherever FranchiseUserProfile actually lives in your project.
# from .franchise_user_models import FranchiseUserProfile


class User(AbstractUser):

    USER_ROLE_CHOICES = [
        ("IT", "IT"),
        ("Admin", "Admin"),
        ("Sales", "Sales"),
        ("Accountant", "Accountant"),
        ("Finance", "Finance"),
    ]

    # NOTE: left blank by default rather than "User" (which wasn't a valid
    # choice) — a client-facing login created via FranchiseUserProfile has no
    # meaningful value here; only internal staff get one of the four roles.
    role = models.CharField(max_length=20, choices=USER_ROLE_CHOICES, blank=True)
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)


class Products(models.Model):
    BILLING_CYCLE_CHOICES = [
        ("monthly", "Monthly"),
        ("quarterly", "Quarterly"),
        ("yearly", "Yearly"),
    ]

    name = models.CharField(max_length=100)
    code = models.CharField(max_length=50, blank=True, null=True, help_text="Short identifier e.g. hrms, crm")
    route = models.CharField(max_length=255, blank=True, null=True, help_text="Subdomain route e.g. hrmsm.itsoftlab360.com")
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    subscription_price_per_user = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        help_text="Subscription plan price per user / license seat",
    )
    billing_cycle = models.CharField(
        max_length=20,
        choices=BILLING_CYCLE_CHOICES,
        default="monthly",
        help_text="Subscription billing cycle duration",
    )
    remote_api_url = models.URLField(max_length=500, blank=True, null=True, help_text="Remote software user provisioning endpoint")
    api_key = models.CharField(max_length=255, blank=True, null=True, help_text="API key or secret for remote software integration")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="created_products")

    def save(self, *args, **kwargs):
        if (self.subscription_price_per_user is None or self.subscription_price_per_user <= 0) and self.price:
            self.subscription_price_per_user = self.price
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Franchise(models.Model):
    name = models.CharField(max_length=100)
    products = models.ManyToManyField(Products, related_name="franchises", blank=True)
    address = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="created_franchise")

    def __str__(self):
        return self.name


class FranchiseProductAllocation(models.Model):
    """
    Tracks license inventory and quota given by the internal team to a franchise.
    A franchise can only distribute licenses to client organizations up to total_licenses.
    """
    franchise = models.ForeignKey(
        Franchise,
        on_delete=models.CASCADE,
        related_name="product_allocations",
    )
    product = models.ForeignKey(
        Products,
        on_delete=models.CASCADE,
        related_name="franchise_allocations",
    )
    total_licenses = models.PositiveIntegerField(
        default=50,
        help_text="Total number of licenses allotted by internal team to this franchise for this product",
    )
    allocated_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["franchise", "product"],
                name="unique_franchise_product_allocation",
            )
        ]
        ordering = ["-allocated_at"]

    def __str__(self):
        return f"{self.franchise.name} - {self.product.name} ({self.total_licenses} licenses)"

    @property
    def used_licenses(self):
        """Sum of license_count allocated across all active client organizations under this franchise."""
        from franchise.models import OrganizationProduct
        total = OrganizationProduct.objects.filter(
            organization__franchise=self.franchise,
            product=self.product,
            is_active=True,
        ).aggregate(models.Sum("license_count"))["license_count__sum"] or 0
        return total

    @property
    def available_licenses(self):
        """Remaining unallocated licenses that this franchise can distribute."""
        return max(0, self.total_licenses - self.used_licenses)


class Invoice(models.Model):

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        SENT = "sent", "Sent"
        PAID = "paid", "Paid"
        PARTIALLY_PAID = "partially_paid", "Partially Paid"
        OVERDUE = "overdue", "Overdue"
        CANCELLED = "cancelled", "Cancelled"

    class PaymentMethod(models.TextChoices):
        CASH = "cash", "Cash"
        CARD = "card", "Card"
        UPI = "upi", "UPI"
        BANK_TRANSFER = "bank_transfer", "Bank Transfer"
        CHEQUE = "cheque", "Cheque"
        OTHER = "other", "Other"

    invoice_number = models.CharField(max_length=50, unique=True)

    # CHANGED: nullable. A prospective-client invoice is raised by the
    # accountant BEFORE any Franchise row exists — IT only creates the
    # Franchise after payment clears. Backfilled by IT at that point.
    franchise = models.ForeignKey(
        Franchise, on_delete=models.CASCADE, related_name="invoices", null=True, blank=True,
    )

    customer_name = models.CharField(max_length=255)
    customer_email = models.EmailField(blank=True, null=True)
    customer_phone = models.CharField(max_length=20, blank=True, null=True)
    customer_gstin = models.CharField(max_length=15, blank=True, null=True)

    billing_address = models.TextField(blank=True, null=True)
    billing_city = models.CharField(max_length=100, blank=True, null=True)
    billing_state = models.CharField(max_length=100, blank=True, null=True)
    billing_pincode = models.CharField(max_length=10, blank=True, null=True)
    billing_country = models.CharField(max_length=100, default="India")

    shipping_address = models.TextField(blank=True, null=True)
    shipping_city = models.CharField(max_length=100, blank=True, null=True)
    shipping_state = models.CharField(max_length=100, blank=True, null=True)
    shipping_pincode = models.CharField(max_length=10, blank=True, null=True)
    shipping_country = models.CharField(max_length=100, default="India")

    invoice_date = models.DateField()
    due_date = models.DateField(blank=True, null=True)

    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    taxable_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    balance_due = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    cgst_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    sgst_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    igst_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    payment_method = models.CharField(max_length=30, choices=PaymentMethod.choices, blank=True, null=True)
    payment_date = models.DateTimeField(blank=True, null=True)
    transaction_id = models.CharField(max_length=255, blank=True, null=True)

    notes = models.TextField(blank=True, null=True)
    terms_and_conditions = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.invoice_number

    def save(self, *args, **kwargs):
        # Keep balance_due honest without forcing every caller to compute it.
        if self.total_amount is not None:
            self.balance_due = self.total_amount - (self.amount_paid or 0)
        super().save(*args, **kwargs)


class FranchiseRequest(models.Model):
    """
    Drives the full onboarding lifecycle:
      Sales raises this request -> PENDING
      Accountant reviews it, raises Invoice -> APPROVED
      Accountant marks Invoice paid -> PAID
      IT creates Franchise + login -> COMPLETED
    """

    class Status(models.TextChoices):
        PENDING = "pending", "Pending Accountant Review"
        APPROVED = "approved", "Approved — Invoice Raised"
        PAID = "paid", "Paid — Ready for IT"
        COMPLETED = "completed", "Completed — Franchise Created"
        REJECTED = "rejected", "Rejected"

    requested_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="franchise_requests_raised",
        help_text="The sales person who raised this request.",
    )

    proposed_franchise_name = models.CharField(max_length=100)
    proposed_address = models.TextField(blank=True)

    client_name = models.CharField(max_length=255)
    client_email = models.EmailField(blank=True, null=True)
    client_phone = models.CharField(max_length=20, blank=True, null=True)
    client_gstin = models.CharField(max_length=15, blank=True, null=True)

    billing_address = models.TextField(blank=True, null=True)
    billing_city = models.CharField(max_length=100, blank=True, null=True)
    billing_state = models.CharField(max_length=100, blank=True, null=True)
    billing_pincode = models.CharField(max_length=10, blank=True, null=True)
    billing_country = models.CharField(max_length=100, default="India", blank=True, null=True)

    quoted_amount = models.DecimalField(
        max_digits=12, decimal_places=2, null=True, blank=True,
        help_text="Optional — prefills the invoice total when the accountant approves.",
    )
    notes = models.TextField(blank=True)

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)

    invoice = models.OneToOneField(
        Invoice, on_delete=models.SET_NULL, null=True, blank=True, related_name="franchise_request",
    )
    reviewed_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="franchise_requests_reviewed",
        help_text="The accountant who approved/rejected this request.",
    )
    reviewed_at = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(blank=True)

    franchise = models.OneToOneField(
        Franchise, on_delete=models.SET_NULL, null=True, blank=True, related_name="onboarding_request",
    )
    completed_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="franchise_requests_completed",
        help_text="The IT person who created the franchise + login.",
    )
    completed_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Request for {self.proposed_franchise_name} ({self.status})"


class FranchiseRequestProduct(models.Model):
    franchise_request = models.ForeignKey(
        FranchiseRequest,
        on_delete=models.CASCADE,
        related_name="requested_products",
    )
    product = models.ForeignKey(
        Products,
        on_delete=models.CASCADE,
        related_name="franchise_requests",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.franchise_request.proposed_franchise_name} - {self.product.name}"


class InvoiceItem(models.Model):
    invoice = models.ForeignKey(
        Invoice,
        on_delete=models.CASCADE,
        related_name="items",
    )
    product = models.ForeignKey(
        Products,
        on_delete=models.PROTECT,
        related_name="invoice_items",
    )
    description = models.TextField(blank=True)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    taxable_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.invoice.invoice_number} - {self.product.name}"


class FranchiseUserProfile(models.Model):

    ROLE_CHOICES = [
        ("FRANCHISE_IT", "IT"),
        ("FRANCHISE_ADMIN", "Admin"),
        ("FRANCHISE_SALES", "Sales"),
        ("FRANCHISE_ACCOUNTANT", "Accountant"),
        ("FRANCHISE_FINANCE", "Finance"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="franchise_profile"
    )

    franchise = models.ForeignKey(
        Franchise,
        on_delete=models.CASCADE,
        related_name="users"
    )

    role = models.CharField(
        max_length=30,
        choices=ROLE_CHOICES
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"

class Organization(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    gstin = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )

    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    country = models.CharField(max_length=100, default="India")

    franchise = models.ForeignKey(
        Franchise,
        on_delete=models.PROTECT,
        related_name="organizations"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    