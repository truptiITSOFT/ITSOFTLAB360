"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Users, Receipt, TrendingUp, FolderLock, Briefcase, ShoppingCart, Truck, GraduationCap, UserCheck, Settings, Megaphone, BarChart, Calculator, Folder, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/components/Products";
import { useEffect, useState, useRef } from "react";

const VIDEOS = [
  "/videos/supply360video.mp4",
  "/videos/marketingAutomation360video.mp4",
  "/videos/CRMmaster360video.mp4",
  "/videos/DMS,VMS,ERP360videos.mp4",
  "/videos/documentMS360video.mp4",
  "/videos/CRM360video.mp4",
  "/videos/SFA360video.mp4",
  "/videos/VMS360video.mp4",
  "/videos/HRMS360video.mp4"
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

  const titleLines = ["Bring your entire", "business ecosystem", "together."];

  return (
    <section className="relative w-full pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden bg-white dark:bg-[#030816] transition-colors duration-300">
      {/* Background Gradients & Grid (matching Franchise theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_19.2px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[96px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-[320px] h-[320px] bg-[#EB3158]/20 dark:bg-[#EB3158]/20 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
      </div>
      {/* Edge-to-Edge Static Top-Left Banner */}
      <div className="w-full bg-transparent overflow-hidden relative z-30 mb-8 pt-4">

        {/* Animated Shine Effect */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 dark:via-white/5 to-transparent skew-x-12 z-0"
        />

        <div className="w-full max-w-[1120px] mx-auto px-6 md:px-10 flex items-center justify-start gap-4 z-10 relative">
          <div className="flex items-center justify-center shrink-0 w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />
          </div>
          <span className="text-[11.2px] md:text-[12px] font-medium tracking-wide text-slate-700 dark:text-slate-300">
            The World's First IT Company Bringing 12 Powerful Solutions Together On One Integrated Platform.
          </span>
        </div>
      </div>

      <div className="max-w-[1120px] mx-auto px-6 md:px-10 h-full flex flex-col z-20 relative">

        {/* Two-Column Content Layout */}
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-10 lg:gap-8">

          {/* Left Content (approx 45%) */}
          <div className="w-full lg:w-[45%] flex flex-col relative z-10">

            {/* Masked Reveal Headline - Hydration Error Fixed by using Span instead of Div inside H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.8rem] font-extrabold text-[#111A4A] dark:text-white leading-[1.15] tracking-tight mb-5">
              {titleLines.map((line, index) => (
                <span key={index} className="overflow-hidden pb-2 block">
                  <motion.span
                    className="block"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-[#15172B] dark:text-gray-100/70 leading-relaxed mb-8 max-w-lg"
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
                href="#solutions"
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#EB3158] hover:bg-[#d6274d] text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_25px_rgba(235,49,88,0.3)] hover:shadow-[0_12px_30px_rgba(235,49,88,0.4)] transition-all hover:-translate-y-1"
              >
                Explore All Solutions <ArrowRight size={18} />
              </Link>

              <Link
                href="/demo"
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-transparent border-2 border-[#111A4A]/20 dark:border-white/20 hover:border-[#111A4A] dark:hover:border-white text-[#111A4A] dark:text-white px-8 py-3.5 rounded-full font-bold transition-all hover:-translate-y-1 hover:bg-[#111A4A]/5 dark:hover:bg-white/5"
              >
                <Play size={18} className="fill-[#111A4A] text-[#111A4A] dark:text-white" /> Book a Live Demo
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
                  <span className="text-sm font-semibold text-[#15172B] dark:text-gray-100/60">{tag.text}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Visual - Video Carousel in Browser Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[50%] relative h-[240px] sm:h-[320px] lg:h-[384px] flex justify-center items-center"
          >
            <div className="relative w-full h-full max-w-[480px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
              {/* Browser Header */}
              <div className="w-full h-10 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
              </div>

              {/* Video Content */}
              <div className="relative flex-1 bg-slate-100 dark:bg-slate-900">
                {VIDEOS.map((src, i) => (
                  <video
                    key={src}
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={src}
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

              {/* Indicator dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full">
                {VIDEOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentVideoIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentVideoIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white'}`}
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
