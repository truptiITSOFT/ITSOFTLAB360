"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ClientLicenseRequest, CreateClientRequestPayload, FulfillRequestPayload } from "../types";

export function useGetClientRequests() {
  return useQuery<ClientLicenseRequest[]>({
    queryKey: ["client-license-requests"],
    queryFn: async () => {
      const res = await apiClient.get<any>("/api/franchise/license-requests/");
      // Handle pagination or array
      return Array.isArray(res) ? res : res.results || [];
    },
  });
}

export function useCreateClientRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateClientRequestPayload) =>
      apiClient.post("/api/franchise/license-requests/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-license-requests"] });
    },
  });
}

export function useGenerateClientInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: number) =>
      apiClient.post(`/api/franchise/license-requests/${requestId}/generate-invoice/`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-license-requests"] });
    },
  });
}

export function useSendClientInvoiceEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ invoiceId, email }: { invoiceId: number; email?: string }) =>
      apiClient.post(`/api/franchise/invoices/${invoiceId}/send-email/`, { email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-license-requests"] });
    },
  });
}

export function useMarkClientInvoicePaid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      invoiceId,
      paymentMethod = "bank_transfer",
      reference = "DIRECT_TRANSFER",
    }: {
      invoiceId: number;
      paymentMethod?: string;
      reference?: string;
    }) =>
      apiClient.post(`/api/franchise/invoices/${invoiceId}/mark-paid/`, {
        payment_method: paymentMethod,
        payment_reference: reference,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-license-requests"] });
    },
  });
}

export function useFulfillClientRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, data }: { requestId: number; data: FulfillRequestPayload }) =>
      apiClient.post(`/api/franchise/license-requests/${requestId}/fulfill/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-license-requests"] });
      queryClient.invalidateQueries({ queryKey: ["organization-users"] });
      queryClient.invalidateQueries({ queryKey: ["subscribed-products"] });
    },
  });
}
