import os
import django
from decimal import Decimal
from django.utils import timezone

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

from users.models import Franchise, Products, FranchiseUserProfile, FranchiseProductAllocation, Organization
from franchise.models import (
    OrganizationProduct,
    ClientLicenseRequest,
    ClientLicenseRequestItem,
    ClientInvoice,
)
from franchise.serializers import (
    OrganizationProductSerializer,
    ClientLicenseRequestSerializer,
    GenerateClientInvoiceFromRequestSerializer,
)

User = get_user_model()


def run_tests():
    print("\n=======================================================")
    print("RUNNING FRANCHISE PRODUCT & PRICING RULES TEST SUITE")
    print("=======================================================")

    # Setup unique test identifiers
    ts = int(timezone.now().timestamp())
    
    # 1. Setup Internal Admin
    internal_admin, _ = User.objects.get_or_create(
        username=f"it_admin_{ts}",
        defaults={"email": f"it_{ts}@example.com", "role": "IT"}
    )
    internal_admin.set_password("AdminPass123!")
    internal_admin.save()

    # 2. Setup Products
    prod_chai = Products.objects.create(
        name=f"Special Chai ERP {ts}",
        description="Core Tealogy Billing Suite",
        price=Decimal("1200.00"),
        created_by=internal_admin
    )
    prod_coffee = Products.objects.create(
        name=f"Coffee CRM {ts}",
        description="Coffee Distribution Suite",
        price=Decimal("800.00"),
        created_by=internal_admin
    )
    unallotted_prod = Products.objects.create(
        name=f"Unallotted Suite {ts}",
        description="Internal Only Suite",
        price=Decimal("5000.00"),
        created_by=internal_admin
    )

    # 3. Setup Franchise and Allocation
    franchise = Franchise.objects.create(
        name=f"Tealogy Franchise {ts}",
        address="101 MG Road, Indore",
        is_active=True,
        created_by=internal_admin
    )
    # Franchise is allotted prod_chai with 50 licenses
    FranchiseProductAllocation.objects.create(
        franchise=franchise,
        product=prod_chai,
        total_licenses=50
    )
    franchise.products.add(prod_chai)

    # 4. Setup Franchise Users
    franchise_admin_user = User.objects.create_user(
        username=f"tealogy_partner_{ts}",
        email=f"partner_{ts}@tealogy.com",
        password="PartnerPass123!",
        role=""
    )
    FranchiseUserProfile.objects.create(
        user=franchise_admin_user,
        franchise=franchise,
        role="FRANCHISE_ADMIN"
    )

    franchise_sales_user = User.objects.create_user(
        username=f"tealogy_sales_{ts}",
        email=f"sales_{ts}@tealogy.com",
        password="SalesPass123!",
        role=""
    )
    FranchiseUserProfile.objects.create(
        user=franchise_sales_user,
        franchise=franchise,
        role="FRANCHISE_SALES"
    )

    client = APIClient()

    # =========================================================================
    # TEST 1: Franchise User CANNOT create a product (403 Forbidden)
    # =========================================================================
    print("\n[TEST 1] Franchise User Attempts to Create Product...")
    client.force_authenticate(user=franchise_admin_user)
    resp = client.post("/api/users/products/", {
        "name": "Unauthorized Product",
        "description": "Created by franchise",
        "price": "99.00"
    })
    print(f"Status: {resp.status_code}, Response: {resp.data}")
    assert resp.status_code == status.HTTP_403_FORBIDDEN, f"Expected 403, got {resp.status_code}"
    assert "Franchise users cannot create, edit, or delete products" in str(resp.data)
    print("--> PASSED: Franchise user cannot create product.")

    # =========================================================================
    # TEST 2: Franchise User CANNOT edit or delete a product (403 Forbidden)
    # =========================================================================
    print("\n[TEST 2] Franchise User Attempts to Edit/Delete Product...")
    resp_update = client.patch(f"/api/users/products/{prod_chai.id}/", {"price": "50.00"})
    assert resp_update.status_code == status.HTTP_403_FORBIDDEN
    assert "Franchise users cannot create, edit, or delete products" in str(resp_update.data)

    resp_delete = client.delete(f"/api/users/products/{prod_chai.id}/")
    assert resp_delete.status_code == status.HTTP_403_FORBIDDEN
    assert "Franchise users cannot create, edit, or delete products" in str(resp_delete.data)
    print("--> PASSED: Franchise user cannot edit or delete products.")

    # =========================================================================
    # TEST 3: Catalog Scoping: Franchise User ONLY sees allotted products
    # =========================================================================
    print("\n[TEST 3] Catalog Scoping for Franchise User...")
    resp_list = client.get("/api/users/products/")
    assert resp_list.status_code == status.HTTP_200_OK
    items_list = resp_list.data if isinstance(resp_list.data, list) else resp_list.data.get("results", [])
    product_names = [p["name"] for p in items_list]
    print(f"Visible products: {product_names}")
    assert prod_chai.name in product_names, "Allotted product should be visible"
    assert unallotted_prod.name not in product_names, "Unallotted product must NOT be visible to franchise"
    print("--> PASSED: Product catalog correctly scoped to franchise.")

    # =========================================================================
    # TEST 4: License Quota Enforcement
    # =========================================================================
    print("\n[TEST 4] License Quota Enforcement...")
    client_org = Organization.objects.create(
        franchise=franchise,
        name=f"Client Cafe 1 {ts}",
        email=f"cafe1_{ts}@test.com"
    )

    # Attempt 1: Allot 60 licenses (Quota is 50) -> should fail
    ser_fail = OrganizationProductSerializer(data={
        "organization": client_org.id,
        "product": prod_chai.id,
        "license_count": 60,
        "subscription_start": timezone.now().date(),
        "subscription_end": timezone.now().date() + timezone.timedelta(days=365)
    })
    is_valid = ser_fail.is_valid()
    print(f"60 licenses validation valid={is_valid}, errors={ser_fail.errors}")
    assert not is_valid, "Allotting 60 licenses when quota is 50 must fail"
    assert "license_count" in ser_fail.errors
    assert "Only 50 licenses remain" in str(ser_fail.errors["license_count"])

    # Attempt 2: Allot product not allotted to franchise -> should fail
    ser_unallotted = OrganizationProductSerializer(data={
        "organization": client_org.id,
        "product": unallotted_prod.id,
        "license_count": 5,
        "subscription_start": timezone.now().date(),
        "subscription_end": timezone.now().date() + timezone.timedelta(days=365)
    })
    assert not ser_unallotted.is_valid(), "Product not in franchise must fail"
    print(f"Unallotted product errors: {ser_unallotted.errors}")

    # Attempt 3: Allot 30 licenses (within quota) -> succeeds
    ser_ok = OrganizationProductSerializer(data={
        "organization": client_org.id,
        "product": prod_chai.id,
        "license_count": 30,
        "subscription_start": timezone.now().date(),
        "subscription_end": timezone.now().date() + timezone.timedelta(days=365),
        "is_active": True
    })
    assert ser_ok.is_valid(), f"30 licenses within 50 quota should succeed: {ser_ok.errors}"
    sub1 = ser_ok.save(assigned_by=franchise_admin_user)
    print(f"Allotted 30 licenses successfully. Sub ID: {sub1.id}")

    # Attempt 4: Allot another 25 licenses (30 + 25 = 55 > 50) -> should fail with available = 20
    client_org2 = Organization.objects.create(
        franchise=franchise,
        name=f"Client Cafe 2 {ts}",
        email=f"cafe2_{ts}@test.com"
    )
    ser_fail2 = OrganizationProductSerializer(data={
        "organization": client_org2.id,
        "product": prod_chai.id,
        "license_count": 25,
        "subscription_start": timezone.now().date(),
        "subscription_end": timezone.now().date() + timezone.timedelta(days=365)
    })
    assert not ser_fail2.is_valid(), "25 licenses when only 20 remain must fail"
    print(f"Remaining quota rejection error: {ser_fail2.errors}")
    assert "Only 20 licenses remain" in str(ser_fail2.errors["license_count"])
    print("--> PASSED: License quota strictly enforced across organizations.")

    # =========================================================================
    # TEST 5: Strict Price Immutability (Tealogy Franchise Rule)
    # =========================================================================
    print("\n[TEST 5] Strict Price Immutability Enforcement...")
    # Franchise tries to quote Chai ERP at ₹500 (Owner price is ₹1200)
    req_ser = ClientLicenseRequestSerializer(
        data={
            "franchise": franchise.id,
            "organization_name": f"Client Org 3 {ts}",
            "client_name": "Cafe Owner",
            "client_email": f"cafe3_{ts}@test.com",
            "client_phone": "9876543210",
            "items": [
                {
                    "product": prod_chai.id,
                    "license_count": 10,
                    "duration_months": 12,
                    "quoted_price": "500.00"  # Attempt to discount/change owner price!
                }
            ]
        },
        context={"request": type("Req", (), {"user": franchise_sales_user})()}
    )
    assert req_ser.is_valid(), f"Validation errors: {req_ser.errors}"
    lic_req = req_ser.save()

    item = lic_req.items.first()
    print(f"Quoted price saved: {item.quoted_price}, Expected owner price: {prod_chai.price}")
    assert item.quoted_price == prod_chai.price, (
        f"Quoted price must be locked to owner price {prod_chai.price}, got {item.quoted_price}"
    )
    assert lic_req.quoted_amount == prod_chai.price * 10, (
        f"Total amount must be calculated from owner price: {prod_chai.price * 10}, got {lic_req.quoted_amount}"
    )

    # Invoice Generation must also enforce owner price
    inv_ser = GenerateClientInvoiceFromRequestSerializer(data={
        "tax_percentage": "18.00",
        "due_days": 15,
        "send_email": False
    })
    assert inv_ser.is_valid()
    invoice = inv_ser.create_invoice(lic_req, franchise_admin_user)
    inv_item = invoice.items.first()
    print(f"Invoice unit_price: {inv_item.unit_price}, total: {inv_item.total_amount}")
    assert inv_item.unit_price == prod_chai.price, "Invoice line unit_price must equal owner price"
    print("--> PASSED: Owner price strictly enforced, franchise cannot alter price.")

    print("\n=======================================================")
    print("ALL FRANCHISE PRODUCT & PRICING RULES PASSED SUCCESSFULLY!")
    print("=======================================================\n")


if __name__ == "__main__":
    run_tests()
