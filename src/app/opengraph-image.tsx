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
            "linear-gradient(135deg, #7c3aed 0%, #4c1d95 45%, #0b0916 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg
            width="78"
            height="78"
            viewBox="0 0 64 64"
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M45 23 A15 15 0 1 0 45 41 L33 41 L33 34" />
            <path d="M40 44 Q50 50 55 58" />
          </svg>
          <div style={{ fontSize: 92, fontWeight: 800 }}>{site.name}</div>
        </div>
        <div
          style={{
            fontSize: 30,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.8,
            marginTop: 28,
          }}
        >
          {site.tagline}
        </div>
        <div style={{ fontSize: 40, marginTop: 16, opacity: 0.95 }}>
          Football kits · Home · Away · Third · order on WhatsApp
        </div>
      </div>
    ),
    { ...size },
  );
}
