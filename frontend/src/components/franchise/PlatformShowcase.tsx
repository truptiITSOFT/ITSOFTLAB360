"use client";

import { motion } from "framer-motion";

export default function PlatformShowcase() {
  return (
    <section className="relative py-32 bg-[#111A4A] overflow-hidden perspective-1000">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-[#030816] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#030816] to-transparent"></div>
      </div>

      <div className="max-w-[960px] mx-auto px-6 md:px-10 relative z-10 text-center mb-16 md:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white mb-4"
        >
          A Unified <span className="text-[#EB3158]">Franchise Platform</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-blue-100/70 max-w-2xl mx-auto"
        >
          Manage all your software deployments, client licenses, and revenue through a single, powerful enterprise dashboard.
        </motion.p>
      </div>

      {/* 3D Dashboard Mockup Area */}
      <div className="relative w-full max-w-[800px] mx-auto aspect-video md:aspect-[21/9] flex items-center justify-center transform-style-3d px-4">
        
        {/* Main Central Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="absolute z-30 w-[80%] md:w-[60%] h-[70%] bg-[#0f172a] rounded-xl border border-gray-700 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden hover:scale-105 hover:-translate-y-4 hover:rotate-x-0 transition-all duration-500"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Mock Header */}
          <div className="h-6 md:h-8 border-b border-gray-700 flex items-center px-3 gap-1.5 bg-[#1e293b]">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="mx-auto text-[6.4px] md:text-[8px] text-gray-400 font-medium tracking-widest uppercase">ITSoftLab360 Master Dashboard</div>
          </div>
          {/* Mock Body */}
          <div className="p-4 flex gap-4 h-[calc(100%-2rem)]">
             <div className="w-1/4 h-full border-r border-gray-800 flex flex-col gap-2">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className={`h-4 rounded bg-gray-800/50 ${i === 1 ? 'w-full bg-blue-500/20' : 'w-3/4'}`}></div>
               ))}
             </div>
             <div className="flex-1 flex flex-col gap-4">
               <div className="flex gap-4">
                 <div className="flex-1 h-16 md:h-20 bg-blue-900/20 rounded border border-blue-500/20"></div>
                 <div className="flex-1 h-16 md:h-20 bg-[#EB3158]/10 rounded border border-[#EB3158]/20"></div>
                 <div className="flex-1 h-16 md:h-20 bg-green-900/20 rounded border border-green-500/20"></div>
               </div>
               <div className="flex-1 bg-gray-800/30 rounded border border-gray-800 p-2">
                 <div className="w-full h-full border-b border-gray-700 relative">
                    {/* Mock Graph Line */}
                    <svg className="absolute bottom-0 left-0 w-full h-[80%] overflow-visible">
                      <polyline points="0,40 50,20 100,50 150,10 200,30" fill="none" stroke="#3B82F6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    </svg>
                 </div>
               </div>
             </div>
          </div>
        </motion.div>

        {/* Floating Background Panels */}
        
        {/* Left Floating Panel (CRM) */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: 15 }}
          whileInView={{ opacity: 0.6, x: -120, rotateY: 15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute z-20 w-[40%] md:w-[30%] h-[50%] bg-[#1e293b] rounded-lg border border-gray-700 shadow-2xl overflow-hidden hidden md:block hover:opacity-100 hover:z-40 hover:scale-110 hover:-translate-x-[112px] hover:rotate-y-0 transition-all duration-500"
          style={{ transform: "translateZ(-16px)" }}
        >
          <div className="h-6 border-b border-gray-700 bg-gray-800 flex items-center px-3 justify-between">
            <div className="text-[6.4px] text-gray-400 font-bold">CRM Module</div>
          </div>
          <div className="p-3 grid grid-cols-2 gap-2 h-full">
            <div className="col-span-2 h-6 bg-gray-800 rounded"></div>
            <div className="bg-gray-800 rounded h-12"></div>
            <div className="bg-gray-800 rounded h-12"></div>
          </div>
        </motion.div>

        {/* Right Floating Panel (POS) */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: -15 }}
          whileInView={{ opacity: 0.6, x: 120, rotateY: -15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute z-20 w-[40%] md:w-[30%] h-[60%] bg-[#1e293b] rounded-lg border border-gray-700 shadow-2xl overflow-hidden hidden md:block hover:opacity-100 hover:z-40 hover:scale-110 hover:translate-x-[112px] hover:rotate-y-0 transition-all duration-500"
          style={{ transform: "translateZ(16px)" }}
        >
          <div className="h-6 border-b border-gray-700 bg-gray-800 flex items-center px-3 justify-between">
            <div className="text-[6.4px] text-gray-400 font-bold">POS Terminal</div>
          </div>
          <div className="p-3 flex gap-2 h-[calc(100%-1.5rem)]">
            <div className="flex-1 bg-gray-800 rounded"></div>
            <div className="w-1/3 bg-gray-700 rounded border border-gray-600"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
