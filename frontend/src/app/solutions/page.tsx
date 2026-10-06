import SolutionsHero from "@/components/solutions/SolutionsHero";

import IndustrySolutionsFilter from "@/components/solutions/IndustrySolutionsFilter";
import WhyChooseUs from "@/components/solutions/WhyChooseUs";
import SolutionsTechStack from "@/components/solutions/SolutionsTechStack";
import SolutionsMetrics from "@/components/solutions/SolutionsMetrics";
import SolutionsTestimonials from "@/components/solutions/SolutionsTestimonials";
import SolutionsFAQ from "@/components/solutions/SolutionsFAQ";
import SolutionsCTA from "@/components/solutions/SolutionsCTA";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: 'Enterprise Software Solutions | ITSoftLab360',
  description: 'Transform your business with intelligent software solutions designed for every department and industry. From HR and Sales to Manufacturing and Healthcare, ITSoftLab360 helps organizations streamline operations.',
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen relative flex flex-col selection:bg-blue-500/20 selection:text-blue-900 overflow-x-hidden transition-opacity duration-300 bg-white pt-20">
      <div className="flex-grow">
        {/* SECTION 1 */}
        <SolutionsHero />
        

        {/* SECTION 3 & 4 */}
        <IndustrySolutionsFilter />
        
        {/* SECTION 5 */}
        <WhyChooseUs />
        
        {/* SECTION 6 */}
        <SolutionsTechStack />
        
        {/* SECTION 7 */}
        <SolutionsMetrics />
        
        {/* SECTION 8 */}
        <SolutionsTestimonials />
        
        {/* SECTION 9 */}
        <SolutionsFAQ />
        
        {/* SECTION 10 */}
        <SolutionsCTA />
      </div>
      
      <ChatWidget />
    </main>
  );
}
