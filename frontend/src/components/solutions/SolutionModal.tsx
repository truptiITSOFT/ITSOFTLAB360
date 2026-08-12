"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect } from "react";

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: {
    title: string;
    bg: string;
    color: string;
    comp: React.ComponentType;
  } | null;
}

export default function SolutionModal({ isOpen, onClose, solution }: SolutionModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !solution) return null;

  const MockupComponent = solution.comp;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full h-full max-w-7xl max-h-[90vh] bg-slate-50 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        >
          {/* Mock Browser Header */}
          <div className="w-full h-14 border-b border-slate-200/80 bg-white flex items-center px-6 justify-between shrink-0 z-20">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:scale-110 transition-transform cursor-pointer" onClick={onClose} />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:scale-110 transition-transform cursor-pointer" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:scale-110 transition-transform cursor-pointer" />
            </div>

            <div className={`px-4 py-1.5 rounded-full ${solution.bg} ${solution.color} text-[11px] font-bold tracking-wider flex items-center gap-2 border border-white shadow-sm`}>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
              {solution.title} PREVIEW
            </div>

            <button 
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body / Mockup Area */}
          <div className="relative flex-1 w-full overflow-y-auto bg-slate-100/50 p-4 md:p-8 custom-scrollbar">
            <MockupComponent />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
