"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fade + rise as the element scrolls into view — a lightweight
 * IntersectionObserver + CSS effect (no animation library).
 *
 * Only elements that start below the fold are ever hidden, and only when
 * IntersectionObserver is available and reduced-motion is off. So no-JS,
 * reduced-motion, and above-the-fold content all render immediately.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") return;

    // Already visible on mount → don't animate (avoids hiding above-the-fold).
    if (el.getBoundingClientRect().top < window.innerHeight - 60) return;

    setPhase("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        phase === "hidden" && "reveal-hidden",
        phase === "shown" && "reveal-shown",
        className,
      )}
      style={
        delay && phase === "shown" ? { transitionDelay: `${delay}s` } : undefined
      }
    >
      {children}
    </div>
  );
}
