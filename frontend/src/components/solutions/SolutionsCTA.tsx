"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

export default function SolutionsCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#20B486]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#EB3158]/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_19.2px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-medium text-sm mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#EB3158] animate-pulse" />
            Ready to scale?
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-[#111A4A] mb-6 tracking-tight leading-tight">
            Ready to Transform <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20B486] to-[#EB3158]">
              Your Business?
            </span>
          </h2>

          <p className="text-xl text-[#15172B]/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of enterprise clients who trust ITSoftLab360 to streamline operations, drive growth, and lead their industry.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/contact" className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-[#111A4A] rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(17,26,74,0.5)]">
              <span className="relative z-10 flex items-center gap-2">
                Get Custom Demo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out skew-x-12"></div>
            </Link>

            <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[#111A4A] bg-transparent border-2 border-[#111A4A]/20 rounded-full transition-all hover:border-[#111A4A] hover:bg-[#111A4A]/5">
              Book Free Consultation <CalendarDays size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
