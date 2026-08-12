"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedLogo from "../AnimatedLogo";

export default function SolutionsCTA() {
  return (
    <section className="py-20 relative z-10">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-gradient-to-r from-gray-50 via-blue-50/80 to-gray-50 dark:from-[#020617] dark:via-blue-900/20 dark:to-[#020617] rounded-3xl border border-blue-200/60 dark:border-blue-500/20 py-16 overflow-hidden transition-colors shadow-lg hover:shadow-xl duration-500 group"
        >
          {/* Decorative Glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-blue-500/30 blur-[80px] rounded-full pointer-events-none"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 px-6 md:px-10 lg:px-12">
            
            {/* Left Side: Text and Buttons */}
            <div className="max-w-2xl text-center md:text-left">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] mb-6 text-[#111A4A] dark:text-white transition-colors"
              >
                Ready To Build A <span className="text-[#EB3158] dark:text-blue-500 drop-shadow-[0_0_15px_rgba(235,49,88,0.4)]">Smarter</span> <br />
                <span className="text-[#EB3158] dark:text-blue-500 drop-shadow-[0_0_15px_rgba(235,49,88,0.4)]">Business?</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="text-[#15172B]/80 dark:text-gray-300 text-lg mb-8 transition-colors max-w-xl"
              >
                Discover how IT SOFTLAB 360 can transform your business operations.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-4"
              >
                <Link href="/demo" className="flex items-center gap-2 bg-[#EB3158] hover:bg-[#d6274d] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(235,49,88,0.4)] hover:shadow-[0_8px_25px_rgba(235,49,88,0.5)] hover:-translate-y-1">
                  REQUEST DEMO <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="flex items-center gap-2 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-600 hover:border-[#111A4A] hover:bg-gray-50 text-[#111A4A] dark:text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                  TALK TO EXPERT <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>

            {/* Right Side: Logo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden md:flex flex-col items-center justify-center relative shrink-0"
            >
               {/* Soft Glow Behind Logo */}
               <motion.div 
                 animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[60px] rounded-full mix-blend-multiply"
               />
               
               <motion.div
                 animate={{ y: [0, -12, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="z-10 relative"
               >
                 <AnimatedLogo className="w-36 h-36 mb-6 drop-shadow-[0_15px_25px_rgba(59,130,246,0.35)]" />
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.8 }}
                 className="text-center z-10 relative"
               >
                 <h3 className="text-xl font-extrabold text-[#111A4A] dark:text-white tracking-widest transition-colors">
                   IT SOFTLAB <span className="text-[#EB3158] dark:text-blue-500">360</span>
                 </h3>
                 <p className="text-[10px] text-[#15172B]/60 dark:text-gray-400 mt-1.5 font-bold uppercase tracking-[0.2em] transition-colors">
                   One Platform. All Solutions.
                 </p>
               </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
