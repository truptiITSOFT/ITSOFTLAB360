import SolutionsHero from "@/components/solutions/SolutionsHero";
import SolutionsCategoryGrid from "@/components/solutions/SolutionsCategoryGrid";

import WhyChooseUs from "@/components/solutions/WhyChooseUs";
import SolutionsCTA from "@/components/solutions/SolutionsCTA";
import ChatWidget from "@/components/ChatWidget";
import SolutionsCategories from "@/components/solutions/SolutionsCategories";

export default function SolutionsPage() {
  return (
    <main className="min-h-screen relative flex flex-col selection:bg-[#EB3158]/20 selection:text-[#111A4A] overflow-x-hidden transition-opacity duration-300 bg-white pt-20">
      <div className="flex-grow">
        <SolutionsHero />
        <SolutionsCategories />

        <WhyChooseUs />
        <SolutionsCTA />
      </div>
      <ChatWidget />
      

    </main>
  );
}
