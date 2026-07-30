import React from "react";
import { 
  Truck, Package, MapPin, Navigation, Clock, TrendingUp, TrendingDown,
  Activity, CheckCircle2, DollarSign, Box, ShieldAlert, Users, Plus, Star, Map,
  FileText, Store
} from "lucide-react";

export default function SupplyChainMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[640px] text-white bg-[#030816] rounded-3xl p-5 flex-col lg:flex-row gap-5 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Left Floating Panel: Fleet & Transport */}
      <div className="hidden lg:flex w-56 flex-col gap-4 z-10 h-full justify-center">
         <div className="bg-[#0a1125]/80 backdrop-blur-md border border-blue-500/30 rounded-3xl p-5 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <div className="w-16 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-[0_5px_15px_rgba(37,99,235,0.5)]">
               <Truck size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">Fleet &<br/>Transport</h2>
            <p className="text-[10px] text-slate-400 mb-8">Optimize fleet utilization & reduce transportation costs.</p>
            
            <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
               <div>
                  <div className="text-[10px] text-slate-400">Fleet Utilization</div>
                  <div className="text-2xl font-bold">76%</div>
                  <div className="text-[9px] text-green-400">↑ 6.8%</div>
               </div>
               <div className="text-right">
                  <div className="text-[10px] text-slate-400">Trips Today</div>
                  <div className="text-2xl font-bold">128</div>
                  <div className="text-[9px] text-green-400">↑ 9.3%</div>
               </div>
            </div>
            
            <div className="h-32 relative flex items-end">
               {/* Abstract decorative bar chart */}
               <div className="w-full flex items-end justify-between px-2 gap-1 h-24">
                 {[40, 65, 30, 85, 50, 70, 90].map((h, i) => (
                    <div key={i} className="w-4 bg-blue-500/20 rounded-t-sm relative">
                      <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm shadow-[0_0_10px_rgba(59,130,246,0.6)]" style={{height: `${h}%`}}></div>
                    </div>
                 ))}
               </div>
            </div>
         </div>
      </div>

      {/* Main Center UI Container */}
      <div className="flex-grow flex flex-col gap-4 z-10 bg-[#0a1125]/60 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
         
         {/* Top Header */}
         <div className="flex justify-between items-center bg-[#060d20] p-3 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                <Truck size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold">Supply Chain & Logistics</h2>
                <p className="text-[10px] text-slate-400">Real-time visibility. Smarter decisions. Faster delivery.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-full text-[10px] text-green-400 font-bold">
                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> Live Operations
              </div>
            </div>
         </div>

         {/* Center Dashboard Map & Data */}
         <div className="flex-grow flex flex-col lg:flex-row gap-4 h-[300px]">
            
            {/* Map Area */}
            <div className="flex-grow relative rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center p-4">
               {/* Grid Background */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a1125] to-[#0a1125]"></div>
               
               {/* Fake India Map / Network */}
               <div className="absolute inset-0 flex justify-center items-center opacity-30 mt-4 pointer-events-none z-0">
                  <svg viewBox="0 0 100 100" className="w-64 h-64">
                    <polygon points="50,5 65,35 85,45 75,70 55,95 45,95 35,70 15,50 35,25" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="0.5" strokeLinejoin="round" opacity="0.5" />
                  </svg>
               </div>

               {/* Map Nodes and Curves */}
               <div className="relative w-full h-full z-10 flex items-center justify-center mt-8">
                  {/* Glowing Path */}
                  <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.8))' }}>
                     <path d="M 120 180 Q 250 150 220 80 T 350 140" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="10 5" className="animate-[dash_1s_linear_infinite]" />
                     <path d="M 120 180 Q 250 150 220 80 T 350 140" fill="none" stroke="#60a5fa" strokeWidth="2" />
                  </svg>

                  {/* Nodes */}
                  <div className="absolute left-[20%] bottom-[30%] flex flex-col items-center">
                     <div className="w-12 h-8 bg-[#0d162f] border border-blue-500 rounded relative shadow-lg flex items-center justify-center">
                        <Package size={14} className="text-blue-400" />
                     </div>
                     <span className="text-[10px] font-bold mt-1">Bengaluru</span>
                     <span className="text-[8px] text-green-400 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Origin</span>
                  </div>

                  <div className="absolute right-[25%] top-[40%] flex flex-col items-center">
                     <div className="w-12 h-8 bg-[#0d162f] border border-cyan-500 rounded relative shadow-lg flex items-center justify-center">
                        <MapPin size={14} className="text-cyan-400" />
                     </div>
                     <span className="text-[10px] font-bold mt-1">Mumbai</span>
                     <span className="text-[8px] text-blue-400 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Destination</span>
                  </div>

                  {/* Truck moving on path */}
                  <div className="absolute left-[45%] top-[45%] w-10 h-6 bg-blue-600 rounded shadow-[0_0_15px_rgba(37,99,235,0.8)] border border-blue-300 flex items-center justify-center z-20">
                     <Truck size={12} className="text-white" />
                  </div>
               </div>

               {/* Live Shipment Tracker Floating Window */}
               <div className="absolute top-4 left-4 bg-[#0d162f]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 w-56 z-30">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="text-[11px] font-bold">Live Shipment Tracker</h3>
                     <span className="text-[8px] text-green-400 bg-green-500/10 px-1.5 rounded border border-green-500/20">LIVE</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mb-1">DLV-98234</div>
                  <div className="text-[11px] font-bold mb-4">Bengaluru → Mumbai</div>
                  
                  <div className="flex justify-between text-[10px] mb-1">
                     <span className="text-slate-400">ETA</span>
                     <span className="font-bold text-green-400">2h 45m</span>
                  </div>
                  <div className="flex justify-between text-[10px] mb-1">
                     <span className="text-slate-400">Status</span>
                     <span className="font-bold text-blue-400">In Transit</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                     <div className="w-[72%] h-full bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="text-[8px] text-slate-400 mt-1 mb-4">72% Completed</div>
                  
                  <button className="w-full py-1.5 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 rounded-lg text-[10px] text-blue-400 flex items-center justify-center gap-1 transition">
                     Track on Map <Navigation size={10} />
                  </button>
               </div>

               {/* Warehouse Inventory Window */}
               <div className="absolute bottom-4 left-4 bg-[#0d162f]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 w-64 z-30">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-[10px] font-bold">Warehouse Inventory</h3>
                     <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>All Warehouses</option></select>
                  </div>
                  <div className="flex items-end justify-between h-16 px-2">
                     {[
                       { v: "82%", lbl: "SKU-101", h: 82 },
                       { v: "63%", lbl: "SKU-205", h: 63 },
                       { v: "91%", lbl: "SKU-309", h: 91 },
                       { v: "48%", lbl: "SKU-412", h: 48 },
                       { v: "72%", lbl: "SKU-509", h: 72 },
                     ].map((b, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 w-6">
                           <span className="text-[8px]">{b.v}</span>
                           <div className="w-full bg-blue-500/20 rounded-t-sm relative h-12">
                              <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm shadow-[0_0_5px_rgba(59,130,246,0.5)]" style={{height: `${b.h}%`}}></div>
                           </div>
                           <span className="text-[6px] text-slate-400">{b.lbl}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Data Column */}
            <div className="lg:w-64 flex flex-col gap-3">
               
               {/* Delivery Status Donut */}
               <div className="bg-[#0d162f]/80 backdrop-blur-md border border-white/5 rounded-xl p-3 flex flex-col">
                  <h3 className="text-[10px] font-semibold mb-2">Delivery Status</h3>
                  <div className="flex items-center justify-between">
                     <div className="relative w-16 h-16">
                       <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                         <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray="251" />
                         <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="16" strokeDasharray="180 251" strokeDashoffset="0" />
                         <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="45 251" strokeDashoffset="-180" />
                         <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="10 251" strokeDashoffset="-225" />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-[10px] font-bold">1,250</span>
                         <span className="text-[5px] text-slate-400">Total</span>
                       </div>
                     </div>
                     <div className="flex flex-col gap-1 text-[7px] flex-grow pl-3">
                        <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-green-500"></div> Delivered</span> <span>72%</span></div>
                        <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-blue-500"></div> In Transit</span> <span>18%</span></div>
                        <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-orange-500"></div> Pending</span> <span>8%</span></div>
                        <div className="flex justify-between w-full"><span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm bg-red-500"></div> Delayed</span> <span>2%</span></div>
                     </div>
                  </div>
               </div>

               {/* Route Efficiency Line Chart */}
               <div className="bg-[#0d162f]/80 backdrop-blur-md border border-white/5 rounded-xl p-3 flex flex-col relative flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-[10px] font-semibold">Route Efficiency</h3>
                    <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Week</option></select>
                  </div>
                  <div className="flex-grow relative mt-2">
                    <div className="absolute inset-0 z-10">
                      <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                        <path d="M0,45 L15,35 L30,40 L45,25 L60,15 L75,25 L100,10" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_2px_4px_rgba(59,130,246,0.5)]" />
                        <circle cx="100" cy="10" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="absolute right-0 top-6 bg-[#0a1125] p-1 rounded text-[7px] border border-white/10 z-20 text-center">
                       <div className="font-bold text-blue-400">87%</div>
                       <div className="text-slate-400 text-[5px]">Efficiency</div>
                    </div>
                    <div className="absolute left-0 top-0 bottom-4 w-5 flex flex-col justify-between text-[6px] text-slate-500 items-end pr-1">
                      <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
                    </div>
                    <div className="absolute bottom-0 left-5 right-0 flex justify-between text-[6px] text-slate-500">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>
               </div>

               {/* Regional Shipments */}
               <div className="bg-[#0d162f]/80 backdrop-blur-md border border-white/5 rounded-xl p-3 flex justify-between items-center h-20">
                  <div className="w-12 h-12 opacity-50 relative">
                     <Map size={48} className="text-blue-500 absolute inset-0" strokeWidth={1} />
                  </div>
                  <div className="flex flex-col text-[8px] gap-1">
                     <h3 className="text-[10px] font-semibold text-white mb-1">Regional Shipments</h3>
                     <div className="flex justify-between w-24"><span className="text-slate-400">Top Region</span> <span className="font-bold">West 42%</span></div>
                     <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 rounded-sm bg-blue-600"></div> High
                        <div className="w-2 h-2 rounded-sm bg-blue-400 ml-1"></div> Medium
                        <div className="w-2 h-2 rounded-sm bg-blue-200 ml-1"></div> Low
                     </div>
                  </div>
               </div>

            </div>
         </div>

         {/* Order Fulfillment Flow */}
         <div className="bg-[#0d162f]/60 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col mt-2 relative z-10">
            <h3 className="text-[11px] font-bold mb-4">Order Fulfillment Flow</h3>
            <div className="flex justify-between items-center relative px-4">
               {/* Line */}
               <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-700 -translate-y-1/2 z-0">
                  <div className="h-full bg-blue-500 w-[80%]"></div>
               </div>
               
               {[
                 { n: "Order Received", t: "09:20 AM", icon: <FileText size={16}/>, c: "text-blue-400 bg-[#0d162f] border-blue-500" },
                 { n: "Picked", t: "09:45 AM", icon: <Box size={16}/>, c: "text-blue-400 bg-[#0d162f] border-blue-500" },
                 { n: "Warehouse Dispatch", t: "10:30 AM", icon: <Store size={16}/>, c: "text-blue-400 bg-[#0d162f] border-blue-500" },
                 { n: "In Transit", t: "12:10 PM", icon: <Truck size={16}/>, c: "text-blue-400 bg-[#0d162f] border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" },
                 { n: "Out for Delivery", t: "01:45 PM", icon: <Navigation size={16}/>, c: "text-slate-400 bg-[#0a1125] border-slate-600" },
                 { n: "Delivered", t: "02:30 PM", icon: <CheckCircle2 size={16}/>, c: "text-green-500 bg-[#0a1125] border-green-500" },
               ].map((step, i) => (
                 <div key={i} className="flex flex-col items-center z-10 w-20">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${step.c}`}>
                       {step.icon}
                    </div>
                    <div className={`text-[9px] font-bold ${i < 4 ? 'text-white' : 'text-slate-400'}`}>{step.n}</div>
                    <div className="text-[8px] text-slate-500">{step.t}</div>
                 </div>
               ))}
               
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400">
                  <CheckCircle2 size={12} />
               </div>
            </div>
         </div>

         {/* Bottom KPI Bar */}
         <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
            {[
              { label: "On-Time Delivery", val: "98.6%", trend: "↑ 12.4%", icon: <Clock size={16}/>, c: "text-blue-400" },
              { label: "Active Shipments", val: "1,250", trend: "↑ 8.7%", icon: <Truck size={16}/>, c: "text-cyan-400" },
              { label: "Delayed Orders", val: "48", trend: "↓ 15.2%", icon: <ShieldAlert size={16}/>, c: "text-red-400" },
              { label: "Cost Saved", val: "$68,420", trend: "↑ 15.3%", icon: <DollarSign size={16}/>, c: "text-green-400" },
              { label: "Fleet Utilization", val: "76%", trend: "↑ 6.8%", icon: <Activity size={16}/>, c: "text-purple-400" },
            ].map((kpi, i) => (
               <div key={i} className="bg-[#0d162f]/60 backdrop-blur-md border border-white/5 rounded-xl p-3 flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-[#0a1125] border border-white/5 ${kpi.c}`}>
                    {kpi.icon}
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 mb-0.5">{kpi.label}</div>
                    <div className="text-sm font-bold text-slate-200">{kpi.val}</div>
                    <div className={`text-[8px] ${kpi.trend.includes('↑') ? 'text-green-400' : 'text-red-400'}`}>{kpi.trend}</div>
                  </div>
               </div>
            ))}
         </div>

      </div>

      {/* Right Floating Panel: Warehouse Management */}
      <div className="hidden xl:flex w-52 flex-col gap-4 z-10 h-full justify-center">
         <div className="bg-[#0a1125]/80 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-5 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <div className="w-14 h-12 bg-[#0d162f] border border-cyan-500/50 rounded-lg flex items-center justify-center mb-4">
               <Store size={20} className="text-cyan-400" />
            </div>
            <h2 className="text-lg font-bold mb-2 text-white">Warehouse<br/>Management</h2>
            <p className="text-[9px] text-slate-400 mb-6">Real-time inventory visibility & smarter warehouse operations.</p>
            
            <div className="h-28 bg-[#060d20] rounded-xl border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               {/* Forklift graphic representation */}
               <div className="z-10 flex flex-col items-center">
                  <Truck size={32} className="text-cyan-500 mb-1" />
                  <div className="w-16 h-2 bg-cyan-900 rounded-full blur-sm"></div>
               </div>
            </div>

            <div className="flex justify-between items-end border-t border-white/10 pt-4">
               <div>
                  <div className="text-[9px] text-slate-400">Inventory Accuracy</div>
                  <div className="text-xl font-bold">98.2%</div>
                  <div className="text-[8px] text-green-400">↑ 7.1%</div>
               </div>
               <div className="text-right">
                  <div className="text-[9px] text-slate-400">Orders Picked</div>
                  <div className="text-xl font-bold">3,462</div>
                  <div className="text-[8px] text-green-400">↑ 11.4%</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
