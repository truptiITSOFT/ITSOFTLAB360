import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SolutionsGrid from "@/components/SolutionsGrid";
import StatsBar from "@/components/StatsBar";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col bg-[#020617]">
      <Header />
      <div className="flex-grow">
        <Hero />
        <SolutionsGrid />
        <StatsBar />
      </div>
      <ChatWidget />
      
      {/* Global decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3"></div>
      </div>
    </main>
  );
}
