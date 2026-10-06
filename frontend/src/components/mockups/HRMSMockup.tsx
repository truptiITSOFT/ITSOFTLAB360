import React from "react";
import { 
  Users, Calendar, Clock, DollarSign, FileText, 
  ChevronDown, Bell, Plus, CheckCircle2, AlertCircle, TrendingUp, UserCheck
} from "lucide-react";

export default function HRMSMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[512px] text-white bg-[#030816] rounded-3xl p-5 flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-[#EB3158] border border-blue-500/30">
            <Users size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">HRMS</h2>
            <p className="text-sm text-slate-400">Manage HR, payroll, attendance, leave, and employee records.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-[#0f172a] border border-white/10 text-xs px-3 py-2 rounded-lg text-slate-300 outline-none">
            <option>HR Dashboard</option>
          </select>
          <button className="w-8 h-8 rounded-lg bg-[#0f172a] flex items-center justify-center border border-white/10">
            <Calendar size={14} className="text-slate-300" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#EB3158] flex items-center justify-center text-xs font-bold border border-white/10">
            JD
          </div>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Employees", val: "1,248", trend: "+12.5%", up: true, icon: <Users size={16}/>, color: "text-[#EB3158]" },
          { label: "Present Today", val: "1,056", trend: "84.6%", up: true, icon: <UserCheck size={16}/>, color: "text-green-400" },
          { label: "Payroll Processed", val: "$583,420", trend: "+16.3%", up: true, icon: <DollarSign size={16}/>, color: "text-purple-400" },
          { label: "Leave Requests", val: "32", trend: "Pending", up: false, icon: <FileText size={16}/>, color: "text-orange-400" },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#0a1125] border border-white/5 rounded-xl p-3 flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/5 ${kpi.color}`}>
              {kpi.icon}
            </div>
            <div>
              <div className="text-[8px] text-slate-400">{kpi.label}</div>
              <div className="text-lg font-bold leading-tight">{kpi.val}</div>
              <div className={`text-[7.2px] ${kpi.up ? 'text-green-500' : 'text-orange-500'}`}>
                {kpi.up ? '↑ ' : ''}{kpi.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow">
        
        {/* Left Column: Employee Directory */}
        <div className="lg:col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold">Employee Directory</h3>
            <span className="text-[8px] text-[#EB3158] cursor-pointer">View all employees</span>
          </div>
          
          <div className="flex flex-col gap-3 flex-grow">
            {[
              { name: "Rohan Mehta", role: "Product Manager", status: "Active", bg: "bg-purple-500" },
              { name: "Neha Sharma", role: "HR Executive", status: "Active", bg: "bg-pink-500" },
              { name: "Arjun Nair", role: "UI/UX Designer", status: "Active", bg: "bg-[#EB3158]" },
              { name: "Pooja Verma", role: "Marketing Specialist", status: "Active", bg: "bg-green-500" },
            ].map((emp, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${emp.bg}`}>
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{emp.name}</div>
                    <div className="text-[8px] text-slate-400">{emp.role}</div>
                  </div>
                </div>
                <div className="text-[7.2px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  {emp.status}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-xs text-[#EB3158] hover:bg-[#d6274d]/10 rounded-lg transition border border-dashed border-blue-500/30">
            <Plus size={14} /> Add New Employee
          </button>
        </div>

        {/* Right Columns (2 spans) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          {/* Top Row: Attendance & Payroll */}
          <div className="grid grid-cols-2 gap-4 h-[144px]">
            {/* Attendance Overview Donut */}
            <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold">Attendance Overview</h3>
                <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>Today</option></select>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative w-28 h-28 ml-2">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="12" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="30 251" strokeDashoffset="-220" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="210 251" strokeDashoffset="0" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold">1,056</span>
                    <span className="text-[7.2px] text-slate-400">Present</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 text-xs flex-grow ml-2">
                   <div className="flex justify-between"><span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Present</span> <span className="text-slate-400">1,056 (84.6%)</span></div>
                   <div className="flex justify-between"><span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Absent</span> <span className="text-slate-400">132 (10.6%)</span></div>
                   <div className="flex justify-between"><span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div> Late</span> <span className="text-slate-400">60 (4.8%)</span></div>
                </div>
              </div>
            </div>

            {/* Payroll Summary */}
            <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col relative overflow-hidden">
               {/* Decorative background element */}
               <div className="absolute right-[-16px] top-10 opacity-20">
                 <DollarSign size={120} className="text-[#EB3158]" />
               </div>
               
               <div className="flex justify-between items-center mb-2 z-10">
                 <h3 className="text-sm font-semibold">Payroll Summary</h3>
                 <select className="bg-transparent text-[8px] text-slate-400 outline-none"><option>May 2025</option></select>
               </div>
               
               <div className="z-10 mt-2">
                 <div className="text-[8px] text-slate-400 mb-1">Total Payroll</div>
                 <div className="flex items-end gap-2">
                   <div className="text-3xl font-bold">$583,420</div>
                   <div className="text-[8px] text-green-500 mb-1 flex items-center">↑ 16.3% <span className="text-[#15172B]/60 ml-1">vs Apr 2025</span></div>
                 </div>
               </div>
               
               <div className="grid grid-cols-4 gap-2 mt-auto z-10 pt-4 border-t border-white/5">
                 {[
                   { l: "Net Pay", v: "$456,230", c: "text-[#EB3158]" },
                   { l: "Deductions", v: "$68,420", c: "text-red-400" },
                   { l: "Bonuses", v: "$32,770", c: "text-green-400" },
                   { l: "Taxes", v: "$26,000", c: "text-orange-400" },
                 ].map((item, i) => (
                   <div key={i}>
                     <div className="text-[7.2px] text-slate-400">{item.l}</div>
                     <div className={`text-xs font-semibold ${item.c}`}>{item.v}</div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Bottom Row: Leaves & Analytics */}
          <div className="grid grid-cols-3 gap-4 flex-grow min-h-[144px]">
            {/* Leave Requests */}
            <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-semibold">Leave Requests</h3>
                <span className="text-[7.2px] text-[#EB3158] cursor-pointer">View all</span>
              </div>
              <div className="flex flex-col gap-3">
                 {[
                   { n: "Anjali Singh", t: "Annual Leave", d: "May 20 - May 24", s: "Pending", sc: "text-orange-400 bg-orange-500/10", a: "bg-pink-500" },
                   { n: "Vikram Patel", t: "Personal Leave", d: "May 16", s: "Approved", sc: "text-green-400 bg-green-500/10", a: "bg-indigo-500" },
                   { n: "Sneha Iyer", t: "Sick Leave", d: "May 15 - May 16", s: "Pending", sc: "text-orange-400 bg-orange-500/10", a: "bg-purple-500" },
                 ].map((lr, i) => (
                   <div key={i} className="flex justify-between items-center">
                     <div className="flex items-center gap-2">
                       <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold ${lr.a}`}>
                         {lr.n.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                         <div className="text-[8.8px] font-semibold">{lr.n}</div>
                         <div className="text-[6.4px] text-slate-400">{lr.t} • {lr.d}</div>
                       </div>
                     </div>
                     <div className={`text-[6.4px] px-1.5 py-0.5 rounded ${lr.sc}`}>{lr.s}</div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Leave Balance */}
            <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-semibold">Leave Balance</h3>
                <span className="text-[7.2px] text-[#EB3158] cursor-pointer">View all</span>
              </div>
              <div className="flex flex-col gap-4">
                 {[
                   { l: "Annual Leave", v: 12, max: 20, c: "bg-[#EB3158]" },
                   { l: "Sick Leave", v: 8, max: 12, c: "bg-green-500" },
                   { l: "Casual Leave", v: 6, max: 10, c: "bg-purple-500" },
                 ].map((lb, i) => (
                   <div key={i}>
                     <div className="flex justify-between items-center mb-1 text-[8px]">
                       <div className="flex items-center gap-1.5">
                         <Calendar size={12} className={lb.c.replace('bg-', 'text-')} />
                         <span>{lb.l}</span>
                       </div>
                       <span><span className="font-bold">{lb.v}</span> / {lb.max} Days</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className={`h-full ${lb.c} rounded-full`} style={{ width: `${(lb.v/lb.max)*100}%` }}></div>
                     </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* HR Analytics Chart */}
            <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">HR Analytics</h3>
                <select className="bg-transparent text-[7.2px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              
              <div className="flex-grow relative mt-2">
                {/* SVG Line Graph */}
                <div className="absolute inset-0 z-10">
                  <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M0,40 L10,30 L20,35 L30,20 L40,25 L50,15 L60,25 L70,10 L80,20 L90,5 L100,10" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_5px_#3b82f6]" />
                    <path d="M0,40 L10,30 L20,35 L30,20 L40,25 L50,15 L60,25 L70,10 L80,20 L90,5 L100,10 L100,50 L0,50 Z" fill="url(#hrGradient)" opacity="0.2" />
                    <defs>
                      <linearGradient id="hrGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-white/5 text-[7.2px]">
                <div>
                  <div className="text-slate-400">New Joinees</div>
                  <div className="font-bold text-sm">28</div>
                  <div className="text-green-500">↑ 27.3%</div>
                </div>
                <div>
                  <div className="text-slate-400">Resignations</div>
                  <div className="font-bold text-sm">05</div>
                  <div className="text-red-500">↓ 16.7%</div>
                </div>
                <div>
                  <div className="text-slate-400">Avg. Tenure</div>
                  <div className="font-bold text-sm">2.6 Yrs</div>
                  <div className="text-green-500">↑ 8.3%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
