from .base import BaseProductAdapter


class GenericProductAdapter(BaseProductAdapter):
    """
    Generic fallback adapter for remaining products (ERP, CRM, POS, QMS, AI, SFA, VMS, LMS, DoMS, DMS)
    until their specific endpoints and schemas are configured one by one.
    """
    def __init__(self, product_code="generic", product_name="Generic Product", default_api_url=""):
        self.product_code = product_code
        self.product_name = product_name
        self.default_api_url = default_api_url

    def format_remote_payload(self, validated_data, context=None):
        email = validated_data.get("email")
        username = validated_data.get("username") or (email.split("@")[0] if email else "user")
        first_name = validated_data.get("first_name", "")
        last_name = validated_data.get("last_name", "")

        name = validated_data.get("name", "")
        if name and not first_name and not last_name:
            parts = name.strip().split(" ", 1)
            first_name = parts[0]
            last_name = parts[1] if len(parts) > 1 else ""

        return {
            "username": username,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "password": validated_data.get("password") or "Password123!",
            "role": validated_data.get("role") or validated_data.get("assignedRole") or "Admin",
            "organization_id": str(validated_data.get("organization_id") or validated_data.get("office") or "1"),
            "company_name": validated_data.get("companyName") or validated_data.get("company_name") or "",
        }
