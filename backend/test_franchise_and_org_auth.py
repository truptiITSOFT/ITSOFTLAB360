import os
import sys
import django

sys.path.insert(0, r"f:\projects\ITSOFTLAB360\backend")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from django.db import close_old_connections
from users.models import Franchise, FranchiseUserProfile, FranchiseRequest, Products

User = get_user_model()
client = APIClient()

def reconnect():
    close_old_connections()

print("=" * 60)
print("RUNNING AUTH & PROVISIONING VERIFICATION TEST SUITE")
print("=" * 60)

# TEST 1: Franchise Partner Login via /api/franchise/login/ & /api/users/login/
print("\n[TEST 1] Franchise Partner Login (/api/franchise/login/ & /api/users/login/)")
reconnect()
res_fp1 = client.post("/api/franchise/login/", {
    "username": "franchise_partner",
    "password": "FranchisePass123!",
    "portal_type": "FRANCHISE",
})
assert res_fp1.status_code == status.HTTP_200_OK, f"Failed /api/franchise/login/: {res_fp1.data}"
assert res_fp1.data["user"]["portal_type"] == "FRANCHISE"
assert res_fp1.data["user"]["role"] == "FRANCHISE_ADMIN"
assert res_fp1.data["user"]["franchise_name"] is not None
print(f"  PASS: /api/franchise/login/ returned 200 OK. Role: {res_fp1.data['user']['role']}, Franchise: {res_fp1.data['user']['franchise_name']}")

reconnect()
res_fp2 = client.post("/api/users/login/", {
    "username": "franchise_partner",
    "password": "FranchisePass123!",
    "portal_type": "FRANCHISE",
})
assert res_fp2.status_code == status.HTTP_200_OK, f"Failed /api/users/login/: {res_fp2.data}"
print("  PASS: /api/users/login/ returned 200 OK for Franchise Partner")


# TEST 2: Organization Admin Login via /api/org/login/ & /api/users/login/
print("\n[TEST 2] Organization Admin Login (/api/org/login/ & /api/users/login/)")
reconnect()
res_oa1 = client.post("/api/org/login/", {
    "username": "org_admin",
    "password": "OrgPass123!",
    "portal_type": "ORGANIZATION",
})
assert res_oa1.status_code == status.HTTP_200_OK, f"Failed /api/org/login/: {res_oa1.data}"
assert res_oa1.data["user"]["portal_type"] == "ORGANIZATION"
assert res_oa1.data["user"]["role"] == "ORG_ADMIN"
assert res_oa1.data["user"]["organization_name"] == "Apex Healthcare Corp"
print(f"  PASS: /api/org/login/ returned 200 OK. Role: {res_oa1.data['user']['role']}, Org: {res_oa1.data['user']['organization_name']}")

reconnect()
res_oa2 = client.post("/api/users/login/", {
    "username": "org_admin",
    "password": "OrgPass123!",
    "portal_type": "ORGANIZATION",
})
assert res_oa2.status_code == status.HTTP_200_OK, f"Failed /api/users/login/: {res_oa2.data}"
print("  PASS: /api/users/login/ returned 200 OK for Org Admin")


# TEST 3: SaaS Software User Login via /api/login/ & /api/users/login/
print("\n[TEST 3] SaaS Software User Login (/api/login/ & /api/users/login/)")
reconnect()
res_saas1 = client.post("/api/login/", {
    "username": "demo_employee",
    "password": "EmployeePass123!",
    "portal_type": "SAAS",
})
assert res_saas1.status_code == status.HTTP_200_OK, f"Failed /api/login/: {res_saas1.data}"
assert res_saas1.data["user"]["portal_type"] == "SAAS"
assert res_saas1.data["user"]["role"] == "ORG_EMPLOYEE"
assert len(res_saas1.data["user"]["active_products"]) > 0
print(f"  PASS: /api/login/ returned 200 OK. Role: {res_saas1.data['user']['role']}, Active Products: {len(res_saas1.data['user']['active_products'])}")

reconnect()
res_saas2 = client.post("/api/users/login/", {
    "username": "demo_employee",
    "password": "EmployeePass123!",
    "portal_type": "SAAS",
})
assert res_saas2.status_code == status.HTTP_200_OK, f"Failed /api/users/login/: {res_saas2.data}"
print("  PASS: /api/users/login/ returned 200 OK for SaaS User")


# TEST 4: Internal Accountant Login & Portal Mismatch Guard
print("\n[TEST 4] Internal Accountant Login & Portal Mismatch Guard")
reconnect()
res_acc = client.post("/api/users/login/", {
    "username": "chetan.joshi",
    "password": "chetan.jhoshi",
    "portal_type": "INTERNAL",
})
assert res_acc.status_code == status.HTTP_200_OK, f"Failed chetan.joshi login: {res_acc.data}"
assert res_acc.data["user"]["role"] == "Accountant"
assert res_acc.data["user"]["portal_type"] == "INTERNAL"
print("  PASS: Internal Accountant logged in with role Accountant")

reconnect()
acc_regular = User.objects.filter(role="Accountant", is_superuser=False).first()
if acc_regular:
    acc_regular.set_password("Pass123!")
    acc_regular.save()
    reconnect()
    res_guard = client.post("/api/franchise/login/", {
        "username": acc_regular.username,
        "password": "Pass123!",
        "portal_type": "FRANCHISE",
    })
    assert res_guard.status_code == status.HTTP_403_FORBIDDEN
    assert "redirect_url" in res_guard.data
    assert res_guard.data["redirect_url"] == "/admin/login"
    print(f"  PASS: Regular accountant rejected on FRANCHISE portal with 403 and redirect_url: {res_guard.data['redirect_url']}")


# TEST 5: Complete Franchise Request with Admin User Provisioning
print("\n[TEST 5] Franchise Request Completion IT Provisioning")
reconnect()
it_user = User.objects.filter(role="IT").first()
if not it_user:
    it_user = User.objects.create_user(username="it_test_user", password="Password123!", role="IT")
else:
    it_user.set_password("Password123!")
    it_user.save()

reconnect()
import uuid
suffix = uuid.uuid4().hex[:6]
freq = FranchiseRequest.objects.create(
    proposed_franchise_name=f"E2E Franchise {suffix}",
    proposed_address="123 Tech Park",
    client_name="Vikas Sharma",
    client_email=f"vikas_{suffix}@test.com",
    client_phone="9876543210",
    status=FranchiseRequest.Status.PAID,
    requested_by=it_user,
)
reconnect()
p = Products.objects.first()
if p:
    freq.requested_products.create(product=p)

client.force_authenticate(user=it_user)
new_fadmin_username = f"fadmin_e2e_{suffix}"
new_fadmin_password = "SecurePass123!"

res_comp = client.post(f"/api/users/franchise-requests/{freq.id}/complete/", {
    "username": new_fadmin_username,
    "password": new_fadmin_password,
    "role": "FRANCHISE_ADMIN",
})
assert res_comp.status_code == status.HTTP_201_CREATED, f"Failed complete: {res_comp.data}"
assert "admin_credentials" in res_comp.data
assert res_comp.data["admin_credentials"]["username"] == new_fadmin_username
print(f"  PASS: Franchise completed and Franchise Admin user '{new_fadmin_username}' provisioned.")

# Verify newly provisioned user can log in immediately
client.force_authenticate(user=None)
res_new_login = client.post("/api/franchise/login/", {
    "username": new_fadmin_username,
    "password": new_fadmin_password,
    "portal_type": "FRANCHISE",
})
assert res_new_login.status_code == status.HTTP_200_OK, f"Failed login for newly provisioned user: {res_new_login.data}"
assert res_new_login.data["user"]["role"] == "FRANCHISE_ADMIN"
print(f"  PASS: Newly provisioned user '{new_fadmin_username}' successfully logged in to Franchise Portal!")

print("\n" + "=" * 60)
print("ALL AUTHENTICATION & PROVISIONING TESTS PASSED!")
print("=" * 60)
