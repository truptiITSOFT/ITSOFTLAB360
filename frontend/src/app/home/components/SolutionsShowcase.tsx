"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { User, FileText, List, Calculator, GraduationCap, BarChart2, Users, Briefcase, Settings, ShoppingCart, Megaphone, Truck, ArrowRight } from "lucide-react";

export default function SolutionsShowcase() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const solutions = [
    {
      id: "hrms",
      title: "HRMS Software",
      desc: "Manage your workforce efficiently with complete automation.",
      icon: User,
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      id: "crm",
      title: "Customer Relationship Management",
      desc: "Build better customer relationships and drive sales.",
      icon: Users,
      color: "#f59e0b",
      bg: "#fffbeb",
    },
    {
      id: "erp",
      title: "Enterprise Resource Planning",
      desc: "Streamline your entire business operations.",
      icon: Briefcase,
      color: "#10b981",
      bg: "#ecfdf5",
    },
    {
      id: "dealer",
      title: "Dealer Management",
      desc: "Empower your dealer network and track performance.",
      icon: Settings,
      color: "#8b5cf6",
      bg: "#eff6ff",
    },
    {
      id: "vendor",
      title: "Vendor Management",
      desc: "Optimize vendor collaborations and supply flow.",
      icon: ShoppingCart,
      color: "#ec4899",
      bg: "#fdf2f8",
    },
    {
      id: "marketing",
      title: "Marketing Automation",
      desc: "Automate and scale your marketing campaigns.",
      icon: Megaphone,
      color: "#f43f5e",
      bg: "#fff1f2",
    },
    {
      id: "supply",
      title: "Supply Chain & Logistics",
      desc: "Track shipments end-to-end securely.",
      icon: Truck,
      color: "#0ea5e9",
      bg: "#eff6ff",
    },
    {
      id: "sales",
      title: "Sales Force Automation",
      desc: "Boost your sales team productivity instantly.",
      icon: BarChart2,
      color: "#14b8a6",
      bg: "#ecfdf5",
    },
    {
      id: "lms",
      title: "Learning Management",
      desc: "Train and upskill your growing teams.",
      icon: GraduationCap,
      color: "#f59e0b",
      bg: "#fffbeb",
    },
    {
      id: "pos",
      title: "Retail POS",
      desc: "Simplify retail transactions and inventory.",
      icon: Calculator,
      color: "#8b5cf6",
      bg: "#eff6ff",
    },
    {
      id: "queue",
      title: "Queue Management",
      desc: "Enhance customer wait experience seamlessly.",
      icon: List,
      color: "#06b6d4",
      bg: "#f0fdfa",
    },
    {
      id: "document",
      title: "Document Management",
      desc: "Digitize, organize, and secure your files.",
      icon: FileText,
      color: "#6366f1",
      bg: "#eef2ff",
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .solutions-showcase-container {
          --navy: #0f172a;
          --sky: #2563eb;
          --ink: #1e293b;
          --paper: #ffffff;
          --line: #e2e8f0;
          background: var(--paper);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
        }
        .solutions-showcase-container .section {
          padding: 96px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .solutions-showcase-container .header-area {
          text-align: center;
          margin-bottom: 64px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .solutions-showcase-container .sec-title {
          font-family: 'Fraunces', serif;
          font-size: 48px;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 24px;
          line-height: 1.1;
        }
        .solutions-showcase-container .sec-desc {
          font-size: 18px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 40px;
        }
        .solutions-showcase-container .actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .solutions-showcase-container .btn-primary {
          background: var(--sky);
          color: #fff;
          padding: 16px 32px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .solutions-showcase-container .btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(37,99,235,0.3);
        }
        .solutions-showcase-container .btn-secondary {
          background: #f8fafc;
          color: var(--navy);
          padding: 16px 32px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          border: 1px solid var(--line);
        }
        .solutions-showcase-container .btn-secondary:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(15,23,42,0.05);
        }

        .solutions-showcase-container .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .solutions-showcase-container .solution-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(20px);
          position: relative;
          overflow: hidden;
        }
        .solutions-showcase-container .solution-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .solutions-showcase-container .solution-card:hover {
          border-color: var(--sky);
          box-shadow: 0 20px 40px -10px rgba(15,23,42,0.1);
          transform: translateY(-4px);
        }
        
        .solutions-showcase-container .card-logo-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 24px;
        }
        .solutions-showcase-container .card-logo {
          opacity: 0.6;
          filter: grayscale(100%);
          transition: all 0.3s;
        }
        .solutions-showcase-container .solution-card:hover .card-logo {
          opacity: 1;
          filter: grayscale(0%);
        }
        .solutions-showcase-container .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .solutions-showcase-container .card-title {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .solutions-showcase-container .card-desc {
          font-size: 14.5px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 32px;
          flex-grow: 1;
        }

        .solutions-showcase-container .card-link {
          font-size: 14px;
          font-weight: 600;
          color: var(--sky);
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          transition: gap 0.2s;
          margin-top: auto;
        }
        .solutions-showcase-container .solution-card:hover .card-link {
          gap: 10px;
        }

        @media (max-width: 768px) {
          .solutions-showcase-container .sec-title { font-size: 36px; }
          .solutions-showcase-container .sec-desc { font-size: 16px; }
          .solutions-showcase-container .actions { flex-direction: column; }
          .solutions-showcase-container .btn-primary,
          .solutions-showcase-container .btn-secondary { width: 100%; justify-content: center; }
        }
      `}} />
      <div className="solutions-showcase-container" id="solutions">
        <div className="section">
          
          <div className="header-area">
            <h2 className="sec-title">Start Your Digital Transformation</h2>
            <p className="sec-desc">
              Explore the ITSoftLab360 ecosystem with a clearer starting point. Discover the right combination of solutions for your industry, team size, workflow, and growth goals.
            </p>
            <div className="actions">
              <a href="#solutions" className="btn-primary">
                Explore All 12 Solutions
                <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn-secondary">
                Schedule a Free Consultation
              </a>
            </div>
          </div>

          <div className="grid-container">
            {solutions.map((sol, i) => (
              <div 
                key={sol.id} 
                className="solution-card"
                ref={(el) => { cardsRef.current[i] = el; }}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="card-logo-row">
                  <Image src="/logo.png" alt="iTSoftLab360 Logo" width={80} height={20} className="card-logo object-contain" />
                  <div className="card-icon" style={{ background: sol.bg, color: sol.color }}>
                    <sol.icon size={24} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="card-title">{sol.title}</h3>
                <p className="card-desc">{sol.desc}</p>
                <a href="#demo" className="card-link" style={{ color: sol.color }}>
                  Get a Free Demo
                  <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
