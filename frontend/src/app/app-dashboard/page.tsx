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
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function DashboardContent() {
  const { user, isFranchiseUser, franchiseRole } = useAuth();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const userRole = user?.role || "Admin";

  const renderContent = () => {
    if (isFranchiseUser) {
      if (activeTab === "products") return <ProductTable />;
      return <FranchiseAdminDashboard franchiseName={user?.franchise_name} role={franchiseRole} />;
    }

    // Role-specific Tab Security Guards
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
      <Sidebar currentRole={userRole} isFranchiseUser={isFranchiseUser} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header currentRole={isFranchiseUser ? (franchiseRole || "Franchise") : userRole} />
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
