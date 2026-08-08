import type { Metadata } from "next";
import BlockRenderer from "@/components/BlockRenderer";
import { getSiteSettings } from "@/lib/settings";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";

export const metadata: Metadata = {
  title: "About — MithunERP",
  description: "About MithunERP — web design, custom software, and photography.",
};

export default async function AboutPage() {
  const [settings, services, blocks] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
    getPageBlocks("about"),
  ]);

  return <BlockRenderer blocks={blocks} settings={settings} services={services} />;
}
