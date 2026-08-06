"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  getChatMessages,
  getOrCreateVisitorToken,
  sendChatMessage,
  type ChatMessage,
} from "@/lib/chat";

const POLL_MS = 4000;
const NAME_KEY = "mithunerp-chat-visitor-name";
const EMAIL_KEY = "mithunerp-chat-visitor-email";

function readLocal(key: string): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(key) ?? "";
}

// Floating chat launcher + panel — bottom-right. QuickConnect (social/
// contact links) lives at the left-center edge instead, so the two never
// overlap. Polls for new messages (including admin replies) every ~4s
// while open; see the backend's ADR 0005 for why polling instead of
// WebSockets/a realtime vendor.
export default function ChatWidget() {
  const [visitorToken] = useState(() => getOrCreateVisitorToken());
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState(() => readLocal(NAME_KEY));
  const [email, setEmail] = useState(() => readLocal(EMAIL_KEY));
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !visitorToken) return;

    let cancelled = false;

    function poll() {
      getChatMessages(visitorToken)
        .then((data) => {
          if (!cancelled) setMessages(data.messages);
        })
        .catch(() => {
          // Transient poll failure — the next tick retries.
        });
    }

    poll();
    const interval = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [open, visitorToken]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const body = input.trim();
    if (!body || sending || !visitorToken) return;

    setSending(true);
    setError("");

    if (name) window.localStorage.setItem(NAME_KEY, name);
    if (email) window.localStorage.setItem(EMAIL_KEY, email);

    try {
      const result = await sendChatMessage({
        visitorToken,
        body,
        visitorName: name || undefined,
        visitorEmail: email || undefined,
      });
      setMessages((prev) => [...prev, result.message]);
      setInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex w-80 flex-col overflow-hidden rounded-sm border border-panel-border bg-panel shadow-xl">
          <div className="flex items-center justify-between border-b border-panel-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">Chat with us</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-muted transition-colors hover:text-accent"
            >
              ✕
            </button>
          </div>

          {messages.length === 0 && (
            <div className="flex flex-col gap-2 border-b border-panel-border px-4 py-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="rounded-sm border border-panel-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email (optional)"
                className="rounded-sm border border-panel-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </div>
          )}

          <div ref={listRef} className="flex max-h-72 flex-col gap-2 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <p className="text-xs text-muted">
                Send a message and we&apos;ll get back to you shortly.
              </p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] rounded-sm px-3 py-2 text-xs ${
                  m.sender === "admin"
                    ? "self-start bg-background text-foreground"
                    : "self-end bg-accent text-white"
                }`}
              >
                {m.body}
              </div>
            ))}
          </div>

          {error && <p className="px-4 pb-2 text-xs text-accent-glow">{error}</p>}

          <form onSubmit={handleSend} className="flex gap-2 border-t border-panel-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-sm border border-panel-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="rounded-sm bg-accent px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Start a chat"}
        aria-expanded={open}
        data-cursor-hover
        className="flex h-14 w-14 items-center justify-center rounded-full border border-transparent bg-accent text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-glow hover:bg-accent-strong hover:shadow-[0_4px_16px_-6px_var(--accent-glow)]"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
    </div>
  );
}
