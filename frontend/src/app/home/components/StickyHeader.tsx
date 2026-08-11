"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/home" },
    { name: "SOLUTIONS", href: "/solutions" },
    { name: "PRODUCTS", href: "/products" },
    { name: "FRANCHISE", href: "/franchise" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[#111A4A]/10 py-4 shadow-sm"
          : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Geometric Symbol */}
            <div className="flex gap-1 items-end h-8">
              <div className="w-2.5 h-4 bg-[#EB3158] rounded-full group-hover:h-6 transition-all duration-300 ease-out"></div>
              <div className="w-2.5 h-6 bg-[#F5C842] rounded-full group-hover:h-8 transition-all duration-300 ease-out delay-75"></div>
              <div className="w-2.5 h-8 bg-[#20B486] rounded-full group-hover:h-5 transition-all duration-300 ease-out delay-150"></div>
              <div className="w-2.5 h-5 bg-[#4AA8D8] rounded-full group-hover:h-7 transition-all duration-300 ease-out delay-200"></div>
            </div>
            <span className="font-black text-2xl md:text-3xl tracking-tight text-[#111A4A]">
              ITSoftLab360
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[12px] font-bold text-[#15172B]/80 hover:text-[#111A4A] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.6px] after:bg-[#EB3158] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-semibold text-[#111A4A] hover:text-[#EB3158] transition-colors">
              Sign In
            </Link>
            <Link
              href="#demo"
              className="group flex items-center gap-2 bg-[#EB3158] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_4px_14px_0_rgba(235,49,88,0.39)] hover:shadow-[0_6px_20px_rgba(235,49,88,0.23)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a Demo
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-[#111A4A]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-6 flex flex-col lg:hidden"
          >
            <nav className="flex flex-col gap-6 text-lg font-semibold text-[#111A4A]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 pb-4"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <Link
                href="/login"
                className="w-full text-center py-4 rounded-xl border border-gray-200 text-[#111A4A] font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="#demo"
                className="w-full flex justify-center items-center gap-2 bg-[#EB3158] text-white py-4 rounded-xl font-bold shadow-lg shadow-red-500/30"
              >
                Book a Demo <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
