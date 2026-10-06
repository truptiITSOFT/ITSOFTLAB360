"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileText, MessagesSquare, CheckCircle, GraduationCap, Rocket, TrendingUp } from "lucide-react";

const STEPS = [
  { id: "01", title: "Apply", desc: "Submit your franchise application to our global team.", icon: FileText },
  { id: "02", title: "Discussion", desc: "Discuss business goals, regional exclusive rights, and potential ROI.", icon: MessagesSquare },
  { id: "03", title: "Partner Onboarding", desc: "Sign the agreement and receive your central franchise dashboard.", icon: CheckCircle },
  { id: "04", title: "Product Training", desc: "Complete technical and sales training for all 12 products.", icon: GraduationCap },
  { id: "05", title: "Market Launch", desc: "Begin offering enterprise solutions to businesses in your region.", icon: Rocket },
  { id: "06", title: "Grow Your Network", desc: "Scale by hiring teams and dominating multiple industry segments.", icon: TrendingUp },
];

export default function FranchiseJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section 
      ref={containerRef}
      className="relative py-32 bg-[#f8fafc]  transition-colors duration-300"
    >
      <div className="max-w-[800px] mx-auto px-6 md:px-10 relative z-10">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[#111A4A]  mb-4"
          >
            Your Journey to <span className="text-[#EB3158]">Success</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#15172B]/70  max-w-2xl mx-auto"
          >
            Follow a proven, structured path to launch and scale your IT franchise business.
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-200  md:-translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-blue-500 to-[#EB3158]"
              style={{
                height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-24 relative z-10">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={step.id} className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Area */}
                  <div className={`pl-20 md:pl-0 w-full md:w-1/2 ${isEven ? 'md:pl-16 md:text-left' : 'md:pr-16 md:text-right'}`}>
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                      className="bg-white  p-6 rounded-2xl shadow-sm border border-gray-100  hover:shadow-xl  transition-all group"
                    >
                      <div className={`flex items-center gap-4 mb-3 ${!isEven && 'md:flex-row-reverse'}`}>
                         <span className="text-3xl font-black text-gray-200  group-hover:text-blue-100  transition-colors">
                           {step.id}
                         </span>
                         <h3 className="text-xl font-bold text-[#111A4A]  group-hover:text-blue-600  transition-colors">
                           {step.title}
                         </h3>
                      </div>
                      <p className="text-sm text-[#15172B]/70 ">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Icon Node centered on the line */}
                  <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-[#f8fafc]  rounded-full border-4 border-white  flex items-center justify-center transform md:-translate-x-1/2 mt-4 md:mt-0 z-20 shadow-[0_0_15px_rgba(0,0,0,0.1)] ">
                     <motion.div
                       initial={{ scale: 0 }}
                       whileInView={{ scale: 1 }}
                       viewport={{ once: true, margin: "-80px" }}
                       transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                       className="w-10 h-10 rounded-full bg-blue-100  text-blue-600  flex items-center justify-center border border-blue-200 "
                     >
                       <step.icon size={18} />
                     </motion.div>
                  </div>

                  {/* Empty spacer for flex layout */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
