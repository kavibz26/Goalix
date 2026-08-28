import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, EmptyState } from "@/components/ui";
import { ComingSoon } from "@/components/ComingSoon";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterPanel, type FilterOptions } from "@/components/shop/FilterPanel";
import {
  filterProducts,
  getLeagues,
  getSeasons,
  getTeams,
  getVersions,
  hasCatalog,
  KNOWN_AGES,
  KNOWN_SEASONS,
  KNOWN_VERSIONS,
  type CatalogFilters,
} from "@/lib/catalog";
import type { AgeGroup, Version } from "@/lib/types";

export const metadata: Metadata = {
  title: "כל החולצות",
  description: "עיון וסינון של כל חולצות הכדורגל בחנות Goalix.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const pick = (k: string) => {
    const v = sp[k];
    return (Array.isArray(v) ? v[0] : v) ?? undefined;
  };

  if (!hasCatalog()) {
    return (
      <Container className="py-8">
        <h1 className="font-display text-3xl font-bold">כל החולצות</h1>
        <div className="mt-6">
          <ComingSoon body="עוד רגע אפשר יהיה לסנן לפי קבוצה, ליגה, עונה וגרסה. בינתיים — כתבו לנו בוואטסאפ ונעדכן אתכם ברגע שהחולצות עולות." />
        </div>
      </Container>
    );
  }

  const filters: CatalogFilters = {
    team: pick("team"),
    league: pick("league"),
    season: pick("season"),
    version: pick("version") as Version | undefined,
    age: pick("age") as AgeGroup | undefined,
    query: pick("q"),
  };

  const results = filterProducts(filters);
  const dataSeasons = getSeasons();

  const options: FilterOptions = {
    teams: getTeams().map((t) => ({ id: t.id, label: t.name_he ?? t.name })),
    leagues: getLeagues(),
    seasons: dataSeasons.length ? dataSeasons : [...KNOWN_SEASONS],
    versions: getVersions().length ? getVersions() : KNOWN_VERSIONS,
    ages: KNOWN_AGES,
  };

  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl font-bold">כל החולצות</h1>

      <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr]">
        <Suspense
          fallback={<div className="text-sm text-muted">טוען סינון…</div>}
        >
          <FilterPanel options={options} />
        </Suspense>

        <div>
          <p className="mb-4 text-sm text-muted">{results.length} תוצאות</p>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.kitId} product={p} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="לא נמצאו חולצות מתאימות"
              hint="נסו לנקות חלק מהסינון."
            />
          )}
        </div>
      </div>
    </Container>
  );
}
