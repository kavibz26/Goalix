import type { Metadata } from "next";
import { Container, EmptyState } from "@/components/ui";
import { getDeals } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "מבצעים",
  description: "מבצעי חבילות על חולצות כדורגל ב-Goalix.",
  alternates: { canonical: "/deals" },
};

export default function DealsPage() {
  const deals = getDeals();

  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl font-bold">🔥 מבצעים</h1>
      <p className="mt-2 text-sm text-muted">
        מבצעי חבילות — לדוגמה כמה חולצות במחיר אחד. ההזמנה מסתיימת בוואטסאפ.
      </p>

      <div className="mt-6">
        {deals.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((d) => (
              <li
                key={d.id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-raised p-5"
              >
                <span className="inline-flex w-fit rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white">
                  {d.badge ?? `${d.kitCount} חולצות`}
                </span>
                <h2 className="text-lg font-semibold">{d.title_he ?? d.title}</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-accent">
                    {formatPrice(d.bundlePrice)}
                  </span>
                  {typeof d.originalPrice === "number" ? (
                    <span className="text-sm text-muted line-through">
                      {formatPrice(d.originalPrice)}
                    </span>
                  ) : null}
                </div>
                <WhatsAppButton
                  href={whatsappUrl(
                    `Hi, I want the deal: ${d.title} (${formatPrice(d.bundlePrice)})`,
                  )}
                  className="mt-auto"
                >
                  קבלת המבצע
                </WhatsAppButton>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="אין מבצעים פעילים כרגע"
            hint="מבצעי חבילות חדשים יתפרסמו כאן. רוצים לדעת ראשונים? עקבו אחרינו או כתבו לנו בוואטסאפ."
          />
        )}
      </div>
    </Container>
  );
}
