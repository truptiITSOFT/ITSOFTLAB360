"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { products } from "@/components/Products";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCollectionSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (isScrolling) return;

    if (e.deltaY > 50 || e.deltaX > 50) {
      handleNext();
      setIsScrolling(true);
    } else if (e.deltaY < -50 || e.deltaX < -50) {
      handlePrev();
      setIsScrolling(true);
    }

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 600); // Debounce time
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = offset.x;
    if (swipe < -50) {
      handleNext();
    } else if (swipe > 50) {
      handlePrev();
    }
  };

  return (
    <section 
      className="relative w-full min-h-[90vh] bg-[#0F1115] overflow-hidden flex flex-col font-sans selection:bg-[#EB3158]/30 selection:text-white border-y border-white/5"
      onWheel={onWheel}
    >
      {/* Main Content Grid */}
      <div className="relative z-10 flex-grow flex items-center justify-center h-full w-full py-12 lg:py-0">
        
        {/* 3D Carousel */}
        <div className="relative h-[60vh] lg:h-[70vh] w-full flex items-center justify-center">
          <motion.div 
            className="relative w-full max-w-[500px] h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {products.map((product, index) => {
                // Calculate distance from active index
                let offset = index - activeIndex;
                if (offset > products.length / 2) offset -= products.length;
                if (offset < -products.length / 2) offset += products.length;
                
                // Only render items that are close to active to improve performance
                if (Math.abs(offset) > 2) return null;

                const isActive = offset === 0;
                
                // Positioning logic
                const x = offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 200); // Distance between items
                const scale = isActive ? 1.1 : 0.75 - Math.abs(offset) * 0.1;
                const zIndex = 50 - Math.abs(offset);
                const opacity = isActive ? 1 : 0.5 - Math.abs(offset) * 0.15;
                const rotateY = offset * -25; // Give a slight rotation for 3D effect

                return (
                  <motion.div
                    key={product.id}
                    className="absolute top-1/2 left-1/2 origin-center"
                    initial={{ 
                      x: `calc(-50% + ${x + (offset > 0 ? 100 : -100)}px)`, 
                      y: "-50%", 
                      scale: scale * 0.8, 
                      opacity: 0,
                      rotateY: rotateY
                    }}
                    animate={{ 
                      x: `calc(-50% + ${x}px)`, 
                      y: "-50%", 
                      scale, 
                      zIndex, 
                      opacity,
                      rotateY
                    }}
                    exit={{ 
                      x: `calc(-50% + ${x + (offset > 0 ? 100 : -100)}px)`, 
                      y: "-50%", 
                      scale: scale * 0.8, 
                      opacity: 0,
                      rotateY: rotateY
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
                    onClick={() => {
                      if (!isActive) {
                        if (offset > 0) handleNext();
                        if (offset < 0) handlePrev();
                      }
                    }}
                    style={{ perspective: 1200 }}
                  >
                    {/* The Product Card in Carousel */}
                    <div className={`w-[220px] h-[320px] md:w-[260px] md:h-[380px] ${isActive ? 'bg-white shadow-[0_20px_60px_rgba(0,0,0,0.6)]' : 'bg-[#15171C] shadow-xl'} rounded-[2rem] flex flex-col items-center justify-center p-8 transition-colors duration-500 border ${isActive ? 'border-transparent' : 'border-white/5'}`}>
                      <div className={`absolute top-6 left-6 text-sm font-bold ${isActive ? 'text-[#111A4A]/30' : 'text-white/20'}`}>
                        {product.id}
                      </div>
                      
                      <div className="w-28 h-28 md:w-36 md:h-36 relative z-10 flex items-center justify-center pointer-events-none">
                         <div className={`absolute inset-0 rounded-full blur-2xl ${isActive ? 'opacity-30' : 'opacity-10'} ${product.color}`}></div>
                         <div className="scale-125 transform transition-transform duration-500 hover:scale-150">
                           {product.graphic}
                         </div>
                      </div>
                      
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="mt-6 text-center w-full"
                        >
                          <h3 className="text-xl font-bold text-[#111A4A] leading-tight">
                            {product.name}
                          </h3>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
