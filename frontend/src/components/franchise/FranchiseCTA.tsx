"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FranchiseCTA() {
  return (
    <section className="pb-24 pt-8 bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a1930] to-[#1e1438] border border-blue-900/50 p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Background decorative waves/glow */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-screen"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 md:max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Franchise Empire?
            </h2>
            <p className="text-gray-300 text-lg">
              Join thousands of successful businesses growing with IT SOFTLAB 360.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] whitespace-nowrap">
              Talk to Expert <ArrowRight size={18} />
            </button>
            <button className="flex items-center justify-center gap-2 bg-transparent border border-gray-600 hover:border-gray-400 hover:bg-white/5 text-white px-8 py-4 rounded-xl font-medium transition-all whitespace-nowrap">
              Request Demo <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
