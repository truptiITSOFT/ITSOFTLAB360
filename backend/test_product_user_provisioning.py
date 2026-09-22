import os
import uuid
import django
from decimal import Decimal

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

from users.models import Products, Organization, Franchise
from franchise.models import OrganizationProduct, OrganizationUser, UserProductAccess
from franchise.services.product_adapters import ProductAdapterRegistry

User = get_user_model()


def run_tests():
    print("=" * 80)
    print("STARTING PRODUCT USER PROVISIONING & HEALTH API AUTOMATED TESTS")
    print("=" * 80)

    client = APIClient()
    uid = uuid.uuid4().hex[:6]

    # -------------------------------------------------------------------------
    # TEST 1: Backend Health Check API (HEAD and GET methods)
    # -------------------------------------------------------------------------
    print("\n[TEST 1] Testing Backend Health Check API...")

    # Root /health/ (HEAD)
    head_resp = client.head("/health/")
    assert head_resp.status_code == status.HTTP_200_OK, f"HEAD /health/ failed: {head_resp.status_code}"
    assert head_resp.get("X-Health-Status") == "OK", "Missing X-Health-Status header in HEAD /health/"
    print(f"  [PASS] HEAD /health/ returned {head_resp.status_code} with X-Health-Status: OK")

    # API /api/health/ (HEAD)
    api_head_resp = client.head("/api/health/")
    assert api_head_resp.status_code == status.HTTP_200_OK, f"HEAD /api/health/ failed: {api_head_resp.status_code}"
    assert api_head_resp.get("X-Health-Status") == "OK", "Missing X-Health-Status in HEAD /api/health/"
    print(f"  [PASS] HEAD /api/health/ returned {api_head_resp.status_code} with X-Health-Status: OK")

    # Franchise /api/franchise/health/ (HEAD)
    fr_head_resp = client.head("/api/franchise/health/")
    assert fr_head_resp.status_code == status.HTTP_200_OK, f"HEAD /api/franchise/health/ failed: {fr_head_resp.status_code}"
    print(f"  [PASS] HEAD /api/franchise/health/ returned {fr_head_resp.status_code}")

    # GET /api/health/
    get_resp = client.get("/api/health/")
    assert get_resp.status_code == status.HTTP_200_OK, f"GET /api/health/ failed: {get_resp.status_code}"
    assert get_resp.data.get("status") == "healthy", "Unexpected status in GET /api/health/"
    print(f"  [PASS] GET /api/health/ returned 200 OK: {get_resp.data}")

    # -------------------------------------------------------------------------
    # TEST 2: ProductAdapterRegistry Verification
    # -------------------------------------------------------------------------
    print("\n[TEST 2] Verifying ProductAdapterRegistry resolution...")
    sc_adapter = ProductAdapterRegistry.get_adapter("supply-chain")
    assert sc_adapter.__class__.__name__ == "SupplyChainAdapter", f"Expected SupplyChainAdapter, got {sc_adapter}"

    hrms_adapter = ProductAdapterRegistry.get_adapter("hrmsm")
    assert hrms_adapter.__class__.__name__ == "HRMSMAdapter", f"Expected HRMSMAdapter, got {hrms_adapter}"

    generic_adapter = ProductAdapterRegistry.get_adapter("erp")
    assert generic_adapter.__class__.__name__ == "GenericProductAdapter", f"Expected GenericProductAdapter for ERP, got {generic_adapter}"
    print(f"  [PASS] Adapters resolved: supply-chain -> {sc_adapter.__class__.__name__}, hrmsm -> {hrms_adapter.__class__.__name__}, erp -> {generic_adapter.__class__.__name__}")

    # -------------------------------------------------------------------------
    # TEST 3: Supply Chain Create User API (POST /api/franchise/supplychain/create-user/)
    # -------------------------------------------------------------------------
    print("\n[TEST 3] Testing Supply Chain User Creation Endpoint...")

    sc_payload = {
        "name": f"Jane Doe {uid}",
        "email": f"jane.doe.{uid}@acmelogistics.com",
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "assignedRole": "ADMIN",
        "companyName": f"Acme Logistics Ltd {uid}",
        "companyEmail": f"contact.{uid}@acmelogistics.com",
        "phone": "+1234567890",
        "companyPhone": "+1234567890",
        "licenseAllocation": 25,
        "subscriptionPlan": "BASIC",
        "status": "ACTIVE",
    }

    sc_resp = client.post("/api/franchise/supplychain/create-user/", sc_payload, format="json")
    assert sc_resp.status_code == status.HTTP_201_CREATED, f"Supply Chain creation failed: {sc_resp.data}"
    assert sc_resp.data.get("success") is True, "Expected success=True"
    print(f"  [PASS] POST /api/franchise/supplychain/create-user/ returned 201 CREATED.")
    print(f"         Message: {sc_resp.data['message']}")

    # Verify Database Synchronization
    created_user = User.objects.get(email=sc_payload["email"])
    assert created_user.first_name == "Jane", f"Expected first_name 'Jane', got '{created_user.first_name}'"
    assert created_user.last_name == f"Doe {uid}", f"Expected last_name 'Doe {uid}', got '{created_user.last_name}'"
    assert created_user.check_password("Password123!"), "Password was not hashed properly"

    created_org = Organization.objects.get(name=sc_payload["companyName"])
    assert created_org.email == sc_payload["companyEmail"]

    sc_product = Products.objects.filter(code="supply-chain").first() or Products.objects.filter(name__icontains="Supply Chain").first()
    assert sc_product is not None, "Supply Chain product not found in DB"

    sc_sub = OrganizationProduct.objects.get(organization=created_org, product=sc_product)
    assert sc_sub.license_count == 25, f"Expected 25 licenses, got {sc_sub.license_count}"
    assert sc_sub.is_active is True

    org_user = OrganizationUser.objects.get(organization=created_org, user=created_user)
    assert org_user.role == "ORG_ADMIN"

    access = UserProductAccess.objects.get(organization_user=org_user, subscription=sc_sub)
    assert access.external_user_id is not None
    assert access.sync_status == UserProductAccess.SyncStatus.SYNCED
    print(f"  [PASS] DB Verified: User '{created_user.username}', Org '{created_org.name}', Sub (25 seats), External ID '{access.external_user_id}'.")

    # -------------------------------------------------------------------------
    # TEST 4: HRMSM Create User API (POST /api/franchise/hrmsm/create-user/)
    # -------------------------------------------------------------------------
    print("\n[TEST 4] Testing HRMSM User Creation Endpoint...")

    hrms_payload = {
        "email": f"nikhil_{uid}@example.com",
        "password": "Password123!",
        "first_name": "Nikhil",
        "last_name": "Basrani",
        "username": f"nikhil_{uid}",
        "role": "Admin",
        "office": str(created_org.id),
    }

    hrms_resp = client.post("/api/franchise/hrmsm/create-user/", hrms_payload, format="json")
    assert hrms_resp.status_code == status.HTTP_201_CREATED, f"HRMSM creation failed: {hrms_resp.data}"
    assert hrms_resp.data.get("success") is True, "Expected success=True"
    print(f"  [PASS] POST /api/franchise/hrmsm/create-user/ returned 201 CREATED.")
    print(f"         Message: {hrms_resp.data['message']}")

    nikhil_user = User.objects.get(username=hrms_payload["username"])
    assert nikhil_user.email == hrms_payload["email"]
    assert nikhil_user.first_name == "Nikhil"
    assert nikhil_user.last_name == "Basrani"

    hrms_product = Products.objects.filter(code="hrms").first() or Products.objects.filter(name__icontains="HRMS").first()
    hrms_sub = OrganizationProduct.objects.get(organization=created_org, product=hrms_product)
    nikhil_org_user = OrganizationUser.objects.get(organization=created_org, user=nikhil_user)
    hrms_access = UserProductAccess.objects.get(organization_user=nikhil_org_user, subscription=hrms_sub)
    assert hrms_access.external_user_id is not None
    print(f"  [PASS] DB Verified: HRMSM User '{nikhil_user.username}', linked to Org '{created_org.name}', External ID '{hrms_access.external_user_id}'.")

    # -------------------------------------------------------------------------
    # TEST 5: Unified Product User API (POST /api/franchise/products/create-user/)
    # -------------------------------------------------------------------------
    print("\n[TEST 5] Testing Unified Multi-Product User Creation Endpoint...")

    unified_payload = {
        "product": "supply-chain",
        "name": f"Alex Morgan {uid}",
        "email": f"alex.morgan.{uid}@acmelogistics.com",
        "password": "Password123!",
        "companyName": sc_payload["companyName"],
        "assignedRole": "ADMIN",
        "licenseAllocation": 30,
    }

    unified_resp = client.post("/api/franchise/products/create-user/", unified_payload, format="json")
    assert unified_resp.status_code == status.HTTP_201_CREATED, f"Unified provision failed: {unified_resp.data}"
    print(f"  [PASS] Unified provisioning succeeded: {unified_resp.data['message']}")

    print("\n" + "=" * 80)
    print("ALL TESTS COMPLETED SUCCESSFULLY!")
    print("=" * 80)


if __name__ == "__main__":
    run_tests()
