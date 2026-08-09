"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Factory, Stethoscope, GraduationCap, Truck, Hotel, Building2, Briefcase, CheckCircle2, Users } from "lucide-react";

const INDUSTRIES = [
  { id: "retail", name: "Retail & E-commerce", icon: Store, color: "from-pink-500 to-rose-500", bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-200", products: ["POS Terminal", "E-Commerce Integrations", "Inventory ERP", "Marketing Automation"] },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, color: "from-slate-500 to-gray-700", bg: "bg-slate-200", text: "text-slate-700", border: "border-slate-300", products: ["Production ERP", "Vendor Management", "Supply Chain Tracker", "Staff HRMS"] },
  { id: "healthcare", name: "Healthcare", icon: Stethoscope, color: "from-blue-500 to-cyan-500", bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200", products: ["Patient Queue Mgt", "Healthcare CRM", "Secure Docs Mgt", "Clinic HRMS"] },
  { id: "education", name: "Education", icon: GraduationCap, color: "from-amber-500 to-orange-500", bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200", products: ["Learning Management (LMS)", "Faculty HRMS", "Student CRM", "Digital Docs Mgt"] },
  { id: "logistics", name: "Logistics & Transport", icon: Truck, color: "from-emerald-500 to-teal-500", bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200", products: ["Fleet Logistics Tracking", "Operations ERP", "Sales Force App", "Vendor Mgt"] },
  { id: "hospitality", name: "Hospitality", icon: Hotel, color: "from-violet-500 to-purple-500", bg: "bg-violet-100", text: "text-violet-600", border: "border-violet-200", products: ["Restaurant/Hotel POS", "Guest CRM", "Queue Management", "Staff HRMS"] },
  { id: "corporate", name: "Corporate Enterprise", icon: Building2, color: "from-indigo-500 to-blue-700", bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200", products: ["Enterprise ERP", "Corporate HRMS", "Secure Docs Mgt", "Sales Force"] },
  { id: "service", name: "Service Businesses", icon: Briefcase, color: "from-rose-400 to-red-500", bg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200", products: ["Service CRM", "Marketing Automation", "Billing POS", "Booking/Queue Mgt"] }
];

// --- Mini Animations for Each Industry ---

const RetailVisual = () => (
    <div className="w-full h-full relative flex items-center justify-center">
        <div className="w-32 h-24 border-2 border-pink-300 rounded-md bg-white flex flex-col justify-end p-2.5 relative overflow-hidden shadow-sm">
            <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute left-0 w-full h-[2px] bg-red-400 shadow-[0_0_10px_red] z-10"/>
            <div className="flex gap-1.5 items-end w-full h-16">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="flex-1 bg-slate-200 rounded-sm" style={{ height: `${Math.random() * 60 + 20}%` }}></div>)}
            </div>
        </div>
    </div>
);

const ManufacturingVisual = () => (
    <div className="w-full h-full relative flex flex-col items-center justify-center gap-6">
        <div className="flex gap-3">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-14 h-14 border-[6px] border-dashed border-slate-400 rounded-full" />
            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-14 h-14 border-[6px] border-dashed border-slate-500 rounded-full" />
        </div>
        <div className="w-40 h-3 bg-slate-300 rounded-full relative overflow-hidden">
            <motion.div animate={{ x: [-30, 180] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute top-0 w-8 h-full bg-slate-500 rounded-full shadow-[0_0_8px_rgba(100,116,139,0.5)]" />
        </div>
    </div>
);

const HealthcareVisual = () => (
    <div className="w-full h-full relative flex items-center justify-center">
        <svg viewBox="0 0 100 40" className="w-48 h-24 drop-shadow-lg">
            <motion.path 
                d="M 0 20 L 20 20 L 30 5 L 45 35 L 60 15 L 70 20 L 100 20" 
                fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity }}
            />
        </svg>
    </div>
);

const EducationVisual = () => (
    <div className="w-full h-full relative flex flex-col items-center justify-center gap-3">
        {[1,2,3].map(i => (
            <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i*0.2, repeat: Infinity, repeatDelay: 2, duration: 0.5 }} className={`w-${32 - i*4} h-5 rounded-sm bg-amber-400 shadow-sm border border-amber-500`} />
        ))}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-16 h-8 bg-amber-600 rounded-t-full mt-3 flex justify-center shadow-md"><div className="w-3 h-5 bg-amber-800 rounded-b-sm"></div></motion.div>
    </div>
);

const LogisticsVisual = () => (
    <div className="w-full h-full relative flex items-center justify-center">
        <svg viewBox="0 0 100 50" className="w-48 h-24 absolute">
            <path d="M 10 25 Q 30 5 50 25 T 90 25" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 6" />
        </svg>
        <motion.div animate={{ x: [-60, 60], y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="w-12 h-8 bg-emerald-500 rounded-md border-[3px] border-white shadow-lg relative z-10 flex items-center justify-center">
            <Truck size={16} className="text-white" />
        </motion.div>
    </div>
);

const HospitalityVisual = () => (
    <div className="w-full h-full relative flex flex-col items-center justify-center gap-2">
        <div className="w-32 h-24 bg-white border-2 border-violet-200 rounded-xl shadow-md grid grid-cols-4 grid-rows-3 gap-1.5 p-3">
            {[...Array(12)].map((_, i) => (
                <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }} className={`rounded-sm ${i % 3 === 0 ? 'bg-violet-400' : 'bg-slate-200'}`} />
            ))}
        </div>
    </div>
);

const CorporateVisual = () => (
    <div className="w-full h-full relative flex items-end justify-center gap-3 pb-8">
        {[40, 60, 45, 80, 100].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="w-8 bg-indigo-500 rounded-t-md shadow-md" />
        ))}
    </div>
);

const ServiceVisual = () => (
    <div className="w-full h-full relative flex items-center justify-center gap-6">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-16 h-16 bg-white rounded-full shadow-lg border-2 border-rose-200 flex items-center justify-center z-10"><Users size={28} className="text-rose-500" /></motion.div>
        <div className="flex flex-col gap-3">
            <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 2 }} className="h-3 w-24 bg-rose-300 rounded-full origin-left" />
            <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} className="h-3 w-16 bg-rose-200 rounded-full origin-left" />
            <motion.div animate={{ width: ["0%", "100%"] }} transition={{ repeat: Infinity, duration: 2, delay: 0.4 }} className="h-3 w-32 bg-rose-300 rounded-full origin-left" />
        </div>
    </div>
);


export default function IndustriesNetwork() {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const activeIndustry = INDUSTRIES.find(i => i.id === activeId) || INDUSTRIES[0];

  return (
    <section className="relative py-24 bg-[#FAFAFA] dark:bg-[#030816] transition-colors duration-300 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            One Platform. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">Multiple Industries.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto font-medium"
          >
            Select an industry below to see how our integrated product suite adapts to provide a tailored operational ecosystem.
          </motion.p>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
            {/* Left side: Interactive List */}
            <div className="w-full lg:w-[35%] flex flex-col gap-2 relative z-20">
                {INDUSTRIES.map((ind) => {
                    const isActive = activeId === ind.id;
                    const Icon = ind.icon;
                    return (
                        <button 
                            key={ind.id}
                            onClick={() => setActiveId(ind.id)}
                            className={`w-full text-left flex items-center gap-4 p-4 rounded-xl transition-all duration-300 relative overflow-hidden group border ${isActive ? 'bg-white shadow-[0_15px_30px_rgba(0,0,0,0.08)] border-slate-100 scale-[1.02] z-10' : 'bg-transparent border-transparent hover:bg-white/60'}`}
                        >
                            {isActive && <motion.div layoutId="activeIndBg" className={`absolute inset-0 opacity-[0.03] bg-gradient-to-r ${ind.color}`} />}
                            
                            <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isActive ? ind.bg + ' ' + ind.text + ' ' + ind.border + ' shadow-sm border' : 'bg-slate-200 text-slate-500 group-hover:bg-slate-300'}`}>
                                <Icon size={22} />
                            </div>
                            <span className={`relative z-10 font-bold transition-colors ${isActive ? 'text-slate-900 text-lg' : 'text-slate-600 group-hover:text-slate-900'}`}>{ind.name}</span>
                        </button>
                    )
                })}
            </div>

            {/* Right side: Dynamic Showcase Window */}
            <div className="w-full lg:w-[65%] h-[550px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 relative flex flex-col z-10 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndustry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full h-full flex flex-col absolute inset-0"
                    >
                        {/* Header Area */}
                        <div className={`w-full h-44 bg-gradient-to-br ${activeIndustry.color} p-8 flex items-end relative overflow-hidden shrink-0`}>
                            {/* Decorative Background Patterns */}
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute -right-20 -top-20 w-80 h-80 border-[40px] border-white/10 rounded-full" />
                            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }} className="absolute -left-10 -bottom-20 w-48 h-48 border-[20px] border-white/10 rounded-full" />
                            
                            <div className="relative z-10 flex items-center gap-5">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 text-white shadow-lg">
                                    <activeIndustry.icon size={32} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-white drop-shadow-md">{activeIndustry.name}</h3>
                                    <p className="text-white/90 font-medium text-lg mt-1">Tailored Ecosystem Solutions</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-8 flex gap-8">
                            {/* Left: Recommended Products List */}
                            <div className="w-1/2 flex flex-col justify-center gap-5 h-full">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Recommended Suite</h4>
                                <div className="flex flex-col gap-3">
                                    {activeIndustry.products.map((prod, i) => (
                                        <motion.div 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.05 }}
                                            key={prod} 
                                            className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 transition-colors p-4 rounded-xl border border-slate-100 shadow-sm"
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${activeIndustry.bg} ${activeIndustry.text}`}>
                                                <CheckCircle2 size={14} strokeWidth={3} />
                                            </div>
                                            <span className="font-bold text-slate-700">{prod}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Abstract UI Visualization */}
                            <div className="w-1/2 bg-[#f8fafc] rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col shadow-inner h-full">
                                 {/* Mock Browser/UI Header */}
                                 <div className="w-full h-10 bg-white border-b border-slate-200 flex items-center px-4 justify-between shadow-sm z-10 shrink-0">
                                     <div className="flex gap-1.5">
                                         <div className="w-3 h-3 rounded-full bg-slate-200"/>
                                         <div className="w-3 h-3 rounded-full bg-slate-200"/>
                                         <div className="w-3 h-3 rounded-full bg-slate-200"/>
                                     </div>
                                     <div className={`w-32 h-4 rounded-full ${activeIndustry.bg} opacity-50`}></div>
                                 </div>
                                 
                                 {/* Central Animation Area */}
                                 <div className="flex-1 p-6 relative">
                                     {activeIndustry.id === 'retail' && <RetailVisual />}
                                     {activeIndustry.id === 'manufacturing' && <ManufacturingVisual />}
                                     {activeIndustry.id === 'healthcare' && <HealthcareVisual />}
                                     {activeIndustry.id === 'education' && <EducationVisual />}
                                     {activeIndustry.id === 'logistics' && <LogisticsVisual />}
                                     {activeIndustry.id === 'hospitality' && <HospitalityVisual />}
                                     {activeIndustry.id === 'corporate' && <CorporateVisual />}
                                     {activeIndustry.id === 'service' && <ServiceVisual />}
                                 </div>
                                 
                                 {/* Mock UI Footer Progress */}
                                 <div className="w-full h-1.5 bg-slate-200 shrink-0">
                                     <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5, ease: "easeOut" }} className={`h-full bg-gradient-to-r ${activeIndustry.color}`} />
                                 </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

      </div>
    </section>
  );
}
