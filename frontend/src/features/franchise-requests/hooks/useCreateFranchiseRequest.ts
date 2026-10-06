"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { franchiseRequestsApi } from "../api/franchiseRequestsApi";
import { CreateFranchiseRequestPayload } from "../types";

export function useCreateFranchiseRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFranchiseRequestPayload) => franchiseRequestsApi.createRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-requests"] });
    },
  });
}
