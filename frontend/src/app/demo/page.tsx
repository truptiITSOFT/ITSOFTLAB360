"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, User, Building, Mail, Phone, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
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
    <main className="min-h-screen relative flex flex-col pt-20">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Live Demonstration
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              See <span className="text-blue-500 text-glow">IT Softlab 360</span> in Action
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
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
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-gray-300 font-medium">{benefit}</span>
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-gray-700/50 p-8 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Request Received!</h3>
                  <p className="text-gray-400 mb-8">
                    Thank you for your interest. One of our solution architects will contact you shortly to schedule your personalized demo.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold text-white mb-6">Request Your Demo</h3>
                  
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm text-center">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                        <User size={18} />
                      </div>
                      <input required type="text" name="firstName" placeholder="First Name" className="w-full bg-[#020617]/50 border border-gray-700 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]" />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                        <User size={18} />
                      </div>
                      <input required type="text" name="lastName" placeholder="Last Name" className="w-full bg-[#020617]/50 border border-gray-700 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]" />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input required type="email" name="email" placeholder="Work Email Address" className="w-full bg-[#020617]/50 border border-gray-700 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                        <Building size={18} />
                      </div>
                      <input required type="text" name="company" placeholder="Company Name" className="w-full bg-[#020617]/50 border border-gray-700 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]" />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                        <Phone size={18} />
                      </div>
                      <input type="tel" name="phone" placeholder="Phone Number" className="w-full bg-[#020617]/50 border border-gray-700 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]" />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                      <MessageSquare size={18} />
                    </div>
                    <textarea name="goals" placeholder="What are your main goals?" rows={3} className="w-full bg-[#020617]/50 border border-gray-700 focus:border-blue-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all focus:bg-[#020617] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] resize-none"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">Processing <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></span>
                    ) : (
                      <>SCHEDULE DEMO <Send size={18} /></>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
      
      <ChatWidget />
      
      {/* Global decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3"></div>
      </div>
    </main>
  );
}
