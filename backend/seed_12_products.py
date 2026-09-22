import os
import django
from decimal import Decimal

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from users.models import Products

PRODUCTS_DATA = [
    {
        "code": "hrms",
        "name": "HRMSM",
        "description": "Human Resource Management & Attendance System",
        "route": "hrmsm.itsoftlab360.com",
        "price": Decimal("15000.00"),
        "subscription_price_per_user": Decimal("1200.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "erp",
        "name": "ERP",
        "description": "Enterprise Resource Planning",
        "route": "erp.itsoftlab360.com",
        "price": Decimal("25000.00"),
        "subscription_price_per_user": Decimal("2400.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "crm",
        "name": "CRM",
        "description": "Customer Relationship Management",
        "route": "crm.itsoftlab360.com",
        "price": Decimal("12000.00"),
        "subscription_price_per_user": Decimal("1000.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "pos",
        "name": "POS",
        "description": "Point of Sale Billing & Counter Suite",
        "route": "pos.itsoftlab360.com",
        "price": Decimal("8000.00"),
        "subscription_price_per_user": Decimal("600.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "qms",
        "name": "QMS",
        "description": "Queue Management System",
        "route": "qms.itsoftlab360.com",
        "price": Decimal("7000.00"),
        "subscription_price_per_user": Decimal("500.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "ai",
        "name": "AI Automation",
        "description": "AI Automation & Chat Assistant Engine",
        "route": "ai.itsoftlab360.com",
        "price": Decimal("20000.00"),
        "subscription_price_per_user": Decimal("1800.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "sfa",
        "name": "SFA",
        "description": "Sales Force Automation & Territory Tracking",
        "route": "sfa.itsoftlab360.com",
        "price": Decimal("10000.00"),
        "subscription_price_per_user": Decimal("800.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "supply-chain",
        "name": "Supply Chain",
        "description": "Supply Chain & Logistics Tracking",
        "route": "supplychain.itsoftlab360.com",
        "price": Decimal("18000.00"),
        "subscription_price_per_user": Decimal("1500.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "vms",
        "name": "VMS",
        "description": "Vendor Management System",
        "route": "vms.itsoftlab360.com",
        "price": Decimal("9000.00"),
        "subscription_price_per_user": Decimal("750.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "lms",
        "name": "LMS",
        "description": "Learning Management System",
        "route": "lms.itsoftlab360.com",
        "price": Decimal("11000.00"),
        "subscription_price_per_user": Decimal("900.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "doms",
        "name": "DoMS",
        "description": "Document Management System",
        "route": "doms.itsoftlab360.com",
        "price": Decimal("6000.00"),
        "subscription_price_per_user": Decimal("500.00"),
        "billing_cycle": "yearly",
    },
    {
        "code": "dms",
        "name": "DMS",
        "description": "Dealer Management System",
        "route": "dms.itsoftlab360.com",
        "price": Decimal("14000.00"),
        "subscription_price_per_user": Decimal("1100.00"),
        "billing_cycle": "yearly",
    },
]

def seed():
    created_count = 0
    updated_count = 0
    for data in PRODUCTS_DATA:
        # Match by name or code
        prod, created = Products.objects.get_or_create(
            name=data["name"],
            defaults=data
        )
        if created:
            created_count += 1
            print(f"Created: {prod.name} (route: {prod.route})")
        else:
            # Update code, route, pricing if empty
            prod.code = data["code"]
            prod.route = data["route"]
            prod.description = data["description"]
            if not prod.subscription_price_per_user:
                prod.subscription_price_per_user = data["subscription_price_per_user"]
            prod.billing_cycle = data["billing_cycle"]
            prod.save()
            updated_count += 1
            print(f"Updated: {prod.name} (route: {prod.route})")

    print(f"\nSeeding complete. Created: {created_count}, Updated: {updated_count}. Total Products: {Products.objects.count()}")

if __name__ == "__main__":
    seed()
