"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
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
    { name: "HOME", href: "/" },
    { name: "SOLUTIONS", href: "/solutions" },
    { name: "PRODUCTS", href: "/products" },
    { name: "FRANCHISE", href: "/franchise" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 dark:bg-[#030816]/80 backdrop-blur-md border-b border-[#111A4A]/10 dark:border-white/10 py-4 shadow-sm" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="ITSoftLab360 Logo" 
              className="h-8 md:h-10 w-auto object-contain transition-all"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.name === "SOLUTIONS") {
                const solutionsList = [
                  { name: "Digital Transformation", id: "01" },
                  { name: "Process Automation", id: "02" },
                  { name: "Business Intelligence & Analytics", id: "03" },
                  { name: "Workflow Optimization", id: "04" },
                  { name: "System Integration", id: "05" },
                  { name: "Franchise Enablement", id: "06" },
                  { name: "Retail & Customer Experience Solutions", id: "07" },
                  { name: "Workforce & Employee Solutions", id: "08" },
                  { name: "Business Operations Solutions", id: "09" },
                  { name: "Customer Growth Solutions", id: "10" },
                  { name: "Supply Chain & Distribution Solutions", id: "11" },
                  { name: "Learning & Knowledge Solutions", id: "12" }
                ];
                
                return (
                  <div key={link.name} className="relative group">
                    <Link 
                      href={link.href}
                      className="flex items-center gap-1 text-[12px] font-bold text-[#15172B]/80 dark:text-gray-300 hover:text-[#111A4A] dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.6px] after:bg-[#EB3158] group-hover:after:w-full after:transition-all after:duration-300"
                    >
                      {link.name} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                    </Link>
                    
                    {/* Mega Menu Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[560px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-white dark:bg-[#030816] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-white/10 p-6 flex flex-col gap-2 relative">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {solutionsList.map((sol) => (
                            <Link 
                              key={sol.id} 
                              href={`/solutions?id=${sol.id}`}
                              className="group/link flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                            >
                              <span className="text-[11.2px] font-semibold text-[#15172B]/80 dark:text-gray-300 group-hover/link:text-[#EB3158] transition-colors">
                                {sol.name}
                              </span>
                              <ArrowRight size={14} className="text-[#EB3158] opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                            </Link>
                          ))}
                        </div>
                        
                        <div className="pt-4 mt-2 border-t border-gray-100 dark:border-white/10 flex justify-center">
                          <Link href="/solutions" className="text-sm font-bold text-[#EB3158] hover:text-[#d6274d] hover:underline flex items-center gap-1 justify-center transition-colors">
                            View All Solutions <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-[12px] font-bold text-[#15172B]/80 dark:text-gray-300 hover:text-[#111A4A] dark:hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.6px] after:bg-[#EB3158] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-semibold text-[#111A4A] dark:text-white hover:text-[#EB3158] transition-colors">
              Sign In
            </Link>
            <Link 
              href="/demo" 
              className="group flex items-center gap-2 bg-[#EB3158] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_4px_14px_0_rgba(235,49,88,0.39)] hover:shadow-[0_6px_20px_rgba(235,49,88,0.23)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a Demo
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-[#111A4A] dark:text-white"
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
            className="fixed inset-0 z-40 bg-white dark:bg-[#030816] pt-24 px-6 pb-6 flex flex-col lg:hidden"
          >
            <nav className="flex flex-col gap-6 text-lg font-semibold text-[#111A4A] dark:text-white">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 dark:border-white/10 pb-4"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <Link 
                href="/login" 
                className="w-full text-center py-4 rounded-xl border border-[#111A4A]/10 dark:border-white/10 text-[#111A4A] dark:text-white font-semibold"
              >
                Sign In
              </Link>
              <Link 
                href="/demo" 
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
