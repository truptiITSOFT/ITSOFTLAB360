"use client";

import { motion } from "framer-motion";
import { Stethoscope, ShoppingCart, Landmark, Factory, Truck, GraduationCap } from "lucide-react";

const industries = [
  { id: "ind-01", name: "Healthcare", desc: "Digital solutions for patient care, hospital management, and telehealth.", icon: <Stethoscope size={32} />, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  { id: "ind-02", name: "Retail & E-commerce", desc: "Omnichannel retail, inventory management, and personalized shopping.", icon: <ShoppingCart size={32} />, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { id: "ind-03", name: "Finance & Banking", desc: "Secure fintech apps, core banking solutions, and automated workflows.", icon: <Landmark size={32} />, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { id: "ind-04", name: "Manufacturing", desc: "Industry 4.0, supply chain automation, and production monitoring.", icon: <Factory size={32} />, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { id: "ind-05", name: "Logistics", desc: "Fleet tracking, warehouse management, and delivery route optimization.", icon: <Truck size={32} />, color: "text-[#EB3158]", bg: "bg-[#EB3158]/10", border: "border-blue-500/20" },
  { id: "ind-06", name: "Education", desc: "LMS, virtual classrooms, and campus management systems.", icon: <GraduationCap size={32} />, color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
];

export default function Industries() {
  return (
    <section className="py-24 relative z-10 bg-gradient-to-b from-gray-50 to-white   transition-colors duration-300" id="industries">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-[#EB3158]  font-semibold tracking-wider text-sm uppercase mb-4 transition-colors">Industries We Empower</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-[#111A4A]  transition-colors">
              Tailored Solutions for <br />
              <span className="text-[#EB3158]  text-glow">Every Sector</span>
            </h3>
            <p className="text-[#15172B]/80  text-lg transition-colors">
              We understand that every industry has unique challenges. Our technology is custom-built to address the specific needs of your market, ensuring maximum impact and ROI.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, index) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-8 rounded-2xl bg-white  backdrop-blur-md border border-[#111A4A]/10  hover:-translate-y-1 shadow-sm hover:shadow-lg   transition-all duration-300 group cursor-pointer`}
            >
              <div className={`w-16 h-16 rounded-xl ${ind.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <div className={`${ind.color}`}>
                  {ind.icon}
                </div>
              </div>
              <h4 className="text-xl font-bold text-[#15172B]  mb-3 transition-colors">{ind.name}</h4>
              <p className="text-[#15172B]/80  text-sm leading-relaxed transition-colors">
                {ind.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
