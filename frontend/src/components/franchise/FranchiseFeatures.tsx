"use client";

import { motion } from "framer-motion";
import { Users, Handshake, Briefcase, Store, ShoppingCart, Megaphone, Truck, TrendingUp, GraduationCap, CreditCard, ClipboardCheck, FileText, ArrowRight } from "lucide-react";

const features = [
  { id: 1, title: "HRMS", description: "Manage HR, payroll, attendance, leave, and employee records.", icon: <Users size={24} />, color: "border-t-purple-500", iconColor: "text-purple-400" },
  { id: 2, title: "CRM", description: "Manage customers, leads, sales, and customer relationships.", icon: <Handshake size={24} />, color: "border-t-blue-500", iconColor: "text-[#EB3158]" },
  { id: 3, title: "ERP", description: "Integrate finance, inventory, procurement, and business operations.", icon: <Briefcase size={24} />, color: "border-t-cyan-500", iconColor: "text-cyan-400" },
  { id: 4, title: "Dealer\nManagement System", description: "Manage dealers, orders, inventory, and distributor performance.", icon: <Store size={24} />, color: "border-t-green-500", iconColor: "text-green-400" },
  { id: 5, title: "Vendor\nManagement System", description: "Manage vendors, procurement, contracts, and purchase orders.", icon: <ShoppingCart size={24} />, color: "border-t-orange-500", iconColor: "text-orange-400" },
  { id: 6, title: "Marketing\nAutomation", description: "Automate campaigns, emails, leads, and customer engagement.", icon: <Megaphone size={24} />, color: "border-t-red-500", iconColor: "text-red-400" },
  { id: 7, title: "Supply Chain\n& Logistics", description: "Track inventory, warehouses, shipments, and logistics operations.", icon: <Truck size={24} />, color: "border-t-yellow-500", iconColor: "text-yellow-400" },
  { id: 8, title: "Sales Force\nAutomation", description: "Manage leads, quotations, sales visits, and opportunities.", icon: <TrendingUp size={24} />, color: "border-t-pink-500", iconColor: "text-pink-400" },
  { id: 9, title: "Learning\nManagement System", description: "Deliver online training, assessments, certifications, and learning.", icon: <GraduationCap size={24} />, color: "border-t-indigo-500", iconColor: "text-indigo-400" },
  { id: 10, title: "POS", description: "Fast billing, inventory, payments, and retail management.", icon: <CreditCard size={24} />, color: "border-t-teal-500", iconColor: "text-teal-400" },
  { id: 11, title: "Queue\nManagement System", description: "Manage audits, compliance, quality control, and inspections.", icon: <ClipboardCheck size={24} />, color: "border-t-emerald-500", iconColor: "text-emerald-400" },
  { id: 12, title: "Document\nManagement System", description: "Store, organize, share, and secure business documents.", icon: <FileText size={24} />, color: "border-t-rose-500", iconColor: "text-rose-400" },
];

export default function FranchiseFeatures() {
  return (
    <section className="py-20 relative bg-slate-50  border-t border-[#111A4A]/10  transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-[#111A4A]  mb-2 transition-colors">Why Choose Our Franchise Model</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-white  border border-[#111A4A]/10  border-t-2 ${feature.color} rounded-xl p-5 flex flex-col items-center text-center cursor-pointer group hover:bg-slate-100  transition-all shadow-sm hover:shadow-md `}
            >
              <div className={`mb-4 ${feature.iconColor} drop-shadow-[0_0_8px_currentColor] group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-[#15172B]  text-sm font-semibold mb-2 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-[#15172B]/60  mb-4 flex-grow transition-colors">
                {feature.description}
              </p>
              <div className="mt-auto opacity-50 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} className="text-slate-400 " />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
