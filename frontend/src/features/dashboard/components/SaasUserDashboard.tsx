"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/lib/apiClient";
import { StoredUser } from "@/lib/authStorage";
import {
  Users,
  Database,
  Briefcase,
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  Building2,
  GraduationCap,
  FileText,
  FolderLock,
  ExternalLink,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Shield,
  Layers,
  Search,
  KeyRound,
  ArrowUpRight,
} from "lucide-react";

interface SaasProduct {
  id: number;
  name: string;
  code: string;
  route: string;
  description?: string;
  external_user_id?: string;
  subscription_id: number;
  license_key: string;
  is_active: boolean;
}

interface MyPortalResponse {
  organization_user_id?: number;
  user: {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };
  organization: {
    id: number;
    name: string;
    role: string;
    designation?: string;
    department?: string;
  };
  products: SaasProduct[];
  total_products: number;
}

// Visual metadata for all 12 ITSOFTLAB360 products
const PRODUCT_METADATA: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    bgLight: string;
    border: string;
    badgeBg: string;
  }
> = {
  hrmsm: {
    icon: Users,
    accentColor: "text-blue-600 dark:text-blue-400",
    bgLight: "from-blue-500/10 to-indigo-500/5",
    border: "border-blue-200 dark:border-blue-900/40",
    badgeBg: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  },
  erp: {
    icon: Database,
    accentColor: "text-purple-600 dark:text-purple-400",
    bgLight: "from-purple-500/10 to-violet-500/5",
    border: "border-purple-200 dark:border-purple-900/40",
    badgeBg: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  },
  crm: {
    icon: Briefcase,
    accentColor: "text-cyan-600 dark:text-cyan-400",
    bgLight: "from-cyan-500/10 to-teal-500/5",
    border: "border-cyan-200 dark:border-cyan-900/40",
    badgeBg: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  },
  pos: {
    icon: ShoppingCart,
    accentColor: "text-emerald-600 dark:text-emerald-400",
    bgLight: "from-emerald-500/10 to-green-500/5",
    border: "border-emerald-200 dark:border-emerald-900/40",
    badgeBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  qms: {
    icon: ShieldCheck,
    accentColor: "text-amber-600 dark:text-amber-400",
    bgLight: "from-amber-500/10 to-orange-500/5",
    border: "border-amber-200 dark:border-amber-900/40",
    badgeBg: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  },
  ai: {
    icon: Sparkles,
    accentColor: "text-pink-600 dark:text-pink-400",
    bgLight: "from-pink-500/10 to-rose-500/5",
    border: "border-pink-200 dark:border-pink-900/40",
    badgeBg: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  },
  sfa: {
    icon: TrendingUp,
    accentColor: "text-indigo-600 dark:text-indigo-400",
    bgLight: "from-indigo-500/10 to-blue-500/5",
    border: "border-indigo-200 dark:border-indigo-900/40",
    badgeBg: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
  },
  supplychain: {
    icon: Truck,
    accentColor: "text-teal-600 dark:text-teal-400",
    bgLight: "from-teal-500/10 to-emerald-500/5",
    border: "border-teal-200 dark:border-teal-900/40",
    badgeBg: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
  },
  vms: {
    icon: Building2,
    accentColor: "text-sky-600 dark:text-sky-400",
    bgLight: "from-sky-500/10 to-cyan-500/5",
    border: "border-sky-200 dark:border-sky-900/40",
    badgeBg: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  },
  lms: {
    icon: GraduationCap,
    accentColor: "text-yellow-600 dark:text-yellow-400",
    bgLight: "from-yellow-500/10 to-amber-500/5",
    border: "border-yellow-200 dark:border-yellow-900/40",
    badgeBg: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  },
  doms: {
    icon: FileText,
    accentColor: "text-rose-600 dark:text-rose-400",
    bgLight: "from-rose-500/10 to-red-500/5",
    border: "border-rose-200 dark:border-rose-900/40",
    badgeBg: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  },
  dms: {
    icon: FolderLock,
    accentColor: "text-slate-700 dark:text-slate-300",
    bgLight: "from-slate-500/10 to-gray-500/5",
    border: "border-slate-300 dark:border-slate-700",
    badgeBg: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
  },
};

function getMetadata(codeOrName: string) {
  const key = codeOrName.toLowerCase().replace(/[^a-z0-9]/g, "");
  return (
    PRODUCT_METADATA[key] || {
      icon: Layers,
      accentColor: "text-blue-600 dark:text-blue-400",
      bgLight: "from-blue-500/10 to-indigo-500/5",
      border: "border-blue-200 dark:border-blue-800",
      badgeBg: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    }
  );
}

interface SaasUserDashboardProps {
  user?: StoredUser | null;
}

export function SaasUserDashboard({ user }: SaasUserDashboardProps) {
  const [portalData, setPortalData] = useState<MyPortalResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [launchingProduct, setLaunchingProduct] = useState<string | null>(null);
  const [launchedToken, setLaunchedToken] = useState<{
    productName: string;
    ssoUrl: string;
    token: string;
  } | null>(null);

  useEffect(() => {
    fetchPortalData();
  }, []);

  const fetchPortalData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<MyPortalResponse>(
        "/api/franchise/organization-users/my-portal/"
      );
      setPortalData(response);
    } catch (err: any) {
      console.error("Failed to load user portal data:", err);
      setError(
        err?.data?.detail ||
          err?.message ||
          "Unable to load assigned applications. Please contact your administrator."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLaunchApp = async (product: SaasProduct) => {
    if (!portalData?.organization_user_id) {
      alert("Organization user ID not found. Please refresh.");
      return;
    }

    setLaunchingProduct(product.name);
    try {
      const res = await apiClient.post<{
        sso_token: string;
        launch_url: string;
        app_route?: string;
        product_code?: string;
      }>(
        `/api/franchise/organization-users/${portalData.organization_user_id}/sso-token/`,
        { product_name: product.name }
      );

      const targetRoute = res.app_route || product.route || `${product.code}.itsoftlab360.com`;
      const ssoUrl = `https://${targetRoute}/auth/sso-callback?token=${res.sso_token}`;

      setLaunchedToken({
        productName: product.name,
        ssoUrl: ssoUrl,
        token: res.sso_token,
      });

      // Automatically attempt popup window
      window.open(ssoUrl, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      alert(
        err?.data?.error ||
          err?.message ||
          "Failed to generate SSO authentication token."
      );
    } finally {
      setLaunchingProduct(null);
    }
  };

  const filteredProducts = (portalData?.products || []).filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/40">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-300">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>ITSOFTLAB360 Centralized SaaS Launchpad</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {portalData?.user?.first_name || user?.first_name || user?.username}!
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Launch your authorized organizational applications with Single Sign-On. One central login
              gives you immediate, secure access to your assigned software tools.
            </p>
          </div>

          {/* Quick Member Badge */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col space-y-1 min-w-[220px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Organization
            </span>
            <span className="text-base font-bold text-white">
              {portalData?.organization?.name || user?.organization_name || "Enterprise Member"}
            </span>
            <div className="flex items-center space-x-2 pt-1 text-xs text-blue-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {portalData?.organization?.designation ||
                  portalData?.organization?.role ||
                  "Active Employee"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SSO Token Modal / Floating Alert */}
      {launchedToken && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900 dark:text-emerald-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start space-x-3">
            <KeyRound className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">
                SSO Session Created for {launchedToken.productName}
              </p>
              <p className="text-emerald-700 dark:text-emerald-300 text-[11px]">
                A new browser tab was opened. If blocked by a popup blocker, click the launch button directly.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <a
              href={launchedToken.ssoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <span>Launch Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setLaunchedToken(null)}
              className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 rounded-lg"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 3. Section Controls & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>My Authorized Applications</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold">
              {portalData?.total_products || 0}
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Click &apos;Launch Application&apos; to instantly authenticate into any product without typing passwords.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search software..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      {/* 4. Products Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
          <p className="text-sm font-medium">Checking organization software licenses...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-2xl flex items-start space-x-3 text-rose-800 dark:text-rose-300">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm">Error Loading Applications</h3>
            <p className="text-xs mt-1">{error}</p>
            <button
              onClick={fetchPortalData}
              className="mt-3 px-3.5 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
            {searchTerm ? "No matching software found" : "No Applications Assigned Yet"}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-2">
            {searchTerm
              ? `No software matched "${searchTerm}". Try a different search term.`
              : "Your organization administrator has not yet provisioned your account for any software modules. Please contact your IT or HR department."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => {
            const meta = getMetadata(product.code || product.name);
            const Icon = meta.icon;
            const isLaunching = launchingProduct === product.name;

            return (
              <div
                key={product.id}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-5 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Background ambient gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${meta.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative z-10 space-y-3">
                  {/* Card Header: Icon + Badge */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 border ${meta.border} shadow-inner group-hover:scale-105 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${meta.accentColor}`} />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${meta.badgeBg}`}
                    >
                      {product.code.toUpperCase()}
                    </span>
                  </div>

                  {/* Title & Route */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                      {product.route || `${product.code}.itsoftlab360.com`}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {product.description ||
                      "Enterprise-grade business application powered by ITSOFTLAB360 suite."}
                  </p>

                  {/* Status Indicator */}
                  <div className="flex items-center space-x-2 pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active License Quota</span>
                  </div>
                </div>

                {/* Launch Button */}
                <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleLaunchApp(product)}
                    disabled={isLaunching}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all group-hover:shadow-lg disabled:opacity-60"
                  >
                    {isLaunching ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Signing SSO Token...</span>
                      </>
                    ) : (
                      <>
                        <span>Launch Application</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Informational SSO Box */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Zero-Password Central Authentication (SSO)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              When you click launch, ITSOFTLAB360 cryptographically signs a short-lived token to authenticate you into the remote product database automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
