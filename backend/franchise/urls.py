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
    SupplyChainCreateUserView,
    HRMSMCreateUserView,
    ProductUserProvisionView,
    HealthCheckView,
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
    path("health/", HealthCheckView.as_view(), name="franchise-health"),
    # Dedicated Supply Chain user creation endpoints
    path("supplychain/create-user/", SupplyChainCreateUserView.as_view(), name="franchise-supplychain-create-user"),
    path("products/supplychain/create-user/", SupplyChainCreateUserView.as_view(), name="franchise-products-supplychain-create-user"),
    # Dedicated HRMSM user creation endpoints
    path("hrmsm/create-user/", HRMSMCreateUserView.as_view(), name="franchise-hrmsm-create-user"),
    path("products/hrmsm/create-user/", HRMSMCreateUserView.as_view(), name="franchise-products-hrmsm-create-user"),
    # Unified multi-product user creation endpoints
    path("products/create-user/", ProductUserProvisionView.as_view(), name="franchise-products-create-user"),
    path("products/<str:product_slug>/create-user/", ProductUserProvisionView.as_view(), name="franchise-products-slug-create-user"),
    path("", include(router.urls)),
]


