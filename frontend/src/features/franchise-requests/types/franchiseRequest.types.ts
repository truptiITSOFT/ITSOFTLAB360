import { Invoice } from "../../invoices/types";

export type FranchiseRequestStatus = "pending" | "approved" | "paid" | "completed" | "rejected";

export interface FranchiseRequest {
  id: number;
  requested_by?: number;
  requested_by_name?: string;
  proposed_franchise_name: string;
  proposed_address: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  quoted_amount?: string;
  notes?: string;
  status: FranchiseRequestStatus;
  status_display?: string;
  invoice?: Invoice | null;
  reviewed_by?: number;
  reviewed_by_name?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  franchise?: any | null;
  completed_by?: number;
  completed_by_name?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  products?: number[];
}

export interface CreateFranchiseRequestPayload {
  proposed_franchise_name: string;
  proposed_address: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  quoted_amount?: string;
  notes?: string;
  products?: number[];
}

export interface ApproveFranchiseRequestPayload {
  quoted_amount: string;
}

export interface RejectFranchiseRequestPayload {
  rejection_reason: string;
}

export interface CompleteFranchiseRequestPayload {
  username: string;
  password?: string;
  first_name?: string;
  email?: string;
  role?: string;
}

export interface CreateInvoiceFromRequestPayload {
  tax_percentage?: string | number;
  discount_amount?: string | number;
  due_days?: number;
  due_date?: string;
  gst_type?: "igst" | "cgst_sgst";
  notes?: string;
  terms_and_conditions?: string;
  send_email?: boolean;
  email?: string;
}

