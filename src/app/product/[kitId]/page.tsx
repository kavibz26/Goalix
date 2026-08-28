import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ReviewList } from "@/components/product/ReviewList";
import {
  getAllProducts,
  getProduct,
  getReviews,
  getSizeOptions,
  getVersions,
  KNOWN_VERSIONS,
} from "@/lib/catalog";
import { resolveImage } from "@/lib/serverImages";
import { site } from "@/config/site";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ kitId: p.kitId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kitId: string }>;
}): Promise<Metadata> {
  const { kitId } = await params;
  const product = getProduct(kitId);
  if (!product) return { title: "חולצה לא נמצאה" };
  const title = `${product.teamName} ${product.name}`;
  return {
    title,
    description: `${title} — עונת ${product.season ?? "2025/26"}. הזמנה מהירה בוואטסאפ.`,
    openGraph: {
      title,
      images: product.images.front ? [product.images.front] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ kitId: string }>;
}) {
  const { kitId } = await params;
  const product = getProduct(kitId);
  if (!product) notFound();

  const sizeOptions = getSizeOptions(product.age);
  const versionOptions = getVersions().length ? getVersions() : KNOWN_VERSIONS;
  const reviews = getReviews(kitId);
  const frontImg = resolveImage(product.images.front);
  const backImg = resolveImage(product.images.back);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.teamName} ${product.name}`,
    category: product.league,
    image: frontImg ? [frontImg] : undefined,
    offers: Object.entries(product.price).map(([v, price]) => ({
      "@type": "Offer",
      price,
      priceCurrency: "ILS",
      name: v,
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <Container className="py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-4 text-sm text-muted">
        <Link href="/shop" className="hover:text-foreground">
          כל החולצות
        </Link>{" "}
        /{" "}
        <Link href={`/team/${product.teamId}`} className="hover:text-foreground">
          {product.teamNameHe ?? product.teamName}
        </Link>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery
          front={frontImg}
          back={backImg}
          title={`${product.teamName} ${product.name}`}
        />
        <ProductDetail
          product={{ ...product, images: { front: frontImg, back: backImg } }}
          sizeOptions={sizeOptions}
          versionOptions={versionOptions}
        />
      </div>

      <section className="mt-14">
        <h2 className="mb-4 font-display text-2xl font-bold">
          ביקורות לקוחות
        </h2>
        <ReviewList reviews={reviews} />
      </section>

      <p className="mt-10 text-xs text-muted">
        הזמנות מתבצעות בוואטסאפ אל {site.whatsappDisplay}. אין תשלום באתר.
      </p>
    </Container>
  );
}
