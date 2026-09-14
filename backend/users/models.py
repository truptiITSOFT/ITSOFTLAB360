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

from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL


class FranchiseUserProfile(models.Model):

    ROLE_CHOICES = [
        ("FRANCHISE_IT", "IT"),
        ("FRANCHISE_ADMIN", "Admin"),
        ("FRANCHISE_SALES", "Sales"),
        ("FRANCHISE_ACCOUNTANT", "Accountant"),
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
    