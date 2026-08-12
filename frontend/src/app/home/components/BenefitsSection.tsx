"use client";

import { motion } from "framer-motion";
import { Database, BarChart3, ShieldCheck, Cog, Building2, Smartphone } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Database,
      title: "Centralized Business Information",
      desc: "Single source of truth for all data.",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics and Reports",
      desc: "Live dashboards and automated reporting.",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      icon: ShieldCheck,
      title: "Secure Role-Based Access",
      desc: "Strict permissions and data privacy.",
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      icon: Cog,
      title: "Workflow and Approval Automation",
      desc: "Custom rules to remove manual steps.",
      color: "text-pink-500",
      bg: "bg-pink-50"
    },
    {
      icon: Building2,
      title: "Scalable Multi-Branch Architecture",
      desc: "Built for franchises and enterprises.",
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: Smartphone,
      title: "Mobile and Desktop Accessibility",
      desc: "Work from any device, anywhere.",
      color: "text-teal-500",
      bg: "bg-teal-50"
    }
  ];

  return (
    <section className="py-24 bg-white  transition-colors duration-300 border-y border-[#111A4A]  relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#EEF0FF]/60 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none -z-10" />

      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column */}
          <div className="w-full lg:w-[45%]">
            <span className="text-xs font-bold tracking-widest text-[#EB3158] uppercase mb-4 block">
              Built for Modern Enterprises
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#111A4A]  tracking-tight mb-6 leading-tight">
              Everything your business needs to operate, grow, and scale.
            </h2>
            <p className="text-lg text-[#15172B]  leading-relaxed mb-8">
              Replace disconnected tools with a secure and scalable software ecosystem designed for growing organizations, enterprises, and franchise partners.
            </p>
          </div>

          {/* Right Column (Grid) */}
          <div className="w-full lg:w-[55%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex gap-4"
                >
                  <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${benefit.bg} ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#111A4A]  mb-1 group-hover:text-[#EB3158] transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-[#15172B]  leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
