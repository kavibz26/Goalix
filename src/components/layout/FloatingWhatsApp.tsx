"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

/**
 * Persistent WhatsApp affordance for desktop / tablet, bottom-right (RTL:
 * inline-start). Hidden on mobile, where the sticky bottom bar covers it, and
 * it tucks away once the footer scrolls into view so it never overlaps it.
 */
export function FloatingWhatsApp() {
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -32px 0px" },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl("היי Goalix, יש לי שאלה")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פנייה אלינו בוואטסאפ"
      className={cn(
        "fixed bottom-6 start-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-black shadow-lg transition-all duration-200 hover:scale-105 md:flex",
        nearFooter && "pointer-events-none translate-y-24 opacity-0",
      )}
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
