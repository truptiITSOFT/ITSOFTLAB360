"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [simulatedToken, setSimulatedToken] = useState("");

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        if (data._simulatedToken) {
          setSimulatedToken(data._simulatedToken);
        }
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
    <main className="min-h-screen relative flex flex-col transition-colors">
            
      <div className="flex-grow flex items-center justify-center p-4 pt-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#EB3158]/10 rounded-full blur-[80px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white  rounded-[2rem] shadow-2xl border border-gray-100  overflow-hidden relative z-10"
        >
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#111A4A]  mb-2">Forgot Password</h1>
              <p className="text-[#15172B]/60  text-sm">
                Enter your email address to receive a reset link.
              </p>
            </div>

            {success ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100  text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111A4A]  mb-2">Check your email</h3>
                  <p className="text-sm text-[#15172B]/80 ">
                    If an account exists for that email, we have sent instructions to reset your password.
                  </p>
                </div>
                
                {simulatedToken && (
                  <div className="mt-6 p-4 bg-yellow-50  border border-yellow-200  rounded-lg text-left">
                    <p className="text-xs text-yellow-800  font-bold mb-2 uppercase">Development Mode Simulation</p>
                    <p className="text-sm text-slate-700  mb-3">Instead of checking your email, use this simulated token to reset your password now:</p>
                    <Link 
                      href={`/reset-password?token=${simulatedToken}`}
                      className="block text-center w-full bg-slate-900  text-white  py-2 rounded-lg text-sm font-semibold hover:bg-slate-800  transition-colors"
                    >
                      Go to Reset Password
                    </Link>
                  </div>
                )}

                <div className="pt-4">
                  <Link href="/login" className="text-[#EB3158]  font-semibold hover:underline">
                    Back to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-5">
                {error && (
                  <div className="bg-red-50  text-red-600  p-3 rounded-lg text-sm text-center border border-red-100 ">
                    {error}
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50  border border-[#111A4A]/10  rounded-xl text-[#111A4A]  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Reset Link"} <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
          
          <div className="bg-slate-50  py-4 text-center border-t border-slate-100 ">
            <p className="text-sm text-[#15172B]/80 ">
              Remember your password? <Link href="/login" className="text-[#EB3158]  font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
