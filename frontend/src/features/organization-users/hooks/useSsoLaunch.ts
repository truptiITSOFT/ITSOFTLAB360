import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { SsoLaunchRequest, SsoLaunchResponse } from "../types";

export function useSsoLaunch() {
  return useMutation({
    mutationFn: async ({
      organization_user_id,
      product_name,
    }: SsoLaunchRequest): Promise<SsoLaunchResponse> => {
      return apiClient.post<SsoLaunchResponse>(
        `/api/franchise/organization-users/${organization_user_id}/sso-token/`,
        { product_name }
      );
    },
  });
}
