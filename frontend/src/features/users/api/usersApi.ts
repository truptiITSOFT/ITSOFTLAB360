import { apiClient } from "@/lib/apiClient";
import { UserItem, CreateUserPayload } from "../types";

export const usersApi = {
  getUsers: async (): Promise<UserItem[]> => {
    const res = await apiClient.get<UserItem[] | { results: UserItem[] }>("users/");
    return Array.isArray(res) ? res : res.results || [];
  },

  createUser: async (data: CreateUserPayload): Promise<UserItem> => {
    return apiClient.post<UserItem>("users/", data);
  },

  deleteUser: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`users/${id}/`);
  },
};
