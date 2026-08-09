import type { MetadataRoute } from "next";

// Required for `output: "export"` — these metadata routes have no
// per-request data, so this just tells Next it's safe to render once at
// build time like every other static file here.
export const dynamic = "force-static";

const SITE_URL = "https://mithunerp.github.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
