import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickConnect from "@/components/QuickConnect";
import ChatWidget from "@/components/ChatWidget";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import ThemeScript from "./theme-script";
import { getSiteSettings, type ThemeSettings } from "@/lib/settings";
import "./globals.css";

export const metadata: Metadata = {
  title: "MithunERP — Web Design, Software & Photography",
  description:
    "MithunERP crafts custom web design, bespoke software, and professional photography for businesses that want to stand out.",
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
      </head>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Cursor />
        <Navbar links={header.nav_links} />
        <main className="flex-1">{children}</main>
        <Footer />
        <QuickConnect />
        <ChatWidget />
      </body>
    </html>
  );
}
