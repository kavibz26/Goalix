"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, X, Zap } from "lucide-react";
import { useCart } from "@/store/cart";
import { SearchAutocomplete } from "@/components/shop/SearchAutocomplete";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/shop", label: "כל החולצות" },
  { href: "/deals", label: "מבצעים 🔥" },
  { href: "/faq", label: "שאלות נפוצות" },
  { href: "/contact", label: "צור קשר" },
];

export function Header() {
  const { count, hydrated } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <Container className="flex h-16 items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          aria-label="תפריט"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-wide uppercase">
          <span className="inline-flex items-center gap-0.5 rounded-md bg-gradient-to-br from-azure-400 to-azure-700 px-1.5 py-0.5 text-white">
            <Zap className="h-4 w-4" fill="currentColor" aria-hidden />
            <span>FK</span>
          </span>
          <span className="hidden sm:inline">
            FootballKits<span className="text-accent">·IL</span>
          </span>
        </Link>

        <nav className="ms-4 hidden items-center gap-5 text-sm font-medium md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-accent">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto hidden w-72 lg:block">
          <SearchAutocomplete />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
          aria-label="חיפוש"
          onClick={() => setSearchOpen((v) => !v)}
        >
          <Search className="h-5 w-5" />
        </button>

        <ThemeToggle />

        <Link
          href="/cart"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border"
          aria-label="עגלת קניות"
        >
          <ShoppingBag className="h-5 w-5" />
          {hydrated && count > 0 ? (
            <span className="absolute -end-1.5 -top-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-contrast">
              {count}
            </span>
          ) : null}
        </Link>
      </Container>

      {searchOpen ? (
        <Container className="pb-3 lg:hidden">
          <SearchAutocomplete autoFocus onNavigate={() => setSearchOpen(false)} />
        </Container>
      ) : null}

      <div
        className={cn(
          "overflow-hidden border-t border-border transition-[max-height] duration-300 md:hidden",
          menuOpen ? "max-h-72" : "max-h-0",
        )}
      >
        <Container className="flex flex-col py-2">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="min-h-12 border-b border-border/60 py-3 text-sm font-medium last:border-b-0"
            >
              {n.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
