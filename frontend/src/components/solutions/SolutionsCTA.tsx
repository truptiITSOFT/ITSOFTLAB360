"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedLogo from "../AnimatedLogo";

export default function SolutionsCTA() {
  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50 dark:from-[#020617] dark:via-blue-900/20 dark:to-[#020617] border-y border-blue-200 dark:border-blue-500/20 py-16 md:py-20 overflow-hidden transition-colors"
        >
          {/* Decorative Glow */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 px-8 md:px-16">
            
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white transition-colors">
                Ready To Build A <span className="text-blue-600 dark:text-blue-500 text-glow">Smarter Business?</span>
              </h2>
              <p className="text-slate-600 dark:text-gray-300 text-lg mb-8 transition-colors">
                Discover how IT SOFTLAB 360 can transform your business operations.
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link href="/demo" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]">
                  REQUEST DEMO <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="flex items-center gap-2 bg-white/50 dark:bg-transparent border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-gray-400 text-slate-800 dark:text-white px-8 py-3.5 rounded-full font-medium transition-all">
                  TALK TO EXPERT <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full"></div>
               <AnimatedLogo className="w-32 h-32 mb-6 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
               <div className="text-center">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-wider transition-colors">IT SOFTLAB <span className="text-blue-600 dark:text-blue-500">360</span></h3>
                 <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 uppercase tracking-widest transition-colors">One Platform. All Solutions.</p>
               </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
