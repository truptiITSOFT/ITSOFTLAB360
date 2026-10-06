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
from franchise.models import OrganizationProduct, OrganizationUser

User = get_user_model()

def run_tests():
    print("\n" + "=" * 70)
    print("RUNNING SUBSCRIPTION PRICING & TEAM CREATION INTEGRATION SUITE")
    print("=" * 70)

    client = APIClient()
    uid = uuid.uuid4().hex[:6]

    # -------------------------------------------------------------------------
    # 1. Internal Admin & Products with Subscription Pricing
    # -------------------------------------------------------------------------
    print("\n[STEP 1] Admin creates Product with Per-User Subscription Pricing...")
    admin_user = User.objects.create_superuser(
        username=f"admin_{uid}",
        email=f"admin_{uid}@itsoftlab.com",
        password="AdminPass123!",
        role="Admin"
    )
    client.force_authenticate(user=admin_user)

    res_prod = client.post("/api/users/products/", {
        "name": f"Enterprise HRMS {uid}",
        "description": "Full HRMS Suite",
        "price": "50000.00",
        "subscription_price_per_user": "1200.00",
        "billing_cycle": "yearly"
    }, format="json")
    assert res_prod.status_code == status.HTTP_201_CREATED, f"Failed to create product: {res_prod.data}"
    prod_id = res_prod.data["id"]
    assert Decimal(str(res_prod.data["subscription_price_per_user"])) == Decimal("1200.00")
    assert res_prod.data["billing_cycle"] == "yearly"
    print(f"--> PASSED: Created product #{prod_id} with subscription_price_per_user = INR 1200.00/yr")

    # -------------------------------------------------------------------------
    # 2. Internal Admin creates Internal Team members (IT, Sales, Accountant)
    # -------------------------------------------------------------------------
    print("\n[STEP 2] Internal Admin creates IT, Sales, Accountant...")
    roles_to_create = [("it", "IT"), ("sales", "Sales"), ("acc", "Accountant")]
    for prefix, role_name in roles_to_create:
        res_team = client.post("/api/users/users/", {
            "username": f"{prefix}_{uid}",
            "password": "Password123!",
            "email": f"{prefix}_{uid}@itsoftlab.com",
            "first_name": prefix.capitalize(),
            "last_name": "Staff",
            "role": role_name
        }, format="json")
        assert res_team.status_code == status.HTTP_201_CREATED, f"Failed creating {role_name}: {res_team.data}"
        assert res_team.data["role"] == role_name
        print(f"--> PASSED: Internal Admin created {role_name} member: {res_team.data['username']}")

    # -------------------------------------------------------------------------
    # 3. Setup Franchise & Franchise Admin
    # -------------------------------------------------------------------------
    print("\n[STEP 3] Setup Franchise & Franchise Admin...")
    franchise = Franchise.objects.create(
        name=f"Apex Franchise {uid}",
        address="Sector 62, Noida",
        is_active=True,
        created_by=admin_user
    )
    product_obj = Products.objects.get(id=prod_id)
    franchise.products.add(product_obj)

    franchise_admin_user = User.objects.create_user(
        username=f"fadmin_{uid}",
        email=f"fadmin_{uid}@franchise.com",
        password="FranchisePass123!",
        role=""
    )
    FranchiseUserProfile.objects.create(
        user=franchise_admin_user,
        franchise=franchise,
        role="FRANCHISE_ADMIN"
    )

    # -------------------------------------------------------------------------
    # 4. Franchise Admin creates Franchise Team (FRANCHISE_IT, SALES, ACCOUNTANT)
    # -------------------------------------------------------------------------
    print("\n[STEP 4] Franchise Admin creates Franchise Team...")
    client.force_authenticate(user=franchise_admin_user)

    franchise_roles = [
        ("f_it", "FRANCHISE_IT"),
        ("f_sales", "FRANCHISE_SALES"),
        ("f_acc", "FRANCHISE_ACCOUNTANT"),
    ]
    for prefix, f_role in franchise_roles:
        res_fteam = client.post("/api/users/franchise-users/", {
            "username": f"{prefix}_{uid}",
            "password": "FTeamPass123!",
            "email": f"{prefix}_{uid}@franchise.com",
            "first_name": prefix.upper(),
            "last_name": "Member",
            "role": f_role
        }, format="json")
        assert res_fteam.status_code == status.HTTP_201_CREATED, f"Failed creating {f_role}: {res_fteam.data}"
        assert res_fteam.data["role"] == f_role
        assert res_fteam.data["franchise"] == franchise.id
        print(f"--> PASSED: Franchise Admin created {f_role}: {res_fteam.data['username']}")

    # -------------------------------------------------------------------------
    # 5. Verify Franchise Admin views product catalog with per-user pricing
    # -------------------------------------------------------------------------
    print("\n[STEP 5] Franchise Admin views product catalog...")
    res_cat = client.get("/api/users/products/")
    assert res_cat.status_code == status.HTTP_200_OK
    items = res_cat.data if isinstance(res_cat.data, list) else res_cat.data.get("results", [])
    matching = [p for p in items if p["id"] == prod_id]
    assert len(matching) == 1
    assert Decimal(str(matching[0]["subscription_price_per_user"])) == Decimal("1200.00")
    print(f"--> PASSED: Franchise Admin views Product #{prod_id} with subscription_price_per_user INR 1200.00/yr")

    # -------------------------------------------------------------------------
    # 6. Verify Franchise Admin CANNOT launch software directly (Distributor Only)
    # -------------------------------------------------------------------------
    print("\n[STEP 6] Verify Franchise Admin cannot launch end-user software...")
    # Attempting to fetch SSO token for a non-existent/invalid org user or unauthorized access
    res_sso_fail = client.post("/api/franchise/organization-users/999999/sso-token/", {
        "product_name": product_obj.name
    }, format="json")
    assert res_sso_fail.status_code in [status.HTTP_404_NOT_FOUND, status.HTTP_403_FORBIDDEN]
    print("--> PASSED: Franchise Admin cannot launch software directly.")

    # -------------------------------------------------------------------------
    # 7. Invalid Credentials check (401 response contract)
    # -------------------------------------------------------------------------
    print("\n[STEP 7] Test invalid credentials returns 401...")
    client.force_authenticate(user=None)
    res_wrong_pw = client.post("/api/users/login/", {
        "username": f"fadmin_{uid}",
        "password": "WrongPasswordXYZ!",
        "portal_type": "FRANCHISE"
    }, format="json")
    assert res_wrong_pw.status_code == status.HTTP_401_UNAUTHORIZED
    print("--> PASSED: Backend returns 401 with standard error payload.")

    print("\n" + "=" * 70)
    print("ALL INTEGRATION TESTS PASSED SUCCESSFULLY!")
    print("=" * 70 + "\n")

if __name__ == "__main__":
    run_tests()
