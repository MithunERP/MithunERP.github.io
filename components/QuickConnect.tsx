import { getEnabledQuickLinks } from "@/lib/quickLinks";
import { detectKind, faviconUrl } from "@/lib/quickLinkIcon";

// phone/mail have no domain to fetch a favicon from, so they keep a generic
// hand-drawn icon; every other link renders its own site's real favicon —
// works for WhatsApp, Facebook, Instagram, LinkedIn, or anything else an
// admin adds later without needing a matching icon shipped in code.
function ChannelIcon({ href }: { href: string }) {
  const kind = detectKind(href);

  if (kind === "phone") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2Z" />
      </svg>
    );
  }
  if (kind === "mail") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 6 10-6" />
      </svg>
    );
  }

  const icon = faviconUrl(href);
  if (!icon) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={icon} alt="" width={18} height={18} style={{ borderRadius: "3px" }} />;
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
