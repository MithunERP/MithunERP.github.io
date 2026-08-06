// TODO: replace WhatsApp/social "#" placeholders with real handles — see
// docs/plan.md in the backend repo. Email intentionally routes to the
// contact form rather than a mailto: link — the address itself is never
// exposed in this public repo's source.
const CHANNELS = [
  { label: "WhatsApp", href: "#", kind: "whatsapp" as const, external: true },
  { label: "Call", href: "tel:+10000000000", kind: "phone" as const, external: true },
  { label: "Email", href: "/contact", kind: "mail" as const, external: false },
  { label: "Facebook", href: "#", kind: "facebook" as const, external: true },
  { label: "Instagram", href: "#", kind: "instagram" as const, external: true },
  { label: "LinkedIn", href: "#", kind: "linkedin" as const, external: true },
];

type ChannelKind = (typeof CHANNELS)[number]["kind"];

function ChannelIcon({ kind }: { kind: ChannelKind }) {
  if (kind === "whatsapp") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1s-.6.8-.7.9c-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4c.1-.1.1-.2.2-.4a.4.4 0 0 0 0-.4c-.1-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.9 2.3 1 2.5.1.1 1.7 2.7 4.2 3.7a4.9 4.9 0 0 0 3 .6 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c-.1-.1-.2-.2-.4-.3Z" />
      </svg>
    );
  }
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
  if (kind === "facebook") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M15 3h-2.5C10 3 8.5 4.6 8.5 7.2V10H6v3.5h2.5V21H12v-7.5h2.6l.4-3.5h-3V7.5c0-.9.3-1.5 1.6-1.5H15V3z" />
      </svg>
    );
  }
  if (kind === "instagram") {
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
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  // linkedin
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.94 8.5H3.56V21h3.38V8.5zM5.25 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM20.5 21h-3.37v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.67-2.47 3.4V21H9.16V8.5h3.24v1.7h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.17V21z" />
    </svg>
  );
}

// Always-expanded vertical stack, fixed to the left-center edge — distinct
// from ChatWidget's bottom-left launcher, and hidden below md since a
// vertically-centered fixed column would otherwise sit on top of page
// content on narrow screens.
export default function QuickConnect() {
  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {CHANNELS.map((channel) => (
        <a
          key={channel.label}
          href={channel.href}
          title={channel.label}
          aria-label={channel.label}
          target={channel.external ? "_blank" : undefined}
          rel={channel.external ? "noreferrer" : undefined}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-panel text-foreground shadow-md transition-all duration-200 hover:-translate-x-0.5 hover:border-accent hover:text-accent hover:shadow-[0_4px_16px_-6px_var(--accent-glow)]"
        >
          <ChannelIcon kind={channel.kind} />
        </a>
      ))}
    </div>
  );
}
