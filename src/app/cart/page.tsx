"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { Container, EmptyState } from "@/components/ui";
import { KitImage } from "@/components/product/KitImage";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cartWhatsappUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, total, hydrated, setQty, remove, clear } = useCart();

  if (!hydrated) {
    return (
      <Container className="py-10">
        <p className="text-sm text-muted">טוען עגלה…</p>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl font-bold">עגלת קניות</h1>

      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="העגלה ריקה" hint="הוסיפו חולצות מהחנות כדי להתחיל." />
          <Link
            href="/shop"
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-6 font-semibold text-accent-contrast sm:w-auto"
          >
            לחנות
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <ul className="space-y-3">
              {items.map((i) => (
                <li
                  key={i.lineId}
                  className="flex gap-3 rounded-2xl border border-border bg-surface-raised p-3"
                >
                  <div className="relative h-24 w-24 shrink-0 rounded-xl bg-surface p-1">
                    <KitImage
                      src={i.image}
                      alt={`${i.teamName} ${i.kitName}`}
                      sizes="96px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">
                      {i.teamName} — {i.kitName}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      מידה {i.size} · {i.version === "Player" ? "שחקן" : "אוהד"}
                      {i.customName || i.customNumber
                        ? ` · ${[i.customName, i.customNumber].filter(Boolean).join(" ")}`
                        : ""}
                    </p>
                    <p className="mt-1 text-sm font-bold text-accent">
                      {formatPrice(i.unitPrice * i.qty)}
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <QuantityStepper
                        value={i.qty}
                        onChange={(n) => setQty(i.lineId, n)}
                      />
                      <button
                        type="button"
                        onClick={() => remove(i.lineId)}
                        aria-label={`הסרת ${i.teamName} ${i.kitName} מהעגלה`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={clear}
              className="mt-3 text-sm font-medium text-muted hover:text-foreground"
            >
              רוקן עגלה
            </button>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-surface-raised p-5">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>סה״כ</span>
              <span className="text-accent">{formatPrice(total)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">
              המשלוח והתשלום מסוכמים בשיחת הוואטסאפ.
            </p>
            <WhatsAppButton
              href={cartWhatsappUrl(items)}
              className="mt-4 w-full"
            >
              המשך להזמנה בוואטסאפ
            </WhatsAppButton>
          </aside>
        </div>
      )}
    </Container>
  );
}
