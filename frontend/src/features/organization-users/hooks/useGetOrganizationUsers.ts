import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { OrganizationUser } from "../types";

export function useGetOrganizationUsers() {
  return useQuery({
    queryKey: ["organization-users"],
    queryFn: async (): Promise<OrganizationUser[]> => {
      const res = await apiClient.get<OrganizationUser[] | { results: OrganizationUser[] }>(
        "/api/franchise/organization-users/"
      );
      return Array.isArray(res) ? res : res.results || [];
    },
  });
}
