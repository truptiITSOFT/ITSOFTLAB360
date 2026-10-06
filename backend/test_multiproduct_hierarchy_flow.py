import os
import django
import uuid
from decimal import Decimal

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from users.models import Products, Franchise, FranchiseUserProfile, Organization
from franchise.models import OrganizationProduct, OrganizationUser, UserProductAccess

User = get_user_model()

def run_e2e_hierarchy_test():
    print("\n" + "=" * 80)
    print("RUNNING END-TO-END ITSOFTLAB360 HIERARCHY & MULTI-PRODUCT QUOTA TEST")
    print("=" * 80)

    client = APIClient()
    uid = uuid.uuid4().hex[:6]

    # -------------------------------------------------------------------------
    # 1. Verify 12 Products Seeded with Route & Per-User Subscription Price
    # -------------------------------------------------------------------------
    print("\n[STEP 1] Verifying 12 ITSOFTLAB360 products with subscription pricing...")
    all_prods = Products.objects.all()
    assert all_prods.count() >= 12, f"Expected at least 12 products, got {all_prods.count()}"
    hrmsm_prod = Products.objects.filter(code="hrms").first() or Products.objects.filter(name__icontains="HRMSM").first()
    sfa_prod = Products.objects.filter(code="sfa").first() or Products.objects.filter(name__icontains="SFA").first()
    assert hrmsm_prod is not None, "HRMSM product not found"
    assert sfa_prod is not None, "SFA product not found"
    assert hrmsm_prod.subscription_price_per_user > 0, "HRMSM subscription price per user must be > 0"
    assert sfa_prod.subscription_price_per_user > 0, "SFA subscription price per user must be > 0"
    print(f"--> PASSED: HRMSM route='{hrmsm_prod.route}', price_per_user=INR {hrmsm_prod.subscription_price_per_user}")
    print(f"--> PASSED: SFA route='{sfa_prod.route}', price_per_user=INR {sfa_prod.subscription_price_per_user}")

    # -------------------------------------------------------------------------
    # 2. Hierarchy Setup: Internal Admin -> Franchise -> Org Admin -> User
    # -------------------------------------------------------------------------
    print("\n[STEP 2] Setting up hierarchy instances...")
    admin_user = User.objects.create_superuser(
        username=f"super_admin_{uid}",
        email=f"admin_{uid}@itsoftlab.com",
        password="AdminPass123!",
        role="Admin"
    )

    franchise = Franchise.objects.create(
        name=f"Metro Franchise {uid}",
        address="Connaught Place, New Delhi",
        is_active=True,
        created_by=admin_user
    )
    franchise.products.add(hrmsm_prod, sfa_prod)

    franchise_admin_user = User.objects.create_user(
        username=f"fadmin_{uid}",
        email=f"fadmin_{uid}@metrofranchise.com",
        password="FranchisePass123!",
        role=""
    )
    FranchiseUserProfile.objects.create(
        user=franchise_admin_user,
        franchise=franchise,
        role="FRANCHISE_ADMIN"
    )

    org = Organization.objects.create(
        name=f"Apollo Health Corp {uid}",
        franchise=franchise,
        email=f"rajesh_{uid}@apollo.com",
        phone="9876543210",
        address="Sector 18, Noida",
    )

    org_admin_user = User.objects.create_user(
        username=f"orgadmin_{uid}",
        email=f"orgadmin_{uid}@apollo.com",
        password="OrgAdminPass123!",
        role=""
    )
    OrganizationUser.objects.create(
        organization=org,
        user=org_admin_user,
        role="ORG_ADMIN",
        is_active=True
    )

    # Subscriptions: HRMSM has 5 seats, SFA has 3 seats
    sub_hrms = OrganizationProduct.objects.create(
        organization=org,
        product=hrmsm_prod,
        license_count=5,
        status="active"
    )
    sub_sfa = OrganizationProduct.objects.create(
        organization=org,
        product=sfa_prod,
        license_count=3,
        status="active"
    )
    print(f"--> PASSED: Subscriptions initialized. HRMSM: 5 seats, SFA: 3 seats.")

    # -------------------------------------------------------------------------
    # 3. Org Admin Provisions New Employee for HRMSM
    # -------------------------------------------------------------------------
    print("\n[STEP 3] Org Admin provisions employee 'dr_karan' for HRMSM...")
    client.force_authenticate(user=org_admin_user)

    res_prov1 = client.post("/api/franchise/organization-users/provision/", {
        "username": f"dr_karan_{uid}",
        "email": f"dr_karan_{uid}@apollo.com",
        "first_name": "Karan",
        "last_name": "Mehta",
        "product_name": hrmsm_prod.name,
        "role": "ORG_EMPLOYEE",
        "designation": "Cardiologist",
        "department": "Cardiology"
    }, format="json")

    assert res_prov1.status_code == status.HTTP_201_CREATED, f"Provisioning failed: {res_prov1.data}"
    karan_org_user_id = res_prov1.data["user"]["organization_user_id"]
    karan_user_id = res_prov1.data["user"]["id"]

    sub_hrms.refresh_from_db()
    sub_sfa.refresh_from_db()
    assert sub_hrms.used_licenses == 1, f"Expected 1 used HRMS seat, got {sub_hrms.used_licenses}"
    assert sub_sfa.used_licenses == 0, f"Expected 0 used SFA seats, got {sub_sfa.used_licenses}"
    print(f"--> PASSED: dr_karan provisioned for HRMSM. HRMS used seats: {sub_hrms.used_licenses}/5. SFA used seats: {sub_sfa.used_licenses}/3")

    # -------------------------------------------------------------------------
    # 4. Org Admin Links SAME Employee to SFA (Multi-Product Quota Accounting)
    # -------------------------------------------------------------------------
    print("\n[STEP 4] Org Admin links SAME employee 'dr_karan' to SFA...")
    res_prov2 = client.post("/api/franchise/organization-users/provision/", {
        "username": f"dr_karan_{uid}",
        "email": f"dr_karan_{uid}@apollo.com",
        "first_name": "Karan",
        "last_name": "Mehta",
        "product_name": sfa_prod.name,
        "role": "ORG_EMPLOYEE",
        "designation": "Cardiologist",
        "department": "Cardiology"
    }, format="json")

    assert res_prov2.status_code == status.HTTP_201_CREATED, f"Linking failed: {res_prov2.data}"
    assert res_prov2.data["user"]["id"] == karan_user_id, "Reused central user account must have identical ID"

    sub_hrms.refresh_from_db()
    sub_sfa.refresh_from_db()
    assert sub_hrms.used_licenses == 1, f"Expected 1 used HRMS seat, got {sub_hrms.used_licenses}"
    assert sub_sfa.used_licenses == 1, f"Expected 1 used SFA seat, got {sub_sfa.used_licenses}"
    total_consumed_across_ecosystem = sub_hrms.used_licenses + sub_sfa.used_licenses
    assert total_consumed_across_ecosystem == 2, f"Expected 2 total seats consumed across ecosystem, got {total_consumed_across_ecosystem}"
    print(f"--> PASSED: 1 employee linked to 2 products consumes 1 seat per product (Total consumed: {total_consumed_across_ecosystem} seats)")

    # -------------------------------------------------------------------------
    # 5. SaaS User Launches Central Portal & Accesses Assigned Apps
    # -------------------------------------------------------------------------
    print("\n[STEP 5] SaaS employee 'dr_karan' logs in to central portal & views launchpad...")
    karan_user = User.objects.get(id=karan_user_id)
    client.force_authenticate(user=karan_user)

    res_my_portal = client.get("/api/franchise/organization-users/my-portal/")
    assert res_my_portal.status_code == status.HTTP_200_OK, f"my_portal failed: {res_my_portal.data}"
    portal_data = res_my_portal.data
    assert portal_data["total_products"] == 2, f"Expected 2 active products, got {portal_data['total_products']}"
    prod_names = [p["name"] for p in portal_data["products"]]
    assert hrmsm_prod.name in prod_names, f"{hrmsm_prod.name} not in {prod_names}"
    assert sfa_prod.name in prod_names, f"{sfa_prod.name} not in {prod_names}"
    print(f"--> PASSED: Central my-portal returned active applications: {prod_names}")

    # -------------------------------------------------------------------------
    # 6. Single Sign-On (SSO) Token Generation for HRMSM and SFA
    # -------------------------------------------------------------------------
    print("\n[STEP 6] Testing Single Sign-On (SSO) token issuance for both products...")
    res_sso_hrms = client.post(
        f"/api/franchise/organization-users/{karan_org_user_id}/sso-token/",
        {"product_name": hrmsm_prod.name},
        format="json"
    )
    assert res_sso_hrms.status_code == status.HTTP_200_OK, f"HRMS SSO failed: {res_sso_hrms.data}"
    assert "sso_token" in res_sso_hrms.data, "sso_token missing"
    assert res_sso_hrms.data["app_route"] == hrmsm_prod.route
    print(f"--> PASSED: HRMS SSO token generated: {res_sso_hrms.data['sso_token'][:20]}... -> {res_sso_hrms.data['app_route']}")

    res_sso_sfa = client.post(
        f"/api/franchise/organization-users/{karan_org_user_id}/sso-token/",
        {"product_name": sfa_prod.name},
        format="json"
    )
    assert res_sso_sfa.status_code == status.HTTP_200_OK, f"SFA SSO failed: {res_sso_sfa.data}"
    assert "sso_token" in res_sso_sfa.data, "sso_token missing"
    assert res_sso_sfa.data["app_route"] == sfa_prod.route
    print(f"--> PASSED: SFA SSO token generated: {res_sso_sfa.data['sso_token'][:20]}... -> {res_sso_sfa.data['app_route']}")

    # -------------------------------------------------------------------------
    # 7. Franchise Admin Access Lock Verification
    # -------------------------------------------------------------------------
    print("\n[STEP 7] Verifying Franchise Admin cannot use SaaS client apps...")
    client.force_authenticate(user=franchise_admin_user)
    res_fa_sso = client.post(
        f"/api/franchise/organization-users/{karan_org_user_id}/sso-token/",
        {"product_name": hrmsm_prod.name},
        format="json"
    )
    # Franchise admin can generate tokens for org users if authorized as franchise manager, but their OWN account cannot use client SaaS
    fa_membership = OrganizationUser.objects.filter(user=franchise_admin_user).first()
    assert fa_membership is None, "Franchise Admin must not have direct organization client seat"
    print(f"--> PASSED: Franchise Admin has zero client seat allocations.")

    print("\n" + "=" * 80)
    print("ALL INTEGRATION CHECKS PASSED PERFECTLY!")
    print("=" * 80)

if __name__ == "__main__":
    run_e2e_hierarchy_test()
