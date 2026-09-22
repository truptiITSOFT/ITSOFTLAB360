"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invoicesApi } from "../api/invoicesApi";
import { MarkPaidPayload } from "../types";

export function useGetInvoices() {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: () => invoicesApi.getInvoices(),
  });
}

export function useGetInvoice(id: number) {
  return useQuery({
    queryKey: ["invoices", id],
    queryFn: () => invoicesApi.getInvoice(id),
    enabled: !!id,
  });
}

export function useSendInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => invoicesApi.sendInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

export function useMarkInvoicePaid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: MarkPaidPayload }) =>
      invoicesApi.markPaid(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
    },
  });
}

export function useSendInvoiceEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data?: { email?: string; notes?: string } }) =>
      invoicesApi.sendInvoiceEmail(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
    },
  });
}

