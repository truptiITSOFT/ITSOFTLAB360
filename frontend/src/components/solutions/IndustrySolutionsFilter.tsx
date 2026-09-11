"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { industries, softwareProducts } from "@/data/solutionsData";
import { ArrowRight, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import Link from "next/link";

export default function IndustrySolutionsFilter() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedIndustryData = industries.find(ind => ind.id === activeIndustry);

  const getIndustryTheme = (id: string) => {
    const allThemes = {
      teal: { bg: "bg-teal-50/80", text: "text-teal-700", border: "border-teal-200", pulse: "bg-teal-500", glow: "border-teal-300", button: "bg-teal-600 border-teal-600 shadow-teal-500/30", hoverText: "hover:text-teal-600", hoverBorder: "hover:border-teal-300" },
      blue: { bg: "bg-blue-50/80", text: "text-blue-700", border: "border-blue-200", pulse: "bg-blue-500", glow: "border-blue-300", button: "bg-blue-600 border-blue-600 shadow-blue-500/30", hoverText: "hover:text-blue-600", hoverBorder: "hover:border-blue-300" },
      rose: { bg: "bg-rose-50/80", text: "text-rose-700", border: "border-rose-200", pulse: "bg-rose-500", glow: "border-rose-300", button: "bg-rose-600 border-rose-600 shadow-rose-500/30", hoverText: "hover:text-rose-600", hoverBorder: "hover:border-rose-300" },
      amber: { bg: "bg-amber-50/80", text: "text-amber-700", border: "border-amber-200", pulse: "bg-amber-500", glow: "border-amber-300", button: "bg-amber-500 border-amber-500 shadow-amber-500/30", hoverText: "hover:text-amber-600", hoverBorder: "hover:border-amber-300" },
      cyan: { bg: "bg-cyan-50/80", text: "text-cyan-700", border: "border-cyan-200", pulse: "bg-cyan-500", glow: "border-cyan-300", button: "bg-cyan-600 border-cyan-600 shadow-cyan-500/30", hoverText: "hover:text-cyan-600", hoverBorder: "hover:border-cyan-300" },
      indigo: { bg: "bg-indigo-50/80", text: "text-indigo-700", border: "border-indigo-200", pulse: "bg-indigo-500", glow: "border-indigo-300", button: "bg-indigo-600 border-indigo-600 shadow-indigo-500/30", hoverText: "hover:text-indigo-600", hoverBorder: "hover:border-indigo-300" },
      purple: { bg: "bg-purple-50/80", text: "text-purple-700", border: "border-purple-200", pulse: "bg-purple-500", glow: "border-purple-300", button: "bg-purple-600 border-purple-600 shadow-purple-500/30", hoverText: "hover:text-purple-600", hoverBorder: "hover:border-purple-300" },
      sky: { bg: "bg-sky-50/80", text: "text-sky-700", border: "border-sky-200", pulse: "bg-sky-500", glow: "border-sky-300", button: "bg-sky-500 border-sky-500 shadow-sky-500/30", hoverText: "hover:text-sky-600", hoverBorder: "hover:border-sky-300" },
      red: { bg: "bg-red-50/80", text: "text-red-700", border: "border-red-200", pulse: "bg-red-500", glow: "border-red-300", button: "bg-red-600 border-red-600 shadow-red-500/30", hoverText: "hover:text-red-600", hoverBorder: "hover:border-red-300" },
      yellow: { bg: "bg-yellow-50/80", text: "text-yellow-700", border: "border-yellow-200", pulse: "bg-yellow-500", glow: "border-yellow-300", button: "bg-yellow-500 border-yellow-500 shadow-yellow-500/30", hoverText: "hover:text-yellow-600", hoverBorder: "hover:border-yellow-300" },
      lime: { bg: "bg-lime-50/80", text: "text-lime-700", border: "border-lime-200", pulse: "bg-lime-500", glow: "border-lime-300", button: "bg-lime-500 border-lime-500 shadow-lime-500/30", hoverText: "hover:text-lime-600", hoverBorder: "hover:border-lime-300" },
      orange: { bg: "bg-orange-50/80", text: "text-orange-700", border: "border-orange-200", pulse: "bg-orange-500", glow: "border-orange-300", button: "bg-orange-500 border-orange-500 shadow-orange-500/30", hoverText: "hover:text-orange-600", hoverBorder: "hover:border-orange-300" },
      emerald: { bg: "bg-emerald-50/80", text: "text-emerald-700", border: "border-emerald-200", pulse: "bg-emerald-500", glow: "border-emerald-300", button: "bg-emerald-600 border-emerald-600 shadow-emerald-500/30", hoverText: "hover:text-emerald-600", hoverBorder: "hover:border-emerald-300" },
      violet: { bg: "bg-violet-50/80", text: "text-violet-700", border: "border-violet-200", pulse: "bg-violet-500", glow: "border-violet-300", button: "bg-violet-600 border-violet-600 shadow-violet-500/30", hoverText: "hover:text-violet-600", hoverBorder: "hover:border-violet-300" },
      fuchsia: { bg: "bg-fuchsia-50/80", text: "text-fuchsia-700", border: "border-fuchsia-200", pulse: "bg-fuchsia-500", glow: "border-fuchsia-300", button: "bg-fuchsia-600 border-fuchsia-600 shadow-fuchsia-500/30", hoverText: "hover:text-fuchsia-600", hoverBorder: "hover:border-fuchsia-300" },
      slate: { bg: "bg-slate-50/80", text: "text-slate-700", border: "border-slate-200", pulse: "bg-slate-500", glow: "border-slate-300", button: "bg-slate-600 border-slate-600 shadow-slate-500/30", hoverText: "hover:text-slate-600", hoverBorder: "hover:border-slate-300" },
    };

    const map: Record<string, typeof allThemes.teal> = {
      healthcare: allThemes.teal,
      banking: allThemes.blue,
      retail: allThemes.rose,
      manufacturing: allThemes.amber,
      "information-technology": allThemes.cyan,
      telecommunications: allThemes.indigo,
      education: allThemes.purple,
      "transportation-logistics": allThemes.sky,
      automotive: allThemes.red,
      "energy-utilities": allThemes.yellow,
      agriculture: allThemes.lime,
      "food-beverage": allThemes.orange,
      "hospitality-tourism": allThemes.fuchsia,
      "real-estate": allThemes.emerald,
      media: allThemes.violet,
      government: allThemes.slate,
      "pharmaceutical": allThemes.cyan,
      fashion: allThemes.rose,
    };
    return map[id] || allThemes.emerald;
  };

  // Get software products that are relevant to the selected industry
  const relevantProducts = selectedIndustryData?.products.map(indProd => {
    const baseProduct = softwareProducts.find(p => p.id === indProd.id);
    return baseProduct ? { ...baseProduct, description: indProd.description } : null;
  }).filter((p): p is NonNullable<typeof p> => p !== null) || [];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Animation variants for the stagger effect
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // const cardVariants = {
  //   hidden: { opacity: 0, y: 30, scale: 0.95 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     scale: 1,
  //     transition: {
  //       type: "spring",
  //       stiffness: 100,
  //       damping: 15,
  //     }
  //   },
  // };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-[#111A4A] mb-6 tracking-tight"
          >
            Solutions by Industry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#15172B]/70"
          >
            Explore how our integrated ecosystem adapts to meet the specific compliance, operational, and customer demands of your sector.
          </motion.p>
        </div>

        {/* Horizontal Industry Scroller */}
        <div className="relative mb-16 group">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#111A4A] hover:text-[#EB3158] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#111A4A] hover:text-[#EB3158] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-3 pb-6 pt-2 px-2 -mx-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {industries.map((industry) => {
              const Icon = industry.icon;
              const isActive = activeIndustry === industry.id;
              const btnTheme = getIndustryTheme(industry.id);

              return (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndustry(industry.id)}
                  className={`flex-shrink-0 snap-start flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-all duration-300 border group ${isActive
                      ? `${btnTheme.button} text-white shadow-lg scale-105`
                      : `bg-gray-50 border-gray-200 text-[#15172B]/70 hover:bg-white ${btnTheme.hoverBorder} ${btnTheme.hoverText} hover:shadow-md`
                    }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : `${btnTheme.text} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <span className="font-semibold text-sm whitespace-nowrap">{industry.name}</span>
                </button>
              );
            })}
          </div>

          {/* Fading Edges for Scroll Indication */}
          <div className="absolute top-0 right-0 bottom-6 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
        </div>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          {selectedIndustryData && (
            <motion.div
              key={selectedIndustryData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              {(() => {
                const theme = getIndustryTheme(selectedIndustryData.id);

                return (
                  <>
                    {/* Animated Industry Banner Box */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                      className={`mb-8 sm:mb-12 p-5 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-3xl ${theme.bg} border ${theme.border} relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8 transition-colors duration-500 group`}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                        className={`absolute -top-32 -right-24 p-8 opacity-[0.04] pointer-events-none hidden sm:block ${theme.text}`}
                      >
                        <selectedIndustryData.icon size={350} />
                      </motion.div>

                      <div className="relative z-10 max-w-2xl">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border ${theme.border} ${theme.text} font-bold text-xs uppercase tracking-wider mb-6 shadow-sm`}>
                          <span className={`relative flex h-2 w-2`}>
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.pulse} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.pulse}`}></span>
                          </span>
                          Industry Suite
                        </div>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3 tracking-tight leading-tight">
                          {selectedIndustryData.name} Software Suite
                        </h3>
                        <p className="text-sm sm:text-lg text-[#15172B]/70 leading-[1.4] sm:leading-relaxed">
                          {selectedIndustryData.description}
                        </p>
                      </div>

                      <div className={`relative z-10 flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-lg sm:shadow-xl border ${theme.border} group-hover:scale-105 transition-transform duration-500 overflow-hidden`}>

                        {/* Default rings (visible for non-custom industries) */}
                        {selectedIndustryData.id !== 'automotive' && selectedIndustryData.id !== 'healthcare' && selectedIndustryData.id !== 'manufacturing' && (
                          <>
                            <div className={`absolute inset-0 rounded-full border-[3px] border-dashed ${theme.glow} border-r-transparent border-b-transparent animate-spin`} style={{ animationDuration: '10s' }} />
                            <div className={`absolute inset-2 rounded-full border-[2px] border-dashed ${theme.glow} opacity-50 border-l-transparent border-t-transparent animate-spin`} style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                          </>
                        )}

                        {/* Automotive Animation */}
                        {selectedIndustryData.id === 'automotive' && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-70">
                            {/* Moving road dashes */}
                            <motion.div
                              animate={{ x: ["0%", "-50%"] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                              className="absolute bottom-4 sm:bottom-8 left-0 w-[200%] h-1 sm:h-1.5 flex gap-2 sm:gap-4"
                            >
                              {[...Array(10)].map((_, i) => <div key={i} className={`w-8 sm:w-12 h-full ${theme.pulse} rounded-full`} />)}
                            </motion.div>
                            {/* Passing clouds/speed lines */}
                            <motion.div animate={{ x: ["100%", "-200%"] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className={`absolute top-4 sm:top-8 w-6 h-1.5 rounded-full ${theme.pulse} opacity-40`} />
                            <motion.div animate={{ x: ["200%", "-100%"] }} transition={{ repeat: Infinity, duration: 4.5, ease: "linear", delay: 1 }} className={`absolute top-8 sm:top-12 w-4 h-1 rounded-full ${theme.pulse} opacity-30`} />
                          </div>
                        )}

                        {/* Healthcare Animation */}
                        {selectedIndustryData.id === 'healthcare' && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-60">
                            <motion.svg viewBox="0 0 100 100" className={`w-full h-full ${theme.text}`} fill="none" strokeWidth="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                              <motion.path
                                d="M 0 50 L 30 50 L 40 20 L 60 80 L 70 50 L 100 50"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                              />
                            </motion.svg>
                          </div>
                        )}

                        {/* Manufacturing Animation */}
                        {selectedIndustryData.id === 'manufacturing' && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} className="absolute -top-4 -left-4 sm:-top-2 sm:-left-2">
                              <Settings className={`w-12 h-12 sm:w-16 sm:h-16 ${theme.text}`} />
                            </motion.div>
                            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute -bottom-2 -right-2 sm:bottom-0 sm:right-0">
                              <Settings className={`w-10 h-10 sm:w-12 sm:h-12 ${theme.text}`} />
                            </motion.div>
                          </div>
                        )}

                        {/* Dynamic Icon */}
                        <motion.div
                          animate={selectedIndustryData.id === 'automotive' ? { y: [0, -3, 0] } : {}}
                          transition={selectedIndustryData.id === 'automotive' ? { repeat: Infinity, duration: 0.5 } : {}}
                          className="z-10 relative"
                        >
                          <selectedIndustryData.icon className={`w-10 h-10 sm:w-16 sm:h-16 ${theme.text} group-hover:scale-110 transition-transform duration-500`} />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Products Grid */}
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
                    >
                      {relevantProducts.map((product) => {
                        const Icon = product.icon;
                        return (
                          <motion.div
                            key={product.id}
                            // variants={cardVariants}
                            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                            className="bg-white hover:bg-slate-50/80 rounded-[1.25rem] sm:rounded-2xl p-4 sm:p-6 border border-[#111A4A]/5 hover:border-transparent shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full relative overflow-hidden"
                          >
                            {/* Animated Glow line at the top */}
                            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            {/* Ambient blur behind the icon */}
                            <div className={`absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br ${product.color} blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity duration-500 rounded-full pointer-events-none`} />

                            <div className="relative z-10">
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[10px] sm:rounded-xl flex items-center justify-center bg-gradient-to-br ${product.color} text-white mb-3 sm:mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-lg shadow-black/5`}>
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                              </div>

                              <h4 className="text-[14px] sm:text-lg font-bold text-[#111A4A] mb-1.5 sm:mb-3 group-hover:text-[#EB3158] transition-colors duration-300 leading-tight">
                                {product.name}
                              </h4>

                              <p className="text-[11px] sm:text-sm text-[#15172B]/70 mb-4 sm:mb-6 flex-grow leading-[1.4] sm:leading-relaxed">
                                {product.description}
                              </p>
                            </div>

                            <div className="mt-auto pt-3 sm:pt-4 border-t border-[#111A4A]/5 group-hover:border-transparent transition-colors duration-300 relative z-10">
                              <Link href={`/products/${product.id}`} className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-bold text-[#111A4A] group-hover:text-[#EB3158] transition-colors relative">
                                Explore Solution
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1.5 transition-transform" />
                              </Link>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}