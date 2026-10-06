import React from "react";
import { 
  GraduationCap, Users2, CheckCircle2, Clock, Award, Trophy,
  User, BookOpen, ClipboardCheck, PlayCircle, ShieldAlert,
  Calendar, Bell, TrendingUp, TrendingDown, BookOpenCheck,
  Video, Play, ChevronRight, FileCheck, Target, BarChart3
} from "lucide-react";

export default function LMSMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[512px] text-white bg-[#030816] rounded-3xl p-5 flex-col gap-4 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#EB3158]/10 rounded-full blur-[80px] pointer-events-none z-0"></div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col gap-4 z-10 bg-[#0a1125]/80 backdrop-blur-md border border-blue-500/20 rounded-3xl p-5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-[#060d20] p-4 rounded-2xl border border-white/5">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-[#EB3158] flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]">
               <GraduationCap size={24} />
             </div>
             <div>
               <h2 className="text-xl font-bold">Learning Management System</h2>
               <p className="text-[8.8px] text-slate-400">Deliver online training, certifications, assessments, employee learning, and compliance courses.</p>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <select className="hidden sm:block bg-[#0d162f] border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300 outline-none">
               <option>LMS Dashboard</option>
             </select>
             <button className="w-8 h-8 rounded-lg bg-[#0d162f] flex items-center justify-center border border-white/10">
               <Calendar size={14} className="text-slate-300" />
             </button>
             <button className="w-8 h-8 rounded-lg bg-[#0d162f] flex items-center justify-center border border-white/10 relative">
               <Bell size={14} className="text-slate-300" />
               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"></span>
             </button>
             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border border-white/10">
                <img src="https://ui-avatars.com/api/?name=Rohan+Mehta&background=3b82f6&color=fff" alt="User" />
             </div>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Active Learners", val: "2,846", trend: "↑ 18.4% vs last month", icon: <Users2 size={18}/>, color: "text-[#EB3158]", bg: "bg-[#EB3158]/10" },
            { label: "Average Quiz Score", val: "84.7%", trend: "↑ 5.3% vs last month", icon: <CheckCircle2 size={18}/>, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Learning Hours", val: "1,256 hrs", trend: "↑ 21.7% vs last month", icon: <Clock size={18}/>, color: "text-indigo-400", bg: "bg-indigo-500/10" },
            { label: "Certificates Issued", val: "412", trend: "↑ 15.8% vs last month", icon: <Award size={18}/>, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          ].map((kpi, i) => (
             <div key={i} className="bg-[#0a1125] border border-white/5 rounded-2xl p-3 flex flex-col justify-center shadow-inner">
               <div className="flex items-center gap-3 mb-2">
                 <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
                   {kpi.icon}
                 </div>
                 <span className="text-[8px] text-slate-400">{kpi.label}</span>
               </div>
               <div className="flex items-end justify-between px-1">
                 <div className="text-lg font-bold">{kpi.val}</div>
                 <div className={`text-[6.4px] font-medium mb-1 text-green-400`}>{kpi.trend}</div>
               </div>
             </div>
          ))}
          {/* Streak Champion Card */}
          <div className="bg-gradient-to-r from-yellow-900/40 to-[#0a1125] border border-yellow-500/20 rounded-2xl p-3 flex items-center gap-3">
             <div className="p-2 rounded-xl bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
               <Trophy size={20} />
             </div>
             <div className="flex flex-col">
               <span className="text-[7.2px] text-slate-400">Streak Champion</span>
               <span className="text-sm font-bold text-slate-200">Rohan Mehta</span>
               <span className="text-[8px] text-yellow-400 font-semibold mt-0.5">23 day streak</span>
             </div>
          </div>
        </div>

        {/* Middle Area: Learning Journey & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[144px]">
           {/* Learning Journey Timeline */}
           <div className="lg:col-span-1 bg-[#0d162f]/60 border border-white/5 rounded-2xl p-4 flex flex-col relative overflow-hidden">
              <h3 className="text-xs font-semibold mb-6">Learning Journey</h3>
              <div className="flex justify-between items-center relative px-2 flex-grow">
                 {/* Line */}
                 <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-700 -translate-y-1/2 z-0 rounded-full">
                    <div className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 w-[60%] rounded-full"></div>
                 </div>
                 
                 {[
                   { n: "Enrolled", sub: "Course Access\nGranted", icon: <User size={14}/>, c: "text-green-400 bg-[#0d162f] border-green-500" },
                   { n: "In Progress", sub: "Lessons &\nActivities", icon: <BookOpen size={14}/>, c: "text-[#EB3158] bg-[#0d162f] border-[#EB3158]/50" },
                   { n: "Assessment", sub: "Quiz / Exam\nIn Review", icon: <ClipboardCheck size={14}/>, c: "text-purple-400 bg-[#0d162f] border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" },
                   { n: "Certified", sub: "Certificate\nEarned", icon: <Award size={14}/>, c: "text-yellow-500 bg-[#0a1125] border-yellow-700 opacity-50" },
                 ].map((step, i) => (
                   <div key={i} className="flex flex-col items-center z-10 w-16 text-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${step.c}`}>
                         {step.icon}
                      </div>
                      <div className={`text-[7.2px] font-bold ${i < 3 ? step.c.split(' ')[0] : 'text-[#15172B]/60'}`}>{step.n}</div>
                      <div className="text-[5.6px] text-slate-400 whitespace-pre-line leading-tight mt-1">{step.sub}</div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Course Completion Donut */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <h3 className="text-xs font-semibold mb-2">Course Completion</h3>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="14" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="14" strokeDasharray="251" strokeDashoffset="25.1" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0ea5e9" strokeWidth="14" strokeDasharray="251" strokeDashoffset="75.3" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="14" strokeDasharray="251" strokeDashoffset="120.48" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold">72%</span>
                    <span className="text-[6.4px] text-slate-400">Completed</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[8px] flex-grow pl-6">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Completed</span> <span>72%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#EB3158]"></div> In Progress</span> <span>18%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-700"></div> Not Started</span> <span>10%</span></div>
                </div>
              </div>
           </div>

           {/* Skill Progress */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold">Skill Progress</h3>
                <span className="text-[7.2px] text-[#EB3158] cursor-pointer">View All</span>
              </div>
              <div className="flex flex-col gap-2 text-[8px]">
                 {[
                   { n: "Leadership", pct: "85%", color: "bg-[#EB3158]" },
                   { n: "Communication", pct: "78%", color: "bg-green-500" },
                   { n: "Project Mgmt.", pct: "72%", color: "bg-teal-500" },
                   { n: "Data Analysis", pct: "68%", color: "bg-[#EB3158]" },
                   { n: "Compliance", pct: "90%", color: "bg-purple-500" },
                   { n: "Digital Skills", pct: "63%", color: "bg-indigo-500" },
                 ].map((skill, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="w-24 text-slate-300 truncate">{skill.n}</div>
                     <div className="flex-grow mx-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${skill.color} rounded-full`} style={{ width: skill.pct }}></div>
                     </div>
                     <div className="w-8 text-right font-medium">{skill.pct}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Row 3: Lists & Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[160px]">
           
           {/* Top Courses */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold">Top Courses</h3>
                <span className="text-[7.2px] text-[#EB3158] cursor-pointer">View All</span>
              </div>
              <div className="flex flex-col gap-2.5 text-[8px]">
                 {[
                   { n: "Leadership Essentials", pct: "92%", color: "bg-[#EB3158]" },
                   { n: "Project Management Fundamentals", pct: "75%", color: "bg-green-500" },
                   { n: "Cybersecurity Awareness", pct: "68%", color: "bg-purple-500" },
                   { n: "Effective Communication", pct: "64%", color: "bg-orange-500" },
                   { n: "Data Analytics Basics", pct: "58%", color: "bg-teal-500" },
                 ].map((course, i) => (
                   <div key={i} className="flex flex-col gap-1">
                      <div className="flex justify-between text-slate-300">
                         <div className="flex items-center gap-1.5 truncate pr-2 w-[85%]">
                            <div className="w-4 h-4 rounded overflow-hidden flex-shrink-0 opacity-80"><img src={`https://picsum.photos/seed/${i}/20/20`} alt="cover"/></div>
                            <span className="truncate">{course.n}</span>
                         </div>
                         <span className="font-semibold text-white w-[15%] text-right">{course.pct}</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className={`h-full ${course.color} rounded-full`} style={{ width: course.pct }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Assessment Performance Line Chart */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Assessment Performance</h3>
                <select className="bg-transparent text-[7.2px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow relative mt-2">
                <div className="absolute inset-0 z-10">
                  <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M0,35 L10,25 L20,30 L30,15 L40,40 L50,10 L60,25 L70,15 L80,30 L90,10 L100,20" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_2px_4px_rgba(59,130,246,0.5)]" />
                    {/* Point */}
                    <circle cx="50" cy="10" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                  </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d162f]/80 p-1 rounded text-[5.6px] border border-white/10 z-20 text-center backdrop-blur-sm -mt-4">
                   <div className="text-slate-400">May 16</div>
                   <div className="font-bold text-slate-200">Score: 88%</div>
                </div>
                <div className="absolute left-0 top-0 bottom-4 w-6 flex flex-col justify-between text-[5.6px] text-[#15172B]/60 items-end pr-1">
                  <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
                </div>
                <div className="absolute bottom-4 left-6 right-0 flex justify-between text-[5.6px] text-[#15172B]/60">
                  <span>May 1</span><span>May 8</span><span>May 16</span><span>May 23</span><span>May 30</span>
                </div>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-[7.2px] mt-1">
                 <div className="text-center">
                    <div className="text-slate-400">Highest Score</div>
                    <div className="font-bold text-sm">98%</div>
                 </div>
                 <div className="text-center">
                    <div className="text-slate-400">Average Score</div>
                    <div className="font-bold text-sm">84.7%</div>
                 </div>
                 <div className="text-center">
                    <div className="text-slate-400">Assessments</div>
                    <div className="font-bold text-sm">126</div>
                 </div>
              </div>
           </div>

           {/* Compliance Training Status */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold">Compliance Training Status</h3>
                <span className="text-[7.2px] text-[#EB3158] cursor-pointer">View All</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="226 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0ea5e9" strokeWidth="16" strokeDasharray="196 251" strokeDashoffset="-25" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[9.6px] font-bold">78%</span>
                    <span className="text-[4.8px] text-slate-400">Compliant</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[7.2px] flex-grow pl-4">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-sky-500"></div> Compliant</span> <span>78%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-yellow-500"></div> In Progress</span> <span>14%</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-red-500"></div> Overdue</span> <span>8%</span></div>
                </div>
              </div>
              <div className="mt-auto bg-red-500/10 border border-red-500/20 rounded-lg p-2 flex items-center justify-between">
                 <div className="flex items-center gap-1.5 text-red-400 text-[8px] font-semibold">
                    <ShieldAlert size={12} /> 12 trainings overdue
                 </div>
                 <button className="text-[7.2px] bg-red-500/20 px-2 py-0.5 rounded text-red-300">Review Now</button>
              </div>
           </div>
           
           {/* Certificates Earned */}
           <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold">Certificates Earned</h3>
                <span className="text-[7.2px] text-[#EB3158] cursor-pointer">View All</span>
              </div>
              <div className="flex-grow flex flex-col justify-center">
                 <div className="bg-gradient-to-br from-[#0d162f] to-[#0a1125] border border-yellow-500/30 rounded-xl p-3 flex items-center gap-3 relative shadow-[0_5px_15px_rgba(0,0,0,0.5)] cursor-pointer hover:border-yellow-500/50 transition">
                    <div className="w-14 h-10 bg-[#e2e8f0] rounded border-2 border-yellow-500 flex flex-col items-center justify-center p-1 relative overflow-hidden">
                       <div className="text-[3.2px] font-bold text-[#15172B] tracking-widest border-b border-slate-300 pb-0.5 mb-0.5 w-full text-center">CERTIFICATE</div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500 absolute bottom-1 right-1 flex items-center justify-center border border-yellow-600 shadow-sm"><span className="text-[3.2px] text-white">★</span></div>
                       <div className="w-8 h-[1px] bg-slate-400 absolute bottom-2 left-1"></div>
                       <div className="w-6 h-[1px] bg-slate-400 absolute bottom-1 left-1"></div>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] font-bold text-slate-200 leading-tight pr-4">Project Management Professional (PMP)</span>
                       <span className="text-[6.4px] text-[#15172B]/60 mt-1">May 18, 2025</span>
                    </div>
                    <ChevronRight size={14} className="text-[#15172B]/60 absolute right-2 top-1/2 -translate-y-1/2" />
                 </div>
                 <div className="text-center mt-3">
                    <span className="text-[8px] text-slate-400">You have earned <span className="font-bold text-yellow-400">12</span> certificates</span>
                 </div>
              </div>
           </div>

        </div>

        {/* Bottom Row: Continue Learning & Upcoming Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
           
           {/* Continue Learning */}
           <div className="lg:col-span-2 bg-[#0a1125] border border-white/5 rounded-2xl p-4">
              <h3 className="text-xs font-semibold mb-3">Continue Learning</h3>
              <div className="flex gap-4">
                 {[
                   { n: "AI for Everyone", sub: "Course • 12 Lessons", pct: 60, bg: "from-blue-600 to-indigo-600", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=200&auto=format&fit=crop" },
                   { n: "Business Ethics", sub: "Course • 8 Lessons", pct: 45, bg: "from-teal-600 to-emerald-600", img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=200&auto=format&fit=crop" },
                   { n: "Advanced Excel", sub: "Course • 15 Lessons", pct: 30, bg: "from-orange-600 to-red-600", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop" },
                   { n: "Customer Service Excellence", sub: "Course • 10 Lessons", pct: 80, bg: "from-purple-600 to-pink-600", img: "https://images.unsplash.com/photo-1556740749-887f6717d5e4?q=80&w=200&auto=format&fit=crop" },
                 ].map((c, i) => (
                    <div key={i} className="flex flex-col gap-2 w-1/4 cursor-pointer group">
                       <div className="relative h-14 rounded-lg overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition">
                          <img src={c.img} alt={c.n} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition flex items-center justify-center">
                             <PlayCircle size={16} className="text-white opacity-80" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                             <div className="h-full bg-[#EB3158]" style={{width: `${c.pct}%`}}></div>
                          </div>
                       </div>
                       <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                             <span className="text-[8px] font-semibold text-slate-200 leading-tight line-clamp-1">{c.n}</span>
                             <span className="text-[6.4px] text-[#15172B]/60">{c.sub}</span>
                          </div>
                          <span className="text-[6.4px] font-bold text-slate-300">{c.pct}%</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Upcoming Sessions */}
           <div className="lg:col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-semibold">Upcoming Sessions</h3>
                <span className="text-[7.2px] text-[#EB3158] cursor-pointer">View All</span>
              </div>
              <div className="flex flex-col gap-2">
                 {[
                   { n: "Live Class: Agile Methodologies", d: "May 24, 2025 | 10:00 AM", icon: <Video size={14}/>, c: "text-[#EB3158] bg-[#EB3158]/10" },
                   { n: "Webinar: Cybersecurity Best Practices", d: "May 27, 2025 | 02:00 PM", icon: <ShieldAlert size={14}/>, c: "text-purple-400 bg-purple-500/10" },
                   { n: "Workshop: Data Visualization with Power BI", d: "May 29, 2025 | 11:00 AM", icon: <BarChart3 size={14}/>, c: "text-green-400 bg-green-500/10" },
                 ].map((sess, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#0d162f]/50 p-2 rounded-xl border border-white/5">
                       <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${sess.c}`}>{sess.icon}</div>
                          <div className="flex flex-col">
                             <span className="text-[8px] font-semibold text-slate-200 leading-tight w-40 truncate">{sess.n}</span>
                             <span className="text-[6.4px] text-[#15172B]/60">{sess.d}</span>
                          </div>
                       </div>
                       <button className="bg-[#EB3158]/20 hover:bg-[#EB3158] text-[#EB3158] hover:text-white px-3 py-1 rounded border border-blue-500/30 transition text-[7.2px] font-bold">
                          Join
                       </button>
                    </div>
                 ))}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
