"use client";

import { useState, Suspense } from "react";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SalesDashboard } from "@/features/dashboard/components/SalesDashboard";
import { AccountantDashboard } from "@/features/dashboard/components/AccountantDashboard";
import { ITDashboard } from "@/features/dashboard/components/ITDashboard";
import { AdminDashboard } from "@/features/dashboard/components/AdminDashboard";
import { FranchiseAdminDashboard } from "@/features/dashboard/components/FranchiseAdminDashboard";
import { ProductTable } from "@/features/products/components/ProductTable";
import { FranchiseRequestTable } from "@/features/franchise-requests/components/FranchiseRequestTable";
import { InvoiceTable } from "@/features/invoices/components/InvoiceTable";
import { FranchiseTable } from "@/features/franchises/components/FranchiseTable";
import { OrganizationUsersView } from "@/features/organization-users/components/UI/OrganizationUsersView";
import { FranchiseUserTable } from "@/features/franchise-users/components/FranchiseUserTable";
import { InternalTeamTable } from "@/features/users/components/InternalTeamTable";
import { SaasUserDashboard } from "@/features/dashboard/components/SaasUserDashboard";
import { ClientRequestsView } from "@/features/client-requests/components/ClientRequestsView";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function DashboardContent() {
  const { user, isFranchiseUser, franchiseRole, isSaasUser, isOrgAdmin } = useAuth();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const userRole = user?.role || "Admin";

  const renderContent = () => {
    // 1. SaaS End User Launchpad (Direct Single Sign-On into assigned tools)
    if (isSaasUser) {
      return <SaasUserDashboard user={user} />;
    }

    // 2. Organization Admin
    if (isOrgAdmin) {
      if (activeTab === "products") {
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Organization Subscribed Software</h2>
              <p className="text-xs text-slate-500">Software modules and license quotas active for your organization.</p>
            </div>
            <ProductTable canManage={false} />
          </div>
        );
      }
      return <OrganizationUsersView />;
    }

    if (activeTab === "client-requests") {
      return <ClientRequestsView />;
    }

    if (activeTab === "org-users" || activeTab === "licenses") {
      return <OrganizationUsersView />;
    }

    if (isFranchiseUser) {
      if (activeTab === "client-requests") {
        return <ClientRequestsView />;
      }

      if (activeTab === "franchise-team" || activeTab === "team") {
        return <FranchiseUserTable />;
      }


      if (activeTab === "products") {
        return (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Allocated Products & Subscriptions</h2>
                <p className="text-xs text-slate-500">Products allotted to your franchise by ITSOFTLAB360 with per-user subscription pricing.</p>
              </div>
            </div>
            <ProductTable canManage={false} />
          </div>
        );
      }
      return <FranchiseAdminDashboard franchiseName={user?.franchise_name} role={franchiseRole} />;
    }

    // Role-specific Tab Security Guards
    if (activeTab === "internal-team" || (activeTab === "team" && userRole === "Admin")) {
      return <InternalTeamTable />;
    }
    if (activeTab === "products") {
      const canView = ["Admin", "IT", "Sales", "Accountant"].includes(userRole);
      if (!canView) return renderOverviewByRole(userRole);

      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Products Catalog</h2>
          <ProductTable canManage={userRole === "IT" || userRole === "Admin"} />
        </div>
      );
    }

    if (activeTab === "requests") {
      const canView = ["Admin", "Sales", "Accountant"].includes(userRole);
      if (!canView) return renderOverviewByRole(userRole);

      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Franchise Requests Management</h2>
          <FranchiseRequestTable userRole={userRole} />
        </div>
      );
    }

    if (activeTab === "invoices") {
      const canView = ["Admin", "Accountant"].includes(userRole);
      if (!canView) return renderOverviewByRole(userRole);

      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Invoices & Financial Management</h2>
          <InvoiceTable userRole={userRole} />
        </div>
      );
    }

    if (activeTab === "franchises") {
      const canView = ["Admin", "IT"].includes(userRole);
      if (!canView) return renderOverviewByRole(userRole);

      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Active Franchises Directory</h2>
          <FranchiseTable userRole={userRole} />
        </div>
      );
    }

    return renderOverviewByRole(userRole);
  };

  const renderOverviewByRole = (role: string) => {
    switch (role) {
      case "Sales":
        return <SalesDashboard />;
      case "Accountant":
        return <AccountantDashboard />;
      case "IT":
        return <ITDashboard />;
      case "Admin":
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">
      <Sidebar
        currentRole={userRole}
        isFranchiseUser={isFranchiseUser}
        isSaasUser={isSaasUser}
        isOrgAdmin={isOrgAdmin}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentRole={
            isSaasUser
              ? "SaaS Portal"
              : isOrgAdmin
              ? "Org Admin"
              : isFranchiseUser
              ? (franchiseRole || "Franchise")
              : userRole
          }
        />
        <main className="p-6 flex-1 max-w-7xl w-full mx-auto">{renderContent()}</main>
      </div>
    </div>
  );

}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-2" />
          <span>Loading portal workspace...</span>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
