"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Users, Receipt, TrendingUp, FolderLock, Briefcase, ShoppingCart, Truck, GraduationCap, UserCheck, Settings, Megaphone, BarChart, Calculator, Folder, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/components/Products";
import { useEffect, useState, useRef } from "react";

const VIDEOS = [
  { src: "/videos/supply360video.mp4", label: "Supply Logistic", icon: Truck, color: "text-amber-500" },
  { src: "/videos/marketingAutomation360video.mp4", label: "Marketing Automation", icon: Megaphone, color: "text-rose-500" },
  { src: "/videos/CRMmaster360video.mp4", label: "CRM", icon: Users, color: "text-blue-500" },
  { src: "/videos/DMS,VMS,ERP360videos.mp4", label: "ERP", icon: Settings, color: "text-indigo-500" },
  { src: "/videos/documentMS360video.mp4", label: "Docms", icon: FolderLock, color: "text-teal-500" },
  { src: "/videos/CRM360video.mp4", label: "CRM", icon: Users, color: "text-cyan-500" },
  { src: "/videos/SFA360video.mp4", label: "SFA", icon: TrendingUp, color: "text-orange-500" },
  { src: "/videos/VMS360video.mp4", label: "VMS", icon: Briefcase, color: "text-purple-500" },
  { src: "/videos/HRMS360video.mp4", label: "HRMS", icon: UserCheck, color: "text-emerald-500" }
];

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === currentVideoIndex) {
          video.currentTime = 0;
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideoIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);



  return (
    <section className="relative w-full pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden bg-white  transition-colors duration-300">
      {/* Background Gradients & Grid (matching Franchise theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_19.2px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20  rounded-full blur-[96px] mix-blend-multiply  animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-[320px] h-[320px] bg-[#EB3158]/20  rounded-full blur-[80px] mix-blend-multiply  animate-blob animation-delay-2000"></div>
      </div>
      {/* Edge-to-Edge Static Top-Left Banner */}
      <div className="w-full bg-transparent overflow-hidden relative z-30 mb-8 pt-4">

        {/* Animated Shine Effect */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/60  to-transparent skew-x-12 z-0"
        />

        <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10 flex items-center justify-start gap-4 z-10 relative">
          <div className="flex items-center justify-center shrink-0 w-7 h-7 rounded-full bg-amber-50  border border-amber-200/50  shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />
          </div>
          <span className="text-[11.2px] md:text-[12px] font-medium tracking-wide text-slate-700 ">
            The World's First IT Company Bringing 12 Powerful Solutions Together On One Integrated Platform.
          </span>
        </div>
      </div>

      <div className="max-w-[1120px] mx-auto px-6 md:px-10 h-full flex flex-col z-20 relative">

        {/* Two-Column Content Layout */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">

          {/* Left Content (approx 45%) */}
          <div className="w-full lg:w-[45%] flex flex-col relative z-10">

            {/* Masked Reveal Headline - Word by Word for perfect responsive wrapping */}
            <h1 className="text-[32px] sm:text-4xl lg:text-5xl xl:text-[3.6rem] font-extrabold text-[#111A4A] leading-[1.15] tracking-tight mb-5 flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-2">
              {["Bring", "your", "entire", "business", "ecosystem", "together."].map((word, index) => (
                <span key={index} className="overflow-hidden pb-1 block">
                  <motion.span
                    className="block"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.08 * index, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-[#15172B]  leading-relaxed mb-8 max-w-lg"
            >
              Manage your people, customers, finance, dealers, vendors, sales, learning, documents, retail, supply chain, quality processes, and marketing through one connected technology ecosystem.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-10"
            >
              <Link
                href="/franchise"
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#EB3158] hover:bg-[#d6274d] text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_25px_rgba(235,49,88,0.3)] hover:shadow-[0_12px_30px_rgba(235,49,88,0.4)] transition-all hover:-translate-y-1"
              >
                For Franchisor <ArrowRight size={18} />
              </Link>

              <Link
                href="/demo"
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-transparent border-2 border-[#111A4A]/20  hover:border-[#111A4A]  text-[#111A4A]  px-8 py-3.5 rounded-full font-bold transition-all hover:-translate-y-1 hover:bg-[#111A4A]/5 "
              >
                <Play size={18} className="fill-[#111A4A] text-[#111A4A] " /> Book a Live Demo
              </Link>
            </motion.div>

            {/* Feature Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { text: "12 Integrated Solutions", color: "bg-[#20B486]" },
                { text: "Franchise-Ready Platform", color: "bg-[#8267E8]" },
                { text: "Centralized Business Data", color: "bg-[#4AA8D8]" },
                { text: "Built for Every Industry", color: "bg-[#F3A62F]" },
              ].map((tag, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${tag.color}`} />
                  <span className="text-sm font-semibold text-[#15172B] ">{tag.text}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Visual - Video Carousel in Browser Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[50%] relative h-[240px] sm:h-[320px] lg:h-[384px] flex justify-end items-center"
          >
            <div className="relative w-full h-full max-w-[480px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200  bg-white  flex flex-col">
              {/* Browser Header */}
              <div className="w-full h-12 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-4 justify-between shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] z-10 shrink-0 relative">
                {/* MacOS style window controls */}
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:scale-110 shadow-sm transition-all cursor-pointer"/>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:scale-110 shadow-sm transition-all cursor-pointer"/>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:scale-110 shadow-sm transition-all cursor-pointer"/>
                </div>
                
                {/* Mock URL Bar with Logo */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-50/80 border border-slate-200/60 rounded-full px-5 py-1.5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] group cursor-pointer hover:bg-white hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-300">
                    <img src="/logo.png" alt="ITSoftLab360 Logo" className="h-[14px] w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                
                {/* Right Side Icon */}
                <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] transition-all duration-500 hover:bg-white hover:scale-110 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] hover:border-slate-300 group cursor-pointer">
                    {(() => {
                        const activeVideo = VIDEOS[currentVideoIndex];
                        const Icon = activeVideo.icon;
                        return <Icon size={14} strokeWidth={2.5} className={`${activeVideo.color} transition-all duration-300 group-hover:scale-110`} />
                    })()}
                </div>
              </div>

              {/* Video Content */}
              <div className="relative flex-1 bg-slate-100 overflow-hidden">
                {VIDEOS.map((video, i) => (
                  <video
                    key={video.src}
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={video.src}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${i === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    muted
                    playsInline
                    onEnded={() => {
                      if (i === currentVideoIndex) {
                        setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
                      }
                    }}
                    onCanPlay={(e) => { e.currentTarget.playbackRate = 0.65; }}
                  />
                ))}

              </div>


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
