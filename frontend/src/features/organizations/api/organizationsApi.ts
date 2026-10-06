import { apiClient } from "@/lib/apiClient";
import { Organization, CreateOrganizationPayload } from "../types";

export const organizationsApi = {
  getOrganizations: async (): Promise<Organization[]> => {
    try {
      const res = await apiClient.get<Organization[] | { results: Organization[] }>(
        "organizations/"
      );
      return Array.isArray(res) ? res : res.results || [];
    } catch {
      // Fallback empty list if endpoint is being provisioned
      return [];
    }
  },

  createOrganization: async (data: CreateOrganizationPayload): Promise<Organization> => {
    return apiClient.post<Organization>("organizations/", data);
  },
};

