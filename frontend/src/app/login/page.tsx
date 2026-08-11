"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // const res = await fetch("http://localhost:5000/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      if (email && password) {
        if (email === "harsh@gmail.com" && password === "harsh@gmail.com") {
          localStorage.setItem("token", "itsoftlab360-user-token");
          router.push("/products");
        }
      }

      // const data = await res.json();

    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col transition-colors">

      <div className="flex-grow flex items-center justify-center p-4 pt-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#EB3158]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-[#F5C842]/10 rounded-full blur-[80px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-[#0a1125] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden relative z-10"
        >
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#111A4A] dark:text-white mb-2">Welcome Back</h1>
              <p className="text-[#15172B]/60 dark:text-gray-400 text-sm">
                Sign in to access the 12 Powerful Products
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center border border-red-100 dark:border-red-900/50">
                  {error}
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-[#111A4A]/10 dark:border-white/10 rounded-xl text-[#111A4A] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password (password)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111827] border border-[#111A4A]/10 dark:border-white/10 rounded-xl text-[#111A4A] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-[#15172B]/80 dark:text-gray-400">
                  <input type="checkbox" className="rounded border-slate-300 text-[#EB3158] focus:ring-blue-500" />
                  <span>Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-[#EB3158] dark:text-blue-400 hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign In"} <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="bg-slate-50 dark:bg-white/5 py-4 text-center border-t border-slate-100 dark:border-white/5">
            <p className="text-sm text-[#15172B]/80 dark:text-gray-400">
              Don&apos;t have an account? <Link href="/contact" className="text-[#EB3158] dark:text-blue-400 font-bold hover:underline">Contact Us</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
