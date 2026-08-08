const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface HeroSettings {
  eyebrow: string;
  title_main: string;
  title_accent: string;
  description: string;
  cta_primary_label: string;
  cta_secondary_label: string;
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

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderSettings {
  nav_links: NavLink[];
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface FooterSettings {
  tagline: string;
  columns: FooterColumn[];
}

export interface ThemeColorTokens {
  background: string;
  panel: string;
  panel_border: string;
  foreground: string;
  muted: string;
  accent: string;
  accent_strong: string;
  accent_glow: string;
}

export interface ThemeSettings {
  colors: {
    dark: ThemeColorTokens;
    light: ThemeColorTokens;
  };
  font_display: string;
  font_body: string;
}

export interface SiteSettings {
  hero: HeroSettings;
  about: AboutSettings;
  contact: ContactSettings;
  header: HeaderSettings;
  footer: FooterSettings;
  theme: ThemeSettings;
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
