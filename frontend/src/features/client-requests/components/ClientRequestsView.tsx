"use client";

import React, { useState } from "react";
import {
  FileText,
  Plus,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  DollarSign,
  Shield,
  Loader2,
  AlertCircle,
  Mail,
  UserCheck,
  ChevronRight,
  ExternalLink,
  Layers,
} from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { useGetProducts } from "@/features/products/hooks/useProducts";
import {
  useGetClientRequests,
  useCreateClientRequest,
  useGenerateClientInvoice,
  useSendClientInvoiceEmail,
  useMarkClientInvoicePaid,
  useFulfillClientRequest,
} from "../hooks/useClientRequests";
import { ClientLicenseRequest } from "../types";

export function ClientRequestsView() {
  const { user, franchiseRole } = useAuth();
  const currentRole = franchiseRole || "FRANCHISE_ADMIN";

  const { data: requests = [], isLoading, error } = useGetClientRequests();
  const { data: allProducts = [] } = useGetProducts();

  const createRequestMutation = useCreateClientRequest();
  const generateInvoiceMutation = useGenerateClientInvoice();
  const sendEmailMutation = useSendClientInvoiceEmail();
  const markPaidMutation = useMarkClientInvoicePaid();
  const fulfillMutation = useFulfillClientRequest();

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isFulfillOpen, setIsFulfillOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ClientLicenseRequest | null>(null);

  // New Request Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [customerGstin, setCustomerGstin] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedProductItems, setSelectedProductItems] = useState<
    { product: number; license_count: number; duration_months: number }[]
  >([]);

  // Fulfill Form State (Defaulting to user's desired demo: rata.tata / rata.tata)
  const [orgAdminUsername, setOrgAdminUsername] = useState("rata.tata");
  const [orgAdminPassword, setOrgAdminPassword] = useState("rata.tata");
  const [orgAdminEmail, setOrgAdminEmail] = useState("ratan.tata@tcs.com");
  const [orgAdminFirstName, setOrgAdminFirstName] = useState("Ratan");
  const [orgAdminLastName, setOrgAdminLastName] = useState("Tata");

  // Success / Action feedback
  const [feedback, setFeedback] = useState<string | null>(null);

  const canSalesAct = ["FRANCHISE_SALES", "FRANCHISE_ADMIN"].includes(currentRole);
  const canAccountantAct = ["FRANCHISE_ACCOUNTANT", "FRANCHISE_FINANCE", "FRANCHISE_ADMIN"].includes(currentRole);
  const canItAct = ["FRANCHISE_IT", "FRANCHISE_ADMIN"].includes(currentRole);

  const handleToggleProduct = (productId: number) => {
    if (selectedProductItems.some((item) => item.product === productId)) {
      setSelectedProductItems(selectedProductItems.filter((item) => item.product !== productId));
    } else {
      setSelectedProductItems([
        ...selectedProductItems,
        { product: productId, license_count: 10, duration_months: 12 },
      ]);
    }
  };

  const handleUpdateProductSeats = (productId: number, count: number) => {
    setSelectedProductItems(
      selectedProductItems.map((item) =>
        item.product === productId ? { ...item, license_count: Math.max(1, count) } : item
      )
    );
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationName || !clientName || !clientEmail || selectedProductItems.length === 0) {
      alert("Please enter organization name, client details, and select at least 1 product.");
      return;
    }

    try {
      await createRequestMutation.mutateAsync({
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        organization_name: organizationName,
        billing_address: billingAddress,
        city: city,
        state: stateName,
        pincode: pincode,
        customer_gstin: customerGstin,
        notes: notes,
        items: selectedProductItems,
      });

      setFeedback(`Subscription request for '${organizationName}' created successfully! Forwarded to Accountant for review.`);
      setIsCreateOpen(false);
      // Reset form
      setClientName("");
      setClientEmail("");
      setOrganizationName("");
      setSelectedProductItems([]);
    } catch (err: any) {
      alert(err?.data?.detail || err?.message || "Failed to create subscription request");
    }
  };

  const handleGenerateInvoice = async (request: ClientLicenseRequest) => {
    try {
      const res: any = await generateInvoiceMutation.mutateAsync(request.id);
      setFeedback(`Client Invoice generated successfully for ${request.organization_name}! Ready to send email.`);
    } catch (err: any) {
      alert(err?.data?.detail || err?.message || "Failed to generate invoice");
    }
  };

  const handleSendInvoiceEmail = async (request: ClientLicenseRequest) => {
    if (!request.invoice) return;
    try {
      await sendEmailMutation.mutateAsync({
        invoiceId: request.invoice,
        email: request.client_email,
      });
      setFeedback(`Invoice email successfully dispatched to ${request.client_email} for payment!`);
    } catch (err: any) {
      alert(err?.data?.detail || err?.message || "Failed to send invoice email");
    }
  };

  const handleMarkPaid = async (request: ClientLicenseRequest) => {
    if (!request.invoice) return;
    try {
      await markPaidMutation.mutateAsync({
        invoiceId: request.invoice,
        paymentMethod: "bank_transfer",
        reference: "NEFT_CLIENT_PAYMENT",
      });
      setFeedback(`Payment recorded for ${request.organization_name}! Status marked as Paid (Handoff to IT).`);
    } catch (err: any) {
      alert(err?.data?.detail || err?.message || "Failed to record payment");
    }
  };

  const handleFulfillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    try {
      await fulfillMutation.mutateAsync({
        requestId: selectedRequest.id,
        data: {
          org_admin_username: orgAdminUsername,
          org_admin_email: orgAdminEmail,
          org_admin_password: orgAdminPassword,
          org_admin_first_name: orgAdminFirstName,
          org_admin_last_name: orgAdminLastName,
        },
      });

      setFeedback(
        `Organization '${selectedRequest.organization_name}' provisioned successfully! Org Admin '${orgAdminUsername}' created.`
      );
      setIsFulfillOpen(false);
      setSelectedRequest(null);
    } catch (err: any) {
      alert(err?.data?.detail || err?.message || "Failed to fulfill request");
    }
  };

  const openFulfillDialog = (req: ClientLicenseRequest) => {
    setSelectedRequest(req);
    // Prefill with requested org details
    if (req.organization_name.toLowerCase() === "tcs") {
      setOrgAdminUsername("rata.tata");
      setOrgAdminPassword("rata.tata");
      setOrgAdminEmail("ratan.tata@tcs.com");
      setOrgAdminFirstName("Ratan");
      setOrgAdminLastName("Tata");
    } else {
      const sanitized = req.organization_name.toLowerCase().replace(/[^a-z0-9]/g, "");
      setOrgAdminUsername(`admin_${sanitized}`);
      setOrgAdminPassword("AdminPass123!");
      setOrgAdminEmail(req.client_email);
      setOrgAdminFirstName(req.client_name.split(" ")[0] || "Admin");
      setOrgAdminLastName(req.client_name.split(" ")[1] || "User");
    }
    setIsFulfillOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Role & Action Pipeline */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-7 rounded-2xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              Franchise Role: {currentRole}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Client Subscriptions & Lifecycle Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Divided Franchise Team Workflow: Sales raises client requests ➔ Accountant invoices & verifies payment ➔ IT provisions the Organization & Org Admin.
          </p>
        </div>

        {canSalesAct && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-all self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Raise Client Request</span>
          </button>
        )}
      </div>

      {/* 2. Visual Stepper / Role Responsibility Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <h4 className="text-xs font-black tracking-wider uppercase text-slate-400 mb-3">
          Franchise Role Division Pipeline
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div
            className={`p-3.5 rounded-xl border flex flex-col justify-between ${
              currentRole === "FRANCHISE_SALES"
                ? "bg-blue-50 dark:bg-blue-950/40 border-blue-400 ring-2 ring-blue-400/20"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
            }`}
          >
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase">Step 1 • Sales</span>
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                Raise Subscription Request
              </h5>
              <p className="text-[11px] text-slate-500 mt-1">
                Enter client details, select software (HRMSM, SFA, etc.), and specify user limits.
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-2">Active: priya.tiwari</span>
          </div>

          <div
            className={`p-3.5 rounded-xl border flex flex-col justify-between ${
              currentRole === "FRANCHISE_ACCOUNTANT"
                ? "bg-amber-50 dark:bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/20"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
            }`}
          >
            <div>
              <span className="text-[10px] font-bold text-amber-600 uppercase">Step 2 • Accountant</span>
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                Generate Invoice & Email
              </h5>
              <p className="text-[11px] text-slate-500 mt-1">
                Calculate total subscription cost, generate invoice, and dispatch email to client.
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-2">Active: ashutosh.dhyande</span>
          </div>

          <div
            className={`p-3.5 rounded-xl border flex flex-col justify-between ${
              currentRole === "FRANCHISE_ACCOUNTANT"
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-400/20"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
            }`}
          >
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Step 3 • Payment</span>
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                Record Payment (Mark Paid)
              </h5>
              <p className="text-[11px] text-slate-500 mt-1">
                Accountant confirms bank/UPI payment and transitions request to Paid for IT.
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-2">Active: ashutosh.dhyande</span>
          </div>

          <div
            className={`p-3.5 rounded-xl border flex flex-col justify-between ${
              currentRole === "FRANCHISE_IT"
                ? "bg-purple-50 dark:bg-purple-950/40 border-purple-400 ring-2 ring-purple-400/20"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
            }`}
          >
            <div>
              <span className="text-[10px] font-bold text-purple-600 uppercase">Step 4 • IT Fulfillment</span>
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                Provision Org & Org Admin
              </h5>
              <p className="text-[11px] text-slate-500 mt-1">
                Creates the Organization & allocates product subscriptions & Org Admin (rata.tata).
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-2">Active: harshit.nigam</span>
          </div>
        </div>
      </div>

      {/* Action Feedback Banner */}
      {feedback && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{feedback}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 3. Requests Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Client Subscription Requests ({requests.length})
            </h3>
            <p className="text-xs text-slate-500">
              Track lifecycle from initial sales proposal to payment and IT fulfillment.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
            <span className="text-xs">Loading client requests...</span>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Building2 className="w-10 h-10 mx-auto text-slate-400 mb-2" />
            <p className="font-semibold text-sm">No Client Subscription Requests Yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Sales team members can raise requests to onboard client organizations.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Req # / Org</th>
                  <th className="p-4">Client Contact</th>
                  <th className="p-4">Requested Products & Seats</th>
                  <th className="p-4">Quoted / Inv Amount</th>
                  <th className="p-4">Lifecycle Status</th>
                  <th className="p-4 text-right">Role Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {requests.map((req) => {
                  const isPending = req.status === "pending";
                  const isInvGenerated = req.status === "invoice_generated";
                  const isPaid = req.status === "paid";
                  const isProvisioned = req.status === "provisioned";

                  return (
                    <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      {/* Org Name */}
                      <td className="p-4">
                        <div className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wide">
                          {req.organization_name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Req #{req.id} • Raised by {req.requested_by_username || "Sales"}
                        </div>
                      </td>

                      {/* Client Contact */}
                      <td className="p-4 space-y-0.5">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {req.client_name}
                        </div>
                        <div className="text-slate-500 text-[11px]">{req.client_email}</div>
                        {req.client_phone && (
                          <div className="text-slate-400 text-[11px]">{req.client_phone}</div>
                        )}
                      </td>

                      {/* Products & Seats */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {req.items && req.items.length > 0 ? (
                            req.items.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold text-[11px]"
                              >
                                {item.product_name || `Product #${item.product}`} &mdash;{" "}
                                <strong>{item.license_count} seats</strong>
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400">None specified</span>
                          )}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="p-4">
                        <div className="font-bold text-slate-800 dark:text-slate-100">
                          ₹{req.quoted_amount ? Number(req.quoted_amount).toLocaleString("en-IN") : "0"}
                        </div>
                        {req.invoice_number && (
                          <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">
                            Inv #{req.invoice_number}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {isPending && (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                            <Clock className="w-3 h-3" />
                            <span>Pending Review</span>
                          </span>
                        )}
                        {isInvGenerated && (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                            <Mail className="w-3 h-3" />
                            <span>Invoice Generated</span>
                          </span>
                        )}
                        {isPaid && (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                            <DollarSign className="w-3 h-3" />
                            <span>Paid - Ready for IT</span>
                          </span>
                        )}
                        {isProvisioned && (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active Organization</span>
                          </span>
                        )}
                      </td>

                      {/* Action Buttons based on role & status */}
                      <td className="p-4 text-right space-x-2">
                        {/* Step 2: Accountant Generates Invoice */}
                        {isPending && canAccountantAct && (
                          <button
                            onClick={() => handleGenerateInvoice(req)}
                            disabled={generateInvoiceMutation.isPending}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-[11px] shadow-sm transition-all"
                          >
                            Generate Invoice
                          </button>
                        )}

                        {/* Step 2b: Accountant Sends Email to Client */}
                        {isInvGenerated && canAccountantAct && (
                          <>
                            <button
                              onClick={() => handleSendInvoiceEmail(req)}
                              disabled={sendEmailMutation.isPending}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] shadow-sm transition-all"
                            >
                              Send Mail to Client
                            </button>
                            <button
                              onClick={() => handleMarkPaid(req)}
                              disabled={markPaidMutation.isPending}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] shadow-sm transition-all"
                            >
                              Mark Paid
                            </button>
                          </>
                        )}

                        {/* Step 4: IT Fulfills Paid Request */}
                        {isPaid && canItAct && (
                          <button
                            onClick={() => openFulfillDialog(req)}
                            disabled={fulfillMutation.isPending}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[11px] shadow-sm transition-all"
                          >
                            Fulfill & Provision Org
                          </button>
                        )}

                        {/* Completed Status */}
                        {isProvisioned && (
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            Provisioned by IT
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 4. MODAL: Create Client Subscription Request (Sales)                */}
      {/* ==================================================================== */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title={
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-blue-500" />
            <span>Raise Client Subscription Request (Sales)</span>
          </div>
        }
        subtitle="Specify prospective organization, client contact details, and required software modules with user seat limits."
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleCreateRequest} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Organization Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="e.g. tcs or Apollo Healthcare"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Client Contact Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Tata Consultancy Services"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Client Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="e.g. contact@tcs.com"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Client Phone
              </label>
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>
          </div>

          {/* Software Products & User Seat Limits */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Select Required Software Modules & User Limits <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
              {allProducts.map((p) => {
                const isSelected = selectedProductItems.some((item) => item.product === p.id);
                const currentItem = selectedProductItems.find((item) => item.product === p.id);

                return (
                  <div
                    key={p.id}
                    className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                      isSelected
                        ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-400"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleProduct(p.id)}
                          className="rounded text-blue-600"
                        />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {p.name}
                        </span>
                      </label>
                      <span className="text-[10px] font-semibold text-slate-500">
                        ₹{p.subscription_price_per_user || p.price} / user
                      </span>
                    </div>

                    {isSelected && (
                      <div className="mt-2 flex items-center justify-between text-xs pt-1 border-t border-blue-200 dark:border-blue-900/60">
                        <span className="text-[11px] text-slate-600 dark:text-slate-400">
                          Seat Quota:
                        </span>
                        <input
                          type="number"
                          min={1}
                          max={500}
                          value={currentItem?.license_count || 10}
                          onChange={(e) =>
                            handleUpdateProductSeats(p.id, parseInt(e.target.value) || 1)
                          }
                          className="w-20 px-2 py-1 text-xs text-right bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-800 rounded-lg font-bold"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createRequestMutation.isPending}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
            >
              {createRequestMutation.isPending ? "Creating Request..." : "Submit to Accountant"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ==================================================================== */}
      {/* 5. MODAL: IT Fulfill Request & Provision Organization               */}
      {/* ==================================================================== */}
      <Modal
        isOpen={isFulfillOpen}
        onClose={() => setIsFulfillOpen(false)}
        title={
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-purple-500" />
            <span>IT Fulfillment: Provision Organization & Admin</span>
          </div>
        }
        subtitle={`Creates organization '${selectedRequest?.organization_name}', allocates software licenses, and creates the Organization Admin account.`}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleFulfillSubmit} className="space-y-4">
          <div className="p-3.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 rounded-xl text-xs text-purple-900 dark:text-purple-300">
            <span className="font-bold">Ready to Provision: </span>
            Organization <strong>{selectedRequest?.organization_name}</strong> with{" "}
            {selectedRequest?.items?.length || 0} subscribed software modules.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Org Admin Username <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={orgAdminUsername}
                onChange={(e) => setOrgAdminUsername(e.target.value)}
                placeholder="e.g. rata.tata"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Org Admin Password <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={orgAdminPassword}
                onChange={(e) => setOrgAdminPassword(e.target.value)}
                placeholder="e.g. rata.tata"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                First Name
              </label>
              <input
                type="text"
                value={orgAdminFirstName}
                onChange={(e) => setOrgAdminFirstName(e.target.value)}
                placeholder="e.g. Ratan"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Last Name
              </label>
              <input
                type="text"
                value={orgAdminLastName}
                onChange={(e) => setOrgAdminLastName(e.target.value)}
                placeholder="e.g. Tata"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Org Admin Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={orgAdminEmail}
              onChange={(e) => setOrgAdminEmail(e.target.value)}
              placeholder="e.g. ratan.tata@tcs.com"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              required
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsFulfillOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={fulfillMutation.isPending}
              className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl flex items-center space-x-2"
            >
              {fulfillMutation.isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Provisioning Organization...</span>
                </>
              ) : (
                <span>Complete IT Fulfillment</span>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
