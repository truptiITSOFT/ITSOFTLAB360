"use client";

import { motion } from "framer-motion";
import { Users2, BarChart3, TrendingUp, Building2, Truck, Handshake, Network, UserPlus, GraduationCap, ShoppingBag, ShieldCheck, FileText } from "lucide-react";

const categories = [
  {
    id: "A",
    title: "Customer Growth Solutions",
    subtitle: "Attract, engage, and retain customers with powerful digital tools.",
    color: "blue",
    solutions: [
      {
        name: "CRM Solution",
        desc: "Build meaningful customer relationships with complete visibility into leads, opportunities, and customer interactions.",
        icon: <Users2 size={24} className="text-blue-400" />,
        bestFor: ["Sales Teams", "Marketing Teams", "Customer Success Teams"]
      },
      {
        name: "Marketing Automation Solution",
        desc: "Create personalized campaigns, automate customer journeys, and convert leads faster.",
        icon: <BarChart3 size={24} className="text-pink-400" />,
        bestFor: ["Marketing Teams", "Digital Agencies", "Growing Businesses"]
      },
      {
        name: "Sales Force Automation Solution",
        desc: "Help sales teams manage leads, visits, opportunities, and revenue growth.",
        icon: <TrendingUp size={24} className="text-emerald-400" />,
        bestFor: ["Field Sales", "Enterprise Sales", "Distribution Businesses"]
      }
    ]
  },
  {
    id: "B",
    title: "Business Operations Solutions",
    subtitle: "Run your business smarter with connected operations.",
    color: "blue",
    solutions: [
      {
        name: "ERP Solution",
        desc: "Connect finance, inventory, procurement, production, and operations in one intelligent system.",
        icon: <Building2 size={24} className="text-green-400" />,
        bestFor: ["Manufacturing", "Trading", "Enterprise Companies"]
      },
      {
        name: "Supply Chain & Logistics Solution",
        desc: "Optimize purchasing, warehouses, transportation, inventory, and delivery operations.",
        icon: <Truck size={24} className="text-blue-400" />,
        bestFor: ["Manufacturing", "Distribution", "Logistics Companies"]
      },
      {
        name: "Vendor Management Solution",
        desc: "Simplify vendor relationships, purchasing workflows, contracts, and supplier performance.",
        icon: <Handshake size={24} className="text-teal-400" />,
        bestFor: ["Enterprises", "Procurement Teams"]
      },
      {
        name: "Dealer Management Solution",
        desc: "Manage your dealer ecosystem, orders, inventory, incentives, and channel performance.",
        icon: <Network size={24} className="text-orange-400" />,
        bestFor: ["Manufacturers", "Distributors", "Channel Businesses"]
      }
    ]
  },
  {
    id: "C",
    title: "Workforce & Employee Solutions",
    subtitle: "Build productive teams with digital workforce management.",
    color: "blue",
    solutions: [
      {
        name: "HRMS Solution",
        desc: "Manage employees, payroll, attendance, recruitment, and performance from one platform.",
        icon: <UserPlus size={24} className="text-blue-400" />,
        bestFor: ["All Organizations"]
      },
      {
        name: "Learning Management Solution",
        desc: "Train employees, manage courses, assessments, and professional development.",
        icon: <GraduationCap size={24} className="text-purple-400" />,
        bestFor: ["Enterprises", "Training Organizations"]
      }
    ]
  },
  {
    id: "D",
    title: "Retail & Customer Experience Solutions",
    subtitle: "Deliver faster and smarter customer experiences.",
    color: "blue",
    solutions: [
      {
        name: "POS Solution",
        desc: "Manage billing, inventory, payments, and customer transactions effortlessly.",
        icon: <ShoppingBag size={24} className="text-amber-400" />,
        bestFor: ["Retail", "Restaurants", "Supermarkets"]
      }
    ]
  },
  {
    id: "E",
    title: "Quality & Compliance Solutions",
    subtitle: "Improve quality, compliance, and business control.",
    color: "blue",
    solutions: [
      {
        name: "Quality Management Solution (QMS)",
        desc: "Digitize audits, inspections, compliance, CAPA, and quality processes.",
        icon: <ShieldCheck size={24} className="text-emerald-400" />,
        bestFor: ["Manufacturing", "Healthcare", "Regulated Industries"]
      },
      {
        name: "Document Management Solution",
        desc: "Securely store, manage, approve, and access business documents anytime.",
        icon: <FileText size={24} className="text-rose-400" />,
        bestFor: ["Enterprise Teams", "Compliance Departments"]
      }
    ]
  }
];

export default function SolutionsCategories() {
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
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white transition-colors">
              Solutions Built For <span className="text-blue-600 dark:text-blue-500 text-glow">Every Business Function</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto transition-colors">
              Power every department with integrated solutions that drive growth, efficiency, and operational excellence.
            </p>
          </motion.div>
        </div>

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="bg-white/90 dark:bg-[#0f172a]/60 backdrop-blur-xl border border-blue-200 dark:border-blue-500/10 rounded-3xl p-6 md:p-8 hover:border-blue-400 dark:hover:border-blue-500/30 transition-colors shadow-sm dark:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            >
              {/* Category Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.5)] ${
                  category.color === 'blue' ? 'bg-blue-600' :
                  category.color === 'indigo' ? 'bg-indigo-600' :
                  category.color === 'purple' ? 'bg-purple-600' : 'bg-blue-600'
                }`}>
                  {category.id}
                </div>
                <div>
                  <h3 className={`text-xl md:text-2xl font-bold mb-1 transition-colors ${
                    category.color === 'blue' ? 'text-blue-700 dark:text-blue-400' :
                    category.color === 'indigo' ? 'text-indigo-700 dark:text-indigo-400' :
                    category.color === 'purple' ? 'text-purple-700 dark:text-purple-400' : 'text-blue-700 dark:text-blue-400'
                  }`}>{category.title}</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm transition-colors">{category.subtitle}</p>
                </div>
              </div>

              {/* Solutions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {category.solutions.map((solution, solIndex) => (
                  <div 
                    key={solIndex}
                    className="bg-gray-50/80 dark:bg-[#020617]/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-gray-600 transition-colors group relative overflow-hidden flex flex-col h-full"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    
                    <div className="flex items-start gap-4 mb-4 relative z-10 flex-grow">
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        {solution.icon}
                      </div>
                      <div>
                        <h4 className="text-slate-800 dark:text-white text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{solution.name}</h4>
                        <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-4 transition-colors">
                          {solution.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800/50 relative z-10 transition-colors">
                      <span className="text-xs text-slate-500 dark:text-gray-500 font-semibold mb-2 block transition-colors">Best For:</span>
                      <div className="flex flex-wrap gap-2">
                        {solution.bestFor.map((item, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-800/50 text-slate-700 dark:text-gray-300 transition-colors">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
