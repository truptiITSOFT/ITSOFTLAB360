"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationsApi } from "../api/organizationsApi";
import { CreateOrganizationPayload } from "../types";

export function useGetOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: () => organizationsApi.getOrganizations(),
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrganizationPayload) =>
      organizationsApi.createOrganization(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

