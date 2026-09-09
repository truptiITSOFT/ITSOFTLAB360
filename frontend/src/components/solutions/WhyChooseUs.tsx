"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { features } from "@/data/solutionsData";

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#20B486]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#EB3158]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-[#111A4A] mb-6 tracking-tight"
          >
            Why ITSoftLab360
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#15172B]/70"
          >
            Built on a foundation of reliability, security, and innovation, our platform empowers your enterprise to scale without limits.
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 overflow-hidden rounded-full">
            <motion.div 
              className="w-full bg-gradient-to-b from-[#20B486] via-[#3b82f6] to-[#EB3158]"
              style={{
                height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {features.map((feature, index) => {
              const isEven = index % 2 === 0;
              const Icon = feature.icon;

              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                  
                  {/* Timeline Dot (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#20B486] items-center justify-center z-10 shadow-[0_0_15px_rgba(32,180,134,0.3)]">
                    <div className="w-3 h-3 bg-[#EB3158] rounded-full animate-ping opacity-75 absolute" />
                    <div className="w-3 h-3 bg-[#EB3158] rounded-full relative z-10" />
                  </div>

                  {/* Left Content (Empty on Mobile if Odd) */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 lg:pr-24 text-left md:text-right' : 'md:order-last md:pl-16 lg:pl-24 text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                      className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden"
                    >
                      {/* Dynamic Background Overlay */}
                      <div className={`absolute inset-0 opacity-10 pointer-events-none ${
                        index % 3 === 0 ? 'bg-gradient-to-br from-[#EB3158] via-[#EB3158]/50 to-transparent' :
                        index % 3 === 1 ? 'bg-gradient-to-br from-[#20B486] via-[#20B486]/50 to-transparent' :
                        'bg-gradient-to-br from-[#3b82f6] via-[#3b82f6]/50 to-transparent'
                      }`} />

                      <motion.div 
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                        className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 shadow-md relative z-10 text-white
                        ${isEven ? 'md:ml-auto' : ''} 
                        ${
                          index % 3 === 0 ? 'bg-[#EB3158] border-[#EB3158] shadow-[#EB3158]/30' :
                          index % 3 === 1 ? 'bg-[#20B486] border-[#20B486] shadow-[#20B486]/30' :
                          'bg-[#3b82f6] border-[#3b82f6] shadow-[#3b82f6]/30'
                        }
                      `}>
                        <Icon size={26} />
                      </motion.div>
                      
                      <h3 className={`text-2xl font-bold mb-3 relative z-10
                        ${
                          index % 3 === 0 ? 'text-[#EB3158]' :
                          index % 3 === 1 ? 'text-[#20B486]' :
                          'text-[#3b82f6]'
                        }
                      `}>{feature.title}</h3>
                      <p className="text-[#15172B]/90 leading-relaxed relative z-10">{feature.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Empty Spacer for Layout */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
