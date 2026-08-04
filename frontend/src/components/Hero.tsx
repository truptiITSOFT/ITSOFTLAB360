"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, PlayCircle, Star,
  Users, Megaphone, CreditCard,
  Banknote, Globe, HeadphonesIcon,
  BarChart, Package, Calculator,
  Briefcase, Handshake
} from "lucide-react";

export default function Hero() {
  const floatingIcons = [
    { icon: <Users size={20} />, label: "HRMS", delay: 0, position: "-top-6 left-1/2 -translate-x-1/2", color: "text-purple-400 border-purple-500/30" },
    { icon: <Handshake size={20} />, label: "CRM", delay: 0.2, position: "top-2 left-12", color: "text-blue-300 border-blue-400/30" },
    { icon: <Briefcase size={20} />, label: "PROJECT\nMANAGEMENT", delay: 1.8, position: "top-12 -left-4", color: "text-cyan-400 border-cyan-500/30" },
    { icon: <Calculator size={20} />, label: "ACCOUNTING", delay: 0.8, position: "top-1/2 -left-12 -translate-y-1/2", color: "text-green-300 border-green-400/30" },
    { icon: <Package size={20} />, label: "INVENTORY\nMANAGEMENT", delay: 2.2, position: "bottom-8 left-0", color: "text-orange-400 border-orange-500/30" },
    { icon: <BarChart size={20} />, label: "BI & ANALYTICS", delay: 1.2, position: "-bottom-6 left-1/4 -translate-x-1/2", color: "text-indigo-400 border-indigo-500/30" },
    { icon: <HeadphonesIcon size={20} />, label: "HELP DESK", delay: 2.5, position: "-bottom-6 left-3/4 -translate-x-1/2", color: "text-[#EB3158] border-blue-500/30" },
    { icon: <Globe size={20} />, label: "WEBSITE &\nAPP BUILDER", delay: 1.5, position: "bottom-2 right-12", color: "text-teal-400 border-teal-500/30" },
    { icon: <Banknote size={20} />, label: "PAYROLL", delay: 0.5, position: "bottom-16 -right-4", color: "text-green-400 border-green-500/30" },
    { icon: <CreditCard size={20} />, label: "POS", delay: 2, position: "top-1/2 -right-12 -translate-y-1/2", color: "text-yellow-400 border-yellow-500/30" },
    { icon: <Megaphone size={20} />, label: "MARKETING\nAUTOMATION", delay: 1, position: "top-12 -right-4", color: "text-pink-400 border-pink-500/30" },
  ];

  return (
    <section className="relative pt-24 pb-20 lg:pt-28 lg:pb-28 overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-500/30 rounded-full w-fit mb-8 shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-colors">
              <Star size={14} className="text-cyan-500 dark:text-cyan-400 fill-cyan-500 dark:fill-cyan-400" />
              <span className="text-xs text-blue-700 dark:text-blue-100 font-bold tracking-wider transition-colors">WORLD'S #1 COMPANY</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.15] mb-6 text-[#111A4A] dark:text-white transition-colors">
              The World's <span className="text-[#EB3158]">1st</span> Company <br />
              to Provide <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-glow">All Solutions</span> in 1
            </h1>

            <p className="text-[#15172B]/80 dark:text-gray-300 text-lg mb-10 max-w-xl leading-relaxed transition-colors">
              IT Softlab 360 is the World's 1st Integrated Solution Provider <br className="hidden md:block" />
              offering <span className="text-purple-400 font-semibold">12+</span> Powerful Solutions in One Unified Platform.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link href="/franchise" className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                For Franchise <ArrowRight size={18} />
              </Link>
              <button className="flex items-center gap-2 bg-transparent border border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-300 hover:bg-slate-50 dark:hover:bg-white/5 text-[#15172B] dark:text-white px-8 py-4 rounded-full font-medium transition-all">
                Watch Video <PlayCircle size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Video Area */}
        <div className="relative z-10 flex justify-center items-center h-[600px] mt-10 lg:mt-0 w-full max-w-lg mx-auto">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EB3158]/20 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Video Container */}
          <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.3)] bg-[#020617]/50 backdrop-blur-sm z-20 flex items-center justify-center group">
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400 rounded-tl-[3rem] opacity-50 z-30 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#EB3158]/50 rounded-br-[3rem] opacity-50 z-30 pointer-events-none"></div>

            <video
              src="/videos/ITSOFTLAB360_cube.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover mix-blend-lighten opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
