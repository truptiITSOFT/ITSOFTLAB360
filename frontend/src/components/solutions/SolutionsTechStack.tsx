"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data/solutionsData";

export default function SolutionsTechStack() {
  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4">
            Powered By Modern Technology
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Our solutions are built on a robust, scalable, and secure enterprise technology stack.
          </p>
        </div>

        {/* Logo Cloud / Marquee Effect */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {techStack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                <span className="font-bold text-lg">{tech.name[0]}</span>
              </div>
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
