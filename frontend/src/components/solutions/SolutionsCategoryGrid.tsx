"use client";
import { useState } from "react";
import { 
  Users, UserCircle, Briefcase, Store,
  ShoppingBag, Megaphone, Truck, TrendingUp,
  GraduationCap, CreditCard, ShieldCheck, FolderOpen,
  ArrowRight, Box, UserCheck, LayoutDashboard, Database, Headset,
  Globe, Cpu, Zap, Activity, Layers, Cloud, Code, GitMerge, FileText, ChartBar,
  Smartphone, BookOpen, BarChart3, Settings, ClipboardList, CheckSquare, ListTodo, MonitorDot, Link, Workflow
} from "lucide-react";

import CRMMockup from "@/components/mockups/CRMMockup";
import SupplyChainMockup from "@/components/mockups/SupplyChainMockup";
import ERPMockup from "@/components/mockups/ERPMockup";
import DMSMockup from "@/components/mockups/DMSMockup";
import SalesForceMockup from "@/components/mockups/SalesForceMockup";
import VendorMockup from "@/components/mockups/VendorMockup";
import HRMSMockup from "@/components/mockups/HRMSMockup";
import DealerMockup from "@/components/mockups/DealerMockup";
import AIAutomationMockup from "@/components/mockups/AIAutomationMockup";
import LMSMockup from "@/components/mockups/LMSMockup";
import QMSMockup from "@/components/mockups/QMSMockup";

import SolutionModal from "./SolutionModal";

const SOLUTION_CATEGORIES = [
  {
    id: "dt",
    categoryTitle: "01. Digital Transformation",
    categoryDesc: "Modernize your business with connected digital solutions that improve efficiency, visibility, and scalability.",
    iconLetter: "A",
    iconBg: "bg-blue-600",
    solutions: [
      {
        id: "dt-process-automation",
        title: "Process Automation Solution",
        icon: Cpu,
        color: "text-blue-500",
        bg: "bg-blue-50",
        desc: "Automate repetitive business processes, reduce manual effort, and improve operational efficiency across your organization.",
        bestFor: ["Growing Businesses", "Enterprise Teams", "Operations Teams"],
        comp: AIAutomationMockup
      },
      {
        id: "dt-bi-analytics",
        title: "Business Intelligence & Analytics Solution",
        icon: Activity,
        color: "text-cyan-500",
        bg: "bg-cyan-50",
        desc: "Turn business data into actionable insights through intelligent dashboards, reports, and real-time analytics.",
        bestFor: ["Business Leaders", "Data Teams", "Enterprise Organizations"],
        comp: SalesForceMockup
      },
      {
        id: "dt-system-integration",
        title: "System Integration Solution",
        icon: Layers,
        color: "text-indigo-500",
        bg: "bg-indigo-50",
        desc: "Connect your business applications, platforms, and data into one unified digital ecosystem.",
        bestFor: ["IT Teams", "Enterprise Businesses", "Multi-System Organizations"],
        comp: SalesForceMockup
      }
    ]
  },
  {
    id: "pa",
    categoryTitle: "02. Process Automation",
    categoryDesc: "Automate everyday operations and eliminate repetitive manual tasks with intelligent digital workflows.",
    iconLetter: "B",
    iconBg: "bg-amber-500",
    solutions: [
      {
        id: "pa-hrms",
        title: "HRMS Automation Solution",
        icon: Users,
        color: "text-amber-500",
        bg: "bg-amber-50",
        desc: "Automate employee records, attendance, leave, payroll, and workforce management processes.",
        bestFor: ["HR Teams", "Growing Businesses", "Enterprise Organizations"],
        comp: HRMSMockup
      },
      {
        id: "pa-marketing",
        title: "Marketing Automation Solution",
        icon: Megaphone,
        color: "text-orange-500",
        bg: "bg-orange-50",
        desc: "Automate campaigns, customer journeys, lead nurturing, and marketing activities.",
        bestFor: ["Marketing Teams", "Digital Agencies", "Growing Businesses"],
        comp: SalesForceMockup
      },
      {
        id: "pa-workflow",
        title: "Workflow Automation Solution",
        icon: Zap,
        color: "text-rose-500",
        bg: "bg-rose-50",
        desc: "Create automated workflows that connect teams, approvals, tasks, and business processes.",
        bestFor: ["Operations Teams", "Process Managers", "Enterprise Businesses"],
        comp: AIAutomationMockup
      }
    ]
  },
  {
    id: "bi",
    categoryTitle: "03. Business Intelligence & Analytics",
    categoryDesc: "Transform business data into meaningful insights that help teams make faster and smarter decisions.",
    iconLetter: "C",
    iconBg: "bg-pink-600",
    solutions: [
      {
        id: "bi-business",
        title: "Business Analytics Solution",
        icon: BarChart3,
        color: "text-pink-500",
        bg: "bg-pink-50",
        desc: "Monitor business performance with centralized dashboards, KPIs, reports, and actionable insights.",
        bestFor: ["Business Leaders", "Management Teams", "Enterprise Organizations"],
        comp: SalesForceMockup
      },
      {
        id: "bi-sales",
        title: "Sales Analytics Solution",
        icon: TrendingUp,
        color: "text-rose-500",
        bg: "bg-rose-50",
        desc: "Track sales performance, revenue, leads, conversions, and team productivity in real time.",
        bestFor: ["Sales Teams", "Sales Managers", "Enterprise Sales"],
        comp: SalesForceMockup
      },
      {
        id: "bi-operations",
        title: "Operations Analytics Solution",
        icon: LayoutDashboard,
        color: "text-purple-500",
        bg: "bg-purple-50",
        desc: "Analyze inventory, operations, workforce, logistics, and business performance from one platform.",
        bestFor: ["Operations Teams", "Supply Chain Teams", "Business Managers"],
        comp: ERPMockup
      }
    ]
  },
  {
    id: "wo",
    categoryTitle: "04. Workflow Optimization",
    categoryDesc: "Streamline complex business processes, eliminate bottlenecks, and help teams work faster.",
    iconLetter: "D",
    iconBg: "bg-indigo-600",
    solutions: [
      {
        id: "wo-approval",
        title: "Approval Workflow Solution",
        icon: CheckSquare,
        color: "text-indigo-500",
        bg: "bg-indigo-50",
        desc: "Digitize approvals and eliminate unnecessary paperwork with structured approval processes.",
        bestFor: ["Enterprise Teams", "Finance Teams", "Operations Teams"],
        comp: DMSMockup
      },
      {
        id: "wo-task",
        title: "Task Management Solution",
        icon: ListTodo,
        color: "text-violet-500",
        bg: "bg-violet-50",
        desc: "Organize tasks, responsibilities, deadlines, and team activities through centralized workflows.",
        bestFor: ["Project Teams", "Operations Teams", "Growing Businesses"],
        comp: SalesForceMockup
      },
      {
        id: "wo-monitoring",
        title: "Process Monitoring Solution",
        icon: MonitorDot,
        color: "text-blue-500",
        bg: "bg-blue-50",
        desc: "Track workflow progress, identify bottlenecks, and improve operational performance.",
        bestFor: ["Managers", "Operations Teams", "Enterprise Organizations"],
        comp: SalesForceMockup
      }
    ]
  },
  {
    id: "si",
    categoryTitle: "05. System Integration",
    categoryDesc: "Connect your business systems and create a seamless flow of information across your organization.",
    iconLetter: "E",
    iconBg: "bg-violet-600",
    solutions: [
      {
        id: "si-application",
        title: "Application Integration Solution",
        icon: Workflow,
        color: "text-purple-500",
        bg: "bg-purple-50",
        desc: "Connect CRM, ERP, HRMS, POS, and other business applications into one ecosystem.",
        bestFor: ["IT Teams", "Enterprise Organizations", "Growing Businesses"],
        comp: SalesForceMockup
      },
      {
        id: "si-api",
        title: "API Integration Solution",
        icon: Link,
        color: "text-fuchsia-500",
        bg: "bg-fuchsia-50",
        desc: "Enable secure and reliable data exchange between internal and external applications.",
        bestFor: ["Development Teams", "IT Teams", "Digital Businesses"],
        comp: SalesForceMockup
      },
      {
        id: "si-data",
        title: "Data Integration Solution",
        icon: Database,
        color: "text-pink-500",
        bg: "bg-pink-50",
        desc: "Centralize business data from multiple platforms for consistent reporting and decision-making.",
        bestFor: ["Data Teams", "Enterprise Organizations", "Business Leaders"],
        comp: SalesForceMockup
      }
    ]
  },
  {
    id: "fe",
    categoryTitle: "06. Franchise Enablement",
    categoryDesc: "Scale your franchise network with centralized management, standardized operations, and real-time visibility.",
    iconLetter: "F",
    iconBg: "bg-orange-600",
    solutions: [
      {
        id: "fe-franchise",
        title: "Franchise Management Solution",
        icon: Store,
        color: "text-orange-500",
        bg: "bg-orange-50",
        desc: "Manage franchise locations, partners, operations, performance, and business activities from one platform.",
        bestFor: ["Franchise Owners", "Multi-Location Businesses", "Enterprise Networks"],
        comp: DealerMockup
      },
      {
        id: "fe-dealer",
        title: "Dealer & Partner Management Solution",
        icon: UserCheck,
        color: "text-amber-600",
        bg: "bg-amber-50",
        desc: "Manage partner onboarding, orders, performance, communication, and business relationships.",
        bestFor: ["Manufacturers", "Dealer Networks", "Distribution Businesses"],
        comp: VendorMockup
      },
      {
        id: "fe-centralized",
        title: "Centralized Operations Solution",
        icon: Briefcase,
        color: "text-red-500",
        bg: "bg-red-50",
        desc: "Standardize processes, monitor locations, and maintain consistent operations across your franchise network.",
        bestFor: ["Franchise Networks", "Retail Chains", "Multi-Branch Businesses"],
        comp: ERPMockup
      }
    ]
  },
  {
    id: "rce",
    categoryTitle: "07. Retail & Customer Experience Solutions",
    categoryDesc: "Deliver seamless retail experiences while managing sales, customers, inventory, and store operations.",
    iconLetter: "G",
    iconBg: "bg-teal-600",
    solutions: [
      {
        id: "rce-pos",
        title: "POS Solution",
        icon: CreditCard,
        color: "text-teal-500",
        bg: "bg-teal-50",
        desc: "Manage billing, transactions, products, customers, inventory, and sales from one powerful platform.",
        bestFor: ["Retail Businesses", "Restaurants", "Multi-Store Businesses"],
        comp: SalesForceMockup
      },
      {
        id: "rce-cx",
        title: "Customer Experience Solution",
        icon: Headset,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        desc: "Create personalized customer experiences with centralized customer data, interactions, and service management.",
        bestFor: ["Retail Brands", "Service Businesses", "Customer Success Teams"],
        comp: CRMMockup
      },
      {
        id: "rce-queue",
        title: "Queue Management Solution",
        icon: Users,
        color: "text-cyan-500",
        bg: "bg-cyan-50",
        desc: "Improve customer flow with digital queues, token management, appointments, and real-time updates.",
        bestFor: ["Hospitals", "Banks", "Service Businesses"],
        comp: SalesForceMockup
      }
    ]
  },
  {
    id: "we",
    categoryTitle: "08. Workforce & Employee Solutions",
    categoryDesc: "Manage your workforce efficiently with connected tools for employees, HR teams, and management.",
    iconLetter: "H",
    iconBg: "bg-purple-600",
    solutions: [
      {
        id: "we-hrms",
        title: "HRMS Solution",
        icon: Users,
        color: "text-purple-500",
        bg: "bg-purple-50",
        desc: "Manage employee records, attendance, leave, payroll, recruitment, and workforce operations.",
        bestFor: ["HR Teams", "Growing Businesses", "Enterprise Organizations"],
        comp: HRMSMockup
      },
      {
        id: "we-employee",
        title: "Employee Management Solution",
        icon: UserCircle,
        color: "text-violet-500",
        bg: "bg-violet-50",
        desc: "Centralize employee information, roles, departments, documents, and organizational structures.",
        bestFor: ["HR Teams", "Managers", "Enterprise Businesses"],
        comp: HRMSMockup
      },
      {
        id: "we-analytics",
        title: "Workforce Analytics Solution",
        icon: Activity,
        color: "text-fuchsia-500",
        bg: "bg-fuchsia-50",
        desc: "Monitor employee performance, attendance, productivity, and workforce trends through actionable insights.",
        bestFor: ["HR Leaders", "Business Managers", "Enterprise Organizations"],
        comp: HRMSMockup
      }
    ]
  },
  {
    id: "bo",
    categoryTitle: "09. Business Operations Solutions",
    categoryDesc: "Simplify daily business operations with centralized systems for resources, vendors, inventory, and processes.",
    iconLetter: "I",
    iconBg: "bg-blue-800",
    solutions: [
      {
        id: "bo-erp",
        title: "ERP Solution",
        icon: Briefcase,
        color: "text-blue-600",
        bg: "bg-blue-50",
        desc: "Connect finance, procurement, inventory, operations, and business processes through one centralized platform.",
        bestFor: ["Manufacturing Businesses", "Growing Enterprises", "Multi-Department Organizations"],
        comp: ERPMockup
      },
      {
        id: "bo-vendor",
        title: "Vendor Management Solution",
        icon: UserCheck,
        color: "text-cyan-600",
        bg: "bg-cyan-50",
        desc: "Manage vendor onboarding, contracts, procurement, performance, and supplier relationships efficiently.",
        bestFor: ["Procurement Teams", "Manufacturers", "Enterprise Organizations"],
        comp: VendorMockup
      },
      {
        id: "bo-document",
        title: "Document Management Solution",
        icon: FolderOpen,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        desc: "Centralize business documents, control access, streamline approvals, and improve document accessibility.",
        bestFor: ["Enterprise Organizations", "Government Offices", "Document-Heavy Businesses"],
        comp: DMSMockup
      }
    ]
  },
  {
    id: "cg",
    categoryTitle: "10. Customer Growth Solutions",
    categoryDesc: "Attract, engage, and retain customers with powerful digital tools that accelerate business growth.",
    iconLetter: "J",
    iconBg: "bg-[#EB3158]",
    solutions: [
      {
        id: "cg-crm",
        title: "CRM Solution",
        icon: UserCircle,
        color: "text-rose-500",
        bg: "bg-rose-50",
        desc: "Build meaningful customer relationships with complete visibility into leads, opportunities, sales activities, and customer interactions.",
        bestFor: ["Sales Teams", "Marketing Teams", "Customer Success Teams"],
        comp: CRMMockup
      },
      {
        id: "cg-marketing",
        title: "Marketing Automation Solution",
        icon: Megaphone,
        color: "text-pink-500",
        bg: "bg-pink-50",
        desc: "Create personalized campaigns, automate customer journeys, and convert leads faster.",
        bestFor: ["Marketing Teams", "Digital Agencies", "Growing Businesses"],
        comp: SalesForceMockup
      },
      {
        id: "cg-salesforce",
        title: "Sales Force Automation Solution",
        icon: TrendingUp,
        color: "text-red-500",
        bg: "bg-red-50",
        desc: "Help sales teams manage leads, visits, opportunities, follow-ups, and revenue growth.",
        bestFor: ["Field Sales", "Enterprise Sales", "Distribution Businesses"],
        comp: SalesForceMockup
      }
    ]
  },
  {
    id: "sc",
    categoryTitle: "11. Supply Chain & Distribution Solutions",
    categoryDesc: "Connect procurement, inventory, warehousing, logistics, and distribution for a smarter supply chain.",
    iconLetter: "K",
    iconBg: "bg-emerald-600",
    solutions: [
      {
        id: "sc-supplychain",
        title: "Supply Chain Management Solution",
        icon: Link,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        desc: "Manage procurement, inventory, warehouses, orders, shipments, and supply chain activities from one platform.",
        bestFor: ["Manufacturers", "Distributors", "Supply Chain Teams"],
        comp: SupplyChainMockup
      },
      {
        id: "sc-warehouse",
        title: "Warehouse Management Solution",
        icon: Box,
        color: "text-teal-500",
        bg: "bg-teal-50",
        desc: "Optimize receiving, putaway, inventory, picking, transfers, and warehouse operations.",
        bestFor: ["Warehouses", "Distribution Centers", "Logistics Businesses"],
        comp: SupplyChainMockup
      },
      {
        id: "sc-dealer",
        title: "Dealer Management Solution",
        icon: Store,
        color: "text-cyan-500",
        bg: "bg-cyan-50",
        desc: "Manage dealer networks, orders, inventory, sales, schemes, and dealer performance.",
        bestFor: ["Manufacturers", "Dealer Networks", "Distribution Businesses"],
        comp: DealerMockup
      }
    ]
  },
  {
    id: "lk",
    categoryTitle: "12. Learning & Knowledge Solutions",
    categoryDesc: "Build a smarter organization by delivering learning, training, documentation, and knowledge through connected digital platforms.",
    iconLetter: "L",
    iconBg: "bg-rose-600",
    solutions: [
      {
        id: "lk-lms",
        title: "Learning Management Solution",
        icon: GraduationCap,
        color: "text-rose-600",
        bg: "bg-rose-50",
        desc: "Deliver, manage, and track courses, training programs, assessments, certifications, and employee learning.",
        bestFor: ["Educational Institutions", "Corporate Training", "Training Organizations"],
        comp: LMSMockup
      },
      {
        id: "lk-knowledge",
        title: "Knowledge Management Solution",
        icon: BookOpen,
        color: "text-orange-500",
        bg: "bg-orange-50",
        desc: "Centralize organizational knowledge, resources, guides, processes, and information for easy access.",
        bestFor: ["Enterprise Teams", "HR Teams", "Knowledge-Based Businesses"],
        comp: QMSMockup
      },
      {
        id: "lk-training",
        title: "Training & Certification Solution",
        icon: FileText,
        color: "text-pink-500",
        bg: "bg-pink-50",
        desc: "Create structured training programs, assessments, certifications, and employee development journeys.",
        bestFor: ["Corporate Teams", "Training Institutes", "Educational Organizations"],
        comp: LMSMockup
      }
    ]
  }
];

export default function SolutionsCategoryGrid() {
  const [selectedSolution, setSelectedSolution] = useState<any>(null);

  return (
    <section className="py-16 bg-[#f8fafc] font-sans pb-32">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="flex flex-col gap-12">
          {SOLUTION_CATEGORIES.map((category) => (
            <div key={category.id} className="bg-white/90 backdrop-blur-xl border border-blue-200/50 rounded-3xl p-6 md:p-8 hover:border-blue-400/50 transition-colors shadow-sm">
              
              {/* Category Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8 border-b border-[#111A4A]/10 pb-4 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.5)] ${category.iconBg}`}>
                  {category.iconLetter}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1 transition-colors text-blue-700">{category.categoryTitle}</h3>
                  <p className="text-[#15172B]/60 text-sm transition-colors">{category.categoryDesc}</p>
                </div>
              </div>

              {/* Solutions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {category.solutions.map((sol) => (
                  <div 
                    key={sol.id}
                    onClick={() => setSelectedSolution(sol)}
                    className="bg-gray-50/80 rounded-2xl p-6 border border-[#111A4A]/10 hover:border-blue-300 transition-colors group relative overflow-hidden flex flex-col h-full cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    
                    <div className="flex items-start gap-4 mb-4 relative z-10 flex-grow">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#111A4A]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <sol.icon size={24} className={sol.color} strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="text-[#15172B] text-lg font-bold mb-2 group-hover:text-[#EB3158] transition-colors">{sol.title}</h4>
                        <p className="text-[#15172B]/80 text-sm leading-relaxed mb-4 transition-colors">
                          {sol.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[#111A4A]/10 relative z-10 transition-colors mt-auto">
                      <span className="text-xs text-[#15172B]/60 font-semibold mb-2 block transition-colors">Best For:</span>
                      <div className="flex flex-wrap gap-2">
                        {sol.bestFor.map((tag, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 rounded bg-gray-200 text-slate-700 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reusable Animated Modal */}
      <SolutionModal 
        isOpen={!!selectedSolution}
        onClose={() => setSelectedSolution(null)}
        solution={selectedSolution}
      />
    </section>
  );
}
