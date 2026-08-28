import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

/** Horizontally scrolling row of product cards (snappy on mobile). */
export function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {products.map((p) => (
        <div
          key={p.kitId}
          className="w-40 shrink-0 snap-start sm:w-52"
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
