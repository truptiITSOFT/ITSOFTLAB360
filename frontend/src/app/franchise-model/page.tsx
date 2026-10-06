import React from 'react';
import ChatWidget from "@/components/ChatWidget";

export default function FranchiseModelPage() {
  return (
    <main className="min-h-screen relative flex flex-col pt-24 pb-16 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-6 w-full text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#111A4A] mb-6 tracking-tight">
          Franchise Model
        </h1>
        <p className="text-lg md:text-xl text-[#15172B]/70 mb-12">
          Join our global network and become a technology leader in your region.
        </p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 relative z-10 text-left">
          <h2 className="text-2xl font-bold text-[#111A4A] mb-4">Why Partner With Us?</h2>
          <ul className="list-disc pl-5 mb-8 text-[#15172B]/70 space-y-2">
            <li>Exclusive access to 12 integrated enterprise software solutions.</li>
            <li>Comprehensive training and dedicated support.</li>
            <li>High ROI with a scalable business model.</li>
            <li>Marketing and lead generation assistance.</li>
          </ul>
          <h2 className="text-2xl font-bold text-[#111A4A] mb-4">Get Started</h2>
          <p className="text-[#15172B]/70 leading-relaxed mb-6">
            We are looking for driven partners who want to bring enterprise software solutions to their local markets. 
            Contact our franchise team today to learn more about the investment and opportunities.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-[#111A4A] text-white font-semibold rounded-full hover:bg-blue-900 transition-colors">
            Contact Franchise Team
          </a>
        </div>
      </div>
      <ChatWidget />
      {/* Background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[96px] translate-x-1/3 -translate-y-1/3"></div>
      </div>
    </main>
  );
}
