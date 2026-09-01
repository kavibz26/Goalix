"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { SearchAutocomplete } from "@/components/shop/SearchAutocomplete";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "דף הבית" },
  { href: "/shop", label: "חנות" },
  { href: "/about", label: "אודות" },
  { href: "/faq", label: "שאלות נפוצות" },
  { href: "/contact", label: "צור קשר" },
];

export function Header() {
  const { count, hydrated } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // Close the mobile menu on route change (also handled per-link, but this
  // covers browser back/forward). Escape / outside-tap are handled below.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur"
    >
      <Container className="flex h-16 items-center gap-3">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border md:hidden"
          aria-label={menuOpen ? "סגירת התפריט" : "פתיחת התפריט"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>

        <Link
          href="/"
          className="flex min-h-11 items-center pe-1"
          aria-label="Goalix — לדף הבית"
        >
          <Logo />
        </Link>

        <nav className="ms-4 hidden items-center gap-5 text-sm font-medium md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={cn(
                "hover:text-accent",
                isActive(n.href) && "text-accent underline underline-offset-8",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto hidden w-72 lg:block">
          <SearchAutocomplete />
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border lg:hidden"
          aria-label={searchOpen ? "סגירת החיפוש" : "פתיחת החיפוש"}
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen((v) => !v)}
        >
          <Search className="h-5 w-5" aria-hidden />
        </button>

        <ThemeToggle />

        <Link
          href="/cart"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border"
          aria-label={
            hydrated && count > 0
              ? `עגלת קניות — ${count} פריטים`
              : "עגלת קניות"
          }
        >
          <ShoppingBag className="h-5 w-5" aria-hidden />
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
          menuOpen ? "max-h-96" : "max-h-0",
        )}
        aria-hidden={!menuOpen}
        // Keeps the collapsed links out of the tab order / screen-reader tree.
        inert={!menuOpen}
      >
        <Container className="flex flex-col py-2">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={cn(
                "min-h-12 border-b border-border/60 py-3 text-sm font-medium last:border-b-0",
                isActive(n.href) && "text-accent",
              )}
            >
              {n.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
