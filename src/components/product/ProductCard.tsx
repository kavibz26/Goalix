import Link from "next/link";
import type { Product } from "@/lib/types";
import { priceFrom } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { resolveImage } from "@/lib/serverImages";
import { KitImage } from "@/components/product/KitImage";
import { Badge } from "@/components/ui";

export function ProductCard({ product }: { product: Product }) {
  const from = priceFrom(product);

  return (
    <Link
      href={`/product/${product.kitId}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square bg-surface p-3">
        <KitImage
          src={resolveImage(product.images.front)}
          alt={`${product.teamName} ${product.name} — מלפנים`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
        />
        {product.season ? (
          <span className="absolute end-2 top-2">
            <Badge tone="muted">{product.season}</Badge>
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="text-xs text-muted">
          {product.teamNameHe ?? product.teamName}
        </span>
        <span className="line-clamp-2 text-sm font-semibold">
          {product.nameHe ?? product.name}
        </span>
        <span className="mt-auto pt-1 text-sm font-bold text-accent">
          {from !== null ? `החל מ־${formatPrice(from)}` : "מחיר בקרוב"}
        </span>
      </div>
    </Link>
  );
}
