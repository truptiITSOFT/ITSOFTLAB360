import { apiClient } from "@/lib/apiClient";
import { FranchiseUserProfile, CreateFranchiseUserPayload } from "../types";

export const franchiseUsersApi = {
  getFranchiseUsers: async (): Promise<FranchiseUserProfile[]> => {
    const res = await apiClient.get<FranchiseUserProfile[] | { results: FranchiseUserProfile[] }>(
      "franchise-users/"
    );
    return Array.isArray(res) ? res : res.results || [];
  },

  createFranchiseUser: async (data: CreateFranchiseUserPayload): Promise<FranchiseUserProfile> => {
    return apiClient.post<FranchiseUserProfile>("franchise-users/", data);
  },

  deleteFranchiseUser: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`franchise-users/${id}/`);
  },
};
