"use client";

import { useGetFranchiseRequests } from "@/features/franchise-requests/hooks/useFranchiseRequests";
import { useGetFranchises } from "@/features/franchises/hooks/useFranchises";
import { useGetProducts } from "@/features/products/hooks/useProducts";
import { FranchiseRequestTable } from "@/features/franchise-requests/components/FranchiseRequestTable";
import { CheckCircle2, Building2, Package, ShieldCheck } from "lucide-react";

export function ITDashboard() {
  const { data: requests } = useGetFranchiseRequests();
  const { data: franchises } = useGetFranchises();
  const { data: products } = useGetProducts();

  const paidRequests = requests?.filter((r) => r.status === "paid").length || 0;
  const completedRequests = requests?.filter((r) => r.status === "completed").length || 0;
  const activeFranchises = franchises?.filter((f) => f.is_active).length || 0;
  const totalProducts = products?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">IT Dashboard</h1>
        <p className="text-sm text-slate-500">Provision paid franchises, issue credentials, and manage platform products</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3 ring-2 ring-blue-500/20">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Ready for IT (Paid)</p>
            <h3 className="text-xl font-black text-slate-800">{paidRequests}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Completed Onboarding</p>
            <h3 className="text-xl font-black text-slate-800">{completedRequests}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Active Franchises</p>
            <h3 className="text-xl font-black text-slate-800">{activeFranchises}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">System Products</p>
            <h3 className="text-xl font-black text-slate-800">{totalProducts}</h3>
          </div>
        </div>
      </div>

      {/* Main Table for IT */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-800">All Franchise</h3>
        <FranchiseRequestTable userRole="IT" />
      </div>
    </div>
  );
}
