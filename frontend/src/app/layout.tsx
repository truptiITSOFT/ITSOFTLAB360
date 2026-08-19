import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/app/home/components/Footer";

import { SmoothScroll } from "@/components/SmoothScroll";
import { IntroAnimation } from "./home/components/Intro-animation";
import QueryProvider from "@/provider/QueryProvider";

export const metadata: Metadata = {
  title: "IT SOFTLAB 360",
  description: "Solutions Beyond Limits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <QueryProvider>
            <SmoothScroll>
              {/* Abstract Background Elements (Light Mode Only) */}
              <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 ">
                {/* Large abstract coral semicircle */}
                <div className="absolute top-[-20%] left-[-10%] w-[480px] h-[480px] rounded-full bg-[#EB3158]/5 blur-[96px]" />

                {/* Large yellow curved line ring */}
                <div className="absolute top-[10%] right-[-5%] w-[640px] h-[640px] rounded-full border-[1.6px] border-[#F5C842]/20 blur-[1.6px]" />

                {/* Soft emerald rounded rectangle */}
                <div className="absolute top-[30%] right-[10%] w-[480px] h-[400px] rounded-[80px] bg-[#20B486]/5 blur-[64px] rotate-12" />

                {/* Subtle grid texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
              </div>

              <Header />
              <IntroAnimation LETTERS={["I", "T", "S", "O", "F", "T", "L", "A", "B", "3", "6", "0"]} />
              {children}
              <Footer />
            </SmoothScroll>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
