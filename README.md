# FootballKits-il

Mobile-first e-commerce storefront for football kits. No on-site payment — every
order is finalised in WhatsApp with a pre-filled message.

## Stack
- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- `next-themes` (dark default + light) · `framer-motion` micro-animations
- Cart state in React context, persisted to `localStorage`
- Hebrew / RTL first

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Data — owner supplied, never invented
All catalog content lives in `src/data/` and is provided by the site owner. The
app renders clean empty states until real data is in place.

| File | Purpose | Ships as |
|------|---------|----------|
| `src/data/products.json` | teams, kits, prices, sizes, versions, season | skeleton (awaiting full file) |
| `src/data/deals.json` | bundle deals | `[]` |
| `src/data/reviews.json` | reviews keyed by kitId | `{}` |
| `src/data/bestsellers.json` | ordered kitId list | `[]` |

Site-level config (WhatsApp number, contact details, social links, production
URL): `src/config/site.ts`.

Images: real photos only, under `public/images/` — see
`public/images/README.md`. Run `npm run images:manifest` after loading the real
`products.json` to generate a per-file checklist.

## Status
See [TASKS.md](./TASKS.md) for build progress and the list of owner-supplied
data still outstanding.
