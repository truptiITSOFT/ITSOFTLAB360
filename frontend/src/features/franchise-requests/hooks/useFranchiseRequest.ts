"use client";

import { useQuery } from "@tanstack/react-query";
import { franchiseRequestsApi } from "../api/franchiseRequestsApi";

export function useFranchiseRequest(id: number) {
  return useQuery({
    queryKey: ["franchise-requests", id],
    queryFn: () => franchiseRequestsApi.getRequestDetails(id),
    enabled: !!id,
  });
}
