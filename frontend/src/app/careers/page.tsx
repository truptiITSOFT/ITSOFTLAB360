import React from 'react';
import ChatWidget from "@/components/ChatWidget";

export default function CareersPage() {
  return (
    <main className="min-h-screen relative flex flex-col pt-24 pb-16 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-6 w-full text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#111A4A] mb-6 tracking-tight">
          Careers
        </h1>
        <p className="text-lg md:text-xl text-[#15172B]/70 mb-12">
          Build the future of enterprise software with us.
        </p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 relative z-10">
          <div className="mb-8 text-[#15172B]/70">
            <p className="mb-4">We are currently updating our open positions. Please check back later or send your resume to our HR team.</p>
          </div>
          <a href="mailto:hello@itsoftlab360.com" className="inline-block px-8 py-3 bg-[#20B486] text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors">
            Email Resume
          </a>
        </div>
      </div>
      <ChatWidget />
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#20B486]/10 rounded-full blur-[96px] -translate-x-1/3 translate-y-1/3"></div>
      </div>
    </main>
  );
}
