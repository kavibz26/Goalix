import { brandIconResponse } from "@/lib/brand-icon";

// Stable URL for the PWA manifest.
export const dynamic = "force-static";

export function GET() {
  return brandIconResponse(512);
}
