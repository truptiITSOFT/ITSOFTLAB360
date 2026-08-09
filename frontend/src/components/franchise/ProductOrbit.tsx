"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Target, Database, Box, Server, BarChart, Zap, Smartphone, Laptop, Settings, Shield, Cloud, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const TIERS = [
  {
    name: "Customer & Growth",
    color: "blue",
    styles: {
      text: "text-blue-600",
      gradientTo: "to-blue-500/40",
      borderHover: "border-blue-300",
      borderDefault: "border-slate-200",
      gradientFromHover: "from-blue-50",
      bgHover: "bg-blue-100",
      glow: "shadow-[0_2px_10px_rgba(0,0,0,0.03)]",
      glowHover: "shadow-[0_15px_30px_rgba(59,130,246,0.15)]",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    products: [
      { id: "crm", name: "CRM", desc: "Build stronger customer relationships.", icon: Target },
      { id: "sales", name: "Sales Force", desc: "Empower your field sales team.", icon: Smartphone },
      { id: "marketing", name: "Marketing", desc: "Automate campaigns and tracking.", icon: BarChart },
      { id: "pos", name: "Retail POS", desc: "Modern point-of-sale solutions.", icon: Settings },
    ]
  },
  {
    name: "Enterprise Core",
    color: "emerald",
    styles: {
      text: "text-emerald-600",
      gradientTo: "to-emerald-500/40",
      borderHover: "border-emerald-300",
      borderDefault: "border-slate-200",
      gradientFromHover: "from-emerald-50",
      bgHover: "bg-emerald-100",
      glow: "shadow-[0_2px_10px_rgba(0,0,0,0.03)]",
      glowHover: "shadow-[0_15px_30px_rgba(16,185,129,0.15)]",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    products: [
      { id: "erp", name: "ERP System", desc: "Streamline enterprise operations.", icon: Database },
      { id: "hrms", name: "HRMS", desc: "Automate workforce management.", icon: Users },
      { id: "lms", name: "LMS", desc: "Corporate training and learning.", icon: Laptop },
      { id: "docs", name: "Docs Mgt", desc: "Secure digital document storage.", icon: Cloud },
    ]
  },
  {
    name: "Supply & Operations",
    color: "rose",
    styles: {
      text: "text-rose-600",
      gradientTo: "to-rose-500/40",
      borderHover: "border-rose-300",
      borderDefault: "border-slate-200",
      gradientFromHover: "from-rose-50",
      bgHover: "bg-rose-100",
      glow: "shadow-[0_2px_10px_rgba(0,0,0,0.03)]",
      glowHover: "shadow-[0_15px_30px_rgba(244,63,94,0.15)]",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    products: [
      { id: "logistics", name: "Logistics", desc: "End-to-end supply chain visibility.", icon: Zap },
      { id: "dealer", name: "Dealer Mgt", desc: "Optimize dealer networks.", icon: Box },
      { id: "vendor", name: "Vendor Mgt", desc: "Manage supplier relationships.", icon: Server },
      { id: "queue", name: "Queue Mgt", desc: "Enhance physical customer flow.", icon: Shield },
    ]
  }
];

export default function ProductOrbit() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-slate-50 transition-colors duration-500 overflow-hidden text-slate-900 border-t border-slate-200">
      
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        {/* Dynamic Light Orbs */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[500px] bg-rose-400/10 rounded-full blur-[120px] mix-blend-multiply"></div>
      </div>

      <div className="w-[90%] lg:w-[85%] max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold mb-6 shadow-sm"
          >
            Unified Architecture
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-slate-900"
          >
            The Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#EB3158]">Product Ecosystem</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-500 max-w-2xl mx-auto"
          >
            An enterprise-grade stack divided into three strategic tiers. Offer your clients exactly what they need, all powered by one central platform.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-10 xl:gap-20">
          
          {/* Left Side: Animated High-Quality Circle & Rays */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
            className="w-full lg:w-1/3 flex flex-col items-center lg:items-start"
          >
            <div className="relative w-72 h-72 flex items-center justify-center">
               {/* Outer rotating dashed ring */}
               <div className="absolute inset-[-30px] rounded-full border-[3px] border-dashed border-blue-200/80 animate-[spin_40s_linear_infinite]" style={{ animation: 'spin 40s linear infinite' }}></div>
               
               {/* Middle solid ring with glow */}
               <div className="absolute inset-[-10px] rounded-full border-2 border-blue-300 shadow-[0_0_40px_rgba(59,130,246,0.2)] animate-[spin_60s_linear_infinite_reverse]" style={{ animation: 'spin 60s linear infinite reverse' }}></div>
               
               {/* Central Core (Glassy white) */}
               <div className="absolute inset-4 rounded-full bg-white/80 backdrop-blur-2xl border-4 border-white shadow-[0_10px_30px_rgba(59,130,246,0.15)]"></div>
               
               {/* Logo Container */}
               <div className="relative z-10 flex flex-col items-center justify-center bg-white rounded-full w-48 h-48 border border-slate-100 shadow-[inset_0_4px_20px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden">
                 {/* Animated radar sweep inside the core */}
                 <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_70%,rgba(59,130,246,0.15)_100%)] rounded-full animate-spin" style={{ animation: 'spin 4s linear infinite' }}></div>
                 
                 {/* Logo */}
                 <Image src="/logo.png" alt="ITSoftLab360" width={130} height={40} className="object-contain relative z-20 drop-shadow-sm" />
                 
                 {/* Removed the CORE PLATFORM pill here as requested */}
               </div>
               
               {/* High Quality Rays connecting to the tiers */}
               <div className="hidden lg:block absolute top-1/2 -right-[150px] w-[150px] h-[3px] bg-gradient-to-r from-blue-500 to-transparent opacity-80 -translate-y-1/2 shadow-[0_0_12px_rgba(59,130,246,0.6)]">
                  {/* Energy pulse on ray */}
                  <div className="absolute top-0 left-0 w-8 h-full bg-white blur-[2px] animate-pulse"></div>
               </div>
               <div className="hidden lg:block absolute top-[25%] -right-[130px] w-[130px] h-[3px] bg-gradient-to-r from-emerald-500 to-transparent opacity-80 -rotate-[22deg] origin-left shadow-[0_0_12px_rgba(16,185,129,0.6)]">
                  <div className="absolute top-0 left-0 w-8 h-full bg-white blur-[2px] animate-pulse"></div>
               </div>
               <div className="hidden lg:block absolute bottom-[25%] -right-[130px] w-[130px] h-[3px] bg-gradient-to-r from-rose-500 to-transparent opacity-80 rotate-[22deg] origin-left shadow-[0_0_12px_rgba(244,63,94,0.6)]">
                  <div className="absolute top-0 left-0 w-8 h-full bg-white blur-[2px] animate-pulse"></div>
               </div>
            </div>
          </motion.div>

          {/* Right Side: The Tiered Architecture */}
          <div className="w-full lg:w-2/3 flex flex-col gap-10">
            {TIERS.map((tier, tierIndex) => (
              <div key={tier.name} className="relative w-full">
                
                {/* Tier Label */}
                <motion.div 
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: tierIndex * 0.15, duration: 0.8 }}
                  className="flex items-center gap-4 mb-6 origin-left"
                >
                  <div className={`h-[1px] flex-grow bg-gradient-to-r from-transparent ${tier.styles.gradientTo}`}></div>
                  <span className={`text-xs md:text-sm font-bold ${tier.styles.text} uppercase tracking-widest whitespace-nowrap`}>{tier.name}</span>
                  <div className={`h-[1px] flex-grow bg-gradient-to-l from-transparent ${tier.styles.gradientTo}`}></div>
                </motion.div>

                {/* Tier Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  {tier.products.map((product, pIndex) => {
                    const isHovered = hoveredProduct === product.id;
                    const isAnyHovered = hoveredProduct !== null;
                    
                    return (
                        <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (tierIndex * 0.15) + (pIndex * 0.1), type: "spring", stiffness: 100 }}
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                        className={`
                          relative group cursor-pointer rounded-2xl border p-5 transition-all duration-500 overflow-hidden bg-white
                          ${isHovered 
                            ? `${tier.styles.borderHover} ${tier.styles.glowHover} -translate-y-2 z-20` 
                            : isAnyHovered 
                              ? `${tier.styles.borderDefault} opacity-60 scale-[0.98] z-0 bg-slate-50` 
                              : `${tier.styles.borderDefault} ${tier.styles.glow} hover:border-slate-300 z-10`}
                        `}
                      >
                        {/* Hover Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${tier.styles.gradientFromHover} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isHovered ? `${tier.styles.bgHover} ${tier.styles.iconColor} scale-110 shadow-sm` : `${tier.styles.iconBg} ${tier.styles.iconColor}`}`}>
                              <product.icon size={20} />
                              </div>
                              <div className={`opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 ${tier.styles.text}`}>
                                  <ArrowUpRight size={18} />
                              </div>
                          </div>
                          
                          <h3 className={`text-lg font-bold mb-1 transition-colors duration-300 ${isHovered ? 'text-slate-900' : 'text-slate-800'}`}>
                            {product.name}
                          </h3>
                          
                          <p className={`text-sm leading-relaxed transition-colors duration-300 ${isHovered ? 'text-slate-700' : 'text-slate-500'}`}>
                            {product.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
