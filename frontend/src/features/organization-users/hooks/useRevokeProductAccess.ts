import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

interface RevokeAccessPayload {
  organizationUserId: number;
  subscriptionId: number;
}

export function useRevokeProductAccess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ organizationUserId, subscriptionId }: RevokeAccessPayload) => {
      return apiClient.post<{ message: string; available_licenses_now: number }>(
        `/api/franchise/organization-users/${organizationUserId}/revoke-product/`,
        { subscription_id: subscriptionId }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-users"] });
      queryClient.invalidateQueries({ queryKey: ["organization-subscriptions"] });
    },
  });
}
