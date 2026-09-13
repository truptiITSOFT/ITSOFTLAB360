"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStorage, StoredUser } from "@/lib/authStorage";
import { authApi } from "../api/authApi";

export function useAuth() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = authStorage.getUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await authApi.login(username, password);
      authStorage.setAccessToken(response.access);
      authStorage.setRefreshToken(response.refresh);

      // Detect user role from username or backend profile query
      let userRole = "Admin";
      const lowerUser = username.toLowerCase();

      if (lowerUser.includes("sales")) {
        userRole = "Sales";
      } else if (lowerUser.includes("accountant")) {
        userRole = "Accountant";
      } else if (lowerUser.includes("it")) {
        userRole = "IT";
      } else if (lowerUser.includes("admin")) {
        userRole = "Admin";
      }

      const userProfile: StoredUser = {
        username,
        role: userRole,
      };

      authStorage.setUser(userProfile);
      setUser(userProfile);
      
      router.push("/app-dashboard");
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authStorage.clear();
    setUser(null);
    router.push("/login");
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
    isFranchiseUser: user?.is_franchise_user,
    franchiseRole: user?.franchise_role,
  };
}
