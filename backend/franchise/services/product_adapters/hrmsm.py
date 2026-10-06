from .base import BaseProductAdapter


class HRMSMAdapter(BaseProductAdapter):
    """
    Adapter for HRMSM (Human Resource Management Suite) user registration.
    Target endpoint: POST https://hrmsm.com/api/accounts/register/
    Auth: Allow Any
    """
    product_code = "hrms"
    product_name = "HRMSM"
    default_api_url = "https://hrmsm.com/api/accounts/register/"
    default_auth_type = "allow_any"

    def format_remote_payload(self, validated_data, context=None):
        """
        Maps validated input into the exact schema expected by the HRMSM accounts register API.
        """
        email = validated_data.get("email")
        username = validated_data.get("username")
        if not username and email:
            username = email.split("@")[0]

        first_name = validated_data.get("first_name", "")
        last_name = validated_data.get("last_name", "")

        # Extract from 'name' if first_name / last_name not directly provided
        name = validated_data.get("name", "")
        if name and not first_name and not last_name:
            parts = name.strip().split(" ", 1)
            first_name = parts[0]
            last_name = parts[1] if len(parts) > 1 else ""

        office = validated_data.get("office") or validated_data.get("organization_id") or "1"

        payload = {
            "email": email,
            "password": validated_data.get("password") or "Password123!",
            "first_name": first_name or username,
            "last_name": last_name or "",
            "username": username,
            "role": validated_data.get("role") or "Admin",
            "office": str(office),
        }
        return payload
