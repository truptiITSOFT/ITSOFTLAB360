import Contact from "@/components/Contact";
import ChatWidget from "@/components/ChatWidget";

export default function ContactPage() {
  return (
    <main className="min-h-screen relative flex flex-col pt-20">
            <div className="flex-grow">
        <Contact />
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
