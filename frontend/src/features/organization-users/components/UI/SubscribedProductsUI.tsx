"use client";

import React from "react";
import {
  Package,
  Users,
  KeyRound,
  Copy,
  Check,
  UserPlus,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { SubscribedProduct } from "../../types";
import { ProductCardsSkeleton } from "../skeleton/UserTableSkeleton";

interface SubscribedProductsUIProps {
  products: SubscribedProduct[];
  isLoading?: boolean;
  onProvisionForProduct: (productName: string) => void;
}

export function SubscribedProductsUI({
  products,
  isLoading,
  onProvisionForProduct,
}: SubscribedProductsUIProps) {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (isLoading) {
    return <ProductCardsSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-3">
        <Package className="w-10 h-10 text-slate-400 mx-auto stroke-1" />
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          No Active Software Subscriptions Found
        </h4>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Your organization has not been assigned any software products yet. Contact your franchise
          representative to purchase product subscriptions.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((sub) => {
        const usagePercent =
          sub.license_count > 0 ? Math.round((sub.used_licenses / sub.license_count) * 100) : 0;
        const isLimitReached = sub.available_licenses <= 0;

        return (
          <div
            key={sub.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
          >
            {/* Top Product Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600/10 to-indigo-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-sm">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    {sub.product_name}
                  </h4>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      sub.is_valid
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {sub.is_valid ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3 h-3" />
                        Inactive
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* License Summary Pill */}
              <div className="text-right">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {sub.used_licenses} / {sub.license_count}
                </span>
                <p className="text-[10px] text-slate-400">Seats Used</p>
              </div>
            </div>

            {/* License Usage Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  License Capacity
                </span>
                <span
                  className={`font-bold ${
                    isLimitReached
                      ? "text-rose-600 dark:text-rose-400"
                      : usagePercent > 80
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {sub.available_licenses} seat{sub.available_licenses !== 1 ? "s" : ""} available
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isLimitReached
                      ? "bg-rose-500"
                      : usagePercent > 80
                      ? "bg-amber-500"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500"
                  }`}
                  style={{ width: `${Math.min(100, Math.max(5, usagePercent))}%` }}
                />
              </div>
            </div>

            {/* License Key & Quick Action Button */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleCopyKey(sub.license_key)}
                className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors truncate max-w-[170px]"
                title="Copy License Key"
              >
                <KeyRound className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{sub.license_key.slice(0, 13)}...</span>
                {copiedKey === sub.license_key ? (
                  <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400 shrink-0" />
                )}
              </button>

              <button
                type="button"
                disabled={isLimitReached || !sub.is_valid}
                onClick={() => onProvisionForProduct(sub.product_name)}
                className="px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl flex items-center space-x-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 border border-blue-200/60 dark:border-blue-800/40"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Provision User</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
