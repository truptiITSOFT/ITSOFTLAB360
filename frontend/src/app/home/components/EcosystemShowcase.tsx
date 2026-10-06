"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { solutionsData } from "../data";
import Image from "next/image";

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
    <section className="py-24 bg-white  transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Soft Pastel Shapes */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[640px] h-[640px] bg-[#EEF0FF]/40 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] bg-[#FFE9DF]/30 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-[1120px] mx-auto px-6 md:px-10 text-center">
        
        {/* Header Content */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-20 px-2 sm:px-0">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-bold tracking-widest text-[#EB3158] uppercase mb-3 sm:mb-4 block"
          >
            The ITSoftLab360 Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight bg-gradient-to-r from-[#111A4A] via-[#1e2a6b] to-[#EB3158] bg-clip-text text-transparent"
          >
            One platform. Twelve solutions. Fully connected data.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#15172B] leading-relaxed"
          >
            Every solution communicates through a unified platform, helping teams eliminate repeated work, disconnected tools, and scattered business information.
          </motion.p>
        </div>

        {/* Visual Showcase - Circular (Responsive) */}
        <div className="flex relative w-full h-[320px] md:h-[480px] justify-center items-center mb-12 md:mb-24 scale-[0.65] sm:scale-[0.85] md:scale-100 origin-center">
          
          {/* Core Platform Node */}
          <div className="relative z-20 flex items-center justify-center">
            {/* Ambient Glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-64 h-64 bg-[#EB3158]/20  rounded-full blur-[40px] -z-10 pointer-events-none"
            />
            
            {/* Spinning Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-56 h-56 rounded-full border border-dashed border-[#111A4A]/20  pointer-events-none"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 rounded-full border border-[#111A4A]/10  pointer-events-none"
            />

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative w-48 h-48 bg-white/80  backdrop-blur-xl rounded-full shadow-[0_0_40px_rgba(17,26,74,0.1)] border border-slate-200  flex flex-col items-center justify-center cursor-pointer p-4 group"
            >
              <div className="relative w-full h-full bg-white  group-hover:bg-slate-50  transition-all duration-700 rounded-full flex items-center justify-center shadow-inner border border-slate-100  overflow-hidden">
                <div className="relative w-[80%] h-[80%] transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                  <Image src="/logo.png" alt="ITSoftlab360 Logo" fill className="object-contain" />
                </div>
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
                  className="absolute top-1/2 left-1/2 -z-20 h-[1.2px] bg-gradient-to-r from-transparent via-[#111A4A]/20 to-transparent  origin-left"
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

                {/* High-Quality Node Label */}
                <div className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white to-gray-50   rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.1)]  border border-slate-200  hover:border-blue-400  hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <solution.icon size={24} className="text-blue-600  drop-shadow-sm group-hover:text-pink-500 transition-colors duration-300 relative z-10" />
                  
                  {/* Tooltip */}
                  <div className="absolute top-[120%] mt-2 w-max px-4 py-2 bg-[#111A4A]/90 backdrop-blur-sm border border-white/10 text-white text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl scale-95 group-hover:scale-100 z-50">
                    {solution.name}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-[#111A4A]   pt-16">
          {[
            { value: 12, label: "Connected Solutions" },
            { value: 1, label: "Unified Platform" },
            { value: 360, suffix: "°", label: "Business Visibility" },
            { value: 100, suffix: "%", label: "Multi-Industry Ready" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-extrabold text-[#111A4A]  mb-2 font-mono">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm font-semibold text-[#15172B]  uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
