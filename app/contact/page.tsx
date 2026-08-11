import BlockRenderer from "@/components/BlockRenderer";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact",
  "Get in touch with MithunERP about web design, software, or photography.",
);

export default async function ContactPage() {
  const [services, blocks] = await Promise.all([
    getPublishedServices(),
    getPageBlocks("contact"),
  ]);

  return <BlockRenderer blocks={blocks} services={services} />;
}
