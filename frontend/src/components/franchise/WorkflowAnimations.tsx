"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Stethoscope, Rocket, Factory, Activity, PieChart, ShieldCheck, Globe, Users, Target, Database, FileText, Server, BarChart, Smartphone, Laptop, Settings, UploadCloud, Cpu, Layers, Building2, Briefcase, CheckCircle2, CreditCard, PenTool, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// 1. ITSoftLab360 Platform (Core Ecosystem & Development)
export const PlatformAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-900 rounded-3xl p-6">
        {/* Deep Tech Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:30px_30px]"></div>

        {/* Radiating Energy Rings (Continuous Updates) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div animate={{ scale: [1, 2.5], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="w-48 h-48 border border-blue-500/30 rounded-full absolute" />
            <motion.div animate={{ scale: [1, 2.5], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1.5, ease: "linear" }} className="w-48 h-48 border border-cyan-500/30 rounded-full absolute" />
        </div>

        {/* Central Core Ecosystem Card */}
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative z-20 w-[360px] h-[190px] bg-slate-800/90 backdrop-blur-2xl border border-blue-500/40 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.3)] flex flex-col overflow-hidden"
        >
            {/* Header */}
            <div className="h-10 bg-slate-900/80 border-b border-blue-500/30 flex justify-between items-center px-4">
                <Image src="/logo.png" alt="ITSoftLab360" width={100} height={22} className="object-contain" />
                <div className="flex items-center gap-1.5 bg-blue-500/20 px-2 py-1 rounded border border-blue-400/30">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_#34d399]"></div>
                    <span className="text-[8px] font-bold text-blue-200 uppercase tracking-widest">Core Active</span>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="flex-1 flex p-4 gap-4">
                {/* Left: Infrastructure / Servers */}
                <div className="w-[140px] bg-slate-900/80 rounded border border-slate-700/50 p-2.5 flex flex-col gap-2 relative overflow-hidden">
                    <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-1">Infrastructure</div>
                    
                    {/* Server Stacks */}
                    {[1,2,3].map(i => (
                        <div key={i} className="w-full h-8 bg-slate-800 border border-slate-600 rounded-sm flex items-center justify-between px-2 shadow-inner z-10 relative">
                            <div className="flex gap-1.5">
                                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: Math.random()*2+1 }} className="w-1.5 h-1.5 bg-blue-400 rounded-sm"></motion.div>
                                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: Math.random()*2+1 }} className="w-1.5 h-1.5 bg-emerald-400 rounded-sm shadow-[0_0_4px_#34d399]"></motion.div>
                            </div>
                            <div className="flex gap-[2px]">
                                <div className="w-6 h-[2px] bg-slate-500"></div>
                                <div className="w-4 h-[2px] bg-slate-500"></div>
                            </div>
                        </div>
                    ))}
                    {/* Data scanning line */}
                    <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute left-0 w-full h-[2px] bg-blue-500/50 shadow-[0_0_10px_#3b82f6] z-20 pointer-events-none" />
                </div>

                {/* Right: Development / Code heavy lifting */}
                <div className="flex-1 bg-slate-950 rounded border border-slate-700/50 p-2.5 flex flex-col font-mono relative overflow-hidden">
                    <div className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-2 flex justify-between items-center">
                        <span>Development</span>
                        <Settings size={12} className="text-slate-400 animate-spin-slow" style={{ animationDuration: '4s' }} />
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-2 mt-1">
                        <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }} className="h-1.5 bg-rose-400/80 rounded-sm" />
                        <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ repeat: Infinity, duration: 2, delay: 0.2, repeatDelay: 1 }} className="h-1.5 bg-emerald-400/80 rounded-sm ml-2" />
                        <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ repeat: Infinity, duration: 2, delay: 0.4, repeatDelay: 1 }} className="h-1.5 bg-blue-400/80 rounded-sm ml-2" />
                        <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ repeat: Infinity, duration: 2, delay: 0.6, repeatDelay: 1 }} className="h-1.5 bg-amber-400/80 rounded-sm ml-4" />
                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ repeat: Infinity, duration: 2, delay: 0.8, repeatDelay: 1 }} className="h-1.5 bg-purple-400/80 rounded-sm" />
                    </div>

                    {/* Deploying status */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded border border-slate-600 shadow-md">
                        <UploadCloud size={10} className="text-cyan-400" />
                        <span className="text-[7px] font-bold text-cyan-200">DEPLOYING</span>
                    </div>
                </div>
            </div>
            
            {/* Bottom progress bar for continuous updates */}
            <div className="h-1.5 w-full bg-slate-900">
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
            </div>
        </motion.div>

        {/* Outer Tech Nodes (Representing ecosystem distribution) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* 4 Corner tech nodes */}
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }} className="absolute top-8 left-8 w-14 h-14 bg-slate-800/90 border border-blue-500/40 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center">
                <Database size={20} className="text-blue-400 drop-shadow-md" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }} className="absolute top-8 right-8 w-14 h-14 bg-slate-800/90 border border-emerald-500/40 rounded-lg shadow-[0_0_20px_rgba(52,211,153,0.3)] flex items-center justify-center">
                <ShieldCheck size={20} className="text-emerald-400 drop-shadow-md" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-8 left-8 w-14 h-14 bg-slate-800/90 border border-purple-500/40 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center">
                <Cpu size={20} className="text-purple-400 drop-shadow-md" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6 }} className="absolute bottom-8 right-8 w-14 h-14 bg-slate-800/90 border border-cyan-500/40 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center">
                <Layers size={20} className="text-cyan-400 drop-shadow-md" />
            </motion.div>
            
            {/* Connecting lines from center to corners */}
            <svg className="absolute inset-0 w-full h-full opacity-40" style={{ filter: "drop-shadow(0 0 3px rgba(59,130,246,0.6))" }}>
                <path d="M 50% 50% L 3.5rem 3.5rem" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 50% 50% L calc(100% - 3.5rem) 3.5rem" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 50% 50% L 3.5rem calc(100% - 3.5rem)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 50% 50% L calc(100% - 3.5rem) calc(100% - 3.5rem)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
        </div>
    </div>
  );
};

// 2. Franchise Partner (Symmetrical Org-Chart Hierarchy)
export const PartnerAnimation = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start pt-6">
      {/* Top Node */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        className="w-48 h-12 bg-emerald-900/40 backdrop-blur-xl rounded-md border border-emerald-500/50 flex items-center justify-center shadow-md z-20"
      >
        <Image src="/logo.png" alt="Logo" width={90} height={20} className="object-contain" />
      </motion.div>

      {/* Main Trunk Line */}
      <motion.div 
        initial={{ height: 0 }} animate={{ height: 40 }} transition={{ duration: 0.5, delay: 0.8 }}
        className="w-[2px] bg-emerald-500/60 z-10"
      />

      {/* Central Partner Dashboard Node */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 1.3 }}
        className="w-56 h-28 bg-emerald-800/30 backdrop-blur-2xl rounded-lg border border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] z-20 p-3 flex flex-col"
      >
          <div className="flex justify-between items-center border-b border-emerald-500/30 pb-2 mb-2">
              <div className="flex items-center gap-2"><Building2 size={16} className="text-emerald-300"/><span className="text-[10px] font-bold text-emerald-100 tracking-wider">PARTNER HUB</span></div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          </div>
          {/* Mini UI bars */}
          <div className="flex-1 flex items-end gap-1">
              {[30, 70, 50, 100, 60, 80, 40].map((h, i) => (
                  <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 1.8 + i * 0.1 }} className="flex-1 bg-emerald-500/50 rounded-sm" />
              ))}
          </div>
      </motion.div>

      {/* Horizontal Branch Line */}
      <div className="relative w-full max-w-[320px] h-20 mt-[-2px]">
          <motion.div 
            initial={{ width: 0, left: "50%" }} animate={{ width: "100%", left: "0%" }} transition={{ duration: 0.8, delay: 1.8 }}
            className="absolute top-0 h-[2px] bg-emerald-500/60 z-10"
          />
          {/* Vertical Drops */}
          {[0, 33.33, 66.66, 100].map((pos, i) => (
              <div key={i} className="absolute top-0 h-full flex flex-col items-center" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
                  <motion.div initial={{ height: 0 }} animate={{ height: 24 }} transition={{ duration: 0.4, delay: 2.6 + (i * 0.1) }} className="w-[2px] bg-emerald-500/60 z-10" />
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 3.0 + (i * 0.1) }}
                    className="w-16 h-16 bg-white/20 backdrop-blur-md rounded border border-emerald-300/40 shadow-lg flex flex-col items-center justify-center z-20 gap-1"
                  >
                      <Briefcase size={16} className="text-emerald-100" />
                      <div className="w-8 h-1 bg-emerald-300/50 rounded-full"></div>
                  </motion.div>
              </div>
          ))}
      </div>
    </div>
  );
};


// 3. 12 Integrated Products (Visual Product Suite Ecosystem)
export const ProductsAnimation = () => {
  // Define 12 distinct mini-UIs for the 12 integrated products
  const renderMiniUI = (type: number) => {
      switch(type) {
          case 0: // Bar Chart (Sales/Analytics)
              return (
                  <div className="w-full h-full flex items-end gap-[2px] p-1.5">
                      {[40, 70, 50, 90, 60].map((h, i) => (
                          <motion.div key={i} animate={{ height: [`${h}%`, `${h-20}%`, `${h}%`] }} transition={{ repeat: Infinity, duration: 2 + i * 0.2 }} className="flex-1 bg-rose-400 rounded-t-[2px] shadow-sm" />
                      ))}
                  </div>
              );
          case 1: // Line Graph (Growth)
              return (
                  <div className="w-full h-full p-1.5 flex items-center justify-center overflow-hidden">
                      <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-md">
                          <motion.path d="M 0 40 L 20 20 L 40 30 L 60 10 L 80 20 L 100 5" fill="none" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} />
                      </svg>
                  </div>
              );
          case 2: // List / CRM rows
              return (
                  <div className="w-full h-full flex flex-col gap-[4px] p-2 justify-center">
                      {[1, 2, 3].map(i => (
                          <div key={i} className="w-full h-[4px] flex gap-1 items-center">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                              <div className="flex-1 h-full bg-slate-200 rounded-full"></div>
                          </div>
                      ))}
                  </div>
              );
          case 3: // Dashboard Panels (ERP)
              return (
                  <div className="w-full h-full p-1.5 grid grid-cols-2 gap-1">
                      <div className="bg-amber-400 rounded-sm shadow-sm"></div>
                      <div className="bg-purple-400 rounded-sm shadow-sm flex flex-col gap-[2px] p-[3px]"><div className="w-full h-[2px] bg-white/70 rounded-full"/><div className="w-2/3 h-[2px] bg-white/70 rounded-full"/></div>
                      <div className="col-span-2 bg-cyan-400 rounded-sm shadow-sm"></div>
                  </div>
              );
          case 4: // Pie/Ring Chart (Reports)
              return (
                  <div className="w-full h-full flex items-center justify-center">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-500 border-r-indigo-400" />
                  </div>
              );
          case 5: // Code/Terminal (Dev)
              return (
                  <div className="w-full h-full bg-slate-800 rounded flex flex-col p-1.5 gap-[2px]">
                      <div className="w-1/2 h-[2px] bg-emerald-400 mb-1"></div>
                      <div className="w-3/4 h-[2px] bg-slate-400"></div>
                      <div className="w-2/3 h-[2px] bg-slate-400"></div>
                      <div className="w-full h-[2px] bg-slate-400"></div>
                      <div className="w-1/3 h-[2px] bg-slate-400"></div>
                  </div>
              );
          case 6: // Scatter Plot (AI/ML)
              return (
                  <div className="w-full h-full p-1.5 relative">
                      {[...Array(6)].map((_, i) => (
                          <motion.div key={i} animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 + Math.random() * 2 }} className="absolute w-2 h-2 rounded-full bg-teal-400" style={{ left: `${Math.random() * 70 + 10}%`, top: `${Math.random() * 70 + 10}%` }} />
                      ))}
                  </div>
              );
          case 7: // Kanban Board (Project Mgmt)
              return (
                  <div className="w-full h-full p-1 flex gap-[3px]">
                      <div className="flex-1 bg-slate-100 rounded-sm flex flex-col gap-[2px] p-[2px]"><div className="w-full h-2 bg-slate-300 rounded-[1px]"/><div className="w-full h-3 bg-amber-200 rounded-[1px]"/></div>
                      <div className="flex-1 bg-slate-100 rounded-sm flex flex-col gap-[2px] p-[2px]"><div className="w-full h-2 bg-slate-300 rounded-[1px]"/><div className="w-full h-2 bg-blue-300 rounded-[1px]"/><div className="w-full h-2 bg-blue-300 rounded-[1px]"/></div>
                      <div className="flex-1 bg-slate-100 rounded-sm flex flex-col gap-[2px] p-[2px]"><div className="w-full h-2 bg-slate-300 rounded-[1px]"/></div>
                  </div>
              );
          case 8: // Database Stacks (Cloud)
              return (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                      {[1,2,3].map(i => (
                          <motion.div key={i} animate={{ x: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }} className="w-8 h-2 rounded-full border border-cyan-400 bg-cyan-100 flex items-center px-1"><div className="w-1 h-1 bg-cyan-500 rounded-full"></div></motion.div>
                      ))}
                  </div>
              );
          case 9: // Calendar/Grid (Scheduling)
              return (
                  <div className="w-full h-full p-1.5 grid grid-cols-3 grid-rows-3 gap-[2px]">
                      {[...Array(9)].map((_, i) => (
                          <div key={i} className={`rounded-[1px] ${i === 2 || i === 4 || i === 7 ? 'bg-violet-400' : 'bg-slate-200'}`}></div>
                      ))}
                  </div>
              );
          case 10: // Server Load (Ops)
              return (
                  <div className="w-full h-full p-1 flex flex-col justify-end gap-[2px]">
                      <div className="w-full flex items-center justify-between"><div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div><div className="text-[6px] font-bold text-red-500">99%</div></div>
                      <div className="w-full h-2 bg-slate-200 rounded-sm overflow-hidden"><motion.div animate={{ width: ["100%", "90%", "98%"] }} transition={{ repeat: Infinity, duration: 1 }} className="h-full bg-red-500" /></div>
                      <div className="w-full h-2 bg-slate-200 rounded-sm overflow-hidden"><motion.div animate={{ width: ["40%", "60%", "30%"] }} transition={{ repeat: Infinity, duration: 2 }} className="h-full bg-emerald-400" /></div>
                  </div>
              );
          case 11: // Progress Stats (HR)
              return (
                  <div className="w-full h-full p-1.5 flex flex-col justify-center gap-1">
                      <div className="w-full flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-orange-200 flex-shrink-0"></div><div className="flex-1 h-1.5 bg-orange-400 rounded-full"></div></div>
                      <div className="w-full flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-pink-200 flex-shrink-0"></div><div className="w-1/2 h-1.5 bg-pink-400 rounded-full"></div></div>
                  </div>
              );
      }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 perspective-[1000px] overflow-hidden">
        
        {/* Central ITSoftLab360 Core */}
        <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="absolute z-30 w-36 h-36 bg-white/95 backdrop-blur-3xl rounded-full border-[2px] border-rose-200 shadow-[0_20px_50px_rgba(225,29,72,0.15)] flex flex-col items-center justify-center overflow-hidden"
        >
            <Image src="/logo.png" alt="Logo" width={90} height={25} className="object-contain drop-shadow-md mb-2" />
            
            {/* Radar scanner */}
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute inset-0 border-[6px] border-transparent border-t-rose-400 rounded-full opacity-60" />
        </motion.div>

        {/* Orbiting / Floating Product UI Cards in 3D Space */}
        <div className="absolute inset-0 flex items-center justify-center transform-style-preserve-3d" style={{ transform: "rotateX(55deg) rotateZ(-30deg)" }}>
            
            {/* Connection Lines (Grid base) */}
            <svg className="absolute inset-[-400px] w-[calc(100%+800px)] h-[calc(100%+800px)] pointer-events-none opacity-30">
                <circle cx="50%" cy="50%" r="140" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" />
                <circle cx="50%" cy="50%" r="260" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" />
                {[0, 45, 90, 135].map(deg => (
                    <line key={deg} x1="50%" y1="50%" x2="50%" y2="0%" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" style={{ transformOrigin: "center", transform: `rotate(${deg}deg)` }} />
                ))}
            </svg>

            {/* Inner Ring (4 items) */}
            {Array.from({length: 4}).map((_, i) => {
                const angle = (i * 90) * (Math.PI / 180);
                const x = Math.cos(angle) * 140;
                const y = Math.sin(angle) * 140;
                return (
                    <motion.div 
                        key={`inner-${i}`}
                        initial={{ opacity: 0, z: -50 }} animate={{ opacity: 1, z: 20 }} transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="absolute w-16 h-16 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border-[2px] border-slate-100 flex items-center justify-center overflow-hidden z-20"
                        style={{ left: `calc(50% + ${x}px - 32px)`, top: `calc(50% + ${y}px - 32px)`, transform: "rotateX(-55deg) rotateZ(30deg)" }}
                    >
                        {renderMiniUI(i)}
                    </motion.div>
                )
            })}

            {/* Outer Ring (8 items) */}
            {Array.from({length: 8}).map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                const x = Math.cos(angle) * 260;
                const y = Math.sin(angle) * 260;
                return (
                    <motion.div 
                        key={`outer-${i}`}
                        initial={{ opacity: 0, z: -50 }} animate={{ opacity: 1, z: 40 }} transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                        className="absolute w-20 h-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-[2px] border-slate-100 flex items-center justify-center overflow-hidden z-20"
                        style={{ left: `calc(50% + ${x}px - 40px)`, top: `calc(50% + ${y}px - 40px)`, transform: "rotateX(-55deg) rotateZ(30deg)" }}
                    >
                        {renderMiniUI(i + 4)}
                    </motion.div>
                )
            })}
        </div>
    </div>
  );
};


// 4. Multiple Industries (Structured Central Hub with 4 Outgoing Pipelines)
export const IndustriesAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
        
        {/* Corner Industry Dashboards */}
        
        {/* RETAIL - Barcode Scanner & Receipt */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute top-6 left-6 w-36 h-28 bg-white/90 backdrop-blur-xl border border-pink-200 rounded-lg shadow-xl flex flex-col overflow-hidden z-20">
            <div className="h-6 bg-pink-50 border-b border-pink-100 flex items-center px-2 gap-1">
                <ShoppingBag size={10} className="text-pink-600"/>
                <span className="text-[8px] font-bold text-pink-700">RETAIL POS</span>
            </div>
            <div className="flex-1 p-2 flex gap-2 items-center justify-center relative bg-slate-50">
                {/* Receipt printing animation */}
                <div className="w-10 h-full bg-white border border-slate-200 shadow-sm relative overflow-hidden flex flex-col items-center pt-1 gap-[2px]">
                    <motion.div animate={{ y: [0, -24] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-full flex flex-col items-center gap-[4px] mt-1">
                        <div className="w-6 h-[2px] bg-slate-300 rounded-full"></div>
                        <div className="w-4 h-[2px] bg-slate-300 rounded-full"></div>
                        <div className="w-8 h-[2px] bg-slate-300 rounded-full"></div>
                        <div className="w-6 h-[2px] bg-slate-300 rounded-full"></div>
                        <div className="w-4 h-[2px] bg-slate-300 rounded-full mt-2"></div>
                        <div className="w-8 h-[2px] bg-slate-300 rounded-full"></div>
                        <div className="w-6 h-[2px] bg-slate-300 rounded-full"></div>
                    </motion.div>
                </div>
                {/* Barcode scanning */}
                <div className="w-12 h-10 border-2 border-slate-300 rounded bg-white flex items-center justify-center relative overflow-hidden">
                    <div className="flex gap-[2px] h-6 items-center">
                        <div className="w-[1px] h-full bg-slate-800"></div>
                        <div className="w-[2px] h-full bg-slate-800"></div>
                        <div className="w-[1px] h-full bg-slate-800"></div>
                        <div className="w-[3px] h-full bg-slate-800"></div>
                        <div className="w-[1px] h-full bg-slate-800"></div>
                        <div className="w-[2px] h-full bg-slate-800"></div>
                    </div>
                    {/* Laser */}
                    <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute w-full h-[2px] bg-red-500 shadow-[0_0_6px_red] z-10" />
                </div>
            </div>
        </motion.div>
        
        {/* HEALTHCARE - Heartbeat Monitor */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute top-6 right-6 w-36 h-28 bg-white/90 backdrop-blur-xl border border-blue-200 rounded-lg shadow-xl flex flex-col overflow-hidden z-20">
            <div className="h-6 bg-blue-50 border-b border-blue-100 flex items-center px-2 gap-1">
                <Stethoscope size={10} className="text-blue-600"/>
                <span className="text-[8px] font-bold text-blue-700">HEALTHCARE</span>
            </div>
            <div className="flex-1 bg-slate-900 p-2 relative overflow-hidden flex flex-col justify-center border-t border-slate-800">
                {/* ECG Monitor Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                {/* Glowing Pulse Line */}
                <svg viewBox="0 0 100 40" className="w-full h-12 overflow-visible z-10">
                    <motion.path 
                        d="M 0 20 L 20 20 L 25 5 L 35 35 L 45 10 L 55 25 L 60 20 L 100 20" 
                        fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ filter: "drop-shadow(0 0 4px #10b981)" }}
                    />
                </svg>
                {/* Blinking Status */}
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_red]"></div>
            </div>
        </motion.div>

        {/* LOGISTICS - Map Route & Moving Package */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-6 left-6 w-36 h-28 bg-white/90 backdrop-blur-xl border border-amber-200 rounded-lg shadow-xl flex flex-col overflow-hidden z-20">
            <div className="h-6 bg-amber-50 border-b border-amber-100 flex items-center px-2 gap-1">
                <Globe size={10} className="text-amber-600"/>
                <span className="text-[8px] font-bold text-amber-700">LOGISTICS & FLEET</span>
            </div>
            <div className="flex-1 bg-[#e0f2fe] relative overflow-hidden p-2 flex items-center justify-center border-t border-blue-200">
                {/* Minimalist Map Route */}
                <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full opacity-40">
                    <path d="M 10 30 Q 30 10 50 30 T 90 40" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="4,4"/>
                </svg>
                {/* Destination Nodes */}
                <div className="absolute top-[14px] left-[10px] w-3 h-3 bg-slate-700 rounded-full border-2 border-white shadow-sm"></div>
                <div className="absolute bottom-[16px] right-[10px] w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-[0_0_8px_orange]"></div>
                {/* Moving Vehicle */}
                <motion.div 
                    animate={{ x: [0, 90], y: [0, 20] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute top-[8px] left-[10px] w-6 h-4 bg-white border border-slate-800 rounded-sm shadow-md flex items-center justify-center z-10"
                >
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                </motion.div>
            </div>
        </motion.div>

        {/* MANUFACTURING - Conveyor Belt & Robotic Arm */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="absolute bottom-6 right-6 w-36 h-28 bg-white/90 backdrop-blur-xl border border-slate-300 rounded-lg shadow-xl flex flex-col overflow-hidden z-20">
            <div className="h-6 bg-slate-100 border-b border-slate-200 flex items-center px-2 gap-1">
                <Factory size={10} className="text-slate-600"/>
                <span className="text-[8px] font-bold text-slate-700">MANUFACTURING</span>
            </div>
            <div className="flex-1 bg-slate-50 relative overflow-hidden flex flex-col items-center justify-end pb-3 border-t border-slate-200">
                {/* Robotic Arm from top */}
                <motion.div 
                    animate={{ rotateZ: [-25, 25, -25] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute top-0 w-3 h-12 bg-slate-300 border border-slate-400 origin-top flex flex-col items-center justify-end rounded-b z-10 shadow-md"
                >
                    <div className="w-6 h-3 bg-slate-700 rounded-b-sm"></div>
                </motion.div>
                
                {/* Conveyor Belt System */}
                <div className="w-[120%] h-6 border-y-2 border-slate-400 bg-slate-200 relative flex items-center overflow-hidden shadow-inner">
                     <motion.div 
                        animate={{ x: [-30, 150] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                        className="w-5 h-5 bg-amber-400 border-2 border-amber-600 rounded-sm shadow-md absolute left-0"
                     />
                     <motion.div 
                        animate={{ x: [-30, 150] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 1.25 }}
                        className="w-5 h-5 bg-amber-400 border-2 border-amber-600 rounded-sm shadow-md absolute left-0"
                     />
                </div>
            </div>
        </motion.div>

        {/* Structured Pipelines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: "drop-shadow(0 0 4px rgba(251,191,36,0.5))" }}>
            <motion.path d="M 200 150 L 200 70 L 100 70" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} strokeLinejoin="miter" strokeLinecap="square" />
            <motion.path d="M 200 150 L 200 70 L 300 70" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} strokeLinejoin="miter" strokeLinecap="square" />
            <motion.path d="M 200 150 L 200 230 L 100 230" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} strokeLinejoin="miter" strokeLinecap="square" />
            <motion.path d="M 200 150 L 200 230 L 300 230" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} strokeLinejoin="miter" strokeLinecap="square" />
            
            {/* Data flowing */}
            <motion.circle r="4" fill="#f59e0b" initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} style={{ offsetPath: "path('M 200 150 L 200 70 L 100 70')" } as any} />
            <motion.circle r="4" fill="#f59e0b" initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3, ease: "linear" }} style={{ offsetPath: "path('M 200 150 L 200 70 L 300 70')" } as any} />
            <motion.circle r="4" fill="#f59e0b" initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6, ease: "linear" }} style={{ offsetPath: "path('M 200 150 L 200 230 L 100 230')" } as any} />
            <motion.circle r="4" fill="#f59e0b" initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.9, ease: "linear" }} style={{ offsetPath: "path('M 200 150 L 200 230 L 300 230')" } as any} />
        </svg>

        {/* Central Platform Hub with prominent logo */}
        <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
            className="absolute z-30 w-36 h-36 bg-white/95 backdrop-blur-3xl rounded-[2rem] border-[3px] border-amber-400 shadow-[0_20px_50px_rgba(251,191,36,0.5)] flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 to-transparent"></div>
            
            {/* Pulsing ring behind logo */}
            <motion.div 
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-2 rounded-2xl border-2 border-amber-400"
            />
            
            <Image src="/logo.png" alt="ITSoftLab360 Core" width={90} height={28} className="object-contain drop-shadow-md relative z-10 mb-2" />
            <div className="relative z-10 bg-amber-50 px-3 py-1 rounded-full border border-amber-300 shadow-sm">
                <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-widest">Central Hub</span>
            </div>
        </motion.div>
    </div>
  );
};


// 5. Thousands of Customers (Massive Graph + Network Scale)
export const CustomersAnimation = () => {
    // Generate strict grid coordinates for network sharing (larger radius for bigger visualization)
    const nodes = Array.from({length: 48}).map((_, i) => {
        const angle = (i * 7.5) * (Math.PI / 180);
        const radius = i % 2 === 0 ? 180 : 240;
        return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
    });

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#0A0B14]/40 rounded-3xl scale-110">
        
        {/* Precise Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf610_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf610_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Structured Network Share Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 4px rgba(139,92,246,0.8))" }}>
            <g transform="translate(250, 200)">
                {nodes.map((n, i) => (
                    <motion.line 
                        key={i} x1="0" y1="0" x2={n.x} y2={n.y} 
                        stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" 
                        initial={{ strokeDasharray: "0, 1000" }}
                        animate={{ strokeDasharray: "300, 0" }}
                        transition={{ duration: 1.5, delay: i * 0.05 }}
                    />
                ))}
            </g>
        </svg>

        {/* Network Nodes */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ transform: "translate(250px, 200px)" }}>
             {nodes.map((n, i) => (
                 <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                    className="absolute w-3 h-3 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,1)]"
                    style={{ left: n.x - 6, top: n.y - 6 }}
                 />
             ))}
        </div>

        {/* Central Massive Dashboard */}
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="relative z-20 w-[420px] bg-white/90 backdrop-blur-3xl border-2 border-violet-200 rounded-2xl shadow-[0_30px_70px_rgba(139,92,246,0.15),0_0_60px_rgba(139,92,246,0.2)] flex flex-col overflow-hidden"
        >
            {/* Header with Logo */}
            <div className="px-6 py-4 border-b border-violet-100 flex justify-between items-center bg-white/80">
                <Image src="/logo.png" alt="ITSoftLab360" width={110} height={24} className="object-contain" />
                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Global Scale</span>
                </div>
            </div>

            {/* Content area: Massive Graph */}
            <div className="p-6 flex flex-col items-center w-full">
                <div className="w-full flex justify-between items-end mb-4">
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Customer Growth Index</div>
                    <div className="text-sm font-black text-emerald-600">+12,450%</div>
                </div>

                {/* Massive Animated Bar Graph */}
                <div className="w-full h-32 flex items-end justify-between gap-1 mb-6 border-b border-slate-200 pb-2">
                    {[10, 15, 12, 25, 30, 20, 45, 55, 40, 70, 85, 60, 95, 100].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end h-full gap-1 group">
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 1 + i * 0.05, duration: 0.8, type: "spring" }}
                                className="w-full bg-gradient-to-t from-violet-500 to-violet-300 rounded-t-sm shadow-[0_0_10px_rgba(139,92,246,0.1)] group-hover:bg-violet-400 transition-colors"
                            />
                        </div>
                    ))}
                </div>

                {/* Secondary Graphs */}
                <div className="w-full grid grid-cols-2 gap-4">
                    <div className="bg-slate-50/80 rounded-lg border border-slate-200/50 p-3">
                         <div className="text-[9px] text-slate-500 mb-2 font-semibold">NETWORK LATENCY</div>
                         {/* Animated Line Graph (SVG) */}
                         <svg viewBox="0 0 100 30" className="w-full h-8 overflow-visible">
                             <motion.path 
                                d="M 0 25 C 20 25, 20 10, 40 15 C 60 20, 70 5, 100 10" 
                                fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 1.5 }}
                             />
                             <motion.circle r="3" fill="#8b5cf6" initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ offsetPath: "path('M 0 25 C 20 25, 20 10, 40 15 C 60 20, 70 5, 100 10')" } as any} />
                         </svg>
                    </div>
                    
                    <div className="bg-slate-50/80 rounded-lg border border-slate-200/50 p-3 flex justify-between items-center">
                         <div className="text-[9px] text-slate-500 font-semibold">DATA VOLUME</div>
                         <div className="flex gap-[2px]">
                            {[1,2,3,4,5].map(i => (
                                <motion.div key={i} animate={{ height: [8, 20, 8] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }} className="w-2 bg-violet-300 rounded-sm" />
                            ))}
                         </div>
                    </div>
                </div>
            </div>
            
            {/* Base line progress */}
            <div className="h-2 w-full bg-slate-100">
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="h-full bg-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]" />
            </div>
        </motion.div>
    </div>
  );
};
