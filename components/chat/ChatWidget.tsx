"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

const GREETING: ChatMessage = {
  role: "model",
  text: "Hi — I'm Ayava's AI concierge. Ask me about our services, industries we work with, our process, or how to get in touch.",
};

const NOT_CONFIGURED_ERROR =
  "Chat isn't available yet — this concierge hasn't been switched on. Please reach us via the Contact page, or by phone/email in the footer.";
const GENERIC_ERROR =
  "Something went wrong sending that. Please try again, or reach us via the Contact page.";

/**
 * Floating AI chat concierge — grounded entirely in lib/chatbot-knowledge.ts
 * via app/api/chat/route.ts (Gemini). Marketing-only.
 *
 * Originally mounted only in app/(marketing)/layout.tsx, which does NOT
 * wrap app/page.tsx — the homepage lives at the app root, outside the
 * (marketing) route group folder, so Next.js route groups never applied
 * that layout to it (route groups only wrap files physically nested inside
 * them). Confirmed live: the widget was completely absent from "/". Fixed
 * by mounting this component at the true root layout (app/layout.tsx) and
 * self-excluding via pathname here instead, so it no longer depends on
 * every current and future page being correctly nested inside a route
 * group folder to get the widget.
 */
export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      // Give the panel a beat to mount before focusing.
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", text: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        if (response.status === 503) {
          setError(NOT_CONFIGURED_ERROR);
        } else if (response.status === 429) {
          setError("You're sending messages a little fast — please wait a moment and try again.");
        } else {
          setError(data?.error || GENERIC_ERROR);
        }
        return;
      }

      setMessages((prev) => [...prev, { role: "model", text: data.reply as string }]);
    } catch (err) {
      console.error("[ChatWidget] request failed:", err);
      setError(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }

  if (pathname?.startsWith("/portal")) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Ayava Creatives chat concierge"
          className="flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-hairline bg-surface shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <div>
              <p className="font-sans text-sm font-medium text-content">Ayava Concierge</p>
              <p className="font-sans text-xs text-content-muted">AI-powered, grounded in our real work</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-content-muted transition-colors hover:bg-surface-raise hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 2l12 12M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 font-sans text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-content text-surface"
                      : "bg-surface-raise text-content-body"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <p className="max-w-[85%] rounded-2xl bg-surface-raise px-3.5 py-2.5 font-sans text-sm text-content-muted">
                  Thinking…
                </p>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <p className="max-w-[85%] rounded-2xl border border-hairline-strong bg-surface px-3.5 py-2.5 font-sans text-sm text-danger">
                  {error}
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-hairline p-3">
            <label htmlFor="chat-widget-input" className="sr-only">
              Message
            </label>
            <input
              id="chat-widget-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about services, process, pricing…"
              maxLength={2000}
              disabled={loading}
              className="min-w-0 flex-1 rounded-full border border-hairline bg-surface px-4 py-2.5 font-sans text-sm text-content placeholder:text-content-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-content text-surface transition-transform active:scale-[0.96] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M14 2L7 14l-2-5-5-2 14-5z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat concierge" : "Open chat concierge"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-hairline bg-surface text-content shadow-lg transition-transform hover:border-hairline-strong active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5.5h16a1 1 0 011 1V16a1 1 0 01-1 1H9l-4 3.5V17H4a1 1 0 01-1-1V6.5a1 1 0 011-1z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
