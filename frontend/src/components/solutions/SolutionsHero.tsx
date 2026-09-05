"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Server, Shield, Zap, Code, Database, Cloud } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const floatingIcons = [
  { icon: Server, color: "text-[#4AA8D8]", size: 48, delay: 0, x: "10%", y: "20%" },
  { icon: Shield, color: "text-[#20B486]", size: 36, delay: 1, x: "85%", y: "15%" },
  { icon: Zap, color: "text-[#EB3158]", size: 42, delay: 2, x: "75%", y: "80%" },
  { icon: Code, color: "text-[#20B486]", size: 32, delay: 0.5, x: "15%", y: "75%" },
  { icon: Database, color: "text-[#4AA8D8]", size: 54, delay: 1.5, x: "80%", y: "45%" },
  { icon: Cloud, color: "text-[#EB3158]", size: 40, delay: 2.5, x: "20%", y: "45%" },
];

// Animation Variants
// const textReveal = {
//   hidden: { y: "100%", opacity: 0 },
//   visible: (custom: number) => ({
//     y: 0,
//     opacity: 1,
//     transition: {
//       delay: custom * 0.1,
//       duration: 0.8,
//       ease: [0.16, 1, 0.3, 1], // Dribbble style bouncy/smooth easing
//     },
//   }),
// };

export default function SolutionsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleDown = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[85vh] pt-16 md:pt-24 pb-32 md:pb-40 flex flex-col justify-start overflow-hidden bg-white transition-colors duration-300"
    >
      {/* Animated Gradient Background */}
      <motion.div style={{ opacity: opacityFade, scale: scaleDown }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_19.2px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[96px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-[#EB3158]/10 rounded-full blur-[80px] mix-blend-multiply animate-pulse" style={{ animationDelay: "2s" }}></div>
      </motion.div>

      {/* Floating Icons with Parallax */}
      {floatingIcons.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            className={`absolute z-0 ${item.color} opacity-30`}
            style={{ 
              left: item.x, 
              top: item.y,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <Icon size={item.size} />
          </motion.div>
        );
      })}

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
        <motion.div style={{ y: y1, opacity: opacityFade }}>
          
          <div className="overflow-hidden mb-8 flex justify-center">
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              // variants={textReveal}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Next-Generation Enterprise Software
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#111A4A] leading-[1.1] mb-6 flex flex-col items-center">
            <span className="overflow-hidden pb-2">
              <motion.span custom={2} initial="hidden" animate="visible" className="block">
                Enterprise Software Solutions
              </motion.span>
            </span>
            <span className="overflow-hidden">
              <motion.span custom={3} initial="hidden" animate="visible" className="block text-transparent bg-clip-text bg-gradient-to-r from-[#20B486] to-[#EB3158]">
                for Every Industry
              </motion.span>
            </span>
          </h1>

          <div className="overflow-hidden mb-10">
            <motion.p 
              custom={4} 
              initial="hidden" 
              animate="visible" 
              // variants={textReveal}
              className="text-lg md:text-xl text-[#15172B]/70 max-w-3xl mx-auto leading-relaxed"
            >
              Transform your business with intelligent software solutions designed for every department and industry. From HR and Sales to Manufacturing and Healthcare, ITSoftLab360 helps organizations streamline operations, increase productivity, and accelerate growth.
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 overflow-hidden pt-4">
            <motion.div custom={5} initial="hidden" animate="visible">
              <Link href="#solutions-grid" className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-[#111A4A] rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(17,26,74,0.5)]">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Solutions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out skew-x-12"></div>
              </Link>
            </motion.div>

            <motion.div custom={6} initial="hidden" animate="visible">
              <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[#111A4A] bg-transparent border-2 border-[#111A4A]/20 rounded-full transition-all hover:border-[#111A4A] hover:bg-[#111A4A]/5">
                Book Demo <Calendar size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
