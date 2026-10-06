"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "../api/productsApi";
import { CreateProductPayload } from "../types";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => productsApi.getProducts(),
  });
}

export function useGetProduct(id: number) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductPayload) => productsApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productsApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
