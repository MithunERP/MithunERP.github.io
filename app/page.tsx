import BlockRenderer from "@/components/BlockRenderer";
import { getSiteSettings } from "@/lib/settings";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";

export default async function Home() {
  const [settings, services, blocks] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
    getPageBlocks("home"),
  ]);

  return <BlockRenderer blocks={blocks} settings={settings} services={services} />;
}
