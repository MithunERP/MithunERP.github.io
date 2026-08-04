"use client";

import { useState } from "react";

// TODO: replace with real handles/numbers — see docs/plan.md in the backend repo.
const CHANNELS = [
  { label: "WhatsApp", href: "#", kind: "whatsapp" as const },
  { label: "Call", href: "tel:+10000000000", kind: "phone" as const },
  { label: "Email", href: "mailto:info@mithun-erp.com", kind: "mail" as const },
  { label: "Facebook", href: "#", kind: "social" as const, glyph: "f" },
  { label: "Instagram", href: "#", kind: "social" as const, glyph: "ig" },
  { label: "LinkedIn", href: "#", kind: "social" as const, glyph: "in" },
];

function ChannelIcon({ kind, glyph }: { kind: string; glyph?: string }) {
  if (kind === "whatsapp") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1s-.6.8-.7.9c-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4c.1-.1.1-.2.2-.4a.4.4 0 0 0 0-.4c-.1-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.9 2.3 1 2.5.1.1 1.7 2.7 4.2 3.7a4.9 4.9 0 0 0 3 .6 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c-.1-.1-.2-.2-.4-.3Z" />
      </svg>
    );
  }
  if (kind === "phone") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2Z" />
      </svg>
    );
  }
  if (kind === "mail") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 6 10-6" />
      </svg>
    );
  }
  return <span className="text-[11px] font-semibold uppercase">{glyph}</span>;
}

export default function QuickConnect() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col items-end gap-3">
          {CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              title={channel.label}
              aria-label={channel.label}
              target={channel.href.startsWith("#") ? undefined : "_blank"}
              rel={channel.href.startsWith("#") ? undefined : "noreferrer"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-panel-border bg-panel text-foreground shadow-lg transition-colors hover:border-accent hover:text-accent"
            >
              <ChannelIcon kind={channel.kind} glyph={"glyph" in channel ? channel.glyph : undefined} />
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick connect menu" : "Open quick connect menu"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:bg-accent-strong"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
