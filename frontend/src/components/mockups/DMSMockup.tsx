import React from "react";
import { 
  FolderOpen, Users, Lock, Cloud, Share2, ClipboardList, History, Search,
  Settings, Bell, Calendar, TrendingUp, TrendingDown, CheckCircle2,
  XCircle, Clock, UploadCloud, ShieldCheck, FileText, Check, Shield,
  File, FileSpreadsheet, Image, Archive, Network, Upload, Send, FileCheck,
  Server, HardDrive
} from "lucide-react";

export default function DMSMockup({ solution }: { solution: { id: string, title: string, short: string, desc: string, icon: React.ReactNode, color: string, bg: string } }) {
  return (
    <div className="flex h-full min-h-[512px] text-white bg-[#030816] rounded-3xl p-5 flex-col lg:flex-row gap-5 relative overflow-hidden">
      
      {/* Left Sidebar */}
      <div className="w-64 bg-[#0a1125] border border-white/5 p-5 flex flex-col gap-4 rounded-2xl relative overflow-hidden z-10 shrink-0">
        <div className="flex flex-col gap-2 mb-2 pt-2 z-10">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-500 border border-indigo-500/30">
            <FolderOpen size={28} />
          </div>
          <h2 className="text-xl font-bold mt-2 leading-tight">DOCUMENT<br/><span className="text-indigo-400">MANAGEMENT<br/>SYSTEM</span></h2>
        </div>
        <p className="text-[8.8px] text-slate-400 mb-2 z-10">Store, organize, share, and secure documents.</p>
        
        {/* Navigation Menu */}
        <div className="flex flex-col gap-1 z-10 text-[8px]">
           {[
             { label: "Dashboard", icon: <Network size={12}/>, active: true },
             { label: "Documents", icon: <FileText size={12}/>, active: false },
             { label: "Folders", icon: <FolderOpen size={12}/>, active: false },
             { label: "Shared Files", icon: <Share2 size={12}/>, active: false },
             { label: "Approvals", icon: <ClipboardList size={12}/>, active: false },
             { label: "Version Control", icon: <History size={12}/>, active: false },
             { label: "Permissions", icon: <Lock size={12}/>, active: false },
             { label: "Audit Trail", icon: <ShieldCheck size={12}/>, active: false },
             { label: "Search", icon: <Search size={12}/>, active: false },
             { label: "Settings", icon: <Settings size={12}/>, active: false },
           ].map((item, i) => (
             <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
               {item.icon}
               <span className="font-medium">{item.label}</span>
             </div>
           ))}
        </div>

        {/* Smart Folder Structure */}
        <div className="mt-4 pt-4 border-t border-white/10 z-10 flex-grow">
           <h3 className="text-[8px] font-semibold mb-3">Smart Folder Structure</h3>
           <div className="flex flex-col gap-1.5 text-[7.2px] text-slate-400 pl-2">
              <div className="flex justify-between hover:text-indigo-400 cursor-pointer transition"><span className="flex items-center gap-1"><FolderOpen size={10} className="text-[#EB3158]"/> Company Documents</span> <span>2,145</span></div>
              <div className="flex justify-between hover:text-indigo-400 cursor-pointer transition ml-4"><span className="flex items-center gap-1"><FolderOpen size={10} className="text-cyan-500"/> Finance</span> <span>356</span></div>
              <div className="flex justify-between hover:text-indigo-400 cursor-pointer transition ml-4"><span className="flex items-center gap-1"><FolderOpen size={10} className="text-orange-500"/> HR</span> <span>542</span></div>
              <div className="flex justify-between hover:text-indigo-400 cursor-pointer transition ml-4"><span className="flex items-center gap-1"><FolderOpen size={10} className="text-purple-500"/> Legal</span> <span>284</span></div>
              <div className="flex justify-between hover:text-indigo-400 cursor-pointer transition ml-4"><span className="flex items-center gap-1"><FolderOpen size={10} className="text-green-500"/> Projects</span> <span>1,024</span></div>
              <div className="flex justify-between hover:text-indigo-400 cursor-pointer transition ml-4"><span className="flex items-center gap-1"><FolderOpen size={10} className="text-pink-500"/> Contracts</span> <span>318</span></div>
              <div className="flex justify-between hover:text-indigo-400 cursor-pointer transition ml-4"><span className="flex items-center gap-1"><FolderOpen size={10} className="text-yellow-500"/> Reports</span> <span>421</span></div>
              <div className="flex justify-between hover:text-indigo-400 cursor-pointer transition ml-4"><span className="flex items-center gap-1"><FolderOpen size={10} className="text-[#15172B]/60"/> Archive</span> <span>1,205</span></div>
           </div>
        </div>

        {/* Bottom Graphic */}
        <div className="mt-auto h-24 relative flex items-end justify-center z-10 pt-4">
           {/* Abstract Glow */}
           <div className="absolute w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl bottom-[-16px] left-0"></div>
           <div className="relative w-full h-full flex items-end z-20">
              <div className="relative">
                 <div className="w-16 h-12 bg-blue-800 rounded-t-lg rounded-br-lg absolute bottom-0 left-0 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] transform -skew-x-12"></div>
                 <div className="w-16 h-12 bg-indigo-700 rounded-t-lg rounded-br-lg absolute bottom-0 left-4 border border-indigo-400/50 shadow-[0_0_15px_rgba(79,70,229,0.4)]"></div>
                 <div className="w-16 h-12 bg-[#EB3158] rounded-t-lg rounded-br-lg absolute bottom-0 left-8 border border-blue-400/80 shadow-[0_0_20px_rgba(37,99,235,0.6)] flex items-center justify-center transform skew-x-6">
                    <Shield size={16} className="text-white drop-shadow-md" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col gap-4 z-10 overflow-y-auto pr-1 custom-scrollbar">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0a1125] p-3 rounded-2xl border border-white/5">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
               <FolderOpen size={20} />
             </div>
             <div>
               <h2 className="text-lg font-bold">Document Management System</h2>
               <p className="text-[8.8px] text-slate-400">Store, organize, share, and secure documents.</p>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-[#0d162f] border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-300">
               This Month <Calendar size={12} />
             </div>
             <button className="w-8 h-8 rounded-lg bg-[#0d162f] flex items-center justify-center border border-white/10 relative">
               <Bell size={14} className="text-slate-300" />
               <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"></span>
             </button>
             <div className="flex items-center gap-2 pl-2">
               <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                  <img src="https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff" alt="User" />
               </div>
               <div className="text-left text-[8px] hidden md:block pr-2">
                 <div className="font-semibold text-slate-200">Admin User</div>
                 <div className="text-[#15172B]/60">System Administrator</div>
               </div>
             </div>
           </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {[
            { label: "Total Documents", val: "24,589", trend: "↑ 18.4%", c: "text-[#EB3158]", icon: <FileText size={16}/>, up: true },
            { label: "Shared Files", val: "3,412", trend: "↑ 22.7%", c: "text-purple-400", icon: <Share2 size={16}/>, up: true },
            { label: "Secure Folders", val: "1,256", trend: "↑ 12.1%", c: "text-green-400", icon: <FolderOpen size={16}/>, up: true },
            { label: "Storage Used", val: "685.4 GB", trend: "↑ 14.3%", c: "text-cyan-400", icon: <Cloud size={16}/>, up: true },
            { label: "Pending Approvals", val: "48", trend: "↓ 8.5%", c: "text-red-400", icon: <Clock size={16}/>, up: false },
            { label: "Access Requests", val: "27", trend: "↑ 37.2%", c: "text-green-400", icon: <Users size={16}/>, up: true },
          ].map((kpi, i) => (
             <div key={i} className="bg-[#0a1125] border border-white/5 rounded-xl p-3 flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-1">
                 <div className={`p-1.5 rounded-lg bg-[#0d162f] border border-white/5 ${kpi.c}`}>{kpi.icon}</div>
                 <div className="text-[7.2px] text-slate-400">{kpi.label}</div>
               </div>
               <div className="flex items-end justify-between px-1">
                  <div className="text-lg font-bold text-slate-200 leading-tight">{kpi.val}</div>
                  <div className={`text-[6.4px] font-semibold flex items-center gap-1 ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
                     {kpi.trend} <span className="text-[#15172B]/60 font-normal hidden xl:inline">vs Apr 2025</span>
                  </div>
               </div>
             </div>
          ))}
        </div>

        {/* Row 1: Document Lifecycle & Storage Usage */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 h-[144px]">
           {/* Document Lifecycle */}
           <div className="xl:col-span-2 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col relative overflow-hidden">
              <h3 className="text-[8.8px] font-semibold mb-6">Document Lifecycle</h3>
              <div className="flex justify-between items-center relative px-4 flex-grow">
                 {/* Connecting Line */}
                 <div className="absolute top-[35%] left-10 right-10 h-0.5 bg-slate-700 -translate-y-1/2 z-0">
                    <div className="h-full bg-indigo-500 w-[60%]"></div>
                 </div>
                 
                 {[
                   { n: "Upload", sub: "Uploading...\n78%", icon: <UploadCloud size={16}/>, c: "text-[#EB3158] bg-[#0d162f] border-[#EB3158]/50 shadow-[0_0_10px_rgba(59,130,246,0.6)]" },
                   { n: "Organize", sub: "Categorizing...\n124 files", icon: <FolderOpen size={16}/>, c: "text-cyan-400 bg-[#0d162f] border-cyan-500" },
                   { n: "Review", sub: "In Review\n16 files", icon: <FileCheck size={16}/>, c: "text-purple-400 bg-[#0d162f] border-purple-500" },
                   { n: "Approve", sub: "Pending\n8 files", icon: <ShieldCheck size={16}/>, c: "text-pink-400 bg-[#0d162f] border-pink-500" },
                   { n: "Share", sub: "Sharing...\n5 recipients", icon: <Send size={16}/>, c: "text-green-400 bg-[#0d162f] border-green-500" },
                   { n: "Secure Archive", sub: "Archived\nToday: 32 files", icon: <Archive size={16}/>, c: "text-slate-400 bg-[#0d162f] border-slate-500 border-dashed" },
                 ].map((step, i) => (
                   <div key={i} className="flex flex-col items-center z-10 w-16 text-center">
                      <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center mb-2 ${step.c}`}>
                         {step.icon}
                      </div>
                      <div className={`text-[7.2px] font-bold ${i < 5 ? 'text-white' : 'text-slate-400'}`}>{step.n}</div>
                      <div className="text-[5.6px] text-slate-400 whitespace-pre-line leading-tight mt-1">{step.sub}</div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Storage Usage */}
           <div className="xl:col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <h3 className="text-[8.8px] font-semibold mb-1">Storage Usage</h3>
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex items-center justify-between">
                   <div className="relative w-24 h-24">
                     <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="12" />
                       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251" strokeDashoffset="114" />
                       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="251" strokeDashoffset="180" />
                       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251" strokeDashoffset="215" />
                       <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ec4899" strokeWidth="12" strokeDasharray="251" strokeDashoffset="240" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-sm font-bold">685.4 <span className="text-[8px]">GB</span></span>
                       <span className="text-[5.6px] text-slate-400">of 1 TB</span>
                     </div>
                   </div>
                   <div className="flex flex-col gap-1.5 text-[6.4px] flex-grow pl-3">
                      <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-[#EB3158]"></div> Documents</span> <span className="text-right">312.6 GB (45.6%)</span></div>
                      <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-green-500"></div> Archives</span> <span className="text-right">182.3 GB (26.6%)</span></div>
                      <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-yellow-500"></div> Shared Files</span> <span className="text-right">98.7 GB (14.4%)</span></div>
                      <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-pink-500"></div> Backups</span> <span className="text-right">61.2 GB (8.9%)</span></div>
                      <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-purple-500"></div> Others</span> <span className="text-right">30.6 GB (4.5%)</span></div>
                   </div>
                </div>
                <div className="flex justify-between items-center text-[6.4px] mt-3 pt-2 border-t border-white/5">
                   <span className="text-green-400 font-bold">68.5% Used</span>
                   <span className="text-slate-400">314.6 GB Free</span>
                </div>
              </div>
           </div>

           {/* Secure Sharing Card */}
           <div className="xl:col-span-1 bg-gradient-to-b from-[#0d162f] to-[#0a1125] border border-indigo-500/30 rounded-2xl p-4 flex flex-col relative overflow-hidden">
              <h3 className="text-[8.8px] font-semibold mb-2 text-indigo-100">Secure Sharing<br/>& Compliance</h3>
              
              <div className="absolute top-2 right-2 w-16 h-16 opacity-30 pointer-events-none">
                 <Cloud size={64} className="text-indigo-400 absolute top-0 right-0" />
                 <Lock size={20} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              
              <div className="flex-grow flex flex-col gap-2.5 text-[6.4px] text-indigo-200/80 mt-8 relative z-10">
                 <div className="flex items-start gap-1.5">
                    <CheckCircle2 size={10} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>Share files securely with role-based access</span>
                 </div>
                 <div className="flex items-start gap-1.5">
                    <CheckCircle2 size={10} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>Encrypted transfers & watermarked downloads</span>
                 </div>
                 <div className="flex items-start gap-1.5">
                    <CheckCircle2 size={10} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>Cloud archive with automated retention</span>
                 </div>
                 <div className="flex items-start gap-1.5">
                    <CheckCircle2 size={10} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>Compliance with global regulations</span>
                 </div>
              </div>
              <button className="w-full mt-3 py-1.5 rounded bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/50 text-indigo-300 text-[6.4px] transition flex justify-center items-center gap-1">
                 Explore Security Center →
              </button>
           </div>
        </div>

        {/* Row 2: Document Activity, Document Types, Permissions Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 h-[144px]">
           {/* Document Activity Line Chart */}
           <div className="xl:col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[8.8px] font-semibold">Document Activity</h3>
                <select className="bg-transparent text-[6.4px] text-slate-400 outline-none"><option>This Month</option></select>
              </div>
              <div className="flex-grow relative mt-2">
                <div className="absolute inset-0 z-10">
                  {/* Uploads Line */}
                  <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path d="M0,35 L10,30 L20,40 L30,25 L40,30 L50,15 L60,20 L70,35 L80,25 L90,10 L100,20" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_2px_4px_rgba(59,130,246,0.5)]" />
                    {/* Downloads Line */}
                    <path d="M0,45 L10,40 L20,45 L30,35 L40,40 L50,30 L60,35 L70,45 L80,35 L90,20 L100,30" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="2 1" />
                    {/* Point */}
                    <circle cx="50" cy="15" r="2" fill="#fff" stroke="#3b82f6" strokeWidth="1" />
                  </svg>
                </div>
                <div className="absolute top-[20%] left-[50%] bg-[#0d162f]/90 p-1 rounded text-[5.6px] border border-blue-500/30 z-20 shadow-lg backdrop-blur">
                   <div className="font-bold text-slate-200 border-b border-white/10 pb-0.5 mb-0.5">May 16, 2025</div>
                   <div className="flex justify-between gap-3 text-[#EB3158]"><span>• Uploaded:</span> <span>842</span></div>
                   <div className="flex justify-between gap-3 text-sky-400"><span>• Downloaded:</span> <span>532</span></div>
                   <div className="flex justify-between gap-3 text-purple-400"><span>• Shared:</span> <span>214</span></div>
                </div>
                <div className="absolute left-0 top-0 bottom-4 w-5 flex flex-col justify-between text-[4.8px] text-[#15172B]/60 items-end pr-1">
                  <span>1K</span><span>750</span><span>500</span><span>250</span><span>0</span>
                </div>
                <div className="absolute bottom-0 left-5 right-0 flex justify-between text-[4.8px] text-[#15172B]/60">
                  <span>May 01</span><span>May 06</span><span>May 11</span><span>May 16</span><span>May 21</span><span>May 26</span><span>May 31</span>
                </div>
              </div>
           </div>

           {/* Document Types Donut */}
           <div className="xl:col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-[8.8px] font-semibold">Document Types</h3>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="251" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray="150 251" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="16" strokeDasharray="98 251" strokeDashoffset="-150" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="63 251" strokeDashoffset="-248" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold">24,589</span>
                    <span className="text-[5.6px] text-slate-400">Total Files</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-[6.4px] flex-grow pl-3">
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-red-500"></div> PDF</span> <span>9,856 (40.1%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-[#EB3158]"></div> DOC/DOCX</span> <span>5,214 (21.2%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-green-500"></div> XLS/XLSX</span> <span>3,256 (13.2%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-yellow-500"></div> PPT/PPTX</span> <span>2,145 (8.7%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-purple-500"></div> Images</span> <span>1,942 (7.9%)</span></div>
                   <div className="flex justify-between w-full"><span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-slate-500"></div> Others</span> <span>920 (3.8%)</span></div>
                </div>
              </div>
           </div>

           {/* Permissions Matrix */}
           <div className="xl:col-span-2 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-[8.8px] font-semibold mb-3">Permissions Matrix</h3>
              <div className="flex-grow overflow-x-auto custom-scrollbar">
                 <table className="w-full text-left text-[7.2px]">
                    <thead>
                       <tr className="text-slate-400 border-b border-white/10">
                          <th className="pb-2 font-medium w-1/4">Role</th>
                          <th className="pb-2 font-medium text-center">View</th>
                          <th className="pb-2 font-medium text-center">Comment</th>
                          <th className="pb-2 font-medium text-center">Edit</th>
                          <th className="pb-2 font-medium text-center">Share</th>
                          <th className="pb-2 font-medium text-center">Delete</th>
                          <th className="pb-2 font-medium text-center">Admin</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {[
                         { r: "Administrator", p: [1,1,1,1,1,1] },
                         { r: "Manager", p: [1,1,1,1,0,0] },
                         { r: "Editor", p: [1,1,1,0,0,0] },
                         { r: "Viewer", p: [1,0,0,0,0,0] },
                         { r: "Guest", p: [1,0,0,0,0,0] },
                       ].map((row, i) => (
                         <tr key={i} className="hover:bg-white/5 transition">
                            <td className="py-2 text-slate-200 font-medium">{row.r}</td>
                            {row.p.map((allowed, j) => (
                               <td key={j} className="py-2 text-center">
                                  {allowed ? (
                                    <div className="w-4 h-4 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto text-green-400">
                                       <Check size={10} />
                                    </div>
                                  ) : (
                                    <div className="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
                                       <XCircle size={10} />
                                    </div>
                                  )}
                               </td>
                            ))}
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Row 3: Lists & Compliance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-[160px]">
           
           {/* Recent Documents & Approval Workflow */}
           <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recent Documents */}
              <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
                 <div className="flex justify-between items-center mb-3">
                   <h3 className="text-[8.8px] font-semibold">Recent Documents</h3>
                   <span className="text-[6.4px] text-indigo-400 cursor-pointer">View All</span>
                 </div>
                 <div className="flex flex-col gap-2 text-[6.4px]">
                    <div className="flex text-[#15172B]/60 border-b border-white/10 pb-1 mb-1">
                       <div className="w-2/5">Document Name</div>
                       <div className="w-1/5">Owner</div>
                       <div className="w-1/5 text-center">Status</div>
                       <div className="w-1/5 text-right">Last Modified</div>
                    </div>
                    {[
                      { n: "Q2 Financial Report.pdf", o: "Jane Cooper", s: "Approved", sc: "text-green-400 border-green-400 bg-green-400/10", d: "May 31, 2025", i: <FileText size={10} className="text-red-400"/> },
                      { n: "Employee Handbook.docx", o: "John Smith", s: "In Review", sc: "text-yellow-400 border-yellow-400 bg-yellow-400/10", d: "May 30, 2025", i: <File size={10} className="text-[#EB3158]"/> },
                      { n: "Project Proposal.xlsx", o: "Robert Fox", s: "Shared", sc: "text-purple-400 border-purple-400 bg-purple-400/10", d: "May 28, 2025", i: <FileSpreadsheet size={10} className="text-green-400"/> },
                      { n: "Vendor Agreement.pdf", o: "Cameron Williamson", s: "Approved", sc: "text-green-400 border-green-400 bg-green-400/10", d: "May 27, 2025", i: <FileText size={10} className="text-red-400"/> },
                      { n: "Marketing Strategy.pptx", o: "Brooklyn Simmons", s: "In Review", sc: "text-yellow-400 border-yellow-400 bg-yellow-400/10", d: "May 27, 2025", i: <File size={10} className="text-orange-400"/> },
                      { n: "Sales Data - May.xlsx", o: "Leslie Alexander", s: "Archived", sc: "text-slate-400 border-slate-400 bg-slate-400/10", d: "May 26, 2025", i: <FileSpreadsheet size={10} className="text-green-400"/> },
                    ].map((doc, i) => (
                       <div key={i} className="flex items-center hover:bg-white/5 p-1 rounded transition cursor-pointer">
                          <div className="w-2/5 flex items-center gap-1.5 font-medium text-slate-200 truncate pr-2">
                             {doc.i} <span className="truncate">{doc.n}</span>
                          </div>
                          <div className="w-1/5 truncate pr-2">{doc.o}</div>
                          <div className="w-1/5 flex justify-center">
                             <span className={`px-1.5 py-0.5 rounded-full border text-[5.6px] ${doc.sc}`}>{doc.s}</span>
                          </div>
                          <div className="w-1/5 text-right text-[#15172B]/60">{doc.d}</div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Approval Workflow */}
              <div className="bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
                 <div className="flex justify-between items-center mb-3">
                   <h3 className="text-[8.8px] font-semibold">Approval Workflow</h3>
                   <span className="text-[6.4px] text-indigo-400 cursor-pointer">View All</span>
                 </div>
                 <div className="flex flex-col gap-2.5 flex-grow justify-center">
                    {[
                      { n: "Vendor Contract Agreement.pdf", req: "Requested by Robert Fox", status: "3 Pending", btn: "text-purple-400 border-purple-500 bg-purple-500/10", avatars: 3 },
                      { n: "HR Policy Update.docx", req: "Requested by Jane Cooper", status: "1 Pending", btn: "text-[#EB3158] border-[#EB3158]/50 bg-[#EB3158]/10", avatars: 2 },
                      { n: "Q2 Budget Plan.xlsx", req: "Requested by Cameron Williamson", status: "Approved", btn: "text-green-400 border-green-500 bg-green-500/10", avatars: 4 },
                      { n: "IT Security Guidelines.pdf", req: "Requested by John Smith", status: "In Review", btn: "text-yellow-400 border-yellow-500 bg-yellow-500/10", avatars: 2 },
                    ].map((wf, i) => (
                       <div key={i} className="flex justify-between items-center bg-[#0d162f]/50 p-2 rounded-xl border border-white/5 hover:border-indigo-500/30 transition cursor-pointer">
                          <div className="flex flex-col w-[50%]">
                             <span className="text-[7.2px] font-semibold text-slate-200 truncate">{wf.n}</span>
                             <span className="text-[5.6px] text-[#15172B]/60 truncate">{wf.req}</span>
                          </div>
                          <div className="flex -space-x-2">
                             {[...Array(wf.avatars)].map((_, j) => (
                                <div key={j} className="w-5 h-5 rounded-full border border-[#0d162f] bg-slate-700 overflow-hidden">
                                   <img src={`https://ui-avatars.com/api/?name=U${j}&background=random&color=fff&size=20`} alt="Avatar"/>
                                </div>
                             ))}
                          </div>
                          <div className={`px-2 py-1 rounded text-[5.6px] border font-semibold ${wf.btn}`}>
                             {wf.status}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Security & Compliance & Audit Trail */}
           <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Security & Compliance */}
              <div className="md:col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
                 <div className="flex justify-between items-center mb-3">
                   <h3 className="text-[8.8px] font-semibold">Security & Compliance</h3>
                   <span className="text-[6.4px] text-indigo-400 cursor-pointer">View All</span>
                 </div>
                 <div className="flex flex-col gap-2.5 text-[6.4px]">
                    {[
                      { t: "Encryption", sub: "All files encrypted at rest & in transit", icon: <Lock size={12}/>, c: "text-indigo-400 bg-indigo-500/10", s: "Active", sc: "text-green-400" },
                      { t: "Access Control", sub: "Role-based access enabled", icon: <Users size={12}/>, c: "text-[#EB3158] bg-[#EB3158]/10", s: "Active", sc: "text-green-400" },
                      { t: "Automated Backup", sub: "Last backup: May 31, 2025 02:15 AM", icon: <Server size={12}/>, c: "text-cyan-400 bg-cyan-500/10", s: "Active", sc: "text-green-400" },
                      { t: "Audit Logs", sub: "12,458 events logged this month", icon: <History size={12}/>, c: "text-purple-400 bg-purple-500/10", s: "Active", sc: "text-green-400" },
                      { t: "Retention Policy", sub: "7 policies active • Next run: Jun 01", icon: <HardDrive size={12}/>, c: "text-orange-400 bg-orange-500/10", s: "Active", sc: "text-green-400" },
                    ].map((sec, i) => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <div className={`p-1.5 rounded-lg border border-white/5 ${sec.c}`}>{sec.icon}</div>
                             <div className="flex flex-col w-32">
                                <span className="font-semibold text-slate-200 truncate">{sec.t}</span>
                                <span className="text-[5.2px] text-[#15172B]/60 truncate">{sec.sub}</span>
                             </div>
                          </div>
                          <span className={`font-semibold ${sec.sc}`}>{sec.s}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Audit Trail (Recent Activity) */}
              <div className="md:col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
                 <div className="flex justify-between items-center mb-3">
                   <h3 className="text-[8.8px] font-semibold">Audit Trail (Recent Activity)</h3>
                   <span className="text-[6.4px] text-indigo-400 cursor-pointer">View All</span>
                 </div>
                 <div className="flex flex-col gap-3 relative pl-3 text-[6.4px]">
                    <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-slate-800"></div>
                    {[
                      { msg: "Jane Cooper uploaded Q2 Report.pdf", time: "May 31, 2025 10:45 AM", icon: <Upload size={8}/>, c: "text-[#EB3158] bg-[#0d162f] border-[#EB3158]/50" },
                      { msg: "Robert Fox shared Vendor List.xlsx", time: "May 31, 2025 09:32 AM", icon: <Share2 size={8}/>, c: "text-purple-400 bg-[#0d162f] border-purple-500" },
                      { msg: "John Smith approved HR Policy.docx", time: "May 30, 2025 04:15 PM", icon: <CheckCircle2 size={8}/>, c: "text-green-400 bg-[#0d162f] border-green-500" },
                      { msg: "Leslie Alexander deleted Old File.docx", time: "May 30, 2025 02:50 PM", icon: <XCircle size={8}/>, c: "text-red-400 bg-[#0d162f] border-red-500" },
                      { msg: "Brooklyn Simmons requested access", time: "May 30, 2025 11:23 AM", icon: <Lock size={8}/>, c: "text-orange-400 bg-[#0d162f] border-orange-500" },
                    ].map((log, i) => (
                       <div key={i} className="flex flex-col relative pl-3">
                          <div className={`absolute -left-2.5 top-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${log.c} z-10 shadow-md`}>
                            {log.icon}
                          </div>
                          <span className="text-slate-200 font-medium leading-tight">{log.msg}</span>
                          <span className="text-[#15172B]/60 text-[5.6px]">{log.time}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Compliance Overview Card */}
              <div className="md:col-span-1 bg-[#0a1125] border border-white/5 rounded-2xl p-4 flex flex-col">
                 <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck size={16} className="text-indigo-400" />
                    <h3 className="text-[8.8px] font-semibold">Compliance Overview</h3>
                 </div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-500 flex items-center justify-center text-indigo-400 bg-indigo-500/10">
                       <CheckCircle2 size={24} />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-2xl font-bold text-white leading-tight">98.6%</span>
                       <span className="text-[7.2px] text-slate-400">Compliant Score</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-2.5 flex-grow justify-center text-[7.2px]">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                       <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-green-500"></div> GDPR Compliance</span>
                       <span className="text-green-400 font-semibold">Compliant</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                       <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-green-500"></div> ISO 27001</span>
                       <span className="text-green-400 font-semibold">Compliant</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                       <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-green-500"></div> SOC 2 Type II</span>
                       <span className="text-green-400 font-semibold">Compliant</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-green-500"></div> Data Retention</span>
                       <span className="text-green-400 font-semibold">Compliant</span>
                    </div>
                 </div>
                 <button className="w-full mt-4 py-1.5 rounded bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/50 text-indigo-300 text-[7.2px] transition">
                    View Compliance Center
                 </button>
              </div>
           </div>
        </div>

        {/* Bottom Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-auto pb-1">
           {[
             { label: "Upload File", sub: "Drag & drop or browse", icon: <UploadCloud size={16}/>, c: "text-[#EB3158] bg-[#EB3158]/10 border-blue-500/20" },
             { label: "Create Folder", sub: "Organize documents", icon: <FolderOpen size={16}/>, c: "text-green-400 bg-green-500/10 border-green-500/20" },
             { label: "Share Securely", sub: "Share with protection", icon: <Share2 size={16}/>, c: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
             { label: "Request Approval", sub: "Start approval flow", icon: <ClipboardList size={16}/>, c: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
             { label: "Set Permission", sub: "Manage access rights", icon: <Lock size={16}/>, c: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
           ].map((card, i) => (
              <div key={i} className="bg-[#0a1125] border border-white/5 rounded-xl p-2.5 flex items-center justify-between cursor-pointer hover:bg-[#15234b] transition group">
                 <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg border ${card.c}`}>
                      {card.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7.2px] font-bold text-slate-200 leading-tight">{card.label}</span>
                      <span className="text-[5.6px] text-[#15172B]/60">{card.sub}</span>
                    </div>
                 </div>
              </div>
           ))}
        </div>

      </div>
    </div>
  );
}
