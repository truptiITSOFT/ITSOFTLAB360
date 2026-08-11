"use client";

import { motion } from "framer-motion";
import { Package, Copy, Users, Globe2, Network } from "lucide-react";

const STAGES = [
  { id: 1, title: "1 Product", icon: Package },
  { id: 2, title: "Multiple Products", icon: Copy },
  { id: 3, title: "Multiple Clients", icon: Users },
  { id: 4, title: "Multiple Industries", icon: Globe2 },
  { id: 5, title: "Regional Tech Business", icon: Network },
];

export default function GrowthVisualization() {
  return (
    <section className="relative py-24 bg-white dark:bg-[#030816] overflow-hidden transition-colors duration-300">
      <div className="max-w-[960px] mx-auto px-6 md:px-10 relative z-10 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-[#111A4A] dark:text-white mb-4"
        >
          Start Local. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#EB3158]">Scale Boundlessly.</span>
        </motion.h2>

        <div className="mt-20 relative flex flex-col md:flex-row items-center justify-between w-full max-w-[800px] mx-auto">
          
          {/* Animated Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -translate-y-1/2 hidden md:block z-0">
             <motion.div 
               initial={{ width: "0%" }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true, margin: "-80px" }}
               transition={{ duration: 2, ease: "easeInOut" }}
               className="h-full bg-blue-500"
             />
          </div>

          {/* Vertical line for mobile */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-100 dark:bg-gray-800 -translate-x-1/2 md:hidden z-0">
             <motion.div 
               initial={{ height: "0%" }}
               whileInView={{ height: "100%" }}
               viewport={{ once: true, margin: "-80px" }}
               transition={{ duration: 2, ease: "easeInOut" }}
               className="w-full bg-blue-500"
             />
          </div>

          {/* Nodes */}
          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.4, type: "spring", bounce: 0.4 }}
              className="relative z-10 flex flex-col items-center gap-4 my-6 md:my-0 group"
            >
              {/* Expanding Ripple Effect */}
              <div className="absolute inset-0 w-full h-full -z-10">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 2, opacity: [0, 0.2, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, repeatDelay: 1 }}
                  className="w-full h-full rounded-full bg-blue-500/30"
                />
              </div>

              {/* Node Icon */}
              <div className={`
                w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl
                ${i === STAGES.length - 1 ? 'bg-[#111A4A] dark:bg-white text-white dark:text-[#111A4A] scale-110 shadow-[0_0_30px_rgba(17,26,74,0.3)] dark:shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'bg-white dark:bg-[#0f172a] text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900'}
              `}>
                <stage.icon size={i === STAGES.length - 1 ? 32 : 24} />
              </div>

              {/* Node Text */}
              <div className={`font-bold text-center max-w-[96px] transition-colors ${i === STAGES.length - 1 ? 'text-[#111A4A] dark:text-white text-lg' : 'text-[#15172B]/70 dark:text-gray-400 text-sm'}`}>
                {stage.title}
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
