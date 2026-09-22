import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import QueryProvider from "@/provider/QueryProvider";
import { AppLayoutWrapper } from "@/components/layout/AppLayoutWrapper";

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
      className="font-sans antialiased"
      suppressHydrationWarning
    >
      <body className="flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <QueryProvider>
            <SmoothScroll>
              {/* Abstract Background Elements (Light Mode Only) */}
              <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 ">
                <div className="absolute top-[-20%] left-[-10%] w-[480px] h-[480px] rounded-full bg-[#EB3158]/5 blur-[96px]" />
                <div className="absolute top-[10%] right-[-5%] w-[640px] h-[640px] rounded-full border-[1.6px] border-[#F5C842]/20 blur-[1.6px]" />
                <div className="absolute top-[30%] right-[10%] w-[480px] h-[400px] rounded-[80px] bg-[#20B486]/5 blur-[64px] rotate-12" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
              </div>

              <AppLayoutWrapper>{children}</AppLayoutWrapper>
            </SmoothScroll>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
