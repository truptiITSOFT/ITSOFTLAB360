import { apiClient } from "@/lib/apiClient";
import { LoginResponse } from "../types";

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>("login/", { username, password });
  },
};
