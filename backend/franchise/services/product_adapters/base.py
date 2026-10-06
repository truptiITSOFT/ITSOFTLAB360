import json
import logging
import uuid
import urllib.request
import urllib.error
from decimal import Decimal
from datetime import timedelta
from django.db import transaction
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.conf import settings

logger = logging.getLogger(__name__)
User = get_user_model()


class RemoteSoftwareAPIError(Exception):
    """Exception raised when an external product API user creation fails."""
    def __init__(self, message, status_code=None, response_body=None):
        super().__init__(message)
        self.status_code = status_code
        self.response_body = response_body


class BaseProductAdapter:
    """
    Abstract Base Adapter for multi-product external user creation & local sync.
    Each of the 12 software products (Supply Chain, HRMSM, ERP, CRM, etc.)
    subclasses this to implement product-specific payload formats and endpoints.
    """
    product_code = ""
    product_name = ""
    default_api_url = ""
    default_auth_type = "allow_any"

    def get_api_url(self, product=None):
        """Resolves target API URL from product instance or default adapter URL."""
        if product and getattr(product, "remote_api_url", None):
            return product.remote_api_url
        return self.default_api_url

    def format_remote_payload(self, validated_data, context=None):
        """Formats the input data into the exact schema required by the external product API."""
        raise NotImplementedError("Subclasses must implement format_remote_payload")

    def parse_remote_response(self, response_data):
        """Extracts the external user/admin ID and normalized data from remote response."""
        if isinstance(response_data, dict):
            external_id = (
                response_data.get("id")
                or response_data.get("external_user_id")
                or response_data.get("user_id")
                or response_data.get("admin_id")
                or (response_data.get("data", {}) if isinstance(response_data.get("data"), dict) else {}).get("id")
                or (response_data.get("data", {}) if isinstance(response_data.get("data"), dict) else {}).get("user_id")
                or (response_data.get("data", {}) if isinstance(response_data.get("data"), dict) else {}).get("admin_id")
            )
            if external_id:
                return str(external_id)
        return None

    def call_remote_api(self, url, payload, headers=None, api_key=None):
        """
        Executes HTTP POST request to external product endpoint.
        Gracefully handles offline/mock environments if URL starts with mock://
        or MOCK_REMOTE_PROVISIONING is enabled in settings.
        """
        headers = headers or {}
        headers.setdefault("Content-Type", "application/json")
        headers.setdefault("Accept", "application/json")
        headers.setdefault("User-Agent", "ITSoftLab360-ProductProvisioner/1.0")

        if api_key and self.default_auth_type != "allow_any":
            headers.setdefault("Authorization", f"Bearer {api_key}")

        is_mock_url = not url or url.startswith("mock://")
        mock_setting = getattr(settings, "MOCK_REMOTE_PROVISIONING", False)

        if is_mock_url or mock_setting:
            prefix = self.product_code.replace("-", "_") if self.product_code else "product"
            simulated_id = f"{prefix}_usr_{uuid.uuid4().hex[:8]}"
            logger.info(f"[SIMULATION] Mock remote user created for {self.product_name or self.product_code}: {simulated_id}")
            return {
                "success": True,
                "external_user_id": simulated_id,
                "is_simulated": True,
                "data": payload,
                "message": f"Simulated remote user created for {self.product_name or self.product_code}",
            }

        json_bytes = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(url, data=json_bytes, headers=headers, method="POST")

        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                resp_body = resp.read().decode("utf-8")
                try:
                    resp_json = json.loads(resp_body)
                except Exception:
                    resp_json = {"raw": resp_body}

                external_id = self.parse_remote_response(resp_json)
                if not external_id:
                    # Fallback to generated hash if API succeeded without returning explicit id field
                    external_id = f"{self.product_code}_{uuid.uuid4().hex[:8]}"

                return {
                    "success": True,
                    "external_user_id": str(external_id),
                    "is_simulated": False,
                    "data": resp_json,
                }
        except urllib.error.HTTPError as e:
            err_content = e.read().decode("utf-8", errors="ignore")
            logger.error(f"External API Error ({self.product_code}) HTTP {e.code}: {err_content}")
            if getattr(settings, "DEBUG", False) or getattr(settings, "MOCK_REMOTE_PROVISIONING", False):
                simulated_id = f"{self.product_code}_usr_{uuid.uuid4().hex[:8]}"
                logger.warning(
                    f"External API for {self.product_name} returned HTTP {e.code}. Falling back to simulated provisioning in DEBUG mode."
                )
                return {
                    "success": True,
                    "external_user_id": simulated_id,
                    "is_simulated": True,
                    "warning": f"External API returned HTTP {e.code}: {err_content}",
                    "data": payload,
                }
            raise RemoteSoftwareAPIError(
                f"External API error for {self.product_name} (HTTP {e.code}): {err_content}",
                status_code=e.code,
                response_body=err_content,
            )
        except urllib.error.URLError as e:
            logger.warning(f"Connection to external API {url} failed: {e.reason}. Falling back to simulated provisioning.")
            # In development/offline/unreachable endpoints, provide simulated ID rather than blocking local operations
            simulated_id = f"{self.product_code}_usr_{uuid.uuid4().hex[:8]}"
            return {
                "success": True,
                "external_user_id": simulated_id,
                "is_simulated": True,
                "connection_warning": f"Could not reach {url}: {e.reason}",
                "data": payload,
            }
        except Exception as e:
            logger.error(f"Unexpected error contacting {self.product_code} API: {str(e)}")
            if getattr(settings, "DEBUG", False):
                simulated_id = f"{self.product_code}_usr_{uuid.uuid4().hex[:8]}"
                return {
                    "success": True,
                    "external_user_id": simulated_id,
                    "is_simulated": True,
                    "warning": str(e),
                    "data": payload,
                }
            raise RemoteSoftwareAPIError(f"Unexpected error communicating with {self.product_name}: {str(e)}")

    def sync_local_entities(self, remote_result, validated_data, context=None):
        """
        Synchronizes central ITSOFTLAB360 database:
        1. Resolves or creates User
        2. Resolves or creates Organization
        3. Resolves or creates Product
        4. Resolves or creates OrganizationProduct (subscription)
        5. Links User to Organization as OrganizationUser
        6. Creates UserProductAccess with remote external_user_id
        """
        from users.models import Products, Organization, Franchise
        from franchise.models import OrganizationProduct, OrganizationUser, UserProductAccess

        request = context.get("request") if context else None
        request_user = request.user if (request and request.user.is_authenticated) else None

        external_user_id = remote_result.get("external_user_id")

        # 1. Resolve User Credentials & Info
        email = validated_data.get("email")
        password = validated_data.get("password")
        username = validated_data.get("username") or email.split("@")[0]
        first_name = validated_data.get("first_name", "")
        last_name = validated_data.get("last_name", "")

        # Support 'name' field (e.g. "Jane Doe")
        full_name = validated_data.get("name", "")
        if full_name and not first_name and not last_name:
            parts = full_name.strip().split(" ", 1)
            first_name = parts[0]
            last_name = parts[1] if len(parts) > 1 else ""

        # 2. Resolve Organization
        org_id = validated_data.get("organization_id") or validated_data.get("office")
        company_name = validated_data.get("companyName") or validated_data.get("company_name")
        company_email = validated_data.get("companyEmail") or validated_data.get("company_email") or email
        company_phone = validated_data.get("companyPhone") or validated_data.get("phone") or ""

        franchise_id = validated_data.get("franchise_id")
        franchise = None
        if franchise_id:
            franchise = Franchise.objects.filter(id=franchise_id).first()
        if not franchise and request_user:
            profile = getattr(request_user, "franchise_profile", None)
            if profile and profile.franchise:
                franchise = profile.franchise
        if not franchise:
            franchise = Franchise.objects.first()

        organization = None
        if org_id:
            try:
                organization = Organization.objects.filter(id=int(org_id)).first()
            except (ValueError, TypeError):
                organization = None

        if not organization and company_name:
            organization = Organization.objects.filter(name__iexact=company_name).first()
            if not organization and franchise:
                organization = Organization.objects.create(
                    name=company_name,
                    email=company_email,
                    phone=company_phone,
                    franchise=franchise,
                )

        if not organization:
            # Fallback to user's first org or first organization in franchise
            if request_user and request_user.organization_memberships.exists():
                organization = request_user.organization_memberships.first().organization
            elif franchise and franchise.organizations.exists():
                organization = franchise.organizations.first()
            elif franchise:
                organization = Organization.objects.create(
                    name=company_name or f"{username.capitalize()} Org",
                    email=company_email,
                    phone=company_phone,
                    franchise=franchise,
                )

        # 3. Resolve Product
        product = Products.objects.filter(code=self.product_code).first()
        if not product:
            product = Products.objects.filter(name__iexact=self.product_name).first()
        if not product:
            # Auto-seed minimal product record if not yet in DB
            product = Products.objects.create(
                name=self.product_name or self.product_code.capitalize(),
                code=self.product_code,
                route=f"{self.product_code}.itsoftlab360.com",
                description=f"{self.product_name or self.product_code} Cloud Suite",
                price=Decimal("15000.00"),
                subscription_price_per_user=Decimal("1200.00"),
                billing_cycle="yearly",
                remote_api_url=self.default_api_url,
            )

        # 4. Atomic Transaction for Local Synchronization
        with transaction.atomic():
            # User
            user = User.objects.filter(email__iexact=email).first()
            if not user:
                user = User.objects.filter(username__iexact=username).first()

            if not user:
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password=password or f"Pass@{uuid.uuid4().hex[:8]}",
                    first_name=first_name,
                    last_name=last_name,
                    role="",
                )
            else:
                if password:
                    user.set_password(password)
                if first_name and not user.first_name:
                    user.first_name = first_name
                if last_name and not user.last_name:
                    user.last_name = last_name
                user.save()

            # Subscription (OrganizationProduct)
            subscription = None
            if organization:
                subscription = OrganizationProduct.objects.filter(
                    organization=organization,
                    product=product,
                ).first()

                license_allocation = validated_data.get("licenseAllocation") or 25
                try:
                    license_allocation = int(license_allocation)
                except (ValueError, TypeError):
                    license_allocation = 25

                today = timezone.now().date()
                if not subscription:
                    subscription = OrganizationProduct.objects.create(
                        organization=organization,
                        product=product,
                        license_count=license_allocation,
                        status=OrganizationProduct.Status.ACTIVE,
                        is_active=True,
                        subscription_start=today,
                        subscription_end=today + timedelta(days=365),
                        notes=f"Auto-provisioned via {self.product_name} API",
                    )
                else:
                    if not subscription.is_active or subscription.status != OrganizationProduct.Status.ACTIVE:
                        subscription.is_active = True
                        subscription.status = OrganizationProduct.Status.ACTIVE
                    if license_allocation > subscription.license_count:
                        subscription.license_count = license_allocation
                    subscription.save()

            # OrganizationUser Membership
            org_user = None
            if organization:
                org_user = OrganizationUser.objects.filter(
                    organization=organization,
                    user=user,
                ).first()

                assigned_role = validated_data.get("assignedRole") or validated_data.get("role") or "ORG_ADMIN"
                role_normalized = "ORG_ADMIN" if "admin" in str(assigned_role).lower() else "ORG_EMPLOYEE"

                if not org_user:
                    org_user = OrganizationUser.objects.create(
                        organization=organization,
                        user=user,
                        role=role_normalized,
                        designation="Administrator" if role_normalized == "ORG_ADMIN" else "Member",
                        is_active=True,
                    )
                else:
                    if not org_user.is_active:
                        org_user.is_active = True
                        org_user.save()

            # UserProductAccess Linking
            access = None
            if org_user and subscription:
                access = UserProductAccess.objects.filter(
                    organization_user=org_user,
                    subscription=subscription,
                ).first()

                if not access:
                    access = UserProductAccess.objects.create(
                        organization_user=org_user,
                        subscription=subscription,
                        external_user_id=external_user_id,
                        sync_status=UserProductAccess.SyncStatus.SYNCED,
                        last_synced_at=timezone.now(),
                        is_active=True,
                    )
                else:
                    access.external_user_id = external_user_id
                    access.sync_status = UserProductAccess.SyncStatus.SYNCED
                    access.last_synced_at = timezone.now()
                    access.is_active = True
                    access.save()

        return {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            },
            "organization": {
                "id": organization.id if organization else None,
                "name": organization.name if organization else None,
            },
            "product": {
                "id": product.id,
                "code": product.code,
                "name": product.name,
            },
            "subscription": {
                "id": subscription.id if subscription else None,
                "license_count": subscription.license_count if subscription else None,
                "used_licenses": subscription.used_licenses if subscription else 0,
                "available_licenses": subscription.available_licenses if subscription else 0,
                "license_key": str(subscription.license_key) if subscription else None,
            },
            "organization_user": {
                "id": org_user.id if org_user else None,
                "role": org_user.role if org_user else None,
            },
            "product_access": {
                "id": access.id if access else None,
                "external_user_id": external_user_id,
                "sync_status": access.sync_status if access else "synced",
            },
            "remote_result": remote_result,
        }

    def provision_user(self, validated_data, context=None):
        """
        Full orchestration:
        1. Formats payload for external API
        2. Calls remote product endpoint
        3. Synchronizes local database
        """
        from users.models import Products

        product = Products.objects.filter(code=self.product_code).first()
        url = self.get_api_url(product)
        api_key = getattr(product, "api_key", None) or ""

        remote_payload = self.format_remote_payload(validated_data, context=context)
        remote_result = self.call_remote_api(url, remote_payload, api_key=api_key)
        sync_result = self.sync_local_entities(remote_result, validated_data, context=context)
        return sync_result
