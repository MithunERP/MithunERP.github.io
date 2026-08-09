import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MithunERP — Web Design, Software & Photography",
    short_name: "MithunERP",
    description:
      "MithunERP crafts custom web design, bespoke software, and professional photography.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0505",
    theme_color: "#0a0505",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
