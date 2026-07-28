import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-[rgba(59,130,246,0.1)]">
      <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-700 opacity-80 group-hover:scale-110 transition-transform duration-300"></div>
             {/* A stylized 3D cube-like icon can go here, using simple CSS shapes for now */}
             <div className="w-5 h-5 border-2 border-white transform rotate-45 group-hover:rotate-90 transition-all duration-500 z-10"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-wider text-white">IT SOFTLAB <span className="text-blue-400">360</span></span>
            <span className="text-[0.6rem] text-gray-400 tracking-widest uppercase">Solutions Beyond Limits</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/" className="text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-500">HOME</Link>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors group">
            SOLUTIONS <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </div>
          <Link href="#products" className="hover:text-white transition-colors">PRODUCTS</Link>
          <Link href="#industries" className="hover:text-white transition-colors">INDUSTRIES</Link>
          <Link href="#about" className="hover:text-white transition-colors">ABOUT US</Link>
          <Link href="#careers" className="hover:text-white transition-colors">CAREERS</Link>
          <Link href="#contact" className="hover:text-white transition-colors">CONTACT US</Link>
        </nav>

        {/* CTA Button */}
        <button className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]">
          REQUEST DEMO <ArrowRight size={16} />
        </button>
      </div>
    </header>
  );
}
