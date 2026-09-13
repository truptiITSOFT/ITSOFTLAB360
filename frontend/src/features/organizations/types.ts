export interface Organization {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  gstin?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  franchise: number;
  franchise_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateOrganizationPayload {
  name: string;
  email?: string;
  phone?: string;
  gstin?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  franchise?: number;
}

