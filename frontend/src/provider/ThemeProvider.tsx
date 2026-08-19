"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import dynamic from "next/dynamic";
const AlertDialog = dynamic(
  () => import("@/components/alert/AlertDialog").then((mod) => mod.AlertDialog),
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      defaultTheme="light"
      attribute="class"
      enableSystem
      disableTransitionOnChange
    >
      {/* <SessionProvider> */}
      {children}

      <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />

      <Toaster position="top-center" />
      <AlertDialog />

      {/* </SessionProvider> */}
    </NextThemesProvider>
  );
}
