"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Briefcase, LayoutDashboard, Settings, Bell, Search, Menu, Package, Calendar } from "lucide-react";

export default function EcosystemSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900/50 overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-[3.25rem] font-bold leading-[1.1] mb-6 text-gray-900 dark:text-white">
                Bring your entire <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">business ecosystem</span> <br />
                together.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
                Experience unparalleled control with our unified dashboard. Seamlessly manage your HRMS, CRM, ERP, and other critical operations from one intelligent interface.
              </p>
              <button className="bg-[#111A4A] dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Explore the Dashboard
              </button>
            </motion.div>
          </div>

          {/* Right Content - UI Mockup */}
          <div className="relative z-10 w-full mt-12 lg:mt-0">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[80px] -z-10"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Desktop Mockup */}
              <div className="relative bg-white dark:bg-[#151C2C] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden aspect-[4/3] w-full max-w-2xl ml-auto">
                {/* Header */}
                <div className="h-12 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 bg-gray-50/80 dark:bg-[#0F1523]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-grow mx-6 max-w-sm bg-white dark:bg-[#1A2235] border border-gray-200 dark:border-gray-700 rounded-lg h-8 flex items-center px-3 text-gray-400 text-xs">
                    <Search size={14} className="mr-2" /> Search across modules...
                  </div>
                  <div className="flex items-center gap-4 text-gray-500">
                    <Bell size={16} className="text-gray-400" />
                    <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-white dark:border-gray-800 overflow-hidden"></div>
                  </div>
                </div>
                
                {/* Body */}
                <div className="flex h-[calc(100%-3rem)]">
                  {/* Sidebar */}
                  <div className="w-52 bg-[#0A101F] p-4 flex flex-col gap-1 overflow-hidden">
                    <div className="text-white font-bold mb-6 mt-2 tracking-wider text-sm pl-2">ITSOFTLAB360</div>
                    <div className="flex items-center gap-3 text-xs text-white bg-blue-600 px-3 py-2.5 rounded-lg shadow-md shadow-blue-600/20">
                      <LayoutDashboard size={16} /> Dashboard
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 px-3 py-2.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <Users size={16} /> HRMS
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 px-3 py-2.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <Briefcase size={16} /> CRM
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 px-3 py-2.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <Package size={16} /> ERP
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 px-3 py-2.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors mt-auto">
                      <Settings size={16} /> Settings
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-grow p-6 bg-[#FAFBFF] dark:bg-[#151C2C] overflow-hidden">
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Welcome back, John Smith 👋</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Here's what's happening across your business today.</p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white dark:bg-[#1A2235] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Revenue</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">₹ 24.8 Cr</div>
                        <div className="text-[10px] text-green-500 font-medium mt-1 flex items-center">↑ 18.6% vs last month</div>
                      </div>
                      <div className="bg-white dark:bg-[#1A2235] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Customers</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">8,932</div>
                        <div className="text-[10px] text-green-500 font-medium mt-1 flex items-center">↑ 8.3% vs last month</div>
                      </div>
                      <div className="bg-white dark:bg-[#1A2235] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Users</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">12,548</div>
                        <div className="text-[10px] text-green-500 font-medium mt-1 flex items-center">↑ 12.5% vs last month</div>
                      </div>
                    </div>
                    
                    {/* Chart Area Mockup */}
                    <div className="bg-white dark:bg-[#1A2235] p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                      <div className="flex justify-between items-center mb-4">
                         <div className="text-sm font-semibold text-gray-800 dark:text-white">Revenue Trend</div>
                         <div className="text-xs text-gray-500">This Month</div>
                      </div>
                      <div className="h-28 flex items-end gap-3 w-full">
                        {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
                          <div key={i} className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-t-md relative group flex flex-col justify-end h-full">
                            <motion.div 
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h}%` }}
                              transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                              className="w-full bg-blue-500 dark:bg-blue-400 rounded-t-md shadow-sm" 
                            ></motion.div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Phone Mockup Overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 50, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-8 lg:-bottom-12 -left-4 lg:-left-16 w-[220px] lg:w-[260px] h-[460px] lg:h-[520px] bg-white dark:bg-[#0A101F] rounded-[2.5rem] shadow-2xl shadow-blue-900/20 border-[8px] border-[#FAFBFF] dark:border-gray-800 overflow-hidden z-20"
              >
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#FAFBFF] dark:bg-gray-800 rounded-b-xl z-30"></div>
                
                {/* Phone Content */}
                <div className="p-4 pt-10 h-full flex flex-col bg-[#FAFBFF] dark:bg-[#0A101F]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="font-bold text-[10px] tracking-wider text-[#0F172A] dark:text-white flex items-center gap-1">
                      <span className="w-4 h-4 rounded-sm bg-blue-600 flex items-center justify-center text-[8px] text-white">IT</span>
                      ITSOFTLAB360
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 overflow-hidden"></div>
                  </div>
                  
                  <div className="mb-5">
                    <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Good morning, John 👋</h4>
                    <p className="text-[9px] text-gray-500">Here's your business at a glance.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white dark:bg-[#151C2C] p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                      <div className="text-[9px] text-gray-500 mb-1">Revenue</div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white">₹ 24.8 Cr</div>
                    </div>
                    <div className="bg-white dark:bg-[#151C2C] p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                      <div className="text-[9px] text-gray-500 mb-1">Customers</div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white">8,932</div>
                    </div>
                  </div>
                  
                  <div className="flex-grow bg-white dark:bg-[#151C2C] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-3 mb-2">
                    <div className="text-[10px] font-semibold mb-3 text-gray-800 dark:text-white">Your Solutions</div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {icon: <Users size={14} className="text-purple-500" />, label: "HRMS", bg: "bg-purple-50 dark:bg-purple-500/10"},
                        {icon: <Briefcase size={14} className="text-blue-500" />, label: "CRM", bg: "bg-blue-50 dark:bg-blue-500/10"},
                        {icon: <LayoutDashboard size={14} className="text-green-500" />, label: "ERP", bg: "bg-green-50 dark:bg-green-500/10"},
                        {icon: <BarChart3 size={14} className="text-orange-500" />, label: "Analytics", bg: "bg-orange-50 dark:bg-orange-500/10"},
                        {icon: <Package size={14} className="text-indigo-500" />, label: "Inventory", bg: "bg-indigo-50 dark:bg-indigo-500/10"},
                        {icon: <Settings size={14} className="text-pink-500" />, label: "Settings", bg: "bg-pink-50 dark:bg-pink-500/10"}
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.bg} group-hover:scale-110 transition-transform`}>
                            {item.icon}
                          </div>
                          <span className="text-[8px] text-gray-600 dark:text-gray-400 font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom Navigation */}
                  <div className="flex items-center justify-around mt-auto pt-2 border-t border-gray-100 dark:border-gray-800 pb-1">
                    <div className="flex flex-col items-center text-blue-600"><LayoutDashboard size={14} /><span className="text-[8px] mt-1">Home</span></div>
                    <div className="flex flex-col items-center text-gray-400"><Search size={14} /><span className="text-[8px] mt-1">Search</span></div>
                    <div className="flex flex-col items-center text-gray-400"><Bell size={14} /><span className="text-[8px] mt-1">Alerts</span></div>
                    <div className="flex flex-col items-center text-gray-400"><Menu size={14} /><span className="text-[8px] mt-1">More</span></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
