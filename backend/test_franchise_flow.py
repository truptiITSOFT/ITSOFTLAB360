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
    CrossProjectAttendanceLog,
)

User = get_user_model()


def run_tests():
    print("=" * 70)
    print("STARTING END-TO-END FRANCHISE & LICENSE WORKFLOW TESTS")
    print("=" * 70)

    client = APIClient()

    # 1. Setup Base Data: Products & Franchise
    uid = uuid.uuid4().hex[:6]
    admin_user = User.objects.create_superuser(
        username=f"super_{uid}",
        email=f"super_{uid}@test.com",
        password="Password123!",
        role="Admin",
    )

    hrms_product, _ = Products.objects.get_or_create(
        name="HRMSM",
        defaults={
            "description": "Human Resource Management Suite",
            "price": Decimal("9999.00"),
            "created_by": admin_user,
        },
    )

    crm_product, _ = Products.objects.get_or_create(
        name="CRM",
        defaults={
            "description": "Customer Relationship Management Portal",
            "price": Decimal("7999.00"),
            "created_by": admin_user,
        },
    )

    test_franchise = Franchise.objects.create(
        name=f"Metro Franchise {uid}",
        address="100 Tech Park, Bangalore",
        created_by=admin_user,
    )
    test_franchise.products.add(hrms_product, crm_product)

    # 2. Create Franchise Admin
    franchise_admin_user = User.objects.create_user(
        username=f"fadmin_{uid}",
        email=f"fadmin_{uid}@test.com",
        password="Password123!",
        role="",
    )
    FranchiseUserProfile.objects.create(
        user=franchise_admin_user,
        franchise=test_franchise,
        role="FRANCHISE_ADMIN",
    )

    client.force_authenticate(user=franchise_admin_user)
    print("[PASS] [TEST 1] Franchise Admin authenticated successfully.")

    # 3. Franchise Admin creates Franchise Team Users (Sales, IT, Accountant)
    res = client.post(
        "/api/franchise/team/",
        {
            "username": f"fsales_{uid}",
            "password": "Password123!",
            "email": f"fsales_{uid}@test.com",
            "first_name": "Alice",
            "last_name": "Sales",
            "role": "FRANCHISE_SALES",
        },
        format="json",
    )
    assert res.status_code == status.HTTP_201_CREATED, f"Failed to create sales member: {res.data}"
    sales_user = User.objects.get(username=f"fsales_{uid}")
    print(f"[PASS] [TEST 2] Franchise Admin created Franchise Sales user ({sales_user.username}).")

    # 4. Franchise Team creates Organization (Selling SaaS)
    client.force_authenticate(user=sales_user)
    res = client.post(
        "/api/franchise/organizations/",
        {
            "name": f"City Hospital {uid}",
            "email": f"info_{uid}@cityhospital.com",
            "phone": "9876543210",
            "city": "Mumbai",
            "state": "Maharashtra",
            "country": "India",
        },
        format="json",
    )
    assert res.status_code == status.HTTP_201_CREATED, f"Failed to create organization: {res.data}"
    org_id = res.data["id"]
    print(f"[PASS] [TEST 3] Franchise Sales created Organization (ID: {org_id}, Name: City Hospital {uid}).")

    # 5. Sell SaaS Subscription with 2 Licenses for HRMSM
    res = client.post(
        "/api/franchise/subscriptions/",
        {
            "organization": org_id,
            "product": hrms_product.id,
            "license_count": 2,
            "subscription_start": str(date.today()),
            "subscription_end": str(date.today() + timedelta(days=365)),
            "status": "active",
            "notes": "Annual package with 2 seats",
        },
        format="json",
    )
    assert res.status_code == status.HTTP_201_CREATED, f"Failed to create subscription: {res.data}"
    subscription_id = res.data["id"]
    license_key = res.data["license_key"]
    assert res.data["license_count"] == 2
    assert res.data["available_licenses"] == 2
    assert res.data["used_licenses"] == 0
    print(f"[PASS] [TEST 4] Created HRMSM subscription with 2 licenses. License Key: {license_key}")

    # Also add a CRM subscription
    res_crm = client.post(
        "/api/franchise/subscriptions/",
        {
            "organization": org_id,
            "product": crm_product.id,
            "license_count": 5,
            "subscription_start": str(date.today()),
            "subscription_end": str(date.today() + timedelta(days=365)),
            "status": "active",
            "notes": "CRM Enterprise 5 seats",
        },
        format="json",
    )
    assert res_crm.status_code == status.HTTP_201_CREATED

    # 6. Organization Admin provisions Users
    res = client.post(
        "/api/franchise/organization-users/",
        {
            "organization": org_id,
            "username": f"doctor_john_{uid}",
            "email": f"john_{uid}@hospital.com",
            "first_name": "John",
            "last_name": "Doe",
            "role": "ORG_EMPLOYEE",
            "designation": "Senior Surgeon",
            "department": "Cardiology",
        },
        format="json",
    )
    assert res.status_code == status.HTTP_201_CREATED, f"Failed to create org user 1: {res.data}"
    user1_id = res.data["id"]

    res = client.post(
        "/api/franchise/organization-users/",
        {
            "organization": org_id,
            "username": f"nurse_mary_{uid}",
            "email": f"mary_{uid}@hospital.com",
            "first_name": "Mary",
            "last_name": "Smith",
            "role": "ORG_EMPLOYEE",
            "designation": "Head Nurse",
            "department": "ICU",
        },
        format="json",
    )
    assert res.status_code == status.HTTP_201_CREATED, f"Failed to create org user 2: {res.data}"
    user2_id = res.data["id"]

    res = client.post(
        "/api/franchise/organization-users/",
        {
            "organization": org_id,
            "username": f"dr_clark_{uid}",
            "email": f"clark_{uid}@hospital.com",
            "first_name": "Clark",
            "last_name": "Kent",
            "role": "ORG_EMPLOYEE",
            "designation": "Radiologist",
            "department": "Radiology",
        },
        format="json",
    )
    assert res.status_code == status.HTTP_201_CREATED, f"Failed to create org user 3: {res.data}"
    user3_id = res.data["id"]
    print(f"[PASS] [TEST 5] Provisioned 3 Organization Users centrally.")

    # 7. Allocate License 1 (John Doe -> HRMSM)
    res = client.post(
        f"/api/franchise/organization-users/{user1_id}/assign-product/",
        {
            "subscription_id": subscription_id,
            "external_user_id": f"hrms_ext_doc_john_{uid}",
        },
        format="json",
    )
    assert res.status_code == status.HTTP_201_CREATED, f"Failed to assign product: {res.data}"
    assert res.data["available_licenses_remaining"] == 1
    print("[PASS] [TEST 6] Allocated 1st license to John Doe (1 license remaining).")

    # 8. Allocate License 2 (Mary Smith -> HRMSM)
    res = client.post(
        f"/api/franchise/organization-users/{user2_id}/assign-product/",
        {
            "subscription_id": subscription_id,
            "external_user_id": f"hrms_ext_nurse_mary_{uid}",
        },
        format="json",
    )
    assert res.status_code == status.HTTP_201_CREATED, f"Failed to assign product: {res.data}"
    assert res.data["available_licenses_remaining"] == 0
    print("[PASS] [TEST 7] Allocated 2nd license to Mary Smith (0 licenses remaining).")

    # 9. ATTEMPT TO ALLOCATE 3RD LICENSE -> MUST FAIL (Limit Exceeded)
    res = client.post(
        f"/api/franchise/organization-users/{user3_id}/assign-product/",
        {
            "subscription_id": subscription_id,
            "external_user_id": f"hrms_ext_dr_clark_{uid}",
        },
        format="json",
    )
    assert res.status_code == status.HTTP_400_BAD_REQUEST, f"Expected 400 Bad Request, got {res.status_code}: {res.data}"
    print(f"[PASS] [TEST 8] License limit enforcement verified: Allocation rejected as expected ({res.data}).")

    # 10. External Portals Subscription Verification API
    client.force_authenticate(user=None)  # Public API check
    res = client.get(f"/api/franchise/subscriptions/verify/?license_key={license_key}&user_identifier=doctor_john_{uid}")
    assert res.status_code == status.HTTP_200_OK, f"Verify failed: {res.data}"
    assert res.data["is_valid"] is True
    assert res.data["license_count"] == 2
    assert res.data["used_licenses"] == 2
    assert res.data["available_licenses"] == 0
    assert res.data["user_access_granted"] is True
    assert res.data["external_user_id"] == f"hrms_ext_doc_john_{uid}"
    print("[PASS] [TEST 9] Subscription Verification API passed for external industry applications.")

    # 11. Record HRMSM Attendance (e.g. from HRMS software reporting in)
    res = client.post(
        "/api/franchise/cross-project/attendance/",
        {
            "user_identifier": f"doctor_john_{uid}",
            "organization_id": org_id,
            "date": str(date.today()),
            "status": "PRESENT",
            "check_in": "09:00:00",
            "check_out": "17:30:00",
            "source_product": "HRMSM",
            "notes": "Biometric check-in verified",
        },
        format="json",
    )
    assert res.status_code in [status.HTTP_200_OK, status.HTTP_201_CREATED], f"Report attendance failed: {res.data}"
    print("[PASS] [TEST 10] Attendance record saved from HRMSM.")

    # 12. Cross-Project GET API (CRM queries John Doe's HRMSM attendance status)
    res = client.get(f"/api/franchise/cross-project/attendance/?user_identifier=doctor_john_{uid}&product=HRMSM")
    assert res.status_code == status.HTTP_200_OK, f"Cross-project GET failed: {res.data}"
    assert res.data["current_status"] == "PRESENT"
    assert res.data["check_in"] == "09:00:00"
    assert res.data["source_product"] == "HRMSM"
    print(f"[PASS] [TEST 11] Cross-Project GET API passed! CRM successfully retrieved John Doe's attendance: {res.data['current_status']} ({res.data['check_in']} - {res.data['check_out']}).")

    # 13. Revoke License and Re-assign
    client.force_authenticate(user=franchise_admin_user)
    res = client.post(
        f"/api/franchise/organization-users/{user2_id}/revoke-product/",
        {"subscription_id": subscription_id},
        format="json",
    )
    assert res.status_code == status.HTTP_200_OK, f"Revoke failed: {res.data}"
    assert res.data["available_licenses_now"] == 1
    print("[PASS] [TEST 12] Revoked Mary Smith's license. 1 license freed up.")

    # Now Clark Kent can get the freed up license!
    res = client.post(
        f"/api/franchise/organization-users/{user3_id}/assign-product/",
        {
            "subscription_id": subscription_id,
            "external_user_id": f"hrms_ext_dr_clark_{uid}",
        },
        format="json",
    )
    assert res.status_code == status.HTTP_201_CREATED, f"Re-assign failed: {res.data}"
    assert res.data["available_licenses_remaining"] == 0
    print("[PASS] [TEST 13] Re-assigned freed license to Clark Kent successfully.")

    # 14. Franchise Dashboard API
    res = client.get("/api/franchise/dashboard/")
    assert res.status_code == status.HTTP_200_OK, f"Dashboard failed: {res.data}"
    assert res.data["total_organizations"] >= 1
    assert res.data["total_subscriptions"] >= 2
    assert res.data["total_licenses_allotted"] >= 7
    print(f"[PASS] [TEST 14] Franchise Dashboard API verified: {res.data['total_organizations']} Orgs, {res.data['total_subscriptions']} Subscriptions, {res.data['total_licenses_allotted']} Total Licenses.")

    print("=" * 70)
    print("ALL TESTS PASSED SUCCESSFULLY!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
