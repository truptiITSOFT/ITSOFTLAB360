"""
Role-based permissions for the franchise/invoice/onboarding API.

'Admin' role and Django superusers are treated as full-access across every
permission class below.
"""

from rest_framework.permissions import BasePermission


class HasRole(BasePermission):
    """Base class — subclasses set `allowed_roles`."""

    allowed_roles = []
    message = "You do not have the required role for this action."

    def has_permission(self, request, view):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if user.is_superuser or getattr(user, "role", None) == "Admin":
            return True
        return getattr(user, "role", None) in self.allowed_roles


class IsAdmin(HasRole):
    allowed_roles = ["Admin"]


class IsIT(HasRole):
    allowed_roles = ["IT"]


class IsSales(HasRole):
    allowed_roles = ["Sales"]


class IsAccountant(HasRole):
    allowed_roles = ["Accountant"]


class IsITOrAdmin(HasRole):
    allowed_roles = ["IT", "Admin"]


class IsAccountantOrAdmin(HasRole):
    allowed_roles = ["Accountant", "Admin"]


class IsSalesOrAdmin(HasRole):
    allowed_roles = ["Sales", "Admin"]


class ReadOnly(BasePermission):
    """Allows GET/HEAD/OPTIONS for any authenticated user; blocks writes."""

    SAFE_METHODS = ("GET", "HEAD", "OPTIONS")

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.method in self.SAFE_METHODS)