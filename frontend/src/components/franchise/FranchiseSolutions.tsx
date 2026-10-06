"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Package, CreditCard, Handshake, Mail, Truck, TrendingUp, GraduationCap, FileText } from "lucide-react";

const solutions = [
  { id: 1, title: "CRM", desc: "Manage leads, customers & relationships", icon: <Users size={20} />, color: "border-blue-500/50 hover:border-[#EB3158]/50", iconColor: "text-[#EB3158]" },
  { id: 2, title: "HRMS", desc: "Streamline HR processes & workforce", icon: <Briefcase size={20} />, color: "border-purple-500/50 hover:border-purple-500", iconColor: "text-purple-400" },
  { id: 3, title: "ERP", desc: "Integrate all business functions seamlessly", icon: <Package size={20} />, color: "border-yellow-500/50 hover:border-yellow-500", iconColor: "text-yellow-400" },
  { id: 4, title: "POS", desc: "Smart billing & in-store management", icon: <CreditCard size={20} />, color: "border-cyan-500/50 hover:border-cyan-500", iconColor: "text-cyan-400" },
  { id: 5, title: "Vendor\nManagement", desc: "Manage vendors & procurement efficiently", icon: <Handshake size={20} />, color: "border-blue-400/50 hover:border-blue-400", iconColor: "text-blue-300" },
  { id: 6, title: "Marketing\nAutomation", desc: "Automate campaigns & engage customers better", icon: <Mail size={20} />, color: "border-pink-500/50 hover:border-pink-500", iconColor: "text-pink-400" },
  { id: 7, title: "Supply Chain &\nLogistics", desc: "Track inventory & deliveries in real time", icon: <Truck size={20} />, color: "border-teal-500/50 hover:border-teal-500", iconColor: "text-teal-400" },
  { id: 8, title: "Sales\nAutomation", desc: "Boost sales with automation & insights", icon: <TrendingUp size={20} />, color: "border-green-500/50 hover:border-green-500", iconColor: "text-green-400" },
  { id: 9, title: "Learning\nManagement", desc: "Train teams with online courses & certifications", icon: <GraduationCap size={20} />, color: "border-orange-500/50 hover:border-orange-500", iconColor: "text-orange-400" },
  { id: 10, title: "Document\nManagement", desc: "Store, manage & share documents securely", icon: <FileText size={20} />, color: "border-slate-500/50 hover:border-slate-500", iconColor: "text-slate-400" }
];

export default function FranchiseSolutions() {
  return (
    <section className="py-20 relative bg-slate-50  border-t border-[#111A4A]/10  transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-[#111A4A]  mb-2 transition-colors">Franchise Solutions in One Place</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {solutions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-white  border border-[#111A4A]/10  rounded-xl p-6 flex flex-col items-center text-center cursor-pointer group hover:bg-slate-100  transition-all shadow-sm hover:shadow-md  ${item.color}`}
            >
              <div className={`mb-4 ${item.iconColor} drop-shadow-[0_0_8px_currentColor] group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-[#15172B]  text-xs font-semibold mb-2 whitespace-pre-line leading-tight transition-colors">
                {item.title}
              </h3>
              <p className="text-[10px] text-[#15172B]/60  leading-relaxed max-w-[120px] transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
