"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Users, Briefcase, LayoutDashboard, Settings, Bell, Search, Menu, Package, Calendar } from "lucide-react";

const VIDEOS = [
  "/videos/ERP360video.mp4",
  "/videos/DMS360video.mp4",
  "/videos/Aiautomation360video.mp4",
  "/videos/documentMS360video.mp4",
  "/videos/CRM360video.mp4",
  "/videos/supply360video.mp4",
  "/videos/retail360video.mp4"
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % VIDEOS.length);
    }, 5000); // 5 seconds per video
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-2xl ml-auto aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-black">
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          src={src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          autoPlay
          muted
          playsInline
          loop
        />
      ))}
      
      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function EcosystemSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900/50 overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-[3.25rem] font-bold leading-[1.1] mb-6 text-gray-900 dark:text-white">
                Bring your entire <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">business ecosystem</span> <br />
                together.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
                Experience unparalleled control with our unified dashboard. Seamlessly manage your HRMS, CRM, ERP, and other critical operations from one intelligent interface.
              </p>
              <button className="bg-[#111A4A] dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Explore the Dashboard
              </button>
            </motion.div>
          </div>

          {/* Right Content - Video Carousel */}
          <div className="relative z-10 w-full mt-12 lg:mt-0">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[64px] -z-10"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <VideoCarousel />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
