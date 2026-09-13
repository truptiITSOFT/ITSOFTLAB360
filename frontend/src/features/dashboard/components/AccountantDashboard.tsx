"use client";

import { useGetFranchiseRequests } from "@/features/franchise-requests/hooks/useFranchiseRequests";
import { useGetInvoices } from "@/features/invoices/hooks/useInvoices";
import { FranchiseRequestTable } from "@/features/franchise-requests/components/FranchiseRequestTable";

import { FileText, Clock, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";

export function AccountantDashboard() {
  const { data: requests } = useGetFranchiseRequests();
  const { data: invoices } = useGetInvoices();

  const pendingRequests = requests?.filter((r) => r.status === "pending").length || 0;
  const totalInvoices = invoices?.length || 0;
  const paidInvoices = invoices?.filter((i) => i.status === "paid").length || 0;
  
  const totalRevenue = (invoices || [])
    .filter((i) => i.status === "paid")
    .reduce((acc, i) => acc + (parseFloat(i.amount_paid) || 0), 0);

  const pendingPaymentSum = (invoices || [])
    .filter((i) => i.status !== "paid" && i.status !== "cancelled")
    .reduce((acc, i) => acc + (parseFloat(i.balance_due) || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Accountant Dashboard</h1>
        <p className="text-sm text-slate-500">Review prospective requests, issue invoices, and record client payments</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Pending Review</p>
            <h3 className="text-xl font-black text-slate-800">{pendingRequests}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Total Invoices</p>
            <h3 className="text-xl font-black text-slate-800">{totalInvoices}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Total Collected</p>
            <h3 className="text-xl font-black text-emerald-700">₹{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Pending Receivables</p>
            <h3 className="text-xl font-black text-red-700">₹{pendingPaymentSum.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Main Request Table with Accountant Action Controls */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-800">Franchise Requests Review & Invoicing</h3>
        <FranchiseRequestTable userRole="Accountant" />
      </div>
    </div>
  );
}
