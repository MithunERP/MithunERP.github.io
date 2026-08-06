const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const VISITOR_TOKEN_KEY = "mithunerp-chat-visitor-token";

export type ChatSender = "visitor" | "admin";
export type ChatConversationStatus = "open" | "closed";

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  body: string;
  created_at: string;
}

export interface ChatConversationSummary {
  id: string;
  status: ChatConversationStatus;
}

// Anonymous visitor identity — a random token in localStorage, not an
// account. See docs/adr/0005-live-chat-polling-and-anonymous-visitors.md
// (mithunerp-source repo) for why. Returns "" during SSR/static prerender,
// where there's no window/localStorage — safe since it's only read inside
// a lazy useState initializer on the client.
export function getOrCreateVisitorToken(): string {
  if (typeof window === "undefined") return "";
  let token = window.localStorage.getItem(VISITOR_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_TOKEN_KEY, token);
  }
  return token;
}

export async function sendChatMessage(input: {
  visitorToken: string;
  body: string;
  visitorName?: string;
  visitorEmail?: string;
}): Promise<{ conversation_id: string; message: ChatMessage }> {
  const res = await fetch(`${API_URL}/api/chat/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      visitor_token: input.visitorToken,
      visitor_name: input.visitorName,
      visitor_email: input.visitorEmail,
      body: input.body,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? `Failed to send message (${res.status})`);
  }

  return res.json();
}

export async function getChatMessages(
  visitorToken: string,
): Promise<{ conversation: ChatConversationSummary | null; messages: ChatMessage[] }> {
  const res = await fetch(
    `${API_URL}/api/chat/messages?token=${encodeURIComponent(visitorToken)}`,
  );
  if (!res.ok) throw new Error(`Failed to load messages (${res.status})`);
  return res.json();
}
