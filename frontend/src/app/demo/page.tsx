"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, User, Building, Mail, Phone, MessageSquare } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

export default function DemoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      goals: formData.get("goals"),
    };

    try {
      const response = await fetch("http://localhost:5000/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col pt-20 overflow-hidden">
      
      {/* Decorative gradient background matching /franchise */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-red-100/40 dark:from-red-900/20 via-amber-100/20 dark:via-amber-900/10 to-transparent blur-3xl opacity-70"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-blue-100/40 dark:from-blue-900/20 via-indigo-100/20 dark:via-indigo-900/10 to-transparent blur-3xl opacity-70"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-purple-100/30 dark:from-purple-900/20 via-pink-100/20 dark:via-pink-900/10 to-transparent blur-3xl opacity-60"></div>
        
        {/* Subtle mesh/grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]"></div>
      </div>
            
      <div className="relative z-10 flex-grow flex items-center justify-center py-20 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EB3158]/10 border border-[#EB3158]/20 text-[#EB3158] text-sm font-bold tracking-wider mb-6 transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#EB3158] animate-pulse transition-colors"></span>
              LIVE DEMONSTRATION
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#111A4A] dark:text-white transition-colors">
              See <span className="text-[#EB3158] tracking-tighter">IT Softlab 360</span> in Action
            </h1>
            <p className="text-[#15172B]/80 dark:text-gray-300 text-lg mb-8 leading-relaxed transition-colors">
              Schedule a personalized walkthrough with our experts. Discover how our integrated platform can streamline your operations, boost revenue, and scale with your franchise.
            </p>
            
            <div className="space-y-6">
              {[
                "Personalized platform walkthrough",
                "Deep dive into Franchise Model features",
                "Custom ROI analysis for your business",
                "Q&A with a dedicated solutions architect"
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-[#0f172a] border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 group-hover:bg-[#EB3158] group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-[#15172B] dark:text-gray-300 font-medium transition-colors">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow behind form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[80px] -z-10 pointer-events-none transition-colors"></div>

            <div className="bg-white/90 dark:bg-[#0f172a]/60 backdrop-blur-xl border border-blue-200 dark:border-blue-500/10 p-8 md:p-10 rounded-3xl shadow-xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-colors">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-green-50 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200 dark:border-transparent transition-colors">
                    <CheckCircle2 size={40} className="text-green-500 dark:text-green-400 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111A4A] dark:text-white mb-4 transition-colors">Request Received!</h3>
                  <p className="text-[#15172B]/70 dark:text-gray-400 mb-8 transition-colors">
                    Thank you for your interest. One of our solution architects will contact you shortly to schedule your personalized demo.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 dark:text-blue-400 hover:text-[#EB3158] font-bold transition-colors"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold text-[#111A4A] dark:text-white mb-6 transition-colors">Request Your Demo</h3>
                  
                  {error && (
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center transition-colors">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        <User size={18} />
                      </div>
                      <input required type="text" name="firstName" placeholder="First Name" className="w-full bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500/50 rounded-xl py-3 pl-11 pr-4 text-[#111A4A] dark:text-white outline-none transition-all focus:bg-white dark:focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder-slate-400 dark:placeholder-gray-500" />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        <User size={18} />
                      </div>
                      <input required type="text" name="lastName" placeholder="Last Name" className="w-full bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500/50 rounded-xl py-3 pl-11 pr-4 text-[#111A4A] dark:text-white outline-none transition-all focus:bg-white dark:focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder-slate-400 dark:placeholder-gray-500" />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input required type="email" name="email" placeholder="Work Email Address" className="w-full bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500/50 rounded-xl py-3 pl-11 pr-4 text-[#111A4A] dark:text-white outline-none transition-all focus:bg-white dark:focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder-slate-400 dark:placeholder-gray-500" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        <Building size={18} />
                      </div>
                      <input required type="text" name="company" placeholder="Company Name" className="w-full bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500/50 rounded-xl py-3 pl-11 pr-4 text-[#111A4A] dark:text-white outline-none transition-all focus:bg-white dark:focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder-slate-400 dark:placeholder-gray-500" />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        <Phone size={18} />
                      </div>
                      <input type="tel" name="phone" placeholder="Phone Number" className="w-full bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500/50 rounded-xl py-3 pl-11 pr-4 text-[#111A4A] dark:text-white outline-none transition-all focus:bg-white dark:focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder-slate-400 dark:placeholder-gray-500" />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <MessageSquare size={18} />
                    </div>
                    <textarea name="goals" placeholder="What are your main goals?" rows={3} className="w-full bg-slate-50 dark:bg-[#020617]/50 border border-slate-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500/50 rounded-xl py-3 pl-11 pr-4 text-[#111A4A] dark:text-white outline-none transition-all focus:bg-white dark:focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] placeholder-slate-400 dark:placeholder-gray-500 resize-none"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2 bg-[#EB3158] hover:bg-[#EB3158] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(235,49,88,0.3)] hover:shadow-[0_0_25px_rgba(235,49,88,0.5)] mt-2 hover:-translate-y-0.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">Processing <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></span>
                    ) : (
                      <>SCHEDULE DEMO <Send size={18} /></>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 dark:text-gray-500 text-center mt-4 transition-colors">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
      
      <ChatWidget />
    </main>
  );
}
