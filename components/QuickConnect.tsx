import { FaArrowUpRightFromSquare, FaEnvelope, FaLinkedin, FaPhone } from "react-icons/fa6";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { detectKind } from "@/lib/quickLinkIcon";
import { getEnabledQuickLinks } from "@/lib/quickLinks";

const ICON_SIZE = 18;

// Real icon-library marks (Simple Icons for brand logos, Font Awesome for
// the rest) instead of hand-drawn paths — svgrepo.com blocks automated
// fetches, so this is the reliable-source route instead. Every icon
// defaults to `fill="currentColor"`, so it still themes with the site's
// accent color in both light/dark, same as before. Simple Icons dropped
// LinkedIn's mark at some point, so that one comes from Font Awesome.
// Auto-detected from the href, no manual "kind" field (see docs/plan.md
// round 8 / round 17 / round 19).
function ChannelIcon({ href }: { href: string }) {
  const kind = detectKind(href);

  switch (kind) {
    case "phone":
      return <FaPhone size={ICON_SIZE} aria-hidden />;
    case "mail":
      return <FaEnvelope size={ICON_SIZE} aria-hidden />;
    case "whatsapp":
      return <SiWhatsapp size={ICON_SIZE} aria-hidden />;
    case "facebook":
      return <SiFacebook size={ICON_SIZE} aria-hidden />;
    case "instagram":
      return <SiInstagram size={ICON_SIZE} aria-hidden />;
    case "linkedin":
      return <FaLinkedin size={ICON_SIZE} aria-hidden />;
    default:
      // Generic fallback for any other link — still on-theme, instead of
      // fetching that site's real favicon.
      return <FaArrowUpRightFromSquare size={ICON_SIZE} aria-hidden />;
  }
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
