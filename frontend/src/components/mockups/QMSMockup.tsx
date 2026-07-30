import React from "react";
import { 
  Users, ShieldCheck, ClipboardCheck, AlertTriangle, FileText, 
  Settings, Bell, Calendar, TrendingUp, TrendingDown, CheckCircle2,
  XCircle, Clock, FileSearch, BarChart3, Upload, Wrench, Package,
  BookOpen, FolderOpen, Activity, Truck
} from "lucide-react";

export default function QMSMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[640px] text-white bg-[#030816] rounded-3xl p-5 flex-col lg:flex-row gap-5 relative overflow-hidden">
      
      {/* Left Sidebar */}
      <div className="w-64 bg-[#0a1125] border border-white/5 p-5 flex flex-col gap-4 rounded-2xl relative overflow-hidden z-10 shrink-0">
        <div className="flex flex-col gap-2 mb-2 pt-2 z-10">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-500 border border-cyan-500/30">
            <Users size={28} />
          </div>
          <h2 className="text-xl font-bold mt-2 leading-tight">QUEUE<br/><span className="text-cyan-400">MANAGEMENT<br/>SYSTEM</span></h2>
        </div>
        <p className="text-[11px] text-slate-400 mb-2 z-10">Manage audits, compliance, and quality control.</p>
        
        {/* Navigation Menu */}
        <div className="flex flex-col gap-1 z-10 text-[10px]">
           {[
             { label: "Dashboard", icon: <BarChart3 size={12}/>, active: true },
             { label: "Audits", icon: <ClipboardCheck size={12}/>, active: false },
             { label: "Compliance", icon: <ShieldCheck size={12}/>, active: false },
             { label: "Quality Control", icon: <CheckCircle2 size={12}/>, active: false },
             { label: "CAPA Management", icon: <FileSearch size={12}/>, active: false },
             { label: "Documents", icon: <FileText size={12}/>, active: false },
             { label: "Training", icon: <BookOpen size={12}/>, active: false },
             { label: "Reports & Analytics", icon: <Activity size={12}/>, active: false },
             { label: "Alerts", icon: <Bell size={12}/>, active: false },
             { label: "Settings", icon: <Settings size={12}/>, active: false },
           ].map((item, i) => (
             <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
               {item.icon}
               <span className="font-medium">{item.label}</span>
             </div>
           ))}
        </div>

        {/* Bottom Graphic */}
        <div className="mt-auto h-32 relative flex items-end justify-center z-10 pt-4">
           {/* Abstract Glow */}
           <div className="absolute w-32 h-32 bg-cyan-600/20 rounded-full blur-2xl bottom-[-20px]"></div>
           <div className="relative w-full h-full flex items-center justify-center z-20">
              <div className="w-16 h-20 bg-blue-900 border border-blue-500 rounded flex flex-col p-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500/20 rounded-bl-full"></div>
                 <div className="w-full h-1 bg-blue-400/50 mb-2 mt-2"></div>
                 <div className="w-3/4 h-1 bg-blue-400/50 mb-1"></div>
                 <div className="w-1/2 h-1 bg-blue-400/50 mb-1"></div>
                 <div className="w-full h-1 bg-blue-400/50 mb-1"></div>
                 
                 <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-[#0a1125] shadow-lg">
                    <ShieldCheck size={16} className="text-white" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col gap-4 z-10 overflow-y-auto pr-1 custom-scrollbar">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0a1125] p-4 rounded-2xl border border-white/5">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[#0d162f] border border-cyan-500/30 flex items-center justify-center text-cyan-500">
               <Users size={20} />
             </div>
             <div>
               <h2 className="text-lg font-bold">Queue Management System</h2>
               <p className="text-[11px] text-slate-400">Manage audits, compliance, and quality control.</p>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-[#0d162f] border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300">
               This Month <Calendar size={12} />
             </div>
             <button className="w-8 h-8 rounded-lg bg-[#0d162f] flex items-center justify-center border border-white/10 relative">
               <Bell size={14} className="text-slate-300" />
               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"></span>
             </button>
             <div className="flex items-center gap-2 pl-2">
               <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                  <img src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff" alt="User" />
               </div>
               <div className="text-left text-[10px] hidden md:block pr-2">
                 <div className="font-semibold text-slate-200">Admin User</div>
                 <div className="text-slate-500">System Administrator</div>
               </div>
             </div>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {[
            { label: "Total Audits", val: "245", trend: "↑ 18.6%", c: "text-blue-400", icon: <ClipboardCheck size={16}/>, up: true },
            { label: "Compliance Rate", val: "92.6%", trend: "↑ 8.8%", c: "text-green-400", icon: <ShieldCheck size={16}/>, up: true },
            { label: "Open Issues", val: "38", trend: "↓ 12.4%", c: "text-red-400", icon: <XCircle size={16}/>, up: false },
            { label: "Closed Issues", val: "207", trend: "↑ 24.7%", c: "text-green-400", icon: <CheckCircle2 size={16}/>, up: true },
            { label: "CAPA Actions", val: "156", trend: "↑ 16.2%", c: "text-blue-400", icon: <FileSearch size={16}/>, up: true },
            { label: "Overdue Actions", val: "12", trend: "↓ 8.3%", c: "text-red-400", icon: <Clock size={16}/>, up: false },
          ].map((kpi, i) => (
             <div key={i} className="bg-[#0a1125] border border-white/5 rounded-xl p-3 flex flex-col justify-center">
               <div className="flex items-center justify-between mb-1">
                 <div className={`p-1.5 rounded-lg bg-[#0d162f] border border-white/5 ${kpi.c}`}>{kpi.icon}</div>
               </div>
               <div className="text-[9px] text-slate-400 mb-0.5">{kpi.label}</div>
               <div className="text-lg font-bold text-slate-200 leading-tight">{kpi.val}</div>
               <div className={`text-[8px] font-semibold mt-1 flex items-center gap-1 ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.trend} <span className="text-slate-500 font-normal">vs Apr 2025</span>
               </div>
             </div>
          ))}
        </div>

        {/* Row 1: Audit Overview, Compliance Trend, Audit Status, Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 h-[180px]">
           {/* Audit Overview Donut */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-[11px] font-semibold">Audit Overview</h3>
                <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0ea5e9" strokeWidth="12" strokeDasharray="221 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="141 251" strokeDashoffset="-70" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">245</span>
                    <span className="text-[7px] text-slate-400">Total Audits</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-[9px] flex-grow pl-3">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-purple-500"></div> Internal</span> <span>96 (39.2%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-sky-500"></div> Supplier</span> <span>68 (27.8%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-yellow-500"></div> Process</span> <span>52 (21.2%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-orange-500"></div> System</span> <span>29 (11.8%)</span></div>
                </div>
              </div>
           </div>

           {/* Compliance Trend Line Chart */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[11px] font-semibold">Compliance Trend</h3>
              </div>
              <div className="flex-grow relative mt-2">
                <div className="absolute inset-0 z-10">
                  <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M0,30 L10,25 L20,15 L30,20 L40,35 L50,40 L60,10 L70,25 L80,30 L90,20 L100,25" fill="none" stroke="#22c55e" strokeWidth="2" className="drop-shadow-[0_2px_4px_rgba(34,197,94,0.5)]" />
                    {/* Point */}
                    <circle cx="60" cy="10" r="2" fill="#fff" stroke="#22c55e" strokeWidth="1" />
                  </svg>
                </div>
                <div className="absolute right-0 top-0 bg-[#0d162f]/80 p-1.5 rounded text-[8px] border border-white/10 z-20 text-center backdrop-blur-sm">
                   <div className="text-slate-400 text-[6px]">May 31, 2025</div>
                   <div className="font-bold text-slate-200">92.6%</div>
                   <div className="text-green-400 text-[6px]">↑ 8.8%</div>
                </div>
                <div className="absolute left-0 top-0 bottom-4 w-6 flex flex-col justify-between text-[7px] text-slate-500 items-end pr-1">
                  <span>100%</span><span>80%</span><span>60%</span><span>40%</span><span>20%</span><span>0%</span>
                </div>
                <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[7px] text-slate-500">
                  <span>May 01</span><span>May 06</span><span>May 11</span><span>May 16</span><span>May 21</span><span>May 26</span><span>May 31</span>
                </div>
              </div>
           </div>

           {/* Audit Status Donut */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-[11px] font-semibold">Audit Status</h3>
                <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="251" strokeDashoffset="37.6" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0ea5e9" strokeWidth="12" strokeDasharray="251" strokeDashoffset="213.3" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251" strokeDashoffset="241" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="251" strokeDashoffset="248" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">245</span>
                    <span className="text-[7px] text-slate-400">Total Audits</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-[9px] flex-grow pl-3">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-green-500"></div> Completed</span> <span>207 (84.5%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-sky-500"></div> In Progress</span> <span>26 (10.6%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-orange-500"></div> Planned</span> <span>9 (3.7%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-red-500"></div> Overdue</span> <span>3 (1.2%)</span></div>
                </div>
              </div>
           </div>

           {/* Compliance Overview Progress Bars */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[11px] font-semibold">Compliance Overview</h3>
                <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>All Departments</option></select>
              </div>
              <div className="flex flex-col gap-2.5 text-[9px]">
                 {[
                   { n: "Production", pct: "95.6%", icon: <Package size={10}/>, color: "bg-green-500", txtColor: "text-green-400" },
                   { n: "Quality Assurance", pct: "92.1%", icon: <ShieldCheck size={10}/>, color: "bg-blue-500", txtColor: "text-blue-400" },
                   { n: "Supply Chain", pct: "89.4%", icon: <Truck size={10}/>, color: "bg-yellow-500", txtColor: "text-yellow-400" },
                   { n: "HR & Training", pct: "88.0%", icon: <Users size={10}/>, color: "bg-orange-500", txtColor: "text-orange-400" },
                   { n: "Maintenance", pct: "84.3%", icon: <Wrench size={10}/>, color: "bg-red-500", txtColor: "text-red-400" },
                 ].map((dept, i) => (
                   <div key={i} className="flex flex-col gap-1">
                     <div className="flex justify-between text-slate-300">
                        <span className="flex items-center gap-1.5"><div className={`p-1 rounded bg-[#0d162f] ${dept.txtColor}`}>{dept.icon}</div> {dept.n}</span> 
                        <span className="font-semibold">{dept.pct}</span>
                     </div>
                     <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden ml-5">
                        <div className={`h-full ${dept.color} rounded-full`} style={{ width: dept.pct }}></div>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Row 2: Issues & Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 h-[180px]">
           {/* Open Issues by Priority Donut */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <h3 className="text-[11px] font-semibold mb-1">Open Issues by Priority</h3>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="172 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="66 251" strokeDashoffset="-105" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">38</span>
                    <span className="text-[7px] text-slate-400">Open Issues</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[9px] flex-grow pl-4">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-red-500"></div> High</span> <span>12 (31.6%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-yellow-500"></div> Medium</span> <span>16 (42.1%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-green-500"></div> Low</span> <span>10 (26.3%)</span></div>
                </div>
              </div>
           </div>

           {/* Issue Aging Bar Chart */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[11px] font-semibold">Issue Aging</h3>
                <span className="text-[8px] text-blue-400 cursor-pointer">View All</span>
              </div>
              <div className="flex items-end justify-between px-2 h-24">
                 {[
                   { v: 8, lbl: "0-7\nDays", h: 40, color: "bg-orange-500" },
                   { v: 12, lbl: "8-15\nDays", h: 80, color: "bg-orange-600" },
                   { v: 9, lbl: "16-30\nDays", h: 50, color: "bg-red-500" },
                   { v: 6, lbl: "31-60\nDays", h: 35, color: "bg-red-600" },
                   { v: 3, lbl: "> 60\nDays", h: 20, color: "bg-purple-600" },
                 ].map((b, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 w-8 text-center">
                       <span className="text-[9px] font-bold text-white">{b.v}</span>
                       <div className="w-5 bg-slate-800 rounded-t relative h-20">
                          <div className={`absolute bottom-0 w-full ${b.color} rounded-t`} style={{height: `${b.h}%`}}></div>
                       </div>
                       <span className="text-[7px] text-slate-400 whitespace-pre-line leading-tight">{b.lbl}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* CAPA Actions Status */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-[11px] font-semibold">CAPA Actions Status</h3>
                <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="93 251" strokeDashoffset="-158" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="26 251" strokeDashoffset="-225" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">156</span>
                    <span className="text-[7px] text-slate-400">Total Actions</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[9px] flex-grow pl-4">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-green-500"></div> Completed</span> <span>98 (62.8%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-orange-500"></div> In Progress</span> <span>42 (26.9%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-red-500"></div> Planned</span> <span>16 (10.3%)</span></div>
                </div>
              </div>
           </div>

           {/* Alerts & Audits Mini column */}
           <div className="flex flex-col gap-3 h-full">
              {/* Upcoming Audits */}
              <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-3 flex-grow flex flex-col">
                 <div className="flex justify-between items-center mb-2">
                   <h3 className="text-[10px] font-semibold">Upcoming Audits</h3>
                   <span className="text-[8px] text-blue-400 cursor-pointer">View All</span>
                 </div>
                 <div className="flex flex-col gap-2 text-[8px]">
                    {[
                      { n: "ISO 9001:2015 Audit", d: "Jun 05, 2025", c: "text-green-400", time: "In 5 Days" },
                      { n: "Supplier Quality Audit", d: "Jun 10, 2025", c: "text-green-400", time: "In 10 Days" },
                      { n: "Internal Process Audit", d: "Jun 15, 2025", c: "text-green-400", time: "In 15 Days" },
                    ].map((audit, i) => (
                       <div key={i} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                             <div className="w-5 h-5 rounded bg-[#0d162f] flex items-center justify-center text-blue-400 border border-white/5"><Calendar size={10}/></div>
                             <div className="flex flex-col">
                                <span className="font-semibold text-slate-200">{audit.n}</span>
                                <span className="text-[7px] text-slate-500">{audit.d}</span>
                             </div>
                          </div>
                          <span className={`${audit.c} font-medium`}>{audit.time}</span>
                       </div>
                    ))}
                 </div>
              </div>
              {/* Recent Alerts */}
              <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-3 flex-grow flex flex-col">
                 <div className="flex justify-between items-center mb-2">
                   <h3 className="text-[10px] font-semibold">Recent Alerts</h3>
                   <span className="text-[8px] text-blue-400 cursor-pointer">View All</span>
                 </div>
                 <div className="flex flex-col gap-2 text-[8px]">
                    {[
                      { n: "3 Overdue CAPA Actions", sub: "Due since May 25, 2025", c: "text-red-400" },
                      { n: "2 High Priority Issues Open", sub: "Requires immediate attention", c: "text-red-400" },
                      { n: "Training Compliance Low", sub: "12 employees due for training", c: "text-orange-400" },
                    ].map((alert, i) => (
                       <div key={i} className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded bg-[#0d162f] flex items-center justify-center border border-white/5 ${alert.c}`}><AlertTriangle size={10}/></div>
                          <div className="flex flex-col">
                             <span className="font-semibold text-slate-200 truncate w-36">{alert.n}</span>
                             <span className="text-[7px] text-slate-500">{alert.sub}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Row 3: Quality Control & Document Control */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[100px]">
           {/* Quality Control Overview */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden">
              <div className="flex items-center gap-3 mb-2 relative z-10">
                 <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400"><CheckCircle2 size={14}/></div>
                 <h3 className="text-[11px] font-semibold">Quality Control Overview</h3>
              </div>
              <div className="flex justify-between text-[10px] relative z-10">
                 <div>
                    <div className="text-slate-400 mb-0.5">Inspections</div>
                    <div className="text-xl font-bold">320</div>
                    <div className="text-[8px] text-green-400 mt-1">↑ 15.2% vs Apr 2025</div>
                 </div>
                 <div>
                    <div className="text-slate-400 mb-0.5 flex items-center gap-1"><XCircle size={10}/> Defects Found</div>
                    <div className="text-xl font-bold text-red-400">48</div>
                    <div className="text-[8px] text-green-400 mt-1">↓ 8.7% vs Apr 2025</div>
                 </div>
                 <div>
                    <div className="text-slate-400 mb-0.5 flex items-center gap-1"><TrendingDown size={10}/> Defect Rate</div>
                    <div className="text-xl font-bold">2.35%</div>
                    <div className="text-[8px] text-green-400 mt-1">↓ 0.6% vs Apr 2025</div>
                 </div>
                 <div>
                    <div className="text-slate-400 mb-0.5 flex items-center gap-1"><Wrench size={10}/> Rework Cost</div>
                    <div className="text-xl font-bold text-yellow-400">$12,450</div>
                    <div className="text-[8px] text-green-400 mt-1">↓ 10.3% vs Apr 2025</div>
                 </div>
              </div>
              {/* Graphic element */}
              <div className="absolute right-0 top-0 bottom-0 w-32 opacity-20 pointer-events-none">
                 <div className="w-32 h-32 absolute -right-10 -top-10 bg-blue-500 rounded-full blur-3xl"></div>
                 <ShieldCheck size={100} className="text-blue-500 absolute -right-4 -bottom-4 transform rotate-12" strokeWidth={1} />
              </div>
           </div>

           {/* Document Control */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-3">
                 <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-400"><FolderOpen size={14}/></div>
                    <h3 className="text-[11px] font-semibold">Document Control</h3>
                 </div>
                 <span className="text-[8px] text-blue-400 cursor-pointer">View All</span>
              </div>
              <div className="flex justify-between text-[10px]">
                 <div>
                    <div className="text-slate-400 mb-0.5">Total Documents</div>
                    <div className="text-xl font-bold">1,256</div>
                 </div>
                 <div>
                    <div className="text-slate-400 mb-0.5 text-green-400">Approved</div>
                    <div className="text-xl font-bold">1,024</div>
                    <div className="text-[8px] text-green-400 mt-1">81.5%</div>
                 </div>
                 <div>
                    <div className="text-slate-400 mb-0.5 text-blue-400">Under Review</div>
                    <div className="text-xl font-bold">156</div>
                    <div className="text-[8px] text-blue-400 mt-1">12.4%</div>
                 </div>
                 <div>
                    <div className="text-slate-400 mb-0.5 text-red-400">Expired</div>
                    <div className="text-xl font-bold">76</div>
                    <div className="text-[8px] text-red-400 mt-1">6.1%</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Bottom Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-auto pb-1">
           {[
             { label: "Schedule Audit", sub: "Plan a new audit", icon: <Calendar size={16}/>, c: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
             { label: "Report Issue", sub: "Log a new issue", icon: <AlertTriangle size={16}/>, c: "text-red-400 bg-red-500/10 border-red-500/20" },
             { label: "Create CAPA", sub: "Start corrective action", icon: <FileSearch size={16}/>, c: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
             { label: "Document Upload", sub: "Upload new document", icon: <Upload size={16}/>, c: "text-green-400 bg-green-500/10 border-green-500/20" },
             { label: "Training Assign", sub: "Assign training", icon: <BookOpen size={16}/>, c: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
           ].map((card, i) => (
              <div key={i} className="bg-[#0a1125] border border-white/5 rounded-xl p-2.5 flex items-center justify-between cursor-pointer hover:bg-[#15234b] transition group">
                 <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg border ${card.c}`}>
                      {card.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-200 leading-tight">{card.label}</span>
                      <span className="text-[7px] text-slate-500">{card.sub}</span>
                    </div>
                 </div>
                 <div className="text-slate-600 group-hover:text-blue-400 transition">&gt;</div>
              </div>
           ))}
        </div>

      </div>
    </div>
  );
}
