"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const solutions = [
  { 
    id: 1, 
    title: "HRMS\nSoftware", 
    desc: "Manage your workforce efficiently with complete automation.", 
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#3B82F6]" 
  },
  { 
    id: 2, 
    title: "Customer Relationship\nManagement", 
    desc: "Build better customer relationships and drive sales.", 
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#8B5CF6]" 
  },
  { 
    id: 3, 
    title: "Enterprise Resource\nPlanning", 
    desc: "Streamline your entire business operations.", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#10B981]" 
  },
  { 
    id: 4, 
    title: "Dealer\nManagement", 
    desc: "Empower your dealer network and track performance.", 
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#F59E0B]" 
  },
  { 
    id: 5, 
    title: "Vendor\nManagement", 
    desc: "Optimize vendor collaborations and supply flow.", 
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#EC4899]" 
  },
  { 
    id: 6, 
    title: "Marketing\nAutomation", 
    desc: "Automate and scale your marketing campaigns.", 
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#EF4444]" 
  },
  { 
    id: 7, 
    title: "Supply Chain\n& Logistics", 
    desc: "Track shipments end-to-end securely.", 
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#6366F1]" 
  },
  { 
    id: 8, 
    title: "Sales Force\nAutomation", 
    desc: "Boost your sales team productivity instantly.", 
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#14B8A6]" 
  },
  { 
    id: 9, 
    title: "Learning\nManagement", 
    desc: "Train and upskill your growing teams.", 
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#F97316]" 
  },
  { 
    id: 10, 
    title: "Retail\nPOS", 
    desc: "Simplify retail transactions and inventory.", 
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#06B6D4]" 
  },
  { 
    id: 11, 
    title: "Queue\nManagement", 
    desc: "Enhance customer wait experience seamlessly.", 
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#84CC16]" 
  },
  { 
    id: 12, 
    title: "Document\nManagement", 
    desc: "Digitize, organize, and secure your files.", 
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80", 
    theme: "text-[#64748B]" 
  }
];

export default function CityLandscapeSection() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Duplicate array for infinite scroll seamless looping
  const repeatedSolutions = [...solutions, ...solutions];

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#020617] pt-24 pb-0 min-h-[560px] flex flex-col justify-end">
      
      {/* Floating Elements (Background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-3 h-3 rounded-full bg-blue-400"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[12%] text-blue-300 text-xl font-bold"
        >
          +
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 45, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[20%] w-8 h-8 rounded-full border border-gray-400/50"
        />
        <motion.div 
          animate={{ y: [0, 25, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[15%] w-2 h-2 rounded-full bg-[#EB3158]"
        />
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[45%] text-blue-300 text-xl font-bold"
        >
          +
        </motion.div>
        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[28%] left-[60%] text-blue-300 text-xl font-bold"
        >
          +
        </motion.div>
      </div>

      {/* The City Landscape Background */}
      <div className="absolute bottom-0 left-0 w-full h-[400px] pointer-events-none z-0 overflow-hidden flex items-end">
        
        {/* Landscape Layer (Light Blue Silhouettes) */}
        <div 
          className="absolute bottom-6 flex whitespace-nowrap opacity-100 w-[200%] landscape-animate"
          style={{ animationDuration: '60s' }}
        >
          {[1, 2].map((_, i) => (
             <div key={i} className="flex items-end h-[280px] w-1/2 shrink-0 text-[#a8ddeb] fill-current">
                {/* Opera House / Building */}
                <svg width="200" height="150" viewBox="0 0 200 150" className="shrink-0 ml-10">
                   <path d="M10,150 Q50,50 100,150 Z" />
                   <path d="M40,150 Q100,20 150,150 Z" />
                   <path d="M100,150 Q150,80 190,150 Z" />
                   <rect x="0" y="145" width="200" height="5" />
                </svg>
                {/* Factories with smoke */}
                <svg width="250" height="200" viewBox="0 0 250 200" className="shrink-0 ml-10">
                   {/* Smoke */}
                   <circle cx="70" cy="50" r="20" className="fill-[#e1f4fa] opacity-80" />
                   <circle cx="90" cy="40" r="25" className="fill-[#e1f4fa] opacity-80" />
                   <circle cx="120" cy="30" r="30" className="fill-[#e1f4fa] opacity-80" />
                   {/* Buildings */}
                   <rect x="10" y="140" width="40" height="60" />
                   <path d="M10,140 L30,120 L50,140 Z" />
                   
                   <rect x="50" y="100" width="40" height="100" />
                   <path d="M50,100 L70,80 L90,100 Z" />
                   
                   <rect x="90" y="80" width="30" height="120" />
                   <rect x="120" y="120" width="50" height="80" />
                   <path d="M120,120 L145,100 L170,120 Z" />
                   
                   {/* Windows */}
                   <rect x="60" y="110" width="8" height="15" className="fill-[#e1f4fa]" />
                   <rect x="60" y="135" width="8" height="15" className="fill-[#e1f4fa]" />
                   <rect x="100" y="95" width="8" height="15" className="fill-[#e1f4fa]" />
                   <rect x="100" y="120" width="8" height="15" className="fill-[#e1f4fa]" />
                   <rect x="135" y="135" width="8" height="15" className="fill-[#e1f4fa]" />
                   <rect x="0" y="195" width="250" height="5" />
                </svg>
                {/* Trees */}
                <svg width="100" height="120" viewBox="0 0 100 120" className="shrink-0 ml-4">
                   <circle cx="50" cy="50" r="40" />
                   <rect x="45" y="80" width="10" height="40" className="fill-[#8bcce0]" />
                   <rect x="0" y="115" width="100" height="5" />
                </svg>
                {/* Statue (Placeholder resembling Statue of Unity) */}
                <svg width="150" height="300" viewBox="0 0 150 300" className="shrink-0 ml-16 text-[#e1f4fa]">
                   <rect x="50" y="280" width="50" height="20" className="fill-[#a8ddeb]" />
                   <rect x="55" y="260" width="40" height="20" className="fill-[#a8ddeb]" />
                   <path d="M65,100 Q75,40 85,100 L95,260 L55,260 Z" className="fill-[#a8ddeb]" />
                   <circle cx="75" cy="80" r="15" className="fill-[#a8ddeb]" />
                   <rect x="0" y="295" width="150" height="5" className="fill-[#a8ddeb]" />
                </svg>
                {/* Solar Panels */}
                <svg width="150" height="60" viewBox="0 0 150 60" className="shrink-0 ml-10">
                   <path d="M10,60 L40,20 L80,20 L50,60 Z" />
                   <path d="M70,60 L100,20 L140,20 L110,60 Z" />
                   <rect x="0" y="55" width="150" height="5" />
                </svg>
                {/* Windmills */}
                <svg width="120" height="250" viewBox="0 0 120 250" className="shrink-0 ml-10">
                   <line x1="60" y1="250" x2="60" y2="80" stroke="currentColor" strokeWidth="6" />
                   {/* Blades */}
                   <g transform="translate(60, 80)">
                     <circle cx="0" cy="0" r="5" />
                     <path d="M0,0 L10,-60 L-10,-60 Z" />
                     <path d="M0,0 L60,30 L50,45 Z" />
                     <path d="M0,0 L-60,30 L-50,45 Z" />
                   </g>
                   <rect x="0" y="245" width="120" height="5" />
                </svg>
             </div>
          ))}
        </div>

        {/* Foreground Road */}
        <div className="absolute bottom-0 left-0 w-full h-6 bg-[#bdecfa] dark:bg-gray-800">
           {/* Orange Dotted Line */}
           <div className="absolute top-1/2 left-0 w-[200%] h-[2.4px] -translate-y-1/2 landscape-animate" style={{ animationDuration: '10s' }}>
              <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #f97316 50%, transparent 50%)', backgroundSize: '48px 100%' }}></div>
           </div>
        </div>
      </div>

      {/* Billboards Track */}
      <div 
        className="relative z-20 w-full mb-[19.2px] overflow-hidden flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="flex gap-40 px-32 w-[max-content] landscape-animate"
          style={{ 
            animationDuration: '70s',
            animationPlayState: isHovered ? 'paused' : 'running'
          }}
        >
          {repeatedSolutions.map((solution, index) => (
            <div key={`${solution.id}-${index}`} className="relative group shrink-0 flex flex-col items-center">
              
              {/* Billboard Poster */}
              <div className="w-[232px] h-[328px] bg-white dark:bg-[#1A2235] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] transition-all duration-500 rounded-lg overflow-hidden relative z-10 flex flex-col pt-5 group/card">
                 {/* Top hooks */}
                 <div className="absolute top-0 left-0 w-full flex justify-around p-1 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-[1.6px] h-2.5 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="w-[1.6px] h-2.5 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="w-[1.6px] h-2.5 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="w-[1.6px] h-2.5 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="w-[1.6px] h-2.5 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="w-[1.6px] h-2.5 bg-gray-300 dark:bg-gray-600"></div>
                 </div>

                 <div className="flex items-center justify-center mb-3 px-5 mt-1 h-7">
                    <img src="/logo.png" alt="ITSoftlab360 Logo" className="h-full w-auto object-contain drop-shadow-sm" />
                 </div>
                 
                 <div className="flex-grow flex flex-col items-center justify-center text-center relative z-10 px-5 pb-2">
                   <h3 className={`text-xl font-bold mb-2 leading-tight whitespace-pre-line ${solution.theme}`}>
                     {solution.title}
                   </h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-3 line-clamp-2">
                     {solution.desc}
                   </p>
                   
                   <Link href="/demo" className="block">
                     <button className="border-2 border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 font-bold px-6 py-1.5 rounded-full hover:bg-[#0ea5e9] hover:border-[#0ea5e9] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 transform group-hover/card:-translate-y-1">
                       Get a Free Demo
                     </button>
                   </Link>
                 </div>
                 
                 {/* Image */}
                 <div className="w-full h-[112px] relative overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                    <img 
                      src={solution.image} 
                      alt={solution.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                    />
                    {/* Bottom grid/fence visual detail */}
                    <div className="absolute bottom-0 left-0 w-full h-5 bg-gray-900/10 dark:bg-black/30" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '6.4px 6.4px', backgroundPosition: '0 0, 3.2px 3.2px', opacity: 0.15 }}></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900 dark:bg-black"></div>
                 </div>
              </div>

              {/* Billboard Poles (connecting to the ground) */}
              <div className="flex flex-col items-center mt-0 z-0">
                <div className="w-12 h-[96px] bg-gradient-to-r from-[#8bcce0] via-[#a8ddeb] to-[#8bcce0] dark:from-gray-700 dark:via-gray-600 dark:to-gray-800 border-x border-[#8bcce0] opacity-80"></div>
                {/* Base */}
                <div className="w-20 h-4 bg-[#8bcce0] dark:bg-gray-700 rounded-t-sm"></div>
                <div className="w-24 h-2 bg-[#7ab9cd] dark:bg-gray-800"></div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes landscapeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .landscape-animate {
          animation: landscapeScroll linear infinite;
        }
      `}} />
    </section>
  );
}
