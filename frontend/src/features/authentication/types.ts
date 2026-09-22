import { z } from "zod";

export type PortalType = "INTERNAL" | "FRANCHISE" | "ORGANIZATION" | "SAAS";

export type InternalRole = "IT" | "Admin" | "Sales" | "Accountant";

export type FranchiseRole =
  | "FRANCHISE_IT"
  | "FRANCHISE_ADMIN"
  | "FRANCHISE_SALES"
  | "FRANCHISE_ACCOUNTANT";

export type OrgRole = "ORG_ADMIN" | "ORG_MANAGER" | "ORG_EMPLOYEE";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  portal_type: z.enum(["INTERNAL", "FRANCHISE", "ORGANIZATION", "SAAS"]).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export interface AuthUserData {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  portal_type: PortalType | string;
  role: string;
  franchise_id?: number;
  franchise_name?: string;
  organization_id?: number;
  organization_name?: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  user: AuthUserData;
}

export interface UserProfile {
  id?: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: InternalRole | string;
  portal_type?: PortalType | string;
  organization_id?: number;
  organization_name?: string;
  franchise_profile?: {
    id: number;
    franchise: number;
    franchise_name?: string;
    role: FranchiseRole;
  };
}
