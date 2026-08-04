"use client";

import { motion } from "framer-motion";
import { Database, CheckCircle, Users, BarChart2, Shield } from "lucide-react";
import { useEffect, useRef } from "react";

export default function WorkflowSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Reset to start if we reached the end
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll by roughly one card width
          scrollRef.current.scrollBy({ left: clientWidth > 1024 ? clientWidth / 3 : clientWidth > 768 ? clientWidth / 2 : clientWidth, behavior: "smooth" });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      id: "01",
      title: "Connected Business Data",
      desc: "Customer, employee, inventory, vendor, sales, document, and logistics data stay connected across the organization.",
      bg: "bg-[#E5F3FB]", // soft blue
      accent: "text-[#4AA8D8]",
      delay: 0.1,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40 dark:bg-[#060D1E]/40">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-32 h-32 rounded-full border-2 border-dashed border-[#4AA8D8]/30" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute w-48 h-48 rounded-full border border-[#4AA8D8]/20" />
          <div className="relative z-10 w-16 h-16 bg-white dark:bg-[#0A1125] rounded-2xl shadow-md dark:shadow-none flex items-center justify-center">
            <Database className="text-[#4AA8D8] w-8 h-8" />
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-8 left-8 w-10 h-10 bg-white dark:bg-[#0A1125] rounded-xl shadow-sm dark:shadow-none flex items-center justify-center">
            <div className="w-4 h-4 bg-[#EB3158] rounded-full" />
          </motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-10 right-10 w-12 h-12 bg-white dark:bg-[#0A1125] rounded-xl shadow-sm dark:shadow-none flex items-center justify-center">
            <div className="w-5 h-5 bg-[#20B486] rounded-sm" />
          </motion.div>
        </div>
      )
    },
    {
      id: "02",
      title: "Organized Operations",
      desc: "Standardized workflows, approvals, alerts, tasks, and reports reduce manual effort and operational confusion.",
      bg: "bg-[#FFE9DF]", // soft peach
      accent: "text-[#EB3158]",
      delay: 0.3,
      visual: (
        <div className="relative w-full h-48 mt-8 flex flex-col justify-center items-center overflow-hidden rounded-xl bg-white/40 dark:bg-[#060D1E]/40 gap-3">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="w-4/5 h-10 bg-white dark:bg-[#0A1125] rounded-lg shadow-sm dark:shadow-none border border-[#EB3158]/10 flex items-center px-4 justify-between"
            >
              <div className="w-1/2 h-2 bg-gray-100 rounded" />
              <CheckCircle className="text-[#EB3158] w-4 h-4" />
            </motion.div>
          ))}
          <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EB3158]/0 via-[#EB3158]/30 to-[#EB3158]/0" />
        </div>
      )
    },
    {
      id: "03",
      title: "Collaboration Across Teams",
      desc: "Departments work with shared information, real-time updates, controlled access, and better accountability.",
      bg: "bg-[#E5F7ED]", // soft mint
      accent: "text-[#20B486]",
      delay: 0.5,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40 dark:bg-[#060D1E]/40">
          <div className="w-full flex justify-around items-center px-4">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 bg-white dark:bg-[#0A1125] rounded-full shadow-md dark:shadow-none flex items-center justify-center border border-[#20B486]/20 z-10">
              <Users className="text-[#20B486] w-5 h-5" />
            </motion.div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-[#20B486]/30 to-[#4AA8D8]/30 relative">
              <motion.div animate={{ left: ["0%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#111A4A] rounded-full shadow-md dark:shadow-none" />
            </div>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-14 h-14 bg-white dark:bg-[#0A1125] rounded-2xl shadow-md dark:shadow-none flex items-center justify-center border border-[#4AA8D8]/20 z-10">
              <div className="w-6 h-6 rounded bg-[#4AA8D8]/20" />
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: "04",
      title: "Real-time Analytics",
      desc: "Gain instant insights with live dashboards, custom reports, and predictive data that drive smarter business decisions.",
      bg: "bg-[#F3E8FF] dark:bg-[#2B1B40]",
      accent: "text-[#A855F7]",
      delay: 0.1,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-end overflow-hidden rounded-xl bg-white/40 dark:bg-[#060D1E]/40 p-6 gap-3">
          {[40, 70, 45, 90, 60].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-8 bg-gradient-to-t from-[#A855F7]/20 to-[#A855F7] rounded-t-md relative group"
            />
          ))}
          <div className="absolute top-4 left-4 w-10 h-10 bg-white dark:bg-[#0A1125] rounded-xl shadow-sm dark:shadow-none flex items-center justify-center">
            <BarChart2 className="text-[#A855F7] w-5 h-5" />
          </div>
        </div>
      )
    },
    {
      id: "05",
      title: "Secure & Compliant",
      desc: "Enterprise-grade security protocols, automated backups, and strict access controls keep your sensitive data protected at all times.",
      bg: "bg-[#FFF4E5] dark:bg-[#331C0C]",
      accent: "text-[#F97316]",
      delay: 0.3,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40 dark:bg-[#060D1E]/40">
           <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="absolute w-32 h-32 bg-[#F97316]/20 rounded-full blur-2xl" />
           <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative z-10 w-20 h-20 bg-white dark:bg-[#0A1125] rounded-2xl shadow-xl dark:shadow-none flex items-center justify-center border border-[#F97316]/20">
             <Shield className="w-10 h-10 text-[#F97316]" />
           </motion.div>
           <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-40 h-40 rounded-full border border-dashed border-[#F97316]/30" />
        </div>
      )
    }
  ];

  return (
    <section className="py-32 bg-[#FBFAF5] dark:bg-[#030816] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-[#111A4A] dark:text-white uppercase mb-4 block border border-[#111A4A] dark:border-white/10 dark:border-white/10 px-4 py-1.5 rounded-full">
            How the Ecosystem Works
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111A4A] dark:text-white tracking-tight mb-6 leading-tight">
            Understand how connected solutions improve everyday work.
          </h2>
          <p className="text-lg text-[#15172B] dark:text-gray-100/70 leading-relaxed">
            Start with the solutions your business needs today and expand as your operations grow.
          </p>
        </div>

        {/* Cards Auto Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 pt-4 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: card.delay }}
              className={`group flex flex-col p-8 md:p-10 rounded-[28px] ${card.bg} border border-white/50 shadow-sm dark:shadow-none hover:shadow-[0_20px_40px_rgba(17,26,74,0.05)] hover:-translate-y-2 transition-all duration-500 min-w-[85vw] md:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-21.33px)] snap-center md:snap-start`}
            >
              <span className={`text-5xl font-extrabold opacity-20 mb-6 font-mono ${card.accent}`}>
                {card.id}
              </span>
              <h3 className="text-2xl font-bold text-[#111A4A] dark:text-white mb-4">
                {card.title}
              </h3>
              <p className="text-[#15172B] dark:text-gray-100/70 leading-relaxed mb-8 flex-grow">
                {card.desc}
              </p>
              
              {card.visual}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
