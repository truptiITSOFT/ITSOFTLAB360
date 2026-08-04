"use client";

import { motion } from "framer-motion";
import { Share2, Settings, TrendingUp, Building, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Share2 size={28} className="text-[#EB3158]" />,
    title: "Connected Data",
    desc: "All departments work together with one source of information."
  },
  {
    icon: <Settings size={28} className="text-[#EB3158]" />,
    title: "Automation First",
    desc: "Reduce manual work and improve productivity."
  },
  {
    icon: <TrendingUp size={28} className="text-[#EB3158]" />,
    title: "Scalable Architecture",
    desc: "Grow from small business to enterprise seamlessly."
  },
  {
    icon: <Building size={28} className="text-[#EB3158]" />,
    title: "Industry Ready",
    desc: "Solutions designed for different business needs."
  },
  {
    icon: <ShieldCheck size={28} className="text-[#EB3158]" />,
    title: "Secure & Reliable",
    desc: "Enterprise-grade security and performance."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-blue-900/5 rounded-[100%] blur-[80px] -z-10"></div>
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#111A4A] dark:text-white transition-colors">
              Why Businesses Choose <span className="text-[#EB3158] dark:text-blue-500 text-glow">IT SOFTLAB 360</span>
            </h2>
            <p className="text-[#15172B]/80 dark:text-gray-400 text-lg max-w-2xl mx-auto transition-colors">
              One Platform. Unlimited Possibilities.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-white/80 dark:bg-[#0f172a]/40 backdrop-blur-sm rounded-2xl border border-[#111A4A]/10 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all hover:-translate-y-2 group shadow-sm hover:shadow-lg dark:hover:shadow-none"
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-[#020617] border border-blue-200 dark:border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-50 dark:group-hover:bg-[#EB3158]/10 group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] dark:group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                {feature.icon}
              </div>
              <h3 className="text-[#15172B] dark:text-white font-bold mb-3 transition-colors">{feature.title}</h3>
              <p className="text-sm text-[#15172B]/80 dark:text-gray-400 leading-relaxed transition-colors">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
