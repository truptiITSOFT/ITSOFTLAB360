"use client";

import { useGetFranchiseUsers } from "@/features/franchise-users/hooks/useFranchiseUsers";
import { useGetProducts } from "@/features/products/hooks/useProducts";
import { Building2, Users, Package, ShieldCheck, KeyRound } from "lucide-react";

interface Props {
  franchiseName?: string;
  role?: string;
}

export function FranchiseAdminDashboard({ franchiseName, role }: Props) {
  const { data: franchiseUsers } = useGetFranchiseUsers();
  const { data: products } = useGetProducts();

  const totalUsers = franchiseUsers?.length || 0;
  const totalProducts = products?.length || 0;

  return (
    <div className="space-y-6">
      {/* Portal Banner Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-2xl text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Franchise Client Portal</span>
          </div>
          <h1 className="text-2xl font-black mt-1">{franchiseName || "Client Franchise Workspace"}</h1>
          <p className="text-xs text-slate-300 mt-1">Role: <span className="font-bold text-white uppercase">{role || "FRANCHISE_ADMIN"}</span></p>
        </div>

        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-xs font-medium">
          Isolated Client Environment
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Franchise Staff Users</p>
            <h3 className="text-2xl font-black text-slate-800">{totalUsers}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Entitled Products</p>
            <h3 className="text-2xl font-black text-slate-800">{totalProducts}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Security Status</p>
            <h3 className="text-base font-bold text-emerald-700">Verified Client</h3>
          </div>
        </div>
      </div>

      {/* Franchise Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Franchise Team Members</h3>
            <p className="text-xs text-slate-500">Manage user accounts for your franchise IT, Sales, and Accountant staff</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Franchise</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(!franchiseUsers || franchiseUsers.length === 0) ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">
                    No franchise staff members created yet.
                  </td>
                </tr>
              ) : (
                franchiseUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{u.username}</td>
                    <td className="py-3 px-4 text-slate-700">{u.franchise_name || `Franchise #${u.franchise}`}</td>
                    <td className="py-3 px-4 font-bold text-blue-600">{u.role}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
