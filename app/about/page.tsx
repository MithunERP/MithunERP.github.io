import BlockRenderer from "@/components/BlockRenderer";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About — MithunERP",
  "About MithunERP — web design, custom software, and photography.",
);

export default async function AboutPage() {
  const [services, blocks] = await Promise.all([
    getPublishedServices(),
    getPageBlocks("about"),
  ]);

  return <BlockRenderer blocks={blocks} services={services} />;
}
