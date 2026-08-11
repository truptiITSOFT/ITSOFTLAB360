"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, UserCircle, Briefcase, Store,
  ShoppingBag, Megaphone, Truck, TrendingUp,
  GraduationCap, CreditCard, ShieldCheck, FolderOpen,
  Play, Pause, ChevronRight, ChevronLeft,
  MapPin, Clock, BarChart3, Activity,
  Package, CheckCircle2, AlertTriangle, DollarSign,
  Globe, LayoutDashboard, Receipt, ListOrdered, Box, Users2,
  UserSquare2, FileText, Settings, PlusCircle, ArrowRightLeft,
  Banknote, Smartphone, ReceiptText
} from "lucide-react";

import HRMSMockup from "./mockups/HRMSMockup";
import CRMMockup from "./mockups/CRMMockup";
import ERPMockup from "./mockups/ERPMockup";
import DealerMockup from "./mockups/DealerMockup";
import VendorMockup from "./mockups/VendorMockup";
import AIAutomationMockup from "./mockups/AIAutomationMockup";
import SupplyChainMockup from "./mockups/SupplyChainMockup";
import SalesForceMockup from "./mockups/SalesForceMockup";
import LMSMockup from "./mockups/LMSMockup";
import QMSMockup from "./mockups/QMSMockup";
import DMSMockup from "./mockups/DMSMockup";

// Data
const solutions = [
  { id: "01", title: "HRMS", short: "HRMS", desc: "Manage HR, payroll, attendance, leave, and employee records.", icon: <Users size={24} />, color: "text-[#EB3158]", bg: "bg-[#EB3158]" },
  { id: "02", title: "CRM", short: "CRM", desc: "Manage customers, leads, sales, and relationships.", icon: <UserCircle size={24} />, color: "text-purple-500", bg: "bg-purple-500" },
  { id: "03", title: "ERP", short: "ERP", desc: "Integrate finance, inventory, procurement, and operations.", icon: <Briefcase size={24} />, color: "text-green-500", bg: "bg-green-500" },
  { id: "04", title: "Dealer Management System", short: "DMS", desc: "Manage dealers, orders, inventory, and distributors.", icon: <Store size={24} />, color: "text-orange-500", bg: "bg-orange-500" },
  { id: "05", title: "Vendor Management System", short: "VMS", desc: "Manage vendors, procurement, and purchase orders.", icon: <ShoppingBag size={24} />, color: "text-teal-500", bg: "bg-teal-500" },
  { id: "06", title: "Marketing Automation", short: "Marketing", desc: "Automate campaigns, emails, and engagement.", icon: <Megaphone size={24} />, color: "text-pink-500", bg: "bg-pink-500" },
  { id: "07", title: "Supply Chain & Logistics", short: "Logistics", desc: "Track inventory, warehouses, shipments, and logistics.", icon: <Truck size={24} />, color: "text-[#EB3158]", bg: "bg-[#EB3158]" },
  { id: "08", title: "Sales Force Automation", short: "Sales", desc: "Manage leads, quotations, and opportunities.", icon: <TrendingUp size={24} />, color: "text-green-600", bg: "bg-green-600" },
  { id: "09", title: "Learning Management System", short: "LMS", desc: "Deliver online training, assessments, and learning.", icon: <GraduationCap size={24} />, color: "text-indigo-500", bg: "bg-indigo-500" },
  { id: "10", title: "POS", short: "POS", desc: "Fast billing, inventory, payments, and retail.", icon: <CreditCard size={24} />, color: "text-pink-500", bg: "bg-pink-500" },
  { id: "11", title: "Queue Management System", short: "QMS", desc: "Manage audits, compliance, and quality control.", icon: <ShieldCheck size={24} />, color: "text-cyan-500", bg: "bg-cyan-500" },
  { id: "12", title: "Document Management System", short: "DocMS", desc: "Store, organize, share, and secure documents.", icon: <FolderOpen size={24} />, color: "text-rose-500", bg: "bg-rose-500" },
];

export default function SolutionsGrid() {
  const [activeIndex, setActiveIndex] = useState(9); // Default to POS (10) for demo
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % solutions.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  useEffect(() => {
    if (isAutoSliding) {
      timerRef.current = setInterval(nextSlide, 8000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoSliding, activeIndex]);

  const activeSolution = solutions[activeIndex];
  const prevSolution = solutions[(activeIndex - 1 + solutions.length) % solutions.length];
  const nextSolution = solutions[(activeIndex + 1) % solutions.length];

  return (
    <section className="py-10 relative z-10 w-full overflow-hidden dark:bg-[#030816] bg-slate-50 transition-colors duration-500 font-sans" id="solutions">
      {/* Glowing background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[480px] bg-[#EB3158]/10 dark:bg-blue-600/20 blur-[96px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1280px]">
        {/* Main Carousel Area */}
        <div className="relative flex items-center justify-center min-h-[560px] mb-12">
          
          {/* Left Card (Previous) */}
          <div 
            className="hidden lg:flex absolute left-0 w-[192px] xl:w-[224px] h-[400px] bg-white/40 dark:bg-[#0a1128]/80 backdrop-blur-md rounded-2xl border border-[#111A4A]/10 dark:border-blue-900/50 p-6 flex-col shadow-xl cursor-pointer hover:scale-105 transition-transform opacity-60 hover:opacity-100 z-10"
            onClick={prevSlide}
          >
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className={`p-4 rounded-xl bg-opacity-10 dark:bg-opacity-20 ${prevSolution.bg} ${prevSolution.color}`}>
                {prevSolution.icon}
              </div>
              <h3 className="font-bold text-xl text-[#15172B] dark:text-white text-center">{prevSolution.title}</h3>
            </div>
            <p className="text-sm text-[#15172B]/60 dark:text-slate-400 mb-6 text-center">{prevSolution.desc}</p>
            <div className="mt-auto flex justify-center">
              <div className="w-48 h-32 relative">
                 <div className={`absolute bottom-0 w-8 ${prevSolution.bg} rounded-t-sm left-4 h-12 opacity-80`}></div>
                 <div className={`absolute bottom-0 w-8 ${prevSolution.bg} rounded-t-sm left-16 h-20 opacity-90`}></div>
                 <div className={`absolute bottom-0 w-8 ${prevSolution.bg} rounded-t-sm left-28 h-28 opacity-100`}></div>
                 {/* Trend line */}
                 <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M10,80 L35,50 L65,60 L90,20" fill="none" stroke="#eab308" strokeWidth="3" />
                 </svg>
              </div>
            </div>
          </div>

          {/* Center Card (Active) */}
          <div className="w-full lg:w-[800px] xl:w-[960px] z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                transition={{ duration: 0.4 }}
                className="w-full h-[512px] bg-white/60 dark:bg-[#060d20]/90 backdrop-blur-xl rounded-3xl border border-[#111A4A]/10 dark:border-blue-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_40px_rgba(30,64,255,0.15)] overflow-hidden flex flex-col"
              >
                <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar [&>div]:min-h-full">
                  {activeSolution.id === "01" ? <HRMSMockup solution={activeSolution} /> :
                   activeSolution.id === "02" ? <CRMMockup solution={activeSolution} /> :
                   activeSolution.id === "03" ? <ERPMockup solution={activeSolution} /> :
                   activeSolution.id === "04" ? <DealerMockup solution={activeSolution} /> :
                   activeSolution.id === "05" ? <VendorMockup solution={activeSolution} /> :
                   activeSolution.id === "06" ? <AIAutomationMockup solution={activeSolution} /> :
                   activeSolution.id === "07" ? <SupplyChainMockup solution={activeSolution} /> :
                   activeSolution.id === "08" ? <SalesForceMockup solution={activeSolution} /> :
                   activeSolution.id === "09" ? <LMSMockup solution={activeSolution} /> :
                   activeSolution.id === "10" ? <POSDashboardMockup solution={activeSolution} /> : 
                   activeSolution.id === "11" ? <QMSMockup solution={activeSolution} /> :
                   activeSolution.id === "12" ? <DMSMockup solution={activeSolution} /> :
                   <DashboardMockup solution={activeSolution} />
                  }
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Card (Next) */}
          <div 
            className="hidden lg:flex absolute right-0 w-[192px] xl:w-[224px] h-[400px] bg-white/40 dark:bg-[#0a1128]/80 backdrop-blur-md rounded-2xl border border-[#111A4A]/10 dark:border-blue-900/50 p-6 flex-col shadow-xl cursor-pointer hover:scale-105 transition-transform opacity-60 hover:opacity-100 z-10"
            onClick={nextSlide}
          >
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className={`p-4 rounded-xl bg-opacity-10 dark:bg-opacity-20 ${nextSolution.bg} ${nextSolution.color}`}>
                {nextSolution.icon}
              </div>
              <h3 className="font-bold text-xl text-[#15172B] dark:text-white text-center">{nextSolution.title}</h3>
            </div>
            <p className="text-sm text-[#15172B]/60 dark:text-slate-400 mb-6 text-center">{nextSolution.desc}</p>
            <div className="mt-auto flex justify-center">
              <div className="w-48 h-32 relative">
                 <div className={`absolute bottom-0 w-8 ${nextSolution.bg} rounded-t-sm left-4 h-12 opacity-80`}></div>
                 <div className={`absolute bottom-0 w-8 ${nextSolution.bg} rounded-t-sm left-16 h-20 opacity-90`}></div>
                 <div className={`absolute bottom-0 w-8 ${nextSolution.bg} rounded-t-sm left-28 h-28 opacity-100`}></div>
                 {/* Trend line */}
                 <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M10,80 L35,50 L65,60 L90,20" fill="none" stroke="#eab308" strokeWidth="3" />
                 </svg>
              </div>
            </div>
          </div>

          {/* Nav Arrows */}
          <button onClick={prevSlide} className="absolute left-4 z-40 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 border border-[#111A4A]/20 dark:border-white/20 text-[#15172B] dark:text-white hover:bg-white dark:hover:bg-slate-700 transition shadow-xl">
            <ChevronLeft size={28} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 z-40 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 border border-[#111A4A]/20 dark:border-white/20 text-[#15172B] dark:text-white hover:bg-white dark:hover:bg-slate-700 transition shadow-xl">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="max-w-6xl mx-auto z-30 relative">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-6">
            {solutions.map((sol, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={sol.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsAutoSliding(false);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? `bg-blue-50 dark:bg-blue-900/40 border-[#EB3158]/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]` 
                      : 'bg-white/50 dark:bg-[#0a1128]/50 border-[#111A4A]/10 dark:border-white/5 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-white/10'
                  }`}
                  style={{
                    borderColor: isActive && sol.bg.includes('pink') ? '#ec4899' : undefined,
                    boxShadow: isActive && sol.bg.includes('pink') ? '0 0 12px rgba(236, 72, 153, 0.3)' : undefined
                  }}
                >
                  <div className={`mb-2 ${isActive ? `${sol.color} drop-shadow-[0_0_8px_currentColor]` : 'text-[#15172B]/60 dark:text-slate-400'}`}>
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="scale-75">{sol.icon}</span>
                    </div>
                  </div>
                  <span className={`text-[8px] sm:text-[8.8px] text-center font-medium leading-tight ${isActive ? sol.color : 'text-[#15172B]/80 dark:text-slate-400'}`}>
                    {sol.short}
                  </span>
                  {/* Small index number */}
                  <span className="absolute top-1 left-1.5 text-[6.4px] text-slate-400 dark:text-slate-500 font-mono">{sol.id}</span>
                </button>
              );
            })}
          </div>

          {/* Auto Sliding Controls */}
          <div className="flex items-center gap-4 bg-white/40 dark:bg-[#0a1128]/50 p-2 pr-6 rounded-full border border-[#111A4A]/10 dark:border-white/5 backdrop-blur-md max-w-2xl mx-auto">
            <button 
              onClick={() => setIsAutoSliding(!isAutoSliding)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 text-[#15172B] dark:text-white text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              {isAutoSliding ? <Pause size={16} /> : <Play size={16} />}
              Auto-sliding
            </button>
            <div className="flex-grow h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-pink-500 rounded-full"
                style={{ backgroundColor: activeSolution.bg.includes('pink') ? '#ec4899' : '#3b82f6' }}
                initial={{ width: "0%" }}
                animate={{ width: isAutoSliding ? "100%" : "0%" }}
                transition={{ 
                  duration: isAutoSliding ? 8 : 0, 
                  ease: "linear",
                  repeat: isAutoSliding ? Infinity : 0
                }}
                key={activeIndex + (isAutoSliding ? '-on' : '-off')}
              />
            </div>
            <div className="text-sm font-medium text-[#15172B]/60 dark:text-slate-400 whitespace-nowrap min-w-[32px] text-right">
              {activeIndex + 1} / {solutions.length}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


// --- POS Specific Dashboard Mockup ---
function POSDashboardMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[512px] text-white">
      {/* Left Sidebar */}
      <div className="w-56 bg-[#040813] border-r border-white/5 p-4 flex flex-col gap-1 rounded-l-3xl">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-500 flex items-center justify-center">
             <CreditCard size={18} />
          </div>
          <span className="font-bold text-lg">POS</span>
        </div>
        {[
          { icon: <LayoutDashboard size={16}/>, label: "Dashboard", active: true },
          { icon: <Receipt size={16}/>, label: "Sales" },
          { icon: <ListOrdered size={16}/>, label: "Orders" },
          { icon: <Box size={16}/>, label: "Products" },
          { icon: <Package size={16}/>, label: "Inventory" },
          { icon: <Users2 size={16}/>, label: "Customers" },
          { icon: <Truck size={16}/>, label: "Suppliers" },
          { icon: <UserSquare2 size={16}/>, label: "Staff" },
          { icon: <FileText size={16}/>, label: "Reports" },
          { icon: <DollarSign size={16}/>, label: "Expenses" },
          { icon: <Settings size={16}/>, label: "Settings" },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm cursor-pointer transition-colors ${item.active ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
             {item.icon}
             <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-5 flex flex-col gap-4 bg-[#0a1125] rounded-r-3xl">
        
        {/* Header row */}
        <div className="flex justify-between items-center bg-[#0d162f] p-4 rounded-2xl border border-white/5">
           <div className="flex gap-4 items-center">
             <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-500">
                <CreditCard size={24} />
             </div>
             <div>
               <h2 className="text-xl font-bold">POS</h2>
               <p className="text-xs text-slate-400">Smart Point of Sale for Retail, Restaurants & Supermarkets.</p>
               <p className="text-xs text-slate-400">Billing, Inventory & Customer Management.</p>
             </div>
           </div>
           
           <div className="flex items-center gap-4">
             <div className="relative w-48 h-20 rounded-xl overflow-hidden bg-slate-900 border border-white/10 hidden md:block group">
                <div className="absolute top-2 left-2 text-[8px] text-slate-400">Total: <span className="text-white text-sm font-bold">$128.50</span></div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#EB3158] text-[6.4px] rounded text-white font-bold cursor-pointer">PAY</div>
                <div className="absolute right-[-8px] top-[-8px] w-16 h-16 bg-pink-500/20 blur-xl group-hover:bg-pink-500/40 transition"></div>
                <ReceiptText className="absolute bottom-2 left-2 text-[#15172B]/60" size={16} />
             </div>
             
             <select className="bg-[#151f38] border border-white/10 text-xs px-3 py-1.5 rounded-lg text-slate-300 outline-none">
               <option>This Month</option>
             </select>
             <button className="w-8 h-8 rounded-full bg-[#151f38] flex items-center justify-center relative border border-white/10">
               <AlertTriangle size={14} className="text-slate-300" />
               <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pink-500"></span>
             </button>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total Sales", val: "$128,450", trend: "+18.6%", up: true, icon: <DollarSign size={16}/>, color: "text-[#EB3158]" },
            { label: "Transactions", val: "3,245", trend: "+14.2%", up: true, icon: <Receipt size={16}/>, color: "text-indigo-400" },
            { label: "Avg. Order Value", val: "$39.55", trend: "+9.8%", up: true, icon: <CreditCard size={16}/>, color: "text-green-400" },
            { label: "Items Sold", val: "12,845", trend: "+16.3%", up: true, icon: <ShoppingBag size={16}/>, color: "text-cyan-400" },
            { label: "Gross Profit", val: "$40,230", trend: "+21.7%", up: true, icon: <BarChart3 size={16}/>, color: "text-purple-400" },
            { label: "Customers", val: "2,356", trend: "+11.4%", up: true, icon: <Users2 size={16}/>, color: "text-orange-400" },
          ].map((kpi, i) => (
             <div key={i} className="bg-[#0d162f] border border-white/5 p-3 rounded-2xl flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-1">
                 <div className={`p-1.5 rounded-lg bg-white/5 ${kpi.color}`}>
                   {kpi.icon}
                 </div>
                 <span className="text-[8px] text-slate-400">{kpi.label}</span>
               </div>
               <div className="text-lg font-bold ml-1">{kpi.val}</div>
               <div className={`text-[7.2px] ml-1 mt-1 font-medium ${kpi.up ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.trend} <span className="text-[#15172B]/60 font-normal">vs Apr 2025</span>
               </div>
             </div>
          ))}
        </div>

        {/* Middle Row (Charts) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-48">
          {/* Sales Overview Line Chart */}
          <div className="lg:col-span-1 bg-[#0d162f] border border-white/5 rounded-2xl p-4 flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Sales Overview</h3>
               <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
             </div>
             
             {/* Mock Line Chart */}
             <div className="flex-grow relative mt-2">
                <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-4">
                  <div className="border-b border-white/5 w-full h-0"></div>
                  <div className="border-b border-white/5 w-full h-0"></div>
                  <div className="border-b border-white/5 w-full h-0"></div>
                  <div className="border-b border-white/5 w-full h-0"></div>
                </div>
                <div className="absolute left-0 top-0 bottom-6 w-6 flex flex-col justify-between text-[6.4px] text-[#15172B]/60 items-end pr-1">
                  <span>150k</span><span>120k</span><span>90k</span><span>60k</span><span>30k</span><span>0</span>
                </div>
                <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[6.4px] text-[#15172B]/60">
                  <span>May 01</span><span>May 11</span><span>May 21</span><span>May 31</span>
                </div>
                <div className="absolute inset-0 left-6 bottom-6 z-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M0,80 L10,60 L20,70 L30,40 L40,50 L50,20 L60,30 L70,10 L80,25 L90,15 L100,5" fill="none" stroke="#a855f7" strokeWidth="2" className="drop-shadow-[0_0_5px_#a855f7]" />
                    <path d="M0,90 L10,80 L20,85 L30,60 L40,65 L50,45 L60,50 L70,30 L80,45 L90,25 L100,20" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_5px_#3b82f6]" />
                    {/* Glowing dots */}
                    <circle cx="70" cy="10" r="2" fill="#fff" stroke="#a855f7" strokeWidth="1" />
                    <circle cx="70" cy="30" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                  </svg>
                </div>
                {/* Custom Tooltip */}
                <div className="absolute right-4 top-4 bg-[#1e293b]/90 border border-white/10 rounded-lg p-2 z-20 shadow-lg text-[7.2px]">
                   <div className="text-slate-400 mb-1">May 29, 2025</div>
                   <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Sales: $128,450</div>
                   <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#EB3158]"></div> Profit: $40,230</div>
                </div>
             </div>
          </div>

          {/* Sales by Channel Donut */}
          <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-4 flex flex-col">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Sales by Channel</h3>
               <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
             </div>
             <div className="flex-grow flex items-center justify-between px-2">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a855f7" strokeWidth="12" strokeDasharray="140 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="60 251" strokeDashoffset="-140" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eab308" strokeWidth="12" strokeDasharray="30 251" strokeDashoffset="-200" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">$128,450</span>
                    <span className="text-[6.4px] text-slate-400">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[7.2px]">
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> In-Store</span> <span>55%</span></div>
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#EB3158]"></div> Online</span> <span>25%</span></div>
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Takeaway</span> <span>12%</span></div>
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Delivery</span> <span>8%</span></div>
                </div>
             </div>
          </div>

          {/* Payment Methods Donut */}
          <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-4 flex flex-col">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Payment Methods</h3>
               <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
             </div>
             <div className="flex-grow flex items-center justify-between px-2">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="100 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="80 251" strokeDashoffset="-100" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a855f7" strokeWidth="12" strokeDasharray="50 251" strokeDashoffset="-180" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">3,245</span>
                    <span className="text-[6.4px] text-slate-400">Transactions</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[7.2px]">
                   <div className="flex justify-between w-16"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Cash</span> <span>40%</span></div>
                   <div className="flex justify-between w-16"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#EB3158]"></div> Card</span> <span>35%</span></div>
                   <div className="flex justify-between w-16"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> UPI</span> <span>20%</span></div>
                   <div className="flex justify-between w-16"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Wallet</span> <span>5%</span></div>
                </div>
             </div>
          </div>

        </div>

        {/* Third Row (Tables/Lists) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-grow min-h-[112px]">
           {/* Top Selling Categories */}
           <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-3 flex flex-col lg:col-span-1">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Top Selling Categories</h3>
               <select className="bg-transparent text-[6.4px] text-slate-400 outline-none"><option>This Month</option></select>
             </div>
             <div className="flex flex-col gap-2 text-[7.2px] mt-2">
                {[
                  { name: "Beverages", val: "$28,450", pct: "22.1%", icon: "🥤", w: "90%", color: "bg-orange-500" },
                  { name: "Snacks", val: "$21,680", pct: "16.8%", icon: "🍿", w: "70%", color: "bg-[#EB3158]" },
                  { name: "Dairy Products", val: "$18,230", pct: "14.2%", icon: "🥛", w: "50%", color: "bg-indigo-500" },
                  { name: "Bakery", val: "$15,680", pct: "12.2%", icon: "🍞", w: "40%", color: "bg-purple-500" },
                  { name: "Fruits & Veg", val: "$12,450", pct: "9.7%", icon: "🍎", w: "30%", color: "bg-pink-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 w-20">
                      <span>{item.icon}</span> <span className="truncate">{item.name}</span>
                    </div>
                    <div className="flex-grow mx-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className={`h-full ${item.color} rounded-full`} style={{ width: item.w }}></div>
                    </div>
                    <div className="w-16 text-right">
                       {item.val} <span className="text-[#15172B]/60">({item.pct})</span>
                    </div>
                  </div>
                ))}
             </div>
           </div>

           {/* Low Stock Alert */}
           <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-3 flex flex-col lg:col-span-1">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Low Stock Alert</h3>
               <span className="text-[6.4px] text-[#EB3158] cursor-pointer">View All</span>
             </div>
             <div className="flex flex-col gap-2.5 mt-1 overflow-y-auto pr-1 text-[7.2px]">
                {[
                  { name: "Mineral Water 200ml", sku: "Stock: 12", count: 12, icon: "💧" },
                  { name: "Tomato Ketchup 500g", sku: "Stock: 8", count: 8, icon: "🍅" },
                  { name: "Milk 1L", sku: "Stock: 10", count: 10, icon: "🥛" },
                  { name: "Bread Brown", sku: "Stock: 6", count: 6, icon: "🍞" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-1 last:border-0">
                    <div className="flex gap-2 items-center">
                       <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[8px]">{item.icon}</div>
                       <div className="flex flex-col">
                         <span className="truncate w-24 text-slate-200">{item.name}</span>
                         <span className="text-[#15172B]/60 text-[6.4px]">{item.sku}</span>
                       </div>
                    </div>
                    <span className="text-red-500 font-medium bg-red-500/10 px-1.5 py-0.5 rounded">Stock: {item.count}</span>
                  </div>
                ))}
             </div>
           </div>

           {/* Recent Transactions */}
           <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-3 flex flex-col lg:col-span-1">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Recent Transactions</h3>
               <span className="text-[6.4px] text-[#EB3158] cursor-pointer">View All</span>
             </div>
             <div className="flex flex-col gap-2 mt-1 text-[7.2px]">
                {[
                  { time: "11:42 AM", name: "Coffee", price: "$4.20", status: "Completed" },
                  { time: "11:38 AM", name: "Sandwich", price: "$6.80", status: "Completed" },
                  { time: "11:35 AM", name: "Burger", price: "$8.50", status: "Completed" },
                  { time: "11:30 AM", name: "Milk 1L", price: "$2.10", status: "Completed" },
                  { time: "11:25 AM", name: "Chips", price: "$1.20", status: "Completed" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center pb-1">
                    <span className="text-slate-400 w-12">{item.time}</span>
                    <span className="text-slate-200 flex-grow px-2 truncate">{item.name}</span>
                    <span className="font-semibold w-8 text-right">{item.price}</span>
                    <span className="text-green-500 w-12 text-right">{item.status}</span>
                  </div>
                ))}
             </div>
           </div>
           
           {/* Inventory Status */}
           <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-3 flex flex-col lg:col-span-1">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Inventory Status</h3>
               <span className="text-[6.4px] text-[#EB3158] cursor-pointer">View All</span>
             </div>
             <div className="flex-grow flex items-center justify-center gap-3 mt-2">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="14" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="14" strokeDasharray="230 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="14" strokeDasharray="180 251" strokeDashoffset="-30" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[8px] font-bold">78%</span>
                    <span className="text-[4.8px] text-slate-400">In Stock</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-[6.4px]">
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> In Stock</span> <span>1,245 (78%)</span></div>
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> Low Stock</span> <span>245 (15%)</span></div>
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Out of Stock</span> <span>105 (7%)</span></div>
                </div>
             </div>
           </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-auto">
          {[
            { label: "New Sale", desc: "Create new sale", icon: <ShoppingBag size={14} />, color: "text-[#EB3158]", bg: "bg-[#EB3158]/10" },
            { label: "Orders", desc: "View all orders", icon: <ListOrdered size={14} />, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Add Product", desc: "Add new product", icon: <PlusCircle size={14} />, color: "text-teal-400", bg: "bg-teal-500/10" },
            { label: "Stock Transfer", desc: "Transfer stock", icon: <ArrowRightLeft size={14} />, color: "text-orange-400", bg: "bg-orange-500/10" },
            { label: "Expenses", desc: "Add expense", icon: <DollarSign size={14} />, color: "text-purple-400", bg: "bg-purple-500/10" },
            { label: "Reports", desc: "View reports", icon: <BarChart3 size={14} />, color: "text-pink-400", bg: "bg-pink-500/10" },
          ].map((action, i) => (
             <div key={i} className="bg-[#0d162f] border border-white/5 rounded-xl p-2 flex items-center justify-between cursor-pointer hover:bg-[#15234b] transition">
                <div className="flex items-center gap-2">
                   <div className={`w-8 h-8 rounded-lg ${action.bg} flex items-center justify-center ${action.color}`}>
                     {action.icon}
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[8px] font-semibold text-slate-200">{action.label}</span>
                     <span className="text-[6.4px] text-[#15172B]/60">{action.desc}</span>
                   </div>
                </div>
                <ChevronRight size={12} className="text-[#15172B]/80" />
             </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// Complex Dashboard Mockup tailored to Supply Chain & Logistics style
function DashboardMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
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
