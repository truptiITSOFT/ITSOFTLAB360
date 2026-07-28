"use client";

import { motion } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-white text-gray-800 p-4 rounded-t-xl rounded-bl-xl rounded-br-sm shadow-2xl mb-4 w-64 relative"
        >
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors bg-blue-500 rounded-full text-white p-0.5 shadow-md"
          >
            <X size={12} />
          </button>
          <div className="text-sm font-medium pr-4">
            Hi! 👋 <br />
            How can we help you today?
          </div>
        </motion.div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
