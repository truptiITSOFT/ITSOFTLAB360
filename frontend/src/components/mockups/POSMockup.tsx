import React from "react";
import { LayoutDashboard, Receipt, ListOrdered, Box, Package, Users2, Truck, UserSquare2, FileText, DollarSign, Settings, CreditCard, AlertTriangle, ReceiptText, BarChart3, ShoppingBag, PlusCircle, ArrowRightLeft, ChevronRight } from "lucide-react";

export default function POSMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[512px] text-white">
      {/* Left Sidebar */}
      <div className="w-56 bg-[#040813] border-r border-white/5 p-4 flex flex-col gap-1 rounded-l-3xl">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-500 flex items-center justify-center">
             <CreditCard size={18} />
          </div>
          <span className="font-bold text-lg">POS</span>
        </div>
        {[
          { icon: <LayoutDashboard size={16}/>, label: "Dashboard", active: true },
          { icon: <Receipt size={16}/>, label: "Sales" },
          { icon: <ListOrdered size={16}/>, label: "Orders" },
          { icon: <Box size={16}/>, label: "Products" },
          { icon: <Package size={16}/>, label: "Inventory" },
          { icon: <Users2 size={16}/>, label: "Customers" },
          { icon: <Truck size={16}/>, label: "Suppliers" },
          { icon: <UserSquare2 size={16}/>, label: "Staff" },
          { icon: <FileText size={16}/>, label: "Reports" },
          { icon: <DollarSign size={16}/>, label: "Expenses" },
          { icon: <Settings size={16}/>, label: "Settings" },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm cursor-pointer transition-colors ${item.active ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
             {item.icon}
             <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-5 flex flex-col gap-4 bg-[#0a1125] rounded-r-3xl">
        
        {/* Header row */}
        <div className="flex justify-between items-center bg-[#0d162f] p-4 rounded-2xl border border-white/5">
           <div className="flex gap-4 items-center">
             <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-500">
                <CreditCard size={24} />
             </div>
             <div>
               <h2 className="text-xl font-bold">POS</h2>
               <p className="text-xs text-slate-400">Smart Point of Sale for Retail, Restaurants & Supermarkets.</p>
               <p className="text-xs text-slate-400">Billing, Inventory & Customer Management.</p>
             </div>
           </div>
           
           <div className="flex items-center gap-4">
             <div className="relative w-48 h-20 rounded-xl overflow-hidden bg-slate-900 border border-white/10 hidden md:block group">
                <div className="absolute top-2 left-2 text-[8px] text-slate-400">Total: <span className="text-white text-sm font-bold">$128.50</span></div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#EB3158] text-[6.4px] rounded text-white font-bold cursor-pointer">PAY</div>
                <div className="absolute right-[-8px] top-[-8px] w-16 h-16 bg-pink-500/20 blur-xl group-hover:bg-pink-500/40 transition"></div>
                <ReceiptText className="absolute bottom-2 left-2 text-[#15172B]/60" size={16} />
             </div>
             
             <select className="bg-[#151f38] border border-white/10 text-xs px-3 py-1.5 rounded-lg text-slate-300 outline-none">
               <option>This Month</option>
             </select>
             <button className="w-8 h-8 rounded-full bg-[#151f38] flex items-center justify-center relative border border-white/10">
               <AlertTriangle size={14} className="text-slate-300" />
               <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pink-500"></span>
             </button>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total Sales", val: "$128,450", trend: "+18.6%", up: true, icon: <DollarSign size={16}/>, color: "text-[#EB3158]" },
            { label: "Transactions", val: "3,245", trend: "+14.2%", up: true, icon: <Receipt size={16}/>, color: "text-indigo-400" },
            { label: "Avg. Order Value", val: "$39.55", trend: "+9.8%", up: true, icon: <CreditCard size={16}/>, color: "text-green-400" },
            { label: "Items Sold", val: "12,845", trend: "+16.3%", up: true, icon: <ShoppingBag size={16}/>, color: "text-cyan-400" },
            { label: "Gross Profit", val: "$40,230", trend: "+21.7%", up: true, icon: <BarChart3 size={16}/>, color: "text-purple-400" },
            { label: "Customers", val: "2,356", trend: "+11.4%", up: true, icon: <Users2 size={16}/>, color: "text-orange-400" },
          ].map((kpi, i) => (
             <div key={i} className="bg-[#0d162f] border border-white/5 p-3 rounded-2xl flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-1">
                 <div className={`p-1.5 rounded-lg bg-white/5 ${kpi.color}`}>
                   {kpi.icon}
                 </div>
                 <span className="text-[8px] text-slate-400">{kpi.label}</span>
               </div>
               <div className="text-lg font-bold ml-1">{kpi.val}</div>
               <div className={`text-[7.2px] ml-1 mt-1 font-medium ${kpi.up ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.trend} <span className="text-[#15172B]/60 font-normal">vs Apr 2025</span>
               </div>
             </div>
          ))}
        </div>

        {/* Middle Row (Charts) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-48">
          {/* Sales Overview Line Chart */}
          <div className="lg:col-span-1 bg-[#0d162f] border border-white/5 rounded-2xl p-4 flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Sales Overview</h3>
               <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
             </div>
             
             {/* Mock Line Chart */}
             <div className="flex-grow relative mt-2">
                <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-4">
                  <div className="border-b border-white/5 w-full h-0"></div>
                  <div className="border-b border-white/5 w-full h-0"></div>
                  <div className="border-b border-white/5 w-full h-0"></div>
                  <div className="border-b border-white/5 w-full h-0"></div>
                </div>
                <div className="absolute left-0 top-0 bottom-6 w-6 flex flex-col justify-between text-[6.4px] text-[#15172B]/60 items-end pr-1">
                  <span>150k</span><span>120k</span><span>90k</span><span>60k</span><span>30k</span><span>0</span>
                </div>
                <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[6.4px] text-[#15172B]/60">
                  <span>May 01</span><span>May 11</span><span>May 21</span><span>May 31</span>
                </div>
                <div className="absolute inset-0 left-6 bottom-6 z-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M0,80 L10,60 L20,70 L30,40 L40,50 L50,20 L60,30 L70,10 L80,25 L90,15 L100,5" fill="none" stroke="#a855f7" strokeWidth="2" className="drop-shadow-[0_0_5px_#a855f7]" />
                    <path d="M0,90 L10,80 L20,85 L30,60 L40,65 L50,45 L60,50 L70,30 L80,45 L90,25 L100,20" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_5px_#3b82f6]" />
                    {/* Glowing dots */}
                    <circle cx="70" cy="10" r="2" fill="#fff" stroke="#a855f7" strokeWidth="1" />
                    <circle cx="70" cy="30" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                  </svg>
                </div>
                {/* Custom Tooltip */}
                <div className="absolute right-4 top-4 bg-[#1e293b]/90 border border-white/10 rounded-lg p-2 z-20 shadow-lg text-[7.2px]">
                   <div className="text-slate-400 mb-1">May 29, 2025</div>
                   <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Sales: $128,450</div>
                   <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#EB3158]"></div> Profit: $40,230</div>
                </div>
             </div>
          </div>

          {/* Sales by Channel Donut */}
          <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-4 flex flex-col">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Sales by Channel</h3>
               <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
             </div>
             <div className="flex-grow flex items-center justify-between px-2">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a855f7" strokeWidth="12" strokeDasharray="140 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="60 251" strokeDashoffset="-140" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eab308" strokeWidth="12" strokeDasharray="30 251" strokeDashoffset="-200" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">$128,450</span>
                    <span className="text-[6.4px] text-slate-400">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[7.2px]">
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> In-Store</span> <span>55%</span></div>
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#EB3158]"></div> Online</span> <span>25%</span></div>
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Takeaway</span> <span>12%</span></div>
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Delivery</span> <span>8%</span></div>
                </div>
             </div>
          </div>

          {/* Payment Methods Donut */}
          <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-4 flex flex-col">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Payment Methods</h3>
               <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
             </div>
             <div className="flex-grow flex items-center justify-between px-2">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="100 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="80 251" strokeDashoffset="-100" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a855f7" strokeWidth="12" strokeDasharray="50 251" strokeDashoffset="-180" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">3,245</span>
                    <span className="text-[6.4px] text-slate-400">Transactions</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[7.2px]">
                   <div className="flex justify-between w-16"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Cash</span> <span>40%</span></div>
                   <div className="flex justify-between w-16"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#EB3158]"></div> Card</span> <span>35%</span></div>
                   <div className="flex justify-between w-16"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> UPI</span> <span>20%</span></div>
                   <div className="flex justify-between w-16"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Wallet</span> <span>5%</span></div>
                </div>
             </div>
          </div>

        </div>

        {/* Third Row (Tables/Lists) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-grow min-h-[112px]">
           {/* Top Selling Categories */}
           <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-3 flex flex-col lg:col-span-1">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Top Selling Categories</h3>
               <select className="bg-transparent text-[6.4px] text-slate-400 outline-none"><option>This Month</option></select>
             </div>
             <div className="flex flex-col gap-2 text-[7.2px] mt-2">
                {[
                  { name: "Beverages", val: "$28,450", pct: "22.1%", icon: "🥤", w: "90%", color: "bg-orange-500" },
                  { name: "Snacks", val: "$21,680", pct: "16.8%", icon: "🍿", w: "70%", color: "bg-[#EB3158]" },
                  { name: "Dairy Products", val: "$18,230", pct: "14.2%", icon: "🥛", w: "50%", color: "bg-indigo-500" },
                  { name: "Bakery", val: "$15,680", pct: "12.2%", icon: "🍞", w: "40%", color: "bg-purple-500" },
                  { name: "Fruits & Veg", val: "$12,450", pct: "9.7%", icon: "🍎", w: "30%", color: "bg-pink-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 w-20">
                      <span>{item.icon}</span> <span className="truncate">{item.name}</span>
                    </div>
                    <div className="flex-grow mx-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className={`h-full ${item.color} rounded-full`} style={{ width: item.w }}></div>
                    </div>
                    <div className="w-16 text-right">
                       {item.val} <span className="text-[#15172B]/60">({item.pct})</span>
                    </div>
                  </div>
                ))}
             </div>
           </div>

           {/* Low Stock Alert */}
           <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-3 flex flex-col lg:col-span-1">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Low Stock Alert</h3>
               <span className="text-[6.4px] text-[#EB3158] cursor-pointer">View All</span>
             </div>
             <div className="flex flex-col gap-2.5 mt-1 overflow-y-auto pr-1 text-[7.2px]">
                {[
                  { name: "Mineral Water 200ml", sku: "Stock: 12", count: 12, icon: "💧" },
                  { name: "Tomato Ketchup 500g", sku: "Stock: 8", count: 8, icon: "🍅" },
                  { name: "Milk 1L", sku: "Stock: 10", count: 10, icon: "🥛" },
                  { name: "Bread Brown", sku: "Stock: 6", count: 6, icon: "🍞" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-1 last:border-0">
                    <div className="flex gap-2 items-center">
                       <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[8px]">{item.icon}</div>
                       <div className="flex flex-col">
                         <span className="truncate w-24 text-slate-200">{item.name}</span>
                         <span className="text-[#15172B]/60 text-[6.4px]">{item.sku}</span>
                       </div>
                    </div>
                    <span className="text-red-500 font-medium bg-red-500/10 px-1.5 py-0.5 rounded">Stock: {item.count}</span>
                  </div>
                ))}
             </div>
           </div>

           {/* Recent Transactions */}
           <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-3 flex flex-col lg:col-span-1">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Recent Transactions</h3>
               <span className="text-[6.4px] text-[#EB3158] cursor-pointer">View All</span>
             </div>
             <div className="flex flex-col gap-2 mt-1 text-[7.2px]">
                {[
                  { time: "11:42 AM", name: "Coffee", price: "$4.20", status: "Completed" },
                  { time: "11:38 AM", name: "Sandwich", price: "$6.80", status: "Completed" },
                  { time: "11:35 AM", name: "Burger", price: "$8.50", status: "Completed" },
                  { time: "11:30 AM", name: "Milk 1L", price: "$2.10", status: "Completed" },
                  { time: "11:25 AM", name: "Chips", price: "$1.20", status: "Completed" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center pb-1">
                    <span className="text-slate-400 w-12">{item.time}</span>
                    <span className="text-slate-200 flex-grow px-2 truncate">{item.name}</span>
                    <span className="font-semibold w-8 text-right">{item.price}</span>
                    <span className="text-green-500 w-12 text-right">{item.status}</span>
                  </div>
                ))}
             </div>
           </div>
           
           {/* Inventory Status */}
           <div className="bg-[#0d162f] border border-white/5 rounded-2xl p-3 flex flex-col lg:col-span-1">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-xs font-semibold">Inventory Status</h3>
               <span className="text-[6.4px] text-[#EB3158] cursor-pointer">View All</span>
             </div>
             <div className="flex-grow flex items-center justify-center gap-3 mt-2">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="14" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="14" strokeDasharray="230 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="14" strokeDasharray="180 251" strokeDashoffset="-30" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[8px] font-bold">78%</span>
                    <span className="text-[4.8px] text-slate-400">In Stock</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-[6.4px]">
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> In Stock</span> <span>1,245 (78%)</span></div>
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> Low Stock</span> <span>245 (15%)</span></div>
                   <div className="flex justify-between w-20"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Out of Stock</span> <span>105 (7%)</span></div>
                </div>
             </div>
           </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-auto">
          {[
            { label: "New Sale", desc: "Create new sale", icon: <ShoppingBag size={14} />, color: "text-[#EB3158]", bg: "bg-[#EB3158]/10" },
            { label: "Orders", desc: "View all orders", icon: <ListOrdered size={14} />, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Add Product", desc: "Add new product", icon: <PlusCircle size={14} />, color: "text-teal-400", bg: "bg-teal-500/10" },
            { label: "Stock Transfer", desc: "Transfer stock", icon: <ArrowRightLeft size={14} />, color: "text-orange-400", bg: "bg-orange-500/10" },
            { label: "Expenses", desc: "Add expense", icon: <DollarSign size={14} />, color: "text-purple-400", bg: "bg-purple-500/10" },
            { label: "Reports", desc: "View reports", icon: <BarChart3 size={14} />, color: "text-pink-400", bg: "bg-pink-500/10" },
          ].map((action, i) => (
             <div key={i} className="bg-[#0d162f] border border-white/5 rounded-xl p-2 flex items-center justify-between cursor-pointer hover:bg-[#15234b] transition">
                <div className="flex items-center gap-2">
                   <div className={`w-8 h-8 rounded-lg ${action.bg} flex items-center justify-center ${action.color}`}>
                     {action.icon}
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[8px] font-semibold text-slate-200">{action.label}</span>
                     <span className="text-[6.4px] text-[#15172B]/60">{action.desc}</span>
                   </div>
                </div>
                <ChevronRight size={12} className="text-[#15172B]/80" />
             </div>
          ))}
        </div>

      </div>
    </div>
  );
}
