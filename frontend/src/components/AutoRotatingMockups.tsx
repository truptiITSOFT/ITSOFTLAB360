"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { solutions } from "@/data/solutions";

import HRMSMockup from "./mockups/HRMSMockup";
import CRMMockup from "./mockups/CRMMockup";
import ERPMockup from "./mockups/ERPMockup";
import DealerMockup from "./mockups/DealerMockup";
import VendorMockup from "./mockups/VendorMockup";
import AIAutomationMockup from "./mockups/AIAutomationMockup";
import SupplyChainMockup from "./mockups/SupplyChainMockup";
import SalesForceMockup from "./mockups/SalesForceMockup";
import LMSMockup from "./mockups/LMSMockup";
import POSMockup from "./mockups/POSMockup";
import QMSMockup from "./mockups/QMSMockup";
import DMSMockup from "./mockups/DMSMockup";
import GenericDashboardMockup from "./mockups/GenericDashboardMockup";

export default function AutoRotatingMockups() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutions.length);
    }, 5000); // rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const activeSolution = solutions[activeIndex];

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#0a1125] text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {
           activeSolution.id === "01" ? <HRMSMockup solution={activeSolution} /> :
           activeSolution.id === "02" ? <CRMMockup solution={activeSolution} /> :
           activeSolution.id === "03" ? <ERPMockup solution={activeSolution} /> :
           activeSolution.id === "04" ? <DealerMockup solution={activeSolution} /> :
           activeSolution.id === "05" ? <VendorMockup solution={activeSolution} /> :
           activeSolution.id === "06" ? <AIAutomationMockup solution={activeSolution} /> :
           activeSolution.id === "07" ? <SupplyChainMockup solution={activeSolution} /> :
           activeSolution.id === "08" ? <SalesForceMockup solution={activeSolution} /> :
           activeSolution.id === "09" ? <LMSMockup solution={activeSolution} /> :
           activeSolution.id === "10" ? <POSMockup solution={activeSolution} /> : 
           activeSolution.id === "11" ? <QMSMockup solution={activeSolution} /> :
           activeSolution.id === "12" ? <DMSMockup solution={activeSolution} /> :
           <GenericDashboardMockup solution={activeSolution} />
          }
        </motion.div>
      </AnimatePresence>
      
      {/* Progress indicators at bottom */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {solutions.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-blue-500' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}
