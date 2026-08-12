"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#F5C842] to-[#F3A62F]">

      {/* Decorative Glows & Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-white/20  rounded-full blur-[80px]" />

        <motion.div
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[10%] w-32 h-32 rounded-full border-[2.4px] border-white/20"
        />
        <motion.div
          animate={{ y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-[15%] w-48 h-48 rounded-full border-[1.6px] border-white/10"
        />
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] right-[5%] w-16 h-16 rounded-full bg-white/10  blur-[1.6px]"
        />

        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20  text-[#111A4A]  text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-sm border border-white/30 shadow-sm ">
            Start Your Digital Transformation
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111A4A]  tracking-tight mb-6 leading-tight">
            Explore the ITSoftLab360 ecosystem with a clearer starting point.
          </h2>

          <p className="text-lg md:text-xl text-[#111A4A]  leading-relaxed mb-12 max-w-2xl mx-auto">
            Discover the right combination of solutions for your industry, team size, workflow, and growth goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/solutions"
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#111A4A] hover:bg-[#15172B] text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_25px_rgba(17,26,74,0.3)] hover:shadow-[0_12px_30px_rgba(17,26,74,0.4)] transition-all hover:-translate-y-1"
            >
              Explore All 12 Solutions <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white  hover:bg-white/90  text-[#111A4A]  px-8 py-4 rounded-full font-bold shadow-sm  transition-all hover:-translate-y-1"
            >
              <Calendar size={18} /> Schedule a Free Consultation
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
