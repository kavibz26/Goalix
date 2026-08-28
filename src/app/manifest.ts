import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Goalix",
    description: site.description,
    start_url: "/",
    display: "standalone",
    dir: "rtl",
    lang: "he",
    background_color: "#ffffff",
    theme_color: "#0f6fe0",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
