"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const CITIES = [
  { name: "Delhi", top: "25%", left: "45%" },
  { name: "Mumbai", top: "60%", left: "30%" },
  { name: "Bengaluru", top: "80%", left: "42%" },
  { name: "Hyderabad", top: "65%", left: "48%" },
  { name: "Pune", top: "62%", left: "33%" },
  { name: "Ahmedabad", top: "50%", left: "25%" },
  { name: "Jaipur", top: "35%", left: "35%" },
  { name: "Kolkata", top: "55%", left: "75%" },
  { name: "Chennai", top: "78%", left: "52%" },
  { name: "Indore", top: "52%", left: "40%" },
];

export default function IndiaNetwork() {
  return (
    <section className="relative py-24 bg-[#111A4A] overflow-hidden text-white">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-[#030816] pointer-events-none"></div>
      </div>

      <div className="max-w-[960px] mx-auto px-6 md:px-10 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Expand Across <span className="text-[#EB3158]">India</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-blue-100/70 mb-10 max-w-md"
          >
            Build your regional technology network. Join our rapidly growing franchise ecosystem and capture the IT market in your city before someone else does.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                <span className="text-blue-400 font-bold text-xl">10+</span>
              </div>
              <p className="text-sm text-blue-100 font-medium">Major Cities Covered</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EB3158]/20 flex items-center justify-center border border-[#EB3158]/50">
                <span className="text-[#EB3158] font-bold text-xl">50+</span>
              </div>
              <p className="text-sm text-blue-100 font-medium">Active Regional Partners</p>
            </div>
          </motion.div>
        </div>

        {/* Right Map Visual */}
        <div className="relative w-full aspect-square max-w-[400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full"
          >
            {/* Highly abstract India Map representation using SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]" preserveAspectRatio="xMidYMid meet">
              <path 
                d="M 40 5 L 45 10 L 55 10 L 60 5 L 65 15 L 75 25 L 85 45 L 95 55 L 85 65 L 75 60 L 65 75 L 55 95 L 45 90 L 35 75 L 25 60 L 15 65 L 5 55 L 15 45 L 25 25 L 35 15 Z" 
                fill="none" 
                stroke="rgba(59,130,246,0.2)" 
                strokeWidth="0.5" 
                strokeDasharray="2 2"
              />
              <path 
                d="M 40 5 L 45 10 L 55 10 L 60 5 L 65 15 L 75 25 L 85 45 L 95 55 L 85 65 L 75 60 L 65 75 L 55 95 L 45 90 L 35 75 L 25 60 L 15 65 L 5 55 L 15 45 L 25 25 L 35 15 Z" 
                fill="rgba(59,130,246,0.05)" 
              />
            </svg>

            {/* Glowing Connection Lines */}
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
               {CITIES.map((city, i) => {
                 if (i === 0) return null;
                 const prev = CITIES[i-1];
                 return (
                   <motion.line 
                     key={`line-${i}`}
                     x1={prev.left} 
                     y1={prev.top} 
                     x2={city.left} 
                     y2={city.top}
                     stroke="rgba(235,49,88,0.4)" 
                     strokeWidth="1"
                     initial={{ pathLength: 0, opacity: 0 }}
                     whileInView={{ pathLength: 1, opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, delay: i * 0.1 + 0.5 }}
                   />
                 )
               })}
               {/* Connect last to first to complete a loop */}
               <motion.line 
                 x1={CITIES[CITIES.length-1].left} 
                 y1={CITIES[CITIES.length-1].top} 
                 x2={CITIES[0].left} 
                 y2={CITIES[0].top}
                 stroke="rgba(59,130,246,0.4)" 
                 strokeWidth="1"
                 initial={{ pathLength: 0, opacity: 0 }}
                 whileInView={{ pathLength: 1, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.5, delay: CITIES.length * 0.1 + 0.5 }}
               />
            </svg>

            {/* City Nodes */}
            {CITIES.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: i * 0.1 }}
                className="absolute flex flex-col items-center justify-center group z-10"
                style={{ top: city.top, left: city.left, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative flex h-4 w-4 md:h-5 md:w-5 items-center justify-center">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${i % 3 === 0 ? 'bg-[#EB3158]' : 'bg-blue-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 ${i % 3 === 0 ? 'bg-[#EB3158]' : 'bg-blue-500'}`}></span>
                </div>
                <div className="absolute top-full mt-1 bg-[#030816]/80 backdrop-blur-md px-2 py-1 rounded border border-blue-500/30 text-[8px] md:text-xs font-semibold text-blue-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {city.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
