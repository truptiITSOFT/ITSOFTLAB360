"use client";

import { motion } from "framer-motion";
import { Handshake, Wrench, LifeBuoy, TrendingUp } from "lucide-react";

const STAGES = [
  { id: "01", title: "Sell", desc: "Offer ITSoftLab360 products to local and national businesses.", icon: Handshake, color: "from-blue-400 to-blue-600" },
  { id: "02", title: "Implement", desc: "Deploy solutions customized to the business requirements.", icon: Wrench, color: "from-indigo-400 to-indigo-600" },
  { id: "03", title: "Support", desc: "Maintain long-term client relationships and recurring revenue.", icon: LifeBuoy, color: "from-[#EB3158]/70 to-[#EB3158]" },
  { id: "04", title: "Grow", desc: "Expand into additional industries, products, and regions.", icon: TrendingUp, color: "from-emerald-400 to-emerald-600" },
];

export default function BusinessEngine() {
  return (
    <section className="relative py-24 bg-[#f8fafc]  transition-colors duration-300 overflow-hidden">
      <div className="max-w-[960px] mx-auto px-6 md:px-10 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[#111A4A]  mb-4"
          >
            The Franchise <span className="text-[#EB3158]">Business Engine</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Continuous progress line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200  -translate-y-1/2 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: "0%" }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true, margin: "-80px" }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-full bg-gradient-to-r from-blue-500 via-[#EB3158] to-emerald-500"
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {STAGES.map((stage, index) => (
              <motion.div 
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Stage Icon Node */}
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-white  border-[3.2px] border-white  shadow-xl flex items-center justify-center mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-300`}>
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${stage.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  <stage.icon size={32} className={`text-transparent bg-clip-text bg-gradient-to-br ${stage.color} drop-shadow-sm`} style={{ stroke: 'url(#gradient-' + index + ')' }} />
                  
                  {/* SVG Gradient Defs for icons */}
                  <svg width="0" height="0">
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop stopColor={index === 2 ? '#EB3158' : index === 3 ? '#10B981' : '#3B82F6'} offset="0%" />
                      <stop stopColor={index === 2 ? '#be123c' : index === 3 ? '#059669' : '#1d4ed8'} offset="100%" />
                    </linearGradient>
                  </svg>
                </div>
                
                {/* Stage Number */}
                <div className="absolute top-0 right-1/2 translate-x-[16px] md:translate-x-[32px] text-6xl font-black text-gray-100  -z-10 group-hover:text-blue-50  transition-colors pointer-events-none select-none">
                  {stage.id}
                </div>

                <h3 className="text-xl font-bold text-[#111A4A]  mb-3">{stage.title}</h3>
                <p className="text-sm text-[#15172B]/70  leading-relaxed max-w-[200px]">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
