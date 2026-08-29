import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site-url";
import { getAllProducts, getTeams } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;

  // Indexable pages only. /cart is intentionally excluded — it is noindex.
  const staticPaths = [
    "",
    "/shop",
    "/about",
    "/deals",
    "/faq",
    "/shipping-returns",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p || "/"}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  for (const t of getTeams()) {
    entries.push({ url: `${base}/team/${t.id}`, changeFrequency: "weekly" });
  }
  for (const p of getAllProducts()) {
    entries.push({ url: `${base}/product/${p.kitId}`, changeFrequency: "weekly" });
  }

  return entries;
}
