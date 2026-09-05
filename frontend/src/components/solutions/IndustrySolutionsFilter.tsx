"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { industries, softwareProducts } from "@/data/solutionsData";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function IndustrySolutionsFilter() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedIndustryData = industries.find(ind => ind.id === activeIndustry);
  
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    },
  };

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
              
              return (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndustry(industry.id)}
                  className={`flex-shrink-0 snap-start flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-all duration-300 border ${
                    isActive 
                      ? "bg-[#111A4A] border-[#111A4A] text-white shadow-lg shadow-[#111A4A]/20 scale-105" 
                      : "bg-gray-50 border-gray-200 text-[#15172B]/70 hover:bg-white hover:border-[#20B486]/50 hover:text-[#20B486] hover:shadow-md"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-[#20B486]" : "text-gray-400"} />
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
              {/* Industry Banner Box */}
              <div className="mb-12 p-8 md:p-10 rounded-3xl bg-gray-50 border border-gray-100 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute -top-24 -right-24 p-8 opacity-[0.03] pointer-events-none">
                  <selectedIndustryData.icon size={300} />
                </div>
                
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#111A4A] font-bold text-xs uppercase tracking-wider mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#20B486] animate-pulse" />
                    Industry Suite
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#111A4A] mb-4 flex items-center gap-3 tracking-tight">
                    {selectedIndustryData.name} Software Suite
                  </h3>
                  <p className="text-lg text-[#15172B]/70 leading-relaxed">
                    {selectedIndustryData.description}
                  </p>
                </div>
                
                <div className="relative z-10 flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100">
                   <selectedIndustryData.icon className="text-[#111A4A]" size={64} />
                   <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#20B486]/30 animate-spin" style={{ animationDuration: '15s' }} />
                </div>
              </div>

              {/* Products Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {relevantProducts.map((product) => {
                  const Icon = product.icon;
                  return (
                    <motion.div
                      key={product.id}
                      // variants={cardVariants}
                      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                    >
                      {/* Glow line at the top */}
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${product.color} text-white mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md`}>
                        <Icon size={20} />
                      </div>
                      
                      <h4 className="text-lg font-bold text-[#111A4A] mb-3 group-hover:text-[#EB3158] transition-colors duration-300">
                        {product.name}
                      </h4>
                      
                      <p className="text-sm text-[#15172B]/70 mb-6 flex-grow leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-50 overflow-hidden">
                        <Link href={`/products/${product.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#111A4A] group-hover:text-[#20B486] transition-colors relative">
                          View Details 
                          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
