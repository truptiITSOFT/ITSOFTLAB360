"use client";

import { useState } from "react";
import { useCreateFranchiseRequest } from "../hooks/useFranchiseRequests";
import { ProductSelector } from "@/features/products/components/ProductSelector";
import { Building, User, Mail, Phone, DollarSign, FileText, Loader2, CheckCircle } from "lucide-react";

interface FormProps {
  onSuccess?: () => void;
}

export function FranchiseRequestForm({ onSuccess }: FormProps) {
  const [proposedFranchiseName, setProposedFranchiseName] = useState("");
  const [proposedAddress, setProposedAddress] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [quotedAmount, setQuotedAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  const createMutation = useCreateFranchiseRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");

    if (selectedProductIds.length === 0) {
      alert("Please select at least one product for the franchise.");
      return;
    }

    try {
      await createMutation.mutateAsync({
        proposed_franchise_name: proposedFranchiseName,
        proposed_address: proposedAddress,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        quoted_amount: quotedAmount,
        notes: notes,
        products: selectedProductIds,
      });

      setSuccessMsg("Franchise request created successfully.");
      setProposedFranchiseName("");
      setProposedAddress("");
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setQuotedAmount("");
      setNotes("");
      setSelectedProductIds([]);

      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Create New Franchise Request</h3>
          <p className="text-xs text-slate-500">Initiate onboarding for a prospective franchise partner</p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center space-x-2 text-sm font-medium">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {createMutation.isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {createMutation.error?.message || "Failed to create franchise request."}
        </div>
      )}

      {/* Section 1: Franchise Info */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Franchise Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Proposed Franchise Name *</label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={proposedFranchiseName}
                onChange={(e) => setProposedFranchiseName(e.target.value)}
                placeholder="e.g. ABC Technologies Pvt Ltd"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Proposed Location / Address *</label>
            <input
              type="text"
              required
              value={proposedAddress}
              onChange={(e) => setProposedAddress(e.target.value)}
              placeholder="e.g. Indore, Madhya Pradesh"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Client Info */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Client Contact Person *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Client Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="client@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Client Phone</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Commercials */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Commercial Offer</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Quoted Deal Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              value={quotedAmount}
              onChange={(e) => setQuotedAmount(e.target.value)}
              placeholder="250000.00"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Special Notes / Requirements</label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Client requested custom domain support"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Product Selection */}
      <div className="pt-2">
        <ProductSelector selectedIds={selectedProductIds} onChange={setSelectedProductIds} />
      </div>

      {/* Submit button */}
      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          {createMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <span>Submit Franchise Request</span>
          )}
        </button>
      </div>
    </form>
  );
}
