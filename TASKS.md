# Goalix — TASKS

Source of truth for build order. Check items off as completed. Do not reorder or
delete without owner approval.

> Repo folder, `package.json` name and the `.claude` dev-server id stay
> `footballkits-il` / `footballkits-dev` for continuity. The customer-facing
> brand is **Goalix** everywhere.

## Policy
- **Zero invented data.** No team, kit, price, size, season, version, deal,
  bestseller, review, image, or business/contact fact is created by guesswork.
  Everything comes from the owner. Missing data = a TODO here + a polished,
  shopper-friendly empty/coming-soon state in the UI (never "TODO", a filename,
  or a source path shown to customers).

## Done
- [x] Scaffold Next.js 16 + TypeScript + Tailwind v4 (App Router, `src/`)
- [x] Deps: framer-motion, clsx, lucide-react, next-themes
- [x] Theme system — **light is the fixed default** (OS preference not followed),
      manual light/dark toggle; azure/navy palette, RTL Hebrew
- [x] Fonts: **Rubik** (display, Hebrew+Latin) + Heebo (body); no uppercase /
      wide-tracking on Hebrew headings
- [x] Layout: sticky Header, Footer, sticky mobile "Order on WhatsApp" bar,
      desktop floating WhatsApp button
- [x] Cart store: React context + reducer + localStorage (`fki_cart_v1`)
- [x] WhatsApp order-message builder + `wa.me` deep link
- [x] Catalog access layer tolerant of an empty/partial `products.json`
- [x] Pages: `/`, `/shop`, `/team/[id]`, `/product/[kitId]`, `/deals`, `/cart`,
      `/faq`, `/shipping-returns`, `/contact`, `not-found`, `error`
- [x] Product page: gallery w/ tap-zoom, version selector (drives price), size
      selector, name+number, quantity, Add to Cart, Order on WhatsApp, reviews
- [x] SEO: per-route metadata + canonicals, OpenGraph + brand OG image,
      `sitemap.ts`, `robots.ts`, Organization/WebSite/Product/FAQ JSON-LD,
      `manifest.ts`
- [x] `KitImage` "תמונה בקרוב" fallback — no fake mockups
- [x] Empty data files: `deals.json` `[]`, `reviews.json` `{}`,
      `bestsellers.json` `[]`

## Done — rebrand + review pass (Goalix)
- [x] Rebrand FootballKits-il → **Goalix** across all customer-facing UI, meta,
      OG image, manifest, JSON-LD, WhatsApp presets
- [x] Contact: WhatsApp + SMS on `0559651785` (`972559651785`), emails
      `lavibz123@gmail.com` / `lavibz269@gmail.com` — surfaced on `/contact`
      (WhatsApp / SMS / mailto) and in the footer; JSON-LD `contactPoint`
- [x] Hero H1 → "חולצות כדורגל" (removed "מקוריות במראה")
- [x] Polished coming-soon states (`ComingSoon`) on `/` and `/shop` while the
      catalog is empty; deleted `TodoNotice`; removed every customer-visible
      "TODO" / filename / source-path
- [x] FAQ: answers describe only the on-site flow (spec-supported); every
      owner-specific point (delivery times, return terms, payment methods, etc.)
      is a neutral "יימסרו בתיאום ההזמנה" deferral — no invented policy. FAQ JSON-LD
- [x] Shipping & Returns: neutral "יימסרו בתיאום ההזמנה" copy only — no invented
      times / prices / return windows / conditions / payment methods / guarantees
- [x] a11y: unique filter-control ids per instance (desktop vs mobile drawer);
      collapsed mobile menu `inert` + `aria-hidden`; header icon buttons and
      cart remove button → 44px; drawer close button 44px + labelled
- [x] Desktop/tablet floating WhatsApp button
- [x] Removed duplicate in-page search on `/shop` (header search is the one)
- [x] Full-width primary CTAs on mobile (hero, empty cart, coming-soon, home CTA)
- [x] Single price format (`formatPrice`) shared by UI **and** WhatsApp messages
- [x] Empty-state wording made shopper-friendly (no "אין נתונים עדיין")

## Blocked — waiting on owner data (do NOT fill by guesswork)
- [ ] **Full catalog** — complete `src/data/products.json` (teams, kits, prices,
      `sizes`, `versions`, `season`). Until then every catalog surface shows the
      coming-soon state.
- [ ] **Deals** — real bundle deals for `src/data/deals.json` (ships `[]`).
- [ ] **Reviews** — real customer reviews for `src/data/reviews.json` (ships `{}`).
- [ ] **Bestsellers** — ordered kitId list for `src/data/bestsellers.json`
      (ships `[]`; homepage section stays hidden while empty).
- [ ] **Images** — real kit photos at the paths referenced by `products.json`,
      plus `public/images/hero.jpg`. Missing → "תמונה בקרוב".
- [ ] **Shipping & Returns / FAQ specifics** — if the owner wants concrete
      delivery times, shipping prices, a return window/conditions or payment
      methods published, provide that text (goes into
      `src/app/shipping-returns/page.tsx` and the relevant FAQ answers). Until
      then those points stay as neutral deferrals.
- [ ] **Social links** — Instagram / Facebook / TikTok in `src/config/site.ts`
      (nothing renders while empty).
- [ ] **Production URL** — set `site.url` in `src/config/site.ts` before deploy.
- [ ] **Address** — add to `/contact` + JSON-LD if the business has a public one.

## After data arrives
- [ ] Load real `products.json`; verify catalog, filters, team pages, product
      pages, search autocomplete
- [ ] Regenerate `public/images/README.md` checklist from the real data
- [ ] Verify the WhatsApp order message end-to-end with a real multi-item cart
- [ ] Lighthouse mobile pass (performance, a11y, SEO)
- [ ] Real favicon / PWA icons (192, 512) — manifest currently points only at
      `favicon.ico`
- [ ] Swap the `opengraph-image` gradient for brand artwork if provided
