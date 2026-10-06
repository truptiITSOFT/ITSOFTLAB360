import os
import django
import uuid
from decimal import Decimal

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from users.models import Products, Franchise, FranchiseRequest, Invoice

User = get_user_model()

def test_internal_team_backend_flow():
    print("=" * 80)
    print("VERIFYING INTERNAL TEAM PORTAL BACKEND FLOW")
    print("Admin -> Sales -> Accountant -> IT -> Franchise Creation & Dashboard")
    print("=" * 80)

    client = APIClient()
    uid = uuid.uuid4().hex[:6]

    # Step 1: Create Admin
    admin_user = User.objects.create_superuser(
        username=f"admin_{uid}",
        email=f"admin_{uid}@itsoftlab360.com",
        password="Password123!",
        role="Admin"
    )

    # Admin creates products
    prod1, _ = Products.objects.get_or_create(
        name=f"HRMSM_{uid}",
        defaults={"description": "HRMS Suite", "price": Decimal("10000.00"), "created_by": admin_user}
    )
    prod2, _ = Products.objects.get_or_create(
        name=f"CRM_{uid}",
        defaults={"description": "CRM Suite", "price": Decimal("8000.00"), "created_by": admin_user}
    )

    # Step 2: Admin creates Sales, Accountant, IT users via API
    client.force_authenticate(user=admin_user)

    # 2.1 Create Sales
    res_sales = client.post("/api/users/users/", {
        "username": f"sales_{uid}",
        "password": "Password123!",
        "email": f"sales_{uid}@itsoftlab360.com",
        "first_name": "Suresh",
        "last_name": "Sales",
        "role": "Sales"
    }, format="json")
    assert res_sales.status_code == status.HTTP_201_CREATED, f"Failed to create sales: {res_sales.data}"
    sales_user = User.objects.get(username=f"sales_{uid}")
    print(f"[PASS] [STEP 1] Admin created Sales user: {sales_user.username}")

    # 2.2 Create Accountant
    res_acc = client.post("/api/users/users/", {
        "username": f"acc_{uid}",
        "password": "Password123!",
        "email": f"acc_{uid}@itsoftlab360.com",
        "first_name": "Anita",
        "last_name": "Accountant",
        "role": "Accountant"
    }, format="json")
    assert res_acc.status_code == status.HTTP_201_CREATED, f"Failed to create accountant: {res_acc.data}"
    acc_user = User.objects.get(username=f"acc_{uid}")
    print(f"[PASS] [STEP 2] Admin created Accountant user: {acc_user.username}")

    # 2.3 Create IT
    res_it = client.post("/api/users/users/", {
        "username": f"it_{uid}",
        "password": "Password123!",
        "email": f"it_{uid}@itsoftlab360.com",
        "first_name": "Irfan",
        "last_name": "IT",
        "role": "IT"
    }, format="json")
    assert res_it.status_code == status.HTTP_201_CREATED, f"Failed to create IT: {res_it.data}"
    it_user = User.objects.get(username=f"it_{uid}")
    print(f"[PASS] [STEP 3] Admin created IT user: {it_user.username}")

    # Step 3: Sales Login via /api/users/login/
    client.force_authenticate(user=None)
    res_login = client.post("/api/users/login/", {
        "username": f"sales_{uid}",
        "password": "Password123!",
        "portal_type": "INTERNAL"
    }, format="json")
    assert res_login.status_code == status.HTTP_200_OK, f"Login failed: {res_login.data}"
    assert res_login.data["user"]["role"] == "Sales"
    assert res_login.data["user"]["portal_type"] == "INTERNAL"
    token = res_login.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    print(f"[PASS] [STEP 4] Sales user logged in successfully with JWT token.")

    # Step 4: Sales creates Franchise Request
    res_req = client.post("/api/users/franchise-requests/", {
        "proposed_franchise_name": f"Indore Tech Hub {uid}",
        "proposed_address": "Vijay Nagar, Indore",
        "client_name": "Manish Sharma",
        "client_email": f"manish_{uid}@indoretech.com",
        "client_phone": "9826012345",
        "billing_address": "Office 101, Crystal IT Park",
        "billing_city": "Indore",
        "billing_state": "Madhya Pradesh",
        "billing_pincode": "452001",
        "quoted_amount": "180000.00",
        "notes": "Full suite franchise license",
        "product_ids": [prod1.id, prod2.id]
    }, format="json")
    assert res_req.status_code == status.HTTP_201_CREATED, f"Sales failed to create request: {res_req.data}"
    req_id = res_req.data["id"]
    print(f"[PASS] [STEP 5] Sales raised FranchiseRequest #{req_id} (Status: {res_req.data.get('status', 'pending')}).")

    # Step 5: Accountant Login and Review
    client.credentials()
    res_acc_login = client.post("/api/users/login/", {
        "username": f"acc_{uid}",
        "password": "Password123!",
        "portal_type": "INTERNAL"
    }, format="json")
    acc_token = res_acc_login.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {acc_token}")

    # Accountant Approves Request
    res_app = client.post(f"/api/users/franchise-requests/{req_id}/approve/", {}, format="json")
    assert res_app.status_code == status.HTTP_200_OK, f"Approve failed: {res_app.data}"
    print(f"[PASS] [STEP 6] Accountant approved request #{req_id}.")

    # Accountant Generates Invoice
    res_inv = client.post(f"/api/users/franchise-requests/{req_id}/create-invoice/", {
        "tax_percentage": "18.00",
        "discount_amount": "0.00",
        "due_days": 15,
        "notes": "Onboarding fee for Indore region"
    }, format="json")
    assert res_inv.status_code in [status.HTTP_200_OK, status.HTTP_201_CREATED], f"Create invoice failed: {res_inv.data}"
    invoice_id = res_inv.data.get("invoice_id")
    print(f"[PASS] [STEP 7] Accountant generated invoice #{invoice_id} for request #{req_id}.")

    inv_obj = Invoice.objects.get(id=invoice_id)
    res_paid = client.post(f"/api/users/invoices/{invoice_id}/mark-paid/", {
        "amount": str(inv_obj.balance_due),
        "payment_method": "Bank Transfer",
        "transaction_id": f"TXN-NEFT-{uid}"
    }, format="json")
    assert res_paid.status_code == status.HTTP_200_OK, f"Mark paid failed: {res_paid.data}"
    print(f"[PASS] [STEP 8] Invoice #{invoice_id} marked as PAID. Request #{req_id} is now PAID.")

    # Step 6: IT Login and Complete Franchise Creation
    client.credentials()
    res_it_login = client.post("/api/users/login/", {
        "username": f"it_{uid}",
        "password": "Password123!",
        "portal_type": "INTERNAL"
    }, format="json")
    it_token = res_it_login.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {it_token}")

    res_comp = client.post(f"/api/users/franchise-requests/{req_id}/complete/", {}, format="json")
    assert res_comp.status_code in [status.HTTP_200_OK, status.HTTP_201_CREATED], f"Complete failed: {res_comp.data}"
    franchise_id = res_comp.data["franchise_id"]
    franchise = Franchise.objects.get(id=franchise_id)
    assert franchise.is_active is True
    assert franchise.products.count() == 2
    print(f"[PASS] [STEP 9] IT completed request #{req_id}: Franchise '{franchise.name}' created with 2 products!")

    # Step 7: IT deactivates and activates Franchise
    res_deact = client.post(f"/api/users/franchises/{franchise_id}/deactivate/", {}, format="json")
    assert res_deact.status_code == status.HTTP_200_OK
    franchise.refresh_from_db()
    assert franchise.is_active is False
    print(f"[PASS] [STEP 10] IT deactivated franchise #{franchise_id}.")

    res_act = client.post(f"/api/users/franchises/{franchise_id}/activate/", {}, format="json")
    assert res_act.status_code == status.HTTP_200_OK
    franchise.refresh_from_db()
    assert franchise.is_active is True
    print(f"[PASS] [STEP 11] IT reactivated franchise #{franchise_id}.")

    # Step 8: IT views SuperAdmin Dashboard
    res_dash = client.get("/api/users/dashboard/")
    assert res_dash.status_code == status.HTTP_200_OK
    assert res_dash.data["franchises"]["active"] >= 1
    print(f"[PASS] [STEP 12] SuperAdmin Dashboard returned verified metrics: {res_dash.data['franchises']}")

    print("=" * 80)
    print("ALL INTERNAL TEAM PORTAL BACKEND FLOW TESTS PASSED PERFECTLY!")
    print("=" * 80)

if __name__ == "__main__":
    test_internal_team_backend_flow()
