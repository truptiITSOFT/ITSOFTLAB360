import { apiClient } from "@/lib/apiClient";
import { Franchise } from "../types";

export const franchisesApi = {
  getFranchises: async (): Promise<Franchise[]> => {
    const res = await apiClient.get<Franchise[] | { results: Franchise[] }>("franchises/");
    return Array.isArray(res) ? res : res.results || [];
  },

  getFranchise: async (id: number): Promise<Franchise> => {
    return apiClient.get<Franchise>(`franchises/${id}/`);
  },

  activateFranchise: async (id: number): Promise<any> => {
    return apiClient.post(`franchises/${id}/activate/`);
  },

  deactivateFranchise: async (id: number): Promise<any> => {
    return apiClient.post(`franchises/${id}/deactivate/`);
  },
};
