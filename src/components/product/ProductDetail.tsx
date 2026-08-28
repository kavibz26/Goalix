"use client";

import { useMemo, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import type { Product, Version } from "@/lib/types";
import { useCart } from "@/store/cart";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export function ProductDetail({
  product,
  sizeOptions,
  versionOptions,
}: {
  product: Product;
  sizeOptions: string[];
  versionOptions: Version[];
}) {
  const { add } = useCart();

  const versions = versionOptions.filter(
    (v) => typeof product.price[v] === "number",
  );
  const [version, setVersion] = useState<Version | null>(versions[0] ?? null);
  const [size, setSize] = useState<string>("");
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const unitPrice = version ? product.price[version] ?? null : null;

  const canOrder = Boolean(version && size && unitPrice !== null);

  const lineForWhatsapp = useMemo(() => {
    if (!canOrder || !version || unitPrice === null) return null;
    return buildOrderMessage([
      {
        teamName: product.teamName,
        kitName: product.name,
        size,
        version,
        customName: customName.trim() || undefined,
        customNumber: customNumber.trim() || undefined,
        qty,
        unitPrice,
      },
    ]);
  }, [
    canOrder,
    version,
    unitPrice,
    product.teamName,
    product.name,
    size,
    customName,
    customNumber,
    qty,
  ]);

  function handleAdd() {
    if (!canOrder || !version || unitPrice === null) return;
    add({
      kitId: product.kitId,
      teamId: product.teamId,
      teamName: product.teamName,
      kitName: product.name,
      image: product.images.front,
      size,
      version,
      customName: customName.trim() || undefined,
      customNumber: customNumber.trim() || undefined,
      qty,
      unitPrice,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted">{product.teamNameHe ?? product.teamName}</p>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">
          {product.nameHe ?? product.name}
        </h1>
        <p className="mt-2 text-xl font-bold text-accent">
          {unitPrice !== null ? formatPrice(unitPrice) : "מחיר יתעדכן בקרוב"}
        </p>
      </div>

      {/* Version */}
      <div>
        <span className="mb-2 block text-sm font-semibold">גרסה</span>
        {versions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {versions.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVersion(v)}
                className={cn(
                  "min-h-11 rounded-xl border px-4 text-sm font-medium",
                  version === v
                    ? "border-accent bg-accent text-accent-contrast"
                    : "border-border",
                )}
              >
                {v === "Player" ? "שחקן (Player)" : "אוהד (Fan)"} ·{" "}
                {formatPrice(product.price[v] ?? null)}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">גרסאות ומחירים יתווספו בקרוב.</p>
        )}
      </div>

      {/* Size */}
      <div>
        <span className="mb-2 block text-sm font-semibold">מידה</span>
        {sizeOptions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "min-h-11 min-w-11 rounded-xl border px-3 text-sm font-medium",
                  size === s
                    ? "border-accent bg-accent text-accent-contrast"
                    : "border-border",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">טבלת מידות תתווסף עם נתוני הקטלוג.</p>
        )}
      </div>

      {/* Customisation */}
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">
          <span className="mb-1 block font-semibold">שם על הגב (רשות)</span>
          <input
            value={customName}
            onChange={(e) => setCustomName(e.target.value.slice(0, 12))}
            placeholder="MESSI"
            className="min-h-11 w-full rounded-xl border border-border bg-surface-raised px-3 uppercase"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-semibold">מספר (רשות)</span>
          <input
            value={customNumber}
            inputMode="numeric"
            onChange={(e) =>
              setCustomNumber(e.target.value.replace(/\D/g, "").slice(0, 2))
            }
            placeholder="10"
            className="min-h-11 w-full rounded-xl border border-border bg-surface-raised px-3"
          />
        </label>
      </div>

      {/* Quantity */}
      <div>
        <span className="mb-2 block text-sm font-semibold">כמות</span>
        <QuantityStepper value={qty} onChange={setQty} />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!canOrder}
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-accent px-6 font-semibold text-accent-contrast disabled:opacity-40"
        >
          {added ? (
            <>
              <Check className="h-5 w-5" /> נוסף לעגלה
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" /> הוספה לעגלה
            </>
          )}
        </button>

        <WhatsAppButton
          href={
            lineForWhatsapp
              ? whatsappUrl(lineForWhatsapp)
              : whatsappUrl(
                  `Hi, I'm interested in ${product.teamName} ${product.name}`,
                )
          }
          variant="outline"
        >
          הזמנה בוואטסאפ
        </WhatsAppButton>

        {!canOrder ? (
          <p className="text-xs text-muted">
            בחרו גרסה ומידה כדי להוסיף לעגלה או להזמין בוואטסאפ.
          </p>
        ) : null}
      </div>
    </div>
  );
}
