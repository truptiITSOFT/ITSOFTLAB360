"use client";

import { motion } from "framer-motion";
import { Database, CheckCircle, Users, BarChart2, Shield, MessageCircle, UserPlus, MapPin, Coins, LayoutDashboard } from "lucide-react";
import { useEffect, useRef } from "react";

export default function WorkflowSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Reset to start if we reached the end
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll by roughly one card width
          scrollRef.current.scrollBy({ left: clientWidth > 1024 ? clientWidth / 3 : clientWidth > 768 ? clientWidth / 2 : clientWidth, behavior: "smooth" });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      id: "01",
      title: "Unlimited Users",
      desc: "No per-user licensing cost. Add unlimited users with role-based access control for secure system usage.",
      bg: "bg-[#FFF1F2] ",
      accent: "text-[#F43F5E]",
      delay: 0.1,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40 ">
           <div className="relative w-32 h-32 flex justify-center items-center">
             <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-32 h-32 border-2 border-dashed border-[#F43F5E]/20 rounded-full" />
             
             {[0, 1, 2, 3, 4].map((i) => {
               const angle = (i * 72 * Math.PI) / 180;
               const x = Math.sin(angle) * 55;
               const y = -Math.cos(angle) * 55;
               return (
                 <motion.div
                   key={i}
                   animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                   transition={{ duration: 4, delay: i * 0.8, repeat: Infinity, times: [0, 0.1, 0.8, 1] }}
                   className="absolute w-12 h-12 bg-white  rounded-full shadow-lg border border-[#F43F5E]/20 flex items-center justify-center z-10"
                   style={{ x, y }}
                 >
                   <Users className="w-5 h-5 text-[#F43F5E]" />
                 </motion.div>
               );
             })}
             <div className="w-16 h-16 bg-[#F43F5E]/10 rounded-full flex items-center justify-center backdrop-blur-sm">
               <UserPlus className="w-8 h-8 text-[#F43F5E]" />
             </div>
           </div>
        </div>
      )
    },
    {
      id: "02",
      title: "Pay As You Go",
      desc: "Flexible pricing model where you pay only for what you use, making it cost-effective and scalable as your business grows.",
      bg: "bg-[#ECFDF5] ",
      accent: "text-[#10B981]",
      delay: 0.3,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40 ">
           <div className="relative w-16 h-24 flex flex-col justify-end items-center mb-4">
             {[0, 1, 2, 3].map((i) => (
               <motion.div
                 key={i}
                 initial={{ y: -50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ duration: 0.5, delay: i * 0.4, repeat: Infinity, repeatDelay: 2 }}
                 className="absolute w-12 h-4 rounded-full border-2 border-[#10B981] bg-white "
                 style={{ bottom: `${i * 10}px`, zIndex: 40 - i * 10 }}
               />
             ))}
             <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -right-16 top-2 w-14 h-14 bg-[#10B981] rounded-full shadow-lg flex items-center justify-center z-50">
               <Coins className="w-7 h-7 text-white" />
             </motion.div>
           </div>
        </div>
      )
    },
    {
      id: "03",
      title: "Dynamic Dashboards",
      desc: "Get real-time business insights through interactive dashboards tailored for owners and teams, enabling faster, data-driven decisions.",
      bg: "bg-[#EEF2FF] ",
      accent: "text-[#6366F1]",
      delay: 0.5,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40  p-4">
           <div className="w-full h-full grid grid-cols-2 gap-3 p-2 relative z-10">
             <motion.div 
               animate={{ scale: [0.95, 1, 0.95], opacity: [0.7, 1, 0.7] }} 
               transition={{ duration: 3, repeat: Infinity }} 
               className="col-span-2 h-10 bg-white  rounded-lg shadow-sm border border-[#6366F1]/20 flex items-center px-3 gap-2"
             >
               <LayoutDashboard className="w-4 h-4 text-[#6366F1]" />
               <div className="w-20 h-2 bg-gray-200  rounded-full" />
             </motion.div>
             <motion.div 
               animate={{ y: [0, -3, 0] }} 
               transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }} 
               className="h-16 bg-white  rounded-lg shadow-sm border border-[#6366F1]/20 flex flex-col justify-end p-2 gap-1 overflow-hidden"
             >
               <motion.div animate={{ height: ["0%", "100%", "50%"] }} transition={{ duration: 4, repeat: Infinity }} className="w-full bg-gradient-to-t from-[#6366F1]/40 to-[#6366F1]/10 rounded-sm" />
             </motion.div>
             <motion.div 
               animate={{ y: [0, -3, 0] }} 
               transition={{ duration: 2.5, delay: 1, repeat: Infinity }} 
               className="h-16 bg-white  rounded-lg shadow-sm border border-[#6366F1]/20 flex items-center justify-center"
             >
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-8 h-8 rounded-full border-4 border-[#6366F1]/20 border-t-[#6366F1]" />
             </motion.div>
           </div>
        </div>
      )
    },
    {
      id: "04",
      title: "Connected Business Data",
      desc: "Customer, employee, inventory, vendor, sales, document, and logistics data stay connected across the organization.",
      bg: "bg-[#E5F3FB]", // soft blue
      accent: "text-[#4AA8D8]",
      delay: 0.1,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40 ">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-32 h-32 rounded-full border-2 border-dashed border-[#4AA8D8]/30" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute w-48 h-48 rounded-full border border-[#4AA8D8]/20" />
          <div className="relative z-10 w-16 h-16 bg-white  rounded-2xl shadow-md  flex items-center justify-center">
            <Database className="text-[#4AA8D8] w-8 h-8" />
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-8 left-8 w-10 h-10 bg-white  rounded-xl shadow-sm  flex items-center justify-center">
            <div className="w-4 h-4 bg-[#EB3158] rounded-full" />
          </motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-10 right-10 w-12 h-12 bg-white  rounded-xl shadow-sm  flex items-center justify-center">
            <div className="w-5 h-5 bg-[#20B486] rounded-sm" />
          </motion.div>
        </div>
      )
    },
    {
      id: "05",
      title: "Organized Operations",
      desc: "Standardized workflows, approvals, alerts, tasks, and reports reduce manual effort and operational confusion.",
      bg: "bg-[#FFE9DF]", // soft peach
      accent: "text-[#EB3158]",
      delay: 0.3,
      visual: (
        <div className="relative w-full h-48 mt-8 flex flex-col justify-center items-center overflow-hidden rounded-xl bg-white/40  gap-3">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="w-4/5 h-10 bg-white  rounded-lg shadow-sm  border border-[#EB3158]/10 flex items-center px-4 justify-between"
            >
              <div className="w-1/2 h-2 bg-gray-100 rounded" />
              <CheckCircle className="text-[#EB3158] w-4 h-4" />
            </motion.div>
          ))}
          <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EB3158]/0 via-[#EB3158]/30 to-[#EB3158]/0" />
        </div>
      )
    },
    {
      id: "06",
      title: "Collaboration Across Teams",
      desc: "Departments work with shared information, real-time updates, controlled access, and better accountability.",
      bg: "bg-[#E5F7ED]", // soft mint
      accent: "text-[#20B486]",
      delay: 0.5,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40 ">
          <div className="w-full flex justify-around items-center px-4">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 bg-white  rounded-full shadow-md  flex items-center justify-center border border-[#20B486]/20 z-10">
              <Users className="text-[#20B486] w-5 h-5" />
            </motion.div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-[#20B486]/30 to-[#4AA8D8]/30 relative">
              <motion.div animate={{ left: ["0%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#111A4A] rounded-full shadow-md " />
            </div>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-14 h-14 bg-white  rounded-2xl shadow-md  flex items-center justify-center border border-[#4AA8D8]/20 z-10">
              <div className="w-6 h-6 rounded bg-[#4AA8D8]/20" />
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: "07",
      title: "Real-time Analytics",
      desc: "Gain instant insights with live dashboards, custom reports, and predictive data that drive smarter business decisions.",
      bg: "bg-[#F3E8FF] ",
      accent: "text-[#A855F7]",
      delay: 0.1,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-end overflow-hidden rounded-xl bg-white/40  p-6 gap-3">
          {[40, 70, 45, 90, 60].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-8 bg-gradient-to-t from-[#A855F7]/20 to-[#A855F7] rounded-t-md relative group"
            />
          ))}
          <div className="absolute top-4 left-4 w-10 h-10 bg-white  rounded-xl shadow-sm  flex items-center justify-center">
            <BarChart2 className="text-[#A855F7] w-5 h-5" />
          </div>
        </div>
      )
    },
    {
      id: "08",
      title: "Secure & Compliant",
      desc: "Enterprise-grade security protocols, automated backups, and strict access controls keep your sensitive data protected at all times.",
      bg: "bg-[#FFF4E5] ",
      accent: "text-[#F97316]",
      delay: 0.3,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40 ">
           <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="absolute w-32 h-32 bg-[#F97316]/20 rounded-full blur-2xl" />
           <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative z-10 w-20 h-20 bg-white  rounded-2xl shadow-xl  flex items-center justify-center border border-[#F97316]/20">
             <Shield className="w-10 h-10 text-[#F97316]" />
           </motion.div>
           <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-40 h-40 rounded-full border border-dashed border-[#F97316]/30" />
        </div>
      )
    },
    {
      id: "09",
      title: "Chat Between Users",
      desc: "Built-in internal chat enables real-time communication between users, improving collaboration and task coordination.",
      bg: "bg-[#EFF6FF] ",
      accent: "text-[#3B82F6]",
      delay: 0.5,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40 ">
           {/* Left Message */}
           <motion.div 
             animate={{ x: [-30, 0, 0, -30], opacity: [0, 1, 1, 0] }} 
             transition={{ duration: 4, repeat: Infinity, times: [0, 0.15, 0.85, 1] }} 
             className="absolute left-6 top-10 w-32 h-14 bg-white  rounded-2xl rounded-bl-none shadow-lg border border-[#3B82F6]/10 flex flex-col justify-center px-4 gap-2"
           >
             <div className="w-16 h-2 bg-gray-200  rounded-full" />
             <div className="w-10 h-2 bg-gray-200  rounded-full" />
           </motion.div>

           {/* Right Message */}
           <motion.div 
             animate={{ x: [30, 0, 0, 30], opacity: [0, 1, 1, 0] }} 
             transition={{ duration: 4, delay: 1.5, repeat: Infinity, times: [0, 0.15, 0.85, 1] }} 
             className="absolute right-6 bottom-10 w-32 h-14 bg-[#3B82F6] rounded-2xl rounded-br-none shadow-lg flex flex-col justify-center px-4 gap-2 items-end"
           >
             <div className="w-20 h-2 bg-white/70 rounded-full" />
             <div className="w-12 h-2 bg-white/40 rounded-full" />
           </motion.div>
           
           <MessageCircle className="w-12 h-12 text-[#3B82F6] opacity-10 absolute scale-150" />
        </div>
      )
    },
    {
      id: "10",
      title: "Multiple Inventory Location",
      desc: "Track stock movement across multiple warehouses, godowns, or sites with accurate availability and control.",
      bg: "bg-[#FEFCE8] ",
      accent: "text-[#EAB308]",
      delay: 0.1,
      visual: (
        <div className="relative w-full h-48 mt-8 flex justify-center items-center overflow-hidden rounded-xl bg-white/40 ">
           {/* Connecting Lines */}
           <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
             <motion.line x1="30%" y1="35%" x2="70%" y2="50%" stroke="#EAB308" strokeWidth="2" strokeDasharray="5,5" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} opacity={0.3} />
             <motion.line x1="70%" y1="50%" x2="45%" y2="75%" stroke="#EAB308" strokeWidth="2" strokeDasharray="5,5" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} opacity={0.3} />
             <motion.line x1="45%" y1="75%" x2="30%" y2="35%" stroke="#EAB308" strokeWidth="2" strokeDasharray="5,5" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} opacity={0.3} />
           </svg>

           {/* Location Pins with Ripple */}
           {[
             { top: "20%", left: "20%", delay: 0 },
             { top: "35%", left: "65%", delay: 1.5 },
             { top: "60%", left: "35%", delay: 3 }
           ].map((pos, i) => (
             <motion.div
               key={i}
               style={{ top: pos.top, left: pos.left }}
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 2, delay: pos.delay, repeat: Infinity }}
               className="absolute w-12 h-12 bg-white  rounded-xl shadow-lg border border-[#EAB308]/20 flex items-center justify-center z-10"
             >
               <MapPin className="w-5 h-5 text-[#EAB308]" />
               <motion.div animate={{ scale: [1, 2.5], opacity: [0.5, 0] }} transition={{ duration: 2, delay: pos.delay, repeat: Infinity }} className="absolute w-full h-full rounded-xl border-2 border-[#EAB308] pointer-events-none" />
             </motion.div>
           ))}
        </div>
      )
    }
  ];

  return (
    <section className="pb-16 md:pb-20 pt-0 bg-white transition-colors duration-300 relative">
      <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111A4A]  tracking-tight mb-6 leading-tight">
            Understand how connected solutions improve everyday work.
          </h2>
          <p className="text-lg text-[#15172B]  leading-relaxed">
            Start with the solutions your business needs today and expand as your operations grow.
          </p>
        </div>

        {/* Cards Auto Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 pt-4 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: card.delay }}
              className={`group flex flex-col p-6 md:p-8 rounded-[22.4px] ${card.bg} border border-white/50 shadow-sm  hover:shadow-[0_20px_40px_rgba(17,26,74,0.05)] hover:-translate-y-2 transition-all duration-500 min-w-[85vw] md:min-w-[calc(50%-12.8px)] lg:min-w-[calc(33.333%-17.1px)] snap-center md:snap-start`}
            >
              <span className={`text-5xl font-extrabold opacity-20 mb-6 font-mono ${card.accent}`}>
                {card.id}
              </span>
              <h3 className="text-2xl font-bold text-[#111A4A]  mb-4">
                {card.title}
              </h3>
              <p className="text-[#15172B]  leading-relaxed mb-8 flex-grow">
                {card.desc}
              </p>
              
              {card.visual}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
