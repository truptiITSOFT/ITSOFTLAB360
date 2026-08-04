"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const features = [
  {
    title: "Pay As You Go",
    description: "Flexible pricing model where you pay only for what you use, making it cost-effective and scalable as your business grows.",
    image: "/features/feature_pay_as_you_go_1785819596286.png"
  },
  {
    title: "Chat Between Users",
    description: "Built-in internal chat enables real-time communication between users, improving collaboration and task coordination.",
    image: "/features/feature_chat_users_1785819606425.png"
  },
  {
    title: "Unlimited Users",
    description: "No per-user licensing cost. Add unlimited users with role-based access control for secure system usage.",
    image: "/features/feature_unlimited_users_1785819616078.png"
  },
  {
    title: "Audit Trail",
    description: "Every transaction and activity is logged for accountability, transparency, and compliance, preventing unauthorized changes.",
    image: "/features/feature_audit_trail_1785819628928.png"
  },
  {
    title: "Multiple Inventory Location",
    description: "Track stock movement across multiple warehouses, godowns, or sites with accurate availability and control.",
    image: "/features/feature_multiple_inventory_1785819656283.png"
  },
  {
    title: "GST E-Invoice & E-Way Bill",
    description: "Generate GST-compliant e-invoices and e-way bills directly from ERP with seamless third party/government portal integration.",
    image: "/features/feature_gst_einvoice_1785819669049.png"
  },
  {
    title: "Web Based & Cloud Computing",
    description: "No IT infrastructure needed. Securely access your cloud-based ERP anytime, anywhere with centralized data.",
    image: "/features/feature_web_cloud_1785819679027.png"
  },
  {
    title: "Dynamic Dashboards",
    description: "Get real-time business insights through interactive dashboards tailored for owners and teams, enabling faster, data-driven decisions.",
    image: "/features/feature_dynamic_dashboards_1785819688632.png"
  },
  {
    title: "Email & WhatsApp Integration",
    description: "Send purchase orders, invoices, approvals, and notifications instantly via Email and WhatsApp, reducing manual follow-ups.",
    image: "/features/feature_email_whatsapp_1785819717218.png"
  },
  {
    title: "Mobile & Tab Compatibility",
    description: "Access the ERP seamlessly on desktop, mobile, or tablet without installation, ensuring flexibility and uninterrupted operations.",
    image: "/features/feature_mobile_tab_1785819728634.png"
  },
  {
    title: "Data Auto Backup",
    description: "Automatic cloud backups ensure data security, reliability, and quick recovery without manual intervention.",
    image: "/features/feature_data_backup_1785819740881.png"
  },
  {
    title: "Customizable Software",
    description: "ERP is 90-95% industry-ready and easily customizable to match your specific business workflows and processes.",
    image: "/features/feature_customizable_software_1785819751353.png"
  }
];

export default function FeaturesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900/30 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-12 relative">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-[#FF3B30]"></div>
            <h3 className="text-[#FF3B30] font-bold tracking-widest text-sm uppercase">Unique Features</h3>
            <div className="h-px w-12 bg-[#FF3B30]"></div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-[2.75rem] font-bold text-gray-900 dark:text-white leading-tight"
          >
            Your All-in-One Business <br className="hidden md:block" /> Management Solution
          </motion.h2>
        </div>

        <div className="relative group mx-auto">
          <button 
            onClick={scrollLeft}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-[#FF3B30] dark:hover:text-[#FF3B30] hover:scale-110 transition-all focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.1, 0.5) }}
                className="snap-start shrink-0 w-[280px] sm:w-[340px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group/card border border-gray-100 dark:border-gray-700 flex flex-col"
              >
                <div className="relative h-[220px] w-full overflow-hidden bg-gray-50 dark:bg-gray-900 p-2">
                  <div className="w-full h-full relative rounded-xl overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow text-center">
                  <h4 className="text-[1.35rem] font-semibold text-[#0066CC] dark:text-blue-400 mb-3">{feature.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={scrollRight}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-[#FF3B30] dark:hover:text-[#FF3B30] hover:scale-110 transition-all focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
