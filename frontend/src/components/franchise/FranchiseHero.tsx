"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle, Users, Box, BarChart, Settings, Database, Server, Smartphone, Laptop, Cloud, Shield, Zap, Target } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const PRODUCTS = [
  { name: "HRMS", icon: Users, angle: 0 },
  { name: "CRM", icon: Target, angle: 30 },
  { name: "ERP", icon: Database, angle: 60 },
  { name: "Dealer Mgt", icon: Box, angle: 90 },
  { name: "Vendor Mgt", icon: Server, angle: 120 },
  { name: "Marketing", icon: BarChart, angle: 150 },
  { name: "Logistics", icon: Zap, angle: 180 },
  { name: "Sales Force", icon: Smartphone, angle: 210 },
  { name: "LMS", icon: Laptop, angle: 240 },
  { name: "POS", icon: Settings, angle: 270 },
  { name: "Queue Mgt", icon: Shield, angle: 300 },
  { name: "Docs Mgt", icon: Cloud, angle: 330 },
];

export default function FranchiseHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-white  transition-colors duration-300"
    >
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_19.2px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20  rounded-full blur-[96px] mix-blend-multiply  animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-[320px] h-[320px] bg-[#EB3158]/20  rounded-full blur-[80px] mix-blend-multiply  animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-[1120px] mx-auto px-6 md:px-10 w-full z-10 grid lg:grid-cols-2 gap-16 items-center flex-grow">
        
        {/* Left Content */}
        <motion.div 
          style={{ y, opacity }}
          className="flex flex-col gap-6 max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50  border border-blue-100  text-blue-600  text-sm font-medium w-fit shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Premium Franchise Opportunity
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#111A4A]  leading-[1.1]"
          >
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#EB3158]  ">IT Business</span> with 12 Integrated Products.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-[#15172B]/70  leading-relaxed max-w-lg"
          >
            One Platform. 12 Products. One Scalable Franchise Opportunity. Empower your region with world-class SaaS solutions.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <Link href="#apply" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-[#111A4A]   rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(17,26,74,0.5)] ">
              <span className="relative z-10 flex items-center gap-2">
                Become a Partner <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent  transition-transform duration-500 ease-in-out skew-x-12"></div>
            </Link>
            <Link href="#explore" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[#111A4A]  bg-transparent border-2 border-[#111A4A]/20  rounded-full transition-all hover:border-[#111A4A]  hover:bg-[#111A4A]/5 ">
              <PlayCircle size={18} /> Explore Model
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Animated Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full aspect-square max-w-[480px] mx-auto hidden lg:flex items-center justify-center"
        >
          {/* Orbital Rings */}
          <div className="absolute inset-0 rounded-full border border-[#111A4A]/10  [mask-image:radial-gradient(transparent_40%,black_100%)]"></div>
          <div className="absolute inset-[15%] rounded-full border border-dashed border-[#111A4A]/20  animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute inset-[30%] rounded-full border border-[#EB3158]/20  animate-[spin_40s_linear_infinite_reverse]"></div>

          {/* Center Platform Node */}
          <div className="relative z-20 w-40 h-40 rounded-full bg-white  shadow-2xl  border border-gray-100  flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-[#EB3158]/10 animate-pulse"></div>
             <Image 
                src="/logo.png" 
                alt="ITSoftLab360" 
                width={120} 
                height={40} 
                className="object-contain  relative z-10"
             />
          </div>

          {/* Orbiting Product Nodes */}
          {PRODUCTS.map((product, i) => {
            const radius = 240; // distance from center
            const rad = (product.angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, x, y }}
                transition={{ duration: 1, delay: 0.5 + (i * 0.05), ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group"
              >
                {/* Connection Line */}
                <svg className="absolute left-1/2 top-1/2 w-0 h-0 overflow-visible pointer-events-none z-0">
                  <motion.line 
                    x1="0" y1="0" x2={-x} y2={-y}
                    stroke="currentColor" 
                    className="text-[#111A4A]/10  group-hover:text-blue-500/50 transition-colors duration-300" 
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>

                <div className="relative flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-110 z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/80  backdrop-blur-sm border border-gray-200  flex items-center justify-center shadow-lg group-hover:border-blue-500  group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                    <product.icon size={20} className="text-[#15172B]  group-hover:text-blue-600  transition-colors" />
                  </div>
                  <span className="absolute top-[110%] w-max text-xs font-semibold text-[#15172B]  opacity-0 group-hover:opacity-100 transition-opacity bg-white  px-2 py-1 rounded shadow-sm">
                    {product.name}
                  </span>
                </div>
              </motion.div>
            );
          })}

        </motion.div>

      </div>
    </section>
  );
}
