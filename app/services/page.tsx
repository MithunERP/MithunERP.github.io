import BlockRenderer from "@/components/BlockRenderer";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Services",
  "Web design, custom software and ERP, and professional photography services.",
);

export default async function ServicesPage() {
  const [services, blocks] = await Promise.all([
    getPublishedServices(),
    getPageBlocks("services"),
  ]);

  return <BlockRenderer blocks={blocks} services={services} />;
}
