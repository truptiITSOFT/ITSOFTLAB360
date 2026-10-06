"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PlatformAnimation, PartnerAnimation, ProductsAnimation, IndustriesAnimation, CustomersAnimation } from "./WorkflowAnimations";

const WORKFLOW = [
  { 
    id: 1, 
    title: "ITSoftLab360 Platform", 
    desc: "The core technology provider supplying the ecosystem, infrastructure, and continuous product updates. We handle the heavy lifting of development.", 
    AnimationComponent: PlatformAnimation,
    color: "from-blue-600 to-indigo-800",
  },
  { 
    id: 2, 
    title: "Franchise Partner", 
    desc: "You act as the regional business owner. You acquire the master rights, build your local brand presence, and manage your client base autonomously.", 
    AnimationComponent: PartnerAnimation,
    color: "from-emerald-500 to-teal-700",
  },
  { 
    id: 3, 
    title: "12 Integrated Products", 
    desc: "A full portfolio ready to deploy. From CRM to ERP, you can sell the exact software solutions your local market desperately needs.", 
    AnimationComponent: ProductsAnimation,
    color: "from-rose-500 to-pink-700",
  },
  { 
    id: 4, 
    title: "Multiple Industries", 
    desc: "Serve retail, healthcare, manufacturing, and more. Our products are versatile and industry-agnostic, giving you an unlimited addressable market.", 
    AnimationComponent: IndustriesAnimation,
    color: "from-amber-500 to-orange-700",
  },
  { 
    id: 5, 
    title: "Thousands of Customers", 
    desc: "Scale your revenue indefinitely. Manage thousands of B2B subscriptions securely through your dedicated partner dashboard.", 
    AnimationComponent: CustomersAnimation,
    color: "from-violet-500 to-purple-800",
  },
];

export default function FranchiseModelVisual() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-32 bg-[#f8fafc]  transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/50  border border-blue-200  text-blue-700  text-sm font-semibold mb-6"
          >
            The Workflow
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111A4A]  mb-6 tracking-tight"
          >
            One Partnership. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#EB3158]">Multiple Business Opportunities.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#15172B]/70  max-w-2xl"
          >
            See exactly how value flows from our core platform to your regional customers, creating a highly scalable and recurring revenue engine.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Accordion List */}
          <div className="w-full lg:w-[45%] flex flex-col gap-2">
            {WORKFLOW.map((step, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={step.id} 
                  className="group cursor-pointer py-6"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className={`transition-all duration-500 border-l-[3.2px] pl-6 md:pl-8 ${isActive ? 'border-blue-600 ' : 'border-gray-200 '}`}>
                    <h3 className={`text-2xl md:text-3xl font-bold transition-colors duration-500 ${isActive ? 'text-[#111A4A] ' : 'text-gray-400  group-hover:text-gray-600 '}`}>
                      {step.title}
                    </h3>
                    
                    {/* Animated Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 pb-2">
                            <p className="text-lg text-[#15172B]/70  leading-relaxed max-w-md">
                                {step.desc}
                            </p>
                            <div className="mt-8 flex items-center gap-2 text-blue-600  font-bold text-sm uppercase tracking-wider group/link w-fit">
                                <span>Discover More</span>
                                <motion.span 
                                    className="inline-block transition-transform duration-300 group-hover/link:translate-x-2"
                                >
                                    →
                                </motion.span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Sticky Visual Cart */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-32 h-[360px] md:h-[480px] rounded-[2rem] overflow-hidden relative shadow-2xl ">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 w-full h-full bg-gradient-to-br ${WORKFLOW[activeIndex].color} flex items-center justify-center p-6 md:p-12`}
              >
                {/* Abstract Glass Shape representing the active image cart */}
                <div className="w-full h-full bg-white/10  backdrop-blur-2xl rounded-3xl border border-white/20 flex flex-col items-center justify-center text-white relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                    
                    {/* Lighting Orbs */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-[64px] -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/30 rounded-full blur-[64px] translate-y-1/3 -translate-x-1/3"></div>

                    {/* Interactive Animated Component replacing the static icon */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        {(() => {
                            const Animation = WORKFLOW[activeIndex].AnimationComponent;
                            return <Animation />;
                        })()}
                    </div>
                    


                    {/* Interactive background grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_32px] opacity-30 pointer-events-none"></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
