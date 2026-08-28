# Images

Drop **real** kit photos here. No placeholders, no stock images — a missing file
renders a tidy "תמונה בקרוב" (image coming soon) state on the site.

## Expected layout

```
public/images/
  hero.jpg                         # homepage hero banner (wide, high quality)
  <team-id>/
    home-front.jpg
    home-back.jpg
    away-front.jpg
    away-back.jpg
    third-front.jpg
    third-back.jpg
```

`<team-id>` and the exact file names come from the `images.front` / `images.back`
paths in `src/data/products.json`. Once the real `products.json` is in place,
run:

```bash
npm run images:manifest
```

to regenerate a precise checklist of every path the catalog references.

## Current status

`products.json` has not been provided yet, so no image paths are known.
