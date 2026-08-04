"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { solutionsData } from "../data";

function CountUp({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const stepTime = Math.abs(Math.floor((duration * 1000) / end));
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function EcosystemShowcase() {
  return (
    <section className="py-24 bg-white dark:bg-[#0A1125] relative overflow-hidden">
      
      {/* Background Soft Pastel Shapes */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#EEF0FF]/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#FFE9DF]/30 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        
        {/* Header Content */}
        <div className="max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-[#EB3158] uppercase mb-4 block">
            The ITSoftLab360 Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111A4A] dark:text-white tracking-tight mb-6 leading-tight">
            One platform. Twelve solutions. Fully connected data.
          </h2>
          <p className="text-lg text-[#15172B] dark:text-gray-100/70 leading-relaxed">
            Every solution communicates through a unified platform, helping teams eliminate repeated work, disconnected tools, and scattered business information.
          </p>
        </div>

        {/* Visual Showcase - Desktop (Circular) */}
        <div className="hidden md:flex relative w-full h-[600px] justify-center items-center mb-24">
          
          {/* Core Platform Node */}
          <div className="relative z-20 flex items-center justify-center">
            {/* Ambient Glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-64 h-64 bg-[#EB3158]/20 dark:bg-[#EB3158]/30 rounded-full blur-[50px] -z-10 pointer-events-none"
            />
            
            {/* Spinning Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-56 h-56 rounded-full border border-dashed border-[#111A4A]/20 dark:border-white/20 pointer-events-none"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 rounded-full border border-[#111A4A]/10 dark:border-white/10 pointer-events-none"
            />

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative w-48 h-48 bg-white/80 dark:bg-[#0A1125]/80 backdrop-blur-xl rounded-full shadow-[0_0_40px_rgba(17,26,74,0.1)] border border-white/50 dark:border-white/10 flex flex-col items-center justify-center cursor-pointer p-4"
            >
              <div className="relative group w-full h-full bg-gradient-to-br from-[#111A4A] to-[#1e2a6b] dark:from-[#111A4A] dark:to-[#0A1125] rounded-full flex items-center justify-center shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EB3158]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-white font-black text-xl md:text-2xl tracking-tighter drop-shadow-md text-center">
                  ITSoftlab360
                </span>
              </div>
            </motion.div>
          </div>

          {/* Surrounding Nodes */}
          {solutionsData.map((solution, i) => {
            const angle = (i * 360) / 12;
            const radius = 240; // distance from center
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, x, y }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, type: "spring", stiffness: 50 }}
                className="absolute z-10"
              >
                {/* Connecting Line from Center (Approximate using CSS rotated lines based on position) */}
                <div 
                  className="absolute top-1/2 left-1/2 -z-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#111A4A]/20 to-transparent dark:via-white/20 origin-left"
                  style={{
                    width: `${radius}px`,
                    transform: `translateY(-50%) rotate(${angle + 180}deg)`,
                  }}
                >
                  {/* Data Particle */}
                  <motion.div
                    animate={{ x: [0, radius], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="w-2 h-2 rounded-full bg-[#EB3158] absolute top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(235,49,88,0.8)]"
                  />
                </div>

                {/* Node Label */}
                <div className="group relative flex items-center justify-center w-14 h-14 bg-white dark:bg-[#0A1125] rounded-2xl shadow-md dark:shadow-none border border-[#111A4A] dark:border-white/5 hover:scale-110 transition-transform cursor-pointer">
                  <solution.icon size={20} className="text-[#111A4A] dark:text-white" />
                  
                  {/* Tooltip */}
                  <div className="absolute top-full mt-2 w-max px-3 py-1.5 bg-[#111A4A] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {solution.name}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Visual Showcase - Mobile (Vertical) */}
        <div className="md:hidden flex flex-col items-center gap-6 mb-20 relative">
          <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#111A4A]/5 to-[#111A4A]/20 -z-10" />
          
          <div className="relative z-10 mb-8 flex items-center justify-center">
             <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-40 h-40 bg-[#EB3158]/20 rounded-full blur-[30px] -z-10 pointer-events-none"
            />
            <div className="w-36 h-36 bg-white/90 dark:bg-[#0A1125]/90 backdrop-blur-md rounded-full shadow-2xl border border-white/50 dark:border-white/10 flex flex-col items-center justify-center p-3">
              <div className="w-full h-full bg-gradient-to-br from-[#111A4A] to-[#1e2a6b] rounded-full flex items-center justify-center shadow-lg border border-white/10">
                <span className="text-white font-black text-lg tracking-tighter text-center leading-none">ITSoftlab360</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            {solutionsData.map((solution, i) => (
              <div key={solution.id} className="bg-white dark:bg-[#0A1125] rounded-xl shadow-sm dark:shadow-none border border-[#111A4A] dark:border-white/5 p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EEF0FF] flex items-center justify-center shrink-0">
                  <solution.icon size={16} className="text-[#111A4A] dark:text-white" />
                </div>
                <span className="text-xs font-bold text-[#111A4A] dark:text-white text-left leading-tight">{solution.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-[#111A4A] dark:border-white/10 dark:border-white/10 pt-16">
          {[
            { value: 12, label: "Connected Solutions" },
            { value: 1, label: "Unified Platform" },
            { value: 360, suffix: "°", label: "Business Visibility" },
            { value: 100, suffix: "%", label: "Multi-Industry Ready" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-extrabold text-[#111A4A] dark:text-white mb-2 font-mono">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm font-semibold text-[#15172B] dark:text-gray-100/60 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
