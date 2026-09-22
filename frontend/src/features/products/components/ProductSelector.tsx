"use client";

import { useGetProducts } from "../hooks/useProducts";
import { Check, Loader2, Package } from "lucide-react";

interface ProductSelectorProps {
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  disabled?: boolean;
}

export function ProductSelector({ selectedIds, onChange, disabled }: ProductSelectorProps) {
  const { data: products, isLoading, error } = useGetProducts();

  const toggleProduct = (id: number) => {
    if (disabled) return;
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-xl text-slate-500">
        <Loader2 className="w-5 h-5 animate-spin mr-2 text-blue-600" />
        <span>Loading products catalog...</span>
      </div>
    );
  }

  if (error || !products || products.length === 0) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
        No products available or unable to load products.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
        <span>Select Entitled Products ({selectedIds.length} selected)</span>
        <button
          type="button"
          onClick={() => onChange(products.map((p) => p.id))}
          className="text-xs text-blue-600 hover:underline font-medium"
        >
          Select All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {products.map((product) => {
          const isSelected = selectedIds.includes(product.id);
          return (
            <div
              key={product.id}
              onClick={() => toggleProduct(product.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 select-none ${
                isSelected
                  ? "border-blue-600 bg-blue-50/70 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div
                className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-colors border ${
                  isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 truncate">{product.name}</h4>
                  <span className="text-xs font-semibold text-slate-500">₹{product.price}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {product.description || "Enterprise suite module"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
