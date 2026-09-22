"use client";

import React, { useState } from "react";
import { User, Lock, ArrowRight, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { PortalType, loginSchema } from "../../types";

interface LoginFormProps {
  portalType: PortalType;
  submitLabel?: string;
  placeholderUser?: string;
  accentGradient?: string;
}

export function LoginForm({
  portalType,
  submitLabel = "Sign In",
  placeholderUser = "Enter username",
  accentGradient = "from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
}: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");
  const [redirectNotice, setRedirectNotice] = useState<{ url: string; label: string } | null>(null);

  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setFieldErrors({});
    setRedirectNotice(null);

    // Zod validation
    const validation = loginSchema.safeParse({ username, password, portal_type: portalType });
    if (!validation.success) {
      const errs: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (field) errs[field] = issue.message;
      });
      setFieldErrors(errs);
      return;
    }

    try {
      await login(username, password, portalType);
    } catch (err: any) {
      const message = err?.data?.detail || err?.message || "Invalid credentials. Please check your username & password.";
      setErrorMsg(message);

      // if (err?.data?.redirect_url) {
      //   setRedirectNotice({
      //     url: err.data.redirect_url,
      //     label: `Click here to open ${err.data.correct_portal || "your"} Portal`,
      //   });
      // }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 rounded-2xl text-rose-700 dark:text-rose-300 text-xs font-medium space-y-2">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <span className="flex-1">{errorMsg}</span>
          </div>
          {redirectNotice && (
            <Link
              href={redirectNotice.url}
              className="inline-flex items-center space-x-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
            >
              <span>{redirectNotice.label}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}

      {/* Username Field */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Username *
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            required
            placeholder={placeholderUser}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/70 border rounded-xl text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-medium ${
              fieldErrors.username
                ? "border-rose-400 focus:border-rose-500"
                : "border-slate-200 dark:border-slate-700/80 focus:border-blue-500"
            }`}
          />
        </div>
        {fieldErrors.username && (
          <p className="text-[11px] text-rose-500 font-medium mt-1">{fieldErrors.username}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Password *
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="password"
            required
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/70 border rounded-xl text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-medium ${
              fieldErrors.password
                ? "border-rose-400 focus:border-rose-500"
                : "border-slate-200 dark:border-slate-700/80 focus:border-blue-500"
            }`}
          />
        </div>
        {fieldErrors.password && (
          <p className="text-[11px] text-rose-500 font-medium mt-1">{fieldErrors.password}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full mt-3 py-3.5 bg-gradient-to-r ${accentGradient} text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Authenticating...</span>
          </>
        ) : (
          <>
            <span>{submitLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
