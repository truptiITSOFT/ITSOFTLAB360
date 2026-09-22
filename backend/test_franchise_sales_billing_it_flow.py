import os
import django
import uuid
from decimal import Decimal
from datetime import date, timedelta

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
    ClientLicenseRequest,
    ClientLicenseRequestItem,
    ClientInvoice,
    ClientInvoiceItem,
)

User = get_user_model()


def run_full_franchise_flow_tests():
    print("=" * 80)
    print("RUNNING END-TO-END FRANCHISE WORKFLOW TEST")
    print("Admin -> Sales -> Accountant -> Client Payment -> IT -> Org Admin (0 licenses)")
    print("=" * 80)

    client = APIClient()
    uid = uuid.uuid4().hex[:6]

    # -----------------------------------------------------------------------
    # Step 0: Base Data Setup (ITSOFTLAB Products & Franchise)
    # -----------------------------------------------------------------------
    superadmin = User.objects.create_superuser(
        username=f"super_{uid}",
        email=f"super_{uid}@test.com",
        password="Password123!",
        role="Admin",
    )

    hrms_product = Products.objects.filter(name="HRMSM").first() or Products.objects.create(
        name="HRMSM",
        description="Human Resource Management Suite",
        price=Decimal("1000.00"),
        created_by=superadmin,
    )

    crm_product = Products.objects.filter(name="CRM").first() or Products.objects.create(
        name="CRM",
        description="Customer Relationship Management Portal",
        price=Decimal("800.00"),
        created_by=superadmin,
    )

    unauthorized_product = Products.objects.filter(name="ERP").first() or Products.objects.create(
        name="ERP",
        description="Enterprise Resource Planning",
        price=Decimal("1500.00"),
        created_by=superadmin,
    )

    # Franchise purchased HRMSM and CRM (catalog)
    franchise = Franchise.objects.create(
        name=f"Apex Franchise {uid}",
        address="Sector 62, Noida",
        created_by=superadmin,
    )
    franchise.products.add(hrms_product, crm_product)

    # -----------------------------------------------------------------------
    # Step 1: Franchise Admin creates Franchise Team Users
    # -----------------------------------------------------------------------
    admin_user = User.objects.create_user(
        username=f"fadmin_{uid}",
        email=f"fadmin_{uid}@franchise.com",
        password="Password123!",
        role="",
    )
    FranchiseUserProfile.objects.create(
        user=admin_user,
        franchise=franchise,
        role="FRANCHISE_ADMIN",
    )

    client.force_authenticate(user=admin_user)

    # Create Sales member
    res_sales = client.post(
        "/api/franchise/team/",
        {
            "username": f"fsales_{uid}",
            "password": "Password123!",
            "email": f"sales_{uid}@franchise.com",
            "first_name": "Sam",
            "last_name": "Sales",
            "role": "FRANCHISE_SALES",
        },
        format="json",
    )
    assert res_sales.status_code == status.HTTP_201_CREATED, f"Failed to create sales: {res_sales.data}"
    sales_user = User.objects.get(username=f"fsales_{uid}")
    print(f"[PASS] [STEP 1.1] Franchise Admin created FRANCHISE_SALES ({sales_user.username}).")

    # Create Accountant member
    res_acc = client.post(
        "/api/franchise/team/",
        {
            "username": f"facc_{uid}",
            "password": "Password123!",
            "email": f"acc_{uid}@franchise.com",
            "first_name": "Alex",
            "last_name": "Accountant",
            "role": "FRANCHISE_ACCOUNTANT",
        },
        format="json",
    )
    assert res_acc.status_code == status.HTTP_201_CREATED, f"Failed to create accountant: {res_acc.data}"
    acc_user = User.objects.get(username=f"facc_{uid}")
    print(f"[PASS] [STEP 1.2] Franchise Admin created FRANCHISE_ACCOUNTANT ({acc_user.username}).")

    # Create IT member
    res_it = client.post(
        "/api/franchise/team/",
        {
            "username": f"fit_{uid}",
            "password": "Password123!",
            "email": f"it_{uid}@franchise.com",
            "first_name": "Ian",
            "last_name": "IT",
            "role": "FRANCHISE_IT",
        },
        format="json",
    )
    assert res_it.status_code == status.HTTP_201_CREATED, f"Failed to create IT: {res_it.data}"
    it_user = User.objects.get(username=f"fit_{uid}")
    print(f"[PASS] [STEP 1.3] Franchise Admin created FRANCHISE_IT ({it_user.username}).")

    # -----------------------------------------------------------------------
    # Step 2: Sales Team requests license invoice from Accountant
    # -----------------------------------------------------------------------
    client.force_authenticate(user=sales_user)

    res_req = client.post(
        "/api/franchise/license-requests/",
        {
            "client_name": "Dr. Rajesh Sharma",
            "client_email": f"rajesh_{uid}@apollohospital.com",
            "client_phone": "9876543210",
            "organization_name": f"Apollo Hospital {uid}",
            "billing_address": "Sarita Vihar, Mathura Road",
            "city": "New Delhi",
            "state": "Delhi",
            "pincode": "110076",
            "customer_gstin": "07AAAAA0000A1Z5",
            "notes": "Urgent onboarding for HRMS and CRM",
            "items": [
                {
                    "product": hrms_product.id,
                    "license_count": 10,
                    "duration_months": 12,
                    "quoted_price": "1000.00",
                },
                {
                    "product": crm_product.id,
                    "license_count": 5,
                    "duration_months": 12,
                    "quoted_price": "800.00",
                },
            ],
        },
        format="json",
    )
    assert res_req.status_code == status.HTTP_201_CREATED, f"Failed to create license request: {res_req.data}"
    req_id = res_req.data["id"]
    assert res_req.data["status"] == "pending"
    assert len(res_req.data["items"]) == 2
    print(f"[PASS] [STEP 2] Sales team created ClientLicenseRequest #{req_id} for Apollo Hospital (HRMSM: 10 seats, CRM: 5 seats).")

    # Verify Guard: Sales cannot request unauthorized product
    res_bad = client.post(
        "/api/franchise/license-requests/",
        {
            "client_name": "Test Client",
            "client_email": f"bad_{uid}@test.com",
            "organization_name": "Bad Org",
            "items": [
                {
                    "product": unauthorized_product.id,
                    "license_count": 5,
                }
            ],
        },
        format="json",
    )
    assert res_bad.status_code == status.HTTP_400_BAD_REQUEST, "Should block products not owned by franchise!"
    print("[PASS] [GUARD] Catalog guard verified: Products not purchased by Franchise cannot be requested.")

    # -----------------------------------------------------------------------
    # Step 3: Accountant creates invoice and sends to client's email
    # -----------------------------------------------------------------------
    client.force_authenticate(user=acc_user)

    res_inv = client.post(
        f"/api/franchise/license-requests/{req_id}/generate-invoice/",
        {
            "tax_percentage": "18.00",
            "discount_amount": "0.00",
            "due_days": 15,
            "send_email": True,
            "notes": "Payment terms: net 15 days",
        },
        format="json",
    )
    assert res_inv.status_code == status.HTTP_201_CREATED, f"Generate invoice failed: {res_inv.data}"
    invoice_data = res_inv.data["invoice"]
    invoice_id = invoice_data["id"]
    invoice_num = invoice_data["invoice_number"]

    # HRMS: 10 * 1000 = 10,000; CRM: 5 * 800 = 4,000; Subtotal = 14,000
    # Tax: 18% of 14,000 = 2,520; Total = 16,520
    assert Decimal(str(invoice_data["subtotal"])) == Decimal("14000.00")
    assert Decimal(str(invoice_data["tax_amount"])) == Decimal("2520.00")
    assert Decimal(str(invoice_data["total_amount"])) == Decimal("16520.00")
    assert invoice_data["status"] == "sent"
    assert invoice_data["email_sent"] is True
    print(f"[PASS] [STEP 3] Accountant generated ClientInvoice {invoice_num} (Total: INR {invoice_data['total_amount']}) and sent to client's email.")

    # -----------------------------------------------------------------------
    # Step 4: Client pays invoice -> marked as PAID
    # -----------------------------------------------------------------------
    res_pay = client.post(
        f"/api/franchise/invoices/{invoice_id}/mark-paid/",
        {
            "payment_method": "upi",
            "transaction_id": f"UPI-TXN-{uid}-SUCCESS",
            "amount": "16520.00",
        },
        format="json",
    )
    assert res_pay.status_code == status.HTTP_200_OK, f"Mark paid failed: {res_pay.data}"
    assert res_pay.data["invoice"]["status"] == "paid"
    assert Decimal(str(res_pay.data["invoice"]["balance_due"])) == Decimal("0.00")

    # Confirm that ClientLicenseRequest is now 'paid' (Queue for IT)
    license_req = ClientLicenseRequest.objects.get(id=req_id)
    assert license_req.status == "paid"
    print(f"[PASS] [STEP 4] Client payment verified! Invoice {invoice_num} is PAID. License Request #{req_id} is queued for IT fulfillment.")

    # -----------------------------------------------------------------------
    # Step 5: IT Role provisions Organization and assigns Franchise Products
    # -----------------------------------------------------------------------
    client.force_authenticate(user=it_user)

    # IT sees the request in their queue
    res_queue = client.get("/api/franchise/license-requests/?status=paid")
    assert res_queue.status_code == status.HTTP_200_OK
    queue_items = res_queue.data if isinstance(res_queue.data, list) else res_queue.data.get("results", [])
    assert any(r["id"] == req_id for r in queue_items)


    # IT fulfills request: creates Org, creates Subscriptions, creates Org Admin
    res_fulfill = client.post(
        f"/api/franchise/license-requests/{req_id}/fulfill/",
        {
            "org_admin_username": f"apollo_admin_{uid}",
            "org_admin_email": f"admin_{uid}@apollohospital.com",
            "org_admin_password": "OrgAdminPassword123!",
            "org_admin_first_name": "Rajesh",
            "org_admin_last_name": "Sharma",
        },
        format="json",
    )
    assert res_fulfill.status_code == status.HTTP_200_OK, f"Fulfill failed: {res_fulfill.data}"
    result = res_fulfill.data["result"]
    org_id = result["organization_id"]
    print(f"[PASS] [STEP 5] IT fulfilled request #{req_id}: Organization '{result['organization_name']}' created (ID: {org_id}).")

    # -----------------------------------------------------------------------
    # Step 6: Verify ZERO License Consumption for Organization Admin
    # -----------------------------------------------------------------------
    org_admin_user = User.objects.get(username=f"apollo_admin_{uid}")
    org_membership = OrganizationUser.objects.get(user=org_admin_user, organization_id=org_id)
    assert org_membership.role == "ORG_ADMIN"

    # Verify NO UserProductAccess was created for the admin
    admin_access_count = UserProductAccess.objects.filter(organization_user=org_membership).count()
    assert admin_access_count == 0, f"Org Admin should have 0 license allocations, found {admin_access_count}"

    # Verify subscriptions state
    hrms_sub = OrganizationProduct.objects.get(organization_id=org_id, product=hrms_product)
    crm_sub = OrganizationProduct.objects.get(organization_id=org_id, product=crm_product)

    assert hrms_sub.license_count == 10
    assert hrms_sub.used_licenses == 0
    assert hrms_sub.available_licenses == 10

    assert crm_sub.license_count == 5
    assert crm_sub.used_licenses == 0
    assert crm_sub.available_licenses == 5

    print(f"[PASS] [STEP 6] ZERO LICENSE CONSUMPTION VERIFIED!")
    print(f"       HRMSM: {hrms_sub.used_licenses}/{hrms_sub.license_count} used ({hrms_sub.available_licenses} available).")
    print(f"       CRM:   {crm_sub.used_licenses}/{crm_sub.license_count} used ({crm_sub.available_licenses} available).")

    # -----------------------------------------------------------------------
    # Step 7: Organization Admin views purchased product subscriptions
    # -----------------------------------------------------------------------
    client.force_authenticate(user=org_admin_user)
    res_org_subs = client.get("/api/franchise/subscriptions/")
    assert res_org_subs.status_code == status.HTTP_200_OK
    subs_list = res_org_subs.data if isinstance(res_org_subs.data, list) else res_org_subs.data.get("results", [])
    assert len(subs_list) == 2
    product_names = [s["product_name"] for s in subs_list]
    assert "HRMSM" in product_names
    assert "CRM" in product_names
    print(f"[PASS] [STEP 7] Org Admin logged in and successfully viewed purchased subscriptions: {product_names}")


    # -----------------------------------------------------------------------
    # Step 8: When Org Admin allocates an employee, license count increments
    # -----------------------------------------------------------------------
    # Provision employee
    doctor_emp = OrganizationUser.objects.create(
        organization_id=org_id,
        user=User.objects.create_user(username=f"dr_karan_{uid}", email=f"karan_{uid}@apollo.com"),
        role="ORG_EMPLOYEE",
        designation="Cardiologist",
    )

    client.force_authenticate(user=org_admin_user)
    res_assign = client.post(
        f"/api/franchise/organization-users/{doctor_emp.id}/assign-product/",
        {
            "subscription_id": hrms_sub.id,
            "external_user_id": f"hrms_ext_{uid}",
        },
        format="json",
    )
    assert res_assign.status_code == status.HTTP_201_CREATED
    hrms_sub.refresh_from_db()
    assert hrms_sub.used_licenses == 1
    assert hrms_sub.available_licenses == 9
    print(f"[PASS] [STEP 8] Org Admin assigned 1 employee to HRMSM: used_licenses is now 1, available is 9.")

    print("=" * 80)
    print("ALL TESTS IN FULL FRANCHISE FLOW PASSED PERFECTLY!")
    print("=" * 80)


if __name__ == "__main__":
    run_full_franchise_flow_tests()
