import { Truck, ShieldCheck, Headset } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui";

const ITEMS = [
  { icon: Truck, label: "משלוחים לכל הארץ" },
  { icon: ShieldCheck, label: "קנייה בטוחה" },
  { icon: Headset, label: "שירות אישי" },
];

/**
 * Three short trust points. Labels only — no delivery-time or policy claims.
 * Full-bleed section. `light` sits on the page; `dark` is a band above the footer.
 */
export function TrustStrip({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <section
      className={cn(
        "border-y border-border",
        dark ? "bg-night-900 text-white" : "bg-surface",
      )}
    >
      <Container className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-3">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 text-sm font-semibold sm:text-base"
          >
            <Icon
              className={cn(
                "h-5 w-5 shrink-0",
                dark ? "text-violet-300" : "text-accent",
              )}
              aria-hidden
            />
            {label}
          </div>
        ))}
      </Container>
    </section>
  );
}
