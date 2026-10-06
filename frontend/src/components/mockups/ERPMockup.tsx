import React from "react";
import { 
  Briefcase, Calendar, Bell, DollarSign, BarChart3, TrendingUp, Settings,
  Package, ShoppingCart, Settings2, FileText, CheckCircle, Boxes,
  Share2, PlayCircle, Zap, Activity
} from "lucide-react";

export default function ERPMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[512px] text-white bg-[#030816] rounded-3xl p-5 flex-col lg:flex-row gap-5">
      
      {/* Left Sidebar */}
      <div className="w-64 bg-[#0a1125] border border-white/5 p-5 flex flex-col gap-4 rounded-2xl">
        <div className="flex flex-col items-center gap-2 mb-2 pt-4">
          <div className="w-16 h-16 rounded-3xl bg-yellow-500/20 flex items-center justify-center text-yellow-500 border border-yellow-500/30">
            <Settings size={32} />
          </div>
          <h2 className="text-3xl font-bold mt-2">ERP</h2>
        </div>
        <p className="text-xs text-slate-400 text-center mb-4">Integrate finance, inventory, procurement, and business operations.</p>
        
        <div className="flex flex-col gap-4">
           {[
             { title: "Unified Operations", desc: "Connect all departments in one platform.", icon: <Share2 size={16}/>, color: "text-purple-500", bg: "bg-purple-500/20" },
             { title: "Real-time Insights", desc: "Live dashboards and smarter decision making.", icon: <BarChart3 size={16}/>, color: "text-green-500", bg: "bg-green-500/20" },
             { title: "Process Automation", desc: "Automate workflows and reduce manual work.", icon: <Zap size={16}/>, color: "text-[#EB3158]", bg: "bg-blue-500/20" },
             { title: "Cost Efficiency", desc: "Control cost, improve productivity & ROI.", icon: <DollarSign size={16}/>, color: "text-yellow-500", bg: "bg-yellow-500/20" },
           ].map((item, i) => (
             <div key={i} className="flex gap-3 items-start p-2 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/5 cursor-pointer">
               <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>{item.icon}</div>
               <div>
                 <div className="text-xs font-semibold text-slate-200">{item.title}</div>
                 <div className="text-[8px] text-[#15172B]/60">{item.desc}</div>
               </div>
             </div>
           ))}
        </div>

        {/* 3D Isometric Graphic representation */}
        <div className="mt-auto h-32 relative bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
           <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="flex items-center gap-2 relative z-10">
              <div className="w-10 h-10 bg-[#EB3158] shadow-[0_0_15px_rgba(59,130,246,0.6)] transform rotate-45 rounded flex items-center justify-center text-xs font-bold -mr-4 z-20">FIN</div>
              <div className="w-12 h-12 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] transform rotate-45 rounded flex items-center justify-center text-sm font-bold z-30">ERP</div>
              <div className="w-10 h-10 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] transform rotate-45 rounded flex items-center justify-center text-xs font-bold -ml-4 z-20">OPS</div>
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
               <h2 className="text-lg font-bold">ERP Dashboard</h2>
               <p className="text-xs text-slate-400">One Platform. All Operations. Total Control.</p>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-[#0d162f] border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300">
               Financial Year 2024-25 <Calendar size={12} />
             </div>
             <button className="w-8 h-8 rounded-lg bg-[#0d162f] flex items-center justify-center border border-white/10 relative">
               <Bell size={14} className="text-slate-300" />
               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"></span>
             </button>
             <div className="flex items-center gap-2 pl-2">
               <div className="text-right text-[8px] hidden md:block">
                 <div className="font-semibold text-slate-200">Alex Kumar</div>
                 <div className="text-[#15172B]/60">Operations Head</div>
               </div>
               <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">AK</div>
             </div>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: "Total Revenue", val: "$2,45,680", trend: "+12.6%", up: true, icon: <BarChart3 size={16}/>, color: "text-[#EB3158]", bg: "bg-[#EB3158]" },
            { label: "Total Expenses", val: "$1,62,430", trend: "+8.3%", up: true, icon: <DollarSign size={16}/>, color: "text-purple-400", bg: "bg-purple-500" },
            { label: "Net Profit", val: "$83,250", trend: "+15.7%", up: true, icon: <TrendingUp size={16}/>, color: "text-green-400", bg: "bg-green-500" },
            { label: "Total Orders", val: "1,256", trend: "+9.8%", up: true, icon: <ShoppingCart size={16}/>, color: "text-cyan-400", bg: "bg-cyan-500" },
            { label: "Open POs", val: "78", trend: "+6.2%", up: true, icon: <Settings size={16}/>, color: "text-yellow-400", bg: "bg-yellow-500" },
          ].map((kpi, i) => (
             <div key={i} className="bg-[#0a1125] border border-white/5 rounded-2xl p-3 flex flex-col justify-center relative overflow-hidden group">
               <div className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full ${kpi.bg} opacity-10 group-hover:opacity-20 transition blur-xl`}></div>
               <div className="flex items-center justify-between mb-2 z-10">
                 <div className="text-[8px] text-slate-400">{kpi.label}</div>
                 <div className={`w-6 h-6 rounded bg-white/5 flex items-center justify-center ${kpi.color}`}>
                   {kpi.icon}
                 </div>
               </div>
               <div className="text-lg font-bold z-10">{kpi.val}</div>
               <div className={`text-[7.2px] mt-1 font-medium z-10 ${kpi.up ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.up ? '↑ ' : '↓ '}{kpi.trend}
               </div>
             </div>
          ))}
        </div>

        {/* Row 1 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[176px]">
           {/* Business Overview Connectivity Diagram */}
           <div className="lg:col-span-2 bg-[#0a1125] border border-white/5 rounded-2xl p-5 flex flex-col">
              <h3 className="text-xs font-semibold mb-6">Business Overview</h3>
              <div className="flex-grow flex items-center justify-between relative px-6">
                 
                 {/* Connection Lines */}
                 <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-800 -translate-y-1/2 z-0 flex justify-between">
                    <div className="w-full h-full bg-[#EB3158]"></div>
                    <div className="w-full h-full bg-green-500"></div>
                    <div className="w-full h-full bg-purple-500"></div>
                 </div>

                 {/* Nodes */}
                 {[
                   { n: "Finance", desc: "Manage accounts, cash flow & financials.", icon: <DollarSign size={20}/>, c: "text-[#EB3158]", b: "border-[#EB3158]/50", bg: "bg-blue-900/20" },
                   { n: "Inventory", desc: "Track stock, items, warehouses & movements.", icon: <Package size={20}/>, c: "text-green-400", b: "border-green-500", bg: "bg-green-900/20" },
                   { n: "Procurement", desc: "Manage suppliers, purchase orders & contracts.", icon: <ShoppingCart size={20}/>, c: "text-purple-400", b: "border-purple-500", bg: "bg-purple-900/20" },
                   { n: "Operations", desc: "Streamline workflows and business processes.", icon: <Settings2 size={20}/>, c: "text-yellow-400", b: "border-yellow-500", bg: "bg-yellow-900/20" },
                 ].map((node, i) => (
                    <div key={i} className="flex flex-col items-center text-center z-10 w-24">
                       <div className={`w-14 h-14 rounded-full ${node.bg} border-2 ${node.b} flex items-center justify-center ${node.c} mb-3 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                         {node.icon}
                       </div>
                       <div className="text-[8.8px] font-bold text-slate-200 mb-1">{node.n}</div>
                       <div className="text-[6.4px] text-[#15172B]/60 leading-tight">{node.desc}</div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Cash Flow Line Chart */}
           <div className="lg:col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Cash Flow</h3>
                <select className="bg-transparent text-[7.2px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex justify-between text-[8px] mb-2 px-2">
                 <div>
                   <div className="text-slate-400">Cash Inflow</div>
                   <div className="font-bold text-green-400">$1,85,320</div>
                 </div>
                 <div className="text-right">
                   <div className="text-slate-400">Cash Outflow</div>
                   <div className="font-bold text-[#EB3158]">$1,25,430</div>
                 </div>
              </div>
              <div className="flex-grow relative mt-2">
                <div className="absolute inset-0 z-10">
                  <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    {/* Inflow Line */}
                    <path d="M0,25 L15,15 L30,20 L45,10 L60,25 L75,5 L100,10" fill="none" stroke="#22c55e" strokeWidth="2" />
                    {/* Outflow Line */}
                    <path d="M0,40 L15,35 L30,30 L45,45 L60,35 L75,40 L100,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    
                    {/* Points */}
                    <circle cx="75" cy="5" r="2" fill="#fff" stroke="#22c55e" strokeWidth="1" />
                    <circle cx="75" cy="40" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                  </svg>
                </div>
                {/* Labels */}
                <div className="absolute left-0 top-0 bottom-4 w-6 flex flex-col justify-between text-[5.6px] text-[#15172B]/60 items-end pr-1">
                  <span>150k</span><span>100k</span><span>50k</span><span>0</span>
                </div>
                <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[5.6px] text-[#15172B]/60">
                  <span>May 01</span><span>May 08</span><span>May 15</span><span>May 22</span><span>May 29</span>
                </div>
              </div>
           </div>
        </div>

        {/* Row 2 Charts/Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-48">
           
           {/* Inventory Summary */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Inventory Summary</h3>
                <select className="bg-transparent text-[7.2px] text-slate-400 outline-none"><option>All Warehouses</option></select>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="180 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eab308" strokeWidth="12" strokeDasharray="40 251" strokeDashoffset="-180" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="15 251" strokeDashoffset="-220" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[5.6px] text-slate-400 leading-tight">Total Stock Value</span>
                    <span className="text-[8.8px] font-bold">$1,24,580</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-[7.2px] flex-grow pl-4">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-green-500"></div> In Stock</span> <span>$78,450</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-yellow-500"></div> Low Stock</span> <span>$18,650</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-red-500"></div> Out of Stock</span> <span>$6,230</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-[#EB3158]"></div> On Order</span> <span>$21,250</span></div>
                </div>
              </div>
           </div>

           {/* Top Selling Items */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-semibold">Top Selling Items</h3>
                <select className="bg-transparent text-[7.2px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex flex-col gap-3 text-[8px]">
                 {[
                   { n: "Laptop", val: "312 Units", pct: "85%", icon: <Settings2 size={12}/>, color: "bg-[#EB3158]" },
                   { n: "Smartphone", val: "287 Units", pct: "75%", icon: <Settings size={12}/>, color: "bg-green-500" },
                   { n: "Headphones", val: "198 Units", pct: "55%", icon: <Package size={12}/>, color: "bg-purple-500" },
                   { n: "Smartwatch", val: "156 Units", pct: "40%", icon: <Activity size={12}/>, color: "bg-orange-500" },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-2 w-24">
                       <span className="text-slate-400">{item.icon}</span> <span>{item.n}</span>
                     </div>
                     <div className="flex-grow mx-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }}></div>
                     </div>
                     <div className="w-16 text-right font-medium">
                        {item.val}
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Procurement Overview */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Procurement Overview</h3>
                <select className="bg-transparent text-[7.2px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0ea5e9" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="105 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="60 251" strokeDashoffset="-105" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="35 251" strokeDashoffset="-165" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="20 251" strokeDashoffset="-200" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[8.8px] font-bold">$1,62,430</span>
                    <span className="text-[6.4px] text-slate-400">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-[7.2px] flex-grow pl-4">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-sky-500"></div> Purchase</span> <span>42%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-green-500"></div> Operations</span> <span>25%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-purple-500"></div> Salaries</span> <span>15%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-yellow-500"></div> Logistics</span> <span>10%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-red-500"></div> Others</span> <span>8%</span></div>
                </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
