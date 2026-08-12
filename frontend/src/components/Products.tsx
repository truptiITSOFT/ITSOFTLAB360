"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Cloud, Smartphone, PieChart, Headphones,
  Users, UserCheck, Settings, Briefcase, ShoppingCart,
  Megaphone, Truck, TrendingUp, GraduationCap, CreditCard,
  Users2, FileText, Lock, BarChart3, Calculator, Box, Check, Star, Play,
  LayoutGrid, Package
} from "lucide-react";

export const products = [
  { 
    id: "01", name: "HRMS", desc: "Manage HR, payroll, attendance, leave, and employee records.", 
    color: "bg-indigo-500",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-16 h-12 bg-white  rounded-lg shadow-lg border border-indigo-100  overflow-hidden flex flex-col relative z-10">
            <div className="w-full h-3 bg-indigo-400"></div>
            <div className="flex-grow flex items-center justify-center">
               <div className="w-5 h-5 rounded-full bg-indigo-100  flex items-center justify-center text-indigo-500"><Users size={12}/></div>
            </div>
            <div className="absolute bottom-1 left-2 w-8 h-1 bg-slate-200  rounded"></div>
         </div>
         <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-500 rounded-xl shadow-lg border-2 border-white  flex items-center justify-center z-20">
            <Users2 size={16} className="text-white" />
         </div>
      </div>
    )
  },
  { 
    id: "02", name: "CRM", desc: "Manage customers, leads, sales, and customer relationships.", 
    color: "bg-emerald-500",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-16 h-12 bg-white  rounded-lg shadow-lg border border-emerald-100  p-2 relative z-10 flex flex-col gap-1">
            <div className="w-5 h-5 rounded-full bg-emerald-100  text-emerald-500 flex items-center justify-center"><UserCheck size={12}/></div>
            <div className="w-10 h-1 bg-slate-200  rounded"></div>
            <div className="w-6 h-1 bg-slate-200  rounded"></div>
         </div>
         <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-emerald-500 rounded-xl shadow-lg border-2 border-white  flex items-end justify-center gap-1 pb-2 z-20">
            <div className="w-1.5 h-3 bg-white rounded-t-sm"></div>
            <div className="w-1.5 h-5 bg-white rounded-t-sm"></div>
            <div className="w-1.5 h-4 bg-emerald-200 rounded-t-sm"></div>
         </div>
         <div className="absolute top-0 right-2 w-6 h-4 bg-emerald-400 rounded-full flex items-center justify-center shadow-sm">
            <div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full ml-0.5"></div><div className="w-1 h-1 bg-white rounded-full ml-0.5"></div>
         </div>
      </div>
    )
  },
  { 
    id: "03", name: "ERP", desc: "Integrate finance, inventory, procurement, and business operations.", 
    color: "bg-amber-500",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-14 h-14 bg-white  rounded-full shadow-lg border-4 border-amber-400 border-dashed flex items-center justify-center z-10">
            <span className="font-bold text-amber-500 text-[8px]">ERP</span>
         </div>
         <div className="absolute top-2 -left-2 w-7 h-7 bg-white  rounded-full shadow-lg border border-amber-100  flex items-center justify-center z-20">
            <PieChart size={14} className="text-amber-500" />
         </div>
         <div className="absolute bottom-1 -right-2 w-8 h-10 bg-amber-500 rounded-lg shadow-lg border-2 border-white  flex flex-col p-1 gap-0.5 z-20">
            <div className="w-full h-2.5 bg-white/30 rounded-sm mb-1"></div>
            <div className="flex justify-between"><div className="w-1.5 h-1.5 bg-white rounded-sm"></div><div className="w-1.5 h-1.5 bg-white rounded-sm"></div><div className="w-1.5 h-1.5 bg-white rounded-sm"></div></div>
            <div className="flex justify-between"><div className="w-1.5 h-1.5 bg-white rounded-sm"></div><div className="w-1.5 h-1.5 bg-white rounded-sm"></div><div className="w-1.5 h-1.5 bg-white rounded-sm"></div></div>
            <div className="flex justify-between"><div className="w-1.5 h-1.5 bg-white rounded-sm"></div><div className="w-3.5 h-1.5 bg-amber-200 rounded-sm"></div></div>
         </div>
      </div>
    )
  },
  { 
    id: "04", name: "Dealer Management System", desc: "Manage dealers, orders, inventory, and distributor performance.", 
    color: "bg-teal-500",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-16 h-14 bg-white  rounded-b-lg shadow-lg border border-teal-100  relative z-10 flex flex-col items-center justify-end pb-1">
            {/* Awning */}
            <div className="absolute -top-1 -left-1 -right-1 h-4 flex z-20">
               <div className="flex-1 bg-teal-500 rounded-b-full shadow-sm"></div>
               <div className="flex-1 bg-teal-300 rounded-b-full shadow-sm"></div>
               <div className="flex-1 bg-teal-500 rounded-b-full shadow-sm"></div>
               <div className="flex-1 bg-teal-300 rounded-b-full shadow-sm"></div>
            </div>
            {/* Door/Window */}
            <div className="w-8 h-8 border-2 border-teal-200  bg-teal-50/50  rounded-t-md"></div>
         </div>
         <div className="absolute bottom-[-4px] right-2 w-7 h-7 bg-teal-600 rounded-full shadow-lg border-2 border-white  flex items-center justify-center z-20 overflow-hidden">
            <div className="w-3 h-3 bg-white rounded-full absolute top-1"></div>
            <div className="w-5 h-4 bg-teal-300 rounded-t-lg absolute bottom-0"></div>
         </div>
      </div>
    )
  },
  { 
    id: "05", name: "Vendor Management System", desc: "Manage vendors, procurement, contracts, and purchase orders.", 
    color: "bg-yellow-500",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-14 h-16 bg-white  rounded-lg shadow-lg border border-yellow-100  p-2 relative z-10 flex flex-col gap-1.5 items-center pt-4">
            <div className="absolute -top-2 w-6 h-3 bg-slate-300  rounded-sm border-2 border-white "></div>
            <div className="w-full h-1 bg-slate-200  rounded mt-1"></div>
            <div className="w-3/4 h-1 bg-slate-200  rounded"></div>
            <div className="w-full h-1 bg-slate-200  rounded"></div>
         </div>
         <div className="absolute bottom-1 -right-1 w-10 h-10 bg-yellow-500 rounded shadow-lg border-2 border-white  flex flex-col items-center justify-center z-20 transform rotate-12">
            <Box size={20} className="text-white" />
         </div>
      </div>
    )
  },
  { 
    id: "06", name: "Marketing Automation", desc: "Automate campaigns, emails, leads, and customer engagement.", 
    color: "bg-pink-500",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-14 h-14 relative z-10 transform -rotate-12">
            <Megaphone size={56} className="text-pink-500 drop-shadow-lg" strokeWidth={1} fill="#ec4899" />
         </div>
         <div className="absolute top-0 -right-2 w-8 h-8 bg-white  rounded-full shadow-lg border-2 border-pink-100  flex items-center justify-center z-20">
            <div className="w-5 h-5 rounded-full border-2 border-pink-500 flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            </div>
         </div>
         <div className="absolute bottom-1 left-2 w-6 h-5 bg-pink-200 rounded shadow flex items-center justify-center z-0 transform -rotate-12">
            <div className="w-0 h-0 border-l-[2.4px] border-l-transparent border-r-[2.4px] border-r-transparent border-b-[3.2px] border-b-pink-500 transform rotate-180 absolute top-1"></div>
         </div>
      </div>
    )
  },
  { 
    id: "07", name: "Supply Chain & Logistics", desc: "Track inventory, warehouses, shipments, and logistics operations.", 
    color: "bg-[#EB3158]",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-14 h-14 bg-blue-100  rounded-full shadow-inner border border-blue-200  flex items-center justify-center z-10 relative overflow-hidden">
            <div className="absolute w-20 h-20 border border-blue-300  rounded-full transform rotate-45 scale-y-50"></div>
            <div className="absolute w-20 h-20 border border-blue-300  rounded-full transform -rotate-45 scale-y-50"></div>
            <div className="w-4 h-4 bg-[#EB3158] rounded-full z-20 absolute top-2 right-3 flex items-center justify-center shadow-lg"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>
         </div>
         <div className="absolute bottom-2 -right-3 w-12 h-8 bg-[#EB3158] rounded shadow-lg border border-white/20 flex flex-col z-20 rounded-tr-lg">
            <div className="h-2 w-full bg-blue-700 rounded-t"></div>
            <div className="absolute -bottom-1.5 left-1 w-3 h-3 bg-slate-800 rounded-full border border-white"></div>
            <div className="absolute -bottom-1.5 right-1 w-3 h-3 bg-slate-800 rounded-full border border-white"></div>
            <div className="absolute top-3 left-1 w-5 h-4 bg-orange-400 rounded-sm flex items-center justify-center border border-white/30"><Box size={10} className="text-white"/></div>
         </div>
      </div>
    )
  },
  { 
    id: "08", name: "Sales Force Automation", desc: "Manage leads, quotations, sales visits, and opportunities.", 
    color: "bg-green-500",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-14 h-16 bg-transparent relative z-10 flex flex-col items-center justify-end">
            <div className="w-7 h-7 bg-orange-200  rounded-full border-2 border-white  shadow-sm z-20 relative">
               <div className="w-full h-2.5 bg-slate-800 rounded-t-full absolute top-0"></div>
            </div>
            <div className="w-12 h-8 bg-green-500 rounded-t-lg shadow-md z-10 flex justify-center">
               <div className="w-3 h-full bg-white/20"></div>
            </div>
         </div>
         <div className="absolute top-1 -right-2 w-10 h-10 bg-white  rounded-lg shadow-lg border border-green-100  flex items-end justify-center gap-1 pb-1 z-0">
            <div className="w-1.5 h-3 bg-slate-200  rounded-t-sm"></div>
            <div className="w-1.5 h-5 bg-slate-200  rounded-t-sm"></div>
            <div className="w-1.5 h-7 bg-green-500 rounded-t-sm"></div>
            <TrendingUp size={16} className="absolute top-1 left-1 text-green-500" strokeWidth={3} />
         </div>
      </div>
    )
  },
  { 
    id: "09", name: "Learning Management System", desc: "Deliver online training, assessments, certifications, and learning.", 
    color: "bg-purple-600",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-16 h-12 bg-white  rounded-lg shadow-lg border-2 border-purple-500 p-1 relative z-10 flex flex-col">
            <div className="w-full flex-grow bg-purple-100  rounded flex items-center justify-center">
               <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white pl-0.5"><Play size={10} fill="currentColor"/></div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-2 bg-slate-300  rounded-b"></div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-400  rounded"></div>
         </div>
         <div className="absolute -top-3 -right-3 w-10 h-10 z-20 transform rotate-12">
            <GraduationCap size={40} className="text-purple-600 drop-shadow-md" strokeWidth={1} fill="#9333ea" />
         </div>
      </div>
    )
  },
  { 
    id: "10", name: "POS", desc: "Fast billing, inventory, payments, and retail management.", 
    color: "bg-orange-500",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-14 h-10 bg-slate-800 rounded shadow-lg border-2 border-slate-700 relative z-10 flex items-center justify-center">
            <div className="w-10 h-6 bg-orange-400/20 rounded-sm"></div>
            <div className="absolute -bottom-2 w-4 h-2 bg-slate-600 rounded-b"></div>
            <div className="absolute -bottom-3 w-10 h-1 bg-slate-500 rounded"></div>
         </div>
         <div className="absolute -bottom-2 -right-1 w-7 h-10 bg-slate-700 rounded shadow-xl border border-slate-600 flex flex-col p-1 gap-1 z-20">
            <div className="w-full h-2 bg-slate-900 rounded-sm"></div>
            <div className="flex gap-0.5"><div className="w-1 h-1 bg-orange-400 rounded-sm"></div><div className="w-1 h-1 bg-orange-400 rounded-sm"></div><div className="w-1 h-1 bg-orange-400 rounded-sm"></div></div>
            <div className="flex gap-0.5"><div className="w-1 h-1 bg-slate-400 rounded-sm"></div><div className="w-1 h-1 bg-slate-400 rounded-sm"></div><div className="w-1 h-1 bg-slate-400 rounded-sm"></div></div>
            <div className="w-full flex-grow bg-white rounded-t-sm border border-slate-300 mt-1 relative">
               <div className="absolute top-1 left-1 w-3 h-0.5 bg-slate-300"></div>
               <div className="absolute top-2 left-1 w-2 h-0.5 bg-slate-300"></div>
            </div>
         </div>
      </div>
    )
  },
  { 
    id: "11", name: "Queue Management System", desc: "Manage audits, compliance, quality control, and inspections.", 
    color: "bg-[#EB3158]",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="absolute top-0 w-10 h-12 bg-white  rounded shadow-lg border border-blue-100  flex flex-col items-center z-0 pt-2">
            <div className="w-6 h-4 bg-[#EB3158] rounded-sm text-[4.8px] font-bold text-white flex flex-col items-center justify-center leading-none">
               <span>A</span><span>001</span>
            </div>
            <div className="w-4 h-0.5 bg-slate-300 mt-2"></div>
            <div className="w-6 h-0.5 bg-slate-300 mt-1"></div>
         </div>
         <div className="flex gap-1 absolute bottom-0 z-10">
            <div className="w-5 h-6 bg-[#EB3158] rounded-t-md relative flex justify-center">
               <div className="w-3 h-3 bg-orange-200 rounded-full absolute -top-2 border border-white"></div>
            </div>
            <div className="w-5 h-6 bg-[#EB3158] rounded-t-md relative flex justify-center transform scale-110 z-20 -translate-y-1">
               <div className="w-3.5 h-3.5 bg-orange-300 rounded-full absolute -top-2.5 border border-white"></div>
            </div>
            <div className="w-5 h-6 bg-blue-400 rounded-t-md relative flex justify-center">
               <div className="w-3 h-3 bg-orange-200 rounded-full absolute -top-2 border border-white"></div>
            </div>
         </div>
      </div>
    )
  },
  { 
    id: "12", name: "Document Management System", desc: "Store, organize, share, and secure business documents.", 
    color: "bg-teal-600",
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
         <div className="w-16 h-16 bg-teal-500 rounded-lg shadow-lg border border-teal-600 relative z-10 flex flex-col p-1 gap-1">
            <div className="w-full h-5 bg-teal-600 rounded shadow-inner relative flex justify-center pt-1"><div className="w-4 h-1 bg-teal-800/30 rounded-full"></div></div>
            <div className="w-full h-8 bg-teal-600 rounded shadow-inner relative flex justify-center pt-1"><div className="w-4 h-1 bg-teal-800/30 rounded-full"></div></div>
         </div>
         <div className="absolute top-2 -left-1 w-12 h-10 bg-white  rounded shadow border border-slate-300 z-0 transform -rotate-12 flex flex-col p-1.5 gap-1">
            <div className="w-3/4 h-1 bg-teal-200 rounded"></div>
            <div className="w-full h-1 bg-slate-200 rounded"></div>
            <div className="w-full h-1 bg-slate-200 rounded"></div>
         </div>
         <div className="absolute bottom-2 -right-1 w-6 h-8 bg-amber-400 rounded-md shadow-lg border-2 border-white  flex items-center justify-center z-20">
            <Lock size={12} className="text-white" />
         </div>
      </div>
    )
  },
];

const features = [
  { name: "Secure", desc: "Enterprise-grade security", icon: ShieldCheck, color: "text-indigo-500", bgColor: "bg-indigo-50 " },
  { name: "Cloud Based", desc: "Access anytime, anywhere", icon: Cloud, color: "text-[#EB3158]", bgColor: "bg-blue-50 " },
  { name: "Responsive", desc: "Works on desktop, tablet & mobile", icon: Smartphone, color: "text-emerald-500", bgColor: "bg-emerald-50 " },
  { name: "Scalable", desc: "Built to grow with your business", icon: PieChart, color: "text-amber-500", bgColor: "bg-amber-50 " },
  { name: "Support", desc: "Dedicated support when you need it", icon: Headphones, color: "text-pink-500", bgColor: "bg-pink-50 " },
];

const filterCategories = [
  { name: "All Solutions", icon: LayoutGrid },
  { name: "People", icon: Users },
  { name: "Sales", icon: BarChart3 },
  { name: "Operations", icon: Settings },
  { name: "Supply Chain", icon: Package },
  { name: "Marketing", icon: Megaphone },
  { name: "Learning", icon: GraduationCap },
  { name: "Documents", icon: FileText }
];

const getCategoryForProduct = (id: string) => {
  switch (id) {
    case "01": return "People"; // HRMS
    case "02": return "Sales"; // CRM
    case "03": return "Operations"; // ERP
    case "04": return "Sales"; // Dealer
    case "05": return "Operations"; // Vendor
    case "06": return "Marketing"; // Marketing
    case "07": return "Supply Chain"; // Supply Chain
    case "08": return "Sales"; // Sales Force
    case "09": return "Learning"; // LMS
    case "10": return "Operations"; // POS
    case "11": return "Operations"; // Queue
    case "12": return "Documents"; // Document
    default: return "Operations";
  }
};

export default function Products() {
  const [activeFilter, setActiveFilter] = React.useState("All Solutions");

  const filteredProducts = activeFilter === "All Solutions"
    ? products
    : products.filter(p => getCategoryForProduct(p.id) === activeFilter);

  return (
    <section className="pt-8 pb-24 relative z-10 bg-[#f8fafc]  transition-colors" id="products">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1120px]">
        
        {/* Intro */}
        <div className="max-w-4xl mb-8 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-widest text-[#EB3158] uppercase mb-4 block">
              One Connected Business Ecosystem
            </span>
            <h2 className="text-[2.25rem] md:text-5xl font-extrabold text-[#111A4A]  tracking-tight mb-6 leading-[1.15]">
              Explore powerful IT solutions for<br className="hidden sm:block" /> every business team.
            </h2>
            <p className="text-sm md:text-[12px] text-[#15172B]/70  leading-relaxed max-w-3xl mx-auto">
              Connect people, customers, operations, inventory, logistics, documents, sales,<br className="hidden sm:block" /> learning, marketing, vendors, dealers, and retail activities through one centralized platform.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="mb-8 w-full max-w-[1120px] mx-auto">
          <div className="flex items-center justify-between w-full gap-2 lg:gap-4">
            {filterCategories.map(category => {
              const Icon = category.icon;
              const isActive = activeFilter === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => setActiveFilter(category.name)}
                  className={`px-3 lg:px-5 py-2.5 rounded-xl text-[10.4px] lg:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap flex-1 ${
                    isActive
                      ? "bg-[#111A4A] text-white shadow-lg shadow-[#111A4A]/20 border border-[#111A4A]"
                      : "bg-white  text-[#15172B]  border border-gray-200  hover:border-gray-300  hover:shadow-sm"
                  }`}
                >
                  <Icon size={16} strokeWidth={2.5} className={isActive ? "text-white" : "text-[#15172B]/50 "} />
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-slate-50  rounded-[1.5rem] p-6 relative group hover:-translate-y-2 transition-all duration-300 shadow-sm  border border-slate-100  hover:shadow-xl  hover:border-blue-100  flex flex-col items-center text-center overflow-hidden cursor-pointer"
              >
                {/* Highlight Glow in Dark Mode */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Number Badge */}
                <div className={`absolute top-4 left-4 w-7 h-7 rounded-full flex items-center justify-center text-white text-[8.8px] font-bold ${product.color} shadow-md z-20 group-hover:scale-110 transition-transform`}>
                  {product.id}
                </div>
                
                {/* Custom Graphic */}
                <div className="w-24 h-24 mt-4 mb-6 relative z-10 flex items-center justify-center">
                   {/* Soft background glow behind graphic */}
                   <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30  transition-opacity duration-500 ${product.color}`}></div>
                   {product.graphic}
                </div>
                
                <h4 className="font-bold text-[#15172B]  text-lg mb-2 leading-tight transition-colors z-10 relative">
                  {product.name}
                </h4>
                
                <p className="text-[#15172B]/60  text-[10.4px] leading-relaxed transition-colors z-10 relative">
                  {product.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Features Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-[#111A4A]/10  flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-14 transition-colors"
        >
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 min-w-[144px] group cursor-default">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${feature.bgColor} group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-4 h-4 ${feature.color}`} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <h5 className="font-bold text-[#15172B]  text-sm leading-tight transition-colors">
                  {feature.name}
                </h5>
                <p className="text-[8.8px] text-[#15172B]/60  transition-colors">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
