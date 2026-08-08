const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface HeroSettings {
  eyebrow: string;
  title_main: string;
  title_accent: string;
  description: string;
  cta_primary_label: string;
  cta_secondary_label: string;
  bottom_cta_heading: string;
}

export interface AboutSettings {
  bio_paragraphs: string[];
  stats: { value: string; label: string }[];
}

export interface ContactSettings {
  intro: string;
  location: string;
  response_time: string;
}

export interface FooterSettings {
  tagline: string;
}

export interface SiteSettings {
  hero: HeroSettings;
  about: AboutSettings;
  contact: ContactSettings;
  footer: FooterSettings;
}

// Called at build time (Server Components, during `next build`), not from
// the browser — the frontend is `output: "export"`, so this is what bakes
// CMS-edited copy into the static HTML. See mithunerp-source's
// docs/adr/0006-cms-content-model-and-rebuild-on-publish.md.
export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await fetch(`${API_URL}/api/settings`);
  if (!res.ok) throw new Error(`Failed to load site settings (${res.status})`);
  return res.json();
}
