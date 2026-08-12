"use client";

import { Puzzle, Users, Globe, ShieldCheck, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: <Puzzle size={28} className="text-[#EB3158]" />, value: "12+", label: "Solutions\nIn One Platform" },
  { icon: <Users size={28} className="text-purple-400" />, value: "5000+", label: "Happy Clients\nWorldwide" },
  { icon: <Globe size={28} className="text-cyan-400" />, value: "50+", label: "Countries\nGlobal Reach" },
  { icon: <ShieldCheck size={28} className="text-emerald-400" />, value: "99.9%", label: "Uptime\nEnterprise Grade" },
  { icon: <HeadphonesIcon size={28} className="text-pink-400" />, value: "24/7", label: "Support\nAlways Here" },
];

export default function FranchiseStats() {
  return (
    <section className="pb-16 pt-8 bg-white  transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="border border-[#111A4A]/10  bg-slate-50  rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row flex-wrap justify-between items-center gap-8 shadow-sm  transition-colors">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4 flex-1 min-w-[150px] justify-center md:justify-start"
            >
              <div className="drop-shadow-[0_0_8px_currentColor]">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-[#15172B]  text-xl font-bold transition-colors">{stat.value}</h4>
                <p className="text-[10px] text-[#15172B]/60  uppercase tracking-wider whitespace-pre-line leading-tight mt-1 transition-colors">{stat.label}</p>
              </div>
              
              {/* Divider for desktop */}
              {index < stats.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-gray-300  ml-auto transition-colors"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
