import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { getPublishedServices } from "@/lib/services";
import { getPages } from "@/lib/pages";

// Required for `output: "export"` — resolved once at build time (it already
// fetches services/posts via the same build-time pattern as every page
// here), not per-request, so this is accurate, not a workaround.
export const dynamic = "force-static";

const SITE_URL = "https://mithunerp.github.io";

const CORE_SLUGS = ["home", "about", "services", "contact"];

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, pages] = await Promise.all([
    getPublishedServices(),
    getPublishedPosts({}),
    getPages(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.post_type === "portfolio" ? "portfolio" : "blog"}/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) => !CORE_SLUGS.includes(page.slug))
    .map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...staticEntries, ...serviceEntries, ...postEntries, ...pageEntries];
}
