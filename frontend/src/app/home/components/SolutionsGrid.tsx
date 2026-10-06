"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { solutionsData, filterCategories } from "../data";

export default function SolutionsGrid() {
  const [activeFilter, setActiveFilter] = useState("All Solutions");

  const filteredSolutions = activeFilter === "All Solutions" 
    ? solutionsData 
    : solutionsData.filter(s => s.category.includes(activeFilter));

  return (
    <section id="solutions" className="py-24 bg-[#FBFAF5] dark:bg-[#030816] relative">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        
        {/* Intro */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-widest text-[#EB3158] uppercase mb-4 block">
            One Connected Business Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111A4A] dark:text-white tracking-tight mb-6 leading-tight">
            Explore powerful IT solutions for every business team.
          </h2>
          <p className="text-lg text-[#15172B] dark:text-gray-100/70 leading-relaxed">
            Connect people, customers, operations, inventory, logistics, documents, sales, learning, marketing, vendors, dealers, and retail activities through one centralized platform.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filterCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? "bg-[#111A4A] text-white shadow-md dark:shadow-none shadow-[#111A4A]/20"
                  : "bg-white dark:bg-[#0A1125] text-[#15172B] dark:text-gray-100/60 border border-[#111A4A] dark:border-white/10 dark:border-white/10 hover:border-[#111A4A] dark:border-white/30 hover:text-[#111A4A] dark:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredSolutions.map((solution, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                key={solution.id}
              >
                <Link 
                  href={`#`}
                  className={`group relative flex flex-col h-full min-h-[256px] bg-white dark:bg-[#0A1125] rounded-[22.4px] border border-[#111A4A] dark:border-white/10 dark:border-white/10 p-8 shadow-sm dark:shadow-none hover:shadow-[0_20px_40px_rgba(17,26,74,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden ${solution.accent}`}
                >
                  {/* Decorative Background Circle */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border-[1.2px] border-current opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-700 ease-out" />
                  
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${solution.iconColor} transition-transform duration-500 group-hover:rotate-6`}>
                      <solution.icon size={24} />
                    </div>
                    <span className="text-[#15172B] dark:text-gray-100/30 font-bold text-lg">
                      {solution.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-grow">
                    <span className="text-xs font-bold text-[#15172B] dark:text-gray-100/50 tracking-wider uppercase mb-2 block">
                      {solution.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#111A4A] dark:text-white mb-3">
                      {solution.name}
                    </h3>
                    <p className="text-sm text-[#15172B] dark:text-gray-100/60 leading-relaxed mb-6">
                      {solution.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="mt-auto relative z-10 flex items-center gap-2 text-sm font-bold text-[#111A4A] dark:text-white group-hover:text-current transition-colors duration-300">
                    Explore Solution
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
