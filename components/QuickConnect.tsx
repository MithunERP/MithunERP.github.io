import { detectKind } from "@/lib/quickLinkIcon";
import { getEnabledQuickLinks } from "@/lib/quickLinks";

// Every icon is a custom-drawn, single-color monoline glyph using
// `currentColor` — matches the site's accent theme instead of pulling each
// platform's real (multi-color, off-brand) favicon. Auto-detected from the
// href, no manual "kind" field (see docs/plan.md round 8 / round 17).
function ChannelIcon({ href }: { href: string }) {
  const kind = detectKind(href);
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true } as const;

  if (kind === "phone") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2Z" />
      </svg>
    );
  }
  if (kind === "mail") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 6 10-6" />
      </svg>
    );
  }
  if (kind === "whatsapp") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.5-1.1A8.5 8.5 0 1 0 12 3.5Z" />
        <path d="M9.2 8.6c.3-.7.6-.7.9-.7.2 0 .5 0 .7.5.2.5.7 1.7.8 1.8.1.2.1.4-.1.6-.2.3-.3.4-.5.6-.2.2-.4.4-.2.7.3.5 1 1.4 2 2.2 1.3 1.1 2.4 1.4 2.7 1.6.3.2.5.1.7-.1.2-.3.8-.9 1-1.2.2-.3.5-.2.8-.1.3.1 1.8.8 2.1 1 .3.2.5.2.6.4.1.2.1.9-.2 1.7-.3.8-1.7 1.5-2.4 1.6-.6.1-1.4.1-2.3-.1-.5-.1-1.2-.4-2-.7-3.5-1.5-5.7-5-5.9-5.3-.2-.3-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.9Z" />
      </svg>
    );
  }
  if (kind === "facebook") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path
          d="M14 8h-1.5c-1 0-1.7.7-1.7 1.8V11H9v2.3h1.8V19h2.4v-5.7h1.9l.3-2.3h-2.2V10c0-.4.2-.7.7-.7H14Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }
  if (kind === "instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "linkedin") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <rect x="6.5" y="10" width="2.2" height="8" rx="0.4" fill="currentColor" stroke="none" />
        <circle cx="7.6" cy="7.2" r="1.3" fill="currentColor" stroke="none" />
        <path
          d="M11.5 18v-4.8c0-1.7 1-2.9 2.6-2.9 1.7 0 2.7 1.1 2.7 3V18h-2.3v-4.3c0-.7-.3-1.2-1-1.2s-1.1.5-1.1 1.2V18Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  // Generic fallback for any other link — a plain "external link" glyph,
  // still on-theme, instead of fetching that site's real favicon.
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14 21 3" />
      <path d="M15 3h6v6" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

// Always-expanded vertical stack, fixed to the left-center edge — distinct
// from ChatWidget's bottom-left launcher, and hidden below md since a
// vertically-centered fixed column would otherwise sit on top of page
// content on narrow screens. CMS-backed (see lib/quickLinks.ts) — fetched at
// build time since this is a Server Component in a statically-exported app.
export default async function QuickConnect() {
  const channels = await getEnabledQuickLinks();

  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {channels.map((channel) => (
        <a
          key={channel.label}
          href={channel.href}
          title={channel.label}
          aria-label={channel.label}
          target={channel.external ? "_blank" : undefined}
          rel={channel.external ? "noreferrer" : undefined}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-panel text-foreground shadow-md transition-all duration-200 hover:-translate-x-0.5 hover:border-accent hover:text-accent hover:shadow-[0_4px_16px_-6px_var(--accent-glow)]"
        >
          <ChannelIcon href={channel.href} />
        </a>
      ))}
    </div>
  );
}
