import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickConnect from "@/components/QuickConnect";
import ChatWidget from "@/components/ChatWidget";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import { TransitionsProvider } from "@/components/TransitionsProvider";
import ThemeScript from "./theme-script";
import { getSiteSettings, type ThemeSettings } from "@/lib/settings";
import "./globals.css";

const SITE_URL = "https://mithunerp.github.io";
const SITE_NAME = "MithunERP";
const DEFAULT_TITLE = "MithunERP — Web Design, Software & Photography";
const DEFAULT_DESCRIPTION =
  "MithunERP crafts custom web design, bespoke software, and professional photography for businesses that want to stand out.";
// Square brand mark — not a purpose-made 1200x630 social-preview image, but
// a real image beats none for link previews. Swap for a dedicated OG image
// if/when one exists.
const DEFAULT_OG_IMAGE = "/brand/logo-official.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Plain string, not a title.template object — every page in this repo
  // already sets its own full "X — MithunERP" title string, so a template
  // here would double the suffix on every one of them.
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

// Colors + fonts are CMS-editable (site_settings.theme, /admin/theme) — see
// docs/adr/0007-page-block-system.md's Phase 2.2 companion notes in plan.md.
// Written as an inline override after globals.css's own :root blocks, same
// custom properties, later in document order wins.
function buildThemeCss(theme: ThemeSettings): string {
  const { dark, light } = theme.colors;
  const tokens = (t: typeof dark) => `
  --background: ${t.background};
  --panel: ${t.panel};
  --panel-border: ${t.panel_border};
  --foreground: ${t.foreground};
  --muted: ${t.muted};
  --accent: ${t.accent};
  --accent-strong: ${t.accent_strong};
  --accent-glow: ${t.accent_glow};`;

  return `:root, :root[data-theme="dark"] {${tokens(dark)}
  --font-cinzel: '${theme.font_display}', serif;
  --font-body: '${theme.font_body}', sans-serif;
}
:root[data-theme="light"] {${tokens(light)}
}`;
}

// Organization schema, site-wide — no `sameAs` social links yet since the
// CMS-editable quick links (site_settings via /admin/quick-links) are still
// mostly placeholder `#` hrefs; asserting those as structured data would be
// actively wrong. Add sameAs once real social URLs exist.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const { theme, header } = settings;

  // Runtime <link>, not next/font — next/font needs the font known at
  // *build* time (self-hosts/inlines it then), which is incompatible with
  // "pick a font from the CMS without a code change." Trade-off, disclosed:
  // loses next/font's self-hosting/preload optimization, a small
  // flash-of-unstyled-text is possible where next/font normally avoids it.
  const fontFamilies = Array.from(new Set([theme.font_display, theme.font_body]));
  const fontsHref = `https://fonts.googleapis.com/css2?${fontFamilies
    .map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700;900`)
    .join("&")}&display=swap`;

  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontsHref} />
        <style dangerouslySetInnerHTML={{ __html: buildThemeCss(theme) }} />
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Preloader />
        <Cursor />
        <Navbar links={header.nav_links} />
        <main id="main-content" className="flex-1">
          <TransitionsProvider config={theme.transitions}>{children}</TransitionsProvider>
        </main>
        <Footer />
        <QuickConnect />
        <ChatWidget />
      </body>
    </html>
  );
}
