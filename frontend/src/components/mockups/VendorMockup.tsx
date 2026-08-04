import React from "react";
import { 
  Store, Calendar, Bell, Users, ShoppingCart, 
  FileText, DollarSign, Target, Truck, BarChart3, TrendingUp, TrendingDown,
  UserPlus, PackageCheck, CreditCard, ShieldCheck, ChevronRight, CheckCircle2,
  ClipboardList, AlertTriangle, Shield, Clock, Star
} from "lucide-react";

export default function VendorMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[640px] text-white bg-[#030816] rounded-3xl p-5 flex-col lg:flex-row gap-5">
      
      {/* Left Sidebar */}
      <div className="w-64 bg-[#0a1125] border border-white/5 p-5 flex flex-col gap-4 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col gap-2 mb-2 pt-2 z-10">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-500 border border-teal-500/30">
            <Store size={28} />
          </div>
          <h2 className="text-xl font-bold mt-2">VENDOR<br/><span className="text-sm font-medium text-teal-400">MANAGEMENT SYSTEM</span></h2>
        </div>
        <p className="text-[11px] text-slate-400 mb-2 z-10">Handle vendor onboarding, procurement, contracts, purchase orders, and payments efficiently.</p>
        
        <div className="flex flex-col gap-3 z-10">
           {[
             { title: "Vendor Onboarding", desc: "Easy registration and verification process.", icon: <UserPlus size={16}/>, color: "text-purple-500", bg: "bg-purple-500/20" },
             { title: "Procurement Control", desc: "Create POs, track orders & manage deliveries.", icon: <ShoppingCart size={16}/>, color: "text-[#EB3158]", bg: "bg-blue-500/20" },
             { title: "Contract Management", desc: "Manage contracts, terms, renewals & compliance.", icon: <FileText size={16}/>, color: "text-green-500", bg: "bg-green-500/20" },
             { title: "Payment Automation", desc: "Process payments and track vendor dues.", icon: <CreditCard size={16}/>, color: "text-yellow-500", bg: "bg-yellow-500/20" },
             { title: "Performance Insights", desc: "Evaluate vendor performance with real-time analytics.", icon: <BarChart3 size={16}/>, color: "text-orange-500", bg: "bg-orange-500/20" },
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

        {/* Truck Graphic */}
        <div className="mt-auto h-24 relative flex items-end justify-center z-10 pt-4">
           {/* Glow */}
           <div className="absolute w-32 h-32 bg-teal-500/20 rounded-full blur-2xl bottom-[-20px]"></div>
           <div className="relative bg-[#0d162f] p-3 rounded-xl border border-teal-500/50 flex items-center justify-center">
              <div className="w-16 h-12 bg-[#EB3158] rounded-md border border-blue-400 flex items-center justify-center relative shadow-[0_5px_15px_rgba(37,99,235,0.5)] z-20">
                <Truck size={24} className="text-white" />
                <div className="absolute bottom-[-6px] left-2 w-4 h-4 bg-slate-800 rounded-full border border-slate-600"></div>
                <div className="absolute bottom-[-6px] right-2 w-4 h-4 bg-slate-800 rounded-full border border-slate-600"></div>
              </div>
              <div className="absolute top-1 right-2 bg-teal-500/20 text-teal-400 text-[8px] font-bold px-1 rounded">VENDOR</div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col gap-4">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0a1125] p-4 rounded-2xl border border-white/5">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-500">
               <Store size={20} />
             </div>
             <div>
               <h2 className="text-lg font-bold">Vendor Management Dashboard</h2>
               <p className="text-[11px] text-slate-400">Monitor vendors, procurement, contracts and payments in real-time.</p>
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
               <div className="w-8 h-8 rounded-full bg-[#EB3158] flex items-center justify-center text-xs font-bold shadow-md">RV</div>
               <div className="text-left text-[10px] hidden md:block pr-2">
                 <div className="font-semibold text-slate-200">Rohit Verma</div>
                 <div className="text-[#15172B]/60">Procurement Manager</div>
               </div>
             </div>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total Vendors", val: "1,248", trend: "+12.4%", up: true, icon: <Users size={16}/>, color: "text-[#EB3158]", bg: "bg-[#EB3158]/10" },
            { label: "Active Vendors", val: "980", trend: "+10.7%", up: true, icon: <UserPlus size={16}/>, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Total POs", val: "2,356", trend: "+15.3%", up: true, icon: <ShoppingCart size={16}/>, color: "text-yellow-400", bg: "bg-yellow-500/10" },
            { label: "PO Value", val: "$2,85,430", trend: "+14.6%", up: true, icon: <DollarSign size={16}/>, color: "text-purple-400", bg: "bg-purple-500/10" },
            { label: "Payments Made", val: "$1,98,760", trend: "+9.8%", up: true, icon: <CreditCard size={16}/>, color: "text-teal-400", bg: "bg-teal-500/10" },
            { label: "Pending Payments", val: "$86,670", trend: "-7.2%", up: false, icon: <FileText size={16}/>, color: "text-red-400", bg: "bg-red-500/10" },
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

        {/* Middle Area: Flow & Line Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[180px]">
           {/* Procurement Overview Flow */}
           <div className="lg:col-span-2 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <h3 className="text-xs font-semibold mb-4">Procurement Overview</h3>
              <div className="flex-grow flex items-center justify-between relative px-4">
                 
                 {/* Connection Lines (dashed) */}
                 <div className="absolute top-1/2 left-12 right-12 h-0 border-b-2 border-dashed border-slate-700 -translate-y-1/2 z-0"></div>

                 {[
                   { n: "Requisition", val: "245", desc: "Requests", icon: <ClipboardList size={20}/>, c: "text-[#EB3158]", b: "border-[#EB3158]/50", bg: "bg-[#0d162f]" },
                   { n: "PO Created", val: "198", desc: "Orders", icon: <ShoppingCart size={20}/>, c: "text-teal-400", b: "border-teal-500", bg: "bg-[#0d162f]" },
                   { n: "In Transit", val: "156", desc: "Orders", icon: <Truck size={20}/>, c: "text-purple-400", b: "border-purple-500", bg: "bg-[#0d162f]" },
                   { n: "Delivered", val: "134", desc: "Orders", icon: <PackageCheck size={20}/>, c: "text-indigo-400", b: "border-indigo-500", bg: "bg-[#0d162f]" },
                   { n: "Completed", val: "120", desc: "Orders", icon: <CheckCircle2 size={20}/>, c: "text-green-400", b: "border-green-500", bg: "bg-[#0d162f]" },
                 ].map((node, i) => (
                    <div key={i} className="flex flex-col items-center text-center z-10 w-20">
                       <div className={`w-12 h-12 rounded-full ${node.bg} border-2 ${node.b} flex items-center justify-center ${node.c} mb-2 shadow-[0_0_10px_rgba(0,0,0,0.3)]`}>
                         {node.icon}
                       </div>
                       <div className="text-[10px] text-slate-400 mb-0.5">{node.n}</div>
                       <div className="text-sm font-bold text-slate-200">{node.val}</div>
                       <div className="text-[8px] text-[#15172B]/60">{node.desc}</div>
                    </div>
                 ))}
              </div>
           </div>

           {/* PO Trend Line Chart */}
           <div className="lg:col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">PO Trend <span className="text-[9px] text-slate-400 font-normal">(Value)</span></h3>
                <select className="bg-transparent text-[9px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow relative mt-2">
                <div className="absolute inset-0 z-10">
                  <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M0,45 L15,35 L30,40 L45,25 L60,15 L75,20 L100,5" fill="none" stroke="#8b5cf6" strokeWidth="2" className="drop-shadow-[0_2px_4px_rgba(139,92,246,0.5)]" />
                    {/* Points */}
                    <circle cx="60" cy="15" r="2" fill="#fff" stroke="#8b5cf6" strokeWidth="1" />
                    <circle cx="100" cy="5" r="2" fill="#fff" stroke="#8b5cf6" strokeWidth="1" />
                  </svg>
                </div>
                <div className="absolute right-0 top-0 bg-[#0d162f]/80 p-1 rounded text-[8px] border border-white/10 z-20 text-center">
                   <div className="font-bold text-slate-200">$2,85,430</div>
                   <div className="text-slate-400 text-[6px]">Total PO Value</div>
                </div>
                <div className="absolute left-0 top-0 bottom-4 w-6 flex flex-col justify-between text-[7px] text-[#15172B]/60 items-end pr-1">
                  <span>250k</span><span>200k</span><span>150k</span><span>100k</span><span>50k</span><span>0</span>
                </div>
                <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[7px] text-[#15172B]/60">
                  <span>May 01</span><span>May 08</span><span>May 15</span><span>May 22</span><span>May 29</span>
                </div>
              </div>
           </div>
        </div>

        {/* Bottom Charts & Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[160px]">
           {/* Top Vendors */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Top Vendors</h3>
                <span className="text-[8px] text-[#EB3158] cursor-pointer">View All</span>
              </div>
              <div className="flex flex-col gap-1.5 text-[9px]">
                 {[
                   { id: "1", n: "Tech Solutions Pvt. Ltd.", v: "$68,450", trend: "+16.3%", bg: "bg-[#EB3158]" },
                   { id: "2", n: "Global Industries", v: "$54,280", trend: "+12.7%", bg: "bg-purple-600" },
                   { id: "3", n: "Express Supplies Co.", v: "$42,750", trend: "+10.9%", bg: "bg-orange-500" },
                   { id: "4", n: "Prime Components", v: "$38,620", trend: "+8.2%", bg: "bg-green-500" },
                   { id: "5", n: "Dynamic Enterprises", v: "$34,180", trend: "+7.6%", bg: "bg-teal-500" },
                 ].map((vendor, i) => (
                   <div key={i} className="flex justify-between items-center pb-0.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 rounded-full text-[7px] flex items-center justify-center font-bold ${vendor.bg}`}>{vendor.id}</div>
                        <span className="text-slate-300 truncate w-32">{vendor.n}</span>
                      </div>
                      <span className="font-semibold">{vendor.v}</span>
                      <span className="text-green-400">↑ {vendor.trend}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Spend by Category */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Spend by Category</h3>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="14" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0ea5e9" strokeWidth="14" strokeDasharray="150 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="14" strokeDasharray="80 251" strokeDashoffset="-150" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="14" strokeDasharray="40 251" strokeDashoffset="-230" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[11px] font-bold">$2,85,430</span>
                    <span className="text-[6px] text-slate-400">Total Spend</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-[9px] flex-grow pl-4">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded bg-purple-500"></div> Raw Materials</span> <span>40%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded bg-sky-500"></div> Machinery</span> <span>25%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded bg-green-500"></div> IT & Software</span> <span>15%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded bg-orange-500"></div> Maintenance</span> <span>10%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded bg-red-500"></div> Others</span> <span>10%</span></div>
                </div>
              </div>
           </div>

           {/* Payment Status */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Payment Status</h3>
                <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="14" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="14" strokeDasharray="175 251" strokeDashoffset="0" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[11px] font-bold">$2,85,430</span>
                    <span className="text-[6px] text-slate-400">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 text-[9px] flex-grow pl-4">
                   <div>
                     <div className="flex items-center gap-1.5 mb-1 text-slate-300"><div className="w-2 h-2 rounded bg-green-500"></div> Paid</div>
                     <div className="font-bold pl-3.5">$1,98,760 <span className="text-[#15172B]/60 font-normal">(69.6%)</span></div>
                   </div>
                   <div>
                     <div className="flex items-center gap-1.5 mb-1 text-slate-300"><div className="w-2 h-2 rounded bg-red-500"></div> Pending</div>
                     <div className="font-bold pl-3.5">$86,670 <span className="text-[#15172B]/60 font-normal">(30.4%)</span></div>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Small Bottom Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-auto">
           {[
             { label: "Contracts", val: "342", sub: "Active Contracts", icon: <FileText size={18}/>, c: "text-[#EB3158] bg-[#EB3158]/10" },
             { label: "Expiring Contracts", val: "28", sub: "Next 30 Days", icon: <Calendar size={18}/>, c: "text-orange-400 bg-orange-500/10" },
             { label: "Vendor Compliance", val: "92%", sub: "Compliant Vendors", icon: <Shield size={18}/>, c: "text-green-400 bg-green-500/10" },
             { label: "Avg. Lead Time", val: "8.6", sub: "Days", icon: <Clock size={18}/>, c: "text-indigo-400 bg-indigo-500/10" },
             { label: "Vendor Rating", val: "4.6/5", sub: "Average Rating", icon: <Star size={18}/>, c: "text-yellow-400 bg-yellow-500/10" },
           ].map((card, i) => (
              <div key={i} className="bg-[#0a1125] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                 <div className={`p-2 rounded-xl ${card.c}`}>
                   {card.icon}
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] text-slate-400 leading-tight">{card.label}</span>
                   <span className="text-sm font-bold text-slate-200 leading-tight">{card.val}</span>
                   <span className="text-[8px] text-[#15172B]/60">{card.sub}</span>
                 </div>
              </div>
           ))}
        </div>

      </div>
    </div>
  );
}
