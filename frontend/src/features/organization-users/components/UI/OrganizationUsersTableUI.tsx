"use client";

import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Link2,
  KeyRound,
  Shield,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { DataTable, ColumnDef } from "@/components/common/DataTable";
import { OrganizationUser } from "../../types";
import { UserTableSkeleton } from "../skeleton/UserTableSkeleton";

interface OrganizationUsersTableUIProps {
  users: OrganizationUser[];
  isLoading?: boolean;
  onOpenProvisionDialog: (user?: OrganizationUser | null) => void;
  onLaunchSso: (orgUser: OrganizationUser, productName: string) => void;
  onRevokeAccess: (orgUserId: number, subscriptionId: number, productName: string) => void;
}

export function OrganizationUsersTableUI({
  users,
  isLoading,
  onOpenProvisionDialog,
  onLaunchSso,
  onRevokeAccess,
}: OrganizationUsersTableUIProps) {
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);

  const columns: ColumnDef<OrganizationUser>[] = [
    // 1. User Info
    {
      header: "User Identity",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
            {row.user_first_name ? row.user_first_name[0].toUpperCase() : row.user_username[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-900 dark:text-white truncate">
              {row.user_first_name || row.user_last_name
                ? `${row.user_first_name} ${row.user_last_name}`.trim()
                : row.user_username}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
              @{row.user_username} &bull; {row.user_email}
            </p>
          </div>
        </div>
      ),
    },

    // 2. Organization Role & Department
    {
      header: "Role / Department",
      cell: (row) => (
        <div>
          <span
            className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
              row.role === "ORG_ADMIN"
                ? "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-500/20"
                : row.role === "ORG_MANAGER"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-500/20"
                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {row.role.replace("ORG_", "")}
          </span>
          {(row.designation || row.department) && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {[row.designation, row.department].filter(Boolean).join(" &bull; ")}
            </p>
          )}
        </div>
      ),
    },

    // 3. Linked Software Products & External IDs
    {
      header: "Subscribed Softwares & Remote IDs",
      cell: (row) => {
        const activeAccesses = row.product_accesses?.filter((a) => a.is_active) || [];

        if (activeAccesses.length === 0) {
          return (
            <span className="text-[11px] text-slate-400 italic">
              No products linked yet
            </span>
          );
        }

        return (
          <div className="flex flex-wrap gap-1.5 max-w-md">
            {activeAccesses.map((access) => (
              <div
                key={access.id}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-2xs group"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {access.product_name}
                </span>
                {access.external_user_id && (
                  <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-1 rounded border border-indigo-200/50 dark:border-indigo-800/50 truncate max-w-[110px]">
                    {access.external_user_id}
                  </span>
                )}
                {/* Launch SSO Quick Icon */}
                <button
                  type="button"
                  onClick={() => onLaunchSso(row, access.product_name)}
                  className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  title={`Launch SSO into ${access.product_name}`}
                >
                  <KeyRound className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        );
      },
    },

    // 4. Quick Actions
    {
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (row) => {
        const activeAccesses = row.product_accesses?.filter((a) => a.is_active) || [];

        return (
          <div className="flex items-center justify-end space-x-2">
            {/* Link to Another Product */}
            <button
              type="button"
              onClick={() => onOpenProvisionDialog(row)}
              className="px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg flex items-center space-x-1 border border-indigo-200/60 dark:border-indigo-800/40 transition-colors"
              title="Link this user to another subscribed product without creating a new user"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>+ Link Product</span>
            </button>

            {/* Launch SSO action */}
            {activeAccesses.length > 0 && (
              <button
                type="button"
                onClick={() => onLaunchSso(row, activeAccesses[0].product_name)}
                className="px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-lg flex items-center space-x-1 border border-emerald-200/60 dark:border-emerald-800/40 transition-colors"
                title={`Launch SSO for ${activeAccesses[0].product_name}`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>SSO Launch</span>
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      title={
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span>Provisioned Organization Users</span>
        </div>
      }
      subtitle="Central user accounts linked into your organization's remote software subscriptions."
      data={users}
      columns={columns}
      isLoading={isLoading}
      skeleton={<UserTableSkeleton />}
      searchableKey={(item) => `${item.user_username} ${item.user_email} ${item.designation || ""}`}
      searchPlaceholder="Search by username, email, designation..."
      actions={
        <button
          type="button"
          onClick={() => onOpenProvisionDialog(null)}
          className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Provision New User</span>
        </button>
      }
    />
  );
}
