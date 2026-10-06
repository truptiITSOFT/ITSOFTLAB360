"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { franchiseUsersApi } from "../api/franchiseUsersApi";
import { CreateFranchiseUserPayload } from "../types";

export function useGetFranchiseUsers() {
  return useQuery({
    queryKey: ["franchise-users"],
    queryFn: () => franchiseUsersApi.getFranchiseUsers(),
  });
}

export function useCreateFranchiseUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFranchiseUserPayload) => franchiseUsersApi.createFranchiseUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-users"] });
    },
  });
}

export function useDeleteFranchiseUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => franchiseUsersApi.deleteFranchiseUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["franchise-users"] });
    },
  });
}
