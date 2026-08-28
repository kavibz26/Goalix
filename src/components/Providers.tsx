"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { CartProvider } from "@/store/cart";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
