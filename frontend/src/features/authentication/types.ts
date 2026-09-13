export type InternalRole = "IT" | "Admin" | "Sales" | "Accountant";

export type FranchiseRole =
  | "FRANCHISE_IT"
  | "FRANCHISE_ADMIN"
  | "FRANCHISE_SALES"
  | "FRANCHISE_ACCOUNTANT";

export interface LoginResponse {
  refresh: string;
  access: string;
}

export interface UserProfile {
  id?: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: InternalRole | string;
  franchise_profile?: {
    id: number;
    franchise: number;
    franchise_name?: string;
    role: FranchiseRole;
  };
}
