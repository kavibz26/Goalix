# Goalix

Mobile-first e-commerce storefront for football kits. No on-site payment — every
order is finalised in WhatsApp with a pre-filled message.

> The repo folder / `package.json` name / dev-server id stay `footballkits-il`
> for continuity; the customer-facing brand is **Goalix**.

## Stack
- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- `next-themes` — light is the fixed default, manual light/dark toggle
- `lucide-react` icons · cart state in React context + `localStorage`
- Scroll-reveal is a tiny IntersectionObserver + CSS effect (no animation lib)
- Hebrew / RTL first

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `SITE_URL` | **production** | Public origin (scheme + host, no trailing slash). Drives canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph and JSON-LD. **Server-only** — read only in `src/config/site-url.ts` (guarded with `server-only`) and rendered server-side; never sent to the browser. Must be set at **build time**. Falls back to `http://localhost:3000` in development only. |

Copy `.env.example` → `.env.local` for local overrides. On Vercel, add `SITE_URL`
as a plain (non-public) Environment Variable for the Production environment.

## Data — owner supplied, never invented
All catalog content lives in `src/data/` and is provided by the site owner. The
app renders polished "coming soon" states until real data is in place.

| File | Purpose | Ships as |
|------|---------|----------|
| `src/data/products.json` | teams, kits, prices, sizes, versions, season | empty skeleton |
| `src/data/deals.json` | bundle deals | `[]` |
| `src/data/reviews.json` | reviews keyed by kitId | `{}` |
| `src/data/bestsellers.json` | ordered kitId list | `[]` |

Site-level config (brand name, WhatsApp/SMS number, contact emails, social
links): `src/config/site.ts`.

Images: real photos only, dropped into `public/images/` — see [IMAGES.md](./IMAGES.md).
Run `npm run images:manifest` after loading the real `products.json` to generate
a per-file checklist.

## Status
See [TASKS.md](./TASKS.md) for progress, the owner-supplied data still
outstanding, and the two items that must be done before the real catalog launch.
