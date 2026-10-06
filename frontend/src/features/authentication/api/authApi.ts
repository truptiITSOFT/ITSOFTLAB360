import { apiClient } from "@/lib/apiClient";
import { LoginResponse, PortalType } from "../types";

export const authApi = {
  login: async (
    username: string,
    password: string,
    portal_type?: PortalType
  ): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>("login/", {
      username,
      password,
      portal_type,
    });
  },
};
