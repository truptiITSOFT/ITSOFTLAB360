"use client";

import { useState } from "react";
import { useCreateFranchiseUser } from "../hooks/useFranchiseUsers";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { FranchiseRole } from "@/features/authentication/types";
import { User, Mail, Lock, Shield, Loader2, CheckCircle } from "lucide-react";

interface FormProps {
  onSuccess?: () => void;
}

export function FranchiseUserForm({ onSuccess }: FormProps) {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<FranchiseRole>("FRANCHISE_SALES");
  const [successMsg, setSuccessMsg] = useState("");

  const createMutation = useCreateFranchiseUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");

    const franchiseId = user?.franchise_id || 1;

    try {
      await createMutation.mutateAsync({
        username,
        email,
        password,
        role,
        franchise: franchiseId,
      });

      setSuccessMsg(`Team user "${username}" created successfully as ${role}.`);
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("FRANCHISE_SALES");

      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-800">Create Franchise Team User</h3>
        <p className="text-xs text-slate-500">Provision sub-role credentials for your franchise team members</p>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center space-x-2 text-sm font-medium">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {createMutation.isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {createMutation.error?.message || "Failed to create franchise user."}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Username *</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. abc_sales1"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sales@franchise.com"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Strong Password"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Franchise Sub-Role *</label>
          <div className="relative">
            <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as FranchiseRole)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="FRANCHISE_SALES">Franchise Sales (Leads & Subscriptions)</option>
              <option value="FRANCHISE_ACCOUNTANT">Franchise Accountant (Billing & Invoices)</option>
              <option value="FRANCHISE_IT">Franchise IT (Technical & Licenses)</option>
              <option value="FRANCHISE_ADMIN">Franchise Admin (Full Control)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-3 border-t border-slate-100">
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          {createMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating User...</span>
            </>
          ) : (
            <span>Create Team User</span>
          )}
        </button>
      </div>
    </form>
  );
}
