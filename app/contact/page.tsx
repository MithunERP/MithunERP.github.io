import BlockRenderer from "@/components/BlockRenderer";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";
import { getSiteSettings } from "@/lib/settings";
import { DEFAULT_DECORATIONS } from "@/lib/decorations";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact",
  "Get in touch with MithunERP about web design, software, or photography.",
);

export default async function ContactPage() {
  const [services, blocks, settings] = await Promise.all([
    getPublishedServices(),
    getPageBlocks("contact"),
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
