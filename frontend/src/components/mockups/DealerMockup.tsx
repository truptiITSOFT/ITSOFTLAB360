import React from "react";
import { 
  Store, Calendar, Bell, Users, Users2, FileText, ShoppingCart, 
  Package, DollarSign, Map, MapPin, Target, Award, Truck, Plus, 
  ArrowRightLeft, Gift, BarChart3, TrendingUp, TrendingDown, ChevronRight, CheckCircle2
} from "lucide-react";

export default function DealerMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[512px] text-white bg-[#030816] rounded-3xl p-5 flex-col lg:flex-row gap-5">
      
      {/* Left Sidebar */}
      <div className="w-64 bg-[#0a1125] border border-white/5 p-5 flex flex-col gap-4 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col gap-2 mb-2 pt-2 z-10">
          <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500 border border-green-500/30">
            <Store size={28} />
          </div>
          <h2 className="text-xl font-bold mt-2">DEALER<br/><span className="text-sm font-medium text-green-400">MANAGEMENT SYSTEM</span></h2>
        </div>
        <p className="text-[8.8px] text-slate-400 mb-2 z-10">Manage dealers, orders, inventory, and distributor performance.</p>
        
        <div className="flex flex-col gap-3 z-10">
           {[
             { title: "Dealer Onboarding", desc: "Register, verify & manage dealers & distributors.", icon: <Users2 size={16}/>, color: "text-purple-500", bg: "bg-purple-500/20" },
             { title: "Order Management", desc: "Track orders from booking to delivery.", icon: <ShoppingCart size={16}/>, color: "text-orange-500", bg: "bg-orange-500/20" },
             { title: "Inventory Control", desc: "Real-time stock visibility across dealers.", icon: <Package size={16}/>, color: "text-yellow-500", bg: "bg-yellow-500/20" },
             { title: "Performance Analytics", desc: "Monitor dealer & distributor performance.", icon: <BarChart3 size={16}/>, color: "text-green-500", bg: "bg-green-500/20" },
             { title: "Incentives & Schemes", desc: "Manage targets, schemes & rewards.", icon: <Award size={16}/>, color: "text-[#EB3158]", bg: "bg-blue-500/20" },
           ].map((item, i) => (
             <div key={i} className="flex gap-3 items-start p-2 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/5 cursor-pointer">
               <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>{item.icon}</div>
               <div>
                 <div className="text-xs font-semibold text-slate-200 leading-tight">{item.title}</div>
                 <div className="text-[7.2px] text-[#15172B]/60 mt-0.5">{item.desc}</div>
               </div>
             </div>
           ))}
        </div>

        {/* Truck / Store Graphic */}
        <div className="mt-auto h-32 relative flex items-end justify-center z-10 pt-4">
           {/* Glow */}
           <div className="absolute w-32 h-32 bg-green-500/20 rounded-full blur-2xl bottom-[-16px]"></div>
           {/* Store Box */}
           <div className="w-24 h-20 bg-[#0d162f] border-2 border-green-500/50 rounded-t-lg relative flex flex-col items-center justify-end pb-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
             <div className="absolute top-2 w-16 h-4 bg-green-500/20 rounded-sm border border-green-500/50 flex items-center justify-center text-[6.4px] font-bold text-green-400">DEALER</div>
             <div className="flex gap-2">
                <div className="w-6 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded-sm"></div>
                <div className="w-6 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded-sm"></div>
             </div>
           </div>
           {/* Truck */}
           <div className="absolute left-2 bottom-4 flex items-end z-20">
             <div className="w-12 h-10 bg-[#EB3158] rounded-l-md border border-blue-400 flex items-center justify-center relative shadow-[0_5px_15px_rgba(37,99,235,0.5)]">
                <Truck size={16} className="text-white opacity-50" />
                <div className="absolute bottom-[-3.2px] left-2 w-3 h-3 bg-slate-800 rounded-full border border-slate-600"></div>
                <div className="absolute bottom-[-3.2px] right-2 w-3 h-3 bg-slate-800 rounded-full border border-slate-600"></div>
             </div>
             <div className="w-6 h-7 bg-[#EB3158] rounded-r-md border border-blue-400 mb-1 relative">
                <div className="absolute top-1 right-1 w-3 h-3 bg-cyan-300/40 rounded-sm"></div>
                <div className="absolute bottom-[-3.2px] right-1 w-3 h-3 bg-slate-800 rounded-full border border-slate-600"></div>
             </div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col gap-4">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0a1125] p-4 rounded-2xl border border-white/5">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-500">
               <Store size={20} />
             </div>
             <div>
               <h2 className="text-lg font-bold">Dealer Management Dashboard</h2>
               <p className="text-[8.8px] text-slate-400">Complete visibility. Stronger relationships. Higher performance.</p>
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
               <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold shadow-md">RS</div>
               <div className="text-left text-[8px] hidden md:block pr-2">
                 <div className="font-semibold text-slate-200">Rahul Sharma</div>
                 <div className="text-[#15172B]/60">National Sales Head</div>
               </div>
             </div>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total Dealers", val: "1,248", trend: "+12.6%", up: true, icon: <Users size={16}/>, color: "text-[#EB3158]", bg: "bg-[#EB3158]/10" },
            { label: "Active Dealers", val: "1,056", trend: "+10.3%", up: true, icon: <Users2 size={16}/>, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Total Orders", val: "4,320", trend: "+15.8%", up: true, icon: <FileText size={16}/>, color: "text-purple-400", bg: "bg-purple-500/10" },
            { label: "Total Sales", val: "$2,45,680", trend: "+13.4%", up: true, icon: <ShoppingCart size={16}/>, color: "text-orange-400", bg: "bg-orange-500/10" },
            { label: "Total Inventory Value", val: "$1,85,420", trend: "+9.7%", up: true, icon: <Package size={16}/>, color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { label: "Outstanding Payments", val: "$48,320", trend: "-6.2%", up: false, icon: <DollarSign size={16}/>, color: "text-red-400", bg: "bg-red-500/10" },
          ].map((kpi, i) => (
             <div key={i} className="bg-[#0a1125] border border-white/5 rounded-2xl p-3 flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-2">
                 <div className={`p-1.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
                   {kpi.icon}
                 </div>
                 <span className="text-[8px] text-slate-400 leading-tight w-20">{kpi.label}</span>
               </div>
               <div className="text-lg font-bold">{kpi.val}</div>
               <div className={`text-[7.2px] mt-1 font-medium flex items-center gap-1 ${kpi.up ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.up ? <TrendingUp size={10}/> : <TrendingDown size={10}/>} {kpi.trend} <span className="text-[#15172B]/60 font-normal">vs Apr 2025</span>
               </div>
             </div>
          ))}
        </div>

        {/* Middle Charts & Maps Area */}
        <div className="flex-grow flex flex-col lg:flex-row gap-4 h-[240px]">
           
           {/* Left Sidebar within Content (Dashboard Nav + Map) */}
           <div className="lg:w-[45%] flex gap-4">
              {/* Inner Sidebar Menu */}
              <div className="w-28 bg-[#0a1125] rounded-2xl border border-white/5 py-3 flex flex-col gap-1 text-[8px]">
                 {[
                   { label: "Dashboard", active: true },
                   { label: "Dealers", active: false },
                   { label: "Orders", active: false },
                   { label: "Inventory", active: false },
                   { label: "Schemes & Targets", active: false },
                   { label: "Performance", active: false },
                   { label: "Payments", active: false },
                   { label: "Reports", active: false },
                   { label: "Communications", active: false },
                   { label: "Settings", active: false },
                 ].map((item, i) => (
                   <div key={i} className={`px-4 py-2 cursor-pointer transition-colors ${item.active ? 'bg-[#EB3158] border-l-2 border-blue-400 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}>
                     {item.label}
                   </div>
                 ))}
              </div>

              {/* Dealer Network Map */}
              <div className="flex-grow bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col relative overflow-hidden">
                <h3 className="text-xs font-semibold mb-2 z-10">Dealer Network</h3>
                {/* Abstract India Map Representation */}
                <div className="absolute inset-0 flex justify-center items-center opacity-30 mt-4 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-48 h-48">
                    {/* Simplified polygon resembling India map shape */}
                    <polygon points="50,5 65,35 85,45 75,70 55,95 45,95 35,70 15,50 35,25" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1" strokeLinejoin="round" />
                  </svg>
                </div>
                
                {/* Floating Zone Cards */}
                <div className="flex-grow relative z-10 text-[7.2px]">
                   <div className="absolute top-2 left-2 bg-[#0d162f]/80 p-1.5 rounded border border-white/10 backdrop-blur-sm">
                     <div className="text-slate-400">North Zone</div>
                     <div className="font-bold text-slate-200">412 Dealers</div>
                     <div className="text-green-400">↑ 11.5%</div>
                   </div>
                   <div className="absolute top-8 right-2 bg-[#0d162f]/80 p-1.5 rounded border border-white/10 backdrop-blur-sm">
                     <div className="text-slate-400">West Zone</div>
                     <div className="font-bold text-slate-200">358 Dealers</div>
                     <div className="text-green-400">↑ 10.2%</div>
                   </div>
                   <div className="absolute bottom-12 left-4 bg-[#0d162f]/80 p-1.5 rounded border border-white/10 backdrop-blur-sm">
                     <div className="text-slate-400">South Zone</div>
                     <div className="font-bold text-slate-200">298 Dealers</div>
                     <div className="text-green-400">↑ 13.6%</div>
                   </div>
                   <div className="absolute bottom-16 right-4 bg-[#0d162f]/80 p-1.5 rounded border border-white/10 backdrop-blur-sm">
                     <div className="text-slate-400">East Zone</div>
                     <div className="font-bold text-slate-200">180 Dealers</div>
                     <div className="text-green-400">↑ 9.4%</div>
                   </div>
                   
                   {/* Map Pins */}
                   <MapPin size={12} className="absolute top-10 left-16 text-[#EB3158]" />
                   <MapPin size={12} className="absolute top-20 right-20 text-purple-400" />
                   <MapPin size={12} className="absolute bottom-24 left-24 text-green-400" />
                   <MapPin size={12} className="absolute bottom-30 right-24 text-orange-400" />
                </div>
              </div>
           </div>

           {/* Right Charts Area */}
           <div className="lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Order Overview / Top Dealers */}
              <div className="flex flex-col gap-4">
                 {/* Order Overview Donut */}
                 <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col h-1/2">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-xs font-semibold">Order Overview</h3>
                      <select className="bg-transparent text-[6.4px] text-slate-400 outline-none"><option>This Month</option></select>
                    </div>
                    <div className="flex-grow flex items-center justify-between">
                      <div className="relative w-20 h-20">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="14" strokeDasharray="251" />
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="14" strokeDasharray="230 251" strokeDashoffset="0" />
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="14" strokeDasharray="180 251" strokeDashoffset="-30" />
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="14" strokeDasharray="125 251" strokeDashoffset="-100" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-[8.8px] font-bold">4,320</span>
                          <span className="text-[4.8px] text-slate-400">Total Orders</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 text-[6.4px] flex-grow pl-2">
                         <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Delivered</span> <span>2,150 (49.8%)</span></div>
                         <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#EB3158]"></div> In Transit</span> <span>1,320 (30.6%)</span></div>
                         <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Pending</span> <span>650 (15.0%)</span></div>
                         <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Cancelled</span> <span>200 (4.6%)</span></div>
                      </div>
                    </div>
                 </div>

                 {/* Top Dealers List */}
                 <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-3 flex flex-col h-1/2">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xs font-semibold">Top Dealers</h3>
                      <span className="text-[6.4px] text-[#EB3158] cursor-pointer">View All</span>
                    </div>
                    <div className="flex flex-col gap-1.5 text-[7.2px]">
                       {[
                         { id: "1", n: "Sharma Distributors", v: "$28,450", trend: "+16.3%", bg: "bg-[#EB3158]" },
                         { id: "2", n: "Gupta Agencies", v: "$22,180", trend: "+12.3%", bg: "bg-purple-600" },
                         { id: "3", n: "Om Sai Traders", v: "$18,750", trend: "+10.8%", bg: "bg-purple-800" },
                         { id: "4", n: "Royal Marketing", v: "$15,920", trend: "+8.9%", bg: "bg-[#0d162f]" },
                         { id: "5", n: "Sai Enterprises", v: "$12,430", trend: "+7.6%", bg: "bg-[#0d162f]" },
                       ].map((dealer, i) => (
                         <div key={i} className="flex justify-between items-center pb-0.5">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-3.5 h-3.5 rounded text-[5.6px] flex items-center justify-center font-bold ${dealer.bg}`}>{dealer.id}</div>
                              <span className="text-slate-300 truncate w-20">{dealer.n}</span>
                            </div>
                            <span className="font-semibold">{dealer.v}</span>
                            <span className="text-green-400">↑ {dealer.trend}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Sales Trend / Dealer Performance */}
              <div className="flex flex-col gap-4">
                 {/* Sales Trend Line Chart */}
                 <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col h-1/2">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-xs font-semibold">Sales Trend</h3>
                      <select className="bg-transparent text-[6.4px] text-slate-400 outline-none"><option>This Month</option></select>
                    </div>
                    <div className="flex-grow relative mt-2">
                      <div className="absolute inset-0 z-10">
                        <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                          <path d="M0,45 L10,35 L20,40 L30,25 L40,30 L50,15 L60,25 L70,10 L80,20 L90,5 L100,10" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_2px_4px_rgba(59,130,246,0.5)]" />
                          {/* Points */}
                          <circle cx="70" cy="10" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                          <circle cx="90" cy="5" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                        </svg>
                      </div>
                      <div className="absolute right-0 top-0 bg-[#0d162f]/80 p-1 rounded text-[6.4px] border border-white/10 z-20">
                         <div className="font-bold text-slate-200">$2,45,680</div>
                         <div className="text-slate-400 text-[4.8px]">Total Sales</div>
                      </div>
                      <div className="absolute bottom-0 left-4 right-0 flex justify-between text-[4.8px] text-[#15172B]/60">
                        <span>May 01</span><span>May 08</span><span>May 15</span><span>May 22</span><span>May 29</span>
                      </div>
                    </div>
                 </div>

                 {/* Inventory Status / Dealer Performance */}
                 <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-3 flex flex-col h-1/2">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xs font-semibold">Dealer Performance</h3>
                      <select className="bg-transparent text-[6.4px] text-slate-400 outline-none"><option>This Month</option></select>
                    </div>
                    <div className="flex flex-col gap-2 text-[6.4px]">
                       {[
                         { n: "Sharma Distributors", pct: "92%", color: "bg-green-500" },
                         { n: "Gupta Agencies", pct: "87%", color: "bg-[#EB3158]" },
                         { n: "Om Sai Traders", pct: "78%", color: "bg-indigo-500" },
                         { n: "Royal Marketing", pct: "71%", color: "bg-purple-500" },
                         { n: "Sai Enterprises", pct: "65%", color: "bg-orange-500" },
                       ].map((dp, i) => (
                         <div key={i}>
                           <div className="flex justify-between mb-0.5 text-slate-300">
                             <span>{dp.n}</span><span>{dp.pct}</span>
                           </div>
                           <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                             <div className={`h-full ${dp.color} rounded-full`} style={{ width: dp.pct }}></div>
                           </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

           </div>
        </div>

        {/* Quick Action Buttons Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-auto">
           {[
             { label: "Add New Dealer", desc: "Onboard a new dealer to the network", icon: <Users2 size={16}/>, color: "text-[#EB3158] bg-[#EB3158]/10" },
             { label: "Create Order", desc: "Create new order for a dealer", icon: <FileText size={16}/>, color: "text-green-400 bg-green-500/10" },
             { label: "Stock Transfer", desc: "Transfer stock to dealer", icon: <Truck size={16}/>, color: "text-orange-400 bg-orange-500/10" },
             { label: "Scheme Management", desc: "Create & manage schemes", icon: <Gift size={16}/>, color: "text-purple-400 bg-purple-500/10" },
             { label: "View Reports", desc: "Detailed reports & insights", icon: <BarChart3 size={16}/>, color: "text-slate-300 bg-white/5" },
           ].map((action, i) => (
              <div key={i} className="bg-[#0a1125] border border-white/5 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-[#15234b] transition group">
                 <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${action.color}`}>
                      {action.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-200">{action.label}</span>
                      <span className="text-[7.2px] text-[#15172B]/60 leading-tight w-24 hidden lg:block">{action.desc}</span>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-[#15172B]/80 group-hover:text-slate-300" />
              </div>
           ))}
        </div>

      </div>
    </div>
  );
}
