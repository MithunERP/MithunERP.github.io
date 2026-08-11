const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

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

export interface FooterContactCta {
  heading: string;
  label: string;
  href: string;
}

export type FooterAlignment = "left" | "center" | "right";

export interface FooterSettings {
  enabled: boolean;
  show_logo: boolean;
  tagline: string;
  columns: FooterColumn[];
  social_links: NavLink[];
  copyright_enabled: boolean;
  copyright_alignment: FooterAlignment;
  copyright_text: string;
  contact_cta: FooterContactCta;
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

export type TransitionStyle = "fade" | "overlap" | "slide" | "zoom" | "wipe";
export type TransitionMode = "fixed" | "random" | "scheduled";

// "0".."6" = Sun..Sat, matches JS's Date.getDay() — resolved client-side
// from the visitor's own clock, see components/PageTransition.tsx.
export type TransitionSchedule = Partial<Record<"0" | "1" | "2" | "3" | "4" | "5" | "6", TransitionStyle>>;

export interface TransitionSettings {
  enabled: boolean;
  mode: TransitionMode;
  style: TransitionStyle; // used when mode = "fixed"; also the fallback for "scheduled"
  random_styles: TransitionStyle[]; // pool for mode = "random"
  schedule: TransitionSchedule; // used when mode = "scheduled"
}

export type HeadingDecoration = "plain" | "underline" | "left-bar" | "boxed";
export type QuoteDecoration = "left-bar" | "quote-marks" | "centered" | "boxed";
export type EyebrowStyle = "plain" | "bar" | "underline" | "pill";
export type EyebrowWeight = "bold" | "normal";

export interface DecorationSettings {
  heading: HeadingDecoration;
  quote: QuoteDecoration;
  eyebrow_style: EyebrowStyle;
  eyebrow_weight: EyebrowWeight;
}

export interface ThemeSettings {
  colors: {
    dark: ThemeColorTokens;
    light: ThemeColorTokens;
  };
  font_display: string;
  font_body: string;
  transitions: TransitionSettings;
  decorations: DecorationSettings;
}

// Hero/about/contact content moved out of this site-wide singleton into
// per-page blocks (hero/about_bio/stats/contact_form block props) — see
// mithunerp-source's docs/adr/0011-cms-admin-redesign.md. What's left here
// is genuinely site-wide chrome: header nav, footer, and theme.
export interface SiteSettings {
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
