import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import { getPages } from "@/lib/pages";
import { getPageBlocks } from "@/lib/pageBlocks";
import { getPublishedServices } from "@/lib/services";
import { getSiteSettings } from "@/lib/settings";
import { DEFAULT_DECORATIONS } from "@/lib/decorations";
import { pageMetadata, titleFor } from "@/lib/metadata";

// The 4 pages seeded by migration 0008 already have their own dedicated
// route file (app/page.tsx, app/about, app/services, app/contact) — this
// catch-all only needs to generate a route for admin-created pages beyond
// those. Real route files always win over a catch-all in Next's router, so
// this filter is a build-time optimization (skip generating a duplicate),
// not what prevents a collision.
const CORE_SLUGS = ["home", "about", "services", "contact"];

export async function generateStaticParams() {
  const pages = await getPages();
  const customPages = pages.filter((page) => !CORE_SLUGS.includes(page.slug));
  // See app/blog/[slug]/page.tsx's comment — output: "export" requires at
  // least one generated path per dynamic route. This is the currently-live
  // case: no custom pages have been created yet, so without this the build
  // would fail exactly the way /blog/[slug] just did.
  if (customPages.length === 0) return [{ slug: "_placeholder" }];
  return customPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pages = await getPages();
  const page = pages.find((p) => p.slug === slug);
  if (!page) return { title: titleFor("Page not found") };
  return pageMetadata(page.title, page.meta_description || page.title);
}

export default async function CustomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pages = await getPages();
  const page = pages.find((p) => p.slug === slug);
  if (!page) notFound();

  const [blocks, services, settings] = await Promise.all([
    getPageBlocks(slug),
    getPublishedServices(),
    getSiteSettings(),
  ]);

  return (
    <BlockRenderer
      blocks={blocks}
      services={services}
      decorations={settings.theme.decorations ?? DEFAULT_DECORATIONS}
    />
  );
}
