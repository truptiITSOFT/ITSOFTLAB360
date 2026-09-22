"use client";

import { useState } from "react";
import { useGetOrganizations } from "../hooks/useOrganizations";
import { OrganizationForm } from "./OrganizationForm";
import { Search, Plus, Building2, Mail, Phone, MapPin, Loader2 } from "lucide-react";

export function OrganizationTable() {
  const { data: orgs, isLoading, error } = useGetOrganizations();
  const [search, setSearch] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredOrgs = (orgs || []).filter((o) => {
    return (
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      (o.email && o.email.toLowerCase().includes(search.toLowerCase())) ||
      (o.gstin && o.gstin.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Client Organizations</h2>
          <p className="text-xs text-slate-500">Manage client company records and organization accounts under your franchise</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/20 flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{showCreateForm ? "View All Organizations" : "Create Organization"}</span>
        </button>
      </div>

      {showCreateForm ? (
        <OrganizationForm onSuccess={() => setShowCreateForm(false)} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search organizations by name, email or GSTIN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
              <span>Loading client organizations...</span>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
              Failed to load organizations: {error.message}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Org ID</th>
                      <th className="py-3.5 px-4">Organization Name</th>
                      <th className="py-3.5 px-4">Contact Info</th>
                      <th className="py-3.5 px-4">GSTIN</th>
                      <th className="py-3.5 px-4">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredOrgs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                          No organization records found. Click "Create Organization" above to add a client company.
                        </td>
                      </tr>
                    ) : (
                      filteredOrgs.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-500">#{o.id}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                              <Building2 className="w-4 h-4" />
                            </div>
                            <span>{o.name}</span>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-600">
                            <div>{o.email || "No email"}</div>
                            <div className="text-slate-400">{o.phone || ""}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                            {o.gstin || "N/A"}
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-500">
                            {o.city || o.address ? `${o.city || ""}, ${o.state || ""}` : "India"}
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

