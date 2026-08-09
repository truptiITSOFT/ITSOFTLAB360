"use client";

import HeroSection from "./home/components/HeroSection";
import EcosystemShowcase from "./home/components/EcosystemShowcase";
import WorkflowSection from "./home/components/WorkflowSection";
import BenefitsSection from "./home/components/BenefitsSection";
import FranchisePromo from "./home/components/FranchisePromo";
import FinalCTA from "./home/components/FinalCTA";
import ChatWidget from "@/components/ChatWidget";
import CityLandscapeSection from "@/components/CityLandscapeSection";
import { IntroAnimation } from "./home/components/Intro-animation";

export default function LightModeHome() {
  return (
    <main className="relative min-h-screen flex flex-col font-sans selection:bg-[#EB3158]/20 selection:text-[#111A4A] overflow-x-hidden transition-opacity duration-300">

      <div className="flex-grow">
        {/* <IntroAnimation LETTERS={["I", "T", "S", "O", "F", "T", "L", "A", "B", "3", "6", "0"]} /> */}
        <HeroSection />
        <EcosystemShowcase />
        <WorkflowSection />
        <BenefitsSection />
        <FranchisePromo />
        <FinalCTA />
        <CityLandscapeSection />
      </div>

      <ChatWidget />
    </main>
  );
}
