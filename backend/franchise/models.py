from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class FranchiseOrganization(models.Model):
    """
    Organization/customer created by a Franchise.

    Example:

        Franchise: ABC Software Franchise

        Organizations:
            XYZ Hospital
            ABC School
            PQR Manufacturing
    """

    name = models.CharField(max_length=255)

    franchise = models.ForeignKey(
        "users.Franchise",
        on_delete=models.CASCADE,
        related_name="organizations",
    )

    email = models.EmailField(
        blank=True,
        null=True,
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
    )

    address = models.TextField(
        blank=True,
    )

    city = models.CharField(
        max_length=100,
        blank=True,
    )

    state = models.CharField(
        max_length=100,
        blank=True,
    )

    pincode = models.CharField(
        max_length=10,
        blank=True,
    )

    country = models.CharField(
        max_length=100,
        default="India",
    )

    gstin = models.CharField(
        max_length=15,
        blank=True,
        null=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_organizations",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class OrganizationUserProfile(AbstractUser):
    """
    Connects a Django User with an Organization.

    The User itself does not need a new role in the main User model.

    Example:

        User
          username = xyz_admin

        OrganizationAdminProfile
          user = xyz_admin
          organization = XYZ Hospital
    """

    # user = models.OneToOneField(
    #     User,
    #     on_delete=models.CASCADE,
    #     related_name="organization_admin_profile",
    # )
    USER_ROLE_CHOICES = [
        ("PRODUCT_IT", "IT"),
        ("PRODUCT_ADMIN", "Admin"),
        ("PRODUCT_ACCOUNTANT", "Accountant"),
    ]

    role = models.CharField(max_length=20, choices=USER_ROLE_CHOICES, blank=True)

    organization = models.OneToOneField(
        FranchiseOrganization,
        on_delete=models.CASCADE,
        related_name="admin_profile",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"{self.user.username} - {self.organization.name}"


class OrganizationProduct(models.Model):
    """
    Products assigned/sold to an organization by a franchise.

    Example:

        XYZ Hospital
            ├── HRMSM
            └── ERP

    This model controls which products the organization's admin
    is allowed to access.
    """

    organization = models.ForeignKey(
        FranchiseOrganization,
        on_delete=models.CASCADE,
        related_name="organization_products",
    )

    product = models.ForeignKey(
        "users.Products",
        on_delete=models.PROTECT,
        related_name="organization_assignments",
    )

    assigned_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="assigned_organization_products",
    )

    assigned_at = models.DateTimeField(
        auto_now_add=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    # --------------------------------------------------
    # Subscription information
    # --------------------------------------------------

    subscription_start = models.DateField(
        null=True,
        blank=True,
    )

    subscription_end = models.DateField(
        null=True,
        blank=True,
    )

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        ACTIVE = "active", "Active"
        EXPIRED = "expired", "Expired"
        CANCELLED = "cancelled", "Cancelled"

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
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
        return f"{self.organization.name} - {self.product.name}"
