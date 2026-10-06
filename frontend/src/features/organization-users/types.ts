import { z } from "zod";

// ===========================================================================
// 1. Zod Request Schemas
// ===========================================================================

export const provisionUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be under 50 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
  first_name: z.string().optional().default(""),
  last_name: z.string().optional().default(""),
  password: z.string().optional().default(""),
  product_name: z.string().min(1, "Please select a software product"),
  role: z.enum(["ORG_ADMIN", "ORG_MANAGER", "ORG_EMPLOYEE"]).default("ORG_EMPLOYEE"),
  designation: z.string().optional().default(""),
  department: z.string().optional().default(""),
  permissions: z.record(z.string(), z.any()).optional().default({}),
});

export type ProvisionUserRequest = z.infer<typeof provisionUserSchema>;

export const ssoLaunchSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  organization_user_id: z.number().int().positive(),
});

export type SsoLaunchRequest = z.infer<typeof ssoLaunchSchema>;


// ===========================================================================
// 2. API Response Interfaces
// ===========================================================================

export interface SubscribedProduct {
  id: number;
  product: number;
  product_name: string;
  license_count: number;
  used_licenses: number;
  available_licenses: number;
  license_key: string;
  subscription_start?: string;
  subscription_end?: string;
  status: "active" | "pending" | "expired" | "cancelled";
  is_valid: boolean;
}

export interface UserProductAccess {
  id: number;
  product_name: string;
  external_user_id?: string;
  sync_status: "synced" | "pending" | "failed";
  last_synced_at?: string;
  is_active: boolean;
  permissions?: Record<string, any>;
}

export interface OrganizationUser {
  id: number;
  organization: number;
  organization_name?: string;
  user_id: number;
  user_username: string;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  role: "ORG_ADMIN" | "ORG_MANAGER" | "ORG_EMPLOYEE";
  designation?: string;
  department?: string;
  is_active: boolean;
  product_accesses: UserProductAccess[];
  external_product_ids: Record<string, string>;
  active_products: string[];
  created_at: string;
  updated_at?: string;
}

export interface ProvisionUserResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    organization_id: number;
    organization_name: string;
    role: string;
    designation: string;
    department: string;
    external_product_ids: Record<string, string>;
    active_products: string[];
  };
  provisioned_product: {
    product_name: string;
    external_user_id: string;
    is_simulated: boolean;
  };
  subscription_status: {
    used_licenses: number;
    available_licenses_remaining: number;
  };
}

export interface SsoLaunchResponse {
  sso_token: string;
  product_name: string;
  external_user_id: string;
  expires_in_seconds: number;
}
