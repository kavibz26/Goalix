import { site } from "@/config/site";

/**
 * Canonical price format for the whole app — UI and WhatsApp messages alike.
 * e.g. 199 -> "199 ₪". Uses a normal space so it reads well in RTL and in
 * the plain-text WhatsApp order summary.
 */
export function formatPrice(value: number | null | undefined): string {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `${value.toLocaleString("he-IL")} ${site.currency}`;
}
