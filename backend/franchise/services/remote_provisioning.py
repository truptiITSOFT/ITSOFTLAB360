import json
import logging
import uuid
import urllib.request
import urllib.error
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired
from django.conf import settings
from django.utils import timezone

logger = logging.getLogger(__name__)


class RemoteSoftwareAPIError(Exception):
    """Exception raised when remote software API user provisioning fails."""
    pass


class RemoteProductService:
    """
    Handles communication with external software APIs (e.g. HRMS, CRM)
    for provisioning users remotely and generating single sign-on (SSO) credentials.
    """

    SSO_SIGNER = TimestampSigner(salt="itsoftlab360_sso_remote_auth")

    @classmethod
    def create_remote_user(cls, product, user_data, subscription):
        """
        Calls remote software's API via remote URL to provision a user in that software.
        Returns dict with `external_user_id` and metadata.

        If product.remote_api_url is not set or begins with 'mock://', generates
        a simulated remote external ID (used in local development and offline environments).
        """
        remote_url = getattr(product, "remote_api_url", None)
        api_key = getattr(product, "api_key", None) or ""

        from .product_adapters import ProductAdapterRegistry

        adapter = ProductAdapterRegistry.get_adapter(getattr(product, "code", None) or getattr(product, "name", None))
        context_data = {
            "organization_id": subscription.organization.id,
            "office": subscription.organization.id,
            "companyName": subscription.organization.name,
            "companyEmail": subscription.organization.email,
            "companyPhone": subscription.organization.phone,
            "licenseAllocation": subscription.license_count,
        }
        merged_data = {**context_data, **user_data}
        try:
            payload = adapter.format_remote_payload(merged_data)
        except Exception:
            # Prepare standardized provisioning payload as fallback
            payload = {
                "username": user_data.get("username"),
                "email": user_data.get("email"),
                "first_name": user_data.get("first_name", ""),
                "last_name": user_data.get("last_name", ""),
                "role": user_data.get("role", "ORG_EMPLOYEE"),
                "designation": user_data.get("designation", ""),
                "department": user_data.get("department", ""),
                "organization_id": subscription.organization.id,
                "organization_name": subscription.organization.name,
                "license_key": str(subscription.license_key),
                "permissions": user_data.get("permissions", {}),
                "timestamp": timezone.now().isoformat(),
            }

        if not remote_url and getattr(adapter, "default_api_url", None):
            remote_url = adapter.default_api_url

        # Offline / Mock simulation mode
        if not remote_url or remote_url.startswith("mock://"):
            prefix = product.name.lower().replace(" ", "_")
            simulated_id = f"{prefix}_usr_{uuid.uuid4().hex[:8]}"
            logger.info(
                f"[SIMULATION] Mock remote user created for product '{product.name}': {simulated_id}"
            )
            return {
                "success": True,
                "external_user_id": simulated_id,
                "is_simulated": True,
                "data": payload,
            }

        # Real HTTP API Call to remote URL
        json_data = json.dumps(payload).encode("utf-8")
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "ITSoftLab360-License-Provisioner/1.0",
        }
        if api_key:
            headers["Authorization"] = f"Bearer {api_key}"
            headers["X-API-Key"] = api_key

        req = urllib.request.Request(remote_url, data=json_data, headers=headers, method="POST")

        try:
            with urllib.request.urlopen(req, timeout=8) as response:
                resp_body = response.read().decode("utf-8")
                resp_json = json.loads(resp_body)

                # Extract external user ID from standard keys
                external_user_id = (
                    resp_json.get("external_user_id")
                    or resp_json.get("user_id")
                    or resp_json.get("id")
                    or (resp_json.get("data", {}) if isinstance(resp_json.get("data"), dict) else {}).get("id")
                    or (resp_json.get("data", {}) if isinstance(resp_json.get("data"), dict) else {}).get("user_id")
                )

                if not external_user_id:
                    raise RemoteSoftwareAPIError(
                        f"Remote API for {product.name} returned HTTP 200/201 but missing user_id in response: {resp_body}"
                    )

                return {
                    "success": True,
                    "external_user_id": str(external_user_id),
                    "is_simulated": False,
                    "response": resp_json,
                }

        except urllib.error.HTTPError as e:
            error_msg = e.read().decode("utf-8", errors="ignore")
            logger.error(f"Remote API Error ({product.name}) HTTP {e.code}: {error_msg}")
            raise RemoteSoftwareAPIError(
                f"Failed to create user in {product.name} (HTTP {e.code}): {error_msg}"
            )
        except urllib.error.URLError as e:
            logger.error(f"Remote API Connection Error ({product.name}): {e.reason}")
            raise RemoteSoftwareAPIError(
                f"Could not connect to {product.name} at {remote_url}: {e.reason}"
            )
        except Exception as e:
            logger.error(f"Unexpected error calling {product.name} API: {str(e)}")
            raise RemoteSoftwareAPIError(f"Unexpected error contacting {product.name}: {str(e)}")

    @classmethod
    def generate_sso_token(cls, org_user, product, access=None):
        """
        Generates a secure, signed single sign-on token for launching
        the remote application seamlessly without a second password prompt.
        """
        payload = {
            "user_id": org_user.user.id,
            "username": org_user.user.username,
            "email": org_user.user.email,
            "first_name": org_user.user.first_name,
            "last_name": org_user.user.last_name,
            "organization_id": org_user.organization.id,
            "organization_name": org_user.organization.name,
            "product_id": product.id,
            "product_name": product.name,
            "external_user_id": access.external_user_id if access else None,
            "created_at": timezone.now().isoformat(),
        }
        signed_token = cls.SSO_SIGNER.sign(json.dumps(payload))
        return {
            "sso_token": signed_token,
            "product_name": product.name,
            "external_user_id": access.external_user_id if access else None,
            "expires_in_seconds": 300,
        }

    @classmethod
    def verify_sso_token(cls, token, max_age=300):
        """
        Verifies and unpacks an SSO token.
        Can be called by remote applications or verify endpoint.
        """
        try:
            unsigned_str = cls.SSO_SIGNER.unsign(token, max_age=max_age)
            return {"valid": True, "payload": json.loads(unsigned_str)}
        except SignatureExpired:
            return {"valid": False, "error": "SSO token expired"}
        except BadSignature:
            return {"valid": False, "error": "Invalid SSO token signature"}
