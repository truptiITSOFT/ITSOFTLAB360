"use client";

import React, { useState } from "react";
import { Loader2, AlertCircle, Sparkles, UserCheck, UserPlus, Users } from "lucide-react";
import { OrganizationUser, SubscribedProduct } from "../../types";
import { useProvisionUserForm } from "../../hooks/useProvisionUserForm";

interface ProvisionUserFormProps {
  subscribedProducts?: SubscribedProduct[];
  organizationUsers?: OrganizationUser[];
  selectedUser?: OrganizationUser | null;
  preselectedProduct?: string | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ProvisionUserForm({
  subscribedProducts = [],
  organizationUsers = [],
  selectedUser,
  preselectedProduct,
  onCancel,
  onSuccess,
}: ProvisionUserFormProps) {
  // If selectedUser is passed initially, lock into existing user mode
  const [activeUser, setActiveUser] = useState<OrganizationUser | null>(selectedUser || null);
  const [userMode, setUserMode] = useState<"new" | "existing">(selectedUser ? "existing" : "new");

  const {
    formData,
    errors,
    apiError,
    isSubmitting,
    handleChange,
    handleSubmit,
    selectExistingUser,
  } = useProvisionUserForm({
    selectedUser: activeUser,
    preselectedProduct,
    onSuccess,
  });

  const isExisting = userMode === "existing" && activeUser !== null;

  // Filter products that the active user does not already have access to
  const availableProducts = subscribedProducts.filter((sub) => {
    if (!isExisting || !activeUser) return true;
    return !activeUser.active_products?.includes(sub.product_name);
  });

  const handleModeChange = (mode: "new" | "existing") => {
    setUserMode(mode);
    if (mode === "new") {
      setActiveUser(null);
      selectExistingUser(null);
    }
  };

  const handleSelectMember = (userId: string) => {
    const found = organizationUsers.find((u) => String(u.id) === userId) || null;
    setActiveUser(found);
    selectExistingUser(found);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 1. Mode Switcher (Only if not pre-locked to a specific user) */}
      {!selectedUser && organizationUsers.length > 0 && (
        <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl flex items-center space-x-1">
          <button
            type="button"
            onClick={() => handleModeChange("new")}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
              userMode === "new"
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create New User</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("existing")}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
              userMode === "existing"
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Select Existing Member ({organizationUsers.length})</span>
          </button>
        </div>
      )}

      {/* Existing Member Selector Dropdown */}
      {userMode === "existing" && !selectedUser && (
        <div className="space-y-1.5 p-3.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl">
          <label className="block text-xs font-bold text-blue-900 dark:text-blue-300">
            Choose Organization Member to Link
          </label>
          <select
            value={activeUser ? String(activeUser.id) : ""}
            onChange={(e) => handleSelectMember(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="">-- Choose from existing team members --</option>
            {organizationUsers.map((u) => (
              <option key={u.id} value={String(u.id)}>
                {u.user_first_name || u.user_username} ({u.user_email}) &mdash;{" "}
                {u.active_products && u.active_products.length > 0
                  ? `Active on: ${u.active_products.join(", ")}`
                  : "No products assigned"}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-blue-700/80 dark:text-blue-400">
            Reuses this employee&apos;s central login. You will allocate 1 additional license seat from the selected software.
          </p>
        </div>
      )}

      {/* Existing User Active Banner */}
      {isExisting && activeUser && (
        <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl flex items-center space-x-3 text-xs text-blue-800 dark:text-blue-300">
          <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <div>
            <span className="font-bold">Linking Existing User: </span>
            {activeUser.user_username} ({activeUser.user_email}).
            {activeUser.active_products && activeUser.active_products.length > 0 && (
              <span className="ml-1 opacity-90">
                Already assigned: <strong>{activeUser.active_products.join(", ")}</strong>.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Error Alert */}
      {apiError && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-xl flex items-start space-x-3 text-xs text-rose-800 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{apiError}</div>
        </div>
      )}

      {/* 2. Target Software Product Selection */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          Target Software Product <span className="text-rose-500">*</span>
        </label>
        <select
          value={formData.product_name}
          onChange={(e) => handleChange("product_name", e.target.value)}
          className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
            errors.product_name
              ? "border-rose-400 focus:border-rose-500"
              : "border-slate-200 dark:border-slate-700/80 focus:border-blue-500"
          }`}
        >
          <option value="">-- Choose a Subscribed Software --</option>
          {availableProducts.map((sub) => (
            <option
              key={sub.id}
              value={sub.product_name}
              disabled={sub.available_licenses <= 0}
            >
              {sub.product_name} (
              {sub.available_licenses > 0
                ? `${sub.available_licenses} seat${sub.available_licenses > 1 ? "s" : ""} available`
                : "Limit reached (0 available)"}
              )
            </option>
          ))}
        </select>
        {isExisting && availableProducts.length === 0 && (
          <p className="text-[11px] text-amber-600 dark:text-amber-400">
            This member already has access to all active subscribed products in your organization.
          </p>
        )}
        {errors.product_name && (
          <p className="text-[11px] text-rose-500 font-medium">{errors.product_name}</p>
        )}
      </div>

      {/* 3. User Credentials (Username & Email) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Username <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.username}
            disabled={isExisting}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="e.g. dr_karan"
            className={`w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border rounded-xl text-slate-900 dark:text-slate-100 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
              errors.username
                ? "border-rose-400 focus:border-rose-500"
                : "border-slate-200 dark:border-slate-700/80 focus:border-blue-500"
            }`}
          />
          {errors.username && (
            <p className="text-[11px] text-rose-500 font-medium">{errors.username}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            disabled={isExisting}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="e.g. karan@apollo.com"
            className={`w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border rounded-xl text-slate-900 dark:text-slate-100 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
              errors.email
                ? "border-rose-400 focus:border-rose-500"
                : "border-slate-200 dark:border-slate-700/80 focus:border-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-rose-500 font-medium">{errors.email}</p>
          )}
        </div>
      </div>

      {/* 4. Name (First & Last) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            First Name
          </label>
          <input
            type="text"
            value={formData.first_name}
            disabled={isExisting}
            onChange={(e) => handleChange("first_name", e.target.value)}
            placeholder="e.g. Karan"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Last Name
          </label>
          <input
            type="text"
            value={formData.last_name}
            disabled={isExisting}
            onChange={(e) => handleChange("last_name", e.target.value)}
            placeholder="e.g. Mehta"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* 5. Organization Role & Designation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          >
            <option value="ORG_EMPLOYEE">Employee</option>
            <option value="ORG_MANAGER">Manager</option>
            <option value="ORG_ADMIN">Org Admin</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Designation
          </label>
          <input
            type="text"
            value={formData.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
            placeholder="e.g. Senior Specialist"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Department
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
            placeholder="e.g. Operations"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* 6. Optional Password (only for new users) */}
      {!isExisting && (
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Password <span className="text-slate-400 font-normal">(Optional, auto-generated if blank)</span>
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Leave empty for auto-generated password"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>
      )}

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Calling Software API & Syncing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isExisting ? "Link to Software (Consume 1 Seat)" : "Provision & Consume 1 Seat"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
