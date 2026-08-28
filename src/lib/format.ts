import { site } from "@/config/site";

/** Format a number as an ILS price, e.g. 199 -> "199 ₪". */
export function formatPrice(value: number | null | undefined): string {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `${value.toLocaleString("he-IL")} ${site.currency}`;
}
