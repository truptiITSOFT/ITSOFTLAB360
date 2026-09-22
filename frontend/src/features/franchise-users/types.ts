import { FranchiseRole } from "../authentication/types";

export interface FranchiseUserProfile {
  id: number;
  user: number;
  username: string;
  franchise: number;
  franchise_name?: string;
  role: FranchiseRole;
  created_at: string;
  updated_at: string;
}

export interface CreateFranchiseUserPayload {
  username: string;
  email?: string;
  password?: string;
  franchise: number;
  role: FranchiseRole;
}
