"use client";

import { motion } from "framer-motion";
import { ArrowRight, Settings, GraduationCap, Megaphone, DollarSign, HeadphonesIcon, Package, BarChart } from "lucide-react";

export default function FranchiseHero() {
  const nodes = [
    { label: "Operations", icon: <Settings size={18} />, position: "top-4 left-1/4", delay: 0.1 },
    { label: "Training", icon: <GraduationCap size={18} />, position: "-top-6 left-1/2 -translate-x-1/2", delay: 0.2 },
    { label: "Marketing", icon: <Megaphone size={18} />, position: "top-4 right-1/4", delay: 0.3 },
    { label: "Finance", icon: <DollarSign size={18} />, position: "top-1/3 -right-6", delay: 0.4 },
    { label: "Support", icon: <HeadphonesIcon size={18} />, position: "bottom-1/3 -right-6", delay: 0.5 },
    { label: "Inventory", icon: <Package size={18} />, position: "top-1/3 -left-6", delay: 0.6 },
    { label: "Analytics", icon: <BarChart size={18} />, position: "bottom-1/3 -left-6", delay: 0.7 },
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-500/30 rounded-full w-fit mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <span className="text-xs text-blue-700 dark:text-blue-300 font-bold tracking-wider uppercase transition-colors">Franchise Model Solution</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#111A4A] dark:text-white transition-colors">
              The World’s First IT Company to Offer 12 IT Solutions <br />
              <span className="text-[#EB3158] dark:text-blue-500">on One Platform Through a Franchise Model</span>
            </h1>

            <p className="text-[#15172B]/80 dark:text-gray-300 text-lg mb-10 max-w-xl leading-relaxed transition-colors">
              Expand your business with a unified franchise platform that connects people, processes, and data. Launch, manage, and grow your franchise network smarter, faster, and more profitably.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                Explore Franchise Model <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2 bg-transparent border border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 text-[#15172B] dark:text-white px-8 py-4 rounded-full font-medium transition-all">
                Request Demo <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Central Hub Graphic */}
        <div className="relative z-10 flex justify-center items-center h-[500px] mt-10 lg:mt-0">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            
            {/* Center Hub */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute z-30 w-48 h-48 rounded-full border-2 border-blue-200 dark:border-blue-400/50 bg-white/90 dark:bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)] dark:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-colors"
            >
              {/* Inner rings */}
              <div className="absolute inset-2 rounded-full border border-blue-500/30 border-dashed animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-6 rounded-full border border-purple-500/30 border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="text-white font-bold text-xl z-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Your Brand</div>
            </motion.div>

            {/* Orbiting Nodes */}
            {nodes.map((node, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: node.delay + 0.5 }}
                className={`absolute ${node.position} z-20 flex flex-col items-center gap-2`}
              >
                <div className="w-12 h-12 rounded-full border border-[#111A4A]/10 dark:border-blue-500/50 bg-white dark:bg-[#020617]/90 flex items-center justify-center text-[#EB3158] dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-110 hover:border-blue-400 dark:hover:border-blue-400 hover:text-blue-700 dark:hover:text-white transition-all cursor-pointer">
                  {node.icon}
                </div>
                <span className="text-xs text-slate-700 dark:text-gray-300 font-medium transition-colors">{node.label}</span>
              </motion.div>
            ))}

            {/* Connecting lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" viewBox="0 0 100 100">
              <motion.path d="M50,50 L25,10" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.1 }} />
              <motion.path d="M50,50 L50,5" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
              <motion.path d="M50,50 L75,10" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.3 }} />
              <motion.path d="M50,50 L90,33" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} />
              <motion.path d="M50,50 L90,66" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
              <motion.path d="M50,50 L10,33" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6 }} />
              <motion.path d="M50,50 L10,66" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.7 }} />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
