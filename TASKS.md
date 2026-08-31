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

## Done — real brand logo (owner-supplied)
- [x] Owner supplied the final Goalix logo (violet "G + ball" mark + "GOALIX"
      wordmark + "FOOTBALL IS YOURS", composed on black). Rasterised with `sharp`:
  - `public/brand/goalix-logo-dark.png` — full lockup, shown in the dark Hero
    (`mix-blend-screen` drops the black backdrop over the hero gradient)
  - `src/app/icon.png` — favicon (mark on a rounded dark square)
  - `src/app/apple-icon.png`, `public/icons/icon-192.png`, `icon-512.png` — PWA
  - `src/app/opengraph-image.png` (+ `.alt.txt`) — link preview
- [x] Deleted the SVG-approximation generators: `src/app/icon.svg`,
      `apple-icon.tsx`, `opengraph-image.tsx`, `src/app/icons/*/route.ts`,
      `src/lib/brand-icon.tsx`
- [x] `site.tagline` → **"FOOTBALL IS YOURS"** (official slogan; kept English in
      every branded spot: `Logo` microtext, footer, `/about`, OG)
- [x] Header / footer keep the adaptive SVG `Logo` monogram (owner's choice — the
      raster logo is black-backed, used only on dark surfaces: Hero + favicon)

## Done
- [x] Scaffold Next.js 16 + TypeScript + Tailwind v4 (App Router, `src/`)
- [x] Deps: clsx, lucide-react, next-themes (framer-motion removed — see below)
- [x] Theme system — **light is the fixed default** (OS preference not followed),
      manual light/dark toggle; violet/magenta/night palette, RTL Hebrew
- [x] Fonts: **Rubik** (display, Hebrew+Latin) + Heebo (body); no uppercase /
      wide-tracking on Hebrew headings
- [x] Layout: sticky Header, Footer, sticky mobile "Order on WhatsApp" bar,
      desktop floating WhatsApp button
- [x] Cart store: React context + reducer + localStorage (`goalix_cart_v1`)
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
- [x] Contact: WhatsApp + SMS on `0559651785` (`972559651785`), email
      `lavibz123@gmail.com` (single address) — surfaced on `/contact`
      (WhatsApp / SMS / mailto) and in the footer; JSON-LD `contactPoint`
- [x] Hero H1 → "חולצות כדורגל" (removed "מקוריות במראה")
- [x] Polished coming-soon states (`ComingSoon`) on `/` and `/shop` while the
      catalog is empty; deleted `TodoNotice`; removed every customer-visible
      "TODO" / filename / source-path
- [x] FAQ: 10 Q&As, all from owner-supplied text (sizes 6–XXL, not licensed /
      inspired-by, name+number +10 ₪, shipping 15 ₪, delivery < 1 month,
      cancel / return by contacting us, payment sorted via WhatsApp / SMS / email,
      ordering steps, in-catalog only). Same `<details>` UI + FAQ JSON-LD.
      (Earlier pass used neutral "יימסרו בתיאום ההזמנה" deferrals — replaced now
      that the owner provided the facts.)
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

## Done — visual redesign (violet / premium, mockup-referenced)
- [x] Palette swap azure/navy → **violet / magenta / deep-night** (light + dark),
      approved by owner; deal badge orange → magenta; WhatsApp green kept
- [x] New brand mark — "G + swoosh" SVG (`Logo` component, `icon.svg`,
      `brand-icon.tsx` for apple-icon + manifest PNGs) — SVG approximation,
      not a final logo file
- [x] Dark, premium hero with violet lighting; H1 "פשוט. חכם. בשבילך.";
      sub "חולצות כדורגל נבחרות — ישירות אליך"; tagline "Smart Finds. Global Vibes."
- [x] `TrustStrip` — משלוחים לכל הארץ · קנייה בטוחה · שירות אישי (labels only,
      no delivery-time/policy claims); light row on the homepage + dark band
      above the footer
- [x] `ComingSoon` — violet package illustration (SVG)
- [x] New `/about` page (הסיפור שלנו + 3 values); added to nav + sitemap + footer
- [x] Nav → דף הבית · חנות · אודות · שאלות נפוצות · צור קשר ("מבצעים" moved to
      the footer)
- [x] `site.tagline`; description reworded (still football-kit-clear); OG image
      restyled violet + brand mark (English copy — Satori has no Hebrew font)
- [x] **Football-kit store unchanged:** catalog / `/shop` + filters /
      `/product/[kitId]` / cart / WhatsApp message format / sizes / versions /
      `products.json` empty skeleton — none touched

## Done — production-readiness pass (empty-catalog storefront)
- [x] Site origin is env-driven via the **server-only** `SITE_URL` (in
      `src/config/site-url.ts`, guarded with `server-only`, kept out of the
      client `@/config/site` object); `.env.example` documents it; local-dev
      fallback `http://localhost:3000` — no fake production domain
- [x] `/cart` removed from `sitemap.ts` (it is noindex)
- [x] Goalix icons (superseded by the real-logo pass above — now static PNGs
      from the owner artwork): deleted the create-next-app `favicon.ico` and the
      5 template SVGs in `public/`
- [x] `public/images/README.md` → `IMAGES.md` at repo root (no longer served)
- [x] Security headers in `next.config.ts` (nosniff, X-Frame-Options SAMEORIGIN,
      Referrer-Policy, Permissions-Policy, HSTS) + `poweredByHeader: false`
- [x] `data-scroll-behavior="smooth"` on `<html>` (no smooth-scroll on route
      transitions)
- [x] Removed `border-radius` from the global `:focus-visible` rule
- [x] Removed `framer-motion`; `Reveal` is now IntersectionObserver + CSS,
      reduced-motion-safe, never hides above-the-fold / no-JS content
- [x] Mobile menu: Escape + outside-tap + route-change all close it
- [x] Footer links are ≥44px tap targets on mobile; contact split into separate
      WhatsApp / SMS / email links
- [x] `EmptyState` restyled solid (consistent with `ComingSoon`)
- [x] Mobile Goalix logo/header tap target ≥44px
- [x] Search input upgraded to a proper combobox (`role`, `aria-expanded`,
      `aria-controls`, `aria-activedescendant`; `role="option"` items)
- [x] `localStorage` key `fki_cart_v1` → `goalix_cart_v1`
- [x] Fonts: Hebrew subset preloaded; Rubik (display) `preload: false`
- [x] `AGENTS.md` / `CLAUDE.md` untracked + gitignored (machine-local tooling)
- [x] Removed obsolete `<meta name="keywords">`
- [x] Consistent `theme-color: #ffffff` (matches forced-light default)
- [x] 404 page: `title: "הדף לא נמצא"` + `robots: noindex`

## Blockers before REAL catalog launch (deferred from the audit)
- [ ] **P1-7 · Search / catalog client bundle.** `SearchAutocomplete` (global
      header) imports `searchCatalog` from `lib/catalog.ts`, which statically
      imports `products.json` / `deals.json` / `reviews.json` /
      `bestsellers.json`. Harmless while empty, but once `products.json` holds
      the real catalog the whole thing ships in the client bundle on every page.
      Fix before catalog launch: a build-time minimal search index (id / name /
      team / league), or a route handler / server action; stop `catalog.ts`
      being reachable from a client component.
- [ ] **P1-8 · Real dialog for `FilterPanel` drawer + `ProductGallery` zoom.**
      Both are plain `<div>`s: no `role="dialog"` / `aria-modal`, no focus trap,
      no Escape, no body scroll-lock, no focus restoration. Unreachable while the
      catalog is empty, so not a blocker for *this* deploy — but must be a proper
      dialog before product pages go live.

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
- [ ] **Shipping & Returns page** — `src/app/shipping-returns/page.tsx` still
      holds neutral "יימסרו בתיאום ההזמנה" copy. The owner has now given some
      specifics via the FAQ (shipping 15 ₪, delivery < 1 month, cancel / return by
      contacting us) — fold those into this page too when the owner confirms the
      full return window / conditions.
- [ ] **Social links** — Instagram / Facebook / TikTok in `src/config/site.ts`
      (nothing renders while empty).
- [ ] **Production URL** — set `SITE_URL` (server-only) in the host's env at
      **build time** before deploy (`hasRealSiteUrl` is `false` until then;
      canonicals / sitemap / robots / OG / JSON-LD use the localhost fallback).
- [ ] **Address** — add to `/contact` + JSON-LD if the business has a public one.

## After data arrives
- [ ] Load real `products.json`; verify catalog, filters, team pages, product
      pages, search autocomplete
- [ ] Regenerate `IMAGES.md` checklist from the real data (`npm run images:manifest`)
- [ ] Verify the WhatsApp order message end-to-end with a real multi-item cart
- [ ] Lighthouse mobile pass (performance, a11y, SEO)
- [x] Swap the `opengraph-image` gradient / `brand-icon` monogram for real brand
      artwork — done (owner supplied the logo; see "Done — real brand logo")
