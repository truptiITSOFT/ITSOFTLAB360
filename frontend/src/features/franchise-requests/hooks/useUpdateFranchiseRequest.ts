"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { franchiseRequestsApi } from "../api/franchiseRequestsApi";
import { ApproveFranchiseRequestPayload, RejectFranchiseRequestPayload, CompleteFranchiseRequestPayload } from "../types";

export function useUpdateFranchiseRequest() {
  const queryClient = useQueryClient();

  const approve = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ApproveFranchiseRequestPayload }) =>
      franchiseRequestsApi.approveRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const reject = useMutation({
    mutationFn: ({ id, data }: { id: number; data: RejectFranchiseRequestPayload }) =>
      franchiseRequestsApi.rejectRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
    },
  });

  const complete = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CompleteFranchiseRequestPayload }) =>
      franchiseRequestsApi.completeRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
      queryClient.invalidateQueries({ queryKey: ["franchises"] });
      queryClient.invalidateQueries({ queryKey: ["franchise-users"] });
    },
  });

  return { approve, reject, complete };
}
