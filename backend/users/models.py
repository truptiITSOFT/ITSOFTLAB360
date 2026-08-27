from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class User(AbstractUser):
    
    USER_ROLE_CHOICES = [
        ('IT','IT'),
        ('Admin', 'Admin'),
        ('Employee','Employee'),
        ('Accountant','Accountant'),
    ]
    
    role = models.CharField(max_length=20, choices=USER_ROLE_CHOICES, default='User')
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    
class Products(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Franchise(models.Model):
    name = models.CharField(max_length=100)
    products = models.ManyToManyField(Products, related_name='franchises')
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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

    # --------------------------------------------------
    # Invoice identification
    # --------------------------------------------------

    # id = models.BigAutoField(primary_key=True)

    invoice_number = models.CharField(
        max_length=50,
        unique=True
    )

    franchise = models.ForeignKey(
        Franchise,
        on_delete=models.CASCADE,
        related_name="invoices"
    )

    # --------------------------------------------------
    # Customer information
    # --------------------------------------------------

    customer_name = models.CharField(
        max_length=255
    )

    customer_email = models.EmailField(
        blank=True,
        null=True
    )

    customer_phone = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    customer_gstin = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )

    # --------------------------------------------------
    # Billing address
    # --------------------------------------------------

    billing_address = models.TextField(
        blank=True,
        null=True
    )

    billing_city = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    billing_state = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    billing_pincode = models.CharField(
        max_length=10,
        blank=True,
        null=True
    )

    billing_country = models.CharField(
        max_length=100,
        default="India"
    )

    # --------------------------------------------------
    # Shipping address
    # --------------------------------------------------

    shipping_address = models.TextField(
        blank=True,
        null=True
    )

    shipping_city = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    shipping_state = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    shipping_pincode = models.CharField(
        max_length=10,
        blank=True,
        null=True
    )

    shipping_country = models.CharField(
        max_length=100,
        default="India"
    )

    # --------------------------------------------------
    # Dates
    # --------------------------------------------------

    invoice_date = models.DateField()

    due_date = models.DateField(
        blank=True,
        null=True
    )

    # --------------------------------------------------
    # Amounts
    # --------------------------------------------------

    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    discount_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    taxable_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    tax_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    amount_paid = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    balance_due = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    # --------------------------------------------------
    # Tax information - useful for India/GST
    # --------------------------------------------------

    cgst_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    sgst_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    igst_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    # --------------------------------------------------
    # Payment
    # --------------------------------------------------

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT
    )

    payment_method = models.CharField(
        max_length=30,
        choices=PaymentMethod.choices,
        blank=True,
        null=True
    )

    payment_date = models.DateTimeField(
        blank=True,
        null=True
    )

    transaction_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    # --------------------------------------------------
    # Additional information
    # --------------------------------------------------

    notes = models.TextField(
        blank=True,
        null=True
    )

    terms_and_conditions = models.TextField(
        blank=True,
        null=True
    )

    # --------------------------------------------------
    # Timestamps
    # --------------------------------------------------

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.invoice_number

    

