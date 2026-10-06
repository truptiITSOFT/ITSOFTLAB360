import { apiClient } from "@/lib/apiClient";
import {
  FranchiseRequest,
  CreateFranchiseRequestPayload,
  ApproveFranchiseRequestPayload,
  RejectFranchiseRequestPayload,
  CompleteFranchiseRequestPayload,
} from "../types";

export const franchiseRequestsApi = {
  getRequests: async (): Promise<FranchiseRequest[]> => {
    const res = await apiClient.get<FranchiseRequest[] | { results: FranchiseRequest[] }>(
      "franchise-requests/"
    );
    return Array.isArray(res) ? res : res.results || [];
  },

  getRequestDetails: async (id: number): Promise<FranchiseRequest> => {
    return apiClient.get<FranchiseRequest>(`franchise-requests/${id}/`);
  },

  createRequest: async (data: CreateFranchiseRequestPayload): Promise<FranchiseRequest> => {
    return apiClient.post<FranchiseRequest>("franchise-requests/", data);
  },

  approveRequest: async (id: number, data: ApproveFranchiseRequestPayload): Promise<any> => {
    return apiClient.post(`franchise-requests/${id}/approve/`, data);
  },

  rejectRequest: async (id: number, data: RejectFranchiseRequestPayload): Promise<any> => {
    return apiClient.post(`franchise-requests/${id}/reject/`, data);
  },

  completeRequest: async (id: number, data: CompleteFranchiseRequestPayload): Promise<any> => {
    return apiClient.post(`franchise-requests/${id}/complete/`, data);
  },

  createInvoice: async (id: number, data?: any): Promise<any> => {
    return apiClient.post(`franchise-requests/${id}/create-invoice/`, data || {});
  },

  sendInvoiceEmail: async (id: number, data?: { email?: string; notes?: string }): Promise<any> => {
    return apiClient.post(`franchise-requests/${id}/send-invoice-email/`, data || {});
  },
};

