import BlockRenderer from "@/components/BlockRenderer";
import { getSiteSettings } from "@/lib/settings";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact — MithunERP",
  "Get in touch with MithunERP about web design, software, or photography.",
);

export default async function ContactPage() {
  const [settings, services, blocks] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
    getPageBlocks("contact"),
  ]);

  return <BlockRenderer blocks={blocks} settings={settings} services={services} />;
}
