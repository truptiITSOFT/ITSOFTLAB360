"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Users, Receipt, TrendingUp, FolderLock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const titleLines = ["Bring your", "entire business", "ecosystem", "together."];

  return (
    <section className="relative min-h-[850px] w-full pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#EEF0FF]/60 dark:from-[#060D1E] to-[#FBFAF5] dark:to-[#030816]">
      


      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-full flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* Left Content (approx 43%) */}
        <div className="w-full lg:w-[45%] flex flex-col relative z-10">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-[#060D1E]/60 backdrop-blur-md border border-[#111A4A] dark:border-white/10 dark:border-white/10 rounded-full w-fit mb-8 shadow-sm dark:shadow-none"
          >
            <div className="w-2 h-2 rounded-full bg-[#EB3158]" />
            <span className="text-xs font-bold tracking-widest text-[#111A4A] dark:text-white uppercase">
              12 Connected IT Solutions · One Powerful Ecosystem
            </span>
          </motion.div>

          {/* Masked Reveal Headline */}
          <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold text-[#111A4A] dark:text-white leading-[1.05] tracking-tight mb-6">
            {titleLines.map((line, index) => (
              <div key={index} className="overflow-hidden pb-2">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-[#15172B] dark:text-gray-100/70 leading-relaxed mb-10 max-w-lg"
          >
            Manage your people, customers, finance, dealers, vendors, sales, learning, documents, retail, supply chain, quality processes, and marketing through one connected technology ecosystem.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <Link 
              href="#solutions"
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#EB3158] hover:bg-[#d6274d] text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_25px_rgba(235,49,88,0.3)] hover:shadow-[0_12px_30px_rgba(235,49,88,0.4)] transition-all hover:-translate-y-1"
            >
              Explore All Solutions <ArrowRight size={18} />
            </Link>
            
            <Link 
              href="/demo"
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-transparent border-2 border-[#111A4A]/20 dark:border-white/20 hover:border-[#111A4A] dark:hover:border-white text-[#111A4A] dark:text-white px-8 py-3.5 rounded-full font-bold transition-all hover:-translate-y-1 hover:bg-[#111A4A]/5 dark:hover:bg-white/5"
            >
              <Play size={18} className="fill-[#111A4A] text-[#111A4A] dark:text-white" /> Book a Live Demo
            </Link>
          </motion.div>

          {/* Feature Tags */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            {[
              { text: "12 Integrated Solutions", color: "bg-[#20B486]" },
              { text: "Franchise-Ready Platform", color: "bg-[#8267E8]" },
              { text: "Centralized Business Data", color: "bg-[#4AA8D8]" },
              { text: "Built for Every Industry", color: "bg-[#F3A62F]" },
            ].map((tag, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${tag.color}`} />
                <span className="text-sm font-semibold text-[#15172B] dark:text-gray-100/60">{tag.text}</span>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Right Visual (approx 55%) - Custom Device Mockup */}
        <div className="w-full lg:w-[55%] relative h-[500px] sm:h-[600px] lg:h-[760px] perspective-1000 z-10 flex justify-center items-center">
          
          <motion.div 
            className="relative w-full h-full flex justify-center items-center"
            style={{ 
              x: mousePosition.x * -1, 
              y: mousePosition.y * -1 
            }}
          >
            {/* Soft Green Backing Panel */}
            <div className="absolute top-[10%] left-[10%] right-[5%] bottom-[10%] bg-[#E5F7ED] rounded-[40px] transform rotate-3 -z-10 opacity-70" />

            {/* Main Desktop Monitor */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-[90%] max-w-[700px] aspect-[16/10] bg-white dark:bg-[#0A1125] rounded-xl shadow-[0_30px_60px_rgba(17,26,74,0.12)] border border-[#111A4A] dark:border-white/5 flex flex-col overflow-hidden z-20"
            >
              {/* Browser bar */}
              <div className="h-8 bg-gray-50 dark:bg-[#030816] border-b border-gray-100 dark:border-white/5 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div className="ml-4 h-4 w-1/2 bg-gray-200/50 rounded-full" />
              </div>
              
              {/* Interface Mockup */}
              <div className="flex-1 flex bg-[#FAFAFA]">
                {/* Sidebar */}
                <div className="w-[60px] md:w-[180px] bg-white dark:bg-[#0A1125] border-r border-gray-100 dark:border-white/5 p-4 flex flex-col gap-4">
                  <div className="h-6 w-full bg-blue-100 rounded mb-4" />
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-3 w-3/4 bg-gray-100 rounded" />
                  ))}
                </div>
                {/* Main Content Area */}
                <div className="flex-1 p-6 flex flex-col gap-6">
                  {/* Top Widgets */}
                  <div className="flex gap-4">
                    <div className="flex-1 h-24 bg-white dark:bg-[#0A1125] rounded-lg shadow-sm dark:shadow-none border border-gray-100 dark:border-white/5 p-4 flex flex-col justify-between">
                      <div className="h-2 w-1/2 bg-gray-100 rounded" />
                      <div className="h-6 w-3/4 bg-blue-500/20 rounded" />
                    </div>
                    <div className="flex-1 h-24 bg-white dark:bg-[#0A1125] rounded-lg shadow-sm dark:shadow-none border border-gray-100 dark:border-white/5 p-4 flex flex-col justify-between hidden md:flex">
                      <div className="h-2 w-1/2 bg-gray-100 rounded" />
                      <div className="h-6 w-2/3 bg-green-500/20 rounded" />
                    </div>
                    <div className="flex-1 h-24 bg-white dark:bg-[#0A1125] rounded-lg shadow-sm dark:shadow-none border border-gray-100 dark:border-white/5 p-4 flex flex-col justify-between hidden sm:flex">
                      <div className="h-2 w-1/2 bg-gray-100 rounded" />
                      <div className="h-6 w-1/3 bg-purple-500/20 rounded" />
                    </div>
                  </div>
                  {/* Big Chart Area */}
                  <div className="flex-1 bg-white dark:bg-[#0A1125] rounded-lg shadow-sm dark:shadow-none border border-gray-100 dark:border-white/5 p-6 flex flex-col justify-end relative overflow-hidden">
                    <div className="absolute top-4 left-4 h-3 w-1/4 bg-gray-100 rounded" />
                    {/* Simulated bar chart */}
                    <div className="flex items-end justify-between gap-2 h-[120px] w-full mt-8">
                      {[40, 70, 45, 90, 65, 85, 100, 50, 75].map((height, i) => (
                        <div key={i} className="w-full bg-[#111A4A]/5 rounded-t-sm relative group">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                            className="absolute bottom-0 w-full bg-[#4AA8D8] rounded-t-sm" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Overlapping Tablet/Dashboard */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{ 
                x: mousePosition.x * 1.5, 
                y: mousePosition.y * 1.5 
              }}
              className="absolute -bottom-10 -right-4 md:-right-10 w-[60%] aspect-[4/3] bg-white dark:bg-[#0A1125] rounded-2xl shadow-[0_40px_80px_rgba(17,26,74,0.15)] border border-[#111A4A] dark:border-white/10 dark:border-white/10 overflow-hidden z-30 flex flex-col p-4"
            >
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-4" />
              {/* Simulated team activity list */}
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100" />
                    <div className="flex-1">
                      <div className="h-2 w-full bg-gray-100 rounded mb-1" />
                      <div className="h-2 w-1/2 bg-gray-50 dark:bg-[#030816] rounded" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto h-24 w-full bg-[#FFE9DF] rounded-xl flex items-center justify-center border border-[#EB3158]/20">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-[#0A1125] flex items-center justify-center shadow-sm dark:shadow-none">
                  <CheckCircle2 className="text-[#EB3158]" />
                </div>
              </div>
            </motion.div>

            {/* Floating Mobile Device */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ 
                x: mousePosition.x * 2, 
                y: mousePosition.y * -2 
              }}
              className="absolute top-10 -left-6 md:-left-12 w-[120px] md:w-[160px] aspect-[9/19] bg-white dark:bg-[#0A1125] rounded-[24px] shadow-[0_30px_60px_rgba(17,26,74,0.2)] border-[4px] border-[#15172B] overflow-hidden z-40 flex flex-col"
            >
              <div className="bg-[#111A4A] h-20 p-4 text-white flex flex-col justify-end relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-black rounded-b-xl" />
                <div className="h-2 w-1/2 bg-white/20 dark:bg-[#060D1E]/20 rounded mb-1" />
                <div className="h-4 w-3/4 bg-white/40 dark:bg-[#060D1E]/40 rounded" />
              </div>
              <div className="flex-1 bg-gray-50 dark:bg-[#030816] p-3 flex flex-col gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-10 w-full bg-white dark:bg-[#0A1125] rounded shadow-sm dark:shadow-none border border-gray-100 dark:border-white/5" />
                ))}
              </div>
            </motion.div>

            {/* Small Floating Solution Icons */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-5 right-[10%] z-50 w-12 h-12 bg-white dark:bg-[#0A1125] rounded-xl shadow-xl dark:shadow-none flex items-center justify-center border border-gray-100 dark:border-white/5">
              <Users className="text-[#8267E8]" />
            </motion.div>
            
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] -left-16 z-50 w-14 h-14 bg-white dark:bg-[#0A1125] rounded-full shadow-xl dark:shadow-none flex items-center justify-center border border-gray-100 dark:border-white/5">
              <Receipt className="text-[#F3A62F]" />
            </motion.div>

            <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[30%] -right-12 z-0 w-10 h-10 bg-[#EEF0FF] rounded-lg shadow-lg dark:shadow-none flex items-center justify-center border border-blue-100">
              <TrendingUp className="text-[#4AA8D8] w-5 h-5" />
            </motion.div>
            
            <motion.div animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -bottom-16 left-[20%] z-50 w-12 h-12 bg-[#FFE9DF] rounded-xl shadow-lg dark:shadow-none flex items-center justify-center border border-red-100">
              <FolderLock className="text-[#EB3158] w-5 h-5" />
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
