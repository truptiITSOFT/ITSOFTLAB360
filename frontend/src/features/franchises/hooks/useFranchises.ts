"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { franchisesApi } from "../api/franchisesApi";

export function useGetFranchises() {
  return useQuery({
    queryKey: ["franchises"],
    queryFn: () => franchisesApi.getFranchises(),
  });
}

export function useGetFranchise(id: number) {
  return useQuery({
    queryKey: ["franchises", id],
    queryFn: () => franchisesApi.getFranchise(id),
    enabled: !!id,
  });
}

export function useActivateFranchise() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => franchisesApi.activateFranchise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchises"] });
    },
  });
}

export function useDeactivateFranchise() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => franchisesApi.deactivateFranchise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchises"] });
    },
  });
}
