import type { Metadata } from "next";
import BlockRenderer from "@/components/BlockRenderer";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";

const DEFAULT_DESCRIPTION =
  "MithunERP crafts custom web design, bespoke software, and professional photography.";

// Reuses the same build-time fetch the page component makes below (deduped
// by Next's fetch cache, not a second real request). Hero content lives in
// the page's own hero block now, not a site-wide settings singleton — see
// docs/adr/0011-cms-admin-redesign.md.
export async function generateMetadata(): Promise<Metadata> {
  const blocks = await getPageBlocks("home");
  const heroBlock = blocks.find((b) => b.block_type === "hero");
  const description = (heroBlock?.props.description as string) || DEFAULT_DESCRIPTION;
  return {
    description,
    openGraph: { description },
    twitter: { description },
  };
}

export default async function Home() {
  const [services, blocks] = await Promise.all([
    getPublishedServices(),
    getPageBlocks("home"),
  ]);

  return <BlockRenderer blocks={blocks} services={services} />;
}
