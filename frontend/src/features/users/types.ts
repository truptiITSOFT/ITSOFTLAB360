import { InternalRole } from "../authentication/types";

export interface UserItem {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role: InternalRole | string;
  is_active?: boolean;
}

export interface CreateUserPayload {
  username: string;
  password?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role: InternalRole | string;
}
