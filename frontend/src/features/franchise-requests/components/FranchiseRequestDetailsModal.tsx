"use client";

import { useState } from "react";
import { FranchiseRequest } from "../types";
import { FranchiseRequestTimeline } from "./FranchiseRequestTimeline";
import {
  useApproveFranchiseRequest,
  useRejectFranchiseRequest,
  useCompleteFranchiseRequest,
  useCreateInvoiceFromRequest,
  useSendFranchiseInvoiceEmail,
} from "../hooks/useFranchiseRequests";
import { useMarkInvoicePaid } from "@/features/invoices/hooks/useInvoices";
import {
  X,
  Building2,
  User,
  Mail,
  Phone,
  DollarSign,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Key,
  AlertCircle,
  Loader2,
  Send,
  Check,
  Receipt,
} from "lucide-react";

interface ModalProps {
  request: FranchiseRequest | null;
  userRole?: string;
  onClose: () => void;
}

export function FranchiseRequestDetailsModal({ request, userRole, onClose }: ModalProps) {
  const [quotedAmount, setQuotedAmount] = useState(request?.quoted_amount || "");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectBox, setShowRejectBox] = useState(false);

  // Invoice creation form state
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState("18.00");
  const [discountAmount, setDiscountAmount] = useState("0.00");
  const [dueDays, setDueDays] = useState(15);
  const [gstType, setGstType] = useState<"igst" | "cgst_sgst">("igst");
  const [invoiceNotes, setInvoiceNotes] = useState(request?.notes || "Franchise onboarding license fee");
  const [sendEmailOnCreate, setSendEmailOnCreate] = useState(true);

  // Send Email state
  const [clientEmail, setClientEmail] = useState(
    request?.client_email || request?.invoice?.customer_email || ""
  );
  const [emailNotes, setEmailNotes] = useState("");
  const [emailStatusMsg, setEmailStatusMsg] = useState<string | null>(null);

  // Complete Franchise Form state (for IT role)
  const [itUsername, setItUsername] = useState("");
  const [itPassword, setItPassword] = useState("");

  // Payment state (for Accountant role)
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("bank_transfer");

  const approveMutation = useApproveFranchiseRequest();
  const rejectMutation = useRejectFranchiseRequest();
  const completeMutation = useCompleteFranchiseRequest();
  const createInvoiceMutation = useCreateInvoiceFromRequest();
  const sendEmailMutation = useSendFranchiseInvoiceEmail();
  const markPaidMutation = useMarkInvoicePaid();

  if (!request) return null;

  const normalizedRole = (userRole || "").toLowerCase();
  const isAccountant = normalizedRole === "accountant" || normalizedRole === "admin";
  const isIT = normalizedRole === "it" || normalizedRole === "admin";

  const handleApproveOnly = async () => {
    try {
      await approveMutation.mutateAsync({
        id: request.id,
        data: { quoted_amount: quotedAmount || request.quoted_amount || "0" },
      });
      alert("Franchise request approved successfully!");
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to approve request.");
    }
  };

  const handleCreateInvoice = async () => {
    try {
      const res = await createInvoiceMutation.mutateAsync({
        id: request.id,
        data: {
          tax_percentage: taxPercentage,
          discount_amount: discountAmount,
          due_days: dueDays,
          gst_type: gstType,
          notes: invoiceNotes,
          send_email: sendEmailOnCreate,
          email: clientEmail || request.client_email,
        },
      });
      alert(
        `Invoice #${res.invoice_number} created successfully!` +
          (res.email_sent ? ` Dispatched to client email (${res.recipient || clientEmail}).` : "")
      );
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to create invoice.");
    }
  };

  const handleSendInvoiceEmail = async () => {
    const recipient = clientEmail || request.client_email || request.invoice?.customer_email;
    if (!recipient) {
      alert("Please enter a valid client email address.");
      return;
    }
    setEmailStatusMsg(null);
    try {
      const res = await sendEmailMutation.mutateAsync({
        id: request.id,
        data: { email: recipient, notes: emailNotes },
      });
      setEmailStatusMsg(res.detail || `Invoice sent successfully to ${recipient}!`);
      alert(`Invoice email successfully dispatched to ${recipient}!`);
    } catch (err: any) {
      alert(err.message || "Failed to send invoice email.");
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }
    try {
      await rejectMutation.mutateAsync({
        id: request.id,
        data: { rejection_reason: rejectReason },
      });
      alert("Franchise request rejected.");
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to reject request.");
    }
  };

  const handleMarkPaid = async () => {
    if (!request.invoice) return;
    try {
      await markPaidMutation.mutateAsync({
        id: request.invoice.id,
        data: {
          amount: payAmount || request.invoice.balance_due,
          payment_method: payMethod,
        },
      });
      alert("Payment recorded successfully! Status updated to PAID.");
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to record payment.");
    }
  };

  const handleCompleteIT = async () => {
    if (!itUsername || !itPassword) {
      alert("Please enter both username and password for the Franchise Admin user.");
      return;
    }
    try {
      await completeMutation.mutateAsync({
        id: request.id,
        data: {
          username: itUsername,
          password: itPassword,
          role: "FRANCHISE_ADMIN",
        },
      });
      alert("Franchise and Franchise Admin credentials created successfully!");
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to create franchise.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-bold text-slate-800">{request.proposed_franchise_name}</h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                  request.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : request.status === "paid"
                    ? "bg-blue-100 text-blue-700"
                    : request.status === "approved"
                    ? "bg-purple-100 text-purple-700"
                    : request.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {request.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Request ID #{request.id} • Created {new Date(request.created_at).toLocaleDateString()}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Timeline Visualizer */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Workflow Progression Status</h4>
            <FranchiseRequestTimeline status={request.status} />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Franchise & Client Info */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Franchise Information</span>
                </h3>
                <div className="text-sm">
                  <p className="text-xs text-slate-500">Proposed Name</p>
                  <p className="font-semibold text-slate-800">{request.proposed_franchise_name}</p>
                </div>
                <div className="text-sm">
                  <p className="text-xs text-slate-500">Location / Proposed Address</p>
                  <p className="font-semibold text-slate-800">{request.proposed_address || "N/A"}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Client Contact Person</span>
                </h3>
                <div className="text-sm">
                  <p className="text-xs text-slate-500">Full Name</p>
                  <p className="font-semibold text-slate-800">{request.client_name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-semibold text-slate-800 truncate">{request.client_email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="font-semibold text-slate-800">{request.client_phone || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commercials & Invoice info */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Commercial & Quotation</span>
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Quoted Deal Amount:</span>
                  <span className="text-base font-extrabold text-slate-900">₹{request.quoted_amount || "0.00"}</span>
                </div>
                {request.notes && (
                  <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700">Notes:</span> {request.notes}
                  </div>
                )}
              </div>

              {request.invoice && (
                <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center space-x-1.5">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>Associated Invoice #{request.invoice.invoice_number}</span>
                    </h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 uppercase">
                      {request.invoice.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <div>Total: <strong>₹{request.invoice.total_amount}</strong></div>
                    <div>Balance Due: <strong className="text-red-600">₹{request.invoice.balance_due}</strong></div>
                  </div>

                  {/* Send to Client Mail Button inside Invoice Card */}
                  {isAccountant && (
                    <div className="pt-2 border-t border-emerald-200/80 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                          <input
                            type="email"
                            placeholder="Client email address..."
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <button
                          onClick={handleSendInvoiceEmail}
                          disabled={sendEmailMutation.isPending}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg inline-flex items-center space-x-1.5 shadow-sm transition-all shrink-0"
                        >
                          {sendEmailMutation.isPending ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3 h-3" />
                              <span>Send to Client Mail</span>
                            </>
                          )}
                        </button>
                      </div>
                      {emailStatusMsg && (
                        <p className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>{emailStatusMsg}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* ROLE ACTION CONTROLS */}
          {/* ============================================================ */}

          {/* 1. Accountant Actions for PENDING request */}
          {isAccountant && request.status === "pending" && (
            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-amber-900 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Accountant Action: Accept Request & Create Invoice</span>
                </h4>
                <span className="text-xs font-semibold px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full">
                  Pending Review
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm / Update Quoted Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={quotedAmount}
                    onChange={(e) => setQuotedAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client Email for Invoicing
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Main Action Buttons for Pending */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleApproveOnly}
                  disabled={approveMutation.isPending}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 inline-flex items-center space-x-1.5 transition-all"
                >
                  {approveMutation.isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Accepting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept Franchise Request</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowInvoiceForm(!showInvoiceForm)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 inline-flex items-center space-x-1.5 transition-all"
                >
                  <Receipt className="w-3.5 h-3.5" />
                  <span>{showInvoiceForm ? "Hide Invoice Form" : "Create Invoice Now"}</span>
                </button>

                <button
                  onClick={() => setShowRejectBox(!showRejectBox)}
                  className="px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl transition-all inline-flex items-center space-x-1"
                >
                  <span>Reject</span>
                </button>
              </div>

              {/* Invoice Form (embedded if accountant wants to configure and generate invoice directly) */}
              {showInvoiceForm && (
                <div className="mt-3 p-4 bg-white border border-blue-200 rounded-xl space-y-3">
                  <h5 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Configure Tax Invoice</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Tax Percentage (%)</label>
                      <input
                        type="number"
                        value={taxPercentage}
                        onChange={(e) => setTaxPercentage(e.target.value)}
                        className="w-full px-3 py-1.5 border rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Amount (₹)</label>
                      <input
                        type="number"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(e.target.value)}
                        className="w-full px-3 py-1.5 border rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Term (Days)</label>
                      <input
                        type="number"
                        value={dueDays}
                        onChange={(e) => setDueDays(Number(e.target.value))}
                        className="w-full px-3 py-1.5 border rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">GST Type</label>
                      <select
                        value={gstType}
                        onChange={(e) => setGstType(e.target.value as any)}
                        className="w-full px-3 py-1.5 border rounded-lg text-xs"
                      >
                        <option value="igst">IGST (Interstate)</option>
                        <option value="cgst_sgst">CGST + SGST (Intrastate)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Invoice Notes</label>
                      <input
                        type="text"
                        value={invoiceNotes}
                        onChange={(e) => setInvoiceNotes(e.target.value)}
                        className="w-full px-3 py-1.5 border rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="sendEmailCreate1"
                      checked={sendEmailOnCreate}
                      onChange={(e) => setSendEmailOnCreate(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="sendEmailCreate1" className="text-xs font-semibold text-slate-700">
                      Send invoice directly to client email ({clientEmail || request.client_email || "No email"})
                    </label>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleCreateInvoice}
                      disabled={createInvoiceMutation.isPending}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center space-x-1.5"
                    >
                      {createInvoiceMutation.isPending ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating Invoice...</span>
                        </>
                      ) : (
                        <>
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Confirm & Generate Invoice</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Rejection box */}
              {showRejectBox && (
                <div className="pt-2 space-y-2">
                  <input
                    type="text"
                    placeholder="Enter rejection reason..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full px-3 py-2 border border-red-300 rounded-xl text-sm"
                  />
                  <button
                    onClick={handleReject}
                    disabled={rejectMutation.isPending}
                    className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg"
                  >
                    Confirm Rejection
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. Accountant Actions for APPROVED request WITHOUT invoice */}
          {isAccountant && request.status === "approved" && !request.invoice && (
            <div className="p-4 bg-blue-50/90 border border-blue-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-blue-900 flex items-center space-x-2">
                  <Receipt className="w-4 h-4 text-blue-700" />
                  <span>Accountant Action: Generate Tax Invoice</span>
                </h4>
                <span className="text-xs font-semibold px-2 py-0.5 bg-blue-200 text-blue-900 rounded-full">
                  Approved — Ready for Invoice
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tax Percentage (%)</label>
                  <input
                    type="number"
                    value={taxPercentage}
                    onChange={(e) => setTaxPercentage(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Amount (₹)</label>
                  <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Term (Days)</label>
                  <input
                    type="number"
                    value={dueDays}
                    onChange={(e) => setDueDays(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GST Type</label>
                  <select
                    value={gstType}
                    onChange={(e) => setGstType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm"
                  >
                    <option value="igst">IGST (Interstate)</option>
                    <option value="cgst_sgst">CGST + SGST (Intrastate)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Client Recipient Email</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@company.com"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="sendEmailCreate2"
                  checked={sendEmailOnCreate}
                  onChange={(e) => setSendEmailOnCreate(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="sendEmailCreate2" className="text-xs font-semibold text-slate-700">
                  Send invoice to client email immediately upon generation
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleCreateInvoice}
                  disabled={createInvoiceMutation.isPending}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 inline-flex items-center space-x-2 transition-all"
                >
                  {createInvoiceMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Invoice...</span>
                    </>
                  ) : (
                    <>
                      <Receipt className="w-4 h-4" />
                      <span>Generate & Issue Invoice</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 3. Accountant Payment Form (when Invoice exists & unpaid) */}
          {isAccountant && request.invoice && request.invoice.status !== "paid" && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
              <h4 className="text-sm font-bold text-emerald-900 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Accountant Action: Record Invoice Payment</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Amount (₹)</label>
                  <input
                    type="number"
                    placeholder={request.invoice.balance_due}
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm"
                  >
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="upi">UPI</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleMarkPaid}
                    disabled={markPaidMutation.isPending}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                  >
                    {markPaidMutation.isPending ? "Recording..." : "Record Payment"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. IT Create Franchise Form (when PAID) */}
          {isIT && request.status === "paid" && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
              <h4 className="text-sm font-bold text-blue-900 flex items-center space-x-2">
                <Key className="w-4 h-4 text-blue-700" />
                <span>IT Action: Create Franchise & Issue Franchise Admin Login</span>
              </h4>
              <p className="text-xs text-blue-700">Invoice is fully paid. Provision franchise workspace & client administrator login.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. abcadmin"
                    value={itUsername}
                    onChange={(e) => setItUsername(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="StrongPassword123"
                    value={itPassword}
                    onChange={(e) => setItPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleCompleteIT}
                  disabled={completeMutation.isPending}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center space-x-2"
                >
                  {completeMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Provisioning Franchise...</span>
                    </>
                  ) : (
                    <span>Create Franchise & Complete Onboarding</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-bold rounded-xl">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
