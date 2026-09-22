"use client";

import React, { useState } from "react";
import {
  Users,
  Package,
  KeyRound,
  ShieldCheck,
  Building2,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { useGetOrganizationUsers } from "../../hooks/useGetOrganizationUsers";
import { useGetSubscribedProducts } from "../../hooks/useGetSubscribedProducts";
import { useProvisionUserDialog } from "../../hooks/useProvisionUserDialog";
import { useSsoLaunch } from "../../hooks/useSsoLaunch";
import { useRevokeProductAccess } from "../../hooks/useRevokeProductAccess";
import { OrganizationUser, SsoLaunchResponse } from "../../types";

import { SubscribedProductsUI } from "./SubscribedProductsUI";
import { OrganizationUsersTableUI } from "./OrganizationUsersTableUI";
import { ProvisionUserDialog } from "../dialog/ProvisionUserDialog";
import { SsoLaunchDialog } from "../dialog/SsoLaunchDialog";

export function OrganizationUsersView() {
  const { data: users = [], isLoading: isUsersLoading } = useGetOrganizationUsers();
  const { data: products = [], isLoading: isProductsLoading } = useGetSubscribedProducts();

  // Dialog State
  const {
    isOpen: isProvisionOpen,
    selectedUser,
    preselectedProduct,
    openDialog: openProvisionDialog,
    closeDialog: closeProvisionDialog,
  } = useProvisionUserDialog();

  // SSO Launch Dialog State
  const [isSsoOpen, setIsSsoOpen] = useState(false);
  const [ssoData, setSsoData] = useState<SsoLaunchResponse | null>(null);
  const [ssoTargetUsername, setSsoTargetUsername] = useState<string>("");

  const ssoLaunchMutation = useSsoLaunch();
  const revokeMutation = useRevokeProductAccess();

  // Metrics
  const totalUsers = users.length;
  const totalSubscribedProducts = products.length;
  const totalLicenses = products.reduce((acc, p) => acc + p.license_count, 0);
  const usedLicenses = products.reduce((acc, p) => acc + p.used_licenses, 0);
  const availableLicenses = products.reduce((acc, p) => acc + p.available_licenses, 0);

  // Handlers
  const handleLaunchSso = async (orgUser: OrganizationUser, productName: string) => {
    try {
      setSsoTargetUsername(orgUser.user_username);
      const res = await ssoLaunchMutation.mutateAsync({
        organization_user_id: orgUser.id,
        product_name: productName,
      });
      setSsoData(res);
      setIsSsoOpen(true);
    } catch (err: any) {
      alert(err?.data?.error || err?.message || "Failed to generate SSO token");
    }
  };

  const handleRevoke = async (orgUserId: number, subscriptionId: number, productName: string) => {
    if (
      !confirm(
        `Are you sure you want to revoke access to ${productName}? This will immediately free up 1 license seat.`
      )
    ) {
      return;
    }
    try {
      await revokeMutation.mutateAsync({
        organizationUserId: orgUserId,
        subscriptionId: subscriptionId,
      });
    } catch (err: any) {
      alert(err?.data?.error || err?.message || "Failed to revoke access");
    }
  };

  return (
    <div className="space-y-8">
      {/* Portal Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Organization Admin Workspace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Software Subscriptions & User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Manage your purchased SaaS products, allocate user licenses, and enable seamless Single
            Sign-On across HRMS, CRM, and all connected industry applications.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <div className="px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
            <span className="text-xl font-black text-cyan-300">{availableLicenses}</span>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
              Available Seats
            </p>
          </div>
          <div className="px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
            <span className="text-xl font-black text-white">{usedLicenses}</span>
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
              Allocated Seats
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
          <div className="p-3.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-2xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Subscribed Softwares
            </p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {totalSubscribedProducts}
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
          <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Organization Users
            </p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {totalUsers}
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Total License Seats
            </p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {totalLicenses}
            </h3>
          </div>
        </div>
      </div>

      {/* 1. Subscribed Software Products Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              <span>Purchased Software Subscriptions</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Products your organization has licensed from the franchise with live seat utilization.
            </p>
          </div>
        </div>

        <SubscribedProductsUI
          products={products}
          isLoading={isProductsLoading}
          onProvisionForProduct={(productName) => openProvisionDialog(null, productName)}
        />
      </div>

      {/* 2. Organization Users Table */}
      <div className="space-y-4">
        <OrganizationUsersTableUI
          users={users}
          isLoading={isUsersLoading}
          onOpenProvisionDialog={(user) => openProvisionDialog(user, null)}
          onLaunchSso={handleLaunchSso}
          onRevokeAccess={handleRevoke}
        />
      </div>

      {/* 3. Provision User Dialog */}
      <ProvisionUserDialog
        isOpen={isProvisionOpen}
        onClose={closeProvisionDialog}
        selectedUser={selectedUser}
        preselectedProduct={preselectedProduct}
        subscribedProducts={products}
        organizationUsers={users}
      />

      {/* 4. Single Sign-On Launch Dialog */}
      <SsoLaunchDialog
        isOpen={isSsoOpen}
        onClose={() => {
          setIsSsoOpen(false);
          setSsoData(null);
        }}
        ssoData={ssoData}
        username={ssoTargetUsername}
      />
    </div>
  );
}
