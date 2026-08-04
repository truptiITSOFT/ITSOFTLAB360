"use client";

import Link from "next/link";
import { Mail, MapPin, Globe, Share2, MessageCircle, Camera } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0A1125] pt-24 pb-8 border-t border-[#111A4A] dark:border-white/10 dark:border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="#" className="flex items-center group mb-6 w-fit">
              <img 
                src="/logo.png" 
                alt="ITSoftLab360 Logo" 
                className="h-8 md:h-10 w-auto object-contain transition-all"
              />
            </Link>
            <p className="text-[#15172B] dark:text-gray-100/70 text-sm leading-relaxed mb-8 max-w-sm">
              The World’s First IT Company to Offer 12 IT Solutions on One Platform Through a Franchise Model. Build your technology business with us.
            </p>
            
            <div className="flex flex-col gap-3 mb-8">
              <a href="mailto:hello@itsoftlab360.com" className="flex items-center gap-3 text-sm text-[#15172B] dark:text-gray-100/70 hover:text-[#EB3158] transition-colors">
                <Mail size={16} /> hello@itsoftlab360.com
              </a>
              <div className="flex items-start gap-3 text-sm text-[#15172B] dark:text-gray-100/70">
                <MapPin size={16} className="mt-1 shrink-0" /> 
                <span>123 Innovation Drive, Tech District<br/>Global Hub, 10001</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {[
                { icon: Share2, href: "#" },
                { icon: MessageCircle, href: "#" },
                { icon: Globe, href: "#" },
                { icon: Camera, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-[#111A4A]/5 flex items-center justify-center text-[#111A4A] dark:text-white/60 hover:bg-[#EB3158] hover:text-white transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-[#111A4A] dark:text-white mb-6">Products</h4>
            <ul className="flex flex-col gap-3">
              {[
                "HRMS",
                "CRM",
                "ERP",
                "Dealer Management",
                "Vendor Management",
                "Marketing Automation"
              ].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-sm text-[#15172B] dark:text-gray-100/60 hover:text-[#111A4A] dark:text-white relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1px] after:bg-[#111A4A] hover:after:w-full after:transition-all after:duration-300">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="font-bold text-[#111A4A] dark:text-white mb-6">Solutions</h4>
            <ul className="flex flex-col gap-3">
              {[
                "Supply Chain & Logistics",
                "Sales Force Automation",
                "LMS",
                "POS",
                "Queue Management",
                "Document Management"
              ].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-sm text-[#15172B] dark:text-gray-100/60 hover:text-[#111A4A] dark:text-white relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1px] after:bg-[#111A4A] hover:after:w-full after:transition-all after:duration-300">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-[#111A4A] dark:text-white mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              {[
                "About",
                "Franchise Model",
                "Careers",
                "Contact",
                "Resources",
                "Privacy Policy"
              ].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-sm text-[#15172B] dark:text-gray-100/60 hover:text-[#111A4A] dark:text-white relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1px] after:bg-[#111A4A] hover:after:w-full after:transition-all after:duration-300">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#111A4A] dark:border-white/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#15172B] dark:text-gray-100/50">
            &copy; {currentYear} ITSoftLab360. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#15172B] dark:text-gray-100/50">
            <Link href="#" className="hover:text-[#111A4A] dark:text-white transition-colors">Terms and Conditions</Link>
            <Link href="#" className="hover:text-[#111A4A] dark:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#111A4A] dark:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
