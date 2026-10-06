import React from 'react';
import ChatWidget from "@/components/ChatWidget";

export default function AboutPage() {
  return (
    <main className="min-h-screen relative flex flex-col pt-24 pb-16 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-6 w-full text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#111A4A] mb-6 tracking-tight">
          About ITSoftLab360
        </h1>
        <p className="text-lg md:text-xl text-[#15172B]/70 mb-12">
          The world's first IT company to offer 12 business solutions on one integrated platform through a franchise model.
        </p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 relative z-10 text-left">
          <h2 className="text-2xl font-bold text-[#111A4A] mb-4">Our Mission</h2>
          <p className="text-[#15172B]/70 mb-8 leading-relaxed">
            Empowering businesses with scalable digital products and transforming operations with intelligent software solutions designed for every department and industry.
          </p>
          <h2 className="text-2xl font-bold text-[#111A4A] mb-4">Our Vision</h2>
          <p className="text-[#15172B]/70 leading-relaxed">
            To create a comprehensive technology ecosystem that simplifies business operations globally, making enterprise-grade software accessible to businesses of all sizes.
          </p>
        </div>
      </div>
      <ChatWidget />
      {/* Background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[96px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[96px] -translate-x-1/3 translate-y-1/3"></div>
      </div>
    </main>
  );
}
