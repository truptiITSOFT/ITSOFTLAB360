"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { products } from "@/components/Products";
import { Users2, BarChart3, TrendingUp, Building2, Truck, Handshake, Network, UserPlus, GraduationCap, ShoppingBag, ShieldCheck, FileText, ListOrdered } from "lucide-react";

// The 12 exact solutions provided by the user
const solutions = [
  {
    id: "01",
    title: "Digital Transformation",
    subtitle: "Modernize traditional business processes with cloud-based platforms, real-time data, intelligent dashboards, and connected digital workflows.",
    relevant: ["ERP", "CRM", "HRMS", "Document Management System", "Learning Management System"]
  },
  {
    id: "02",
    title: "Process Automation",
    subtitle: "Automate repetitive and time-consuming activities such as approvals, attendance, billing, lead follow-ups, order processing, inventory updates, and document handling.",
    relevant: ["ERP", "HRMS", "CRM", "Marketing Automation", "Sales Force Automation", "Document Management System"]
  },
  {
    id: "03",
    title: "Business Intelligence & Analytics",
    subtitle: "Convert business data into meaningful dashboards, reports, forecasts, and performance insights to support faster and more informed decision-making.",
    relevant: ["ERP", "CRM", "HRMS", "Dealer Management System", "Vendor Management System", "Supply Chain & Logistics"]
  },
  {
    id: "04",
    title: "Workflow Optimization",
    subtitle: "Create structured workflows for approvals, tasks, employee operations, sales activities, procurement, inventory movement, and customer service.",
    relevant: ["HRMS", "ERP", "CRM", "Queue Management System", "Vendor Management System", "Document Management System"]
  },
  {
    id: "05",
    title: "System Integration",
    subtitle: "Connect departments, business applications, databases, third-party services, payment systems, communication platforms, and operational tools through one integrated ecosystem.",
    relevant: ["ERP", "CRM", "POS", "HRMS", "Supply Chain & Logistics", "Marketing Automation"]
  },
  {
    id: "06",
    title: "Franchise Enablement",
    subtitle: "Help franchise owners manage multiple branches, employees, customers, inventory, sales, documents, training, and performance through centralized business systems.",
    relevant: ["ERP", "CRM", "POS", "HRMS", "Learning Management System", "Dealer Management System"]
  },
  {
    id: "07",
    title: "Retail & Customer Experience Solutions",
    subtitle: "Improve customer service with faster billing, organized queues, personalized communication, loyalty management, lead tracking, and seamless retail operations.",
    relevant: ["POS", "CRM", "Queue Management System", "Marketing Automation"]
  },
  {
    id: "08",
    title: "Workforce & Employee Solutions",
    subtitle: "Manage the complete employee lifecycle, including recruitment, onboarding, attendance, payroll, leave, performance, training, and employee documentation.",
    relevant: ["HRMS", "Learning Management System", "Document Management System"]
  },
  {
    id: "09",
    title: "Business Operations Solutions",
    subtitle: "Centralize finance, procurement, inventory, vendors, dealers, documents, orders, warehouses, and daily operational activities.",
    relevant: ["ERP", "Vendor Management System", "Dealer Management System", "Document Management System"]
  },
  {
    id: "10",
    title: "Customer Growth Solutions",
    subtitle: "Generate more leads, automate marketing campaigns, manage sales teams, improve conversions, and build stronger customer relationships.",
    relevant: ["CRM", "Marketing Automation", "Sales Force Automation"]
  },
  {
    id: "11",
    title: "Supply Chain & Distribution Solutions",
    subtitle: "Manage inventory, warehouses, suppliers, dealers, shipments, procurement, logistics, order fulfilment, and product distribution.",
    relevant: ["Supply Chain & Logistics", "Vendor Management System", "Dealer Management System", "ERP"]
  },
  {
    id: "12",
    title: "Learning & Knowledge Solutions",
    subtitle: "Deliver employee training, assessments, certifications, digital learning programs, learning progress tracking, and organizational knowledge management.",
    relevant: ["Learning Management System", "Document Management System", "HRMS"]
  }
];

// Product details matching the exact style of the original simple carts
const productDetails: Record<string, any> = {
  "CRM": {
    name: "CRM Solution",
    desc: "Build meaningful customer relationships with complete visibility into leads, opportunities, and customer interactions.",
    icon: <Users2 size={24} className="text-[#EB3158]" />,
    bestFor: ["Sales Teams", "Marketing Teams", "Customer Success Teams"]
  },
  "Marketing Automation": {
    name: "Marketing Automation Solution",
    desc: "Create personalized campaigns, automate customer journeys, and convert leads faster.",
    icon: <BarChart3 size={24} className="text-pink-400" />,
    bestFor: ["Marketing Teams", "Digital Agencies", "Growing Businesses"]
  },
  "Sales Force Automation": {
    name: "Sales Force Automation Solution",
    desc: "Help sales teams manage leads, visits, opportunities, and revenue growth.",
    icon: <TrendingUp size={24} className="text-emerald-400" />,
    bestFor: ["Field Sales", "Enterprise Sales", "Distribution Businesses"]
  },
  "ERP": {
    name: "ERP Solution",
    desc: "Connect finance, inventory, procurement, production, and operations in one intelligent system.",
    icon: <Building2 size={24} className="text-green-400" />,
    bestFor: ["Manufacturing", "Trading", "Enterprise Companies"]
  },
  "Supply Chain & Logistics": {
    name: "Supply Chain & Logistics Solution",
    desc: "Optimize purchasing, warehouses, transportation, inventory, and delivery operations.",
    icon: <Truck size={24} className="text-[#EB3158]" />,
    bestFor: ["Manufacturing", "Distribution", "Logistics Companies"]
  },
  "Vendor Management System": {
    name: "Vendor Management Solution",
    desc: "Simplify vendor relationships, purchasing workflows, contracts, and supplier performance.",
    icon: <Handshake size={24} className="text-teal-400" />,
    bestFor: ["Enterprises", "Procurement Teams"]
  },
  "Dealer Management System": {
    name: "Dealer Management Solution",
    desc: "Manage your dealer ecosystem, orders, inventory, incentives, and channel performance.",
    icon: <Network size={24} className="text-orange-400" />,
    bestFor: ["Manufacturers", "Distributors", "Channel Businesses"]
  },
  "HRMS": {
    name: "HRMS Solution",
    desc: "Manage employees, payroll, attendance, recruitment, and performance from one platform.",
    icon: <UserPlus size={24} className="text-[#EB3158]" />,
    bestFor: ["All Organizations"]
  },
  "Learning Management System": {
    name: "Learning Management Solution",
    desc: "Train employees, manage courses, assessments, and professional development.",
    icon: <GraduationCap size={24} className="text-purple-400" />,
    bestFor: ["Enterprises", "Training Organizations"]
  },
  "POS": {
    name: "POS Solution",
    desc: "Manage billing, inventory, payments, and customer transactions effortlessly.",
    icon: <ShoppingBag size={24} className="text-amber-400" />,
    bestFor: ["Retail", "Restaurants", "Supermarkets"]
  },
  "Document Management System": {
    name: "Document Management Solution",
    desc: "Securely store, manage, approve, and access business documents anytime.",
    icon: <FileText size={24} className="text-rose-400" />,
    bestFor: ["Enterprise Teams", "Compliance Departments"]
  },
  "Queue Management System": {
    name: "Queue Management Solution",
    desc: "Optimize customer flow, reduce wait times, and improve service efficiency.",
    icon: <ListOrdered size={24} className="text-blue-400" />,
    bestFor: ["Retail", "Hospitals", "Banks"]
  }
};

function SolutionsCategoriesContent() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  const filteredSolutions = selectedId 
    ? solutions.filter(s => s.id === selectedId)
    : solutions;

  return (
    <section className="py-20 relative z-10" id="categories">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#111A4A] dark:text-white transition-colors">
              Solutions Built For <span className="text-[#EB3158] dark:text-blue-500 text-glow">Every Business Function</span>
            </h2>
            <p className="text-[#15172B]/80 dark:text-gray-400 text-lg max-w-2xl mx-auto transition-colors">
              Power every department with integrated solutions that drive growth, efficiency, and operational excellence.
            </p>
          </motion.div>
        </div>

        <div className="space-y-12">
          {filteredSolutions.map((solution, catIndex) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.05 }}
              className="bg-white/90 dark:bg-[#0f172a]/60 backdrop-blur-xl border border-blue-200 dark:border-blue-500/10 rounded-3xl p-6 md:p-8 hover:border-blue-400 dark:hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            >
              {/* Category Header (Box styling exactly like the old image) */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8 border-b border-[#111A4A]/10 dark:border-gray-800 pb-4 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.5)] bg-[#EB3158]">
                  {solution.id}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1 transition-colors text-blue-700 dark:text-blue-400">
                    {solution.title}
                  </h3>
                  <p className="text-[#15172B]/60 dark:text-gray-400 text-sm transition-colors">
                    {solution.subtitle}
                  </p>
                </div>
              </div>

              {/* Solutions Grid (Carts exactly like the old inner carts image) */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {solution.relevant.map((prodName, solIndex) => {
                  const prod = productDetails[prodName];
                  if (!prod) return null;

                  return (
                    <div 
                      key={solIndex}
                      className="bg-gray-50/80 dark:bg-[#020617]/50 rounded-2xl p-6 border border-[#111A4A]/10 dark:border-gray-800 hover:border-blue-300 dark:hover:border-gray-600 transition-colors group relative overflow-hidden flex flex-col h-full"
                    >
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      
                      <div className="flex items-start gap-4 mb-4 relative z-10 flex-grow">
                        <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-[#0f172a] border border-[#111A4A]/5 dark:border-gray-700/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform overflow-hidden relative shadow-sm">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent dark:from-white/5 opacity-50"></div>
                          <div className="flex items-center justify-center w-full h-full relative z-10">
                            {prod.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[#15172B] dark:text-white text-lg font-bold mb-2 group-hover:text-[#EB3158] dark:group-hover:text-[#EB3158] transition-colors">
                            {prod.name}
                          </h4>
                          <p className="text-[#15172B]/80 dark:text-gray-400 text-sm leading-relaxed mb-4 transition-colors">
                            {prod.desc}
                          </p>
                        </div>
                      </div>
                      
                      {/* Best For Section */}
                      <div className="pt-4 border-t border-[#111A4A]/10 dark:border-gray-800/50 relative z-10 transition-colors">
                        <span className="text-xs text-[#15172B]/60 dark:text-gray-500 font-semibold mb-2 block transition-colors">Best For:</span>
                        <div className="flex flex-wrap gap-2">
                          {prod.bestFor.map((item: string, idx: number) => (
                            <span key={idx} className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-800/50 text-slate-700 dark:text-gray-300 transition-colors">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SolutionsCategories() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading solutions...</div>}>
      <SolutionsCategoriesContent />
    </Suspense>
  );
}
