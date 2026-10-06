export type InvoiceStatus = "draft" | "sent" | "paid" | "partially_paid" | "overdue" | "cancelled";

export interface Invoice {
  id: number;
  invoice_number: string;
  franchise?: number | null;
  franchise_name?: string | null;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  customer_gstin?: string;
  billing_address?: string;
  billing_city?: string;
  billing_state?: string;
  billing_pincode?: string;
  billing_country?: string;
  invoice_date: string;
  due_date?: string;
  subtotal: string;
  discount_amount?: string;
  taxable_amount?: string;
  tax_amount?: string;
  total_amount: string;
  amount_paid: string;
  balance_due: string;
  cgst_amount?: string;
  sgst_amount?: string;
  igst_amount?: string;
  status: InvoiceStatus;
  status_display?: string;
  payment_method?: string;
  payment_date?: string;
  transaction_id?: string;
  notes?: string;
  terms_and_conditions?: string;
  created_at: string;
  updated_at: string;
}

export interface MarkPaidPayload {
  amount?: string | number;
  payment_method?: string;
  transaction_id?: string;
}
