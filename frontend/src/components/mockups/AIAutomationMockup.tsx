import React from "react";
import { 
  Bot, Megaphone, Mail, Users2, Workflow, BarChart3,
  Calendar, Bell, TrendingUp, TrendingDown, Target, Eye, 
  MousePointerClick, CheckCircle, DollarSign, BrainCircuit,
  Settings2, Clock, ShieldAlert, Sparkles, Filter, ChevronRight,
  FileText, RefreshCcw, Video, UserPlus
} from "lucide-react";

export default function AIAutomationMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[640px] text-white bg-[#030816] rounded-3xl p-5 flex-col lg:flex-row gap-5">
      
      {/* Left Sidebar */}
      <div className="w-64 bg-[#0a1125] border border-white/5 p-5 flex flex-col gap-4 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col gap-2 mb-2 pt-2 z-10">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-500 border border-purple-500/30">
            <Bot size={28} />
          </div>
          <h2 className="text-xl font-bold mt-2">AI<br/><span className="text-purple-400">AUTOMATION</span></h2>
        </div>
        <p className="text-[11px] text-slate-400 mb-2 z-10">Automate campaigns, email marketing, lead nurturing, customer journeys, and analytics.</p>
        
        <div className="flex flex-col gap-3 z-10">
           {[
             { title: "Smart Campaigns", desc: "Create, automate & optimize campaigns with AI.", icon: <Megaphone size={16}/>, color: "text-purple-500", bg: "bg-purple-500/20" },
             { title: "Email Automation", desc: "Personalized emails at scale that drive engagement.", icon: <Mail size={16}/>, color: "text-blue-500", bg: "bg-blue-500/20" },
             { title: "Lead Nurturing", desc: "Nurture leads with intelligent workflows & scoring.", icon: <Users2 size={16}/>, color: "text-green-500", bg: "bg-green-500/20" },
             { title: "Customer Journeys", desc: "Build seamless journeys across multiple touchpoints.", icon: <Workflow size={16}/>, color: "text-yellow-500", bg: "bg-yellow-500/20" },
             { title: "Powerful Analytics", desc: "Track performance, ROI & take data-driven decisions.", icon: <BarChart3 size={16}/>, color: "text-pink-500", bg: "bg-pink-500/20" },
           ].map((item, i) => (
             <div key={i} className="flex gap-3 items-start p-2 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/5 cursor-pointer">
               <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>{item.icon}</div>
               <div>
                 <div className="text-xs font-semibold text-slate-200 leading-tight">{item.title}</div>
                 <div className="text-[9px] text-slate-500 mt-0.5">{item.desc}</div>
               </div>
             </div>
           ))}
        </div>

        {/* AI Robot Graphic Area */}
        <div className="mt-auto h-32 relative flex items-end justify-center z-10 pt-4">
           {/* Abstract AI Background */}
           <div className="absolute w-32 h-32 bg-purple-600/20 rounded-full blur-2xl bottom-[-20px]"></div>
           <div className="absolute inset-0 flex justify-center items-center opacity-30 mt-4 pointer-events-none">
             <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="2 6" />
             </svg>
           </div>
           
           {/* Robot Box */}
           <div className="relative bg-[#0d162f] p-4 rounded-full border-2 border-purple-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] z-20">
              <Bot size={32} className="text-purple-400" />
           </div>
           
           {/* Floating elements */}
           <Mail size={14} className="absolute left-6 top-8 text-blue-400 opacity-80" />
           <Megaphone size={12} className="absolute right-8 top-6 text-pink-400 opacity-80" />
           <Target size={16} className="absolute right-4 bottom-10 text-green-400 opacity-80" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col gap-4">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0a1125] p-4 rounded-2xl border border-white/5">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-500">
               <Bot size={20} />
             </div>
             <div>
               <h2 className="text-lg font-bold">AI Automation Dashboard</h2>
               <p className="text-[11px] text-slate-400">Automate. Personalize. Engage. Convert.</p>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-[#0d162f] border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300">
               May 01 - May 31, 2025 <Calendar size={12} />
             </div>
             <button className="w-8 h-8 rounded-lg bg-[#0d162f] flex items-center justify-center border border-white/10 relative">
               <Bell size={14} className="text-slate-300" />
               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"></span>
             </button>
             <div className="flex items-center gap-2 pl-2">
               <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-xs font-bold shadow-md">PS</div>
               <div className="text-left text-[10px] hidden md:block pr-2">
                 <div className="font-semibold text-slate-200">Priya Sharma</div>
                 <div className="text-slate-500">Marketing Head</div>
               </div>
             </div>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total Campaigns", val: "128", trend: "+18.6%", up: true, icon: <Megaphone size={16}/>, color: "text-purple-400", bg: "bg-purple-500/10" },
            { label: "Emails Sent", val: "356,280", trend: "+23.4%", up: true, icon: <Mail size={16}/>, color: "text-blue-400", bg: "bg-blue-500/10" },
            { label: "Open Rate", val: "28.6%", trend: "+6.7%", up: true, icon: <Eye size={16}/>, color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { label: "Click Rate", val: "8.4%", trend: "+9.1%", up: true, icon: <MousePointerClick size={16}/>, color: "text-yellow-400", bg: "bg-yellow-500/10" },
            { label: "Conversions", val: "2,450", trend: "+16.3%", up: true, icon: <Target size={16}/>, color: "text-red-400", bg: "bg-red-500/10" },
            { label: "Revenue Generated", val: "$98,420", trend: "+21.8%", up: true, icon: <DollarSign size={16}/>, color: "text-green-400", bg: "bg-green-500/10" },
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
                  {kpi.up ? <TrendingUp size={10}/> : <TrendingDown size={10}/>} {kpi.trend} <span className="text-slate-500 font-normal">vs Apr 2025</span>
               </div>
             </div>
          ))}
        </div>

        {/* Middle Area: Line Chart, Funnel, List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[200px]">
           
           {/* Campaign Performance Line Chart */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Campaign Performance</h3>
                <select className="bg-transparent text-[9px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow relative mt-2">
                <div className="absolute inset-0 z-10">
                  <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M0,45 L10,35 L20,40 L30,25 L40,35 L50,15 L60,20 L70,10 L80,25 L90,5 L100,10" fill="none" stroke="#a855f7" strokeWidth="2" className="drop-shadow-[0_2px_4px_rgba(168,85,247,0.5)]" />
                    {/* Points */}
                    <circle cx="50" cy="15" r="2" fill="#fff" stroke="#a855f7" strokeWidth="1" />
                    <circle cx="70" cy="10" r="2" fill="#fff" stroke="#a855f7" strokeWidth="1" />
                    <circle cx="90" cy="5" r="2" fill="#fff" stroke="#a855f7" strokeWidth="1" />
                  </svg>
                </div>
                <div className="absolute right-0 top-0 bg-[#0d162f]/80 p-1.5 rounded text-[8px] border border-white/10 z-20 text-center backdrop-blur-sm">
                   <div className="text-slate-400 text-[6px]">May 31, 2025</div>
                   <div className="text-slate-400 text-[6px] mt-0.5">Conversions</div>
                   <div className="font-bold text-slate-200">2,450</div>
                   <div className="text-green-400 text-[6px]">↑ 16.3%</div>
                </div>
                <div className="absolute left-0 top-0 bottom-4 w-6 flex flex-col justify-between text-[7px] text-slate-500 items-end pr-1">
                  <span>250k</span><span>200k</span><span>150k</span><span>100k</span><span>50k</span><span>0</span>
                </div>
                <div className="absolute bottom-0 left-6 right-0 flex justify-between text-[7px] text-slate-500">
                  <span>May 01</span><span>May 06</span><span>May 11</span><span>May 16</span><span>May 21</span><span>May 26</span><span>May 31</span>
                </div>
              </div>
           </div>

           {/* Campaign Funnel */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-semibold">Campaign Funnel</h3>
                <select className="bg-transparent text-[9px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow flex items-center justify-between">
                 <div className="w-1/3 flex flex-col justify-center gap-0.5">
                   {/* Abstract Funnel Graphic */}
                   <div className="h-8 bg-blue-500 rounded-sm w-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                   <div className="h-8 bg-indigo-500 rounded-sm w-5/6 mx-auto shadow-[0_0_10px_rgba(99,102,241,0.3)]"></div>
                   <div className="h-8 bg-purple-500 rounded-sm w-4/6 mx-auto shadow-[0_0_10px_rgba(168,85,247,0.3)]"></div>
                   <div className="h-8 bg-orange-500 rounded-sm w-3/6 mx-auto shadow-[0_0_10px_rgba(249,115,22,0.3)]"></div>
                   <div className="h-8 bg-red-500 rounded-sm w-2/6 mx-auto shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>
                 </div>
                 <div className="w-2/3 flex flex-col justify-between h-full py-1 text-[9px] pl-4">
                    <div className="flex justify-between">
                       <span className="text-slate-400">Impressions</span> <span className="font-bold">356,280</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-400">Opens</span> <span>102,120 (28.6%)</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-400">Clicks</span> <span>29,890 (8.4%)</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-400">Leads</span> <span>6,230 (2.2%)</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-400">Conversions</span> <span>2,450 (0.87%)</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Top Performing Campaigns */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Top Performing Campaigns</h3>
                <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex flex-col gap-2.5 text-[9px]">
                 {[
                   { n: "Summer Sale Campaign", sent: "85,420", open: "32.4%", icon: <Mail size={12}/>, bg: "bg-blue-600" },
                   { n: "Product Launch - Pro", sent: "62,310", open: "29.8%", icon: <Megaphone size={12}/>, bg: "bg-teal-600" },
                   { n: "Newsletter - May", sent: "48,280", open: "27.6%", icon: <FileText size={12}/>, bg: "bg-green-600" },
                   { n: "Re-engagement Drive", sent: "35,210", open: "24.1%", icon: <RefreshCcw size={12}/>, bg: "bg-orange-600" },
                   { n: "Webinar Invitation", sent: "24,860", open: "31.2%", icon: <Video size={12}/>, bg: "bg-pink-600" },
                 ].map((camp, i) => (
                   <div key={i} className="flex justify-between items-center pb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center font-bold ${camp.bg}`}>{camp.icon}</div>
                        <div>
                           <div className="text-slate-200 font-semibold">{camp.n}</div>
                           <div className="text-[8px] text-slate-500">Sent: {camp.sent}</div>
                        </div>
                      </div>
                      <div className="text-right">
                         <div className="text-slate-400 text-[8px]">Open Rate</div>
                         <div className="font-bold">{camp.open}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Row 3: Audience, Automation Workflow, Channel Perf */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[160px]">
           {/* Audience Overview Donut */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xs font-semibold">Audience Overview</h3>
                <select className="bg-transparent text-[9px] text-slate-400 outline-none"><option>All Audiences</option></select>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="12" strokeDasharray="210 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="150 251" strokeDashoffset="-40" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="80 251" strokeDashoffset="-100" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[11px] font-bold">45,680</span>
                    <span className="text-[7px] text-slate-400">Total</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-[9px] flex-grow pl-4">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> New Leads</span> <span>15,620 (34.2%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Active Leads</span> <span>12,850 (28.1%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Nurturing</span> <span>9,450 (20.7%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Engaged</span> <span>7,760 (17.0%)</span></div>
                </div>
              </div>
           </div>

           {/* Automation Workflows */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Automation Workflows</h3>
                <span className="text-[8px] text-blue-400 cursor-pointer">View All</span>
              </div>
              <div className="flex-grow flex items-center justify-between relative px-2 pt-2">
                 {/* Connection Lines */}
                 <div className="absolute top-6 left-10 right-10 h-0 border-b border-dashed border-slate-600 z-0"></div>
                 <div className="absolute top-6 right-10 w-4 h-12 border-r border-b border-dashed border-slate-600 z-0"></div>
                 <div className="absolute top-18 right-10 left-1/2 h-0 border-b border-dashed border-slate-600 z-0"></div>
                 <div className="absolute top-6 left-1/2 w-4 h-12 border-l border-b border-dashed border-slate-600 z-0"></div>

                 {/* Nodes */}
                 {[
                   { n: "Trigger", sub: "New Lead", icon: <UserPlus size={14}/>, c: "text-green-400", b: "border-green-500", bg: "bg-[#0d162f]", pos: "" },
                   { n: "Email 1", sub: "Welcome Email", icon: <Mail size={14}/>, c: "text-blue-400", b: "border-blue-500", bg: "bg-[#0d162f]", pos: "" },
                   { n: "Delay", sub: "2 Days", icon: <Clock size={14}/>, c: "text-yellow-400", b: "border-yellow-500", bg: "bg-[#0d162f]", pos: "" },
                   { n: "Email 2", sub: "Product Info", icon: <Mail size={14}/>, c: "text-purple-400", b: "border-purple-500", bg: "bg-[#0d162f]", pos: "" },
                 ].map((node, i) => (
                    <div key={i} className="flex flex-col items-center text-center z-10 w-16">
                       <div className={`w-8 h-8 rounded-lg ${node.bg} border ${node.b} flex items-center justify-center ${node.c} mb-1 shadow-md bg-[#0a1125]`}>
                         {node.icon}
                       </div>
                       <div className="text-[8px] font-bold text-slate-200">{node.n}</div>
                       <div className="text-[7px] text-slate-500">{node.sub}</div>
                    </div>
                 ))}
                 
                 {/* Branch Nodes */}
                 <div className="absolute bottom-1 right-8 flex flex-col items-center text-center z-10 w-16">
                    <div className="text-[7px] text-green-500 font-bold mb-1 absolute -top-4 -left-4">Yes</div>
                    <div className="w-8 h-8 rounded-lg bg-[#0d162f] border border-red-500 flex items-center justify-center text-red-400 mb-1 shadow-md">
                      <Users2 size={14} />
                    </div>
                    <div className="text-[8px] font-bold text-slate-200">Add to List</div>
                    <div className="text-[7px] text-slate-500">Hot Leads</div>
                 </div>
                 <div className="absolute bottom-1 left-[45%] flex flex-col items-center text-center z-10 w-16">
                    <div className="text-[7px] text-red-500 font-bold mb-1 absolute -top-4 -right-4">No</div>
                    <div className="w-8 h-8 rounded-lg bg-[#0d162f] border border-cyan-500 flex items-center justify-center text-cyan-400 mb-1 shadow-md border-dashed">
                      <Filter size={14} />
                    </div>
                    <div className="text-[8px] font-bold text-slate-200">Condition</div>
                    <div className="text-[7px] text-slate-500">Interested?</div>
                 </div>
              </div>
           </div>

           {/* Channel Performance Progress Bars */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold">Channel Performance</h3>
                <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex flex-col gap-2.5 text-[9px]">
                 {[
                   { n: "Email", pct: "28.6%", color: "bg-blue-600" },
                   { n: "SMS", pct: "18.3%", color: "bg-green-500" },
                   { n: "WhatsApp", pct: "22.7%", color: "bg-teal-500" },
                   { n: "Social Media", pct: "14.2%", color: "bg-orange-500" },
                   { n: "Web Push", pct: "9.8%", color: "bg-purple-600" },
                 ].map((chan, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="w-20 text-slate-300">{chan.n}</div>
                     <div className="flex-grow mx-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${chan.color} rounded-full`} style={{ width: chan.pct }}></div>
                     </div>
                     <div className="w-10 text-right font-medium">{chan.pct}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Small Bottom Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-auto">
           {[
             { label: "AI Suggestions", val: "24", sub: "New Opportunities", icon: <Sparkles size={18}/>, c: "text-blue-400 bg-blue-500/10" },
             { label: "A/B Tests", val: "14", sub: "Active Tests", icon: <BrainCircuit size={18}/>, c: "text-green-400 bg-green-500/10" },
             { label: "Avg. Response Time", val: "2.4 hrs", sub: "↓ 8.6%", icon: <Clock size={18}/>, c: "text-indigo-400 bg-indigo-500/10" },
             { label: "Spam Complaints", val: "0.12%", sub: "↓ 15.2%", icon: <ShieldAlert size={18}/>, c: "text-teal-400 bg-teal-500/10" },
             { label: "ROI", val: "340%", sub: "↑ 22.5%", icon: <TrendingUp size={18}/>, c: "text-cyan-400 bg-cyan-500/10" },
           ].map((card, i) => (
              <div key={i} className="bg-[#0a1125] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                 <div className={`p-2 rounded-xl ${card.c}`}>
                   {card.icon}
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[9px] text-slate-400 leading-tight">{card.label}</span>
                   <span className="text-sm font-bold text-slate-200 leading-tight my-0.5">{card.val}</span>
                   <span className={`text-[8px] ${card.sub.includes('↑') || card.sub.includes('↓') ? 'text-green-400' : 'text-slate-500'}`}>{card.sub}</span>
                 </div>
              </div>
           ))}
        </div>

      </div>
    </div>
  );
}
