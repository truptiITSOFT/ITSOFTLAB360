"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/solutionsData";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

export default function SolutionsTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-[#111A4A] mb-6 tracking-tight"
          >
            Trusted by Enterprises
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto relative h-[300px] flex items-center justify-center">
          {testimonials.map((test, index) => {
            const isActive = index === currentIndex;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ 
                  opacity: isActive ? 1 : 0, 
                  x: isActive ? 0 : (index < currentIndex ? -100 : 100),
                  scale: isActive ? 1 : 0.9,
                  zIndex: isActive ? 10 : 0,
                  pointerEvents: isActive ? "auto" : "none"
                }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#20B486]/10 text-[#20B486] flex items-center justify-center mb-6">
                    <Quote size={24} fill="currentColor" />
                  </div>
                  
                  <p className="text-xl md:text-2xl text-[#15172B]/70 italic leading-relaxed mb-8">
                    "{test.quote}"
                  </p>
                  
                  <div>
                    <h4 className="font-bold text-[#111A4A] text-lg">{test.author}</h4>
                    <span className="text-[#EB3158] font-medium text-sm">{test.role}, {test.company}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-[#111A4A] w-8" : "bg-gray-300 hover:bg-[#20B486]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
