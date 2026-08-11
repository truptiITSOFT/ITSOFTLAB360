import SolutionsGrid from "@/components/SolutionsGrid";
import Products from "@/components/Products";
import ChatWidget from "@/components/ChatWidget";

export default function ProductsPage() {
  return (
    <main className="min-h-screen relative flex flex-col pt-20">
      <div className="flex-grow">
        <Products />
        <div className="text-center pt-12 pb-8 px-4 relative z-10 bg-[#f8fafc] dark:bg-[#030816]">
          <span className="text-xs md:text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#EB3158] to-[#111A4A] dark:from-[#EB3158] dark:to-blue-400 uppercase mb-4 block">
            The Complete Technology Ecosystem for Every Business Operation.
          </span>
          <h3 className="text-2xl md:text-4xl font-extrabold text-[#111A4A] dark:text-white tracking-tight">
            Explore all 12 powerful IT solutions through one immersive 3D ecosystem.
          </h3>
        </div>
        <SolutionsGrid />
      </div>
      <ChatWidget />
      
      {/* Global decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[96px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[96px] -translate-x-1/3 translate-y-1/3"></div>
      </div>
    </main>
  );
}
