import { Rocket, Globe2, ShieldCheck, Trophy } from "lucide-react";

export default function StatsBar() {
  const stats = [
    { icon: <Trophy size={28} />, title: "World's 1st", subtitle: "All Solutions in One" },
    { icon: <Rocket size={28} />, title: "12+", subtitle: "Powerful Solutions" },
    { icon: <Globe2 size={28} />, title: "5000+", subtitle: "Happy Clients" },
    { icon: <ShieldCheck size={28} />, title: "100%", subtitle: "Secure & Reliable" },
  ];

  return (
    <section className="pb-16 relative z-10 px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="glass-panel p-6 lg:p-8 rounded-2xl flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 border-blue-200 dark:border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.05)] dark:shadow-[0_0_30px_rgba(37,99,235,0.15)] bg-gradient-to-r from-white via-blue-50/50 to-white dark:from-[#0f172a]/80 dark:via-[#1e3a8a]/20 dark:to-[#0f172a]/80 transition-colors">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors group-hover:scale-110 duration-300">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-slate-800 dark:text-white font-bold text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{stat.title}</h4>
                <p className="text-slate-500 dark:text-gray-400 text-xs mt-0.5 transition-colors">{stat.subtitle}</p>
              </div>
              
              {/* Divider (hidden on last item and on small screens) */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block w-px h-10 bg-gray-200 dark:bg-gray-700 ml-6 transition-colors"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
