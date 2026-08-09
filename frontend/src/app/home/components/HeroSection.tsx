"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Users, Receipt, TrendingUp, FolderLock, Briefcase, ShoppingCart, Truck, GraduationCap, UserCheck, Settings, Megaphone, BarChart, Calculator, Folder, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/components/Products";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    <section className="relative min-h-[850px] w-full pt-28 pb-20 overflow-hidden bg-gradient-to-b from-[#EEF0FF]/60 dark:from-[#060D1E] to-[#FBFAF5] dark:to-[#030816]">
      
      {/* Edge-to-Edge Static Top-Left Banner */}
      <div className="w-full bg-transparent overflow-hidden relative z-30 mb-8 pt-4">
        
        {/* Animated Shine Effect */}
        <motion.div 
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 dark:via-white/5 to-transparent skew-x-12 z-0"
        />

        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-start gap-4 z-10 relative">
          <div className="flex items-center justify-center shrink-0 w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />
          </div>
          <span className="text-[14px] md:text-[15px] font-medium tracking-wide text-slate-700 dark:text-slate-300">
            The World's First IT Company Bringing 12 Powerful Solutions Together on One Integrated Platform.
          </span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-full flex flex-col z-20 relative">
        
        {/* Two-Column Content Layout */}
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Content (approx 43%) */}
          <div className="w-full lg:w-[45%] flex flex-col relative z-10">

          {/* Masked Reveal Headline - Hydration Error Fixed by using Span instead of Div inside H1 */}
          <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold text-[#111A4A] dark:text-white leading-[1.05] tracking-tight mb-6">
            {titleLines.map((line, index) => (
              <span key={index} className="overflow-hidden pb-2 block">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  {line}
                </motion.span>
              </span>
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

        {/* Right Visual - Static Graphic */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[55%] relative h-[450px] sm:h-[550px] flex justify-center items-center"
        >
          <div className="relative w-full h-full max-w-[800px]">
            <Image 
              src="/12-it-solutions.png" 
              alt="12 IT Solutions Ecosystem" 
              fill 
              className="object-contain drop-shadow-2xl dark:brightness-90 dark:contrast-125 transition-all duration-300" 
              priority
            />
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
