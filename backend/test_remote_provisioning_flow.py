import os
import django
import uuid
from decimal import Decimal
from datetime import date, timedelta
from unittest.mock import patch

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

from users.models import Franchise, Products, Organization, FranchiseUserProfile
from franchise.models import (
    OrganizationProduct,
    OrganizationUser,
    UserProductAccess,
)
from franchise.services.remote_provisioning import (
    RemoteProductService,
    RemoteSoftwareAPIError,
)

User = get_user_model()


def run_tests():
    print("=" * 75)
    print("STARTING MULTI-PRODUCT USER PROVISIONING & REMOTE SYNC FLOW TESTS")
    print("=" * 75)

    client = APIClient()
    uid = uuid.uuid4().hex[:6]

    # -----------------------------------------------------------------------
    # Setup Base Infrastructure: Superadmin, Products, Franchise, Org Admin
    # -----------------------------------------------------------------------
    super_admin = User.objects.create_superuser(
        username=f"super_{uid}",
        email=f"super_{uid}@test.com",
        password="Password123!",
        role="Admin",
    )

    hrms_product = Products.objects.create(
        name="HRMSM",
        description="Human Resource Management Suite",
        price=Decimal("9999.00"),
        remote_api_url="mock://hrms.itsoftlab360.com/api/users",
        api_key=f"hrms_secret_{uid}",
        created_by=super_admin,
    )

    crm_product = Products.objects.create(
        name="CRM",
        description="Customer Relationship Management",
        price=Decimal("6999.00"),
        remote_api_url="mock://crm.itsoftlab360.com/api/users",
        api_key=f"crm_secret_{uid}",
        created_by=super_admin,
    )

    test_franchise = Franchise.objects.create(
        name=f"Delta Franchise {uid}",
        address="100 Silicon Valley",
        created_by=super_admin,
    )
    test_franchise.products.add(hrms_product, crm_product)

    # Organization setup
    org = Organization.objects.create(
        name=f"Apex Healthcare {uid}",
        email=f"contact_{uid}@apexhealth.com",
        franchise=test_franchise,
    )

    # Organization Subscriptions: HRMS (2 seats), CRM (1 seat)
    hrms_sub = OrganizationProduct.objects.create(
        organization=org,
        product=hrms_product,
        license_count=2,
        status=OrganizationProduct.Status.ACTIVE,
        is_active=True,
    )

    crm_sub = OrganizationProduct.objects.create(
        organization=org,
        product=crm_product,
        license_count=1,
        status=OrganizationProduct.Status.ACTIVE,
        is_active=True,
    )

    # Org Admin User
    org_admin_user = User.objects.create_user(
        username=f"apex_admin_{uid}",
        email=f"admin_{uid}@apexhealth.com",
        password="AdminPassword123!",
        role="",
    )
    org_admin_membership = OrganizationUser.objects.create(
        organization=org,
        user=org_admin_user,
        role="ORG_ADMIN",
        designation="Hospital Director",
    )

    client.force_authenticate(user=org_admin_user)
    print(f"[PASS] [SETUP] Base setup complete: Organization '{org.name}' with HRMS (2 seats) and CRM (1 seat).")
    print(f"       Org Admin '{org_admin_user.username}' authenticated.")

    # -----------------------------------------------------------------------
    # TEST 1: Provisioning New User into HRMS (First Product)
    # -----------------------------------------------------------------------
    initial_user_count = User.objects.count()

    res_prov_1 = client.post(
        "/api/franchise/organization-users/provision/",
        {
            "username": f"dr_rahul_{uid}",
            "email": f"rahul_{uid}@apexhealth.com",
            "first_name": "Rahul",
            "last_name": "Verma",
            "product_name": "HRMSM",
            "role": "ORG_EMPLOYEE",
            "designation": "Chief Surgeon",
            "department": "Surgery",
        },
        format="json",
    )
    assert res_prov_1.status_code == status.HTTP_201_CREATED, f"Provision 1 failed: {res_prov_1.data}"

    rahul_user = User.objects.get(username=f"dr_rahul_{uid}")
    rahul_org_user = OrganizationUser.objects.get(user=rahul_user, organization=org)

    # Verify HRMS license consumption
    hrms_sub.refresh_from_db()
    assert hrms_sub.used_licenses == 1
    assert hrms_sub.available_licenses == 1
    assert res_prov_1.data["subscription_status"]["used_licenses"] == 1
    assert res_prov_1.data["subscription_status"]["available_licenses_remaining"] == 1

    # Verify remote external ID
    hrms_access = UserProductAccess.objects.get(organization_user=rahul_org_user, subscription=hrms_sub)
    assert hrms_access.external_user_id.startswith("hrmsm_usr_")
    assert rahul_org_user.external_product_ids == {"HRMSM": hrms_access.external_user_id}
    assert rahul_org_user.active_products == ["HRMSM"]

    print(f"[PASS] [TEST 1] User '{rahul_user.username}' provisioned into HRMS.")
    print(f"       External HRMS ID: {hrms_access.external_user_id}")
    print(f"       HRMS licenses: {hrms_sub.used_licenses}/{hrms_sub.license_count} used (1 remaining).")

    # -----------------------------------------------------------------------
    # TEST 2: Multi-Product Linking - Assigning the SAME User into CRM
    # -----------------------------------------------------------------------
    # Org Admin calls provision endpoint with the SAME username/email but product_name="CRM"
    res_prov_2 = client.post(
        "/api/franchise/organization-users/provision/",
        {
            "username": f"dr_rahul_{uid}",
            "email": f"rahul_{uid}@apexhealth.com",
            "product_name": "CRM",
            "role": "ORG_EMPLOYEE",
            "designation": "Chief Surgeon",
            "department": "Surgery",
        },
        format="json",
    )
    assert res_prov_2.status_code == status.HTTP_201_CREATED, f"Provision 2 failed: {res_prov_2.data}"

    # Verify NO duplicate User was created in central database!
    current_user_count = User.objects.count()
    assert current_user_count == initial_user_count + 1, "A duplicate central User was unexpectedly created!"

    # Verify CRM license consumption
    crm_sub.refresh_from_db()
    assert crm_sub.used_licenses == 1
    assert crm_sub.available_licenses == 0

    # Verify multi-product mapping on the SAME user
    rahul_org_user.refresh_from_db()
    crm_access = UserProductAccess.objects.get(organization_user=rahul_org_user, subscription=crm_sub)
    assert crm_access.external_user_id.startswith("crm_usr_")

    mapping = rahul_org_user.external_product_ids
    assert "HRMSM" in mapping
    assert "CRM" in mapping
    assert mapping["HRMSM"] == hrms_access.external_user_id
    assert mapping["CRM"] == crm_access.external_user_id
    assert set(rahul_org_user.active_products) == {"HRMSM", "CRM"}

    print(f"[PASS] [TEST 2] Multi-Product Linking successful!")
    print(f"       User '{rahul_user.username}' is now linked to multiple products without duplicate records:")
    print(f"       external_product_ids = {mapping}")
    print(f"       CRM licenses: {crm_sub.used_licenses}/{crm_sub.license_count} used (0 remaining).")

    # -----------------------------------------------------------------------
    # TEST 3: Enforcing License Seat Limits (CRM limit reached)
    # -----------------------------------------------------------------------
    # Attempt to provision a 2nd user into CRM (limit is 1 and already used by Rahul)
    res_limit = client.post(
        "/api/franchise/organization-users/provision/",
        {
            "username": f"dr_sneha_{uid}",
            "email": f"sneha_{uid}@apexhealth.com",
            "product_name": "CRM",
            "role": "ORG_EMPLOYEE",
        },
        format="json",
    )
    assert res_limit.status_code == status.HTTP_400_BAD_REQUEST, f"Expected 400, got: {res_limit.data}"
    error_str = str(res_limit.data)
    assert "License limit reached for 'CRM'" in error_str
    print(f"[PASS] [TEST 3] License limit enforcement verified: {error_str}")

    # -----------------------------------------------------------------------
    # TEST 4: Remote API Error Handling (No license consumed if remote call fails)
    # -----------------------------------------------------------------------
    with patch.object(
        RemoteProductService,
        "create_remote_user",
        side_effect=RemoteSoftwareAPIError("Remote HRMS server connection timed out (504)"),
    ):
        res_fail = client.post(
            "/api/franchise/organization-users/provision/",
            {
                "username": f"dr_vikram_{uid}",
                "email": f"vikram_{uid}@apexhealth.com",
                "product_name": "HRMSM",
                "role": "ORG_EMPLOYEE",
            },
            format="json",
        )
        assert res_fail.status_code == status.HTTP_400_BAD_REQUEST
        assert "Remote HRMS server connection timed out" in str(res_fail.data)

        # Confirm that no license was consumed
        hrms_sub.refresh_from_db()
        assert hrms_sub.used_licenses == 1, "License should NOT have been consumed when remote API fails!"

    print(f"[PASS] [TEST 4] Remote software API failure handled cleanly. No license deducted.")

    # -----------------------------------------------------------------------
    # TEST 5: Single Sign-On (SSO) Token Generation & Verification
    # -----------------------------------------------------------------------
    res_sso = client.post(
        f"/api/franchise/organization-users/{rahul_org_user.id}/sso-token/",
        {"product_name": "HRMSM"},
        format="json",
    )
    assert res_sso.status_code == status.HTTP_200_OK, f"SSO token failed: {res_sso.data}"
    sso_token = res_sso.data["sso_token"]
    assert res_sso.data["external_user_id"] == hrms_access.external_user_id

    # Verify token payload
    verified = RemoteProductService.verify_sso_token(sso_token)
    assert verified["valid"] is True
    payload = verified["payload"]
    assert payload["username"] == rahul_user.username
    assert payload["product_name"] == "HRMSM"
    assert payload["external_user_id"] == hrms_access.external_user_id
    assert payload["organization_id"] == org.id

    # SSO token for an unassigned product should fail with 403
    unassigned_product, _ = Products.objects.get_or_create(
        name="School Portal",
        defaults={"description": "School ERP", "price": Decimal("5000.00")},
    )
    res_sso_invalid = client.post(
        f"/api/franchise/organization-users/{rahul_org_user.id}/sso-token/",
        {"product_name": "School Portal"},
        format="json",
    )
    assert res_sso_invalid.status_code == status.HTTP_403_FORBIDDEN
    print(f"[PASS] [TEST 5] SSO Token generated and verified successfully. Unauthorized product access blocked.")

    # -----------------------------------------------------------------------
    # TEST 6: Revoke Product Access (Frees up 1 license)
    # -----------------------------------------------------------------------
    res_revoke = client.post(
        f"/api/franchise/organization-users/{rahul_org_user.id}/revoke-product/",
        {"subscription_id": crm_sub.id},
        format="json",
    )
    assert res_revoke.status_code == status.HTTP_200_OK
    crm_sub.refresh_from_db()
    assert crm_sub.used_licenses == 0
    assert crm_sub.available_licenses == 1

    rahul_org_user.refresh_from_db()
    assert "CRM" not in rahul_org_user.external_product_ids
    assert rahul_org_user.external_product_ids == {"HRMSM": hrms_access.external_user_id}

    # Now dr_sneha CAN be provisioned into CRM since Rahul's license was freed
    res_sneha = client.post(
        "/api/franchise/organization-users/provision/",
        {
            "username": f"dr_sneha_{uid}",
            "email": f"sneha_{uid}@apexhealth.com",
            "product_name": "CRM",
            "role": "ORG_EMPLOYEE",
        },
        format="json",
    )
    assert res_sneha.status_code == status.HTTP_201_CREATED
    crm_sub.refresh_from_db()
    assert crm_sub.used_licenses == 1
    assert crm_sub.available_licenses == 0
    print(f"[PASS] [TEST 6] Product license revocation and reallocation verified.")

    print("=" * 75)
    print("ALL TESTS IN MULTI-PRODUCT USER PROVISIONING FLOW PASSED PERFECTLY!")
    print("=" * 75)


if __name__ == "__main__":
    run_tests()
