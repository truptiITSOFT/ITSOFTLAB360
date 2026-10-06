"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Factory, Stethoscope, GraduationCap, Truck, Hotel, Building2, Briefcase, CheckCircle2, Users, ChevronLeft, ChevronRight } from "lucide-react";

const INDUSTRIES = [
    { id: "service", name: "Service Businesses", icon: Briefcase, color: "from-indigo-400 to-blue-500", bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200", products: ["Service CRM", "Marketing Automation", "Billing POS", "Booking/Queue Mgt"] },
    { id: "healthcare", name: "Healthcare", icon: Stethoscope, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200", products: ["Patient Queue Mgt", "Healthcare CRM", "Secure Docs Mgt", "Clinic HRMS"] },
    { id: "manufacturing", name: "Manufacturing", icon: Factory, color: "from-blue-600 to-cyan-600", bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200", products: ["Production ERP", "Vendor Management", "Supply Chain Tracker", "Staff HRMS"] },
    { id: "logistics", name: "Logistics & Transport", icon: Truck, color: "from-amber-500 to-orange-500", bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200", products: ["Fleet Logistics Tracking", "Operations ERP", "Sales Force App", "Vendor Mgt"] },
    { id: "corporate", name: "Corporate Enterprise", icon: Building2, color: "from-slate-700 to-slate-900", bg: "bg-slate-200", text: "text-slate-800", border: "border-slate-300", products: ["Enterprise ERP", "Corporate HRMS", "Secure Docs Mgt", "Sales Force"] },
    { id: "education", name: "Education", icon: GraduationCap, color: "from-violet-500 to-purple-600", bg: "bg-violet-100", text: "text-violet-600", border: "border-violet-200", products: ["Learning Management (LMS)", "Faculty HRMS", "Student CRM", "Digital Docs Mgt"] },
    { id: "retail", name: "Retail & E-commerce", icon: Store, color: "from-rose-500 to-pink-600", bg: "bg-rose-100", text: "text-rose-600", border: "border-rose-200", products: ["POS Terminal", "E-Commerce Integrations", "Inventory ERP", "Marketing Automation"] }
];

// --- Enhanced Animations for Each Industry ---

const RetailVisual = () => (
    <div className="w-full h-full relative flex items-center justify-center bg-transparent overflow-hidden">
        <video
            src="/videos/retail360video.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
        />
    </div>
);

const ManufacturingVisual = () => (
    <div className="w-full h-full relative flex items-center justify-center bg-transparent overflow-hidden">
        <video
            src="/videos/manufacturing360video.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
        />
    </div>
);

const HealthcareVisual = () => (
    <div className="w-full h-full relative flex items-center justify-center bg-transparent overflow-hidden">
        <video
            src="/videos/healthcare360video.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
        />
    </div>
);

const EducationVisual = () => (
    <div className="w-full h-full relative flex flex-col items-center justify-center gap-6 bg-amber-50/30 rounded-xl overflow-hidden">
        {/* Floating Cap */}
        <motion.div
            animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative z-20"
        >
            <div className="w-24 h-8 bg-amber-600 rounded-t-full shadow-lg border-b-4 border-amber-700 flex justify-center relative">
                <div className="absolute -bottom-4 w-6 h-4 bg-amber-800 rounded-b-md"></div>
                {/* Tassel */}
                <motion.div
                    animate={{ rotate: [0, 15, 0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute right-4 top-2 w-1 h-12 bg-amber-300 origin-top rounded-full"
                />
            </div>
        </motion.div>

        {/* Animated Book */}
        <div className="relative w-32 h-20 bg-amber-100 rounded-lg shadow-xl border border-amber-200 flex items-center justify-center p-2 perspective-[800px] z-10">
            <div className="absolute w-1 h-full bg-amber-300 left-1/2 -translate-x-1/2 rounded-full"></div>
            {/* Pages flipping */}
            {[0, 1, 2].map(i => (
                <motion.div
                    key={i}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: -180, opacity: [1, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 1, ease: "easeInOut" }}
                    className="absolute right-1/2 w-[45%] h-[85%] bg-white rounded-sm shadow-sm origin-right border border-slate-100 flex flex-col gap-1 p-1"
                >
                    <div className="w-full h-1 bg-slate-200 rounded-full" />
                    <div className="w-3/4 h-1 bg-slate-200 rounded-full" />
                    <div className="w-full h-1 bg-slate-200 rounded-full" />
                </motion.div>
            ))}
        </div>
    </div>
);

const LogisticsVisual = () => (
    <div className="w-full h-full relative flex items-center justify-center bg-transparent overflow-hidden">
        <video
            src="/videos/supply360video.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
        />
    </div>
);

const CorporateVisual = () => (
    <div className="w-full h-full relative flex items-center justify-center bg-transparent overflow-hidden">
        <video
            src="/videos/Corporate Enterprise360.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
        />
    </div>
);

const ServiceVisual = () => (
    <div className="w-full h-full relative flex items-center justify-center bg-transparent overflow-hidden">
        <video
            src="/videos/Service Businesses360.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
        />
    </div>
);


export default function IndustriesNetwork() {
    const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
    const activeIndustry = INDUSTRIES.find(i => i.id === activeId) || INDUSTRIES[0];
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Autoslider functionality
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setActiveId(current => {
                const currentIndex = INDUSTRIES.findIndex(i => i.id === current);
                return INDUSTRIES[(currentIndex + 1) % INDUSTRIES.length].id;
            });
        }, 180000);
        return () => clearInterval(interval);
    }, [isPaused]);

    // Scroll active item into view on mobile
    useEffect(() => {
        if (window.innerWidth <= 1024 && scrollRef.current) {
            const activeBtn = scrollRef.current.querySelector('[data-active="true"]');
            if (activeBtn) {
                activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [activeId]);

    return (
        <section className="relative py-24 max-lg:pt-12 max-lg:pb-6 bg-[#FAFAFA]  transition-colors duration-300 overflow-hidden">
            <div className="max-w-[1040px] mx-auto px-6 md:px-10 relative z-10">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-slate-900  mb-6 tracking-tight"
                    >
                        One Platform. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">Multiple Industries.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600  max-w-2xl mx-auto font-medium"
                    >
                        Select an industry below to see how our integrated product suite adapts to provide a tailored operational ecosystem.
                    </motion.p>
                </div>

                <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Left side: Interactive List */}
                    <div
                        className="w-full lg:w-[35%] relative z-20 max-lg:pb-4 group"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >
                        {/* Mobile Slide Buttons removed per request */}

                        <div
                            ref={scrollRef}
                            className="flex flex-col max-lg:flex-row max-lg:overflow-x-auto gap-2 max-lg:gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
                        >
                            {INDUSTRIES.map((ind) => {
                                const isActive = activeId === ind.id;
                                const Icon = ind.icon;
                                return (
                                    <button
                                        key={ind.id}
                                        data-active={isActive}
                                        onClick={() => setActiveId(ind.id)}
                                        className={`w-full max-lg:min-w-[200px] shrink-0 text-left flex items-center gap-4 max-lg:gap-3 p-4 max-lg:p-3 rounded-xl transition-all duration-300 relative overflow-hidden group border ${isActive ? 'bg-white shadow-[0_15px_30px_rgba(0,0,0,0.08)] border-slate-200 scale-[1.02] z-10' : 'bg-transparent max-lg:bg-white/50 border-transparent max-lg:border-slate-200 hover:bg-white hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5'}`}
                                    >
                                        {isActive && <motion.div layoutId="activeIndBg" className={`absolute inset-0 opacity-[0.04] bg-gradient-to-r ${ind.color}`} />}

                                        <div className={`relative z-10 w-12 h-12 max-lg:w-10 max-lg:h-10 max-lg:shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? ind.bg + ' ' + ind.text + ' ' + ind.border + ' shadow-sm border' : `bg-slate-100 text-slate-500 border border-transparent group-hover:${ind.bg.split(' ')[0]} group-hover:${ind.text.split(' ')[0]} group-hover:${ind.border.split(' ')[0]} group-hover:scale-110`}`}>
                                            <Icon size={22} className={`max-lg:hidden ${isActive ? "scale-110 transition-transform" : "group-hover:scale-110 transition-transform"}`} />
                                            <Icon size={20} className={`lg:hidden ${isActive ? "scale-110 transition-transform" : "group-hover:scale-110 transition-transform"}`} />
                                        </div>
                                        <span className={`relative z-10 font-bold transition-colors whitespace-normal max-lg:whitespace-nowrap ${isActive ? 'text-slate-900 text-lg max-lg:text-base' : 'text-slate-600 text-base max-lg:text-sm group-hover:text-slate-900'}`}>{ind.name}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right side: Dynamic Showcase Window */}
                    <div className="w-full lg:w-[65%] max-lg:h-[490px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 relative flex flex-col z-10 overflow-hidden">
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
                                <div className={`w-full h-44 max-lg:h-28 bg-gradient-to-br ${activeIndustry.color} p-8 max-lg:p-5 flex items-end relative overflow-hidden shrink-0`}>
                                    {/* Decorative Background Patterns */}
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="absolute -right-20 -top-20 w-80 h-80 border-[32px] border-white/10 rounded-full" />
                                    <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }} className="absolute -left-10 -bottom-20 w-48 h-48 border-[16px] border-white/10 rounded-full" />

                                    <div className="relative z-10 flex items-center gap-5 max-lg:gap-3">
                                        <div className="w-16 h-16 max-lg:w-11 max-lg:h-11 max-lg:shrink-0 bg-white/20 backdrop-blur-md rounded-2xl max-lg:rounded-xl flex items-center justify-center border border-white/30 text-white shadow-lg">
                                            <activeIndustry.icon size={32} className="max-lg:hidden" />
                                            <activeIndustry.icon size={22} className="lg:hidden" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl max-lg:text-xl font-black text-white drop-shadow-md max-lg:leading-tight">{activeIndustry.name}</h3>
                                            <p className="text-white/90 font-medium text-lg max-lg:text-[13px] mt-1 max-lg:mt-0.5">Tailored Ecosystem Solutions</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 p-8 max-lg:px-4 max-lg:pt-4 max-lg:pb-2 flex max-lg:flex-col-reverse max-lg:justify-end gap-8 max-lg:gap-4 max-lg:overflow-y-auto">
                                    {/* Left: Recommended Products List */}
                                    <div className="w-1/2 max-lg:w-full flex flex-col justify-center gap-5 max-lg:gap-3 h-full max-lg:h-auto max-lg:shrink-0">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Recommended Suite</h4>
                                        <div className="flex flex-col max-lg:grid max-lg:grid-cols-2 gap-3 max-lg:gap-2">
                                            {activeIndustry.products.map((prod, i) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 + i * 0.05 }}
                                                    key={prod}
                                                    className="flex items-center gap-3 max-lg:gap-2 bg-slate-50 hover:bg-slate-100 transition-colors p-4 max-lg:p-2.5 rounded-xl border border-slate-100 shadow-sm max-lg:shrink-0"
                                                >
                                                    <div className={`w-6 h-6 max-lg:w-5 max-lg:h-5 rounded-full flex items-center justify-center shrink-0 ${activeIndustry.bg} ${activeIndustry.text}`}>
                                                        <CheckCircle2 size={14} strokeWidth={3} className="max-lg:hidden" />
                                                        <CheckCircle2 size={12} strokeWidth={3} className="lg:hidden" />
                                                    </div>
                                                    <span className="font-bold text-slate-700 max-lg:text-xs leading-tight">{prod}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Abstract UI Visualization */}
                                    <div className="w-1/2 max-lg:w-full bg-[#f8fafc] rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col shadow-inner h-full max-lg:h-[260px] max-lg:shrink-0">
                                        {/* Mock Browser/UI Header */}
                                        <div className="w-full h-12 max-lg:h-10 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-4 max-lg:px-3 justify-between shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] z-10 shrink-0 relative">
                                            {/* MacOS style window controls */}
                                            <div className="flex gap-2 max-lg:gap-1.5">
                                                <div className="w-3 h-3 max-lg:w-2.5 max-lg:h-2.5 rounded-full bg-[#FF5F56] hover:scale-110 shadow-sm transition-all cursor-pointer" />
                                                <div className="w-3 h-3 max-lg:w-2.5 max-lg:h-2.5 rounded-full bg-[#FFBD2E] hover:scale-110 shadow-sm transition-all cursor-pointer" />
                                                <div className="w-3 h-3 max-lg:w-2.5 max-lg:h-2.5 rounded-full bg-[#27C93F] hover:scale-110 shadow-sm transition-all cursor-pointer" />
                                            </div>

                                            {/* Mock URL Bar with Logo */}
                                            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 max-lg:gap-1.5 bg-slate-50/80 border border-slate-200/60 rounded-full px-5 py-1.5 max-lg:px-3 max-lg:py-1 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] group cursor-pointer hover:bg-white hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300">
                                                <img src="/logo.png" alt="ITSoftLab360 Logo" className="h-[14px] max-lg:h-[10px] w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                                            </div>

                                            {/* Right side indicator */}
                                            <div className={`w-7 h-7 max-lg:w-6 max-lg:h-6 rounded-full flex items-center justify-center transition-all duration-500 ${activeIndustry.bg.split(' ')[0]} ${activeIndustry.text.split(' ')[0]} shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] border border-white/50 hover:scale-110 cursor-pointer`}>
                                                <activeIndustry.icon size={13} strokeWidth={2.5} className="max-lg:hidden" />
                                                <activeIndustry.icon size={11} strokeWidth={2.5} className="lg:hidden" />
                                            </div>
                                        </div>

                                        {/* Central Animation Area */}
                                        <div className={`flex-1 relative ${['retail', 'manufacturing', 'healthcare', 'logistics', 'corporate', 'service'].includes(activeIndustry.id) ? 'p-0' : 'p-6 max-lg:p-4'}`}>
                                            {activeIndustry.id === 'retail' && <RetailVisual />}
                                            {activeIndustry.id === 'manufacturing' && <ManufacturingVisual />}
                                            {activeIndustry.id === 'healthcare' && <HealthcareVisual />}
                                            {activeIndustry.id === 'education' && <EducationVisual />}
                                            {activeIndustry.id === 'logistics' && <LogisticsVisual />}

                                            {activeIndustry.id === 'corporate' && <CorporateVisual />}
                                            {activeIndustry.id === 'service' && <ServiceVisual />}
                                        </div>

                                        {/* Mock UI Footer Progress */}
                                        <div className="w-full h-1.5 max-lg:h-1 bg-slate-200 shrink-0">
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
