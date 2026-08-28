import { ImageResponse } from "next/og";
import { site } from "@/config/site";

// Brand link-preview image (WhatsApp / Instagram / etc.). Brand-only — no
// catalog data or product imagery.

export const alt = `${site.name} — football kits store`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f6fe0 0%, #114a91 55%, #060f1e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Season 2025 / 26
        </div>
        <div style={{ fontSize: 104, fontWeight: 800, marginTop: 12 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 36, marginTop: 20, opacity: 0.9 }}>
          Home · Away · Third — order on WhatsApp
        </div>
      </div>
    ),
    { ...size },
  );
}
