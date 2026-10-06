import React from "react";
import { 
  Users, Calendar, Bell, DollarSign, 
  BarChart3, PieChart, TrendingUp, CheckCircle, Target, User, Inbox, Phone, Mail
} from "lucide-react";

export default function CRMMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[512px] text-white bg-[#030816] rounded-3xl p-5 flex-col lg:flex-row gap-5">
      
      {/* Left Sidebar */}
      <div className="w-64 bg-[#0a1125] border border-white/5 p-5 flex flex-col gap-4 rounded-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-500 border border-purple-500/30">
            <Users size={24} />
          </div>
          <h2 className="text-2xl font-bold">CRM</h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">Manage customers, leads, sales, and customer relationships.</p>
        
        <div className="flex flex-col gap-4">
           {[
             { title: "Lead Management", desc: "Capture, track & nurture high-quality leads.", icon: <Inbox size={16}/> },
             { title: "Customer Insights", desc: "360° customer view for better relationships.", icon: <User size={16}/> },
             { title: "Sales Pipeline", desc: "Visualize opportunities and close more deals.", icon: <BarChart3 size={16}/> },
             { title: "Smart Follow-ups", desc: "Automate tasks and never miss an opportunity.", icon: <Bell size={16}/> },
           ].map((item, i) => (
             <div key={i} className="flex gap-3 items-start">
               <div className="mt-1 text-purple-500">{item.icon}</div>
               <div>
                 <div className="text-xs font-semibold text-slate-200">{item.title}</div>
                 <div className="text-[8px] text-[#15172B]/60">{item.desc}</div>
               </div>
             </div>
           ))}
        </div>

        {/* Character Illustration Area */}
        <div className="mt-auto relative h-32 bg-purple-500/5 rounded-xl border border-purple-500/10 flex items-end justify-center overflow-hidden">
           {/* Abstract shapes to represent the illustration */}
           <div className="absolute w-20 h-20 bg-purple-500/20 rounded-full blur-xl bottom-[-8px]"></div>
           <div className="absolute right-2 top-2 text-[#EB3158]"><Target size={16}/></div>
           <div className="absolute left-2 top-6 text-green-400"><Phone size={14}/></div>
           <div className="absolute right-6 top-8 text-pink-400"><Mail size={16}/></div>
           <div className="z-10 px-4 py-1.5 bg-[#0a1125] border border-white/10 rounded-t-lg font-bold text-sm">CRM</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col gap-4">
        
        {/* Header */}
        <div className="flex justify-between items-center">
           <div>
             <h2 className="text-xl font-bold">CRM Dashboard</h2>
             <p className="text-xs text-slate-400">Build stronger relationships. Close more deals.</p>
           </div>
           <div className="flex items-center gap-3">
             <button className="w-8 h-8 rounded-lg bg-[#0a1125] flex items-center justify-center border border-white/10">
               <Calendar size={14} className="text-slate-300" />
             </button>
             <button className="w-8 h-8 rounded-lg bg-[#0a1125] flex items-center justify-center border border-white/10 relative">
               <Bell size={14} className="text-slate-300" />
               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"></span>
             </button>
             <div className="flex items-center gap-2 bg-[#0a1125] border border-white/10 px-2 py-1 rounded-full">
               <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[8px] font-bold">JD</div>
               <div className="text-[8px] hidden sm:block pr-2">
                 <div className="font-semibold">John Doe</div>
                 <div className="text-[#15172B]/60 text-[6.4px]">Sales Manager</div>
               </div>
             </div>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Leads", val: "1,250", trend: "+12.5%", up: true, icon: <Users size={18}/>, color: "text-[#EB3158]" },
            { label: "Opportunities", val: "320", trend: "+8.3%", up: true, icon: <Target size={18}/>, color: "text-purple-400" },
            { label: "Conversions", val: "24.6%", trend: "+4.7%", up: true, icon: <TrendingUp size={18}/>, color: "text-green-400" },
            { label: "Revenue", val: "$68,420", trend: "+15.3%", up: true, icon: <DollarSign size={18}/>, color: "text-orange-400" },
          ].map((kpi, i) => (
             <div key={i} className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
               <div>
                 <div className="text-[8px] text-slate-400 mb-1">{kpi.label}</div>
                 <div className="text-xl font-bold">{kpi.val}</div>
                 <div className={`text-[7.2px] mt-1 ${kpi.up ? 'text-green-500' : 'text-red-500'}`}>
                   {kpi.up ? '↑ ' : '↓ '}{kpi.trend}
                 </div>
               </div>
               <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${kpi.color}`}>
                 {kpi.icon}
               </div>
             </div>
          ))}
        </div>

        {/* Row 1 Charts */}
        <div className="grid grid-cols-3 gap-4 h-48">
           {/* Sales Pipeline Funnel */}
           <div className="col-span-2 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <h3 className="text-xs font-semibold mb-4">Sales Pipeline</h3>
              <div className="flex-grow flex items-center justify-between">
                 {[
                   { label: "New Lead", val: "320", rev: "$12,500", c: "bg-[#EB3158]" },
                   { label: "Contacted", val: "220", rev: "$18,400", c: "bg-indigo-500" },
                   { label: "Qualified", val: "150", rev: "$24,400", c: "bg-purple-500" },
                   { label: "Proposal", val: "80", rev: "$32,000", c: "bg-pink-500" },
                   { label: "Won", val: "50", rev: "$68,420", c: "bg-green-500" },
                 ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 relative">
                       <div className="text-[7.2px] text-slate-400 mb-1">{step.label}</div>
                       <div className="text-sm font-bold mb-2">{step.val}</div>
                       {/* Funnel visual element */}
                       <div className={`w-full h-8 ${step.c} flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                            style={{ clipPath: i === 0 ? 'polygon(0% 0%, 100% 10%, 100% 90%, 0% 100%)' :
                                               i === 4 ? 'polygon(0% 10%, 100% 20%, 100% 80%, 0% 90%)' : 
                                               'polygon(0% 10%, 100% 10%, 100% 90%, 0% 90%)' }}>
                       </div>
                       <div className="text-[8px] text-slate-300 mt-2">{step.rev}</div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Leads by Source */}
           <div className="col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <h3 className="text-xs font-semibold mb-2">Leads by Source</h3>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="100 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a855f7" strokeWidth="12" strokeDasharray="60 251" strokeDashoffset="-100" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="12" strokeDasharray="20 251" strokeDashoffset="-160" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">1,250</span>
                    <span className="text-[6.4px] text-slate-400">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-[7.2px] flex-grow pl-4">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#EB3158]"></div> Website</span> <span>42%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Referral</span> <span>26%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Social</span> <span>20%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Email</span> <span>8%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Others</span> <span>4%</span></div>
                </div>
              </div>
           </div>
        </div>

        {/* Row 2 Charts/Lists */}
        <div className="grid grid-cols-3 gap-4 h-44">
           {/* Lead Overview Line Chart */}
           <div className="col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Lead Overview</h3>
                <select className="bg-transparent text-[7.2px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow relative mt-2">
                <div className="absolute inset-0 z-10">
                  <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M0,45 L20,30 L40,35 L60,10 L80,25 L100,5" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_5px_#3b82f6]" />
                    <path d="M0,45 L20,30 L40,35 L60,10 L80,25 L100,5 L100,50 L0,50 Z" fill="url(#crmGradient)" opacity="0.2" />
                    <defs>
                      <linearGradient id="crmGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                {/* Overlay box */}
                <div className="absolute bottom-2 right-2 bg-[#030816]/80 p-1.5 rounded border border-white/10 z-20 text-[7.2px] backdrop-blur-sm">
                   <div className="font-bold text-sm">1,250</div>
                   <div className="text-slate-400">Total Leads</div>
                </div>
              </div>
           </div>

           {/* Top Deals */}
           <div className="col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold">Top Deals</h3>
                <span className="text-[7.2px] text-[#EB3158] cursor-pointer">View All</span>
              </div>
              <div className="flex flex-col gap-2.5">
                 {[
                   { n: "Acme Corporation", v: "$24,000", s: "Proposal", bg: "bg-[#EB3158]" },
                   { n: "Globex Corporation", v: "$18,500", s: "Qualified", bg: "bg-green-500" },
                   { n: "Innotech Solutions", v: "$15,200", s: "Contacted", bg: "bg-purple-500" },
                   { n: "TechNova Inc.", v: "$12,800", s: "New Lead", bg: "bg-orange-500" },
                 ].map((deal, i) => (
                   <div key={i} className="flex justify-between items-center text-[8px]">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded flex items-center justify-center font-bold ${deal.bg}`}>{deal.n[0]}</div>
                        <span className="text-slate-200 truncate w-24">{deal.n}</span>
                      </div>
                      <span className="font-bold">{deal.v}</span>
                      <span className="text-slate-400">{deal.s}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Recent Activities */}
           <div className="col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold">Recent Activities</h3>
                <span className="text-[7.2px] text-[#EB3158] cursor-pointer">View All</span>
              </div>
              <div className="flex flex-col gap-2.5">
                 {[
                   { t: "New lead from Website", time: "2 min ago", icon: <User size={10}/>, c: "text-[#EB3158] bg-blue-500/20" },
                   { t: "Email sent to John Doe", time: "15 min ago", icon: <Mail size={10}/>, c: "text-indigo-400 bg-indigo-500/20" },
                   { t: "Follow-up call with Acme", time: "30 min ago", icon: <Phone size={10}/>, c: "text-purple-400 bg-purple-500/20" },
                   { t: "Deal won with TechNova", time: "2 hours ago", icon: <CheckCircle size={10}/>, c: "text-green-400 bg-green-500/20" },
                 ].map((act, i) => (
                   <div key={i} className="flex justify-between items-center text-[7.2px]">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${act.c}`}>{act.icon}</div>
                        <span className="text-slate-200 truncate w-32">{act.t}</span>
                      </div>
                      <span className="text-[#15172B]/60">{act.time}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Bottom Footer KPIs */}
        <div className="grid grid-cols-5 gap-4 mt-auto">
           {[
             { label: "Active Leads", val: "850", trend: "+11.4%", icon: <Users size={14}/>, color: "text-[#EB3158]" },
             { label: "Open Deals", val: "120", trend: "+7.8%", icon: <DollarSign size={14}/>, color: "text-yellow-400" },
             { label: "Tasks Due", val: "18", sub: "Due Today", icon: <CheckCircle size={14}/>, color: "text-orange-400" },
             { label: "Meetings", val: "5", sub: "Today", icon: <Calendar size={14}/>, color: "text-purple-400" },
             { label: "Win Rate", val: "28.5%", trend: "+5.6%", icon: <TrendingUp size={14}/>, color: "text-green-400" },
           ].map((item, i) => (
             <div key={i} className="bg-[#0a1125] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>{item.icon}</div>
                <div>
                   <div className="text-[8px] text-slate-400">{item.label}</div>
                   <div className="text-sm font-bold flex items-center gap-2">
                     {item.val}
                     {item.trend && <span className="text-[6.4px] text-green-500 font-normal">↑ {item.trend}</span>}
                   </div>
                   {item.sub && <div className="text-[6.4px] text-[#15172B]/60">{item.sub}</div>}
                </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
}
