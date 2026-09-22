# from django.urls import path, include
# from rest_framework.routers import DefaultRouter

# from .views import RegisterView

# router = DefaultRouter()
# # router.register(r"user", RegisterView, basename="user")

# urlpatterns = [
#     path("", include(router.urls)),
#     path("register/", RegisterView.as_view(), name="register"),
# ]

from rest_framework.routers import DefaultRouter,path

from .views import (
    UserViewSet,
    ProductsViewSet,
    FranchiseViewSet,
    InvoiceViewSet,
    LoginView,
    FranchiseRequestViewSet,
    FranchiseUserProfileViewSet,
    SuperAdminDashboardView,
)

router = DefaultRouter()

router.register(
    "users",
    UserViewSet,
    basename="users",
)

router.register(
    "products",
    ProductsViewSet,
    basename="products",
)

router.register(
    "franchises",
    FranchiseViewSet,
    basename="franchises",
)

router.register(
    "invoices",
    InvoiceViewSet,
    basename="invoices",
)

router.register(
    "franchise-requests",
    FranchiseRequestViewSet,
    basename="franchise-requests",
)

router.register(
    "franchise-users",
    FranchiseUserProfileViewSet,
    basename="franchise-users",
)

# router.register(
#     "login",
#     LoginView,
#     basename="login",
# )

from franchise.views import OrganizationViewSet

router.register(
    "organizations",
    OrganizationViewSet,
    basename="organizations",
)

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("dashboard/", SuperAdminDashboardView.as_view(), name="superadmin-dashboard"),
]

urlpatterns += router.urls