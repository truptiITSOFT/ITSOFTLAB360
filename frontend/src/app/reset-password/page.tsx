"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("No reset token provided. Please request a new link.");
    }
  }, [token]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-[#0a1125] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden relative z-10">
      <div className="p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#111A4A] dark:text-white mb-2">Reset Password</h1>
          <p className="text-[#15172B]/60 dark:text-gray-400 text-sm">
            Enter your new password below.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 dark:bg-green-900/30 text-green-600 p-4 rounded-lg text-sm border border-green-100 dark:border-green-900/50">
              Password reset successful! Redirecting to login...
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-5">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center border border-red-100 dark:border-red-900/50">
                {error}
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-400" />
              </div>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-[#111A4A]/10 dark:border-white/10 rounded-xl text-[#111A4A] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                disabled={!token}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-400" />
              </div>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-[#111A4A]/10 dark:border-white/10 rounded-xl text-[#111A4A] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                disabled={!token}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 disabled:opacity-70"
            >
              {loading ? "Resetting..." : "Reset Password"} <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
      
      <div className="bg-slate-50 dark:bg-white/5 py-4 text-center border-t border-slate-100 dark:border-white/5">
        <p className="text-sm text-[#15172B]/80 dark:text-gray-400">
          Remember your password? <Link href="/login" className="text-[#EB3158] dark:text-blue-400 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen relative flex flex-col transition-colors">
            
      <div className="flex-grow flex items-center justify-center p-4 pt-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#EB3158]/10 rounded-full blur-[80px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="p-8 text-center text-white">Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </motion.div>
      </div>
    </main>
  );
}
