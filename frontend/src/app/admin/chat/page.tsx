"use client";

import { useEffect, useState } from "react";
import { Users, Mail, Building, Phone, Calendar, Search } from "lucide-react";

type ChatLead = {
  id: number;
  name: string;
  email: string;
  company: string;
  industry: string;
  phone: string;
  created_at: string;
};

export default function AdminChatDashboard() {
  const [leads, setLeads] = useState<ChatLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/leads")
      .then(res => res.json())
      .then(data => {
        setLeads(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(search.toLowerCase()) || 
    lead.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen relative flex flex-col pt-20">
            
      <div className="flex-grow container mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111A4A]  mb-2 transition-colors">Chatbot Leads Dashboard</h1>
            <p className="text-[#15172B]/80  transition-colors">Monitor and manage leads captured by the AI Assistant.</p>
          </div>
          
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#15172B]/60  transition-colors">
               <Search size={16} />
             </div>
             <input 
               type="text" 
               placeholder="Search leads..." 
               value={search}
               onChange={e => setSearch(e.target.value)}
               className="bg-white  border border-[#111A4A]/10  focus:border-blue-400  rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#111A4A]  outline-none w-full md:w-64 transition-colors"
             />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white/80  border border-[#111A4A]/10  rounded-2xl p-12 text-center shadow-sm  transition-colors">
            <Users size={48} className="text-slate-400  mx-auto mb-4 transition-colors" />
            <h3 className="text-xl font-bold text-[#111A4A]  mb-2 transition-colors">No leads found</h3>
            <p className="text-[#15172B]/80  transition-colors">The AI assistant hasn't captured any leads matching your criteria yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map(lead => (
              <div key={lead.id} className="bg-white/90  backdrop-blur-sm border border-blue-200  rounded-2xl p-6 hover:border-blue-400  transition-colors shadow-sm ">
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-[#111A4A]/10  transition-colors">
                   <div>
                     <h3 className="text-lg font-bold text-[#15172B]  mb-1 transition-colors">{lead.name}</h3>
                     <p className="text-sm text-[#EB3158]  flex items-center gap-1.5 transition-colors"><Building size={14}/> {lead.company}</p>
                   </div>
                   <span className="text-xs font-medium px-2.5 py-1 bg-blue-50  text-[#EB3158]  rounded-full border border-blue-200  transition-colors">
                     New Lead
                   </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-700  transition-colors">
                    <Mail size={16} className="text-[#15172B]/60  transition-colors" />
                    <a href={`mailto:${lead.email}`} className="hover:text-[#EB3158]  transition-colors">{lead.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700  transition-colors">
                    <Phone size={16} className="text-[#15172B]/60  transition-colors" />
                    <span>{lead.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700  transition-colors">
                    <BriefcaseIcon className="text-[#15172B]/60  transition-colors" />
                    <span>{lead.industry || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#15172B]/60  pt-2 transition-colors">
                    <Calendar size={14} />
                    <span>{new Date(lead.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Global decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[96px] translate-x-1/3 -translate-y-1/3"></div>
      </div>
    </main>
  );
}

// Quick inline icon component to avoid import error
function BriefcaseIcon({className}: {className?: string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}
