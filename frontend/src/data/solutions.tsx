import {
  Users, UserCircle, Briefcase, Store,
  ShoppingBag, Megaphone, Truck, TrendingUp,
  GraduationCap, CreditCard, ShieldCheck, FolderOpen
} from "lucide-react";
import React from "react";

export const solutions = [
  { id: "01", title: "HRMS", short: "HRMS", desc: "Manage HR, payroll, attendance, leave, and employee records.", icon: <Users size={24} />, color: "text-[#EB3158]", bg: "bg-[#EB3158]" },
  { id: "02", title: "CRM", short: "CRM", desc: "Manage customers, leads, sales, and relationships.", icon: <UserCircle size={24} />, color: "text-purple-500", bg: "bg-purple-500" },
  { id: "03", title: "ERP", short: "ERP", desc: "Integrate finance, inventory, procurement, and operations.", icon: <Briefcase size={24} />, color: "text-green-500", bg: "bg-green-500" },
  { id: "04", title: "Dealer Management System", short: "DMS", desc: "Manage dealers, orders, inventory, and distributors.", icon: <Store size={24} />, color: "text-orange-500", bg: "bg-orange-500" },
  { id: "05", title: "Vendor Management System", short: "VMS", desc: "Manage vendors, procurement, and purchase orders.", icon: <ShoppingBag size={24} />, color: "text-teal-500", bg: "bg-teal-500" },
  { id: "06", title: "Marketing Automation", short: "Marketing", desc: "Automate campaigns, emails, and engagement.", icon: <Megaphone size={24} />, color: "text-pink-500", bg: "bg-pink-500" },
  { id: "07", title: "Supply Chain & Logistics", short: "Logistics", desc: "Track inventory, warehouses, shipments, and logistics.", icon: <Truck size={24} />, color: "text-[#EB3158]", bg: "bg-[#EB3158]" },
  { id: "08", title: "Sales Force Automation", short: "Sales", desc: "Manage leads, quotations, and opportunities.", icon: <TrendingUp size={24} />, color: "text-green-600", bg: "bg-green-600" },
  { id: "09", title: "Learning Management System", short: "LMS", desc: "Deliver online training, assessments, and learning.", icon: <GraduationCap size={24} />, color: "text-indigo-500", bg: "bg-indigo-500" },
  { id: "10", title: "POS", short: "POS", desc: "Fast billing, inventory, payments, and retail.", icon: <CreditCard size={24} />, color: "text-pink-500", bg: "bg-pink-500" },
  { id: "11", title: "Queue Management System", short: "QMS", desc: "Manage audits, compliance, and quality control.", icon: <ShieldCheck size={24} />, color: "text-cyan-500", bg: "bg-cyan-500" },
  { id: "12", title: "Document Management System", short: "DocMS", desc: "Store, organize, share, and secure documents.", icon: <FolderOpen size={24} />, color: "text-rose-500", bg: "bg-rose-500" },
];
