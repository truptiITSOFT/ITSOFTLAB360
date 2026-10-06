"use client";

import { motion } from "framer-motion";
import { Monitor, Store, Settings, BarChart } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Start With Platform",
    description: "Get onboarded and set up your system",
    icon: <Monitor size={24} />
  },
  {
    num: "02",
    title: "Launch Franchise Network",
    description: "Onboard franchisees & set up branches",
    icon: <Store size={24} />
  },
  {
    num: "03",
    title: "Manage Branch Operations",
    description: "Monitor performance, sales & operations",
    icon: <Settings size={24} />
  },
  {
    num: "04",
    title: "Scale & Grow",
    description: "Optimize, expand & increase profitability",
    icon: <BarChart size={24} />
  }
];

export default function FranchiseHowItWorks() {
  return (
    <section className="py-20 relative bg-white  border-t border-[#111A4A]/10  transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-[#111A4A]  mb-2 transition-colors">How It Works</h2>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200  border-b border-dashed border-gray-300  transition-colors"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center z-10"
              >
                <div className="w-24 h-24 rounded-full border border-blue-200  bg-slate-50  flex flex-col items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)]  hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]  transition-all cursor-pointer group">
                  <span className="text-sm font-bold text-slate-400  group-hover:text-[#EB3158]  transition-colors">{step.num}</span>
                  <div className="text-slate-700  mt-1 transition-colors">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-[#15172B]  text-sm font-semibold mb-3 transition-colors">{step.title}</h3>
                <p className="text-xs text-[#15172B]/60  leading-relaxed max-w-[200px] transition-colors">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
