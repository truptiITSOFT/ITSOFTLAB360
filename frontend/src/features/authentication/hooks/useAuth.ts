"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStorage, StoredUser } from "@/lib/authStorage";
import { authApi } from "../api/authApi";
import { PortalType } from "../types";

export function useAuth() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = authStorage.getUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (username: string, password: string, portalType?: PortalType) => {
    setLoading(true);
    try {
      const response = await authApi.login(username, password, portalType);
      authStorage.setAccessToken(response.access);
      authStorage.setRefreshToken(response.refresh);

      const isFranchise = response.user.portal_type === "FRANCHISE";
      const isOrg = response.user.portal_type === "ORGANIZATION";

      const userProfile: StoredUser = {
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
        first_name: response.user.first_name,
        last_name: response.user.last_name,
        role: response.user.role,
        portal_type: response.user.portal_type,
        is_franchise_user: isFranchise,
        franchise_id: response.user.franchise_id,
        franchise_name: response.user.franchise_name,
        franchise_role: isFranchise ? response.user.role : undefined,
        is_org_admin: isOrg,
        organization_id: response.user.organization_id,
        organization_name: response.user.organization_name,
      };

      authStorage.setUser(userProfile);
      setUser(userProfile);

      // Intelligent target redirection based on authenticated portal
      if (response.user.portal_type === "ORGANIZATION") {
        router.push("/app-dashboard?tab=org-users");
      } else {
        router.push("/app-dashboard");
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = (redirectPortal?: string) => {
    authStorage.clear();
    setUser(null);
    if (redirectPortal === "admin") {
      router.push("/admin/login");
    } else if (redirectPortal === "franchise") {
      router.push("/franchise/login");
    } else if (redirectPortal === "org") {
      router.push("/org/login");
    } else {
      router.push("/login");
    }
  };

  const updateUserRole = (role: string, isFranchise = false, franchiseName?: string) => {
    if (!user) return;
    const updated: StoredUser = {
      ...user,
      role: isFranchise ? undefined : role,
      franchise_role: isFranchise ? role : undefined,
      is_franchise_user: isFranchise,
      franchise_name: franchiseName,
    };
    authStorage.setUser(updated);
    setUser(updated);
  };

  return {
    user,
    loading,
    login,
    logout,
    updateUserRole,
    isAuthenticated: !!user && !!authStorage.getAccessToken(),
    role: user?.role,
    portalType: user?.portal_type,
    isFranchiseUser: user?.is_franchise_user,
    franchiseRole: user?.franchise_role,
    isOrgAdmin: user?.portal_type === "ORGANIZATION" || Boolean(user?.is_org_admin) || user?.role === "ORG_ADMIN",
    isSaasUser: user?.portal_type === "SAAS" || ["ORG_EMPLOYEE", "ORG_MANAGER"].includes(user?.role || ""),
    organizationName: user?.organization_name,
  };
}

