import BlockRenderer from "@/components/BlockRenderer";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";
import { getSiteSettings } from "@/lib/settings";
import { DEFAULT_DECORATIONS } from "@/lib/decorations";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "About MithunERP — web design, custom software, and photography.",
);

export default async function AboutPage() {
  const [services, blocks, settings] = await Promise.all([
    getPublishedServices(),
    getPageBlocks("about"),
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
