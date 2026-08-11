import type { Metadata } from "next";
import BlockRenderer from "@/components/BlockRenderer";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";
import { getSiteSettings } from "@/lib/settings";
import { DEFAULT_DECORATIONS } from "@/lib/decorations";
import { titleFor } from "@/lib/metadata";

const DEFAULT_DESCRIPTION =
  "MithunERP crafts custom web design, bespoke software, and professional photography.";

// Reuses the same build-time fetch the page component makes below (deduped
// by Next's fetch cache, not a second real request). Hero content lives in
// the page's own hero block now, not a site-wide settings singleton — see
// docs/adr/0011-cms-admin-redesign.md. Sets its own title explicitly (same
// "MithunERP-X" pattern every other page uses via lib/metadata.ts) rather
// than relying on app/layout.tsx's default, even though that default
// happens to already match — consistent with how every other route here
// sets its own metadata instead of inheriting it.
export async function generateMetadata(): Promise<Metadata> {
  const blocks = await getPageBlocks("home");
  const heroBlock = blocks.find((b) => b.block_type === "hero");
  const description = (heroBlock?.props.description as string) || DEFAULT_DESCRIPTION;
  const title = titleFor("Home");
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export default async function Home() {
  const [services, blocks, settings] = await Promise.all([
    getPublishedServices(),
    getPageBlocks("home"),
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
