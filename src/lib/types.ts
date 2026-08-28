// Shared domain types for the FootballKits-il catalog.
// The catalog data itself is supplied by the site owner via src/data/*.json.
// These types describe the shape that data must follow — they never invent values.

export type Version = "Fan" | "Player";
export type AgeGroup = "Adults" | "Kids";
export type TeamType = "club" | "national";

/** A single kit as it appears inside a team entry in products.json. */
export interface RawKit {
  id: string;
  name: string;
  name_he?: string;
  /** Price keyed by version, e.g. { "Fan": 199, "Player": 249 }. */
  price: Partial<Record<Version, number>>;
  images: {
    front?: string;
    back?: string;
  };
  /** Optional overrides; fall back to the parent team / file when absent. */
  season?: string;
  league?: string;
  age?: AgeGroup;
}

export interface RawTeam {
  id: string;
  name: string;
  name_he?: string;
  type: TeamType;
  league: string;
  kits: RawKit[];
}

export interface ProductsFile {
  siteName: string;
  season: string | null;
  sizes: Record<AgeGroup, string[]>;
  versions: Version[];
  teams: RawTeam[];
}

/** A flattened, page-ready product record derived from a team + one of its kits. */
export interface Product {
  kitId: string;
  teamId: string;
  teamName: string;
  teamNameHe?: string;
  teamType: TeamType;
  league: string;
  name: string;
  nameHe?: string;
  season: string | null;
  age: AgeGroup;
  price: Partial<Record<Version, number>>;
  images: { front?: string; back?: string };
}

export interface Deal {
  id: string;
  title: string;
  title_he?: string;
  /** Number of kits included in the bundle. */
  kitCount: number;
  bundlePrice: number;
  originalPrice?: number;
  badge?: string;
  /** Kit ids the deal applies to; empty / omitted = any kit. */
  appliesTo?: string[];
}

export interface Review {
  author: string;
  rating: number;
  date?: string;
  title?: string;
  body: string;
}

/** reviews.json maps a kitId to its list of reviews. */
export type ReviewsFile = Record<string, Review[]>;

/** bestsellers.json is an ordered list of kit ids. */
export type BestsellersFile = string[];
