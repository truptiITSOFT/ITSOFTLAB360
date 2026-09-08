import React from 'react';
import ChatWidget from "@/components/ChatWidget";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen relative flex flex-col pt-24 pb-16 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-6 w-full text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#111A4A] mb-6 tracking-tight">
          Resources
        </h1>
        <p className="text-lg md:text-xl text-[#15172B]/70 mb-12">
          Documentation, guides, and knowledge base.
        </p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#111A4A] mb-2">User Guides</h3>
              <p className="text-[#15172B]/70 text-sm">Step-by-step instructions on how to use our products.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#111A4A] mb-2">API Documentation</h3>
              <p className="text-[#15172B]/70 text-sm">Integrate with our platform using our comprehensive APIs.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#111A4A] mb-2">Webinars</h3>
              <p className="text-[#15172B]/70 text-sm">Watch past webinars and register for upcoming sessions.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#111A4A] mb-2">Case Studies</h3>
              <p className="text-[#15172B]/70 text-sm">Read how other businesses have transformed using our solutions.</p>
            </div>
          </div>
        </div>
      </div>
      <ChatWidget />
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#EB3158]/10 rounded-full blur-[96px] -translate-x-1/3 -translate-y-1/3"></div>
      </div>
    </main>
  );
}
