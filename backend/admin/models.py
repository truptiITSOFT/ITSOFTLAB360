from django.db import models

# Create your models here.
class FranchiseUserProfile(models.Model):

    ROLE_CHOICES = [
        ("FRANCHISE_IT", "Franchise IT"),
        ("FRANCHISE_ADMIN", "Franchise Admin"),
        ("FRANCHISE_SALES", "Franchise Sales"),
        ("FRANCHISE_ACCOUNTANT", "Franchise Accountant"),
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
    