"use client";

import { useState } from "react";
import { useGetProducts, useCreateProduct, useDeleteProduct } from "../hooks/useProducts";
import { Package, Search, Plus, Trash2, Loader2, X, Check } from "lucide-react";

interface ProductTableProps {
  canManage?: boolean;
}

export function ProductTable({ canManage = true }: ProductTableProps) {
  const { data: products, isLoading, error } = useGetProducts();
  const createMutation = useCreateProduct();
  const deleteMutation = useDeleteProduct();

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subscriptionPricePerUser, setSubscriptionPricePerUser] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const filteredProducts = (products || []).filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        name,
        description,
        price,
        subscription_price_per_user: subscriptionPricePerUser || price,
        billing_cycle: billingCycle,
      });
      setName("");
      setDescription("");
      setPrice("");
      setSubscriptionPricePerUser("");
      setBillingCycle("monthly");
      setShowAddModal(false);
    } catch (err: any) {
      alert(err.message || "Failed to create product.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err: any) {
      alert(err.message || "Failed to delete product.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
        <span>Loading products catalog...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!canManage ? (
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Central Fixed Pricing Enforced (ITSOFTLAB360)</span>
          </div>
        ) : (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl flex items-center space-x-2 shadow-md shadow-blue-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl mb-3">
                  <Package className="w-5 h-5" />
                </div>
                {canManage ? (
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    Owner MRP
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{p.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description || "Enterprise Software Suite"}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex flex-col">
                  <span className="text-slate-500 font-bold">Subscription Plan:</span>
                  <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
                    Per User / {p.billing_cycle || "month"}
                  </span>
                </div>
                <span className="text-base font-black text-blue-600">
                  ₹{p.subscription_price_per_user || p.price}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Base MRP / License:</span>
                <span className="font-semibold text-slate-600">₹{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Add New Product Module</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HRMSM, ERP, CRM"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the product functionality..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="10000.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price Per User (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 1200.00"
                    value={subscriptionPricePerUser}
                    onChange={(e) => setSubscriptionPricePerUser(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Billing Cycle</label>
                <select
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                >
                  <option value="monthly">Monthly (Per User / Month)</option>
                  <option value="quarterly">Quarterly (Per User / Quarter)</option>
                  <option value="yearly">Yearly (Per User / Year)</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md"
                >
                  {createMutation.isPending ? "Creating..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
