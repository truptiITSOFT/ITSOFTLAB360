export interface StoredUser {
  id?: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  portal_type?: "INTERNAL" | "FRANCHISE" | "ORGANIZATION" | "SAAS" | string;
  is_franchise_user?: boolean;
  franchise_id?: number;
  franchise_name?: string;
  franchise_role?: string;
  is_org_admin?: boolean;
  organization_id?: number;
  organization_name?: string;
}

const ACCESS_TOKEN_KEY = "itsoftlab_access_token";
const REFRESH_TOKEN_KEY = "itsoftlab_refresh_token";
const USER_KEY = "itsoftlab_user_profile";

export const authStorage = {
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    // Sync cookie for Next.js server-side middleware
    document.cookie = `${ACCESS_TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`;
  },
  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  getUser: (): StoredUser | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  setUser: (user: StoredUser): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    // Sync cookies for portal-aware middleware routing
    document.cookie = `itsoftlab_portal_type=${encodeURIComponent(user.portal_type || "")}; path=/; max-age=604800; SameSite=Lax`;
    document.cookie = `itsoftlab_user_role=${encodeURIComponent(user.role || user.franchise_role || "")}; path=/; max-age=604800; SameSite=Lax`;
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Clear cookies
    document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `itsoftlab_portal_type=; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `itsoftlab_user_role=; path=/; max-age=0; SameSite=Lax`;
  },
};
