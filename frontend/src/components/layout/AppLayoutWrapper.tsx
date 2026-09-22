"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/app/home/components/Footer";
import { IntroAnimation } from "@/app/home/components/Intro-animation";

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide public marketing Header, Footer, and IntroAnimation on portal/dashboard routes
  const isDashboardRoute =
    pathname.startsWith("/app-dashboard") ||
    pathname.startsWith("/admin/chat") ||
    pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    return <div className="w-full min-h-screen">{children}</div>;
  }

  return (
    <>
      <Header />
      <IntroAnimation LETTERS={["I", "T", "S", "O", "F", "T", "L", "A", "B", "3", "6", "0"]} />
      {children}
      <Footer />
    </>
  );
}
