import { apiClient } from "@/lib/apiClient";
import { Invoice, MarkPaidPayload } from "../types";

export const invoicesApi = {
  getInvoices: async (): Promise<Invoice[]> => {
    const res = await apiClient.get<Invoice[] | { results: Invoice[] }>("invoices/");
    return Array.isArray(res) ? res : res.results || [];
  },

  getInvoice: async (id: number): Promise<Invoice> => {
    return apiClient.get<Invoice>(`invoices/${id}/`);
  },

  sendInvoice: async (id: number): Promise<any> => {
    return apiClient.post(`invoices/${id}/send/`);
  },

  markPaid: async (id: number, data: MarkPaidPayload): Promise<any> => {
    return apiClient.post(`invoices/${id}/mark-paid/`, data);
  },
};
