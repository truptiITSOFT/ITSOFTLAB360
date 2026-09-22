import { apiClient } from "@/lib/apiClient";
import { Product, CreateProductPayload } from "../types";

export const productsApi = {
  getProducts: async (): Promise<Product[]> => {
    const res = await apiClient.get<Product[] | { results: Product[] }>("products/");
    return Array.isArray(res) ? res : res.results || [];
  },
  getProduct: async (id: number): Promise<Product> => {
    return apiClient.get<Product>(`products/${id}/`);
  },
  createProduct: async (data: CreateProductPayload): Promise<Product> => {
    return apiClient.post<Product>("products/", data);
  },
  updateProduct: async (id: number, data: Partial<CreateProductPayload>): Promise<Product> => {
    return apiClient.put<Product>(`products/${id}/`, data);
  },
  deleteProduct: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`products/${id}/`);
  },
};
