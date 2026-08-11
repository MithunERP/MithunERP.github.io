import BlockRenderer from "@/components/BlockRenderer";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";
import { getSiteSettings } from "@/lib/settings";
import { DEFAULT_DECORATIONS } from "@/lib/decorations";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Services",
  "Web design, custom software and ERP, and professional photography services.",
);

export default async function ServicesPage() {
  const [services, blocks, settings] = await Promise.all([
    getPublishedServices(),
    getPageBlocks("services"),
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
