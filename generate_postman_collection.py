import json
import os

def build_postman_collection():
    collection = {
        "info": {
            "_postman_id": "itsoftlab360-full-suite-collection-v1",
            "name": "ITSOFTLAB360 - Complete API Testing Collection",
            "description": "Comprehensive Postman collection for testing every endpoint of the ITSOFTLAB360 ecosystem.\n\nIncludes:\n- Authentication & Portal Routing Guard\n- SuperAdmin & Franchise Dashboards\n- SaaS Products Management\n- Internal Users (IT, Admin, Sales, Accountant)\n- Franchise Onboarding Workflow (Sales -> Accountant -> IT Provisioning)\n- Active Franchises & Profiles Management\n- Franchise Team Management (Franchise Admin, Sales, IT, Accountant)\n- Client Sales & Onboarding (ClientLicenseRequest -> ClientInvoice -> IT Fulfill)\n- Client Invoices & Payment Recording\n- Client Organizations & SaaS Subscriptions (HRMSM, CRM, LMS, etc.)\n- Organization Users, Remote Provisioning, Multi-Product Linking & SSO Launch Tokens\n- External Software License Verification API",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        "variable": [
            {"key": "baseUrl", "value": "http://127.0.0.1:8000", "type": "string"},
            {"key": "token", "value": "", "type": "string"},
            {"key": "refreshToken", "value": "", "type": "string"},
            {"key": "productId", "value": "1", "type": "string"},
            {"key": "userId", "value": "1", "type": "string"},
            {"key": "franchiseRequestId", "value": "1", "type": "string"},
            {"key": "franchiseId", "value": "1", "type": "string"},
            {"key": "invoiceId", "value": "1", "type": "string"},
            {"key": "franchiseUserId", "value": "1", "type": "string"},
            {"key": "teamMemberId", "value": "1", "type": "string"},
            {"key": "organizationId", "value": "1", "type": "string"},
            {"key": "subscriptionId", "value": "1", "type": "string"},
            {"key": "licenseKey", "value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "type": "string"},
            {"key": "orgUserId", "value": "1", "type": "string"},
            {"key": "clientRequestId", "value": "1", "type": "string"},
            {"key": "clientInvoiceId", "value": "1", "type": "string"}
        ],
        "item": []
    }

    def make_header(auth=True, content_type=True):
        headers = []
        if content_type:
            headers.append({"key": "Content-Type", "value": "application/json", "type": "text"})
        if auth:
            headers.append({"key": "Authorization", "value": "Bearer {{token}}", "type": "text"})
        return headers

    def make_url(path, query=None):
        clean_path = path.strip("/").split("/")
        url_obj = {
            "raw": "{{baseUrl}}/" + "/".join(clean_path) + ("/" if not path.endswith("?") else ""),
            "host": ["{{baseUrl}}"],
            "path": clean_path
        }
        if query:
            url_obj["query"] = query
            query_str = "&".join([f"{q['key']}={q['value']}" for q in query])
            url_obj["raw"] = "{{baseUrl}}/" + "/".join(clean_path) + "/?" + query_str
        return url_obj

    def make_test_script(script_lines):
        return {
            "listen": "test",
            "script": {
                "exec": script_lines,
                "type": "text/javascript"
            }
        }

    def make_response_example(name, status_code, status_text, body_dict, original_request):
        return {
            "name": name,
            "originalRequest": original_request,
            "status": status_text,
            "code": status_code,
            "_postman_previewlanguage": "json",
            "header": [
                {"key": "Content-Type", "value": "application/json"}
            ],
            "cookie": [],
            "body": json.dumps(body_dict, indent=2)
        }

    # =========================================================================
    # FOLDER 1: Authentication & System Dashboards
    # =========================================================================
    folder_auth = {
        "name": "01. Authentication & System Dashboards",
        "description": "Multi-portal authentication (Internal, Franchise, Organization, SaaS) and high-level analytical dashboards.",
        "item": []
    }

    # Login Internal
    req_login_internal = {
        "name": "1.1 Login - Internal SuperAdmin / IT / Sales / Accountant",
        "event": [make_test_script([
            "if (pm.response.code === 200) {",
            "    const res = pm.response.json();",
            "    if (res.access) {",
            "        pm.collectionVariables.set('token', res.access);",
            "        pm.collectionVariables.set('refreshToken', res.refresh);",
            "        console.log('Access token saved for Internal User:', res.user.username);",
            "    }",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=False),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "username": "admin",
                    "password": "AdminPassword123!",
                    "portal_type": "INTERNAL"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/login"),
            "description": "Authenticate an internal staff member (Role: IT, Admin, Sales, or Accountant). Automatically captures Bearer token in {{token}} collection variable."
        },
        "response": []
    }
    req_login_internal["response"].append(make_response_example(
        "200 OK - Internal Staff Authenticated",
        200, "OK",
        {
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "user": {
                "id": 1,
                "username": "admin",
                "email": "admin@itsoftlab360.com",
                "first_name": "ITSOFTLAB",
                "last_name": "Admin",
                "portal_type": "INTERNAL",
                "role": "Admin",
                "franchise_id": None,
                "franchise_name": None,
                "organization_id": None,
                "organization_name": None
            }
        },
        req_login_internal["request"]
    ))
    folder_auth["item"].append(req_login_internal)

    # Login Franchise
    req_login_franchise = {
        "name": "1.2 Login - Franchise Admin / Team Member",
        "event": [make_test_script([
            "if (pm.response.code === 200) {",
            "    const res = pm.response.json();",
            "    if (res.access) {",
            "        pm.collectionVariables.set('token', res.access);",
            "        if (res.user.franchise_id) {",
            "            pm.collectionVariables.set('franchiseId', res.user.franchise_id);",
            "        }",
            "        console.log('Access token saved for Franchise User:', res.user.username);",
            "    }",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=False),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "username": "franchise_admin_mumbai",
                    "password": "Password123!",
                    "portal_type": "FRANCHISE"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/login"),
            "description": "Authenticate a Franchise member (FRANCHISE_ADMIN, FRANCHISE_SALES, FRANCHISE_IT, FRANCHISE_ACCOUNTANT). Saves {{franchiseId}} and {{token}}."
        },
        "response": []
    }
    req_login_franchise["response"].append(make_response_example(
        "200 OK - Franchise Member Authenticated",
        200, "OK",
        {
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "user": {
                "id": 12,
                "username": "franchise_admin_mumbai",
                "email": "admin@mumbaifranchise.com",
                "first_name": "Rohan",
                "last_name": "Gupta",
                "portal_type": "FRANCHISE",
                "role": "FRANCHISE_ADMIN",
                "franchise_id": 4,
                "franchise_name": "Metro Tech Mumbai Franchise",
                "organization_id": None,
                "organization_name": None
            }
        },
        req_login_franchise["request"]
    ))
    folder_auth["item"].append(req_login_franchise)

    # Login Organization Admin
    req_login_org = {
        "name": "1.3 Login - Organization Administrator",
        "event": [make_test_script([
            "if (pm.response.code === 200) {",
            "    const res = pm.response.json();",
            "    if (res.access) {",
            "        pm.collectionVariables.set('token', res.access);",
            "        if (res.user.organization_id) {",
            "            pm.collectionVariables.set('organizationId', res.user.organization_id);",
            "        }",
            "        console.log('Access token saved for Org Admin:', res.user.username);",
            "    }",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=False),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "username": "apollo_hospital_admin",
                    "password": "Password123!",
                    "portal_type": "ORGANIZATION"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/login"),
            "description": "Authenticate an Organization Admin (role ORG_ADMIN). Captures organization_id into {{organizationId}}."
        },
        "response": []
    }
    req_login_org["response"].append(make_response_example(
        "200 OK - Org Admin Authenticated",
        200, "OK",
        {
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "user": {
                "id": 25,
                "username": "apollo_hospital_admin",
                "email": "director@apollohospital.com",
                "first_name": "Rajesh",
                "last_name": "Sharma",
                "portal_type": "ORGANIZATION",
                "role": "ORG_ADMIN",
                "franchise_id": None,
                "franchise_name": None,
                "organization_id": 8,
                "organization_name": "Apollo Multi-Speciality Hospital"
            }
        },
        req_login_org["request"]
    ))
    folder_auth["item"].append(req_login_org)

    # SuperAdmin Dashboard
    req_superadmin_dash = {
        "name": "1.4 SuperAdmin Executive Dashboard Metrics",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/dashboard"),
            "description": "Aggregated metrics for IT & Admin roles: Products count, active/inactive franchises, onboarding requests pipeline, invoices, and total revenue."
        },
        "response": []
    }
    req_superadmin_dash["response"].append(make_response_example(
        "200 OK - Dashboard Data",
        200, "OK",
        {
            "date": "2026-09-18",
            "products": {"total": 12},
            "franchises": {"total": 5, "active": 4, "inactive": 1},
            "franchise_requests": {
                "total": 10,
                "pending": 2,
                "approved": 2,
                "paid": 1,
                "completed": 4,
                "rejected": 1
            },
            "invoices": {"total": 8, "paid": 6, "overdue": 1},
            "revenue": {
                "total_invoiced": "590000.00",
                "total_received": "472000.00",
                "pending": "118000.00"
            }
        },
        req_superadmin_dash["request"]
    ))
    folder_auth["item"].append(req_superadmin_dash)

    # Franchise Dashboard
    req_franchise_dash = {
        "name": "1.5 Franchise Workspace Dashboard Metrics",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/franchise/dashboard"),
            "description": "Workspace metrics for Franchise team: Total organizations, SaaS subscriptions, allotted vs used licenses, team member counts, and product breakdowns."
        },
        "response": []
    }
    req_franchise_dash["response"].append(make_response_example(
        "200 OK - Franchise Metrics",
        200, "OK",
        {
            "franchise_id": 4,
            "franchise_name": "Metro Tech Mumbai Franchise",
            "total_organizations": 6,
            "total_subscriptions": 14,
            "total_licenses_allotted": 125,
            "total_licenses_used": 68,
            "total_licenses_available": 57,
            "franchise_team_count": 4,
            "products_breakdown": [
                {
                    "organization_id": 8,
                    "organization_name": "Apollo Multi-Speciality Hospital",
                    "product_id": 1,
                    "product_name": "HRMSM",
                    "license_count": 25,
                    "used_licenses": 14,
                    "available_licenses": 11,
                    "status": "active",
                    "subscription_end": "2027-09-18"
                },
                {
                    "organization_id": 8,
                    "organization_name": "Apollo Multi-Speciality Hospital",
                    "product_id": 2,
                    "product_name": "CRM",
                    "license_count": 10,
                    "used_licenses": 8,
                    "available_licenses": 2,
                    "status": "active",
                    "subscription_end": "2027-09-18"
                }
            ]
        },
        req_franchise_dash["request"]
    ))
    folder_auth["item"].append(req_franchise_dash)
    collection["item"].append(folder_auth)

    # =========================================================================
    # FOLDER 2: Products Catalog (SuperAdmin & IT)
    # =========================================================================
    folder_products = {
        "name": "02. SaaS Products Catalog",
        "description": "Manage the central catalog of software products sold by ITSOFTLAB360 (HRMSM, CRM, ERP, DMS, LMS, etc.) and their remote provisioning endpoints.",
        "item": []
    }

    # List Products
    req_list_products = {
        "name": "2.1 List All Products",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/products", query=[
                {"key": "search", "value": ""},
                {"key": "ordering", "value": "-created_at"}
            ]),
            "description": "List all software solutions available in the platform catalog."
        },
        "response": []
    }
    req_list_products["response"].append(make_response_example(
        "200 OK - Products List",
        200, "OK",
        [
            {
                "id": 1,
                "name": "HRMSM",
                "description": "Human Resource Management Suite with Biometric & Payroll",
                "price": "9999.00",
                "created_by": 1,
                "created_by_name": "ITSOFTLAB Admin",
                "created_at": "2026-09-10T10:00:00Z",
                "updated_at": "2026-09-10T10:00:00Z"
            },
            {
                "id": 2,
                "name": "CRM",
                "description": "Customer Relationship Management & Sales Automation",
                "price": "7999.00",
                "created_by": 1,
                "created_by_name": "ITSOFTLAB Admin",
                "created_at": "2026-09-10T10:05:00Z",
                "updated_at": "2026-09-10T10:05:00Z"
            }
        ],
        req_list_products["request"]
    ))
    folder_products["item"].append(req_list_products)

    # Create Product
    req_create_product = {
        "name": "2.2 Create Product (IT / Admin)",
        "event": [make_test_script([
            "if (pm.response.code === 201) {",
            "    const res = pm.response.json();",
            "    pm.collectionVariables.set('productId', res.id);",
            "    console.log('Created product ID:', res.id);",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "name": "ERP Suite Pro",
                    "description": "Enterprise Resource Planning & Supply Chain Management",
                    "price": "14999.00",
                    "remote_api_url": "https://erp.itsoftlab360.com/api/v1/users",
                    "api_key": "erp_prod_secret_token_key_998877"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/products"),
            "description": "Create a new software product in catalog. (Role: IT or Admin only). Saves returned ID into {{productId}}."
        },
        "response": []
    }
    req_create_product["response"].append(make_response_example(
        "201 Created - Product Created",
        201, "Created",
        {
            "id": 3,
            "name": "ERP Suite Pro",
            "description": "Enterprise Resource Planning & Supply Chain Management",
            "price": "14999.00",
            "created_by": 1,
            "created_by_name": "ITSOFTLAB Admin",
            "created_at": "2026-09-18T06:00:00Z",
            "updated_at": "2026-09-18T06:00:00Z"
        },
        req_create_product["request"]
    ))
    folder_products["item"].append(req_create_product)

    # Retrieve Product
    req_get_product = {
        "name": "2.3 Retrieve Product Details",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/products/{{productId}}"),
            "description": "Get detailed information about a product by its ID."
        },
        "response": []
    }
    req_get_product["response"].append(make_response_example(
        "200 OK - Product Details",
        200, "OK",
        {
            "id": 1,
            "name": "HRMSM",
            "description": "Human Resource Management Suite with Biometric & Payroll",
            "price": "9999.00",
            "created_by": 1,
            "created_by_name": "ITSOFTLAB Admin",
            "created_at": "2026-09-10T10:00:00Z",
            "updated_at": "2026-09-10T10:00:00Z"
        },
        req_get_product["request"]
    ))
    folder_products["item"].append(req_get_product)

    # Update Product
    req_update_product = {
        "name": "2.4 Update Product (PUT)",
        "request": {
            "method": "PUT",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "name": "HRMSM Enterprise",
                    "description": "Comprehensive HRMS with AI Attendance & Multi-Company Payroll",
                    "price": "11999.00"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/products/{{productId}}"),
            "description": "Full update of a product (Role: IT or Admin)."
        },
        "response": []
    }
    req_update_product["response"].append(make_response_example(
        "200 OK - Product Updated",
        200, "OK",
        {
            "id": 1,
            "name": "HRMSM Enterprise",
            "description": "Comprehensive HRMS with AI Attendance & Multi-Company Payroll",
            "price": "11999.00",
            "created_by": 1,
            "created_by_name": "ITSOFTLAB Admin",
            "created_at": "2026-09-10T10:00:00Z",
            "updated_at": "2026-09-18T06:10:00Z"
        },
        req_update_product["request"]
    ))
    folder_products["item"].append(req_update_product)

    # Delete Product
    req_delete_product = {
        "name": "2.5 Delete Product (IT only)",
        "request": {
            "method": "DELETE",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/products/{{productId}}"),
            "description": "Deletes product from catalog. Restricted strictly to IT role."
        },
        "response": []
    }
    req_delete_product["response"].append(make_response_example(
        "204 No Content - Deleted",
        204, "No Content",
        {},
        req_delete_product["request"]
    ))
    folder_products["item"].append(req_delete_product)
    collection["item"].append(folder_products)

    # =========================================================================
    # FOLDER 3: Internal Users Management
    # =========================================================================
    folder_internal_users = {
        "name": "03. Internal Users (IT, Admin, Sales, Accountant)",
        "description": "Manage internal staff members of ITSOFTLAB360 with role-based access control.",
        "item": []
    }

    # List Users
    req_list_users = {
        "name": "3.1 List Internal Users",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/users", query=[
                {"key": "role", "value": "Sales"},
                {"key": "search", "value": ""}
            ]),
            "description": "List internal staff members. IT and Admin can view all; other roles only see themselves."
        },
        "response": []
    }
    req_list_users["response"].append(make_response_example(
        "200 OK - Users List",
        200, "OK",
        [
            {
                "id": 2,
                "username": "sales_lead_amit",
                "email": "amit@itsoftlab360.com",
                "first_name": "Amit",
                "last_name": "Kumar",
                "role": "Sales"
            }
        ],
        req_list_users["request"]
    ))
    folder_internal_users["item"].append(req_list_users)

    # Create Internal User
    req_create_user = {
        "name": "3.2 Create Internal User (IT / Admin)",
        "event": [make_test_script([
            "if (pm.response.code === 201) {",
            "    const res = pm.response.json();",
            "    pm.collectionVariables.set('userId', res.id);",
            "    console.log('Created user ID:', res.id);",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "username": "accountant_priya",
                    "password": "Password123!",
                    "email": "priya.acc@itsoftlab360.com",
                    "first_name": "Priya",
                    "last_name": "Verma",
                    "role": "Accountant"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/users"),
            "description": "Create an internal staff member (Role: IT, Admin, Sales, or Accountant). Saves returned ID into {{userId}}."
        },
        "response": []
    }
    req_create_user["response"].append(make_response_example(
        "201 Created - Internal User Created",
        201, "Created",
        {
            "id": 5,
            "username": "accountant_priya",
            "email": "priya.acc@itsoftlab360.com",
            "first_name": "Priya",
            "last_name": "Verma",
            "role": "Accountant"
        },
        req_create_user["request"]
    ))
    folder_internal_users["item"].append(req_create_user)

    # Retrieve User
    req_get_user = {
        "name": "3.3 Retrieve Internal User Details",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/users/{{userId}}"),
            "description": "Retrieve user profile details by ID."
        },
        "response": []
    }
    req_get_user["response"].append(make_response_example(
        "200 OK - User Details",
        200, "OK",
        {
            "id": 5,
            "username": "accountant_priya",
            "email": "priya.acc@itsoftlab360.com",
            "first_name": "Priya",
            "last_name": "Verma",
            "role": "Accountant"
        },
        req_get_user["request"]
    ))
    folder_internal_users["item"].append(req_get_user)

    # Delete User
    req_delete_user = {
        "name": "3.4 Delete Internal User (IT only)",
        "request": {
            "method": "DELETE",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/users/{{userId}}"),
            "description": "Deletes an internal staff member. Restricted strictly to IT role."
        },
        "response": []
    }
    req_delete_user["response"].append(make_response_example(
        "204 No Content - User Deleted",
        204, "No Content",
        {},
        req_delete_user["request"]
    ))
    folder_internal_users["item"].append(req_delete_user)
    collection["item"].append(folder_internal_users)

    # =========================================================================
    # FOLDER 4: Franchise Onboarding Workflow (Sales -> Accountant -> IT)
    # =========================================================================
    folder_onboarding = {
        "name": "04. Franchise Onboarding Workflow",
        "description": "End-to-end lifecycle for selling and provisioning a new Franchise partner:\n1. Sales creates FranchiseRequest (PENDING)\n2. Accountant reviews and Approves or Rejects\n3. Accountant generates Invoice (APPROVED -> INVOICE_GENERATED)\n4. Invoice is marked as Paid (PAID)\n5. IT completes onboarding and creates the Franchise instance & catalog (COMPLETED)",
        "item": []
    }

    # Step 1: Sales Creates Request
    req_create_req = {
        "name": "4.1 [Sales] Create Franchise Onboarding Request",
        "event": [make_test_script([
            "if (pm.response.code === 201) {",
            "    const res = pm.response.json();",
            "    pm.collectionVariables.set('franchiseRequestId', res.id);",
            "    console.log('Created franchiseRequestId:', res.id);",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "proposed_franchise_name": "Metro Tech Bangalore Franchise",
                    "proposed_address": "Suite 404, Electronic City Phase 1",
                    "proposed_city": "Bangalore",
                    "proposed_state": "Karnataka",
                    "client_name": "Rohan Deshmukh",
                    "client_email": "rohan.deshmukh@metrotech.in",
                    "client_phone": "9876501234",
                    "client_gstin": "29AAAAA0000A1Z5",
                    "billing_address": "404 Tech Tower, Hosur Road",
                    "billing_city": "Bangalore",
                    "billing_state": "Karnataka",
                    "billing_pincode": "560100",
                    "billing_country": "India",
                    "quoted_amount": "250000.00",
                    "notes": "Premium franchise tier including HRMS and CRM rights",
                    "product_ids": [1, 2]
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/franchise-requests"),
            "description": "Sales creates a franchise onboarding request with selected products. (Status: PENDING). Captures ID into {{franchiseRequestId}}."
        },
        "response": []
    }
    req_create_req["response"].append(make_response_example(
        "201 Created - Franchise Request Created",
        201, "Created",
        {
            "id": 1,
            "requested_by": 2,
            "requested_by_name": "Amit Kumar",
            "proposed_franchise_name": "Metro Tech Bangalore Franchise",
            "proposed_address": "Suite 404, Electronic City Phase 1",
            "client_name": "Rohan Deshmukh",
            "client_email": "rohan.deshmukh@metrotech.in",
            "client_phone": "9876501234",
            "quoted_amount": "250000.00",
            "status": "pending",
            "status_display": "Pending",
            "products": [
                {"id": 1, "name": "HRMSM", "price": "9999.00"},
                {"id": 2, "name": "CRM", "price": "7999.00"}
            ],
            "created_at": "2026-09-18T06:15:00Z"
        },
        req_create_req["request"]
    ))
    folder_onboarding["item"].append(req_create_req)

    # Step 2: List Requests
    req_list_req = {
        "name": "4.2 List Franchise Requests (Filtered by Status)",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/franchise-requests", query=[
                {"key": "status", "value": "pending"}
            ]),
            "description": "Accountant and IT can review pending requests in the onboarding pipeline."
        },
        "response": []
    }
    req_list_req["response"].append(make_response_example(
        "200 OK - Pending Requests",
        200, "OK",
        [
            {
                "id": 1,
                "proposed_franchise_name": "Metro Tech Bangalore Franchise",
                "client_name": "Rohan Deshmukh",
                "client_email": "rohan.deshmukh@metrotech.in",
                "quoted_amount": "250000.00",
                "status": "pending",
                "status_display": "Pending"
            }
        ],
        req_list_req["request"]
    ))
    folder_onboarding["item"].append(req_list_req)

    # Step 3: Accountant Approves
    req_approve_req = {
        "name": "4.3 [Accountant] Approve Franchise Request",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({}, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/franchise-requests/{{franchiseRequestId}}/approve"),
            "description": "Accountant approves the commercial terms of the request. (Role: Accountant only. Transitions status from PENDING to APPROVED)."
        },
        "response": []
    }
    req_approve_req["response"].append(make_response_example(
        "200 OK - Request Approved",
        200, "OK",
        {
            "detail": "Franchise request approved.",
            "request_id": 1,
            "status": "approved"
        },
        req_approve_req["request"]
    ))
    folder_onboarding["item"].append(req_approve_req)

    # Step 4: Accountant Rejects (Alternative Flow)
    req_reject_req = {
        "name": "4.4 [Accountant] Reject Franchise Request",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "rejection_reason": "Incomplete GST verification documents provided by applicant."
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/franchise-requests/{{franchiseRequestId}}/reject"),
            "description": "Accountant rejects request with mandatory reason. (Role: Accountant only)."
        },
        "response": []
    }
    req_reject_req["response"].append(make_response_example(
        "200 OK - Request Rejected",
        200, "OK",
        {
            "detail": "Franchise request rejected.",
            "status": "rejected"
        },
        req_reject_req["request"]
    ))
    folder_onboarding["item"].append(req_reject_req)

    # Step 5: Accountant Creates Invoice
    req_create_inv_req = {
        "name": "4.5 [Accountant] Create Invoice from Request",
        "event": [make_test_script([
            "if (pm.response.code === 201 || pm.response.code === 200) {",
            "    const res = pm.response.json();",
            "    if (res.invoice_id) {",
            "        pm.collectionVariables.set('invoiceId', res.invoice_id);",
            "        console.log('Created invoice ID:', res.invoice_id);",
            "    }",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "tax_percentage": "18.00",
                    "discount_amount": "10000.00",
                    "due_days": 15,
                    "notes": "Franchise onboarding license fee for Bangalore region"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/franchise-requests/{{franchiseRequestId}}/create-invoice"),
            "description": "Accountant generates GST invoice for approved request. Saves {{invoiceId}}."
        },
        "response": []
    }
    req_create_inv_req["response"].append(make_response_example(
        "201 Created - Invoice Generated",
        201, "Created",
        {
            "detail": "Invoice created successfully.",
            "invoice_id": 1,
            "invoice_number": "INV-2026-0001",
            "total_amount": "283200.00",
            "balance_due": "283200.00",
            "status": "sent"
        },
        req_create_inv_req["request"]
    ))
    folder_onboarding["item"].append(req_create_inv_req)

    # Step 6: Mark Request as Paid
    req_mark_paid_req = {
        "name": "4.6 [Accountant/Admin] Mark Request as Paid",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({}, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/franchise-requests/{{franchiseRequestId}}/mark-paid"),
            "description": "Verifies payment received on the linked invoice and marks request status as PAID (queued for IT completion)."
        },
        "response": []
    }
    req_mark_paid_req["response"].append(make_response_example(
        "200 OK - Request Marked Paid",
        200, "OK",
        {
            "detail": "Franchise request marked as paid.",
            "status": "paid"
        },
        req_mark_paid_req["request"]
    ))
    folder_onboarding["item"].append(req_mark_paid_req)

    # Step 7: IT Completes Franchise
    req_complete_req = {
        "name": "4.7 [IT] Complete & Provision Franchise",
        "event": [make_test_script([
            "if (pm.response.code === 201 || pm.response.code === 200) {",
            "    const res = pm.response.json();",
            "    if (res.franchise_id) {",
            "        pm.collectionVariables.set('franchiseId', res.franchise_id);",
            "        console.log('Created Franchise ID:', res.franchise_id);",
            "    }",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({}, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/franchise-requests/{{franchiseRequestId}}/complete"),
            "description": "IT fulfills the paid request. Creates Franchise model record, assigns purchased product inventory, and marks request as COMPLETED. (Role: IT only). Saves {{franchiseId}}."
        },
        "response": []
    }
    req_complete_req["response"].append(make_response_example(
        "201 Created - Franchise Provisioned",
        201, "Created",
        {
            "detail": "Franchise created successfully.",
            "franchise_id": 4,
            "franchise_name": "Metro Tech Bangalore Franchise",
            "products": [
                {"id": 1, "name": "HRMSM"},
                {"id": 2, "name": "CRM"}
            ],
            "request_status": "completed"
        },
        req_complete_req["request"]
    ))
    folder_onboarding["item"].append(req_complete_req)
    collection["item"].append(folder_onboarding)

    # =========================================================================
    # FOLDER 5: Franchises & Franchise Staff
    # =========================================================================
    folder_franchises = {
        "name": "05. Active Franchises & Franchise Staff",
        "description": "View, activate, deactivate, or delete franchises and manage franchise admin logins.",
        "item": []
    }

    # List Franchises
    req_list_franchises = {
        "name": "5.1 List All Franchises",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/franchises", query=[
                {"key": "is_active", "value": "true"}
            ]),
            "description": "List all active franchises with purchased product catalogs."
        },
        "response": []
    }
    req_list_franchises["response"].append(make_response_example(
        "200 OK - Franchises List",
        200, "OK",
        [
            {
                "id": 4,
                "name": "Metro Tech Bangalore Franchise",
                "address": "Suite 404, Electronic City Phase 1",
                "is_active": True,
                "products": [1, 2],
                "product_names": ["HRMSM", "CRM"],
                "created_by_name": "ITSOFTLAB Admin",
                "created_at": "2026-09-18T06:30:00Z"
            }
        ],
        req_list_franchises["request"]
    ))
    folder_franchises["item"].append(req_list_franchises)

    # Get Franchise Details
    req_get_franchise = {
        "name": "5.2 Retrieve Franchise Details",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/franchises/{{franchiseId}}"),
            "description": "Get franchise information and licensed product catalog."
        },
        "response": []
    }
    req_get_franchise["response"].append(make_response_example(
        "200 OK - Franchise Details",
        200, "OK",
        {
            "id": 4,
            "name": "Metro Tech Bangalore Franchise",
            "address": "Suite 404, Electronic City Phase 1",
            "is_active": True,
            "products": [1, 2],
            "product_names": ["HRMSM", "CRM"],
            "created_by_name": "ITSOFTLAB Admin",
            "created_at": "2026-09-18T06:30:00Z"
        },
        req_get_franchise["request"]
    ))
    folder_franchises["item"].append(req_get_franchise)

    # Activate Franchise
    req_act_franchise = {
        "name": "5.3 Activate Franchise (IT / Admin)",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({}, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/franchises/{{franchiseId}}/activate"),
            "description": "Activates a franchise. (Role: IT or Admin only)."
        },
        "response": []
    }
    req_act_franchise["response"].append(make_response_example(
        "200 OK - Activated",
        200, "OK",
        {
            "message": "Franchise activated successfully.",
            "id": 4,
            "is_active": True
        },
        req_act_franchise["request"]
    ))
    folder_franchises["item"].append(req_act_franchise)

    # Deactivate Franchise
    req_deact_franchise = {
        "name": "5.4 Deactivate Franchise (IT / Admin)",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({}, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/franchises/{{franchiseId}}/deactivate"),
            "description": "Deactivates a franchise. (Role: IT or Admin only)."
        },
        "response": []
    }
    req_deact_franchise["response"].append(make_response_example(
        "200 OK - Deactivated",
        200, "OK",
        {
            "message": "Franchise deactivated successfully.",
            "id": 4,
            "is_active": False
        },
        req_deact_franchise["request"]
    ))
    folder_franchises["item"].append(req_deact_franchise)

    # Franchise User Profiles
    req_list_franchise_users = {
        "name": "5.5 List Franchise Staff Profiles",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/franchise-users", query=[
                {"key": "franchise", "value": "{{franchiseId}}"}
            ]),
            "description": "List profiles of users tied to franchises."
        },
        "response": []
    }
    req_list_franchise_users["response"].append(make_response_example(
        "200 OK - Franchise Users List",
        200, "OK",
        [
            {
                "id": 1,
                "user": 12,
                "username": "franchise_admin_mumbai",
                "franchise": 4,
                "franchise_name": "Metro Tech Mumbai Franchise",
                "role": "FRANCHISE_ADMIN",
                "created_at": "2026-09-18T06:35:00Z"
            }
        ],
        req_list_franchise_users["request"]
    ))
    folder_franchises["item"].append(req_list_franchise_users)

    # Create Franchise User Profile
    req_create_fr_user = {
        "name": "5.6 Create Franchise Admin Login (IT / Admin)",
        "event": [make_test_script([
            "if (pm.response.code === 201) {",
            "    const res = pm.response.json();",
            "    pm.collectionVariables.set('franchiseUserId', res.id);",
            "    console.log('Created FranchiseUserProfile ID:', res.id);",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "user": 15,
                    "franchise": 4,
                    "role": "FRANCHISE_ADMIN"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/franchise-users"),
            "description": "Links a User account to a Franchise with role FRANCHISE_ADMIN. Saves {{franchiseUserId}}."
        },
        "response": []
    }
    req_create_fr_user["response"].append(make_response_example(
        "201 Created - Profile Created",
        201, "Created",
        {
            "id": 2,
            "user": 15,
            "username": "fadmin_bangalore",
            "franchise": 4,
            "franchise_name": "Metro Tech Bangalore Franchise",
            "role": "FRANCHISE_ADMIN",
            "created_at": "2026-09-18T06:40:00Z"
        },
        req_create_fr_user["request"]
    ))
    folder_franchises["item"].append(req_create_fr_user)
    collection["item"].append(folder_franchises)

    # =========================================================================
    # FOLDER 6: Franchise Invoices & Revenue (Users App)
    # =========================================================================
    folder_invoices = {
        "name": "06. Franchise Invoices Directory (HQ to Franchise)",
        "description": "HQ-to-Franchise Invoices generated during the franchise onboarding and licensing lifecycle.",
        "item": []
    }

    # List Invoices
    req_list_inv = {
        "name": "6.1 List Invoices (Filtered by Status)",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/invoices", query=[
                {"key": "status", "value": "sent"},
                {"key": "ordering", "value": "-invoice_date"}
            ]),
            "description": "List invoices generated by HQ for franchise onboarding."
        },
        "response": []
    }
    req_list_inv["response"].append(make_response_example(
        "200 OK - Invoices List",
        200, "OK",
        [
            {
                "id": 1,
                "invoice_number": "INV-2026-0001",
                "franchise": 4,
                "franchise_name": "Metro Tech Bangalore Franchise",
                "customer_name": "Rohan Deshmukh",
                "customer_email": "rohan.deshmukh@metrotech.in",
                "total_amount": "283200.00",
                "amount_paid": "0.00",
                "balance_due": "283200.00",
                "status": "sent",
                "status_display": "Sent",
                "invoice_date": "2026-09-18"
            }
        ],
        req_list_inv["request"]
    ))
    folder_invoices["item"].append(req_list_inv)

    # Get Invoice
    req_get_inv = {
        "name": "6.2 Retrieve Invoice Details",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/users/invoices/{{invoiceId}}"),
            "description": "Get breakdown of an invoice including line items and balance due."
        },
        "response": []
    }
    req_get_inv["response"].append(make_response_example(
        "200 OK - Invoice Details",
        200, "OK",
        {
            "id": 1,
            "invoice_number": "INV-2026-0001",
            "franchise": 4,
            "franchise_name": "Metro Tech Bangalore Franchise",
            "customer_name": "Rohan Deshmukh",
            "customer_email": "rohan.deshmukh@metrotech.in",
            "subtotal": "250000.00",
            "discount_amount": "10000.00",
            "taxable_amount": "240000.00",
            "tax_amount": "43200.00",
            "total_amount": "283200.00",
            "amount_paid": "0.00",
            "balance_due": "283200.00",
            "status": "sent"
        },
        req_get_inv["request"]
    ))
    folder_invoices["item"].append(req_get_inv)

    # Mark Paid
    req_mark_inv_paid = {
        "name": "6.3 [Accountant] Mark Invoice as Paid",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "amount": "283200.00",
                    "payment_method": "Bank Transfer",
                    "transaction_id": "NEFT-AXIS-20260918-998811"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/users/invoices/{{invoiceId}}/mark-paid"),
            "description": "Records payment for the invoice. (Role: Accountant or Admin). Automatically synchronizes franchise request to PAID."
        },
        "response": []
    }
    req_mark_inv_paid["response"].append(make_response_example(
        "200 OK - Invoice Paid",
        200, "OK",
        {
            "message": "Invoice marked as paid successfully.",
            "invoice": {
                "id": 1,
                "invoice_number": "INV-2026-0001",
                "status": "paid",
                "amount_paid": "283200.00",
                "balance_due": "0.00",
                "payment_method": "Bank Transfer",
                "transaction_id": "NEFT-AXIS-20260918-998811"
            }
        },
        req_mark_inv_paid["request"]
    ))
    folder_invoices["item"].append(req_mark_inv_paid)
    collection["item"].append(folder_invoices)

    # =========================================================================
    # FOLDER 7: Franchise Team Management (Franchise App)
    # =========================================================================
    folder_fr_team = {
        "name": "07. Franchise Team Management (Franchise Admin)",
        "description": "Franchise Admin creates and manages their regional team:\n- FRANCHISE_SALES (sells SaaS to client organizations)\n- FRANCHISE_ACCOUNTANT (issues invoices & tracks client payment)\n- FRANCHISE_IT (fulfills requests & provisions organizations)",
        "item": []
    }

    # List Team Members
    req_list_team = {
        "name": "7.1 List Franchise Team Members",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/franchise/team"),
            "description": "List all members of the requesting user's franchise team."
        },
        "response": []
    }
    req_list_team["response"].append(make_response_example(
        "200 OK - Team Members",
        200, "OK",
        [
            {
                "id": 1,
                "user_id": 20,
                "user_username": "fsales_sam",
                "user_email": "sam.sales@metrotech.in",
                "user_first_name": "Sam",
                "user_last_name": "Sales",
                "role": "FRANCHISE_SALES",
                "franchise_name": "Metro Tech Bangalore Franchise"
            }
        ],
        req_list_team["request"]
    ))
    folder_fr_team["item"].append(req_list_team)

    # Create Team Member (Sales)
    req_create_sales = {
        "name": "7.2 [Franchise Admin] Create Franchise Sales Member",
        "event": [make_test_script([
            "if (pm.response.code === 201) {",
            "    const res = pm.response.json();",
            "    pm.collectionVariables.set('teamMemberId', res.id);",
            "    console.log('Created team member ID:', res.id);",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "username": "fsales_vikram",
                    "password": "Password123!",
                    "email": "vikram.sales@metrotech.in",
                    "first_name": "Vikram",
                    "last_name": "Sales",
                    "role": "FRANCHISE_SALES"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/team"),
            "description": "Franchise Admin provisions a Franchise Sales user. Saves {{teamMemberId}}."
        },
        "response": []
    }
    req_create_sales["response"].append(make_response_example(
        "201 Created - Sales Member Created",
        201, "Created",
        {
            "id": 3,
            "user_id": 22,
            "user_username": "fsales_vikram",
            "user_email": "vikram.sales@metrotech.in",
            "user_first_name": "Vikram",
            "user_last_name": "Sales",
            "role": "FRANCHISE_SALES",
            "franchise_name": "Metro Tech Bangalore Franchise"
        },
        req_create_sales["request"]
    ))
    folder_fr_team["item"].append(req_create_sales)

    # Create Team Member (Accountant)
    req_create_acc = {
        "name": "7.3 [Franchise Admin] Create Franchise Accountant Member",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "username": "facc_deepa",
                    "password": "Password123!",
                    "email": "deepa.acc@metrotech.in",
                    "first_name": "Deepa",
                    "last_name": "Accountant",
                    "role": "FRANCHISE_ACCOUNTANT"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/team"),
            "description": "Franchise Admin provisions a Franchise Accountant user."
        },
        "response": []
    }
    req_create_acc["response"].append(make_response_example(
        "201 Created - Accountant Created",
        201, "Created",
        {
            "id": 4,
            "user_id": 23,
            "user_username": "facc_deepa",
            "user_email": "deepa.acc@metrotech.in",
            "user_first_name": "Deepa",
            "user_last_name": "Accountant",
            "role": "FRANCHISE_ACCOUNTANT",
            "franchise_name": "Metro Tech Bangalore Franchise"
        },
        req_create_acc["request"]
    ))
    folder_fr_team["item"].append(req_create_acc)

    # Create Team Member (IT)
    req_create_it = {
        "name": "7.4 [Franchise Admin] Create Franchise IT Member",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "username": "fit_karan",
                    "password": "Password123!",
                    "email": "karan.it@metrotech.in",
                    "first_name": "Karan",
                    "last_name": "Engineer",
                    "role": "FRANCHISE_IT"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/team"),
            "description": "Franchise Admin provisions a Franchise IT user."
        },
        "response": []
    }
    req_create_it["response"].append(make_response_example(
        "201 Created - IT Member Created",
        201, "Created",
        {
            "id": 5,
            "user_id": 24,
            "user_username": "fit_karan",
            "user_email": "karan.it@metrotech.in",
            "user_first_name": "Karan",
            "user_last_name": "Engineer",
            "role": "FRANCHISE_IT",
            "franchise_name": "Metro Tech Bangalore Franchise"
        },
        req_create_it["request"]
    ))
    folder_fr_team["item"].append(req_create_it)
    collection["item"].append(folder_fr_team)

    # =========================================================================
    # FOLDER 8: Franchise Client Sales & Fulfillment Flow
    # =========================================================================
    folder_client_flow = {
        "name": "08. Franchise Client Sales, Billing & IT Provisioning",
        "description": "The complete Franchise-to-Client Onboarding Pipeline:\n1. Franchise Sales raises ClientLicenseRequest\n2. Guard: Cannot sell products not held in franchise catalog\n3. Franchise Accountant generates ClientInvoice\n4. Client payment clears (Mark Paid -> status='paid')\n5. Franchise IT fulfills request: Provisions Organization, Subscriptions, and Organization Administrator with 0 license seat consumption!",
        "item": []
    }

    # Step 1: Sales Raises License Request
    req_sales_client_req = {
        "name": "8.1 [Franchise Sales] Raise Client License Request",
        "event": [make_test_script([
            "if (pm.response.code === 201) {",
            "    const res = pm.response.json();",
            "    pm.collectionVariables.set('clientRequestId', res.id);",
            "    console.log('Created ClientLicenseRequest ID:', res.id);",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "client_name": "Dr. Rajesh Sharma",
                    "client_email": "rajesh.sharma@apollohospital.com",
                    "client_phone": "9876543210",
                    "organization_name": "Apollo Multi-Speciality Hospital",
                    "billing_address": "Sarita Vihar, Mathura Road",
                    "city": "New Delhi",
                    "state": "Delhi",
                    "pincode": "110076",
                    "country": "India",
                    "customer_gstin": "07AAAAA0000A1Z5",
                    "notes": "Enterprise hospital onboarding for HRMS and CRM",
                    "items": [
                        {
                            "product": 1,
                            "license_count": 10,
                            "duration_months": 12,
                            "quoted_price": "1000.00"
                        },
                        {
                            "product": 2,
                            "license_count": 5,
                            "duration_months": 12,
                            "quoted_price": "800.00"
                        }
                    ]
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/license-requests"),
            "description": "Franchise Sales team raises request for prospective enterprise client. Validates that products belong to Franchise inventory. Saves {{clientRequestId}}."
        },
        "response": []
    }
    req_sales_client_req["response"].append(make_response_example(
        "201 Created - Request Raised",
        201, "Created",
        {
            "id": 1,
            "franchise": 4,
            "franchise_name": "Metro Tech Bangalore Franchise",
            "client_name": "Dr. Rajesh Sharma",
            "client_email": "rajesh.sharma@apollohospital.com",
            "organization_name": "Apollo Multi-Speciality Hospital",
            "status": "pending",
            "items": [
                {
                    "id": 1,
                    "product": 1,
                    "product_name": "HRMSM",
                    "license_count": 10,
                    "duration_months": 12,
                    "quoted_price": "1000.00"
                },
                {
                    "id": 2,
                    "product": 2,
                    "product_name": "CRM",
                    "license_count": 5,
                    "duration_months": 12,
                    "quoted_price": "800.00"
                }
            ],
            "created_at": "2026-09-18T07:00:00Z"
        },
        req_sales_client_req["request"]
    ))
    folder_client_flow["item"].append(req_sales_client_req)

    # Step 2: List Client Requests
    req_list_client_req = {
        "name": "8.2 List Client License Requests (IT & Accountant Queue)",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/franchise/license-requests", query=[
                {"key": "status", "value": "pending"}
            ]),
            "description": "List client license requests filtered by status ('pending', 'invoice_generated', 'paid', 'provisioned')."
        },
        "response": []
    }
    req_list_client_req["response"].append(make_response_example(
        "200 OK - Requests List",
        200, "OK",
        [
            {
                "id": 1,
                "client_name": "Dr. Rajesh Sharma",
                "organization_name": "Apollo Multi-Speciality Hospital",
                "status": "pending",
                "invoice_number": None
            }
        ],
        req_list_client_req["request"]
    ))
    folder_client_flow["item"].append(req_list_client_req)

    # Step 3: Accountant Generates Invoice
    req_gen_inv_req = {
        "name": "8.3 [Franchise Accountant] Generate Client Invoice",
        "event": [make_test_script([
            "if (pm.response.code === 201) {",
            "    const res = pm.response.json();",
            "    pm.collectionVariables.set('clientInvoiceId', res.invoice.id);",
            "    console.log('Created ClientInvoice ID:', res.invoice.id);",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "tax_percentage": "18.00",
                    "discount_amount": "0.00",
                    "due_days": 15,
                    "send_email": True,
                    "notes": "Annual package for HRMS and CRM suite. Payment terms: net 15 days."
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/license-requests/{{clientRequestId}}/generate-invoice"),
            "description": "Franchise Accountant creates ClientInvoice, computes 18% GST, dispatches email to client, and links invoice to request. Saves {{clientInvoiceId}}."
        },
        "response": []
    }
    req_gen_inv_req["response"].append(make_response_example(
        "201 Created - Client Invoice Generated",
        201, "Created",
        {
            "message": "ClientInvoice INV-FR-4-ABCD12 generated successfully.",
            "invoice": {
                "id": 1,
                "invoice_number": "INV-FR-4-ABCD12",
                "customer_name": "Dr. Rajesh Sharma",
                "customer_email": "rajesh.sharma@apollohospital.com",
                "organization_name": "Apollo Multi-Speciality Hospital",
                "subtotal": "14000.00",
                "tax_amount": "2520.00",
                "total_amount": "16520.00",
                "status": "sent",
                "email_sent": True
            },
            "request_status": "invoice_generated"
        },
        req_gen_inv_req["request"]
    ))
    folder_client_flow["item"].append(req_gen_inv_req)

    # Step 4: Client Pays Invoice
    req_pay_client_inv = {
        "name": "8.4 [Franchise Accountant] Mark Client Invoice as Paid",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "payment_method": "upi",
                    "transaction_id": "UPI-HDFC-20260918-SUCCESS",
                    "amount": "16520.00"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/invoices/{{clientInvoiceId}}/mark-paid"),
            "description": "Records full payment from client. Automatically advances linked ClientLicenseRequest status to 'paid' (queued in IT fulfillment queue)."
        },
        "response": []
    }
    req_pay_client_inv["response"].append(make_response_example(
        "200 OK - Invoice Paid",
        200, "OK",
        {
            "message": "Invoice INV-FR-4-ABCD12 marked as paid.",
            "invoice": {
                "id": 1,
                "invoice_number": "INV-FR-4-ABCD12",
                "status": "paid",
                "total_amount": "16520.00",
                "amount_paid": "16520.00",
                "balance_due": "0.00",
                "payment_method": "upi",
                "transaction_id": "UPI-HDFC-20260918-SUCCESS"
            }
        },
        req_pay_client_inv["request"]
    ))
    folder_client_flow["item"].append(req_pay_client_inv)

    # Step 5: IT Fulfills Request
    req_fulfill_req = {
        "name": "8.5 [Franchise IT] Fulfill Request & Provision Organization",
        "event": [make_test_script([
            "if (pm.response.code === 200) {",
            "    const res = pm.response.json();",
            "    if (res.result && res.result.organization_id) {",
            "        pm.collectionVariables.set('organizationId', res.result.organization_id);",
            "        console.log('Provisioned Organization ID:', res.result.organization_id);",
            "    }",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "org_admin_username": "apollo_admin",
                    "org_admin_email": "admin@apollohospital.com",
                    "org_admin_password": "OrgAdminPassword123!",
                    "org_admin_first_name": "Rajesh",
                    "org_admin_last_name": "Sharma"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/license-requests/{{clientRequestId}}/fulfill"),
            "description": "IT fulfills paid request: Provisions Organization, Subscriptions, and Organization Admin user. Guarantees 0 license seats are consumed by the admin user! Saves {{organizationId}}."
        },
        "response": []
    }
    req_fulfill_req["response"].append(make_response_example(
        "200 OK - Organization Provisioned",
        200, "OK",
        {
            "message": "Organization provisioned successfully by IT team.",
            "result": {
                "organization_id": 8,
                "organization_name": "Apollo Multi-Speciality Hospital",
                "org_admin_username": "apollo_admin",
                "subscriptions_count": 2,
                "subscriptions": [
                    {
                        "product_id": 1,
                        "product_name": "HRMSM",
                        "license_count": 10,
                        "available_licenses": 10,
                        "license_key": "9a8b7c6d-5e4f-3a2b-1c0d-ef9876543210",
                        "status": "active"
                    },
                    {
                        "product_id": 2,
                        "product_name": "CRM",
                        "license_count": 5,
                        "available_licenses": 5,
                        "license_key": "1a2b3c4d-5e6f-7a8b-9c0d-ef1234567890",
                        "status": "active"
                    }
                ]
            },
            "request_status": "provisioned"
        },
        req_fulfill_req["request"]
    ))
    folder_client_flow["item"].append(req_fulfill_req)
    collection["item"].append(folder_client_flow)

    # =========================================================================
    # FOLDER 9: Client Invoices Management (Franchise App)
    # =========================================================================
    folder_client_invoices = {
        "name": "09. Franchise Client Invoices & Dispatch",
        "description": "Franchise-to-Client Invoices directory, resending invoice emails, and manual invoice management.",
        "item": []
    }

    # List Client Invoices
    req_list_client_inv = {
        "name": "9.1 List Franchise Client Invoices",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/franchise/invoices", query=[
                {"key": "status", "value": "paid"}
            ]),
            "description": "List all invoices issued by this franchise to client organizations."
        },
        "response": []
    }
    req_list_client_inv["response"].append(make_response_example(
        "200 OK - Client Invoices List",
        200, "OK",
        [
            {
                "id": 1,
                "invoice_number": "INV-FR-4-ABCD12",
                "customer_name": "Dr. Rajesh Sharma",
                "customer_email": "rajesh.sharma@apollohospital.com",
                "organization_name": "Apollo Multi-Speciality Hospital",
                "total_amount": "16520.00",
                "amount_paid": "16520.00",
                "balance_due": "0.00",
                "status": "paid",
                "payment_method": "upi",
                "email_sent": True
            }
        ],
        req_list_client_inv["request"]
    ))
    folder_client_invoices["item"].append(req_list_client_inv)

    # Send / Resend Invoice Email
    req_resend_email = {
        "name": "9.2 [Franchise Accountant] Resend Invoice Email to Client",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "email": "finance@apollohospital.com"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/invoices/{{clientInvoiceId}}/send-email"),
            "description": "Sends or resends the digital PDF invoice to client's finance contact."
        },
        "response": []
    }
    req_resend_email["response"].append(make_response_example(
        "200 OK - Email Dispatched",
        200, "OK",
        {
            "message": "Invoice INV-FR-4-ABCD12 sent to finance@apollohospital.com.",
            "invoice": {
                "id": 1,
                "invoice_number": "INV-FR-4-ABCD12",
                "email_sent": True,
                "email_recipient": "finance@apollohospital.com"
            }
        },
        req_resend_email["request"]
    ))
    folder_client_invoices["item"].append(req_resend_email)
    collection["item"].append(folder_client_invoices)

    # =========================================================================
    # FOLDER 10: Client Organizations Management (Franchise App)
    # =========================================================================
    folder_orgs = {
        "name": "10. Client Organizations Directory",
        "description": "Create and manage customer organizations (Hospitals, Enterprises, Schools) that license software from the franchise.",
        "item": []
    }

    # List Organizations
    req_list_orgs = {
        "name": "10.1 List Client Organizations",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/franchise/organizations", query=[
                {"key": "city", "value": "New Delhi"}
            ]),
            "description": "List client organizations belonging to this franchise."
        },
        "response": []
    }
    req_list_orgs["response"].append(make_response_example(
        "200 OK - Organizations List",
        200, "OK",
        [
            {
                "id": 8,
                "name": "Apollo Multi-Speciality Hospital",
                "email": "admin@apollohospital.com",
                "phone": "9876543210",
                "city": "New Delhi",
                "state": "Delhi",
                "country": "India",
                "franchise": 4,
                "franchise_name": "Metro Tech Bangalore Franchise",
                "subscriptions_count": 2,
                "active_licenses_count": 15
            }
        ],
        req_list_orgs["request"]
    ))
    folder_orgs["item"].append(req_list_orgs)

    # Create Organization Directly
    req_create_org = {
        "name": "10.2 Create Client Organization Directly",
        "event": [make_test_script([
            "if (pm.response.code === 201) {",
            "    const res = pm.response.json();",
            "    pm.collectionVariables.set('organizationId', res.id);",
            "    console.log('Created Organization ID:', res.id);",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "name": "Fortis Healthcare South",
                    "email": "contact@fortishealthcare.com",
                    "phone": "9811223344",
                    "gstin": "29BBBBB1111B2Z6",
                    "address": "Bannerghatta Main Road",
                    "city": "Bangalore",
                    "state": "Karnataka",
                    "pincode": "560076",
                    "country": "India"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/organizations"),
            "description": "Directly create an organization profile under the requesting franchise. Saves {{organizationId}}."
        },
        "response": []
    }
    req_create_org["response"].append(make_response_example(
        "201 Created - Organization Created",
        201, "Created",
        {
            "id": 9,
            "name": "Fortis Healthcare South",
            "email": "contact@fortishealthcare.com",
            "phone": "9811223344",
            "city": "Bangalore",
            "state": "Karnataka",
            "franchise": 4,
            "franchise_name": "Metro Tech Bangalore Franchise",
            "subscriptions_count": 0,
            "active_licenses_count": 0
        },
        req_create_org["request"]
    ))
    folder_orgs["item"].append(req_create_org)

    # Retrieve Organization
    req_get_org = {
        "name": "10.3 Retrieve Organization Details",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/franchise/organizations/{{organizationId}}"),
            "description": "Retrieve organization data and total active license capacity."
        },
        "response": []
    }
    req_get_org["response"].append(make_response_example(
        "200 OK - Organization Details",
        200, "OK",
        {
            "id": 8,
            "name": "Apollo Multi-Speciality Hospital",
            "email": "admin@apollohospital.com",
            "phone": "9876543210",
            "city": "New Delhi",
            "state": "Delhi",
            "franchise": 4,
            "franchise_name": "Metro Tech Bangalore Franchise",
            "subscriptions_count": 2,
            "active_licenses_count": 15
        },
        req_get_org["request"]
    ))
    folder_orgs["item"].append(req_get_org)
    collection["item"].append(folder_orgs)

    # =========================================================================
    # FOLDER 11: Organization Subscriptions & License Verification
    # =========================================================================
    folder_subs = {
        "name": "11. Organization SaaS Subscriptions & Verification API",
        "description": "Manage organization subscriptions, license seat counts, validity dates, unique license keys, and the public external verification API for the 12 industry portals.",
        "item": []
    }

    # List Subscriptions
    req_list_subs = {
        "name": "11.1 List Organization Subscriptions",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/franchise/subscriptions", query=[
                {"key": "organization", "value": "{{organizationId}}"}
            ]),
            "description": "List subscriptions showing product name, license_count, used_licenses, available_licenses, and validity."
        },
        "response": []
    }
    req_list_subs["response"].append(make_response_example(
        "200 OK - Subscriptions List",
        200, "OK",
        [
            {
                "id": 1,
                "organization": 8,
                "organization_name": "Apollo Multi-Speciality Hospital",
                "product": 1,
                "product_name": "HRMSM",
                "product_price": "9999.00",
                "license_count": 10,
                "used_licenses": 2,
                "available_licenses": 8,
                "license_key": "9a8b7c6d-5e4f-3a2b-1c0d-ef9876543210",
                "subscription_start": "2026-09-18",
                "subscription_end": "2027-09-18",
                "status": "active",
                "is_active": True,
                "is_valid": True
            },
            {
                "id": 2,
                "organization": 8,
                "organization_name": "Apollo Multi-Speciality Hospital",
                "product": 2,
                "product_name": "CRM",
                "product_price": "7999.00",
                "license_count": 5,
                "used_licenses": 1,
                "available_licenses": 4,
                "license_key": "1a2b3c4d-5e6f-7a8b-9c0d-ef1234567890",
                "subscription_start": "2026-09-18",
                "subscription_end": "2027-09-18",
                "status": "active",
                "is_active": True,
                "is_valid": True
            }
        ],
        req_list_subs["request"]
    ))
    folder_subs["item"].append(req_list_subs)

    # Create Subscription Directly
    req_create_sub = {
        "name": "11.2 Create Product Subscription for Organization",
        "event": [make_test_script([
            "if (pm.response.code === 201) {",
            "    const res = pm.response.json();",
            "    pm.collectionVariables.set('subscriptionId', res.id);",
            "    pm.collectionVariables.set('licenseKey', res.license_key);",
            "    console.log('Created Subscription ID:', res.id, 'License Key:', res.license_key);",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "organization": 8,
                    "product": 1,
                    "license_count": 15,
                    "subscription_start": "2026-09-18",
                    "subscription_end": "2027-09-18",
                    "status": "active",
                    "notes": "Custom package with 15 user seats"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/subscriptions"),
            "description": "Allot product licenses directly to an organization. Saves {{subscriptionId}} and {{licenseKey}}."
        },
        "response": []
    }
    req_create_sub["response"].append(make_response_example(
        "201 Created - Subscription Created",
        201, "Created",
        {
            "id": 5,
            "organization": 8,
            "organization_name": "Apollo Multi-Speciality Hospital",
            "product": 1,
            "product_name": "HRMSM",
            "license_count": 15,
            "used_licenses": 0,
            "available_licenses": 15,
            "license_key": "3f8e1a2b-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
            "subscription_start": "2026-09-18",
            "subscription_end": "2027-09-18",
            "status": "active",
            "is_valid": True
        },
        req_create_sub["request"]
    ))
    folder_subs["item"].append(req_create_sub)

    # Verification API (Public GET)
    req_verify_sub_get = {
        "name": "11.3 [External Software API] Verify Subscription & User Access (GET)",
        "request": {
            "method": "GET",
            "header": make_header(auth=False, content_type=False),
            "url": make_url("api/franchise/subscriptions/verify", query=[
                {"key": "license_key", "value": "{{licenseKey}}"},
                {"key": "user_identifier", "value": "dr_rahul"}
            ]),
            "description": "Public / Token API called by external software apps (HRMS, CRM, etc.) to verify license validity and user seat access."
        },
        "response": []
    }
    req_verify_sub_get["response"].append(make_response_example(
        "200 OK - License Valid & User Access Granted",
        200, "OK",
        {
            "is_valid": True,
            "status": "active",
            "organization_id": 8,
            "organization_name": "Apollo Multi-Speciality Hospital",
            "product_id": 1,
            "product_name": "HRMSM",
            "license_count": 10,
            "used_licenses": 2,
            "available_licenses": 8,
            "subscription_start": "2026-09-18",
            "subscription_end": "2027-09-18",
            "user_access_granted": True,
            "external_user_id": "hrmsm_usr_a1b2c3d4e5"
        },
        req_verify_sub_get["request"]
    ))
    folder_subs["item"].append(req_verify_sub_get)

    # Verification API (POST)
    req_verify_sub_post = {
        "name": "11.4 [External Software API] Verify Subscription (POST)",
        "request": {
            "method": "POST",
            "header": make_header(auth=False),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "license_key": "9a8b7c6d-5e4f-3a2b-1c0d-ef9876543210",
                    "user_identifier": "dr_rahul"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/subscriptions/verify"),
            "description": "POST version of the subscription verification API for microservices & webhooks."
        },
        "response": []
    }
    req_verify_sub_post["response"].append(make_response_example(
        "200 OK - Verification Result",
        200, "OK",
        {
            "is_valid": True,
            "status": "active",
            "organization_id": 8,
            "organization_name": "Apollo Multi-Speciality Hospital",
            "product_id": 1,
            "product_name": "HRMSM",
            "license_count": 10,
            "used_licenses": 2,
            "available_licenses": 8,
            "user_access_granted": True,
            "external_user_id": "hrmsm_usr_a1b2c3d4e5"
        },
        req_verify_sub_post["request"]
    ))
    folder_subs["item"].append(req_verify_sub_post)
    collection["item"].append(folder_subs)

    # =========================================================================
    # FOLDER 12: Organization Users, Remote Sync & SSO Launch
    # =========================================================================
    folder_org_users = {
        "name": "12. Organization Users, Provisioning & SSO Launch",
        "description": "Complete user provisioning, seat limits, multi-product linking, and SSO launch token generation:\n- Streamlined Provisioning: calls remote API, maps user into central database, decrements 1 seat\n- Multi-Product Linking: Assign same user to CRM/ERP without duplicating central record\n- License Limit Enforcement: Prevents seat over-allocation with 400 Bad Request\n- Revoke Product: Frees up 1 license seat immediately\n- SSO Token: Generates HMAC-SHA256 signed JWT token for seamless 1-click product launch",
        "item": []
    }

    # List Org Users
    req_list_org_users = {
        "name": "12.1 List Organization Users & Active Products",
        "request": {
            "method": "GET",
            "header": make_header(auth=True, content_type=False),
            "url": make_url("api/franchise/organization-users", query=[
                {"key": "organization", "value": "{{organizationId}}"}
            ]),
            "description": "List all staff members of the organization, showing active product tags and external software IDs."
        },
        "response": []
    }
    req_list_org_users["response"].append(make_response_example(
        "200 OK - Organization Users",
        200, "OK",
        [
            {
                "id": 10,
                "organization": 8,
                "organization_name": "Apollo Multi-Speciality Hospital",
                "user_id": 30,
                "user_username": "dr_rahul",
                "user_email": "rahul.verma@apollohospital.com",
                "user_first_name": "Rahul",
                "user_last_name": "Verma",
                "role": "ORG_EMPLOYEE",
                "designation": "Chief Surgeon",
                "department": "Cardiology",
                "is_active": True,
                "external_product_ids": {
                    "HRMSM": "hrmsm_usr_9988a1b2",
                    "CRM": "crm_usr_4455c3d4"
                },
                "active_products": ["HRMSM", "CRM"]
            }
        ],
        req_list_org_users["request"]
    ))
    folder_org_users["item"].append(req_list_org_users)

    # Provision User for Product 1 (HRMS)
    req_prov_hrms = {
        "name": "12.2 [Streamlined Provisioning] Provision User into HRMSM",
        "event": [make_test_script([
            "if (pm.response.code === 201) {",
            "    const res = pm.response.json();",
            "    if (res.user && res.user.id) {",
            "        pm.collectionVariables.set('orgUserId', res.user.id);",
            "        console.log('Provisioned orgUserId:', res.user.id);",
            "    }",
            "}"
        ])],
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "username": "dr_ananya",
                    "email": "ananya.sen@apollohospital.com",
                    "first_name": "Ananya",
                    "last_name": "Sen",
                    "product_name": "HRMSM",
                    "role": "ORG_EMPLOYEE",
                    "designation": "Senior Neurologist",
                    "department": "Neurology"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/organization-users/provision"),
            "description": "One-click provisioning endpoint: Calls remote HRMS software API, creates central user & organization membership, links external ID, and deducts 1 HRMS seat. Saves {{orgUserId}}."
        },
        "response": []
    }
    req_prov_hrms["response"].append(make_response_example(
        "201 Created - User Provisioned into HRMSM",
        201, "Created",
        {
            "message": "User 'dr_ananya' successfully provisioned and linked to 'HRMSM'.",
            "user": {
                "id": 11,
                "username": "dr_ananya",
                "email": "ananya.sen@apollohospital.com",
                "organization_id": 8,
                "organization_name": "Apollo Multi-Speciality Hospital",
                "role": "ORG_EMPLOYEE",
                "designation": "Senior Neurologist",
                "department": "Neurology",
                "external_product_ids": {"HRMSM": "hrmsm_usr_sen_1002"},
                "active_products": ["HRMSM"]
            },
            "provisioned_product": {
                "product_name": "HRMSM",
                "external_user_id": "hrmsm_usr_sen_1002",
                "is_simulated": True
            },
            "subscription_status": {
                "used_licenses": 3,
                "available_licenses_remaining": 7
            }
        },
        req_prov_hrms["request"]
    ))
    folder_org_users["item"].append(req_prov_hrms)

    # Multi-Product Linking: Assign Same User into CRM
    req_prov_crm = {
        "name": "12.3 [Multi-Product Linking] Link SAME User into CRM",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "username": "dr_ananya",
                    "email": "ananya.sen@apollohospital.com",
                    "product_name": "CRM",
                    "role": "ORG_EMPLOYEE",
                    "designation": "Senior Neurologist",
                    "department": "Neurology"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/organization-users/provision"),
            "description": "Multi-Product Linking: When provision is called with existing username/email for another product (CRM), NO duplicate user is created; user is seamlessly granted access to both products."
        },
        "response": []
    }
    req_prov_crm["response"].append(make_response_example(
        "201 Created - Multi-Product Linked",
        201, "Created",
        {
            "message": "User 'dr_ananya' successfully provisioned and linked to 'CRM'.",
            "user": {
                "id": 11,
                "username": "dr_ananya",
                "email": "ananya.sen@apollohospital.com",
                "organization_id": 8,
                "organization_name": "Apollo Multi-Speciality Hospital",
                "role": "ORG_EMPLOYEE",
                "external_product_ids": {
                    "HRMSM": "hrmsm_usr_sen_1002",
                    "CRM": "crm_usr_sen_5544"
                },
                "active_products": ["HRMSM", "CRM"]
            },
            "provisioned_product": {
                "product_name": "CRM",
                "external_user_id": "crm_usr_sen_5544",
                "is_simulated": True
            },
            "subscription_status": {
                "used_licenses": 2,
                "available_licenses_remaining": 3
            }
        },
        req_prov_crm["request"]
    ))
    folder_org_users["item"].append(req_prov_crm)

    # SSO Launch Token
    req_sso_token = {
        "name": "12.4 [SSO Launch] Generate Single Sign-On Token",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "product_name": "HRMSM"
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/organization-users/{{orgUserId}}/sso-token"),
            "description": "Generates a signed SSO JWT token and redirect launch URL for 1-click authentication into the target web portal without credentials."
        },
        "response": []
    }
    req_sso_token["response"].append(make_response_example(
        "200 OK - SSO Token Generated",
        200, "OK",
        {
            "sso_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "launch_url": "https://hrms.itsoftlab360.com/auth/sso?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "product_name": "HRMSM",
            "external_user_id": "hrmsm_usr_sen_1002",
            "expires_in_seconds": 300
        },
        req_sso_token["request"]
    ))
    folder_org_users["item"].append(req_sso_token)

    # Revoke Product Access
    req_revoke_prod = {
        "name": "12.5 Revoke Product Access (Frees 1 License Seat)",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "subscription_id": 2
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/organization-users/{{orgUserId}}/revoke-product"),
            "description": "Revokes user's access to a subscribed product (CRM), immediately incrementing available licenses by 1."
        },
        "response": []
    }
    req_revoke_prod["response"].append(make_response_example(
        "200 OK - License Seat Freed",
        200, "OK",
        {
            "message": "Access revoked for CRM. 1 license freed up.",
            "available_licenses_now": 4
        },
        req_revoke_prod["request"]
    ))
    folder_org_users["item"].append(req_revoke_prod)

    # Assign Product Access Directly
    req_assign_prod = {
        "name": "12.6 Assign Product License Directly",
        "request": {
            "method": "POST",
            "header": make_header(auth=True),
            "body": {
                "mode": "raw",
                "raw": json.dumps({
                    "subscription_id": 1,
                    "external_user_id": "custom_hrms_ext_9999",
                    "permissions": {
                        "can_view_payroll": True,
                        "can_mark_attendance": True
                    }
                }, indent=2),
                "options": {"raw": {"language": "json"}}
            },
            "url": make_url("api/franchise/organization-users/{{orgUserId}}/assign-product"),
            "description": "Directly assigns a seat of an existing subscription to the specified OrganizationUser. Enforces available license limits."
        },
        "response": []
    }
    req_assign_prod["response"].append(make_response_example(
        "201 Created - License Allocated",
        201, "Created",
        {
            "message": "License successfully allocated for HRMSM.",
            "data": {
                "id": 14,
                "organization_user": 11,
                "subscription": 1,
                "product_name": "HRMSM",
                "external_user_id": "custom_hrms_ext_9999",
                "is_active": True
            },
            "available_licenses_remaining": 7
        },
        req_assign_prod["request"]
    ))
    folder_org_users["item"].append(req_assign_prod)
    collection["item"].append(folder_org_users)

    return collection

if __name__ == "__main__":
    col = build_postman_collection()
    out_path = r"f:\projects\ITSOFTLAB360\ITSOFTLAB360.postman_collection.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(col, f, indent=2)
    print(f"Successfully generated Postman collection at: {out_path}")
    print(f"Total Folders: {len(col['item'])}")
    total_reqs = sum(len(f['item']) for f in col['item'])
    print(f"Total Requests with Examples: {total_reqs}")
