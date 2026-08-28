# FootballKits-il — TASKS

Source of truth for build order. Check items off as completed. Do not reorder or
delete without owner approval.

## Policy
- **Zero invented data.** No team, kit, price, size, season, version, deal,
  bestseller, review, image, or policy text is created by guesswork. Everything
  comes from owner-supplied files. Missing data = a TODO here + a visible empty
  state in the UI.

## Done
- [x] Scaffold Next.js 16 + TypeScript + Tailwind v4 (App Router, `src/`)
- [x] Deps: framer-motion, clsx, lucide-react, next-themes
- [x] Theme system (dark default + light), football palette, RTL Hebrew
- [x] Fonts: Oswald (display) + Heebo (body)
- [x] Layout: sticky Header (logo, search, cart, theme), Footer, sticky mobile
      "Order on WhatsApp" bar
- [x] Cart store: React context + reducer + localStorage (`fki_cart_v1`)
- [x] WhatsApp order-message builder + `wa.me` deep link (number 972555568418)
- [x] Catalog access layer tolerant of an empty/partial `products.json`
- [x] Pages: `/`, `/shop` (filters + search), `/team/[id]`, `/product/[kitId]`,
      `/deals`, `/cart`, `/faq`, `/shipping-returns`, `/contact`, `not-found`
- [x] Product page: gallery w/ tap-zoom, version selector (drives price), size
      selector, name+number, quantity, Add to Cart, Order on WhatsApp, reviews
- [x] SEO: per-route metadata, OpenGraph, `sitemap.ts`, `robots.ts`, Product
      JSON-LD
- [x] `KitImage` "תמונה בקרוב" (image coming soon) fallback — no fake mockups
- [x] Empty data files: `deals.json` `[]`, `reviews.json` `{}`,
      `bestsellers.json` `[]`

## Blocked — waiting on owner data (do NOT fill by guesswork)
- [ ] **`src/data/products.json`** — full file. The brief's paste was truncated
      inside the "Netherlands" entry. Need the complete catalog (teams, kits,
      prices, `sizes`, `versions`, `season`). Until then every catalog surface
      shows an empty state.
- [ ] **`src/data/deals.json`** — real bundle deals. Page + types ready; ships
      as `[]`.
- [ ] **`src/data/reviews.json`** — real customer reviews keyed by kitId. Ships
      as `{}`.
- [ ] **`src/data/bestsellers.json`** — ordered kitId list once owner decides.
      Homepage "Bestsellers" section stays hidden while empty.
- [ ] **`public/images/`** — real kit photos at the exact paths referenced by
      `products.json` (`/images/<team>/<slot>-<front|back>.jpg`), plus
      `public/images/hero.jpg` for the homepage banner.
- [ ] **FAQ answers** — real text for `src/app/faq/page.tsx`.
- [ ] **Shipping & Returns policy** — real text for
      `src/app/shipping-returns/page.tsx`.
- [ ] **Contact details** — email / phone / address in `src/config/site.ts`.
- [ ] **Social links** — Instagram / Facebook / TikTok in `src/config/site.ts`.
- [ ] **Production URL** — set `site.url` in `src/config/site.ts` before deploy.

## After data arrives
- [ ] Load real `products.json`, verify catalog, filters, team pages, product
      pages, search autocomplete
- [ ] Regenerate `public/images/README.md` checklist from the real data
- [ ] Verify WhatsApp message format end-to-end with a real multi-item cart
- [ ] Lighthouse mobile pass (performance, a11y, SEO)
- [ ] Owner review of copy + theme
