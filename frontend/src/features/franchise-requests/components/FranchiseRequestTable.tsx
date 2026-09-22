"use client";

import { useState } from "react";
import { FranchiseRequest, FranchiseRequestStatus } from "../types";
import { useGetFranchiseRequests, useApproveFranchiseRequest } from "../hooks/useFranchiseRequests";
import { FranchiseRequestDetailsModal } from "./FranchiseRequestDetailsModal";
import { Search, Filter, Eye, Loader2, CheckCircle2, Receipt, Mail } from "lucide-react";

interface TableProps {
  userRole?: string;
  onOpenCreate?: () => void;
}

export function FranchiseRequestTable({ userRole, onOpenCreate }: TableProps) {
  const { data: requests, isLoading, error } = useGetFranchiseRequests();
  const approveMutation = useApproveFranchiseRequest();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<FranchiseRequest | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const normalizedRole = (userRole || "").toLowerCase();
  const isAccountantOrAdmin = normalizedRole === "accountant" || normalizedRole === "admin";

  const filteredRequests = (requests || []).filter((req) => {
    const matchesSearch =
      req.proposed_franchise_name.toLowerCase().includes(search.toLowerCase()) ||
      req.client_name.toLowerCase().includes(search.toLowerCase()) ||
      (req.client_email && req.client_email.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" || req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: FranchiseRequestStatus) => {
    switch (status) {
      case "pending":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">Pending Review</span>;
      case "approved":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">Approved</span>;
      case "paid":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">Paid (Ready for IT)</span>;
      case "completed":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Completed</span>;
      case "rejected":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">Rejected</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  const handleQuickAccept = async (req: FranchiseRequest, e: React.MouseEvent) => {
    e.stopPropagation();
    setProcessingId(req.id);
    try {
      await approveMutation.mutateAsync({
        id: req.id,
        data: { quoted_amount: req.quoted_amount || "0" },
      });
      alert(`Franchise request #${req.id} (${req.proposed_franchise_name}) approved successfully! You can now create an invoice.`);
    } catch (err: any) {
      alert(err.message || "Failed to approve request.");
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
        <span>Loading franchise requests...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
        Failed to load franchise requests: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by franchise name, client name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex items-center">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid (Ready for IT)</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Franchise Name</th>
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Quoted Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Invoice</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No franchise requests match your criteria.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">#{req.id}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{req.proposed_franchise_name}</td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <div>{req.client_name}</div>
                      <div className="text-xs text-slate-400">{req.client_email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">₹{req.quoted_amount || "0.00"}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(req.status)}</td>
                    <td className="py-3.5 px-4">
                      {req.invoice ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                          #{req.invoice.invoice_number}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No Invoice</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {new Date(req.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {/* Direct Accountant/Admin Action Buttons in Table Row */}
                      {isAccountantOrAdmin && req.status === "pending" && (
                        <>
                          <button
                            onClick={(e) => handleQuickAccept(req, e)}
                            disabled={processingId === req.id}
                            title="Accept Franchise Request"
                            className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs rounded-lg inline-flex items-center space-x-1 transition-all"
                          >
                            {processingId === req.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            )}
                            <span>Accept</span>
                          </button>

                          <button
                            onClick={() => setSelectedRequest(req)}
                            title="Accept & Create Invoice"
                            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg inline-flex items-center space-x-1 shadow-sm transition-all"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                            <span>Create Invoice</span>
                          </button>
                        </>
                      )}

                      {isAccountantOrAdmin && req.status === "approved" && !req.invoice && (
                        <button
                          onClick={() => setSelectedRequest(req)}
                          title="Create Invoice for Approved Request"
                          className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg inline-flex items-center space-x-1 shadow-sm transition-all"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Create Invoice</span>
                        </button>
                      )}

                      {isAccountantOrAdmin && req.invoice && (
                        <button
                          onClick={() => setSelectedRequest(req)}
                          title="Send Invoice to Client Email"
                          className="px-2.5 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-xs rounded-lg inline-flex items-center space-x-1 transition-all"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Send Email</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg inline-flex items-center space-x-1 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRequest && (
        <FranchiseRequestDetailsModal
          request={selectedRequest}
          userRole={userRole}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}
