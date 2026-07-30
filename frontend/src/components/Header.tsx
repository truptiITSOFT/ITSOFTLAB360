"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "HOME", href: "/home" },
  { name: "SOLUTIONS", href: "/solutions", hasDropdown: true },
  { name: "PRODUCTS", href: "/products" },
  { name: "INDUSTRIES", href: "/industries" },
  { name: "CONTACT US", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-[#020617]/80 backdrop-blur-md border-b border-gray-200 dark:border-[rgba(59,130,246,0.1)] transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Image Logo */}
        <Link href="/home" className="flex flex-col group mt-1">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="IT SOFTLAB 360 Logo" 
              className="h-7 w-auto object-contain dark:invert-0 invert transition-all" 
            />
          </div>
          {/* Tagline */}
          <span className="text-[0.6rem] text-slate-500 dark:text-gray-400 tracking-widest uppercase ml-1 mt-1 transition-colors">Solutions Beyond Limits</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-gray-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  isActive
                    ? "text-blue-600 dark:text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                    : "hover:text-blue-600 dark:hover:text-white transition-colors"
                } ${link.hasDropdown ? "flex items-center gap-1 group" : ""}`}
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/demo" className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md shadow-blue-500/20 dark:shadow-[0_0_15px_rgba(37,99,235,0.5)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]">
            REQUEST DEMO <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
