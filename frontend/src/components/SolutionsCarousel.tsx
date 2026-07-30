"use client";

import { motion } from "framer-motion";
import { 
  Users, Handshake, Briefcase, Store, 
  ShoppingCart, Megaphone, Truck, TrendingUp,
  GraduationCap, CreditCard, ClipboardCheck, FileText,
  ArrowRight
} from "lucide-react";

const solutions = [
  { id: "01", title: "HRMS", desc: "Manage HR, payroll, attendance, leave, and employee records.", icon: <Users size={24} />, color: "border-t-purple-500", iconColor: "text-purple-400", bgGlow: "group-hover:bg-purple-900/10" },
  { id: "02", title: "CRM", desc: "Manage customers, leads, sales, and customer relationships.", icon: <Handshake size={24} />, color: "border-t-blue-500", iconColor: "text-blue-400", bgGlow: "group-hover:bg-blue-900/10" },
  { id: "03", title: "ERP", desc: "Integrate finance, inventory, procurement, and business operations.", icon: <Briefcase size={24} />, color: "border-t-cyan-500", iconColor: "text-cyan-400", bgGlow: "group-hover:bg-cyan-900/10" },
  { id: "04", title: "Dealer\nManagement System", desc: "Manage dealers, orders, inventory, and distributor performance.", icon: <Store size={24} />, color: "border-t-green-500", iconColor: "text-green-400", bgGlow: "group-hover:bg-green-900/10" },
  { id: "05", title: "Vendor\nManagement System", desc: "Manage vendors, procurement, contracts, and purchase orders.", icon: <ShoppingCart size={24} />, color: "border-t-orange-500", iconColor: "text-orange-400", bgGlow: "group-hover:bg-orange-900/10" },
  { id: "06", title: "Marketing\nAutomation", desc: "Automate campaigns, emails, leads, and customer engagement.", icon: <Megaphone size={24} />, color: "border-t-red-500", iconColor: "text-red-400", bgGlow: "group-hover:bg-red-900/10" },
  { id: "07", title: "Supply Chain\n& Logistics", desc: "Track inventory, warehouses, shipments, and logistics operations.", icon: <Truck size={24} />, color: "border-t-yellow-500", iconColor: "text-yellow-400", bgGlow: "group-hover:bg-yellow-900/10" },
  { id: "08", title: "Sales Force\nAutomation", desc: "Manage leads, quotations, sales visits, and opportunities.", icon: <TrendingUp size={24} />, color: "border-t-pink-500", iconColor: "text-pink-400", bgGlow: "group-hover:bg-pink-900/10" },
  { id: "09", title: "Learning\nManagement System", desc: "Deliver online training, assessments, certifications, and learning.", icon: <GraduationCap size={24} />, color: "border-t-indigo-500", iconColor: "text-indigo-400", bgGlow: "group-hover:bg-indigo-900/10" },
  { id: "10", title: "POS", desc: "Fast billing, inventory, payments, and retail management.", icon: <CreditCard size={24} />, color: "border-t-teal-500", iconColor: "text-teal-400", bgGlow: "group-hover:bg-teal-900/10" },
  { id: "11", title: "Queue\nManagement System", desc: "Manage audits, compliance, quality control, and inspections.", icon: <ClipboardCheck size={24} />, color: "border-t-emerald-500", iconColor: "text-emerald-400", bgGlow: "group-hover:bg-emerald-900/10" },
  { id: "12", title: "Document\nManagement System", desc: "Store, organize, share, and secure business documents.", icon: <FileText size={24} />, color: "border-t-rose-500", iconColor: "text-rose-400", bgGlow: "group-hover:bg-rose-900/10" },
];

export default function SolutionsCarousel() {
  const duplicatedSolutions = [...solutions, ...solutions];

  return (
    <section className="relative pb-16 pt-8 z-10 bg-white dark:bg-[#020617] overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
            One Platform. Endless <span className="text-blue-500">Possibilities.</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 transition-colors">
            Everything your business needs to run, grow and succeed - All in One Place!
          </p>
        </div>

        <div className="relative group/carousel mt-12 w-full overflow-hidden">
          {/* Fading Edges for the Marquee */}
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-[#020617] to-transparent z-10 pointer-events-none transition-colors"></div>
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-[#020617] to-transparent z-10 pointer-events-none transition-colors"></div>

          {/* Marquee Container */}
          <div className="flex w-max animate-marquee pb-8 pt-4">
            {duplicatedSolutions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
                className={`mx-3 min-w-[220px] md:min-w-[240px] max-w-[240px] bg-slate-50 dark:bg-[#0f172a]/60 border border-gray-200 dark:border-gray-800 border-t-2 ${item.color} rounded-xl p-6 flex flex-col items-center text-center cursor-pointer group hover:scale-105 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300`}
              >
                <div className={`mb-4 ${item.iconColor} drop-shadow-[0_0_10px_currentColor] group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-slate-800 dark:text-white font-semibold mb-3 whitespace-pre-line leading-tight transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mb-6 flex-grow leading-relaxed transition-colors">
                  {item.desc}
                </p>
                <div className={`flex items-center text-xs font-medium ${item.iconColor} opacity-80 group-hover:opacity-100 transition-opacity`}>
                  Learn More <ArrowRight size={14} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
