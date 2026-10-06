import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function DashboardProductPage({ params }: { params: Promise<{ product: string }> | { product: string } }) {
  // Await params to support Next.js 15, fallback to sync for Next.js 14
  const resolvedParams = await Promise.resolve(params);
  const rawProduct = resolvedParams?.product || "module";

  // Format the product name for display
  const productName = rawProduct
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 min-h-[60vh] flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 border border-blue-100">
            <span className="text-3xl font-bold text-blue-600">
              {productName.charAt(0)}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111A4A] mb-4">
            {productName} Dashboard
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
            Welcome to the centralized dashboard for {productName}. This interactive workspace is currently being provisioned.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-[#111A4A] text-white rounded-xl font-bold shadow-md hover:bg-blue-900 transition-colors">
              Configure Module
            </button>
            <button className="px-6 py-3 bg-slate-100 text-[#111A4A] rounded-xl font-bold hover:bg-slate-200 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
