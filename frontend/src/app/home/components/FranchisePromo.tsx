"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function FranchisePromo() {
  const points = [
    "Complete 12-Solution Portfolio",
    "Centralized Franchise Support",
    "Training and Sales Enablement",
    "Recurring Business Opportunity"
  ];

  return (
    <section id="franchise" className="py-24 bg-[#0A102A] relative overflow-hidden">

      {/* Background Abstract Waves */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 1440 800" className="w-full h-full object-cover">
          <motion.path
            initial={{ d: "M0,400 C300,500 600,300 900,400 C1200,500 1440,300 1440,300 L1440,800 L0,800 Z" }}
            animate={{ d: "M0,350 C300,250 600,450 900,350 C1200,250 1440,450 1440,450 L1440,800 L0,800 Z" }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            fill="url(#wave-gradient)"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#111A4A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EB3158" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        {/* Left Content */}
        <div className="w-full lg:w-1/2">
          <span className="text-xs font-bold tracking-widest text-[#4AA8D8] uppercase mb-4 block">
            IT Franchise Opportunity
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Build your technology business with the ITSoftLab360 franchise ecosystem.
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8">
            Offer 12 professional IT solutions through one scalable platform, supported by product training, sales resources, implementation guidance, and ongoing technology updates.
          </p>

          <ul className="flex flex-col gap-4 mb-10">
            {points.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-3 text-white/90 font-medium"
              >
                <CheckCircle2 className="text-[#20B486]" size={20} />
                {point}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#"
              className="flex items-center justify-center gap-2 bg-[#EB3158] hover:bg-[#d6274d] text-white px-8 py-3.5 rounded-full font-bold shadow-[0_8px_25px_rgba(235,49,88,0.3)] transition-all hover:-translate-y-1"
            >
              Become a Partner <ArrowRight size={18} />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white/50 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:-translate-y-1 hover:bg-white/5 dark:bg-[#060D1E]/5"
            >
              <Download size={18} /> Download Overview
            </Link>
          </div>
        </div>

        {/* Right Visual (Abstract Network) */}
        <div className="w-full lg:w-1/2 h-[500px] relative flex justify-center items-center">

          <div className="relative w-full h-full flex justify-center items-center">

            {/* Glowing paths (Lines) */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-[80%] h-[80%] rounded-full border border-white/10" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute w-[60%] h-[60%] rounded-full border border-white/5 border-dashed" />

            {/* Central Platform */}
            <div className="relative z-20 w-32 h-32 bg-[#111A4A] rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(235,49,88,0.2)] border border-white/10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#EB3158] to-[#F5C842] flex items-center justify-center">
                <span className="text-white font-black text-xl">360°</span>
              </div>
            </div>

            {/* Partner Nodes */}
            {[
              { top: "10%", left: "50%", delay: 0 },
              { top: "50%", left: "90%", delay: 0.5 },
              { top: "90%", left: "50%", delay: 1 },
              { top: "50%", left: "10%", delay: 1.5 },
              { top: "25%", left: "20%", delay: 0.2 },
              { top: "25%", left: "80%", delay: 0.7 },
              { top: "75%", left: "20%", delay: 1.2 },
              { top: "75%", left: "80%", delay: 1.7 },
            ].map((node, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
                className="absolute z-10 w-4 h-4 bg-[#4AA8D8] rounded-full shadow-[0_0_15px_rgba(74,168,216,0.8)]"
                style={{ top: node.top, left: node.left, transform: "translate(-50%, -50%)" }}
              />
            ))}

            {/* Connecting pulses */}
            <motion.div
              animate={{ scale: [0, 2], opacity: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute z-0 w-32 h-32 rounded-full border-2 border-[#EB3158]/50"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
