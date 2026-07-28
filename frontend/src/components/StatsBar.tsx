import { Rocket, Users, Globe2, BarChart3, ShieldCheck, HeadphonesIcon } from "lucide-react";

export default function StatsBar() {
  const stats = [
    { icon: <Rocket size={24} />, title: "ONE PLATFORM", subtitle: "Unlimited Solutions" },
    { icon: <Users size={24} />, title: "1000+", subtitle: "Happy Clients" },
    { icon: <Globe2 size={24} />, title: "50+", subtitle: "Countries Served" },
    { icon: <BarChart3 size={24} />, title: "99.9%", subtitle: "Uptime & Reliability" },
    { icon: <ShieldCheck size={24} />, title: "ISO 27001", subtitle: "Certified Security" },
    { icon: <HeadphonesIcon size={24} />, title: "24/7", subtitle: "Expert Support" },
  ];

  return (
    <section className="pb-16 relative z-10 px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="glass-panel p-6 lg:p-8 rounded-2xl flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.15)] bg-gradient-to-r from-[#0f172a]/80 via-[#1e3a8a]/20 to-[#0f172a]/80">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="text-blue-400 group-hover:text-blue-300 transition-colors group-hover:scale-110 duration-300">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-white font-bold text-lg leading-tight group-hover:text-blue-300 transition-colors">{stat.title}</h4>
                <p className="text-gray-400 text-xs mt-0.5">{stat.subtitle}</p>
              </div>
              
              {/* Divider (hidden on last item and on small screens) */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block w-px h-10 bg-gray-700 ml-6"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
