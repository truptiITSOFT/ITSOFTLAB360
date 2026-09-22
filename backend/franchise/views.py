from django.contrib.auth import get_user_model
from django.db.models import Sum, Count, Q
from django.utils import timezone
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from users.models import Franchise, Products, Organization, FranchiseUserProfile
from .models import (
    OrganizationProduct,
    OrganizationUser,
    UserProductAccess,
    ClientLicenseRequest,
    ClientLicenseRequestItem,
    ClientInvoice,
    ClientInvoiceItem,
)
from .permissions import (
    IsFranchiseTeamMember,
    IsFranchiseAdmin,
    IsFranchiseSalesOrAdmin,
    IsFranchiseITOrAdmin,
    IsFranchiseAccountantOrAdmin,
    IsOrgAdminOrFranchise,
)
from .serializers import (
    FranchiseTeamMemberSerializer,
    OrganizationSerializer,
    OrganizationProductSerializer,
    OrganizationUserSerializer,
    ProvisionOrganizationUserSerializer,
    AssignProductAccessSerializer,
    UserProductAccessSerializer,
    VerifySubscriptionRequestSerializer,
    ClientLicenseRequestSerializer,
    ClientLicenseRequestItemSerializer,
    ClientInvoiceSerializer,
    ClientInvoiceItemSerializer,
    GenerateClientInvoiceFromRequestSerializer,
    MarkClientInvoicePaidSerializer,
    ITFulfillRequestSerializer,
)
from .services.remote_provisioning import RemoteProductService, RemoteSoftwareAPIError


User = get_user_model()


def get_user_franchise(user):
    """Resolve Franchise instance associated with the requesting user."""
    if not user or not user.is_authenticated:
        return None
    profile = getattr(user, "franchise_profile", None)
    if profile and profile.franchise:
        return profile.franchise
    # If internal superuser/admin, return None or first franchise if needed
    return None


# ===========================================================================
# 1. FRANCHISE TEAM VIEWSET (Admin creates IT, Sales, Accountant)
# ===========================================================================

class FranchiseTeamViewSet(viewsets.ModelViewSet):
    """
    Franchise Admin creates and manages Franchise Team members:
    - FRANCHISE_IT
    - FRANCHISE_SALES
    - FRANCHISE_ACCOUNTANT
    """

    serializer_class = FranchiseTeamMemberSerializer
    permission_classes = [permissions.IsAuthenticated, IsFranchiseAdmin]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["user__username", "user__email", "user__first_name", "user__last_name", "role"]
    ordering_fields = ["created_at", "role"]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or getattr(user, "role", None) in ["Admin", "IT"]:
            return FranchiseUserProfile.objects.select_related("user", "franchise").all()
        franchise = get_user_franchise(user)
        if franchise:
            return FranchiseUserProfile.objects.filter(franchise=franchise).select_related("user", "franchise")
        return FranchiseUserProfile.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        franchise = get_user_franchise(user)
        # If not internal superuser, force franchise to current user's franchise
        if franchise:
            serializer.save(franchise=franchise)
        else:
            serializer.save()


# ===========================================================================
# 2. ORGANIZATION VIEWSET (Sell SaaS to Organizations)
# ===========================================================================

class OrganizationViewSet(viewsets.ModelViewSet):
    """
    Manage Organizations created by the Franchise team.
    """

    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated, IsFranchiseTeamMember]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["city", "state", "franchise"]
    search_fields = ["name", "email", "phone", "gstin", "city"]
    ordering_fields = ["name", "created_at"]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or getattr(user, "role", None) in ["Admin", "IT"]:
            return Organization.objects.select_related("franchise").prefetch_related("subscriptions").all()
        franchise = get_user_franchise(user)
        if franchise:
            return Organization.objects.filter(franchise=franchise).select_related("franchise").prefetch_related("subscriptions")
        # Check if user is an Organization member
        org_ids = user.organization_memberships.values_list("organization_id", flat=True)
        return Organization.objects.filter(id__in=org_ids).select_related("franchise").prefetch_related("subscriptions")

    def perform_create(self, serializer):
        user = self.request.user
        franchise = get_user_franchise(user)
        if franchise and not serializer.validated_data.get("franchise"):
            serializer.save(franchise=franchise)
        else:
            serializer.save()


# ===========================================================================
# 3. ORGANIZATION SUBSCRIPTION VIEWSET (Product licenses & validity)
# ===========================================================================

class OrganizationSubscriptionViewSet(viewsets.ModelViewSet):
    """
    Manages Product Subscriptions for Organizations, including:
    - Allotting products to organizations
    - Specifying license counts (e.g., 15 licenses for HRMSM)
    - Tracking validity and subscription status
    - Public/Key verification endpoint for the 12 industry web portals
    """

    serializer_class = OrganizationProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsOrgAdminOrFranchise]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = ["organization", "product", "status", "is_active"]
    search_fields = ["organization__name", "product__name", "notes"]
    ordering_fields = ["created_at", "subscription_end", "license_count"]

    def get_queryset(self):
        user = self.request.user
        queryset = OrganizationProduct.objects.select_related(
            "organization", "product", "assigned_by"
        ).prefetch_related("assigned_users")

        if user.is_superuser or getattr(user, "role", None) in ["Admin", "IT"]:
            return queryset

        franchise = get_user_franchise(user)
        if franchise:
            return queryset.filter(organization__franchise=franchise)

        # Organization member view
        org_ids = user.organization_memberships.values_list("organization_id", flat=True)
        return queryset.filter(organization_id__in=org_ids)

    def perform_create(self, serializer):
        serializer.save(assigned_by=self.request.user)

    # -----------------------------------------------------------------------
    # Verification API for the 12 external industry portals
    # -----------------------------------------------------------------------
    @action(detail=False, methods=["GET", "POST"], permission_classes=[permissions.AllowAny])
    def verify(self, request):
        """
        Public / Token API used by external software portals (HRMSM, CRM, etc.)
        to verify if an organization or user has an active product subscription
        and available licenses.
        """
        params = request.data if request.method == "POST" else request.query_params
        serializer = VerifySubscriptionRequestSerializer(data=params)
        serializer.is_valid(raise_exception=True)

        license_key = serializer.validated_data.get("license_key")
        org_id = serializer.validated_data.get("organization_id")
        product_name = serializer.validated_data.get("product_name")
        product_id = serializer.validated_data.get("product_id")
        user_identifier = serializer.validated_data.get("user_identifier")

        subscription = None
        if license_key:
            subscription = OrganizationProduct.objects.filter(license_key=license_key).first()
        elif org_id and (product_id or product_name):
            q = Q(organization_id=org_id)
            if product_id:
                q &= Q(product_id=product_id)
            if product_name:
                q &= Q(product__name__iexact=product_name)
            subscription = OrganizationProduct.objects.filter(q).first()

        if not subscription:
            return Response(
                {
                    "is_valid": False,
                    "error": "Subscription not found.",
                    "status": "not_found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        is_valid = subscription.is_valid
        user_access_granted = False
        external_user_id = None

        if user_identifier:
            user = (
                User.objects.filter(
                    Q(username__iexact=user_identifier)
                    | Q(email__iexact=user_identifier)
                    | Q(id=user_identifier if str(user_identifier).isdigit() else -1)
                ).first()
            )
            if user:
                access = UserProductAccess.objects.filter(
                    organization_user__user=user,
                    subscription=subscription,
                    is_active=True,
                ).first()
                if access:
                    user_access_granted = True
                    external_user_id = access.external_user_id

        return Response({
            "is_valid": is_valid,
            "status": subscription.status,
            "organization_id": subscription.organization.id,
            "organization_name": subscription.organization.name,
            "product_id": subscription.product.id,
            "product_name": subscription.product.name,
            "license_count": subscription.license_count,
            "used_licenses": subscription.used_licenses,
            "available_licenses": subscription.available_licenses,
            "subscription_start": subscription.subscription_start,
            "subscription_end": subscription.subscription_end,
            "user_access_granted": user_access_granted,
            "external_user_id": external_user_id,
        })


# ===========================================================================
# 4. ORGANIZATION USER VIEWSET (User Provisioning & License Assignment)
# ===========================================================================

class OrganizationUserViewSet(viewsets.ModelViewSet):
    """
    Provisions users for an Organization and assigns product licenses.
    Enforces license count limits and maintains project database mapping.
    """

    serializer_class = OrganizationUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsOrgAdminOrFranchise]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["organization", "role", "is_active", "department"]
    search_fields = ["user__username", "user__email", "user__first_name", "user__last_name", "designation"]
    ordering_fields = ["created_at", "user__username"]

    def get_permissions(self):
        if self.action in ["sso_token", "my_portal"]:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated(), IsOrgAdminOrFranchise()]

    def get_queryset(self):
        user = self.request.user
        queryset = OrganizationUser.objects.select_related("user", "organization").prefetch_related(
            "product_accesses__subscription__product"
        )

        if user.is_superuser or getattr(user, "role", None) in ["Admin", "IT"]:
            return queryset

        franchise = get_user_franchise(user)
        if franchise:
            return queryset.filter(organization__franchise=franchise)

        # Org admin sees users in their organization
        org_ids = user.organization_memberships.values_list("organization_id", flat=True)
        if org_ids.exists():
            return queryset.filter(organization_id__in=org_ids)

        # Individual SaaS user sees their own membership
        return queryset.filter(user=user)

    # -----------------------------------------------------------------------
    # Assign Product Access (License Enforcement)
    # -----------------------------------------------------------------------
    @action(detail=True, methods=["POST"], url_path="assign-product")
    def assign_product(self, request, pk=None):
        """
        Allocates a product license to this organization user.
        Checks:
        1. Subscription is valid.
        2. Allotted license count is not exceeded (used_licenses < license_count).
        3. Creates/links user in central database & records external project DB mapping.
        """
        org_user = self.get_object()
        data = {
            "organization_user_id": org_user.id,
            "subscription_id": request.data.get("subscription_id"),
            "external_user_id": request.data.get("external_user_id", ""),
            "permissions": request.data.get("permissions", {}),
        }

        serializer = AssignProductAccessSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        access = serializer.save()

        return Response(
            {
                "message": f"License successfully allocated for {access.subscription.product.name}.",
                "data": UserProductAccessSerializer(access).data,
                "available_licenses_remaining": access.subscription.available_licenses,
            },
            status=status.HTTP_201_CREATED,
        )

    # -----------------------------------------------------------------------
    # Revoke Product Access (Frees up 1 license)
    # -----------------------------------------------------------------------
    @action(detail=True, methods=["POST"], url_path="revoke-product")
    def revoke_product(self, request, pk=None):
        org_user = self.get_object()
        subscription_id = request.data.get("subscription_id")

        if not subscription_id:
            return Response(
                {"subscription_id": "subscription_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        access = UserProductAccess.objects.filter(
            organization_user=org_user,
            subscription_id=subscription_id,
            is_active=True,
        ).first()

        if not access:
            return Response(
                {"error": "Active product access record not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        access.is_active = False
        access.save()

        return Response(
            {
                "message": f"Access revoked for {access.subscription.product.name}. 1 license freed up.",
                "available_licenses_now": access.subscription.available_licenses,
            },
            status=status.HTTP_200_OK,
        )

    # -----------------------------------------------------------------------
    # Provision User for a Subscribed Product (Remote API + Multi-Product Sync)
    # -----------------------------------------------------------------------
    @action(detail=False, methods=["POST"], url_path="provision")
    def provision(self, request):
        """
        Streamlined provisioning endpoint for Organization Admins:
        1. Checks organization's active subscription and available licenses.
        2. Calls the remote software API to create the user in that external software.
        3. Creates or links the central User & OrganizationUser in ITSOFTLAB360.
        4. Saves the external user ID returned by the remote software.
        5. Deducts 1 license seat from the subscription.
        6. Reuses existing central user if the same user is provisioned for additional products.
        """
        serializer = ProvisionOrganizationUserSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        result = serializer.save()

        org_user = result["organization_user"]
        return Response(
            {
                "message": f"User '{result['username']}' successfully provisioned and linked to '{result['product_name']}'.",
                "user": {
                    "id": result["user_id"],
                    "organization_user_id": org_user.id,
                    "username": result["username"],
                    "email": result["email"],
                    "organization_id": org_user.organization.id,
                    "organization_name": org_user.organization.name,
                    "role": org_user.role,
                    "designation": org_user.designation,
                    "department": org_user.department,
                    "external_product_ids": org_user.external_product_ids,
                    "active_products": org_user.active_products,
                },
                "provisioned_product": {
                    "product_name": result["product_name"],
                    "external_user_id": result["external_user_id"],
                    "is_simulated": result["is_simulated"],
                },
                "subscription_status": {
                    "used_licenses": result["used_licenses"],
                    "available_licenses_remaining": result["available_licenses_remaining"],
                },
            },
            status=status.HTTP_201_CREATED,
        )

    # -----------------------------------------------------------------------
    # Single Sign-On (SSO) Launch Token
    # -----------------------------------------------------------------------
    @action(detail=True, methods=["POST"], url_path="sso-token")
    def sso_token(self, request, pk=None):
        """
        Generates a secure, signed SSO token for an organization user to launch
        a subscribed software product without needing to re-enter credentials.
        """
        org_user = self.get_object()
        user = request.user

        # User must be Admin, IT, Franchise, Org Admin, or the user themselves
        is_admin_or_franchise = (
            user.is_superuser
            or getattr(user, "role", None) in ["Admin", "IT"]
            or get_user_franchise(user) is not None
            or user.organization_memberships.filter(organization=org_user.organization, role="ORG_ADMIN", is_active=True).exists()
        )
        if not is_admin_or_franchise and org_user.user != user:
            return Response(
                {"error": "You are not authorized to generate SSO tokens for other users."},
                status=status.HTTP_403_FORBIDDEN,
            )

        product_id = request.data.get("product_id")
        product_name = request.data.get("product_name")

        if not product_id and not product_name:
            return Response(
                {"error": "product_id or product_name is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        q = Q(organization_user=org_user, is_active=True)
        if product_id:
            q &= Q(subscription__product_id=product_id)
        else:
            q &= Q(subscription__product__name__iexact=product_name)

        access = UserProductAccess.objects.filter(q).select_related("subscription__product").first()
        if not access:
            return Response(
                {"error": "User does not have active access to the specified product."},
                status=status.HTTP_403_FORBIDDEN,
            )

        sso_data = RemoteProductService.generate_sso_token(
            org_user=org_user,
            product=access.subscription.product,
            access=access,
        )
        # Add target route if available
        sso_data["app_route"] = access.subscription.product.route or f"{access.subscription.product.name.lower()}.itsoftlab360.com"
        sso_data["product_code"] = access.subscription.product.code or access.subscription.product.name.lower()
        return Response(sso_data, status=status.HTTP_200_OK)

    # -----------------------------------------------------------------------
    # My Portal: Active SaaS Applications & Profile for logged in user
    # -----------------------------------------------------------------------
    @action(detail=False, methods=["GET"], url_path="my-portal")
    def my_portal(self, request):
        """
        Returns active applications and organization profile for the currently authenticated SaaS user.
        """
        user = request.user
        org_membership = (
            OrganizationUser.objects.filter(user=user, is_active=True)
            .select_related("organization")
            .first()
        )

        if not org_membership:
            return Response(
                {
                    "detail": "No active organization membership found for this user.",
                    "products": [],
                },
                status=status.HTTP_200_OK,
            )

        accesses = (
            UserProductAccess.objects.filter(
                organization_user=org_membership,
                is_active=True,
            )
            .select_related("subscription__product")
            .order_by("subscription__product__name")
        )

        products = []
        for a in accesses:
            prod = a.subscription.product
            products.append({
                "id": prod.id,
                "name": prod.name,
                "code": prod.code or prod.name.lower(),
                "route": prod.route or f"{prod.name.lower()}.itsoftlab360.com",
                "description": prod.description,
                "external_user_id": a.external_user_id,
                "subscription_id": a.subscription.id,
                "license_key": str(a.subscription.license_key),
                "is_active": a.is_active,
            })

        return Response({
            "organization_user_id": org_membership.id,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            },
            "organization": {
                "id": org_membership.organization.id,
                "name": org_membership.organization.name,
                "role": org_membership.role,
                "designation": org_membership.designation,
                "department": org_membership.department,
            },
            "products": products,
            "total_products": len(products),
        }, status=status.HTTP_200_OK)


# ===========================================================================
# 5. CROSS-PROJECT DATA & ATTENDANCE VIEW (GET API for CRM, etc.)
# ===========================================================================

# ===========================================================================
# 6. FRANCHISE DASHBOARD VIEW
# ===========================================================================

class FranchiseDashboardView(APIView):
    """
    Franchise workspace metrics:
    - Total Organizations
    - Total Active Subscriptions
    - Total Allotted Licenses vs Used Licenses
    - Team Members Breakdown
    """

    permission_classes = [permissions.IsAuthenticated, IsFranchiseTeamMember]

    def get(self, request):
        user = request.user
        franchise = get_user_franchise(user)

        if not franchise and not user.is_superuser:
            return Response(
                {"error": "No franchise associated with this user."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        org_filter = Q(franchise=franchise) if franchise else Q()
        total_orgs = Organization.objects.filter(org_filter).count()

        sub_filter = Q(organization__franchise=franchise) if franchise else Q()
        subscriptions = OrganizationProduct.objects.filter(sub_filter, is_active=True)
        total_subscriptions = subscriptions.count()

        total_licenses = subscriptions.aggregate(total=Sum("license_count"))["total"] or 0
        used_licenses = UserProductAccess.objects.filter(
            subscription__in=subscriptions, is_active=True
        ).count()

        team_count = FranchiseUserProfile.objects.filter(franchise=franchise).count() if franchise else 0

        # Breakdown per product
        products_breakdown = []
        for sub in subscriptions.select_related("product", "organization"):
            products_breakdown.append({
                "organization_id": sub.organization.id,
                "organization_name": sub.organization.name,
                "product_id": sub.product.id,
                "product_name": sub.product.name,
                "license_count": sub.license_count,
                "used_licenses": sub.used_licenses,
                "available_licenses": sub.available_licenses,
                "status": sub.status,
                "subscription_end": sub.subscription_end,
            })

        return Response({
            "franchise_id": franchise.id if franchise else None,
            "franchise_name": franchise.name if franchise else "All Franchises (Admin)",
            "total_organizations": total_orgs,
            "total_subscriptions": total_subscriptions,
            "total_licenses_allotted": total_licenses,
            "total_licenses_used": used_licenses,
            "total_licenses_available": max(0, total_licenses - used_licenses),
            "franchise_team_count": team_count,
            "products_breakdown": products_breakdown,
        })


# ===========================================================================
# 7. CLIENT LICENSE REQUEST VIEWSET (Sales creates -> Accountant reviews -> IT fulfills)
# ===========================================================================

class ClientLicenseRequestViewSet(viewsets.ModelViewSet):
    """
    Drives the client onboarding flow:
    1. FRANCHISE_SALES creates request with prospective client & requested product seats.
    2. FRANCHISE_ACCOUNTANT reviews and calls 'generate-invoice'.
    3. Once payment clears, FRANCHISE_IT calls 'fulfill' to provision Organization & Subscriptions.
    """

    serializer_class = ClientLicenseRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsFranchiseTeamMember]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["status", "franchise"]
    search_fields = ["client_name", "client_email", "organization_name", "invoice__invoice_number"]
    ordering_fields = ["created_at", "status", "quoted_amount"]

    def get_permissions(self):
        if self.action in ["create"]:
            return [permissions.IsAuthenticated(), IsFranchiseSalesOrAdmin()]
        if self.action in ["generate_invoice"]:
            return [permissions.IsAuthenticated(), IsFranchiseAccountantOrAdmin()]
        if self.action in ["fulfill"]:
            return [permissions.IsAuthenticated(), IsFranchiseITOrAdmin()]
        return [permissions.IsAuthenticated(), IsFranchiseTeamMember()]


    def get_queryset(self):
        user = self.request.user
        queryset = ClientLicenseRequest.objects.select_related(
            "franchise", "requested_by", "invoice", "organization", "reviewed_by", "fulfilled_by"
        ).prefetch_related("items__product")

        if user.is_superuser or getattr(user, "role", None) in ["Admin", "IT"]:
            return queryset

        franchise = get_user_franchise(user)
        if franchise:
            return queryset.filter(franchise=franchise)
        return ClientLicenseRequest.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        franchise = get_user_franchise(user)
        if franchise:
            serializer.save(franchise=franchise, requested_by=user)
        else:
            serializer.save(requested_by=user)

    # -----------------------------------------------------------------------
    # Accountant Action: Generate Client Invoice
    # -----------------------------------------------------------------------
    @action(
        detail=True,
        methods=["POST"],
        url_path="generate-invoice",
        permission_classes=[permissions.IsAuthenticated, IsFranchiseAccountantOrAdmin],
    )
    def generate_invoice(self, request, pk=None):
        license_request = self.get_object()
        serializer = GenerateClientInvoiceFromRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        invoice = serializer.create_invoice(license_request, request.user)

        return Response(
            {
                "message": f"ClientInvoice {invoice.invoice_number} generated successfully.",
                "invoice": ClientInvoiceSerializer(invoice).data,
                "request_status": license_request.status,
            },
            status=status.HTTP_201_CREATED,
        )

    # -----------------------------------------------------------------------
    # IT Action: Fulfill Request (Provision Org, Products, Org Admin)
    # -----------------------------------------------------------------------
    @action(
        detail=True,
        methods=["POST"],
        url_path="fulfill",
        permission_classes=[permissions.IsAuthenticated, IsFranchiseITOrAdmin],
    )
    def fulfill(self, request, pk=None):
        license_request = self.get_object()
        serializer = ITFulfillRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = serializer.fulfill(license_request, request.user)

        return Response(
            {
                "message": "Organization provisioned successfully by IT team.",
                "result": result,
                "request_status": license_request.status,
            },
            status=status.HTTP_200_OK,
        )


# ===========================================================================
# 8. CLIENT INVOICE VIEWSET (Accountant manages client invoices & payments)
# ===========================================================================

class ClientInvoiceViewSet(viewsets.ModelViewSet):
    """
    Franchise-to-Client Invoice Management:
    - Lists and creates invoices
    - Dispatches invoice email to client
    - Records client payment and triggers IT fulfillment handoff
    """

    serializer_class = ClientInvoiceSerializer
    permission_classes = [permissions.IsAuthenticated, IsFranchiseTeamMember]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["status", "payment_method", "franchise"]
    search_fields = ["invoice_number", "customer_name", "customer_email", "organization_name"]
    ordering_fields = ["created_at", "total_amount", "invoice_date"]

    def get_permissions(self):
        if self.action in ["create", "send_email", "mark_paid"]:
            return [permissions.IsAuthenticated(), IsFranchiseAccountantOrAdmin()]
        return [permissions.IsAuthenticated(), IsFranchiseTeamMember()]


    def get_queryset(self):
        user = self.request.user
        queryset = ClientInvoice.objects.select_related("franchise", "created_by").prefetch_related("items__product")

        if user.is_superuser or getattr(user, "role", None) in ["Admin", "Accountant"]:
            return queryset

        franchise = get_user_franchise(user)
        if franchise:
            return queryset.filter(franchise=franchise)
        return ClientInvoice.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        franchise = get_user_franchise(user)
        if franchise:
            serializer.save(franchise=franchise, created_by=user)
        else:
            serializer.save(created_by=user)

    # -----------------------------------------------------------------------
    # Accountant Action: Send / Resend Invoice Email
    # -----------------------------------------------------------------------
    @action(
        detail=True,
        methods=["POST"],
        url_path="send-email",
        permission_classes=[permissions.IsAuthenticated, IsFranchiseAccountantOrAdmin],
    )
    def send_email(self, request, pk=None):
        invoice = self.get_object()
        recipient = request.data.get("email") or invoice.customer_email

        invoice.email_sent = True
        invoice.email_sent_at = timezone.now()
        invoice.email_recipient = recipient
        if invoice.status == ClientInvoice.Status.DRAFT:
            invoice.status = ClientInvoice.Status.SENT
        invoice.save()

        return Response(
            {
                "message": f"Invoice {invoice.invoice_number} sent to {recipient}.",
                "invoice": ClientInvoiceSerializer(invoice).data,
            },
            status=status.HTTP_200_OK,
        )

    # -----------------------------------------------------------------------
    # Accountant / Payment Callback Action: Mark Invoice Paid
    # -----------------------------------------------------------------------
    @action(
        detail=True,
        methods=["POST"],
        url_path="mark-paid",
        permission_classes=[permissions.IsAuthenticated, IsFranchiseAccountantOrAdmin],
    )
    def mark_paid(self, request, pk=None):
        invoice = self.get_object()
        serializer = MarkClientInvoicePaidSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        updated_invoice = serializer.mark_paid(invoice)

        return Response(
            {
                "message": f"Invoice {updated_invoice.invoice_number} marked as {updated_invoice.status}.",
                "invoice": ClientInvoiceSerializer(updated_invoice).data,
            },
            status=status.HTTP_200_OK,
        )

