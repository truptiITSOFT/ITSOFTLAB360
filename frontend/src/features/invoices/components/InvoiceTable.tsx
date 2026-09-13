"use client";

import { useState } from "react";
import { Invoice, InvoiceStatus } from "../types";
import { useGetInvoices, useSendInvoice, useMarkInvoicePaid } from "../hooks/useInvoices";
import { Search, Filter, Loader2, Send, CheckCircle2, DollarSign } from "lucide-react";

interface Props {
  userRole?: string;
}

export function InvoiceTable({ userRole }: Props) {
  const { data: invoices, isLoading, error } = useGetInvoices();
  const sendMutation = useSendInvoice();
  const markPaidMutation = useMarkInvoicePaid();

  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("bank_transfer");

  const filteredInvoices = (invoices || []).filter(
    (i) =>
      i.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      i.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Paid</span>;
      case "partially_paid":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Partially Paid</span>;
      case "sent":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Sent</span>;
      case "overdue":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">Overdue</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 capitalize">{status}</span>;
    }
  };

  const handleSend = async (id: number) => {
    try {
      await sendMutation.mutateAsync(id);
      alert("Invoice marked as sent.");
    } catch (err: any) {
      alert(err.message || "Failed to send invoice.");
    }
  };

  const handlePay = async (id: number) => {
    try {
      await markPaidMutation.mutateAsync({
        id,
        data: { amount: payAmount, payment_method: payMethod },
      });
      alert("Payment recorded successfully!");
      setSelectedInvoice(null);
    } catch (err: any) {
      alert(err.message || "Failed to record payment.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
        <span>Loading financial invoices...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by invoice # or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4">Balance Due</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No invoices generated yet.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{inv.invoice_number}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{inv.customer_name}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900">₹{inv.total_amount}</td>
                    <td className="py-3.5 px-4 text-emerald-700 font-semibold">₹{inv.amount_paid}</td>
                    <td className="py-3.5 px-4 text-red-600 font-semibold">₹{inv.balance_due}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(inv.status)}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {inv.status === "draft" && (userRole === "Accountant" || userRole === "Admin") && (
                        <button
                          onClick={() => handleSend(inv.id)}
                          className="px-2.5 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold text-xs rounded-lg inline-flex items-center space-x-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send</span>
                        </button>
                      )}
                      {inv.status !== "paid" && (userRole === "Accountant" || userRole === "Admin") && (
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setPayAmount(inv.balance_due);
                          }}
                          className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold text-xs rounded-lg inline-flex items-center space-x-1"
                        >
                          <DollarSign className="w-3 h-3" />
                          <span>Record Payment</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Dialog */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-slate-800">Record Payment for Invoice #{selectedInvoice.invoice_number}</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Payment Amount (₹)</label>
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
              <select
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setSelectedInvoice(null)} className="px-4 py-2 bg-slate-100 text-sm font-bold rounded-xl">
                Cancel
              </button>
              <button
                onClick={() => handlePay(selectedInvoice.id)}
                disabled={markPaidMutation.isPending}
                className="px-5 py-2 bg-emerald-600 text-white font-bold text-sm rounded-xl"
              >
                {markPaidMutation.isPending ? "Recording..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
