export interface ClientLicenseRequestItem {
  id?: number;
  product: number;
  product_name?: string;
  license_count: number;
  duration_months: number;
  quoted_price?: string;
}

export interface ClientLicenseRequest {
  id: number;
  franchise: number;
  franchise_name?: string;
  requested_by?: number;
  requested_by_username?: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  organization_name: string;
  billing_address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  customer_gstin?: string;
  quoted_amount?: string;
  notes?: string;
  status: "pending" | "invoice_generated" | "paid" | "provisioned" | "rejected";
  invoice?: number;
  invoice_number?: string;
  organization?: number;
  reviewed_by?: number;
  reviewed_at?: string;
  rejection_reason?: string;
  fulfilled_by?: number;
  fulfilled_at?: string;
  items: ClientLicenseRequestItem[];
  created_at: string;
  updated_at: string;
}

export interface CreateClientRequestPayload {
  client_name: string;
  client_email: string;
  client_phone?: string;
  organization_name: string;
  billing_address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  customer_gstin?: string;
  notes?: string;
  items: {
    product: number;
    license_count: number;
    duration_months: number;
  }[];
}

export interface FulfillRequestPayload {
  org_admin_username: string;
  org_admin_email: string;
  org_admin_password?: string;
  org_admin_first_name?: string;
  org_admin_last_name?: string;
}
