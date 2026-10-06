import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { SubscribedProduct } from "../types";

export function useGetSubscribedProducts() {
  return useQuery({
    queryKey: ["organization-subscriptions"],
    queryFn: async (): Promise<SubscribedProduct[]> => {
      const res = await apiClient.get<SubscribedProduct[] | { results: SubscribedProduct[] }>(
        "/api/franchise/subscriptions/"
      );
      return Array.isArray(res) ? res : res.results || [];
    },
  });
}
