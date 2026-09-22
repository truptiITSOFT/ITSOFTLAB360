"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { franchiseRequestsApi } from "../api/franchiseRequestsApi";
import {
  CreateFranchiseRequestPayload,
  ApproveFranchiseRequestPayload,
  RejectFranchiseRequestPayload,
  CompleteFranchiseRequestPayload,
} from "../types";

export function useGetFranchiseRequests() {
  return useQuery({
    queryKey: ["franchise-requests"],
    queryFn: () => franchiseRequestsApi.getRequests(),
  });
}

export function useGetFranchiseRequestDetails(id: number) {
  return useQuery({
    queryKey: ["franchise-requests", id],
    queryFn: () => franchiseRequestsApi.getRequestDetails(id),
    enabled: !!id,
  });
}

export function useCreateFranchiseRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFranchiseRequestPayload) => franchiseRequestsApi.createRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
    },
  });
}

export function useApproveFranchiseRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ApproveFranchiseRequestPayload }) =>
      franchiseRequestsApi.approveRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

export function useRejectFranchiseRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: RejectFranchiseRequestPayload }) =>
      franchiseRequestsApi.rejectRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
    },
  });
}

export function useCompleteFranchiseRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CompleteFranchiseRequestPayload }) =>
      franchiseRequestsApi.completeRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
      queryClient.invalidateQueries({ queryKey: ["franchises"] });
      queryClient.invalidateQueries({ queryKey: ["franchise-users"] });
    },
  });
}

export function useCreateInvoiceFromRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data?: any }) =>
      franchiseRequestsApi.createInvoice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

export function useSendFranchiseInvoiceEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data?: { email?: string; notes?: string } }) =>
      franchiseRequestsApi.sendInvoiceEmail(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

