"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Building, Mail, Phone, Settings, ChevronRight, Briefcase } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickActions = [
  { label: "For Franchise", icon: <Settings size={14} /> },
  { label: "Request Demo", icon: <ChevronRight size={14} /> },
  { label: "Pricing", icon: <Briefcase size={14} /> },
  { label: "Contact Sales", icon: <Phone size={14} /> },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! 👋 I'm your Intelligent Business Solution Advisor for IT SOFTLAB 360. How can I help you transform your business today?",
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
            className="bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border border-blue-200 dark:border-blue-500/30 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.1)] dark:shadow-[0_0_40px_rgba(37,99,235,0.2)] mb-4 w-[280px] sm:w-[320px] h-[480px] max-h-[80vh] flex flex-col overflow-hidden relative transition-colors"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 flex items-center justify-between border-b border-blue-500/30 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[24px] rounded-full pointer-events-none"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-[#020617] rounded-full flex items-center justify-center border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <div className="w-6 h-6 bg-[#EB3158] rounded-sm rotate-45 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm rotate-0"></div>
                  </div>
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
                    : 'bg-gray-100 dark:bg-[#1e293b] text-[#15172B] dark:text-gray-200 border border-[#111A4A]/10 dark:border-gray-700/50 rounded-tl-sm'
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
                      className="flex items-center gap-1.5 text-xs bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-[#EB3158] border border-blue-200 dark:border-blue-500/40 text-[#EB3158] hover:text-blue-700 dark:text-blue-200 dark:hover:text-white px-3 py-1.5 rounded-full transition-all"
                    >
                      {action.icon} {action.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Lead Capture Form */}
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 dark:bg-[#1e293b] border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 text-sm transition-colors"
                >
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <input required type="text" placeholder="Your Name" value={leadForm.name} onChange={e => setLeadForm({ ...leadForm, name: e.target.value })} className="w-full bg-white dark:bg-[#0f172a] border border-[#111A4A]/10 dark:border-gray-700 focus:border-blue-400 dark:focus:border-[#EB3158]/50 rounded-lg px-3 py-2 text-[#111A4A] dark:text-white outline-none text-xs transition-colors" />
                    <input required type="email" placeholder="Work Email" value={leadForm.email} onChange={e => setLeadForm({ ...leadForm, email: e.target.value })} className="w-full bg-white dark:bg-[#0f172a] border border-[#111A4A]/10 dark:border-gray-700 focus:border-blue-400 dark:focus:border-[#EB3158]/50 rounded-lg px-3 py-2 text-[#111A4A] dark:text-white outline-none text-xs transition-colors" />
                    <input required type="text" placeholder="Company Name" value={leadForm.company} onChange={e => setLeadForm({ ...leadForm, company: e.target.value })} className="w-full bg-white dark:bg-[#0f172a] border border-[#111A4A]/10 dark:border-gray-700 focus:border-blue-400 dark:focus:border-[#EB3158]/50 rounded-lg px-3 py-2 text-[#111A4A] dark:text-white outline-none text-xs transition-colors" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Industry" value={leadForm.industry} onChange={e => setLeadForm({ ...leadForm, industry: e.target.value })} className="w-full bg-white dark:bg-[#0f172a] border border-[#111A4A]/10 dark:border-gray-700 focus:border-blue-400 dark:focus:border-[#EB3158]/50 rounded-lg px-3 py-2 text-[#111A4A] dark:text-white outline-none text-xs transition-colors" />
                      <input type="tel" placeholder="Phone" value={leadForm.phone} onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })} className="w-full bg-white dark:bg-[#0f172a] border border-[#111A4A]/10 dark:border-gray-700 focus:border-blue-400 dark:focus:border-[#EB3158]/50 rounded-lg px-3 py-2 text-[#111A4A] dark:text-white outline-none text-xs transition-colors" />
                    </div>
                    <button type="submit" className="w-full bg-[#EB3158] hover:bg-[#EB3158] text-white rounded-lg py-2 font-medium transition-colors mt-2 text-xs">
                      Submit Details
                    </button>
                  </form>
                </motion.div>
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-[#1e293b] border border-[#111A4A]/10 dark:border-gray-700/50 rounded-2xl rounded-tl-sm p-3.5 flex gap-1 transition-colors">
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
              <div className="p-3 border-t border-[#111A4A]/10 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a] transition-colors">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-white dark:bg-[#1e293b] border border-[#111A4A]/10 dark:border-gray-700 focus:border-blue-400 dark:focus:border-[#EB3158]/50 rounded-full pl-4 pr-12 py-2.5 text-sm text-[#111A4A] dark:text-white outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-[#15172B]/60"
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
          className="bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md text-[#15172B] dark:text-white text-xs px-4 py-2 rounded-full mb-3 shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-200 dark:border-blue-500/30 mr-2 flex items-center gap-2 transition-colors"
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
