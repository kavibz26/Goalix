import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllProducts, getTeams } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const staticPaths = [
    "",
    "/shop",
    "/deals",
    "/cart",
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
