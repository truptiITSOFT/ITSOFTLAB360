import React from "react";
import { 
  Target, Users2, Briefcase, FileText, Activity, 
  MapPin, BarChart3, TrendingUp, TrendingDown, Bell, Calendar,
  Crown, Percent, DollarSign, ClipboardCheck, PhoneCall, Video, UserPlus, FilePlus, PlayCircle
} from "lucide-react";

export default function SalesForceMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[640px] text-white bg-[#030816] rounded-3xl p-5 flex-col lg:flex-row gap-5">
      
      {/* Left Sidebar */}
      <div className="w-64 bg-[#0a1125] border border-white/5 p-5 flex flex-col gap-4 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col gap-2 mb-2 pt-2 z-10">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-[#EB3158] border border-blue-500/30">
            <Target size={28} />
          </div>
          <h2 className="text-xl font-bold mt-2">SALES FORCE<br/><span className="text-[#EB3158]">AUTOMATION</span></h2>
        </div>
        <p className="text-[11px] text-slate-400 mb-2 z-10">Track leads, opportunities, quotations, field sales activities, customer visits, and sales performance.</p>
        
        <div className="flex flex-col gap-3 z-10">
           {[
             { title: "Lead Tracking", desc: "Capture, qualify and convert more leads.", icon: <Users2 size={16}/>, color: "text-[#EB3158]", bg: "bg-blue-500/20" },
             { title: "Opportunity Management", desc: "Track opportunities and close more deals.", icon: <Crown size={16}/>, color: "text-orange-500", bg: "bg-orange-500/20" },
             { title: "Field Sales Activities", desc: "Plan visits, log activities and follow-ups.", icon: <Activity size={16}/>, color: "text-teal-500", bg: "bg-teal-500/20" },
             { title: "Customer Visits", desc: "Record customer visits and build stronger relationships.", icon: <MapPin size={16}/>, color: "text-purple-500", bg: "bg-purple-500/20" },
             { title: "Sales Performance", desc: "Monitor individual and team performance.", icon: <BarChart3 size={16}/>, color: "text-yellow-500", bg: "bg-yellow-500/20" },
           ].map((item, i) => (
             <div key={i} className="flex gap-3 items-start p-2 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/5 cursor-pointer">
               <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>{item.icon}</div>
               <div>
                 <div className="text-xs font-semibold text-slate-200 leading-tight">{item.title}</div>
                 <div className="text-[9px] text-[#15172B]/60 mt-0.5">{item.desc}</div>
               </div>
             </div>
           ))}
        </div>

        {/* Sales Chart Graphic Area */}
        <div className="mt-auto h-32 relative flex items-end justify-center z-10 pt-4">
           {/* Abstract Glow */}
           <div className="absolute w-32 h-32 bg-[#EB3158]/20 rounded-full blur-2xl bottom-[-20px]"></div>
           
           <div className="relative w-full h-full flex items-end justify-center z-20">
              {/* Bar Chart Graphics */}
              <div className="flex items-end gap-1 mb-2">
                 <div className="w-4 h-6 bg-blue-900 rounded-t-sm shadow-[0_0_10px_rgba(30,58,138,0.5)]"></div>
                 <div className="w-4 h-10 bg-blue-800 rounded-t-sm shadow-[0_0_10px_rgba(30,64,175,0.5)]"></div>
                 <div className="w-4 h-14 bg-blue-700 rounded-t-sm shadow-[0_0_10px_rgba(29,78,216,0.5)]"></div>
                 <div className="w-4 h-18 bg-[#EB3158] rounded-t-sm shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                 <div className="w-4 h-24 bg-[#EB3158] rounded-t-sm shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
              </div>
              
              {/* Target / MapPin icon floating */}
              <div className="absolute right-4 bottom-16 text-cyan-400 bg-[#0a1125] p-1 rounded-full border border-cyan-500/30">
                <Target size={14} />
              </div>
              <div className="absolute left-8 bottom-6 text-purple-400">
                <MapPin size={12} />
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col gap-4">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0a1125] p-4 rounded-2xl border border-white/5">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[#EB3158]">
               <Briefcase size={20} />
             </div>
             <div>
               <h2 className="text-lg font-bold">Sales Force Automation Dashboard</h2>
               <p className="text-[11px] text-slate-400">Drive sales productivity. Close more deals.</p>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-[#0d162f] border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300">
               May 2025 <Calendar size={12} />
             </div>
             <button className="w-8 h-8 rounded-lg bg-[#0d162f] flex items-center justify-center border border-white/10 relative">
               <Bell size={14} className="text-slate-300" />
               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"></span>
             </button>
             <div className="flex items-center gap-2 pl-2">
               <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold shadow-md">AK</div>
               <div className="text-left text-[10px] hidden md:block pr-2">
                 <div className="font-semibold text-slate-200">Amit Kumar</div>
                 <div className="text-[#15172B]/60">Regional Sales Manager</div>
               </div>
             </div>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total Leads", val: "2,450", trend: "+18.6%", up: true, icon: <Users2 size={16}/>, color: "text-[#EB3158]", bg: "bg-[#EB3158]/10" },
            { label: "Opportunities", val: "1,025", trend: "+14.2%", up: true, icon: <Crown size={16}/>, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Win Rate", val: "32.8%", trend: "+6.3%", up: true, icon: <Percent size={16}/>, color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { label: "Total Quotations", val: "784", trend: "+11.7%", up: true, icon: <FileText size={16}/>, color: "text-purple-400", bg: "bg-purple-500/10" },
            { label: "Revenue", val: "$98,420", trend: "+21.4%", up: true, icon: <DollarSign size={16}/>, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Sales Activities", val: "1,865", trend: "+17.5%", up: true, icon: <ClipboardCheck size={16}/>, color: "text-teal-400", bg: "bg-teal-500/10" },
          ].map((kpi, i) => (
             <div key={i} className="bg-[#0a1125] border border-white/5 rounded-2xl p-3 flex flex-col justify-center">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] text-slate-400 leading-tight w-20">{kpi.label}</span>
                 <div className={`p-1.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
                   {kpi.icon}
                 </div>
               </div>
               <div className="text-lg font-bold">{kpi.val}</div>
               <div className={`text-[9px] mt-1 font-medium flex items-center gap-1 ${kpi.up ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.up ? <TrendingUp size={10}/> : <TrendingDown size={10}/>} {kpi.trend} <span className="text-[#15172B]/60 font-normal">vs Apr 2025</span>
               </div>
             </div>
          ))}
        </div>

        {/* Row 1: Funnel, Stage Donut, Performance Line */}
        <div className="flex flex-col lg:flex-row gap-4 h-[240px]">
           
           {/* Navigation & Funnel */}
           <div className="lg:w-2/5 flex gap-4">
              {/* Inner Sidebar Menu */}
              <div className="w-28 bg-[#0a1125] rounded-2xl border border-white/5 py-3 flex flex-col gap-1 text-[10px]">
                 {[
                   { label: "Dashboard", active: true },
                   { label: "Leads", active: false },
                   { label: "Opportunities", active: false },
                   { label: "Quotations", active: false },
                   { label: "Accounts", active: false },
                   { label: "Contacts", active: false },
                   { label: "Field Activities", active: false },
                   { label: "Customer Visits", active: false },
                   { label: "Calendar", active: false },
                   { label: "Reports", active: false },
                   { label: "Analytics", active: false },
                 ].map((item, i) => (
                   <div key={i} className={`px-4 py-1.5 cursor-pointer transition-colors ${item.active ? 'bg-[#EB3158] border-l-2 border-blue-400 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}>
                     {item.label}
                   </div>
                 ))}
              </div>

              {/* Sales Funnel */}
              <div className="flex-grow bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
                 <div className="flex justify-between items-center mb-2">
                   <h3 className="text-xs font-semibold">Sales Funnel</h3>
                   <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
                 </div>
                 <div className="flex-grow flex items-center justify-between mt-2">
                    <div className="w-1/2 flex flex-col justify-center gap-1 relative z-10">
                      {/* Funnel Layers */}
                      <div className="h-8 bg-[#EB3158] rounded-sm w-full shadow-md text-center"></div>
                      <div className="h-8 bg-teal-500 rounded-sm w-5/6 mx-auto shadow-md"></div>
                      <div className="h-8 bg-purple-500 rounded-sm w-4/6 mx-auto shadow-md"></div>
                      <div className="h-8 bg-orange-500 rounded-sm w-3/6 mx-auto shadow-md"></div>
                      <div className="h-8 bg-red-500 rounded-sm w-2/6 mx-auto shadow-md"></div>
                    </div>
                    <div className="w-1/2 flex flex-col justify-between h-full py-1 text-[9px] pl-4">
                       <div className="flex justify-between text-slate-300"><span>Leads</span> <span className="font-bold">2,450</span></div>
                       <div className="flex justify-between text-slate-300"><span>Qualified</span> <span className="font-bold">1,650</span></div>
                       <div className="flex justify-between text-slate-300"><span>Proposals</span> <span className="font-bold">1,025</span></div>
                       <div className="flex justify-between text-slate-300"><span>Negotiation</span> <span className="font-bold">420</span></div>
                       <div className="flex justify-between text-slate-300"><span>Won</span> <span className="font-bold">336</span></div>
                    </div>
                 </div>
                 <div className="text-center text-[9px] text-[#EB3158] font-bold mt-2">
                    Conversion Rate : 13.7%
                 </div>
              </div>
           </div>

           {/* Opps by Stage & Performance */}
           <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Opportunities by Stage */}
              <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
                 <div className="flex justify-between items-center mb-2">
                   <h3 className="text-xs font-semibold">Opportunities by Stage</h3>
                   <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
                 </div>
                 <div className="flex-grow flex items-center justify-between">
                   <div className="relative w-28 h-28">
                     <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0ea5e9" strokeWidth="16" strokeDasharray="251" />
                       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="16" strokeDasharray="160 251" strokeDashoffset="0" />
                       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="16" strokeDasharray="100 251" strokeDashoffset="-160" />
                       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="16" strokeDasharray="50 251" strokeDashoffset="-260" />
                       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="15 251" strokeDashoffset="-310" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-[12px] font-bold">1,025</span>
                       <span className="text-[7px] text-slate-400">Total</span>
                     </div>
                   </div>
                   <div className="flex flex-col gap-1.5 text-[9px] flex-grow pl-4">
                      <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-sky-500"></div> Qualification</span> <span className="text-slate-400">35% (359)</span></div>
                      <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-green-500"></div> Proposal</span> <span className="text-slate-400">25% (256)</span></div>
                      <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-purple-500"></div> Negotiation</span> <span className="text-slate-400">20% (205)</span></div>
                      <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-orange-500"></div> Closed Won</span> <span className="text-slate-400">15% (154)</span></div>
                      <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-red-500"></div> Closed Lost</span> <span className="text-slate-400">5% (51)</span></div>
                   </div>
                 </div>
              </div>

              {/* Sales Performance Line Chart */}
              <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col relative">
                 <div className="flex justify-between items-center mb-2">
                   <h3 className="text-xs font-semibold">Sales Performance</h3>
                   <span className="text-[8px] text-[#EB3158] cursor-pointer">View All</span>
                 </div>
                 <div className="flex-grow relative mt-2">
                   <div className="absolute inset-0 z-10">
                     <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                       <path d="M0,40 L10,30 L20,35 L30,20 L40,25 L50,15 L60,25 L70,10 L80,20 L90,5 L100,10" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_2px_4px_rgba(59,130,246,0.5)]" />
                       {/* Points */}
                       <circle cx="20" cy="35" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                       <circle cx="50" cy="15" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                       <circle cx="70" cy="10" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                       <circle cx="90" cy="5" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                     </svg>
                   </div>
                   <div className="absolute right-0 top-0 bg-[#0d162f]/80 p-1.5 rounded text-[8px] border border-white/10 z-20 text-center backdrop-blur-sm">
                      <div className="text-slate-400 text-[6px]">May 29, 2025</div>
                      <div className="font-bold text-slate-200 mt-0.5">$98,420</div>
                   </div>
                   <div className="absolute left-0 top-0 bottom-4 w-6 flex flex-col justify-between text-[7px] text-[#15172B]/60 items-end pr-1">
                     <span>125k</span><span>100k</span><span>75k</span><span>50k</span><span>25k</span><span>0</span>
                   </div>
                   <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[7px] text-[#15172B]/60">
                     <span>May 01</span><span>May 08</span><span>May 15</span><span>May 22</span><span>May 29</span>
                   </div>
                 </div>
              </div>

           </div>
        </div>

        {/* Row 2: Lists & Customer Visits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[160px]">
           
           {/* Recent Leads */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold">Recent Leads</h3>
                <span className="text-[8px] text-[#EB3158] cursor-pointer">View All</span>
              </div>
              <div className="flex flex-col gap-2.5 text-[9px]">
                 {[
                   { n: "Ravi Enterprises", s: "New Lead", t: "2 min ago", bg: "bg-[#EB3158]" },
                   { n: "Global Tech Solutions", s: "New Lead", t: "15 min ago", bg: "bg-teal-600" },
                   { n: "Sunrise Industries", s: "Qualified", t: "32 min ago", bg: "bg-green-600" },
                   { n: "Omega Corp", s: "New Lead", t: "1 hr ago", bg: "bg-purple-600" },
                   { n: "Bright Future Pvt. Ltd.", s: "New Lead", t: "2 hr ago", bg: "bg-indigo-600" },
                 ].map((lead, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[8px] ${lead.bg}`}>{lead.n[0]}</div>
                        <span className="text-slate-200 truncate w-20">{lead.n}</span>
                      </div>
                      <span className="text-slate-400">{lead.s}</span>
                      <span className="text-[#15172B]/60">{lead.t}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Upcoming Activities */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold">Upcoming Activities</h3>
                <span className="text-[8px] text-[#EB3158] cursor-pointer">View Calendar</span>
              </div>
              <div className="flex flex-col gap-2 text-[9px] relative pl-3">
                 <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-slate-800"></div>
                 {[
                   { t: "Client Meeting - Acme Corp", d: "Today, 11:00 AM", icon: <Users2 size={8}/>, c: "text-[#EB3158] bg-[#0d162f] border-[#EB3158]/50" },
                   { t: "Product Demo - Global Tech", d: "Today, 02:30 PM", icon: <PlayCircle size={8}/>, c: "text-green-400 bg-[#0d162f] border-green-500" },
                   { t: "Site Visit - Sunrise Industries", d: "Tomorrow, 10:00 AM", icon: <MapPin size={8}/>, c: "text-orange-400 bg-[#0d162f] border-orange-500" },
                   { t: "Follow-up Call - Omega Corp", d: "Tomorrow, 03:00 PM", icon: <PhoneCall size={8}/>, c: "text-purple-400 bg-[#0d162f] border-purple-500" },
                 ].map((act, i) => (
                   <div key={i} className="flex flex-col relative pl-3 mb-1">
                      <div className={`absolute -left-2.5 top-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${act.c} z-10 shadow-md`}>
                        {act.icon}
                      </div>
                      <span className="text-slate-200 font-medium leading-tight">{act.t}</span>
                      <span className="text-[#15172B]/60 text-[8px]">{act.d}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Top Sales Representatives */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold">Top Sales Representatives</h3>
                <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex flex-col gap-2.5 text-[9px]">
                 {[
                   { id: "1", n: "Amit Kumar", v: "$24,680", trend: "+18.6%" },
                   { id: "2", n: "Sneha Sharma", v: "$18,450", trend: "+12.4%" },
                   { id: "3", n: "Rahul Verma", v: "$15,230", trend: "+9.8%" },
                   { id: "4", n: "Vikram Singh", v: "$12,780", trend: "+8.1%" },
                   { id: "5", n: "Neha Patel", v: "$10,620", trend: "+7.2%" },
                 ].map((rep, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] text-[#15172B]/60 w-2">{rep.id}</span>
                        <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[8px] font-bold text-white overflow-hidden">
                           <img src={`https://ui-avatars.com/api/?name=${rep.n}&background=random&color=fff&size=20`} alt={rep.n} />
                        </div>
                        <span className="text-slate-200 truncate w-20">{rep.n}</span>
                      </div>
                      <span className="font-semibold">{rep.v}</span>
                      <span className="text-green-400 text-[8px]">↑ {rep.trend}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Customer Visits Overview */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xs font-semibold">Customer Visits Overview</h3>
                <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="16" strokeDasharray="241 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="16" strokeDasharray="210 251" strokeDashoffset="-10" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray="150 251" strokeDashoffset="-60" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[12px] font-bold">256</span>
                    <span className="text-[6px] text-slate-400 leading-tight">Total Visits</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-[8px] flex-grow pl-3">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-[#EB3158]"></div> Completed</span> <span className="text-slate-400">156 (60.9%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-green-500"></div> In Progress</span> <span className="text-slate-400">58 (22.7%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-orange-500"></div> Planned</span> <span className="text-slate-400">32 (12.5%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-red-500"></div> Cancelled</span> <span className="text-slate-400">10 (3.9%)</span></div>
                </div>
              </div>
           </div>

        </div>

        {/* Small Bottom Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-auto">
           {[
             { label: "Add Lead", sub: "Capture new lead", icon: <UserPlus size={16}/>, c: "text-[#EB3158] bg-[#EB3158]/10" },
             { label: "Create Opportunity", sub: "New business opportunity", icon: <Crown size={16}/>, c: "text-green-400 bg-green-500/10" },
             { label: "Create Quotation", sub: "Generate new quote", icon: <FilePlus size={16}/>, c: "text-indigo-400 bg-indigo-500/10" },
             { label: "Log Activity", sub: "Add sales activity", icon: <ClipboardCheck size={16}/>, c: "text-teal-400 bg-teal-500/10" },
             { label: "Schedule Visit", sub: "Plan customer visit", icon: <MapPin size={16}/>, c: "text-purple-400 bg-purple-500/10" },
           ].map((card, i) => (
              <div key={i} className="bg-[#0a1125] border border-white/5 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-[#15234b] transition">
                 <div className={`p-2 rounded-xl ${card.c}`}>
                   {card.icon}
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-slate-200 leading-tight my-0.5">{card.label}</span>
                   <span className="text-[8px] text-[#15172B]/60">{card.sub}</span>
                 </div>
              </div>
           ))}
        </div>

      </div>
    </div>
  );
}
