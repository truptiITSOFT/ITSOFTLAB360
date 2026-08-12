"use client";

import { motion } from "framer-motion";
import { Layers, Headphones, Presentation, LayoutDashboard, Server, Compass, TrendingUp, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function PartnerBenefits() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  return (
    <section className="relative py-20 bg-transparent transition-colors duration-300 z-10">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 relative z-10">
        


        {/* Compact Analytical Bento Box */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[170px]"
        >
          {/* Card 1: Portfolio (2x2) */}
          <motion.div 
            variants={itemVariants}
            onMouseEnter={() => setHoveredId("portfolio")}
            onMouseLeave={() => setHoveredId(null)}
            className="md:col-span-2 md:row-span-2 relative rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Layers size={16} /></div>
                  <h3 className="font-bold text-[#111A4A] dark:text-white">12 Product Portfolio</h3>
                </div>
                <p className="text-xs text-gray-500 pl-10">Instant access to our complete enterprise ecosystem.</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-blue-600">100%</span>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Ready</p>
              </div>
            </div>
            
            {/* Role-Specific Visual: Stacking Products */}
            <div className="flex-1 mt-6 relative bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden perspective-[1000px]">
              <div className="relative w-48 h-32 flex items-center justify-center transform-style-3d">
                {[0, 1, 2, 3].map((layer) => (
                  <motion.div
                    key={layer}
                    animate={hoveredId === "portfolio" ? { 
                      y: (layer - 1.5) * 20, 
                      scale: 1 - (layer * 0.05),
                      opacity: 1 - (layer * 0.15)
                    } : {
                      y: 0,
                      scale: 1,
                      opacity: layer === 0 ? 1 : 0
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="absolute w-40 h-24 rounded-xl border-2 border-blue-200 dark:border-blue-500/50 bg-white/90 dark:bg-slate-800/90 shadow-[0_10px_20px_rgba(59,130,246,0.15)] flex flex-col items-center justify-center"
                    style={{ zIndex: 10 - layer }}
                  >
                    {layer === 0 && (
                      <>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                          <Layers size={14} className="text-blue-500" />
                        </div>
                        <div className="h-2 w-16 bg-blue-100 rounded-full"></div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Support (1x2) */}
          <motion.div 
            variants={itemVariants}
            onMouseEnter={() => setHoveredId("support")}
            onMouseLeave={() => setHoveredId(null)}
            className="md:col-span-1 md:row-span-2 relative rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><Headphones size={16} /></div>
                <h3 className="font-bold text-[#111A4A] dark:text-white text-sm">Tech Support</h3>
              </div>
              <p className="text-[11px] text-gray-500">24/7 dedicated engineering team.</p>
            </div>
            
            {/* Role-Specific Visual: Live Chat / Heartbeat */}
            <div className="flex-1 flex flex-col items-center justify-center mt-4 relative">
              <div className="w-full max-w-[120px] relative">
                <motion.div 
                  animate={hoveredId === "support" ? { y: [-5, -15, -5] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-2xl rounded-bl-none text-emerald-700 dark:text-emerald-300 text-[10px] font-bold shadow-sm"
                >
                  <motion.div className="flex gap-1" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={hoveredId === "support" ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-blue-100 dark:bg-blue-900/40 p-2 w-16 h-8 rounded-2xl rounded-br-none ml-auto mt-2 shadow-sm flex items-center justify-center"
                >
                  <div className="w-8 h-1 bg-blue-300 rounded-full"></div>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-400">Avg Response</span>
              <span className="text-xs font-black text-emerald-500">&lt; 5 mins</span>
            </div>
          </motion.div>

          {/* Card 3: Sales Enablement (1x1) */}
          <motion.div 
            variants={itemVariants}
            onMouseEnter={() => setHoveredId("sales")}
            onMouseLeave={() => setHoveredId(null)}
            className="md:col-span-1 md:row-span-1 relative rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-[#111A4A] dark:text-white text-sm">Enablement</h3>
                <Presentation size={14} className="text-orange-500" />
              </div>
              <p className="text-[11px] text-gray-500">Premium pitch decks & calculators.</p>
            </div>
            
            {/* Role-Specific Visual: Conversion Funnel/Chart */}
            <div className="flex items-end justify-between h-12 gap-1 mt-auto">
              {[30, 50, 75, 100].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: "20%" }}
                  animate={hoveredId === "sales" ? { height: `${h}%` } : { height: "20%" }}
                  transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
                  className={`w-full rounded-t-sm relative transition-colors ${i === 3 ? 'bg-orange-500' : 'bg-orange-100 dark:bg-orange-900/30'}`}
                >
                   {i === 3 && hoveredId === "sales" && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -20 }} className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-orange-600">+34%</motion.div>
                   )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Dashboard (2x1) */}
          <motion.div 
            variants={itemVariants}
            onMouseEnter={() => setHoveredId("dash")}
            onMouseLeave={() => setHoveredId(null)}
            className="md:col-span-2 md:row-span-1 relative rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center overflow-hidden"
          >
            <div className="flex-1 z-10">
              <div className="flex items-center gap-2 mb-1">
                <LayoutDashboard size={14} className="text-purple-500" />
                <h3 className="font-bold text-[#111A4A] dark:text-white text-sm">Partner Dashboard</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">Centralized client & license management.</p>
              
              <div className="flex gap-4">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Active Clients</div>
                  <div className="text-lg font-black text-purple-600">142</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Licenses</div>
                  <div className="text-lg font-black text-[#111A4A] dark:text-white">8,405</div>
                </div>
              </div>
            </div>
            
            {/* Role-Specific Visual: Dashboard Data Table */}
            <div className="w-48 h-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 flex flex-col gap-2 relative shadow-inner">
               <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                 <div className="h-2 w-12 bg-slate-300 rounded"></div>
                 <div className="w-4 h-4 rounded-full bg-purple-200"></div>
               </div>
               {[1, 2, 3].map((row) => (
                 <motion.div 
                    key={row}
                    animate={hoveredId === "dash" ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 0.5, delay: row * 0.1 }}
                    className="flex justify-between items-center"
                 >
                   <div className="flex gap-2 items-center">
                     <div className="w-3 h-3 rounded bg-slate-200"></div>
                     <div className="h-1.5 w-16 bg-slate-200 rounded"></div>
                   </div>
                   <div className="h-1.5 w-6 bg-emerald-200 rounded"></div>
                 </motion.div>
               ))}
            </div>
          </motion.div>

          {/* Card 5: Demo Env (1x1) */}
          <motion.div 
            variants={itemVariants}
            onMouseEnter={() => setHoveredId("demo")}
            onMouseLeave={() => setHoveredId(null)}
            className="md:col-span-1 md:row-span-1 relative rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-[#111A4A] dark:text-white text-sm">Demo Env</h3>
                <Server size={14} className="text-indigo-500" />
              </div>
              <p className="text-[11px] text-gray-500">Pre-configured pitch instances.</p>
            </div>
            
            {/* Role-Specific Visual: Server Deployment */}
            <div className="flex-1 flex items-center justify-center mt-2">
               <div className="relative w-24 h-16">
                  <motion.div 
                    animate={hoveredId === "demo" ? { y: -10, opacity: 1 } : { y: 0, opacity: 0.5 }}
                    className="absolute inset-x-0 bottom-0 h-6 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 rounded flex items-center px-2 z-20"
                  >
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                  </motion.div>
                  <motion.div 
                    animate={hoveredId === "demo" ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                    className="absolute inset-x-0 bottom-0 h-6 bg-indigo-100 dark:bg-indigo-800/40 border border-indigo-300 rounded flex items-center px-2 z-10"
                  >
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                  </motion.div>
                  <motion.div 
                    animate={hoveredId === "demo" ? { y: 10, opacity: 1 } : { y: 20, opacity: 0 }}
                    className="absolute inset-x-0 bottom-0 h-6 bg-indigo-200 dark:bg-indigo-700/50 border border-indigo-400 rounded flex items-center px-2 z-0"
                  >
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-300"></div>
                  </motion.div>
               </div>
            </div>
          </motion.div>

          {/* Card 6: Implementation (1x1) */}
          <motion.div 
            variants={itemVariants}
            onMouseEnter={() => setHoveredId("impl")}
            onMouseLeave={() => setHoveredId(null)}
            className="md:col-span-1 md:row-span-1 relative rounded-2xl bg-[#EB3158] p-5 shadow-md flex flex-col justify-between text-white overflow-hidden"
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-white text-sm">Implementation</h3>
                <CheckCircle2 size={14} className="text-white/80" />
              </div>
              <p className="text-[11px] text-white/70">Step-by-step setup guidance.</p>
            </div>
            
            {/* Role-Specific Visual: Checklist Automation */}
            <div className="mt-auto pt-4 relative">
              <div className="flex flex-col gap-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-2 bg-white/10 rounded px-2 py-1.5">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={hoveredId === "impl" ? { scale: 1 } : { scale: 0 }}
                      transition={{ type: "spring", delay: step * 0.15 }}
                      className="w-3 h-3 rounded-full bg-white flex items-center justify-center"
                    >
                      <CheckCircle2 size={8} className="text-[#EB3158]" />
                    </motion.div>
                    <div className="h-1.5 flex-1 bg-white/30 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
