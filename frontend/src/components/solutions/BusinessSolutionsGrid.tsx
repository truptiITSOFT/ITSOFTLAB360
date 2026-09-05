"use client";

import { motion } from "framer-motion";
import { softwareProducts } from "@/data/solutionsData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  },
};

export default function BusinessSolutionsGrid() {
  return (
    <section id="solutions-grid" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold text-[#111A4A] mb-6 tracking-tight"
          >
            Our Business Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-[#15172B]/70"
          >
            Comprehensive software suite designed to manage every aspect of your enterprise operations seamlessly.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {softwareProducts.map((product) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                // variants={cardVariants}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-[0.03] rounded-2xl transition-opacity duration-300 pointer-events-none`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${product.color} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#111A4A] mb-3 group-hover:text-[#20B486] transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-[#15172B]/70 text-sm leading-relaxed mb-6 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 overflow-hidden">
                    <Link href={`/products/${product.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#111A4A] group-hover:text-[#EB3158] transition-colors relative">
                      Learn More 
                      <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EB3158] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
