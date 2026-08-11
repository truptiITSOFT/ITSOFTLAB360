"use client";

import { motion } from "framer-motion";
import { Layers, Headphones, Presentation, GraduationCap, Laptop, Compass, LayoutDashboard, Sparkles } from "lucide-react";
import { useState } from "react";

const BENEFITS = [
  {
    id: "portfolio",
    title: "12 Product Portfolio",
    desc: "Instant access to a complete ecosystem of enterprise solutions ready to deploy.",
    icon: Layers,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/20",
    colSpan: "md:col-span-2 md:row-span-2"
  },
  {
    id: "support",
    title: "Technical Support",
    desc: "Dedicated engineering team backing you up 24/7.",
    icon: Headphones,
    color: "from-emerald-400 to-green-500",
    shadow: "shadow-emerald-500/20",
    colSpan: "md:col-span-1 md:row-span-2"
  },
  {
    id: "sales",
    title: "Sales Enablement",
    desc: "Premium pitch decks, ROI calculators, and strategy.",
    icon: Presentation,
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/20",
    colSpan: "md:col-span-1 md:row-span-1"
  },
  {
    id: "training",
    title: "Product Training",
    desc: "Deep-dive technical sessions & certifications.",
    icon: GraduationCap,
    color: "from-[#EB3158] to-rose-500",
    shadow: "shadow-rose-500/20",
    colSpan: "md:col-span-1 md:row-span-1"
  },
  {
    id: "dashboard",
    title: "Centralized Dashboard",
    desc: "Manage all clients, licenses, and revenue in one unified portal.",
    icon: LayoutDashboard,
    color: "from-purple-500 to-fuchsia-500",
    shadow: "shadow-purple-500/20",
    colSpan: "md:col-span-2 md:row-span-1"
  },
  {
    id: "demo",
    title: "Demo Environment",
    desc: "Pre-configured instances.",
    icon: Laptop,
    color: "from-indigo-400 to-indigo-600",
    shadow: "shadow-indigo-500/20",
    colSpan: "md:col-span-1 md:row-span-1"
  },
  {
    id: "guidance",
    title: "Implementation",
    desc: "Step-by-step setup support.",
    icon: Compass,
    color: "from-teal-400 to-teal-600",
    shadow: "shadow-teal-500/20",
    colSpan: "md:col-span-1 md:row-span-1"
  }
];

export default function PartnerBenefits() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative py-32 bg-[#09090b] transition-colors duration-300 overflow-hidden text-white">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,#09090b_0%,#1e1b4b_50%,#09090b_100%)] opacity-30"
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[80px]"
        />
      </div>

      <div className="max-w-[960px] mx-auto px-6 md:px-10 relative z-10">
        
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6 backdrop-blur-md"
          >
            <Sparkles size={16} className="text-purple-400" /> Premium Advantage
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            What The Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Gets</span>
          </motion.h2>
        </div>

        {/* Dynamic Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[176px]">
          {BENEFITS.map((benefit, i) => {
            const isHovered = hoveredId === benefit.id;
            const isLarge = benefit.colSpan.includes("row-span-2");

            return (
              <motion.div 
                key={benefit.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredId(benefit.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`${benefit.colSpan} relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-500 cursor-pointer shadow-lg hover:${benefit.shadow}`}
              >
                {/* Dynamic Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Moving Glow Orb */}
                <motion.div 
                  animate={isHovered ? { scale: 1.5, opacity: 0.4 } : { scale: 1, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${benefit.color} blur-[32px]`}
                />

                <div className="relative h-full flex flex-col p-6 lg:p-8 z-10 justify-between">
                  
                  {/* Icon & Visual Element */}
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-20`}></div>
                      <benefit.icon size={26} className={isHovered ? "text-white" : "text-gray-400"} />
                    </div>

                    {/* Interactive mini-visual based on card type */}
                    {benefit.id === "portfolio" && (
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map(bar => (
                          <motion.div 
                            key={bar}
                            animate={isHovered ? { height: ["8px", "24px", "8px"] } : { height: "8px" }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: bar * 0.1 }}
                            className={`w-1.5 rounded-full bg-gradient-to-t ${benefit.color} opacity-80`}
                          />
                        ))}
                      </div>
                    )}
                    {benefit.id === "support" && (
                      <motion.div 
                        animate={isHovered ? { rotate: 180 } : { rotate: 0 }}
                        transition={{ duration: 2, ease: "backInOut" }}
                        className={`w-8 h-8 rounded-full border-2 border-dashed border-emerald-400/50 flex items-center justify-center`}
                      >
                         <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      </motion.div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className={`transform transition-transform duration-500 ${isHovered && isLarge ? '-translate-y-2' : ''}`}>
                    <h3 className={`font-bold mb-2 ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'} text-gray-100 group-hover:text-white transition-colors`}>
                      {benefit.title}
                    </h3>
                    <p className={`text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors ${isLarge ? 'max-w-xs' : 'line-clamp-2'}`}>
                      {benefit.desc}
                    </p>
                  </div>
                </div>

                {/* Animated Reveal Line at Bottom */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${benefit.color} transition-all duration-500 ease-out w-0 group-hover:w-full`}></div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
