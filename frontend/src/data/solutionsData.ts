import {
  Users, UserCheck, Briefcase, Settings, ShoppingCart, Megaphone,
  Truck, BarChart, GraduationCap, Calculator, ClipboardList, Folder,
  HeartPulse, Building2, ShoppingBag, Factory, Laptop, Antenna,
  GraduationCap as School, Bus, Car, Zap, Wheat, Coffee,
  Palmtree, Home, Film, Landmark, FlaskConical, Shirt,
  Code, Cloud, ShieldCheck, Server, Clock, Blocks, Smartphone, LineChart
} from "lucide-react";

export const softwareProducts = [
  {
    id: "hrms",
    name: "HRMS",
    description: "Manage HR, payroll, attendance, leave, recruitment, employee records and performance.",
    icon: Users,
    color: "from-[#4AA8D8] to-[#2b88b7]"
  },
  {
    id: "crm",
    name: "CRM",
    description: "Manage customers, leads, sales pipeline and customer relationships.",
    icon: UserCheck,
    color: "from-[#20B486] to-[#128a64]"
  },
  {
    id: "erp",
    name: "ERP",
    description: "Integrate finance, procurement, inventory and business operations.",
    icon: Briefcase,
    color: "from-[#EB3158] to-[#b3193c]"
  },
  {
    id: "dealer-management",
    name: "Dealer Management System",
    description: "Manage dealers, distributors, orders, inventory and performance.",
    icon: Settings,
    color: "from-[#4AA8D8] to-[#2b88b7]"
  },
  {
    id: "vendor-management",
    name: "Vendor Management System",
    description: "Manage vendors, contracts, procurement and purchase orders.",
    icon: ShoppingCart,
    color: "from-[#EB3158] to-[#b3193c]"
  },
  {
    id: "marketing-automation",
    name: "Marketing Automation",
    description: "Automate campaigns, email marketing, lead nurturing and customer engagement.",
    icon: Megaphone,
    color: "from-[#20B486] to-[#128a64]"
  },
  {
    id: "supply-chain",
    name: "Supply Chain & Logistics",
    description: "Manage warehouses, inventory, shipment tracking and logistics.",
    icon: Truck,
    color: "from-[#4AA8D8] to-[#2b88b7]"
  },
  {
    id: "sales-force",
    name: "Sales Force Automation",
    description: "Manage field sales, quotations, visits, opportunities and reporting.",
    icon: BarChart,
    color: "from-[#20B486] to-[#128a64]"
  },
  {
    id: "lms",
    name: "Learning Management System",
    description: "Deliver online training, certifications, employee learning and assessments.",
    icon: GraduationCap,
    color: "from-[#EB3158] to-[#b3193c]"
  },
  {
    id: "pos",
    name: "POS",
    description: "Billing, payments, inventory and retail store management.",
    icon: Calculator,
    color: "from-[#20B486] to-[#128a64]"
  },
  {
    id: "queue-management",
    name: "Queue Management System",
    description: "Manage customer queues, appointments, compliance, inspections and service flow.",
    icon: ClipboardList,
    color: "from-[#4AA8D8] to-[#2b88b7]"
  },
  {
    id: "dms",
    name: "Document Management System",
    description: "Store, organize, secure and share digital documents.",
    icon: Folder,
    color: "from-[#EB3158] to-[#b3193c]"
  }
];

export const industries = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    description: "Secure, compliant solutions for hospitals, clinics, and medical professionals.",
    products: [
      { id: "hrms", description: "Manage doctors, nurses, shifts, payroll, and hospital workforce operations seamlessly." },
      { id: "crm", description: "Streamline patient relationships, feedback, appointment scheduling, and communication channels." },
      { id: "erp", description: "Integrate hospital finance, resource allocation, and medical inventory across departments." },
      { id: "vendor-management", description: "Manage medical equipment suppliers, pharmaceutical vendors, and purchase contracts securely." },
      { id: "supply-chain", description: "Track medical supplies, manage pharmacy inventory, and optimize healthcare logistics." },
      { id: "lms", description: "Deliver medical certifications, staff training, and continuous education for healthcare professionals." },
      { id: "queue-management", description: "Manage patient queues, optimize clinic workflows, and improve appointment wait times." },
      { id: "dms", description: "Securely store patient records, compliance documents, and medical histories digitally." }
    ]
  },
  {
    id: "banking",
    name: "Banking & Financial Services",
    icon: Building2,
    description: "Robust platforms for banks, insurance, and financial institutions.",
    products: [
      { id: "hrms", description: "Automate banking staff payroll, branch compliance training, and employee performance tracking." },
      { id: "crm", description: "Manage high-net-worth clients, resolve service requests, and track financial portfolios." },
      { id: "erp", description: "Unify financial operations, branch accounting, and real-time expense management securely." },
      { id: "marketing-automation", description: "Execute targeted campaigns for loans, credit cards, and personalized financial products." },
      { id: "lms", description: "Ensure regulatory compliance by delivering mandatory financial training to banking staff." },
      { id: "queue-management", description: "Optimize branch operations by managing customer queues and appointment scheduling efficiently." },
      { id: "dms", description: "Digitize loan applications, secure customer identity records, and maintain compliance documentation." }
    ]
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    icon: ShoppingBag,
    description: "Omnichannel solutions to drive sales and enhance customer experiences.",
    products: [
      { id: "hrms", description: "Manage store staff shifts, seasonal hiring, and payroll for distributed retail teams." },
      { id: "crm", description: "Track shopper behavior, manage loyalty programs, and drive personalized customer engagement." },
      { id: "erp", description: "Integrate store financials, inventory valuation, and multi-channel retail operations." },
      { id: "vendor-management", description: "Streamline supplier contracts, manage brand sourcing, and track purchase orders efficiently." },
      { id: "marketing-automation", description: "Automate abandoned cart emails, promotional campaigns, and customer retention strategies." },
      { id: "supply-chain", description: "Optimize warehouse inventory, manage fulfillment routes, and track delivery logistics." },
      { id: "sales-force", description: "Empower B2B sales teams with quotation tools, order tracking, and territory management." },
      { id: "pos", description: "Process faster checkouts, manage retail billing, and track store inventory in real-time." },
      { id: "dms", description: "Store digital invoices, supplier agreements, and retail compliance documents securely." }
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    description: "End-to-end operational software for modern manufacturing plants.",
    products: [
      { id: "hrms", description: "Track factory worker shifts, manage overtime, and ensure workplace safety compliance." },
      { id: "crm", description: "Manage long-term B2B client relationships, handle complex sales, and track inquiries." },
      { id: "erp", description: "Optimize production planning, inventory tracking, procurement, and factory financial operations." },
      { id: "dealer-management", description: "Track distributor performance, manage bulk orders, and streamline the distribution network." },
      { id: "vendor-management", description: "Manage raw material suppliers, negotiate contracts, and track quality compliance." },
      { id: "supply-chain", description: "Gain real-time visibility into raw material logistics and finished goods distribution." },
      { id: "sales-force", description: "Equip field teams to manage industrial accounts, site visits, and heavy equipment sales." },
      { id: "lms", description: "Deliver crucial safety training, equipment certifications, and standard operating procedures." },
      { id: "queue-management", description: "Streamline loading dock schedules, truck arrivals, and logistics yard operations." },
      { id: "dms", description: "Manage engineering schematics, ISO compliance documents, and manufacturing quality reports." }
    ]
  },
  {
    id: "it",
    name: "Information Technology",
    icon: Laptop,
    description: "Agile tools for tech companies and software service providers.",
    products: [
      { id: "hrms", description: "Manage remote tech teams, agile resource allocation, and complex global payrolls." },
      { id: "crm", description: "Track enterprise software deals, manage client onboarding, and handle service level agreements." },
      { id: "marketing-automation", description: "Run automated tech webinars, nurture B2B leads, and manage tech newsletter campaigns." },
      { id: "sales-force", description: "Forecast software subscriptions, track tech sales pipelines, and manage contract renewals." },
      { id: "lms", description: "Continuously upskill developers with new programming certifications and security training." },
      { id: "dms", description: "Securely store technical specifications, architecture diagrams, and software licensing agreements." }
    ]
  },
  {
    id: "telecom",
    name: "Telecommunications",
    icon: Antenna,
    description: "Scalable systems for telecom operators and internet service providers.",
    products: [
      { id: "hrms", description: "Manage field technician schedules, tower maintenance crews, and regional office staff." },
      { id: "crm", description: "Provide unified subscriber support, handle service tickets, and track customer churn." },
      { id: "erp", description: "Manage massive network infrastructure costs, billing cycles, and telecom financials." },
      { id: "dealer-management", description: "Coordinate with SIM distributors, mobile retailers, and telecom franchise partners." },
      { id: "vendor-management", description: "Manage network equipment suppliers, fiber optic contractors, and hardware procurement." },
      { id: "marketing-automation", description: "Automate subscriber upgrade campaigns, data usage alerts, and retention offers." },
      { id: "supply-chain", description: "Track network hardware logistics, router distribution, and warehouse inventory." },
      { id: "sales-force", description: "Equip enterprise sales teams to sell complex telecom and broadband infrastructure." },
      { id: "lms", description: "Train retail partners and technicians on new telecom products and installation procedures." },
      { id: "pos", description: "Manage mobile retail store billing, device sales, and accessory inventory." },
      { id: "dms", description: "Digitize subscriber identity forms, regulatory compliance, and spectrum licensing documents." }
    ]
  },
  {
    id: "education",
    name: "Education",
    icon: School,
    description: "Digital learning and administration platforms for schools and universities.",
    products: [
      { id: "hrms", description: "Manage faculty recruitment, professor payroll, substitute teachers, and academic staff records." },
      { id: "crm", description: "Track student inquiries, manage admissions workflows, and engage with university alumni." },
      { id: "marketing-automation", description: "Run enrollment campaigns, automate prospective student emails, and promote campus events." },
      { id: "lms", description: "Deliver digital curriculums, track student assignments, and conduct secure online examinations." },
      { id: "pos", description: "Manage campus bookstore billing, cafeteria payments, and student fee collections." },
      { id: "dms", description: "Securely store academic transcripts, research papers, and institutional accreditation records." }
    ]
  },
  {
    id: "transportation",
    name: "Transportation & Logistics",
    icon: Bus,
    description: "Streamlined logistics, fleet management, and supply chain tools.",
    products: [
      { id: "hrms", description: "Manage driver shifts, track transit hours, and process logistics workforce payroll." },
      { id: "crm", description: "Manage corporate shipping accounts, track customer freight inquiries, and resolve delays." },
      { id: "erp", description: "Integrate fleet maintenance costs, fuel expenses, and overall transit financial operations." },
      { id: "vendor-management", description: "Manage vehicle parts suppliers, fuel contracts, and third-party logistics partners." },
      { id: "supply-chain", description: "Gain total visibility into freight tracking, route optimization, and warehouse logistics." },
      { id: "sales-force", description: "Empower freight brokers to manage shipping quotes, logistics contracts, and territory sales." },
      { id: "dms", description: "Digitize bills of lading, customs documentation, and commercial driver certifications." }
    ]
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: Car,
    description: "Comprehensive software for dealerships, manufacturers, and service centers.",
    products: [
      { id: "hrms", description: "Manage assembly line workers, service center mechanics, and showroom sales staff." },
      { id: "crm", description: "Track vehicle buyers, manage test drive appointments, and send service reminders." },
      { id: "erp", description: "Unify auto manufacturing financials, parts inventory, and dealership operations." },
      { id: "dealer-management", description: "Streamline operations across multiple car dealerships, tracking inventory and sales." },
      { id: "vendor-management", description: "Manage automotive parts suppliers, track OEM contracts, and ensure quality standards." },
      { id: "supply-chain", description: "Optimize auto parts distribution, vehicle delivery logistics, and warehouse operations." },
      { id: "sales-force", description: "Equip showroom staff with tools to manage financing quotes and vehicle configurations." },
      { id: "lms", description: "Train mechanics on new EV technologies and certify showroom staff on new models." },
      { id: "dms", description: "Securely store vehicle registration papers, financing agreements, and warranty documents." }
    ]
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    icon: Zap,
    description: "Efficient management systems for power generation and utility providers.",
    products: [
      { id: "hrms", description: "Manage field engineers, track high-risk environment shifts, and process utility payroll." },
      { id: "erp", description: "Integrate complex grid maintenance costs, energy trading financials, and operational budgets." },
      { id: "vendor-management", description: "Manage heavy equipment suppliers, infrastructure contractors, and fuel procurement." },
      { id: "supply-chain", description: "Track spare parts for power plants and optimize logistics for remote energy sites." },
      { id: "lms", description: "Deliver critical safety protocols, environmental compliance training, and technical certifications." },
      { id: "queue-management", description: "Manage utility customer service centers and schedule field maintenance appointments." },
      { id: "dms", description: "Store environmental impact reports, regulatory licenses, and grid infrastructure schematics." }
    ]
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: Wheat,
    description: "Smart farming and agribusiness supply chain solutions.",
    products: [
      { id: "hrms", description: "Manage seasonal farm workers, track agricultural labor costs, and process payroll." },
      { id: "crm", description: "Manage relationships with bulk agricultural buyers, food processors, and cooperatives." },
      { id: "erp", description: "Integrate agribusiness financials, crop yield planning, and farm equipment ROI." },
      { id: "dealer-management", description: "Track distributors of seeds, fertilizers, and heavy agricultural machinery." },
      { id: "vendor-management", description: "Manage agrochemical suppliers, farming equipment vendors, and seed procurement." },
      { id: "supply-chain", description: "Optimize cold chain logistics for perishables and track crop distribution routes." },
      { id: "sales-force", description: "Empower agritech sales teams managing large farming accounts and territory visits." },
      { id: "dms", description: "Store land ownership deeds, organic certifications, and agricultural compliance documents." }
    ]
  },
  {
    id: "food",
    name: "Food & Beverage",
    icon: Coffee,
    description: "Optimized solutions for restaurants, distributors, and food processing.",
    products: [
      { id: "hrms", description: "Manage restaurant staff shifts, track kitchen hours, and process multi-location payroll." },
      { id: "crm", description: "Track catering clients, manage restaurant loyalty programs, and gather diner feedback." },
      { id: "erp", description: "Unify food production costs, central kitchen inventory, and franchise financials." },
      { id: "dealer-management", description: "Manage food distributors, wholesale grocery partners, and beverage suppliers." },
      { id: "vendor-management", description: "Source fresh ingredients, manage farm contracts, and ensure food safety compliance." },
      { id: "marketing-automation", description: "Run restaurant promotions, automate reservation reminders, and engage local diners." },
      { id: "supply-chain", description: "Track perishable food logistics, optimize delivery routes, and manage warehouse freshness." },
      { id: "sales-force", description: "Equip FMCG sales reps for daily store visits, order taking, and stock audits." },
      { id: "pos", description: "Process rapid restaurant orders, split bills, and manage real-time kitchen inventory." },
      { id: "queue-management", description: "Manage restaurant waiting lists, optimize table turnover, and schedule large bookings." },
      { id: "dms", description: "Securely store health inspection reports, franchise agreements, and vendor recipes." }
    ]
  },
  {
    id: "hospitality",
    name: "Hospitality & Tourism",
    icon: Palmtree,
    description: "Guest-centric software for hotels, resorts, and travel agencies.",
    products: [
      { id: "hrms", description: "Manage hotel housekeeping shifts, front desk schedules, and dynamic seasonal payroll." },
      { id: "crm", description: "Track VIP guest preferences, manage corporate bookings, and drive hotel loyalty." },
      { id: "marketing-automation", description: "Automate pre-arrival emails, holiday promotions, and post-stay guest reviews." },
      { id: "lms", description: "Train hotel staff on service standards, emergency procedures, and property systems." },
      { id: "pos", description: "Seamlessly bill spa services, gift shop items, and restaurant meals to guest rooms." },
      { id: "queue-management", description: "Streamline hotel check-in queues, manage spa appointments, and organize tour groups." },
      { id: "dms", description: "Digitize guest passports, event contracts, and daily operational audit reports." }
    ]
  },
  {
    id: "real-estate",
    name: "Real Estate & Construction",
    icon: Home,
    description: "Project management and CRM tools for builders and realtors.",
    products: [
      { id: "hrms", description: "Manage construction site labor, track contractor hours, and process project-based payroll." },
      { id: "crm", description: "Track property buyers, manage broker networks, and automate follow-ups for listings." },
      { id: "erp", description: "Integrate construction project financials, land acquisition costs, and material inventory." },
      { id: "vendor-management", description: "Manage cement suppliers, track sub-contractor agreements, and secure building materials." },
      { id: "marketing-automation", description: "Run property launch campaigns, automate virtual tour invites, and nurture homebuyers." },
      { id: "sales-force", description: "Equip real estate agents to manage property site visits and client negotiations." },
      { id: "queue-management", description: "Manage high-traffic property launch events and schedule client walkthroughs efficiently." },
      { id: "dms", description: "Securely store property deeds, architectural blueprints, and legal compliance documents." }
    ]
  },
  {
    id: "media",
    name: "Media & Entertainment",
    icon: Film,
    description: "Creative workflow and audience engagement platforms.",
    products: [
      { id: "hrms", description: "Manage freelance creatives, track production crew shifts, and process complex project payroll." },
      { id: "crm", description: "Track advertising clients, manage media sponsorships, and handle subscriber relationships." },
      { id: "marketing-automation", description: "Promote upcoming releases, manage subscriber newsletters, and run targeted digital ads." },
      { id: "sales-force", description: "Empower ad sales teams to manage broadcasting contracts and territory sponsorships." },
      { id: "lms", description: "Deliver training on new broadcasting equipment, editing software, and media compliance." },
      { id: "dms", description: "Securely store digital rights agreements, talent contracts, and production scripts." }
    ]
  },
  {
    id: "government",
    name: "Government",
    icon: Landmark,
    description: "Secure, compliant systems for public sector administration.",
    products: [
      { id: "hrms", description: "Manage civil service records, process municipal payroll, and track departmental performance." },
      { id: "erp", description: "Integrate public sector budgets, track municipal spending, and manage civic infrastructure." },
      { id: "vendor-management", description: "Manage public procurement, track infrastructure contractors, and ensure transparent bidding." },
      { id: "lms", description: "Deliver mandatory policy training, compliance courses, and continuous civil service education." },
      { id: "queue-management", description: "Streamline citizen services, manage DMV wait times, and handle municipal appointments." },
      { id: "dms", description: "Securely archive public records, legislative documents, and classified municipal data." }
    ]
  },
  {
    id: "pharma",
    name: "Pharmaceutical & Biotechnology",
    icon: FlaskConical,
    description: "Regulated compliance and supply chain tracking for life sciences.",
    products: [
      { id: "hrms", description: "Manage research scientists, track lab shifts, and ensure high-security access payroll." },
      { id: "crm", description: "Manage relationships with hospital networks, clinical researchers, and medical distributors." },
      { id: "erp", description: "Integrate R&D costs, complex chemical inventory, and overall pharmaceutical financials." },
      { id: "dealer-management", description: "Track authorized pharmacy distributors and manage bulk medical supply orders." },
      { id: "vendor-management", description: "Procure specialized lab equipment, source raw chemicals, and ensure supplier FDA compliance." },
      { id: "supply-chain", description: "Optimize temperature-controlled logistics, track vaccine distribution, and manage expiry dates." },
      { id: "sales-force", description: "Equip medical representatives for doctor visits, sample tracking, and territory sales." },
      { id: "lms", description: "Train lab staff on strict safety protocols, GMP standards, and new drug handling." },
      { id: "queue-management", description: "Manage clinical trial appointments, lab equipment usage schedules, and testing queues." },
      { id: "dms", description: "Securely store clinical trial data, patent applications, and regulatory FDA submissions." }
    ]
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    icon: Shirt,
    description: "Retail and supply chain software for the fast-paced fashion industry.",
    products: [
      { id: "hrms", description: "Manage seasonal store staff, textile factory workers, and fashion design team payroll." },
      { id: "crm", description: "Track high-value shoppers, manage boutique loyalty programs, and analyze fashion trends." },
      { id: "erp", description: "Unify textile procurement, clothing manufacturing costs, and global retail operations." },
      { id: "dealer-management", description: "Manage fashion franchise owners, boutique distributors, and global brand partners." },
      { id: "vendor-management", description: "Source sustainable fabrics, manage overseas garment factories, and negotiate contracts." },
      { id: "marketing-automation", description: "Run seasonal collection campaigns, automate VIP sales alerts, and boost online conversions." },
      { id: "supply-chain", description: "Track fast-fashion logistics, optimize global shipping routes, and manage warehouse inventory." },
      { id: "sales-force", description: "Equip wholesale fashion reps for B2B catalog presentations and bulk order taking." },
      { id: "pos", description: "Process fast retail checkouts, manage sizing inventory, and handle boutique returns." },
      { id: "dms", description: "Digitize clothing design patterns, brand licensing agreements, and supplier contracts." }
    ]
  }
];

export const features = [
  {
    title: "Cloud Deployment",
    description: "Scalable, resilient cloud infrastructure on AWS, Azure, or Google Cloud.",
    icon: Cloud,
  },
  {
    title: "AI Ready Solutions",
    description: "Integrate predictive analytics and generative AI to automate complex tasks.",
    icon: Zap,
  },
  {
    title: "Secure Architecture",
    description: "Enterprise-grade security with encryption, compliance, and threat protection.",
    icon: ShieldCheck,
  },
  {
    title: "Enterprise Scalability",
    description: "Built to handle millions of transactions and scale as your business grows.",
    icon: Server,
  },
  {
    title: "24×7 Support",
    description: "Dedicated round-the-clock technical support and maintenance.",
    icon: Clock,
  },
  {
    title: "API Integration",
    description: "Seamlessly connect with your existing tools through robust RESTful APIs.",
    icon: Blocks,
  },
  {
    title: "Mobile Ready",
    description: "Fully responsive interfaces and native mobile apps for on-the-go access.",
    icon: Smartphone,
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time insights and customizable reporting for data-driven decisions.",
    icon: LineChart,
  },
  {
    title: "Custom Software Development",
    description: "Tailor-made solutions designed specifically for your unique business logic and workflows.",
    icon: Code,
  }
];

export const techStack = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Laravel", icon: "laravel" },
  { name: ".NET", icon: "dotnet" },
  { name: "Flutter", icon: "flutter" },
  { name: "Python", icon: "python" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "AWS", icon: "aws" },
  { name: "Azure", icon: "azure" },
  { name: "Docker", icon: "docker" }
];

export const metrics = [
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "20+", label: "Industries Served" },
  { value: "99%", label: "Customer Satisfaction" }
];

export const testimonials = [
  {
    quote: "ITSoftLab360 completely transformed our supply chain operations. We've seen a 40% reduction in logistical delays.",
    author: "Sarah Jenkins",
    role: "COO",
    company: "Global Logistics Co."
  },
  {
    quote: "The HRMS and Payroll integration is flawless. It saves our HR team over 20 hours a week.",
    author: "David Chen",
    role: "HR Director",
    company: "TechNova Solutions"
  },
  {
    quote: "Their CRM was customized perfectly for our unique sales process. Best enterprise software vendor we've worked with.",
    author: "Elena Rodriguez",
    role: "VP of Sales",
    company: "Apex Manufacturing"
  }
];

export const faqs = [
  {
    question: "Do you offer custom development for enterprise needs?",
    answer: "Yes, we specialize in building tailor-made software solutions designed to integrate seamlessly with your existing infrastructure and address your specific business workflows."
  },
  {
    question: "How secure is your cloud deployment?",
    answer: "We employ enterprise-grade security protocols, including end-to-end encryption, role-based access control, and regular security audits, deployed on top-tier cloud providers like AWS and Azure."
  },
  {
    question: "Can your software integrate with our current ERP?",
    answer: "Absolutely. Our solutions are built with robust, RESTful APIs, allowing for seamless integration with third-party ERPs, payment gateways, and other legacy systems."
  },
  {
    question: "What kind of support do you provide post-launch?",
    answer: "We offer 24/7 dedicated technical support, continuous monitoring, regular updates, and comprehensive training to ensure your team maximizes the value of our software."
  }
];
