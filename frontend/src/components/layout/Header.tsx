"use client";

import { useAuth } from "@/features/authentication/hooks/useAuth";
import { Shield, Layout } from "lucide-react";

interface HeaderProps {
  currentRole: string;
}

export function Header({ currentRole }: HeaderProps) {
  const { user, isFranchiseUser } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
          <Layout className="w-4 h-4 text-blue-600" />
          <span>{isFranchiseUser ? `${user?.franchise_name || "Franchise"} Portal` : `${currentRole} Management Workspace`}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {user?.username ? user.username[0].toUpperCase() : "U"}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800 leading-tight">{user?.username || "Authenticated User"}</div>
            <div className="text-[10px] text-slate-500 font-medium flex items-center space-x-1">
              <Shield className="w-3 h-3 text-blue-600" />
              <span>Role: {currentRole}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
