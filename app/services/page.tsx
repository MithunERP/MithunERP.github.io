import type { Metadata } from "next";
import BlockRenderer from "@/components/BlockRenderer";
import { getSiteSettings } from "@/lib/settings";
import { getPublishedServices } from "@/lib/services";
import { getPageBlocks } from "@/lib/pageBlocks";

export const metadata: Metadata = {
  title: "Services — MithunERP",
  description: "Web design, custom software and ERP, and professional photography services.",
};

export default async function ServicesPage() {
  const [settings, services, blocks] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
    getPageBlocks("services"),
  ]);

  return <BlockRenderer blocks={blocks} settings={settings} services={services} />;
}
