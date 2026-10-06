export interface Franchise {
  id: number;
  name: string;
  address: string;
  is_active: boolean;
  products: number[];
  product_names?: string[];
  created_by?: number;
  created_by_name?: string;
  created_at: string;
  updated_at: string;
}
