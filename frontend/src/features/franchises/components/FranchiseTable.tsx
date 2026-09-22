"use client";

import { useState } from "react";
import { useGetFranchises, useActivateFranchise, useDeactivateFranchise } from "../hooks/useFranchises";
import { Building2, Search, Loader2, Power, CheckCircle, XCircle } from "lucide-react";

interface Props {
  userRole?: string;
}

export function FranchiseTable({ userRole }: Props) {
  const { data: franchises, isLoading, error } = useGetFranchises();
  const activateMutation = useActivateFranchise();
  const deactivateMutation = useDeactivateFranchise();

  const [search, setSearch] = useState("");

  const filteredFranchises = (franchises || []).filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleActive = async (id: number, currentActive: boolean) => {
    try {
      if (currentActive) {
        await deactivateMutation.mutateAsync(id);
        alert("Franchise deactivated.");
      } else {
        await activateMutation.mutateAsync(id);
        alert("Franchise activated.");
      }
    } catch (err: any) {
      alert(err.message || "Failed to update franchise state.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
        <span>Loading active franchises...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by franchise name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFranchises.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            No active franchises provisioned yet.
          </div>
        ) : (
          filteredFranchises.map((f) => (
            <div key={f.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      f.is_active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {f.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mt-3">{f.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{f.address}</p>
              </div>

              {/* Entitled Products */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Products ({f.product_names?.length || f.products?.length || 0})</span>
                <div className="flex flex-wrap gap-1">
                  {(f.product_names || []).map((pName, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg">
                      {pName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions for IT / Admin */}
              {(userRole === "IT" || userRole === "Admin") && (
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleToggleActive(f.id, f.is_active)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      f.is_active
                        ? "bg-red-50 text-red-700 hover:bg-red-100"
                        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{f.is_active ? "Deactivate Franchise" : "Activate Franchise"}</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
