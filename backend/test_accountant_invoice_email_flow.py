import os
import sys
import uuid
from decimal import Decimal

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

import django
django.setup()

from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from users.models import Products, FranchiseRequest, Invoice

User = get_user_model()

def test_accountant_invoice_and_email_full_flow():
    print("=" * 80)
    print("TESTING ACCOUNTANT ACCEPT REQUEST, CREATE INVOICE & SEND EMAIL FLOW")
    print("=" * 80)

    client = APIClient()
    uid = uuid.uuid4().hex[:6]

    # Create Sales and Accountant Users
    sales_user, _ = User.objects.get_or_create(
        username=f"sales_e2e_{uid}",
        defaults={
            "email": f"sales_{uid}@example.com",
            "role": "Sales",
            "first_name": "Salesperson"
        }
    )
    sales_user.set_password("Password123!")
    sales_user.save()

    acc_user, _ = User.objects.get_or_create(
        username=f"acc_e2e_{uid}",
        defaults={
            "email": f"acc_{uid}@example.com",
            "role": "Accountant",
            "first_name": "Accountant"
        }
    )
    acc_user.set_password("Password123!")
    acc_user.save()

    product, _ = Products.objects.get_or_create(
        name=f"Enterprise_Suite_{uid}",
        defaults={"description": "All-in-one ERP Suite", "price": Decimal("25000.00"), "created_by": acc_user}
    )

    # 1. Sales logs in and creates Franchise Request #A
    client.force_authenticate(user=sales_user)
    res_req = client.post("/api/users/franchise-requests/", {
        "proposed_franchise_name": f"CloudTech Solutions {uid}",
        "proposed_address": "Suite 500, Cyber Tower",
        "client_name": "Rohan Verma",
        "client_email": "official.hrmsm@gmail.com",
        "client_phone": "9876543210",
        "billing_address": "Cyber Tower 500",
        "billing_city": "Pune",
        "billing_state": "Maharashtra",
        "billing_pincode": "411001",
        "quoted_amount": "25000.00",
        "notes": "Annual franchise license",
        "product_ids": [product.id]
    }, format="json")
    assert res_req.status_code == status.HTTP_201_CREATED, f"Failed to create request: {res_req.data}"
    req_a_id = res_req.data["id"]
    print(f"[PASS] 1. Sales raised FranchiseRequest #{req_a_id} (Status: {res_req.data['status']})")

    # 2. Accountant logs in
    client.force_authenticate(user=acc_user)

    # 3. Accountant accepts request #A
    res_app = client.post(f"/api/users/franchise-requests/{req_a_id}/approve/", {
        "quoted_amount": "25000.00"
    }, format="json")
    assert res_app.status_code == status.HTTP_200_OK, f"Approve failed: {res_app.data}"
    assert res_app.data["status"] == "approved"
    print(f"[PASS] 2. Accountant accepted FranchiseRequest #{req_a_id} (Status: approved)")

    # 4. Accountant generates invoice for request #A
    res_inv = client.post(f"/api/users/franchise-requests/{req_a_id}/create-invoice/", {
        "tax_percentage": "18.00",
        "discount_amount": "1000.00",
        "due_days": 15,
        "gst_type": "igst",
        "notes": "Net 15 commercial terms",
        "send_email": False
    }, format="json")
    assert res_inv.status_code == status.HTTP_201_CREATED, f"Create invoice failed: {res_inv.data}"
    inv_id = res_inv.data["invoice_id"]
    inv_number = res_inv.data["invoice_number"]
    print(f"[PASS] 3. Accountant generated Invoice #{inv_id} ({inv_number}) for Request #{req_a_id} (Total: INR {res_inv.data['total']})")

    # 5. Accountant dispatches invoice to client email
    res_email = client.post(f"/api/users/franchise-requests/{req_a_id}/send-invoice-email/", {
        "email": "official.hrmsm@gmail.com",
        "notes": "Please find attached your invoice for CloudTech Solutions franchise onboarding."
    }, format="json")
    assert res_email.status_code == status.HTTP_200_OK, f"Send email failed: {res_email.data}"
    print(f"[PASS] 4. Dispatched invoice email to client: {res_email.data['detail']}")

    # 6. Test direct one-step "Accept & Create Invoice with instant email" on Request #B
    client.force_authenticate(user=sales_user)
    res_req_b = client.post("/api/users/franchise-requests/", {
        "proposed_franchise_name": f"NextGen Systems {uid}",
        "proposed_address": "Tech Park 202",
        "client_name": "Pooja Sharma",
        "client_email": "official.hrmsm@gmail.com",
        "client_phone": "9811223344",
        "billing_address": "Tech Park 202",
        "billing_city": "Mumbai",
        "billing_state": "Maharashtra",
        "billing_pincode": "400001",
        "quoted_amount": "50000.00",
        "notes": "High priority request",
        "product_ids": [product.id]
    }, format="json")
    req_b_id = res_req_b.data["id"]
    print(f"[PASS] 5. Sales raised FranchiseRequest #{req_b_id} (Status: pending)")

    # Accountant calls create-invoice directly with send_email=True on pending request
    client.force_authenticate(user=acc_user)
    res_direct_inv = client.post(f"/api/users/franchise-requests/{req_b_id}/create-invoice/", {
        "tax_percentage": "18.00",
        "discount_amount": "0.00",
        "due_days": 30,
        "gst_type": "cgst_sgst",
        "send_email": True,
        "email": "official.hrmsm@gmail.com"
    }, format="json")
    assert res_direct_inv.status_code == status.HTTP_201_CREATED, f"Direct invoice creation failed: {res_direct_inv.data}"
    assert res_direct_inv.data["request_status"] == "approved"
    assert res_direct_inv.data["email_sent"] is True
    print(f"[PASS] 6. Direct one-step Accept + Invoice + Email dispatch succeeded: Invoice #{res_direct_inv.data['invoice_number']}")

    print("=" * 80)
    print("ALL ACCOUNTANT ACCEPT, INVOICE & EMAIL TESTS PASSED FLAWLESSLY!")
    print("=" * 80)

if __name__ == "__main__":
    test_accountant_invoice_and_email_full_flow()
