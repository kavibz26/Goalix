import { ImageResponse } from "next/og";

/**
 * Renders the Goalix app-icon mark (a "G" monogram on the brand azure gradient)
 * at an arbitrary square size. Shared by apple-icon and the PWA manifest icons.
 * Not an external/final logo — a typographic mark built from the brand initial.
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
          background: "linear-gradient(135deg, #4aa3ff 0%, #0d59b8 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontWeight: 700,
          fontSize: Math.round(size * 0.6),
          lineHeight: 1,
        }}
      >
        G
      </div>
    ),
    { width: size, height: size },
  );
}
