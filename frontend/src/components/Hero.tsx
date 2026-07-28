"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Layers, CheckCircle2, Maximize, Settings, HeadphonesIcon, ClipboardList } from "lucide-react";

export default function Hero() {
  const floatingIcons = [
    { icon: <Layers size={24} />, label: "One Platform", delay: 0, position: "-top-8 -left-8" },
    { icon: <ClipboardList size={24} />, label: "Total Solutions", delay: 1, position: "top-1/4 -left-20" },
    { icon: <Settings size={24} />, label: "Smart Automation", delay: 2, position: "bottom-1/4 -left-16" },
    { icon: <CheckCircle2 size={24} />, label: "Secure & Reliable", delay: 0.5, position: "-top-8 -right-8" },
    { icon: <Maximize size={24} />, label: "Scalable & Flexible", delay: 1.5, position: "top-1/4 -right-20" },
    { icon: <HeadphonesIcon size={24} />, label: "24/7 Support", delay: 2.5, position: "bottom-1/4 -right-16" },
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4">
              WELCOME TO IT SOFTLAB 360
            </h2>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              World's Highest Company <br />
              to Provide <span className="text-blue-500 text-glow">All Solutions</span> <br />
              <span className="text-blue-500 text-glow">in 1 Place</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">
              One Platform, Endless Possibilities. <br />
              Empowering businesses with smart, integrated <br />
              and innovative solutions for a digital tomorrow.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                EXPLORE SOLUTIONS <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2 bg-transparent border border-gray-600 hover:border-gray-400 hover:bg-gray-800/50 text-white px-8 py-4 rounded-full font-medium transition-all">
                WATCH VIDEO <PlayCircle size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Content - 3D Globe Area */}
        <div className="relative z-10 flex justify-center items-center h-[500px]">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]"></div>
          
          {/* Main Globe (Placeholder using CSS styling and rotation) */}
          <motion.div 
            className="relative w-[300px] h-[300px] rounded-full border border-blue-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#020617] to-[#020617]"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          >
             {/* Grid overlay to mimic globe lines */}
             <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-screen"></div>
             
             {/* Center Logo in Globe */}
             <div className="absolute flex flex-col items-center justify-center pointer-events-none" style={{ transform: 'rotate(-' + '0' + 'deg)' }}>
                <div className="w-16 h-16 bg-blue-600 rounded-xl mb-3 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                  <div className="w-8 h-8 border-2 border-white transform rotate-45"></div>
                </div>
                <h3 className="text-xl font-bold text-white text-center">IT SOFTLAB <span className="text-blue-400">360</span></h3>
                <p className="text-xs text-gray-400 text-center mt-1">All Solutions. One Destination.</p>
             </div>
          </motion.div>

          {/* Orbiting Icons */}
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              className={`absolute flex flex-col items-center gap-2 ${item.position}`}
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-14 h-14 rounded-full border border-blue-500/30 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                {item.icon}
              </div>
              <span className="text-xs text-gray-300 font-medium whitespace-nowrap">{item.label}</span>
            </motion.div>
          ))}
          
          {/* Orbit Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-blue-500/10 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-blue-500/5 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}
