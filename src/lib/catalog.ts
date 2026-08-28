// Catalog access layer.
//
// Every value returned here originates from src/data/*.json, which is owner-supplied.
// The helpers are deliberately tolerant of a partial or empty products.json so the
// site renders clean empty states until the real catalog is provided.

import productsData from "@/data/products.json";
import dealsData from "@/data/deals.json";
import reviewsData from "@/data/reviews.json";
import bestsellersData from "@/data/bestsellers.json";
import type {
  AgeGroup,
  BestsellersFile,
  Deal,
  Product,
  ProductsFile,
  RawTeam,
  Review,
  ReviewsFile,
  Version,
} from "@/lib/types";

const products = productsData as unknown as ProductsFile;
const deals = dealsData as unknown as Deal[];
const reviews = reviewsData as unknown as ReviewsFile;
const bestsellers = bestsellersData as unknown as BestsellersFile;

export const RETRO_SEASON = "Retro";
export const KNOWN_SEASONS = ["2025/26", "2024/25", RETRO_SEASON] as const;
export const KNOWN_VERSIONS: Version[] = ["Fan", "Player"];
export const KNOWN_AGES: AgeGroup[] = ["Adults", "Kids"];

export function getSiteMeta() {
  return {
    siteName: products.siteName ?? "FootballKits-il",
    season: products.season ?? null,
  };
}

export function getSizeOptions(age: AgeGroup): string[] {
  return products.sizes?.[age] ?? [];
}

export function getVersions(): Version[] {
  return products.versions?.length ? products.versions : [];
}

export function getTeams(): RawTeam[] {
  return products.teams ?? [];
}

export function hasCatalog(): boolean {
  return getTeams().length > 0;
}

export function getTeam(teamId: string): RawTeam | undefined {
  return getTeams().find((t) => t.id === teamId);
}

/** Flatten every team + kit pair into page-ready Product records. */
export function getAllProducts(): Product[] {
  const fileSeason = products.season ?? null;
  const out: Product[] = [];
  for (const team of getTeams()) {
    for (const kit of team.kits ?? []) {
      out.push({
        kitId: kit.id,
        teamId: team.id,
        teamName: team.name,
        teamNameHe: team.name_he,
        teamType: team.type,
        league: kit.league ?? team.league,
        name: kit.name,
        nameHe: kit.name_he,
        season: kit.season ?? fileSeason,
        age: kit.age ?? "Adults",
        price: kit.price ?? {},
        images: kit.images ?? {},
      });
    }
  }
  return out;
}

export function getProduct(kitId: string): Product | undefined {
  return getAllProducts().find((p) => p.kitId === kitId);
}

export function getTeamProducts(teamId: string): Product[] {
  return getAllProducts().filter((p) => p.teamId === teamId);
}

/** Distinct leagues present in the supplied data. */
export function getLeagues(): string[] {
  return [...new Set(getAllProducts().map((p) => p.league))].sort();
}

/** Distinct seasons present in the supplied data. */
export function getSeasons(): string[] {
  return [
    ...new Set(
      getAllProducts()
        .map((p) => p.season)
        .filter((s): s is string => Boolean(s)),
    ),
  ];
}

export function priceFrom(product: Product): number | null {
  const values = Object.values(product.price).filter(
    (n): n is number => typeof n === "number",
  );
  return values.length ? Math.min(...values) : null;
}

// ---------------------------------------------------------------------------
// New Arrivals — kits whose season equals the file's current season.
// No editorial curation: it is a pure filter over owner data.
// ---------------------------------------------------------------------------
export function getNewArrivals(): Product[] {
  const season = products.season ?? null;
  if (!season) return [];
  return getAllProducts().filter((p) => p.season === season);
}

// ---------------------------------------------------------------------------
// Bestsellers — strictly the ids listed in bestsellers.json, in order.
// Empty until the owner decides. Callers hide the section when empty.
// ---------------------------------------------------------------------------
export function getBestsellers(): Product[] {
  if (!bestsellers?.length) return [];
  const byId = new Map(getAllProducts().map((p) => [p.kitId, p]));
  return bestsellers
    .map((id) => byId.get(id))
    .filter((p): p is Product => Boolean(p));
}

// ---------------------------------------------------------------------------
// Deals — verbatim from deals.json. Empty array until owner supplies real data.
// ---------------------------------------------------------------------------
export function getDeals(): Deal[] {
  return deals ?? [];
}

export function hasDeals(): boolean {
  return getDeals().length > 0;
}

// ---------------------------------------------------------------------------
// Reviews — verbatim from reviews.json, keyed by kitId.
// ---------------------------------------------------------------------------
export function getReviews(kitId: string): Review[] {
  return reviews?.[kitId] ?? [];
}

// ---------------------------------------------------------------------------
// Search — client- or server-side, over owner data only.
// ---------------------------------------------------------------------------
export interface SearchHit {
  kind: "team" | "kit";
  id: string;
  label: string;
  labelHe?: string;
  href: string;
  sub?: string;
}

export function searchCatalog(query: string, limit = 8): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hits: SearchHit[] = [];

  for (const team of getTeams()) {
    if (
      team.name.toLowerCase().includes(q) ||
      (team.name_he ?? "").toLowerCase().includes(q)
    ) {
      hits.push({
        kind: "team",
        id: team.id,
        label: team.name,
        labelHe: team.name_he,
        href: `/team/${team.id}`,
        sub: team.league,
      });
    }
  }

  for (const p of getAllProducts()) {
    const haystack = [p.name, p.nameHe, p.teamName, p.teamNameHe]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (haystack.includes(q)) {
      hits.push({
        kind: "kit",
        id: p.kitId,
        label: `${p.teamName} — ${p.name}`,
        labelHe: p.teamNameHe ? `${p.teamNameHe} — ${p.nameHe ?? p.name}` : undefined,
        href: `/product/${p.kitId}`,
        sub: p.league,
      });
    }
  }

  return hits.slice(0, limit);
}

// ---------------------------------------------------------------------------
// Shop filtering
// ---------------------------------------------------------------------------
export interface CatalogFilters {
  team?: string;
  league?: string;
  season?: string;
  version?: Version;
  age?: AgeGroup;
  query?: string;
}

export function filterProducts(filters: CatalogFilters): Product[] {
  let list = getAllProducts();

  if (filters.team) list = list.filter((p) => p.teamId === filters.team);
  if (filters.league) list = list.filter((p) => p.league === filters.league);
  if (filters.season) list = list.filter((p) => p.season === filters.season);
  if (filters.age) list = list.filter((p) => p.age === filters.age);
  if (filters.version) {
    list = list.filter((p) => typeof p.price[filters.version!] === "number");
  }
  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    list = list.filter((p) =>
      [p.name, p.nameHe, p.teamName, p.teamNameHe]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }

  return list;
}
