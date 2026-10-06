"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function FranchiseCTA() {
  return (
    <section className="relative py-32 bg-[#030816] text-white overflow-hidden transition-colors duration-300">
      
      {/* Premium Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Moving Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        
        {/* Glowing Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[96px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[480px] h-[480px] bg-[#EB3158]/20 rounded-full blur-[120px]"
        />
        
        {/* Subtle Particles */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-[#EB3158] p-[1.6px] mb-8 shadow-[0_0_50px_rgba(59,130,246,0.4)]"
        >
          <div className="w-full h-full rounded-full bg-[#030816] flex items-center justify-center">
             <div className="w-10 h-10 md:w-12 md:h-12 border-t-2 border-r-2 border-white rounded-tr-xl"></div>
             <div className="w-10 h-10 md:w-12 md:h-12 border-b-2 border-l-2 border-[#EB3158] rounded-bl-xl absolute"></div>
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
        >
          Build Your Technology Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#EB3158]">ITSoftLab360</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-blue-100/70 max-w-3xl mb-12"
        >
          One partnership gives you access to an integrated portfolio of enterprise products designed for multiple industries.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Link href="/contact" className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 font-bold text-[#030816] bg-white rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] w-full sm:w-auto">
            <span className="relative z-10 flex items-center gap-2 text-base md:text-lg">
              Become a Franchise Partner <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-blue-100 to-transparent transition-transform duration-500 ease-in-out skew-x-12"></div>
          </Link>
          
          <Link href="/demo" className="inline-flex items-center justify-center gap-2 px-10 py-5 font-bold text-white bg-transparent border-2 border-white/20 rounded-full transition-all hover:border-white hover:bg-white/5 w-full sm:w-auto text-base md:text-lg">
            <PhoneCall size={20} /> Talk to Our Team
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
