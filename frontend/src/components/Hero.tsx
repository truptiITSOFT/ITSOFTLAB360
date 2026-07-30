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
    { icon: <HeadphonesIcon size={20} />, label: "HELP DESK", delay: 2.5, position: "-bottom-6 left-3/4 -translate-x-1/2", color: "text-blue-400 border-blue-500/30" },
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

            <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.15] mb-6 text-slate-900 dark:text-white transition-colors">
              The World's <span className="text-blue-500">1st</span> Company <br />
              to Provide <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-glow">All Solutions</span> in 1
            </h1>

            <p className="text-slate-600 dark:text-gray-300 text-lg mb-10 max-w-xl leading-relaxed transition-colors">
              IT Softlab 360 is the World's 1st Integrated Solution Provider <br className="hidden md:block" />
              offering <span className="text-purple-400 font-semibold">12+</span> Powerful Solutions in One Unified Platform.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link href="/franchise" className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                For Franchise <ArrowRight size={18} />
              </Link>
              <button className="flex items-center gap-2 bg-transparent border border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-300 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-white px-8 py-4 rounded-full font-medium transition-all">
                Watch Video <PlayCircle size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Content - 3D Globe Area */}
        <div className="relative z-10 flex justify-center items-center h-[600px] mt-10 lg:mt-0">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>

          {/* Main Globe Area */}
          <div className="relative w-[380px] h-[380px] flex items-center justify-center">

            {/* Glowing Base Platforms (Rings) */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-[100%] border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.2)] pointer-events-none" style={{ transform: 'rotateX(75deg)' }}>
              <div className="absolute inset-4 rounded-[100%] border border-blue-400/30"></div>
              <div className="absolute inset-10 rounded-[100%] border-[3px] border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.5)]"></div>
              <div className="absolute inset-16 rounded-[100%] border border-blue-300/50 bg-blue-600/10 blur-sm"></div>
            </div>

            {/* Orbit Rings (3D perspective) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-blue-500/20 border-dashed pointer-events-none" style={{ transform: 'rotateX(60deg)' }}></div>

            {/* Globe Sphere Background */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/80 via-[#020617]/90 to-[#020617] border border-blue-500/40 shadow-[inset_0_0_80px_rgba(59,130,246,0.6),_0_0_60px_rgba(59,130,246,0.4)] overflow-hidden">
              {/* Globe Grid lines (CSS approximation) */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen"></div>
              <div className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] border-blue-500/20 rounded-full" style={{ transform: 'rotateX(70deg)' }}></div>
              <div className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] border-blue-500/20 rounded-full" style={{ transform: 'rotateX(70deg) rotateY(45deg)' }}></div>
              <div className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] border-blue-500/20 rounded-full" style={{ transform: 'rotateX(70deg) rotateY(90deg)' }}></div>
              <div className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] border-blue-500/20 rounded-full" style={{ transform: 'rotateX(70deg) rotateY(135deg)' }}></div>

              <div className="absolute w-full h-[200%] top-1/2 left-0 -translate-y-1/2 border-[1px] border-blue-500/20 rounded-full" style={{ transform: 'rotateX(0deg)' }}></div>
              <div className="absolute w-full h-[200%] top-1/2 left-0 -translate-y-1/2 border-[1px] border-blue-500/20 rounded-full" style={{ transform: 'rotateX(45deg)' }}></div>
            </div>

            {/* Center Text inside Globe */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center">
              <h2 className="text-7xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tracking-tight">12+</h2>
              <p className="text-sm text-gray-200 font-bold tracking-widest mb-4">POWERFUL SOLUTIONS</p>
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                ONE UNIFIED PLATFORM
              </div>
            </div>

            {/* Orbiting Icons */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className={`absolute flex flex-col items-center justify-center gap-2 ${item.position} z-30`}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className={`w-12 h-12 rounded-full border bg-[#020617]/80 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] ${item.color}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] text-gray-300 font-bold tracking-wider text-center leading-tight whitespace-pre-line" dangerouslySetInnerHTML={{ __html: item.label.replace('\n', '<br/>') }}></span>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
