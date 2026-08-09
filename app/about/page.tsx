import BlockRenderer from "@/components/BlockRenderer";
import { getSiteSettings } from "@/lib/settings";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About — MithunERP",
  "About MithunERP — web design, custom software, and photography.",
);

export default async function AboutPage() {
  const [settings, services, blocks] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
    getPageBlocks("about"),
  ]);

  return <BlockRenderer blocks={blocks} settings={settings} services={services} />;
}
