from .base import BaseProductAdapter


class SupplyChainAdapter(BaseProductAdapter):
    """
    Adapter for Supply Chain software admin/user provisioning.
    Target endpoint: POST https://supplychain.itsoftlab360.com/api/v1/super-admin/admins
    Auth: Allow Any (no Bearer token strictly required, or passed if configured).
    """
    product_code = "supply-chain"
    product_name = "Supply Chain"
    default_api_url = "https://supplychain.itsoftlab360.com/api/v1/super-admin/admins"
    default_auth_type = "allow_any"

    def format_remote_payload(self, validated_data, context=None):
        """
        Maps validated input into the exact schema expected by the Supply Chain Super-Admin API.
        """
        name = validated_data.get("name")
        if not name:
            first = validated_data.get("first_name", "")
            last = validated_data.get("last_name", "")
            name = f"{first} {last}".strip() or validated_data.get("username", "")

        password = validated_data.get("password") or "Password123!"
        confirm_password = validated_data.get("confirmPassword") or validated_data.get("confirm_password") or password

        company_name = validated_data.get("companyName") or validated_data.get("company_name") or "Acme Logistics Ltd"
        company_email = validated_data.get("companyEmail") or validated_data.get("company_email") or validated_data.get("email")
        phone = validated_data.get("phone") or "+1234567890"
        company_phone = validated_data.get("companyPhone") or validated_data.get("company_phone") or phone

        license_allocation = validated_data.get("licenseAllocation") or 25
        try:
            license_allocation = int(license_allocation)
        except (ValueError, TypeError):
            license_allocation = 25

        payload = {
            "name": name,
            "email": validated_data.get("email"),
            "password": password,
            "confirmPassword": confirm_password,
            "assignedRole": validated_data.get("assignedRole") or "ADMIN",
            "companyName": company_name,
            "companyEmail": company_email,
            "phone": phone,
            "companyPhone": company_phone,
            "licenseAllocation": license_allocation,
            "subscriptionPlan": validated_data.get("subscriptionPlan") or "BASIC",
            "status": validated_data.get("status") or "ACTIVE",
        }
        return payload
