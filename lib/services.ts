const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface Service {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  short_description: string;
  items: string[];
  sort_order: number;
}

// CMS-backed — see mithunerp-source's docs/adr/0006-cms-content-model-and-
// rebuild-on-publish.md. Called at build time (Server Components), not from
// the browser, so `output: "export"` still produces real static HTML.
export async function getPublishedServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/api/services`);
  if (!res.ok) throw new Error(`Failed to load services (${res.status})`);
  const data = await res.json();
  return data.services as Service[];
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getPublishedServices();
  return services.find((service) => service.slug === slug);
}
