"use client";

import { useGetFranchiseRequests } from "@/features/franchise-requests/hooks/useFranchiseRequests";
import { useGetFranchises } from "@/features/franchises/hooks/useFranchises";
import { useGetProducts } from "@/features/products/hooks/useProducts";
import { useGetInvoices } from "@/features/invoices/hooks/useInvoices";
import { FranchiseRequestTable } from "@/features/franchise-requests/components/FranchiseRequestTable";
import { Building2, FileText, Package, DollarSign, Users, ShieldAlert } from "lucide-react";

export function AdminDashboard() {
  const { data: requests } = useGetFranchiseRequests();
  const { data: franchises } = useGetFranchises();
  const { data: products } = useGetProducts();
  const { data: invoices } = useGetInvoices();

  const totalRequests = requests?.length || 0;
  const totalFranchises = franchises?.length || 0;
  const totalProducts = products?.length || 0;

  const totalRevenue = (invoices || [])
    .filter((i) => i.status === "paid")
    .reduce((acc, i) => acc + (parseFloat(i.amount_paid) || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">ITSOFTLAB360 Admin Portal</h1>
        <p className="text-sm text-slate-500">Master executive overview of platform metrics, franchises, and financial revenue</p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Total Franchises</p>
            <h3 className="text-xl font-black text-slate-800">{totalFranchises}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Platform Products</p>
            <h3 className="text-xl font-black text-slate-800">{totalProducts}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Onboarding Requests</p>
            <h3 className="text-xl font-black text-slate-800">{totalRequests}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Total Platform Revenue</p>
            <h3 className="text-xl font-black text-emerald-700">₹{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Main Request Control */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-800">Franchise Requests Lifecycle</h3>
        <FranchiseRequestTable userRole="Admin" />
      </div>
    </div>
  );
}
