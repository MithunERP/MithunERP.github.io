import type { Metadata } from "next";
import BlockRenderer from "@/components/BlockRenderer";
import { getSiteSettings } from "@/lib/settings";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";

// Deduped against the page component's own getSiteSettings() call below by
// Next's build-time fetch cache — not a second real request.
export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getSiteSettings();
  return {
    description: hero.description,
    openGraph: { description: hero.description },
    twitter: { description: hero.description },
  };
}

export default async function Home() {
  const [settings, services, blocks] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
    getPageBlocks("home"),
  ]);

  return <BlockRenderer blocks={blocks} settings={settings} services={services} />;
}
