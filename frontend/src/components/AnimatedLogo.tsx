"use client";
import { motion } from "framer-motion";

export default function AnimatedLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className} group`}>
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[#EB3158] rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
      
      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.9)] transition-all duration-500"
        animate={{ 
          rotateY: [0, 15, -15, 0],
          rotateX: [0, 5, -5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="rightFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="leftFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="innerTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          <linearGradient id="innerLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="innerRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* --- Outer Cube Faces --- */}
        {/* Top Face */}
        <motion.polygon 
          points="50,15 85,35 50,55 15,35" 
          fill="url(#topFace)"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        {/* Right Face */}
        <motion.polygon 
          points="50,55 85,35 85,75 50,95" 
          fill="url(#rightFace)"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        {/* Left Face */}
        <motion.polygon 
          points="15,35 50,55 50,95 15,75" 
          fill="url(#leftFace)"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
        
        {/* --- Inner Cut-out (creating the "C" shape or hollow cube effect) --- */}
        {/* Front Hole (Background Color to pierce through) */}
        <motion.polygon 
          points="50,45 65,53.5 65,70.5 50,79 35,70.5 35,53.5"
          fill="#020617"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        
        {/* Inner Faces for Depth */}
        {/* Inner Top */}
        <motion.polygon 
          points="50,45 65,53.5 50,62 35,53.5" 
          fill="url(#innerTop)" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.4, delay: 1.0 }}
        />
        {/* Inner Right */}
        <motion.polygon 
          points="50,62 65,53.5 65,70.5 50,79" 
          fill="url(#innerRight)" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.4, delay: 1.1 }}
        />
        {/* Inner Left */}
        <motion.polygon 
          points="35,53.5 50,62 50,79 35,70.5" 
          fill="url(#innerLeft)" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.4, delay: 1.2 }}
        />

      </motion.svg>
    </div>
  );
}
