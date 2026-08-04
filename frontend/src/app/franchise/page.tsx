import ChatWidget from "@/components/ChatWidget";
import FranchiseHero from "@/components/franchise/FranchiseHero";
import FranchiseFeatures from "@/components/franchise/FranchiseFeatures";
import FranchiseHowItWorks from "@/components/franchise/FranchiseHowItWorks";
import FranchiseSolutions from "@/components/franchise/FranchiseSolutions";
import FranchiseStats from "@/components/franchise/FranchiseStats";
import FranchiseCTA from "@/components/franchise/FranchiseCTA";

export default function FranchisePage() {
  return (
    <main className="min-h-screen relative flex flex-col selection:bg-blue-500/30 transition-colors duration-300">
            
      {/* Page Content */}
      <div className="flex-grow">
        <FranchiseHero />
        <FranchiseFeatures />
        <FranchiseHowItWorks />
        <FranchiseSolutions />
        <FranchiseStats />
        <FranchiseCTA />
      </div>

      <ChatWidget />
    </main>
  );
}
