import ChatWidget from "@/components/ChatWidget";
import FranchiseHero from "@/components/franchise/FranchiseHero";
import FranchiseModelVisual from "@/components/franchise/FranchiseModelVisual";
import ProductOrbit from "@/components/franchise/ProductOrbit";
import BusinessEngine from "@/components/franchise/BusinessEngine";

import IndiaNetwork from "@/components/franchise/IndiaNetwork";
import FranchiseJourney from "@/components/franchise/FranchiseJourney";
import PartnerBenefits from "@/components/franchise/PartnerBenefits";
import PlatformShowcase from "@/components/franchise/PlatformShowcase";
import GrowthVisualization from "@/components/franchise/GrowthVisualization";
import FranchiseCTA from "@/components/franchise/FranchiseCTA";

export const metadata = {
  title: "Franchise Opportunity | ITSoftLab360",
  description: "Build your technology business with the ITSoftLab360 product ecosystem. One platform. 12 products. One scalable franchise opportunity.",
};

export default function FranchisePage() {
  return (
    <main className="min-h-screen relative flex flex-col selection:bg-[#EB3158]/20 selection:text-[#111A4A] overflow-x-hidden transition-opacity duration-300 bg-white dark:bg-[#030816]">
            
      {/* Page Content */}
      <div className="flex-grow">
        <FranchiseHero />
        <FranchiseModelVisual />
        <ProductOrbit />
        <BusinessEngine />

        <PlatformShowcase />
        <IndiaNetwork />
        <GrowthVisualization />
        <FranchiseJourney />
        <PartnerBenefits />
        <FranchiseCTA />
      </div>

      <ChatWidget />
    </main>
  );
}
