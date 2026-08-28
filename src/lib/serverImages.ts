// SERVER-ONLY. Do not import from a "use client" module.
//
// The catalog references image paths that may not have real files yet. Rather
// than let <Image> hit the optimizer and 400, server components resolve each
// path here: a real file passes through, a missing one becomes `undefined` so
// <KitImage> renders the tidy "תמונה בקרוב" state with no network request.

import { existsSync } from "node:fs";
import { join, normalize } from "node:path";

const PUBLIC_DIR = join(process.cwd(), "public");

export function publicFileExists(publicPath?: string): boolean {
  if (!publicPath || !publicPath.startsWith("/")) return false;
  const abs = normalize(join(PUBLIC_DIR, publicPath));
  if (!abs.startsWith(PUBLIC_DIR)) return false; // guard against path traversal
  return existsSync(abs);
}

/** Returns the path only if the file is actually present under /public. */
export function resolveImage(publicPath?: string): string | undefined {
  return publicFileExists(publicPath) ? publicPath : undefined;
}
