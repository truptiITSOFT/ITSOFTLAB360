"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Download, Users, Briefcase, Truck, Folder, Calculator, GraduationCap, BarChart, Package, Megaphone, ShoppingCart, UserCheck, Settings, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FranchisePromo() {
  const points = [
    "Complete 12-Solution Portfolio",
    "Centralized Franchise Support",
    "Training and Sales Enablement",
    "Recurring Business Opportunity"
  ];

  const products = [
    // Left Loop
    { name: "HRMS", icon: Users, top: "20%", left: "25%", color: "text-[#4AA8D8]", shadow: "shadow-[#4AA8D8]/30" },
    { name: "Document Mgt", icon: Folder, top: "45%", left: "10%", color: "text-[#4AA8D8]", shadow: "shadow-[#4AA8D8]/30" },
    { name: "Queue Mgt", icon: Users, top: "70%", left: "20%", color: "text-[#4AA8D8]", shadow: "shadow-[#4AA8D8]/30" },
    { name: "POS", icon: Calculator, top: "85%", left: "40%", color: "text-[#20B486]", shadow: "shadow-[#20B486]/30" },
    { name: "LMS", icon: GraduationCap, top: "80%", left: "60%", color: "text-[#20B486]", shadow: "shadow-[#20B486]/30" },
    { name: "Sales Force", icon: BarChart, top: "75%", left: "75%", color: "text-[#20B486]", shadow: "shadow-[#20B486]/30" },
    // Right Loop
    { name: "CRM", icon: UserCheck, top: "15%", left: "45%", color: "text-[#20B486]", shadow: "shadow-[#20B486]/30" },
    { name: "ERP", icon: Briefcase, top: "18%", left: "70%", color: "text-[#EB3158]", shadow: "shadow-[#EB3158]/30" },
    { name: "Dealer Mgt", icon: Settings, top: "25%", left: "85%", color: "text-[#EB3158]", shadow: "shadow-[#EB3158]/30" },
    { name: "Vendor Mgt", icon: ShoppingCart, top: "50%", left: "92%", color: "text-[#EB3158]", shadow: "shadow-[#EB3158]/30" },
    { name: "Marketing", icon: Megaphone, top: "70%", left: "88%", color: "text-[#EB3158]", shadow: "shadow-[#EB3158]/30" },
    { name: "Supply Chain", icon: Truck, top: "85%", left: "75%", color: "text-[#EB3158]", shadow: "shadow-[#EB3158]/30" },
  ];

  return (
    <section id="franchise" className="py-24 bg-white dark:bg-[#030816] relative overflow-hidden transition-colors duration-300">

      {/* Background Abstract Waves */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-20 pointer-events-none">
        <svg viewBox="0 0 1440 800" className="w-full h-full object-cover">
          <motion.path
            initial={{ d: "M0,400 C300,500 600,300 900,400 C1200,500 1440,300 1440,300 L1440,800 L0,800 Z" }}
            animate={{ d: "M0,350 C300,250 600,450 900,350 C1200,250 1440,450 1440,450 L1440,800 L0,800 Z" }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            fill="url(#wave-gradient)"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#111A4A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EB3158" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-[1120px] mx-auto px-6 md:px-10 relative z-10 flex flex-col gap-16">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Content */}
          <div className="w-full lg:w-[45%]">
            <span className="text-xs font-bold tracking-widest text-[#20B486] uppercase mb-4 block">
              IT Franchise Opportunity
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#111A4A] dark:text-white tracking-tight mb-6 leading-tight">
              Build your technology business with the ITSoftLab360 product ecosystem.
            </h2>
            <p className="text-lg text-[#15172B]/80 dark:text-white/70 leading-relaxed mb-8">
              Offer all 12 integrated business products through one scalable platform, backed by training, sales enablement, implementation guidance, and a recurring business opportunity.
            </p>

            <ul className="flex flex-col gap-4 mb-10">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-[#15172B] dark:text-white/90 font-medium"
                >
                  <div className="w-5 h-5 rounded-full bg-[#20B486] flex items-center justify-center shadow-[0_0_10px_rgba(32,180,134,0.4)]">
                    <CheckCircle2 className="text-white w-3.5 h-3.5" />
                  </div>
                  {point}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#"
                className="flex items-center justify-center gap-2 bg-[#20B486] hover:bg-[#1a936d] text-white px-8 py-3.5 rounded-full font-bold shadow-[0_8px_25px_rgba(32,180,134,0.3)] transition-all hover:-translate-y-1"
              >
                Become a Partner <ArrowRight size={18} />
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center gap-2 bg-transparent border border-[#111A4A]/20 dark:border-white/20 hover:border-[#111A4A]/50 dark:hover:border-white/50 text-[#111A4A] dark:text-white px-8 py-3.5 rounded-full font-bold transition-all hover:-translate-y-1 hover:bg-[#111A4A]/5 dark:hover:bg-white/5"
              >
                <Download size={18} /> Download Overview
              </Link>
            </div>
          </div>

          {/* Right Visual (12-Solution Image) */}
          <div className="w-full lg:w-[55%] relative flex justify-center items-center">
            <Image 
              src="/12-it-solutions.png" 
              alt="12 IT Solutions Ecosystem" 
              width={800} 
              height={800} 
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>


        {/* Bottom Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl bg-gray-50/50 dark:bg-[#060D1E]/50 border border-[#111A4A]/5 dark:border-white/5 backdrop-blur-sm">
          
          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-full bg-[#20B486]/10 flex items-center justify-center">
              <Package className="text-[#20B486] w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#111A4A] dark:text-white text-sm">12 Products</h4>
              <p className="text-xs text-[#15172B]/60 dark:text-gray-400">Integrated business products on one platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-full bg-[#A855F7]/10 flex items-center justify-center">
              <ShieldCheck className="text-[#A855F7] w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#111A4A] dark:text-white text-sm">360° Support</h4>
              <p className="text-xs text-[#15172B]/60 dark:text-gray-400">Training, sales, and implementation guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-full bg-[#4AA8D8]/10 flex items-center justify-center">
              <BarChart className="text-[#4AA8D8] w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#111A4A] dark:text-white text-sm">Recurring Revenue</h4>
              <p className="text-xs text-[#15172B]/60 dark:text-gray-400">Build predictable long-term business growth</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-full bg-[#EB3158]/10 flex items-center justify-center">
              <Zap className="text-[#EB3158] w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#111A4A] dark:text-white text-sm">Proven Framework</h4>
              <p className="text-xs text-[#15172B]/60 dark:text-gray-400">Designed for scalable franchise success</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
