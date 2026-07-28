"use client";

import { motion } from "framer-motion";
import { 
  Users, UserCircle, ClipboardCheck, Calculator, 
  PackageSearch, TrendingUp, Headphones, CreditCard, 
  PieChart, FolderOpen, Network, Smartphone 
} from "lucide-react";

const solutions = [
  { id: "01", title: "HRMS", desc: "Streamline HR operations, employee management, payroll & more.", icon: <Users size={28} />, color: "bg-blue-500" },
  { id: "02", title: "CRM", desc: "Build stronger relationships and grow your business smarter.", icon: <UserCircle size={28} />, color: "bg-purple-500" },
  { id: "03", title: "Project Management", desc: "Plan, track and deliver projects on time with complete visibility.", icon: <ClipboardCheck size={28} />, color: "bg-green-500" },
  { id: "04", title: "Accounting", desc: "Manage finance, invoices, expenses and reports effortlessly.", icon: <Calculator size={28} />, color: "bg-orange-500" },
  
  { id: "05", title: "Inventory Management", desc: "Track inventory in real-time and optimize stock efficiency.", icon: <PackageSearch size={28} />, color: "bg-teal-500" },
  { id: "06", title: "Sales Management", desc: "Boost sales productivity and manage your entire sales pipeline.", icon: <TrendingUp size={28} />, color: "bg-pink-500" },
  { id: "07", title: "Helpdesk", desc: "Deliver exceptional support and resolve issues faster.", icon: <Headphones size={28} />, color: "bg-blue-600" },
  { id: "08", title: "POS", desc: "Smart POS solutions for retail and business growth.", icon: <CreditCard size={28} />, color: "bg-green-600" },
  
  { id: "09", title: "Analytics & Reports", desc: "Make data-driven decisions with powerful analytics and insights.", icon: <PieChart size={28} />, color: "bg-indigo-500" },
  { id: "10", title: "Document Management", desc: "Store, manage and access documents securely anytime.", icon: <FolderOpen size={28} />, color: "bg-yellow-500" },
  { id: "11", title: "Workflow Automation", desc: "Automate processes, reduce manual work and increase efficiency.", icon: <Network size={28} />, color: "bg-cyan-500" },
  { id: "12", title: "Mobile App", desc: "Work from anywhere with our powerful mobile solutions.", icon: <Smartphone size={28} />, color: "bg-rose-500" },
];

export default function SolutionsGrid() {
  return (
    <section className="py-20 relative z-10" id="solutions">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            ALL SOLUTIONS IN <span className="text-blue-500 text-glow">1 PLACE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(30, 58, 138, 0.4)", // bg-blue-900/40
                borderColor: "rgba(59, 130, 246, 0.6)",
                boxShadow: "0 10px 40px -10px rgba(59,130,246,0.3)" 
              }}
              className="glass-panel p-6 rounded-2xl flex gap-4 cursor-pointer relative overflow-hidden group"
            >
              {/* Background gradient effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
              
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full ${solution.color} bg-opacity-20 flex items-center justify-center text-white relative`}>
                  {/* Outer glow for icon */}
                  <div className={`absolute inset-0 rounded-full ${solution.color} blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {solution.icon}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400 font-mono text-sm">{solution.id}</span>
                  <h3 className="font-semibold text-gray-100 group-hover:text-white transition-colors">{solution.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {solution.desc}
                </p>
              </div>
              
              {/* Decorative border bottom line on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
