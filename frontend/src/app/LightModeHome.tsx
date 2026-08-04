"use client";

import HeroSection from "./home/components/HeroSection";
import SolutionsGrid from "./home/components/SolutionsGrid";
import EcosystemShowcase from "./home/components/EcosystemShowcase";
import WorkflowSection from "./home/components/WorkflowSection";
import BenefitsSection from "./home/components/BenefitsSection";
import FranchisePromo from "./home/components/FranchisePromo";
import FinalCTA from "./home/components/FinalCTA";
import Footer from "./home/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function LightModeHome() {
  return (
    <main className="relative min-h-screen flex flex-col font-sans selection:bg-[#EB3158]/20 selection:text-[#111A4A] overflow-x-hidden transition-opacity duration-300">
            
      <div className="flex-grow">
        <HeroSection />
        <SolutionsGrid />
        <EcosystemShowcase />
        <WorkflowSection />
        <BenefitsSection />
        <FranchisePromo />
        <FinalCTA />
      </div>

      <Footer />
      <ChatWidget />
    </main>
  );
}
