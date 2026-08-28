"use client";

import { MessageCircle } from "lucide-react";
import { useCart } from "@/store/cart";
import { cartWhatsappUrl, whatsappUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/format";

/** Always-visible "Order on WhatsApp" bar, mobile only. */
export function MobileWhatsAppBar() {
  const { items, total, hydrated } = useCart();
  const hasItems = hydrated && items.length > 0;

  const href = hasItems
    ? cartWhatsappUrl(items)
    : whatsappUrl("היי Goalix, יש לי שאלה");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 font-semibold text-black active:scale-[0.99]"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        {hasItems ? (
          <span>הזמנה בוואטסאפ · {formatPrice(total)}</span>
        ) : (
          <span>הזמנה בוואטסאפ</span>
        )}
      </a>
    </div>
  );
}
