"use client";

import { useState } from "react";
import { useGetFranchiseUsers } from "../hooks/useFranchiseUsers";
import { FranchiseUserForm } from "./FranchiseUserForm";
import { Search, Plus, Shield, Loader2, UserCheck, Trash2 } from "lucide-react";

export function FranchiseUserTable() {
  const { data: users, isLoading, error } = useGetFranchiseUsers();
  const [search, setSearch] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredUsers = (users || []).filter((u) => {
    return (
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      (u.franchise_name && u.franchise_name.toLowerCase().includes(search.toLowerCase())) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "FRANCHISE_ADMIN":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">Franchise Admin</span>;
      case "FRANCHISE_SALES":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 font-semibold">Franchise Sales</span>;
      case "FRANCHISE_ACCOUNTANT":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Franchise Accountant</span>;
      case "FRANCHISE_IT":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">Franchise IT</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{role}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Franchise Team Directory</h2>
          <p className="text-xs text-slate-500">Manage user accounts and sub-role permissions for your franchise</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/20 flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{showCreateForm ? "View All Users" : "Create Team User"}</span>
        </button>
      </div>

      {showCreateForm ? (
        <FranchiseUserForm onSuccess={() => setShowCreateForm(false)} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search team users by username or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
              <span>Loading team members...</span>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
              Failed to load franchise users: {error.message}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4">User ID</th>
                      <th className="py-3.5 px-4">Username</th>
                      <th className="py-3.5 px-4">Franchise</th>
                      <th className="py-3.5 px-4">Sub-Role</th>
                      <th className="py-3.5 px-4">Created Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                          No team users found. Click "Create Team User" above to add new members.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-500">#{u.id}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                              {u.username[0].toUpperCase()}
                            </div>
                            <span>{u.username}</span>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">
                            {u.franchise_name || `Franchise #${u.franchise}`}
                          </td>
                          <td className="py-3.5 px-4">{getRoleBadge(u.role)}</td>
                          <td className="py-3.5 px-4 text-xs text-slate-500">
                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : "Active"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

