import { ImageResponse } from "next/og";

/**
 * Renders the Goalix app-icon — a "G" monogram on the brand violet gradient —
 * at an arbitrary square size. Shared by apple-icon and the PWA manifest icons.
 * (The full "G + swoosh" mark lives in icon.svg / the Logo component; ImageResponse
 * rasterises text far more reliably than SVG arc paths, so the raster icons keep
 * a clean "G".)
 */
export function brandIconResponse(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontWeight: 700,
          fontSize: Math.round(size * 0.58),
          lineHeight: 1,
        }}
      >
        G
      </div>
    ),
    { width: size, height: size },
  );
}
