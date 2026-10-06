"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Building, Mail, Phone, Settings, ChevronRight, Briefcase } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const PRODUCT_ANSWERS: Record<string, string> = {
  "HRMS": "Our HRMS handles everything from recruitment and payroll to attendance, leave management, and employee records.",
  "CRM": "Our CRM helps you manage customers, leads, sales pipelines, and build lasting customer relationships.",
  "ERP": "Our ERP system integrates finance, inventory, procurement, and all core business operations into one seamless platform.",
  "Dealer Mgmt": "Our Dealer Management System helps you track dealers, orders, inventory, and optimize distributor performance.",
  "Vendor Mgmt": "Our Vendor Management System simplifies procurement, contracts, and purchase orders across all your suppliers.",
  "Marketing": "Our Marketing Automation platform lets you automate campaigns, email sequences, and customer engagement.",
  "Supply Chain": "Our Supply Chain & Logistics solution tracks inventory, warehouses, shipments, and optimizes logistics operations.",
  "Sales Force": "Our Sales Force Automation tool manages leads, quotations, field sales visits, and pipeline opportunities.",
  "LMS": "Our Learning Management System allows you to deliver online training, assessments, and certifications to your team.",
  "POS": "Our POS system provides fast billing, inventory synchronization, payments, and complete retail management.",
  "Queue Mgmt": "Our Queue Management System helps you manage audits, compliance, quality control, and inspections seamlessly.",
  "Document Mgmt": "Our Document Management System securely stores, organizes, and shares all your critical business documents."
};

const quickActions = Object.keys(PRODUCT_ANSWERS).map(key => ({ label: key }));

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Welcome to IT Softlab 360! Which of our 12 enterprise solutions would you like to explore?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lead Capture State
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "", company: "", email: "", phone: "", industry: "", requirement: ""
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showLeadForm]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    if (PRODUCT_ANSWERS[text]) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: PRODUCT_ANSWERS[text]
        }]);
      }, 600);
      return;
    }

    // Check if the user is asking to contact sales or request demo to show lead form
    if (text.toLowerCase().includes("contact sales") || text.toLowerCase().includes("request demo") || text.toLowerCase().includes("pricing")) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'd love to connect you with our team! Could you provide a few details so the right expert can reach out?"
        }]);
        setShowLeadForm(true);
      }, 1000);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await response.json();

      setIsTyping(false);
      if (data.success) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: "I'm having a little trouble connecting right now. Please try again or contact our support team." }]);
      }
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: "I'm currently offline. Please leave a message on our contact page." }]);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm)
      });

      if (response.ok) {
        setShowLeadForm(false);
        setLeadSubmitted(true);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: "Thank you! Your information has been securely received. One of our solution experts will contact you shortly."
        }]);
      }
    } catch (error) {
      console.error("Failed to submit lead", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white/95  backdrop-blur-xl border border-blue-200  rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.1)]  mb-4 w-[280px] sm:w-[320px] h-[480px] max-h-[80vh] flex flex-col overflow-hidden relative transition-colors"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 flex items-center justify-between border-b border-blue-500/30 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[24px] rounded-full pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <img src="/logo.png" alt="ITSoftlab360 Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">IT SOFTLAB Advisor</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-blue-200">Online 24/7</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-200 hover:text-white transition-colors p-1 relative z-10 bg-black/20 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed transition-colors ${msg.role === 'user'
                    ? 'bg-[#EB3158] text-white rounded-tr-sm'
                    : 'bg-gray-100  text-[#15172B]  border border-[#111A4A]/10  rounded-tl-sm'
                    }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Quick Actions (only show if no lead form and just 1 message) */}
              {messages.length === 1 && !showLeadForm && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(action.label)}
                      className="flex items-center gap-1.5 text-xs bg-blue-50 hover:bg-blue-100   border border-blue-200  text-[#EB3158] hover:text-blue-700   px-3 py-1.5 rounded-full transition-all"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Lead Capture Form */}
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50  border border-blue-200  rounded-xl p-4 text-sm transition-colors"
                >
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <input required type="text" placeholder="Your Name" value={leadForm.name} onChange={e => setLeadForm({ ...leadForm, name: e.target.value })} className="w-full bg-white  border border-[#111A4A]/10  focus:border-blue-400  rounded-lg px-3 py-2 text-[#111A4A]  outline-none text-xs transition-colors" />
                    <input required type="email" placeholder="Work Email" value={leadForm.email} onChange={e => setLeadForm({ ...leadForm, email: e.target.value })} className="w-full bg-white  border border-[#111A4A]/10  focus:border-blue-400  rounded-lg px-3 py-2 text-[#111A4A]  outline-none text-xs transition-colors" />
                    <input required type="text" placeholder="Company Name" value={leadForm.company} onChange={e => setLeadForm({ ...leadForm, company: e.target.value })} className="w-full bg-white  border border-[#111A4A]/10  focus:border-blue-400  rounded-lg px-3 py-2 text-[#111A4A]  outline-none text-xs transition-colors" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Industry" value={leadForm.industry} onChange={e => setLeadForm({ ...leadForm, industry: e.target.value })} className="w-full bg-white  border border-[#111A4A]/10  focus:border-blue-400  rounded-lg px-3 py-2 text-[#111A4A]  outline-none text-xs transition-colors" />
                      <input type="tel" placeholder="Phone" value={leadForm.phone} onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })} className="w-full bg-white  border border-[#111A4A]/10  focus:border-blue-400  rounded-lg px-3 py-2 text-[#111A4A]  outline-none text-xs transition-colors" />
                    </div>
                    <button type="submit" className="w-full bg-[#EB3158] hover:bg-[#EB3158] text-white rounded-lg py-2 font-medium transition-colors mt-2 text-xs">
                      Submit Details
                    </button>
                  </form>
                </motion.div>
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100  border border-[#111A4A]/10  rounded-2xl rounded-tl-sm p-3.5 flex gap-1 transition-colors">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {!showLeadForm && !leadSubmitted && (
              <div className="p-3 border-t border-[#111A4A]/10  bg-gray-50  transition-colors">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-white  border border-[#111A4A]/10  focus:border-blue-400  rounded-full pl-4 pr-12 py-2.5 text-sm text-[#111A4A]  outline-none transition-colors placeholder:text-gray-400 "
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="absolute right-1.5 w-8 h-8 bg-[#EB3158] hover:bg-[#EB3158] disabled:bg-gray-700 disabled:text-[#15172B]/60 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Send size={14} className="ml-0.5" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90  backdrop-blur-md text-[#15172B]  text-xs px-4 py-2 rounded-full mb-3 shadow-[0_0_15px_rgba(59,130,246,0.15)]  border border-blue-200  mr-2 flex items-center gap-2 transition-colors"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Need Help? Chat with us
        </motion.div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all group relative"
      >
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform origin-center"></div>
        {isOpen ? <X size={24} className="relative z-10" /> : <MessageSquare size={24} className="relative z-10" />}
      </button>
    </div>
  );
}
