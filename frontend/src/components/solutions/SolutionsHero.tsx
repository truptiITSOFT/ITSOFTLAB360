"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, LayoutDashboard, Settings, BarChart } from "lucide-react";
import Link from "next/link";

export default function SolutionsHero() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#EB3158] dark:text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4 transition-colors">
              SOLUTIONS
            </h2>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#111A4A] dark:text-white transition-colors">
              Transform Every <br /> Business Process With <br />
              <span className="text-[#EB3158] dark:text-blue-500 text-glow">One Connected Platform</span>
            </h1>
            <p className="text-[#15172B]/80 dark:text-gray-300 text-lg mb-8 max-w-xl leading-relaxed transition-colors">
              Empower your teams with intelligent solutions that connect people, customers, operations, and data — all from one unified business ecosystem.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link href="#categories" className="flex items-center gap-2 bg-[#EB3158] hover:bg-[#EB3158] text-white px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                EXPLORE SOLUTIONS <ArrowRight size={18} />
              </Link>
              <Link href="/demo" className="flex items-center gap-2 bg-white/50 dark:bg-transparent border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-[#15172B] dark:text-white px-8 py-4 rounded-full font-medium transition-all">
                REQUEST DEMO <ArrowRight size={18} />
              </Link>
            </div>

            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 transition-colors">
              <Trophy size={18} className="text-[#EB3158] dark:text-blue-400" />
              <span className="text-sm text-slate-700 dark:text-gray-300 font-medium transition-colors">World&apos;s First Franchise Model Solution Provider <span className="text-[#EB3158] dark:text-blue-400">—</span> All in 1 Place</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Abstract Dashboard Representation */}
        <div className="z-10 relative h-[400px] lg:h-[500px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-lg aspect-square"
          >
            {/* Center Main Dashboard */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-40 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border border-blue-200 dark:border-blue-500/30 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.15)] dark:shadow-[0_0_50px_rgba(59,130,246,0.2)] p-4 flex flex-col z-20 transition-colors">
              <div className="flex items-center justify-between mb-4 border-b border-[#111A4A]/10 dark:border-gray-700 pb-2 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#EB3158] rounded flex items-center justify-center"><LayoutDashboard size={12} className="text-white" /></div>
                  <span className="text-xs font-bold text-[#15172B] dark:text-white tracking-wider transition-colors">IT SOFTLAB 360</span>
                </div>
              </div>
              <div className="flex gap-2 h-full">
                <div className="w-1/3 bg-gray-200/50 dark:bg-gray-800/50 rounded h-full transition-colors"></div>
                <div className="w-2/3 flex flex-col gap-2">
                  <div className="h-1/2 bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/20 rounded transition-colors"></div>
                  <div className="h-1/2 bg-gray-200/50 dark:bg-gray-800/50 rounded flex gap-2 transition-colors">
                    <div className="w-1/2 bg-indigo-100/50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-500/20 rounded transition-colors"></div>
                    <div className="w-1/2 bg-purple-100/50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-500/20 rounded transition-colors"></div>
                  </div>
                </div>
              </div>
              {/* Glowing Center Core */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#EB3158] shadow-[0_0_20px_rgba(59,130,246,0.4)] dark:shadow-[0_0_30px_rgba(59,130,246,0.8)] rotate-45 rounded flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-300 rounded rotate-0 opacity-50"></div>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-[#EB3158] dark:text-blue-400 font-bold whitespace-nowrap transition-colors">One Connected Platform</div>
            </div>

            {/* Connecting Nodes */}
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-4 left-4 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#020617] border border-blue-200 dark:border-blue-500/40 flex items-center justify-center text-[#EB3158] dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors">
                <Users size={20} />
              </div>
              <span className="text-xs text-[#15172B]/60 dark:text-gray-400 font-medium transition-colors">Customers</span>
            </motion.div>

            <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} className="absolute bottom-4 left-4 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#020617] border border-blue-200 dark:border-blue-500/40 flex items-center justify-center text-[#EB3158] dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors">
                <Users size={20} />
              </div>
              <span className="text-xs text-[#15172B]/60 dark:text-gray-400 font-medium transition-colors">Teams</span>
            </motion.div>

            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} className="absolute top-4 right-4 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#020617] border border-blue-200 dark:border-blue-500/40 flex items-center justify-center text-[#EB3158] dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors">
                <Settings size={20} />
              </div>
              <span className="text-xs text-[#15172B]/60 dark:text-gray-400 font-medium transition-colors">Operations</span>
            </motion.div>

            <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }} className="absolute bottom-4 right-4 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#020617] border border-blue-200 dark:border-blue-500/40 flex items-center justify-center text-[#EB3158] dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors">
                <BarChart size={20} />
              </div>
              <span className="text-xs text-[#15172B]/60 dark:text-gray-400 font-medium transition-colors">Data & Insights</span>
            </motion.div>

            {/* Connecting SVG Lines */}
            <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M20,20 L50,50 M20,80 L50,50 M80,20 L50,50 M80,80 L50,50"
                stroke="rgba(59,130,246,0.3)"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>

            {/* Large Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#EB3158]/10 rounded-full blur-[100px] -z-20 pointer-events-none"></div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
