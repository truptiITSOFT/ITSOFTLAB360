"use client";
import { motion } from "framer-motion";
import { products } from "@/components/Products";

export default function ProductsSlider() {
  return (
    <section className="py-12 bg-white/50 dark:bg-[#060D1E] overflow-hidden relative border-y border-[#111A4A]/5 dark:border-white/5">
      <div className="mb-8 text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111A4A] dark:text-white tracking-tight">
          Explore Our Full Portfolio
        </h2>
      </div>

      <div className="relative flex">
        {/* Fade masks for smooth edges */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FBFAF5] dark:from-[#060D1E] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FBFAF5] dark:from-[#060D1E] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 w-max items-stretch"
        >
          {[...products, ...products].map((product, i) => (
            <div
              key={i}
              className="w-[224px] sm:w-[256px] shrink-0 bg-white dark:bg-[#0A1125] rounded-[1.5rem] p-6 relative group hover:-translate-y-2 transition-all duration-300 shadow-[0_4px_20px_rgba(17,26,74,0.05)] dark:shadow-none border border-slate-100 dark:border-white/5 hover:shadow-[0_15px_30px_rgba(17,26,74,0.1)] dark:hover:shadow-none hover:border-blue-100 dark:hover:border-blue-500/30 flex flex-col cursor-pointer"
            >
              <div className={`absolute top-4 left-4 w-7 h-7 rounded-full flex items-center justify-center text-white text-[8.8px] font-bold ${product.color} shadow-md z-20`}>
                {product.id}
              </div>
              
              <div className="w-24 h-24 mt-4 mb-6 relative z-10 flex items-center justify-center self-center">
                <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 transition-opacity duration-500 ${product.color}`}></div>
                {product.graphic}
              </div>
              
              <h4 className="font-bold text-[#15172B] dark:text-slate-100 text-lg mb-2 leading-tight transition-colors z-10 text-center">
                {product.name}
              </h4>
              
              <p className="text-[#15172B]/60 dark:text-slate-400 text-[10.4px] leading-relaxed transition-colors z-10 text-center">
                {product.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
