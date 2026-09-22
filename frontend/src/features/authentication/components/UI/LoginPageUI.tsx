"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Shield, Building2, Layers, Users, Sparkles } from "lucide-react";
import { LoginForm } from "../form/LoginForm";
import { PortalType } from "../../types";

interface LoginPageUIProps {
  portalType: PortalType;
}

const PORTAL_CONFIG = {
  INTERNAL: {
    badge: "Internal Staff Portal",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    title: "ITSOFTLAB360 Executive Portal",
    subtitle: "Internal Team Access (Superadmin, IT, Sales, Accountant)",
    placeholderUser: "e.g. admin or sales_rajesh",
    submitLabel: "Sign In to Internal Workspace",
    accentGradient: "from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20",
    glowColor: "bg-blue-600/15",
    icon: Shield,
  },
  FRANCHISE: {
    badge: "Franchise Partner Portal",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    title: "Franchise Team Portal",
    subtitle: "Franchise Workspace (Franchise Admin, Sales, IT, Accountant)",
    placeholderUser: "e.g. fadmin_metro",
    submitLabel: "Sign In to Franchise Portal",
    accentGradient: "from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/20",
    glowColor: "bg-indigo-600/15",
    icon: Building2,
  },
  ORGANIZATION: {
    badge: "Organization Admin Portal",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    title: "Organization Client Portal",
    subtitle: "Software License Allocation & Organization Staff Provisioning",
    placeholderUser: "e.g. apollo_admin",
    submitLabel: "Sign In to Organization Dashboard",
    accentGradient: "from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-500/20",
    glowColor: "bg-cyan-600/15",
    icon: Layers,
  },
  SAAS: {
    badge: "SaaS Product Portal",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    title: "ITSOFTLAB360 Application Login",
    subtitle: "Unified access for HRMS, CRM, Hospital, School & Enterprise users",
    placeholderUser: "e.g. dr_rahul",
    submitLabel: "Sign In to Software Portal",
    accentGradient: "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20",
    glowColor: "bg-emerald-600/15",
    icon: Users,
  },
};

export function LoginPageUI({ portalType }: LoginPageUIProps) {
  const config = PORTAL_CONFIG[portalType] || PORTAL_CONFIG.SAAS;
  const Icon = config.icon;

  const getPortalLinks = () => {
    switch (portalType) {
      case "INTERNAL":
        return [
          { label: "Franchise Portal", href: "/franchise/login" },
          { label: "Organization Admin", href: "/org/login" },
          { label: "SaaS Application User", href: "/login" },
        ];
      case "FRANCHISE":
        return [
          { label: "Internal Staff Portal", href: "/admin/login" },
          { label: "Organization Admin", href: "/org/login" },
          { label: "SaaS Application User", href: "/login" },
        ];
      case "ORGANIZATION":
        return [
          { label: "Franchise Partner Portal", href: "/franchise/login" },
          { label: "Internal Staff Portal", href: "/admin/login" },
          { label: "SaaS Application User", href: "/login" },
        ];
      case "SAAS":
      default:
        return [
          { label: "Organization Admin Portal", href: "/org/login" },
          { label: "Franchise Partner Portal", href: "/franchise/login" },
          { label: "Internal Staff Portal", href: "/admin/login" },
        ];
    }
  };

  const portalLinks = getPortalLinks();

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 bg-slate-950 overflow-hidden font-sans">
      {/* Visual Ambient Background Glows */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${config.glowColor} rounded-full blur-[140px] pointer-events-none`}
      />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative z-10"
      >
        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border mb-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700">
              <Icon className="w-3.5 h-3.5 text-blue-500" />
              <span>{config.badge}</span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {config.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              {config.subtitle}
            </p>
          </div>

          {/* Form */}
          <LoginForm
            portalType={portalType}
            placeholderUser={config.placeholderUser}
            submitLabel={config.submitLabel}
            accentGradient={config.accentGradient}
          />

          {/* Other Portal Switcher Links */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center space-y-2">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Switch to other portals:
            </p>
            <div className="flex items-center justify-center flex-wrap gap-2 text-xs font-semibold">
              {portalLinks.map((link, idx) => (
                <React.Fragment key={link.href}>
                  {idx > 0 && <span className="text-slate-300 dark:text-slate-700">&bull;</span>}
                  <Link
                    href={link.href}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="bg-slate-50 dark:bg-slate-900/80 py-3.5 px-8 text-center border-t border-slate-100 dark:border-slate-800 flex items-center justify-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Role-Guarded Enterprise Authentication &bull; ITSOFTLAB360</span>
        </div>
      </motion.div>
    </main>
  );
}
