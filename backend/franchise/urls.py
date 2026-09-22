from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import LoginView
from .views import (
    FranchiseTeamViewSet,
    OrganizationViewSet,
    OrganizationSubscriptionViewSet,
    OrganizationUserViewSet,
    ClientLicenseRequestViewSet,
    ClientInvoiceViewSet,
    FranchiseDashboardView,
)

router = DefaultRouter()
router.register("team", FranchiseTeamViewSet, basename="franchise-team")
router.register("organizations", OrganizationViewSet, basename="franchise-organizations")
router.register("subscriptions", OrganizationSubscriptionViewSet, basename="franchise-subscriptions")
router.register("organization-users", OrganizationUserViewSet, basename="franchise-organization-users")
router.register("license-requests", ClientLicenseRequestViewSet, basename="franchise-license-requests")
router.register("invoices", ClientInvoiceViewSet, basename="franchise-invoices")

urlpatterns = [
    path("login/", LoginView.as_view(), name="franchise-login"),
    path("dashboard/", FranchiseDashboardView.as_view(), name="franchise-dashboard"),
    path("", include(router.urls)),
]

