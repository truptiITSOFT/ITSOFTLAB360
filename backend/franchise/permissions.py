from rest_framework.permissions import BasePermission, SAFE_METHODS


def get_franchise_profile(user):
    if not (user and user.is_authenticated):
        return None
    return getattr(user, "franchise_profile", None)


class IsFranchiseTeamMember(BasePermission):
    """
    Allows access to any internal Franchise team member
    (FRANCHISE_ADMIN, FRANCHISE_IT, FRANCHISE_SALES, FRANCHISE_ACCOUNTANT)
    as well as system Superusers and Internal Admins.
    """

    allowed_roles = [
        "FRANCHISE_ADMIN",
        "FRANCHISE_IT",
        "FRANCHISE_SALES",
        "FRANCHISE_ACCOUNTANT",
        "FRANCHISE_FINANCE",
    ]

    def has_permission(self, request, view):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if user.is_superuser or getattr(user, "role", None) in ["Admin", "IT"]:
            return True
        profile = get_franchise_profile(user)
        return bool(profile and profile.role in self.allowed_roles)


class IsFranchiseAdmin(BasePermission):
    """
    Franchise Admin or System Admin/Superuser.
    """

    def has_permission(self, request, view):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if user.is_superuser or getattr(user, "role", None) in ["Admin", "IT"]:
            return True
        profile = get_franchise_profile(user)
        return bool(profile and profile.role == "FRANCHISE_ADMIN")


class IsFranchiseSalesOrAdmin(BasePermission):
    """
    Franchise Sales or Franchise Admin (can create organizations and sell SaaS).
    """

    allowed_roles = ["FRANCHISE_ADMIN", "FRANCHISE_SALES"]

    def has_permission(self, request, view):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if user.is_superuser or getattr(user, "role", None) in ["Admin", "IT"]:
            return True
        profile = get_franchise_profile(user)
        return bool(profile and profile.role in self.allowed_roles)


class IsFranchiseITOrAdmin(BasePermission):
    """
    Franchise IT or Franchise Admin.
    """

    allowed_roles = ["FRANCHISE_ADMIN", "FRANCHISE_IT"]

    def has_permission(self, request, view):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if user.is_superuser or getattr(user, "role", None) in ["Admin", "IT"]:
            return True
        profile = get_franchise_profile(user)
        return bool(profile and profile.role in self.allowed_roles)


class IsFranchiseAccountantOrAdmin(BasePermission):
    """
    Franchise Accountant/Finance or Franchise Admin.
    """

    allowed_roles = ["FRANCHISE_ADMIN", "FRANCHISE_ACCOUNTANT", "FRANCHISE_FINANCE"]

    def has_permission(self, request, view):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if user.is_superuser or getattr(user, "role", None) in ["Admin", "Accountant", "Finance"]:
            return True
        profile = get_franchise_profile(user)
        return bool(profile and profile.role in self.allowed_roles)


class IsOrgAdminOrFranchise(BasePermission):
    """
    Allows access if user is Franchise Team or Organization Admin.
    """

    def has_permission(self, request, view):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if user.is_superuser or getattr(user, "role", None) in ["Admin", "IT"]:
            return True
        if get_franchise_profile(user):
            return True
        return user.organization_memberships.filter(role="ORG_ADMIN", is_active=True).exists()

