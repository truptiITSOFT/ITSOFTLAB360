import React from "react";
import { motion } from "framer-motion";
import { Globe, Truck, MapPin, Package, CheckCircle2, Clock, Activity, AlertTriangle, DollarSign, BarChart3, TrendingUp } from "lucide-react";

export default function GenericDashboardMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  // We use deterministic random values based on the solution ID to make it look different for each but stable
  const seed = parseInt(solution.id);
  const v1 = 60 + (seed * 17) % 40;
  const v2 = 20 + (seed * 11) % 60;
  
  return (
    <div className="p-6 h-full flex flex-col min-h-[512px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${solution.bg} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center ${solution.color} border border-[#111A4A]/10 dark:border-white/10 shadow-lg`}>
            {solution.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#15172B] dark:text-white flex items-center gap-2">
              {solution.title}
              <span className="flex h-2 w-2 relative ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </h2>
            <p className="text-[#15172B]/60 dark:text-slate-400 text-sm mt-1">{solution.desc}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-xs font-medium">
          Live Operations
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        
        {/* Main Center Area (Map & Flow) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          {/* Map/Tracker Widget */}
          <div className="bg-slate-50 dark:bg-[#0a1125] rounded-2xl border border-[#111A4A]/10 dark:border-white/5 p-5 relative overflow-hidden flex-grow min-h-[192px]">
            {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20 flex items-center justify-center">
              <Globe size={300} className="text-[#EB3158] animate-[spin_60s_linear_infinite]" />
            </div>
            
            {/* Path visualization */}
            <div className="absolute top-1/2 left-[20%] right-[20%] h-[1.6px] bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 -translate-y-1/2">
              <div className="absolute top-1/2 left-[20%] w-3 h-3 bg-[#EB3158] rounded-full -translate-y-1/2 shadow-[0_0_10px_#3b82f6]"></div>
              <div className="absolute top-1/2 right-[20%] w-3 h-3 bg-indigo-500 rounded-full -translate-y-1/2 shadow-[0_0_10px_#6366f1]"></div>
              <motion.div 
                className="absolute top-1/2 left-[40%] w-6 h-4 bg-white rounded-md -translate-y-1/2 shadow-lg flex items-center justify-center"
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Truck size={10} className="text-[#EB3158]" />
              </motion.div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-[#15172B] dark:text-white mb-1">Live Tracker</h3>
              <p className="text-xs text-[#15172B]/60 dark:text-slate-400">ID: TRK-{(seed * 8472).toString().substring(0, 5)}</p>
              
              <div className="mt-4 flex gap-4">
                <div>
                  <div className="text-[8px] text-[#15172B]/60 dark:text-slate-400">ETA</div>
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">2h 45m</div>
                </div>
                <div>
                  <div className="text-[8px] text-[#15172B]/60 dark:text-slate-400">Status</div>
                  <div className="text-sm font-medium text-[#EB3158] dark:text-blue-400">In Progress</div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Flow Widget */}
          <div className="bg-slate-50 dark:bg-[#0a1125] rounded-2xl border border-[#111A4A]/10 dark:border-white/5 p-4 flex items-center justify-between overflow-x-auto">
            {[
              { icon: <Package size={16} />, label: "Received", active: true },
              { icon: <CheckCircle2 size={16} />, label: "Processed", active: true },
              { icon: <Truck size={16} />, label: "In Transit", active: true },
              { icon: <MapPin size={16} />, label: "Delivered", active: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 ${
                    step.active 
                      ? 'bg-blue-500/20 border-[#EB3158]/50 text-[#EB3158] dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="text-[8px] font-medium text-[#15172B]/80 dark:text-slate-300">{step.label}</span>
                </div>
                {i < 3 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${step.active ? 'bg-[#EB3158]' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Right Sidebar Charts */}
        <div className="flex flex-col gap-4">
          
          {/* Donut Chart Widget */}
          <div className="bg-slate-50 dark:bg-[#0a1125] rounded-2xl border border-[#111A4A]/10 dark:border-white/5 p-4 flex flex-col items-center justify-center relative min-h-[128px]">
            <h3 className="absolute top-4 left-4 text-xs font-semibold text-slate-700 dark:text-slate-300">Status Overview</h3>
            
            <div className="relative w-24 h-24 mt-4">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="15" className="text-slate-200 dark:text-slate-800" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="15" className="text-[#EB3158]" strokeDasharray={`${v1 * 2.51} 251`} strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="15" className="text-green-500" strokeDasharray={`${v2 * 2.51} 251`} strokeDashoffset={`-${v1 * 2.51}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-[#15172B] dark:text-white">{v1 + v2}%</span>
                <span className="text-[6.4px] text-[#15172B]/60">Active</span>
              </div>
            </div>
            
            <div className="w-full flex justify-between mt-4 text-[8px]">
               <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#EB3158] rounded-full"></div> Main ({v1}%)</div>
               <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Sub ({v2}%)</div>
            </div>
          </div>

          {/* Line Chart Widget */}
          <div className="bg-slate-50 dark:bg-[#0a1125] rounded-2xl border border-[#111A4A]/10 dark:border-white/5 p-4 flex-grow flex flex-col min-h-[112px]">
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Efficiency Trend</h3>
            <div className="flex-grow relative flex items-end pt-4 pb-2">
              {/* Grid lines */}
              <div className="absolute inset-x-0 top-4 bottom-2 flex flex-col justify-between">
                <div className="border-b border-[#111A4A]/10 dark:border-white/5 w-full"></div>
                <div className="border-b border-[#111A4A]/10 dark:border-white/5 w-full"></div>
                <div className="border-b border-[#111A4A]/10 dark:border-white/5 w-full"></div>
              </div>
              
              {/* SVG Line Graph */}
              <div className="absolute inset-x-0 top-4 bottom-2 z-10">
                <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                  <path 
                    d={`M0,30 L20,${40 - (seed%10)*2} L40,15 L60,25 L80,10 L100,5`} 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="2"
                    className="drop-shadow-[0_2px_4px_rgba(59,130,246,0.5)]"
                  />
                  <path 
                    d={`M0,30 L20,${40 - (seed%10)*2} L40,15 L60,25 L80,10 L100,5 L100,40 L0,40 Z`} 
                    fill="url(#gradient)" 
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* X Axis */}
              <div className="w-full flex justify-between text-[6.4px] text-slate-400 mt-auto pt-2 z-20">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-auto pt-4">
        {[
          { label: "On-Time", val: "98.6%", trend: "+12.4%", up: true, icon: <Clock size={14} /> },
          { label: "Active", val: "1,250", trend: "+8.7%", up: true, icon: <Activity size={14} /> },
          { label: "Delayed", val: "48", trend: "-15.2%", up: false, icon: <AlertTriangle size={14} /> },
          { label: "Cost Saved", val: "$68.4k", trend: "+15.3%", up: true, icon: <DollarSign size={14} /> },
          { label: "Efficiency", val: "76%", trend: "+6.8%", up: true, icon: <BarChart3 size={14} /> },
        ].map((kpi, i) => (
           <div key={i} className={`bg-slate-50 dark:bg-[#0a1125] p-3 rounded-xl border border-[#111A4A]/10 dark:border-white/5 ${i === 4 ? 'hidden lg:block' : ''}`}>
             <div className="flex items-center gap-2 text-[#15172B]/60 dark:text-slate-400 mb-2">
               {kpi.icon}
               <span className="text-[8px] uppercase font-semibold">{kpi.label}</span>
             </div>
             <div className="text-xl font-bold text-[#15172B] dark:text-white">{kpi.val}</div>
             <div className={`text-[8px] font-medium mt-1 flex items-center gap-1 ${kpi.up ? 'text-green-500' : 'text-red-500'}`}>
               {kpi.up ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
               {kpi.trend}
             </div>
           </div>
        ))}
      </div>
    </div>
  );
}
