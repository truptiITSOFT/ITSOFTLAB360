"use client";

import Link from "next/link";
import { Mail, MapPin, ChevronRight } from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] dark:bg-[#0A1125] pt-16 pb-6 border-t border-gray-200 dark:border-white/10">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10">
        
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 mb-12">
          
          {/* Brand Column */}
          <div className="lg:w-[28%] lg:pr-10 lg:border-r border-gray-200 dark:border-white/10 shrink-0">
            <Link href="#" className="flex items-center mb-6 w-fit">
              <img 
                src="/logo.png" 
                alt="ITSoftLab360 Logo" 
                className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-[#15172B]/70 dark:text-gray-100/70 text-[13px] leading-relaxed mb-8 pr-4">
              The world's first IT company to offer 12 business solutions on one integrated platform through a franchise model. Empowering businesses with scalable digital products.
            </p>
            
            <div className="flex flex-col gap-4 mb-8">
              <a href="mailto:hello@itsoftlab360.com" className="flex items-center gap-3 text-[13px] text-[#15172B]/80 dark:text-gray-100/70 hover:text-[#3b82f6] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Mail size={14} />
                </div>
                hello@itsoftlab360.com
              </a>
              <div className="flex items-start gap-3 text-[13px] text-[#15172B]/80 dark:text-gray-100/70">
                <div className="w-8 h-8 rounded-lg bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <MapPin size={14} /> 
                </div>
                <span className="pt-1 leading-snug">123 Innovation Drive, Tech District,<br/>Global Hub, 10001</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: FaLinkedinIn, href: "#", color: "text-[#0a66c2]" },
                { icon: FaTwitter, href: "#", color: "text-[#1DA1F2]" },
                { icon: FaFacebookF, href: "#", color: "text-[#1877F2]" },
                { icon: FaInstagram, href: "#", color: "text-[#E1306C]" },
                { icon: FaYoutube, href: "#", color: "text-[#FF0000]" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  className={`group w-8 h-8 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm`}
                >
                  <social.icon size={14} className={`${social.color} transition-transform group-hover:scale-110`} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:w-[72%] lg:pl-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Products */}
            <div>
              <h4 className="font-bold text-[#111A4A] dark:text-white mb-6 pb-2 border-b-2 border-blue-600 inline-block">Products</h4>
              <ul className="flex flex-col gap-4">
                {[
                  "HRMS",
                  "CRM",
                  "ERP",
                  "Dealer Management",
                  "Vendor Management",
                  "Marketing Automation"
                ].map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="flex items-center gap-2 text-[13px] text-[#15172B]/70 dark:text-gray-100/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                      <ChevronRight size={14} className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Products */}
            <div>
              <h4 className="font-bold text-[#111A4A] dark:text-white mb-6 pb-2 border-b-2 border-blue-600 inline-block">More Products</h4>
              <ul className="flex flex-col gap-4">
                {[
                  "Supply Chain & Logistics",
                  "Sales Force Automation",
                  "LMS",
                  "POS",
                  "Queue Management",
                  "Document Management"
                ].map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="flex items-center gap-2 text-[13px] text-[#15172B]/70 dark:text-gray-100/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                      <ChevronRight size={14} className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Solutions */}
            <div>
              <h4 className="font-bold text-[#111A4A] dark:text-white mb-6 pb-2 border-b-2 border-blue-600 inline-block">Business Solutions</h4>
              <ul className="flex flex-col gap-4">
                {[
                  "Digital Transformation",
                  "Process Automation",
                  "Business Intelligence",
                  "Workflow Optimization",
                  "System Integration",
                  "Franchise Enablement"
                ].map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="flex items-center gap-2 text-[13px] text-[#15172B]/70 dark:text-gray-100/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                      <ChevronRight size={14} className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-[#111A4A] dark:text-white mb-6 pb-2 border-b-2 border-blue-600 inline-block">Company</h4>
              <ul className="flex flex-col gap-4">
                {[
                  "About",
                  "Franchise Model",
                  "Careers",
                  "Contact",
                  "Resources",
                  "Privacy Policy"
                ].map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="flex items-center gap-2 text-[13px] text-[#15172B]/70 dark:text-gray-100/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                      <ChevronRight size={14} className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#15172B]/60 dark:text-gray-100/50">
            &copy; 2026 ITSoftLab360. All rights reserved.
          </p>
          <div className="flex items-center text-[13px] text-[#15172B]/60 dark:text-gray-100/50">
            <Link href="#" className="hover:text-[#111A4A] dark:hover:text-white transition-colors">Terms and Conditions</Link>
            <span className="mx-4 text-gray-300 dark:text-gray-700">|</span>
            <Link href="#" className="hover:text-[#111A4A] dark:hover:text-white transition-colors">Privacy Policy</Link>
            <span className="mx-4 text-gray-300 dark:text-gray-700">|</span>
            <Link href="#" className="hover:text-[#111A4A] dark:hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
