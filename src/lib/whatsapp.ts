// Builds the WhatsApp order message and wa.me deep link.
// No payment on site — the order is completed in the WhatsApp chat.

import { site } from "@/config/site";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/store/cart";

export interface OrderLineInput {
  teamName: string;
  kitName: string;
  size: string;
  version: string;
  customName?: string;
  customNumber?: string;
  qty: number;
  unitPrice: number;
}

function formatLine(l: OrderLineInput): string {
  const custom =
    l.customName || l.customNumber
      ? ` | "${[l.customName, l.customNumber].filter(Boolean).join(" ").trim()}"`
      : "";
  const lineTotal = l.qty * l.unitPrice;
  return `- ${l.teamName} ${l.kitName} | Size ${l.size} | ${l.version}${custom} | x${l.qty} | ${formatPrice(lineTotal)}`;
}

export function buildOrderMessage(lines: OrderLineInput[]): string {
  const body = lines.map(formatLine).join("\n");
  const total = lines.reduce((n, l) => n + l.qty * l.unitPrice, 0);
  return `Hi, I want to order:\n${body}\nTotal: ${formatPrice(total)}`;
}

export function cartToLines(items: CartItem[]): OrderLineInput[] {
  return items.map((i) => ({
    teamName: i.teamName,
    kitName: i.kitName,
    size: i.size,
    version: i.version,
    customName: i.customName,
    customNumber: i.customNumber,
    qty: i.qty,
    unitPrice: i.unitPrice,
  }));
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function cartWhatsappUrl(items: CartItem[]): string {
  return whatsappUrl(buildOrderMessage(cartToLines(items)));
}
