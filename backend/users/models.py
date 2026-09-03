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
    ]

    # NOTE: left blank by default rather than "User" (which wasn't a valid
    # choice) — a client-facing login created via FranchiseUserProfile has no
    # meaningful value here; only internal staff get one of the four roles.
    role = models.CharField(max_length=20, choices=USER_ROLE_CHOICES, blank=True)
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)


class Products(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="created_products")

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


# ---------------------------------------------------------------------------
# Franchise onboarding workflow
# ---------------------------------------------------------------------------

class FranchiseRequest(models.Model):
    """
    Drives the full onboarding lifecycle:

      Sales raises this request (wants credentials issued to a new client)
        -> PENDING
      Accountant reviews it, raises an Invoice for the client
        -> APPROVED
      Accountant marks that Invoice as paid (via InvoiceViewSet.mark_paid)
        -> PAID   (this flips automatically, sales/accountant don't set it directly)
      IT creates the Franchise + its login (FranchiseUserProfile) — only
      allowed once status == PAID
        -> COMPLETED

    IT can never create a Franchise directly through the API; it can only
    happen through this request once it reaches PAID.
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