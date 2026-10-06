"use client";

import React from "react";
import { User, Link2, KeyRound, Mail, Briefcase, Tag } from "lucide-react";
import { OrganizationUser } from "../../types";

interface UserCardUIProps {
  user: OrganizationUser;
  onOpenProvisionDialog: (user: OrganizationUser) => void;
  onLaunchSso: (user: OrganizationUser, productName: string) => void;
}

export function UserCardUI({
  user,
  onOpenProvisionDialog,
  onLaunchSso,
}: UserCardUIProps) {
  const activeAccesses = user.product_accesses?.filter((a) => a.is_active) || [];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        {/* User Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {user.user_first_name
                ? user.user_first_name[0].toUpperCase()
                : user.user_username[0].toUpperCase()}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {user.user_first_name || user.user_last_name
                  ? `${user.user_first_name} ${user.user_last_name}`.trim()
                  : user.user_username}
              </h4>
              <p className="text-xs text-slate-400 font-mono">@{user.user_username}</p>
            </div>
          </div>

          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {user.role.replace("ORG_", "")}
          </span>
        </div>

        {/* Email & Designation */}
        <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{user.user_email}</span>
          </div>
          {(user.designation || user.department) && (
            <div className="flex items-center space-x-2">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">
                {[user.designation, user.department].filter(Boolean).join(" • ")}
              </span>
            </div>
          )}
        </div>

        {/* Linked Softwares Tags */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            <span>Linked Software Portals ({activeAccesses.length})</span>
          </span>

          <div className="flex flex-wrap gap-1.5">
            {activeAccesses.length === 0 ? (
              <span className="text-xs text-slate-400 italic">No products linked</span>
            ) : (
              activeAccesses.map((access) => (
                <span
                  key={access.id}
                  className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  <span className="font-semibold">{access.product_name}</span>
                  {access.external_user_id && (
                    <span className="font-mono text-[10px] text-indigo-500">
                      ({access.external_user_id.slice(0, 10)})
                    </span>
                  )}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onOpenProvisionDialog(user)}
          className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl flex items-center space-x-1.5 transition-colors border border-indigo-200/60 dark:border-indigo-800/40"
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>+ Link Product</span>
        </button>

        {activeAccesses.length > 0 && (
          <button
            type="button"
            onClick={() => onLaunchSso(user, activeAccesses[0].product_name)}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-xl flex items-center space-x-1.5 transition-colors border border-emerald-200/60 dark:border-emerald-800/40"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Launch SSO</span>
          </button>
        )}
      </div>
    </div>
  );
}
