"use client";

import { useState } from "react";
import { useGetFranchiseRequests } from "@/features/franchise-requests/hooks/useFranchiseRequests";
import { FranchiseRequestTable } from "@/features/franchise-requests/components/FranchiseRequestTable";
import { FranchiseRequestForm } from "@/features/franchise-requests/components/FranchiseRequestForm";
import { FileText, Clock, CheckCircle2, DollarSign, PlusCircle } from "lucide-react";

export function SalesDashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data: requests } = useGetFranchiseRequests();

  const totalRequests = requests?.length || 0;
  const pendingRequests = requests?.filter((r) => r.status === "pending").length || 0;
  const approvedRequests = requests?.filter((r) => r.status === "approved").length || 0;
  const paidRequests = requests?.filter((r) => r.status === "paid").length || 0;
  const completedRequests = requests?.filter((r) => r.status === "completed").length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Sales Dashboard</h1>
          <p className="text-sm text-slate-500">Manage franchise onboarding requests and client pipelines</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 flex items-center space-x-2 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showCreateForm ? "View All Requests" : "New Franchise Request"}</span>
        </button>
      </div>

      {/* Real Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Total Requests</p>
            <h3 className="text-xl font-black text-slate-800">{totalRequests}</h3>
          </div>
        </div>

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
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Approved (Invoice)</p>
            <h3 className="text-xl font-black text-slate-800">{approvedRequests}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Paid (Ready for IT)</p>
            <h3 className="text-xl font-black text-slate-800">{paidRequests}</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Completed</p>
            <h3 className="text-xl font-black text-slate-800">{completedRequests}</h3>
          </div>
        </div>
      </div>

      {/* Main View */}
      {showCreateForm ? (
        <FranchiseRequestForm onSuccess={() => setShowCreateForm(false)} />
      ) : (
        <FranchiseRequestTable userRole="Sales" onOpenCreate={() => setShowCreateForm(true)} />
      )}
    </div>
  );
}
