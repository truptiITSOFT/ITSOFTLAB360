"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Package,
  Building2,
  DollarSign,
  Users,
  LogOut,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useAuth } from "@/features/authentication/hooks/useAuth";

interface SidebarProps {
  currentRole: string;
  isFranchiseUser?: boolean;
  isSaasUser?: boolean;
  isOrgAdmin?: boolean;
}

export function Sidebar({ currentRole, isFranchiseUser, isSaasUser, isOrgAdmin }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";
  const { logout } = useAuth();

  const getMenuItems = () => {
    if (isSaasUser) {
      return [
        { label: "My Applications", href: "/app-dashboard", tab: "overview", icon: LayoutDashboard },
      ];
    }

    if (isOrgAdmin) {
      return [
        { label: "Users & Licenses", href: "/app-dashboard?tab=org-users", tab: "org-users", icon: Users },
        { label: "Subscribed Software", href: "/app-dashboard?tab=products", tab: "products", icon: Package },
      ];
    }

    if (isFranchiseUser) {
      return [
        { label: "Dashboard", href: "/app-dashboard", tab: "overview", icon: LayoutDashboard },
        { label: "Client Subscriptions", href: "/app-dashboard?tab=client-requests", tab: "client-requests", icon: FileText },
        { label: "Software & Licenses", href: "/app-dashboard?tab=org-users", tab: "org-users", icon: Users },
        { label: "Franchise Team", href: "/app-dashboard?tab=franchise-team", tab: "franchise-team", icon: Users },
        { label: "Products Catalog", href: "/app-dashboard?tab=products", tab: "products", icon: Package },
      ];
    }


    switch (currentRole) {
      case "Sales":
        return [
          { label: "Sales Overview", href: "/app-dashboard", tab: "overview", icon: LayoutDashboard },
          { label: "Franchise Requests", href: "/app-dashboard?tab=requests", tab: "requests", icon: FileText },
          { label: "Products Catalog", href: "/app-dashboard?tab=products", tab: "products", icon: Package },
        ];

      case "Accountant":
        return [
          { label: "Financial Overview", href: "/app-dashboard", tab: "overview", icon: LayoutDashboard },
          { label: "All Requests", href: "/app-dashboard?tab=requests", tab: "requests", icon: Clock },
          { label: "Invoices & Revenue", href: "/app-dashboard?tab=invoices", tab: "invoices", icon: DollarSign },
        ];

      case "IT":
        return [
          { label: "All Franchise", href: "/app-dashboard", tab: "overview", icon: LayoutDashboard },
          { label: "Software & Licenses", href: "/app-dashboard?tab=org-users", tab: "org-users", icon: Users },
          { label: "Active Franchises", href: "/app-dashboard?tab=franchises", tab: "franchises", icon: Building2 },
          { label: "System Products", href: "/app-dashboard?tab=products", tab: "products", icon: Package },
        ];

      case "Admin":
      default:
        return [
          { label: "Executive Dashboard", href: "/app-dashboard", tab: "overview", icon: LayoutDashboard },
          { label: "Internal Team", href: "/app-dashboard?tab=internal-team", tab: "internal-team", icon: Users },
          { label: "Software & Licenses", href: "/app-dashboard?tab=org-users", tab: "org-users", icon: Users },
          { label: "Franchise Requests", href: "/app-dashboard?tab=requests", tab: "requests", icon: FileText },
          { label: "Active Franchises", href: "/app-dashboard?tab=franchises", tab: "franchises", icon: Building2 },
          { label: "Invoices Directory", href: "/app-dashboard?tab=invoices", tab: "invoices", icon: DollarSign },
          { label: "System Products", href: "/app-dashboard?tab=products", tab: "products", icon: Package },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col justify-between p-4 border-r border-slate-800 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="flex items-center space-x-3 px-3 py-4 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/30">
            360
          </div>
          <div>
            <h2 className="font-extrabold text-white text-base leading-none">ITSOFTLAB360</h2>
            <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">
              {isSaasUser
                ? "SaaS Launchpad"
                : isOrgAdmin
                ? "Organization Admin"
                : isFranchiseUser
                ? "Franchise Portal"
                : `${currentRole || "Staff"} Workspace`}
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mt-6 space-y-1">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Navigation Menu
          </div>
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentTab === item.tab;

            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={() => logout()}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

function ClockIcon(props: any) {
  return <FileText {...props} />;
}
