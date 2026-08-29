import "server-only";

// SERVER-ONLY. Importing this from a "use client" module is a build error.
//
// The site's public origin, read from the private `SITE_URL` env var. It is
// only ever rendered server-side — canonical URLs, sitemap.xml, robots.txt,
// Open Graph tags and JSON-LD — so it never needs to reach the browser bundle
// and is kept out of the client-bundled `@/config/site` object.
//
// Production MUST set `SITE_URL` (see .env.example). No real domain exists yet,
// so the fallback below is a local-development placeholder only, never a
// claimed production URL. Tracked in TASKS.md.

const DEV_FALLBACK_URL = "http://localhost:3000";

/** Public origin of the site — scheme + host, no trailing slash. */
export const siteUrl = (process.env.SITE_URL || DEV_FALLBACK_URL).replace(
  /\/$/,
  "",
);

/** True once a real production origin has been configured via env. */
export const hasRealSiteUrl = Boolean(process.env.SITE_URL);
