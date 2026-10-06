import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ProvisionUserRequest, ProvisionUserResponse } from "../types";

export function useProvisionUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProvisionUserRequest): Promise<ProvisionUserResponse> => {
      return apiClient.post<ProvisionUserResponse>(
        "/api/franchise/organization-users/provision/",
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-users"] });
      queryClient.invalidateQueries({ queryKey: ["organization-subscriptions"] });
    },
  });
}
