export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  subscription_price_per_user?: string;
  billing_cycle?: "monthly" | "quarterly" | "yearly" | string;
  created_by?: number;
  created_by_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: string;
  subscription_price_per_user?: string;
  billing_cycle?: "monthly" | "quarterly" | "yearly" | string;
}
