import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { CHATBOT_KNOWLEDGE } from "@/lib/chatbot-knowledge";

export const runtime = "nodejs";

// Same pattern as app/api/contact/route.ts — public endpoint, rate-limited
// against abuse. Chat is especially prone to abuse (each message costs a
// Gemini API call), so this cap is intentionally tighter than the contact
// form's.
const MAX_REQUESTS_PER_MINUTE = 10;

// Hard cap on how much conversation history the client can send — keeps a
// single request's token usage (and therefore cost) bounded even if a
// caller sends a long fabricated history directly to the API.
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

type ChatPayload = {
  messages: ChatMessage[];
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "model") &&
    typeof candidate.text === "string" &&
    candidate.text.trim().length > 0 &&
    candidate.text.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (!checkRateLimit(`chat:${clientKey}`, MAX_REQUESTS_PER_MINUTE)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a moment before sending another message." },
      { status: 429 },
    );
  }

  let body: Partial<ChatPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ ok: false, error: "A message is required." }, { status: 400 });
  }

  const messages = body.messages.filter(isChatMessage).slice(-MAX_HISTORY_MESSAGES);

  if (messages.length === 0) {
    return NextResponse.json({ ok: false, error: "A valid message is required." }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== "user") {
    return NextResponse.json(
      { ok: false, error: "The last message must be from the user." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[api/chat] GEMINI_API_KEY is not set — chat concierge is disabled.");
    return NextResponse.json(
      { ok: false, error: "Chat is not yet configured." },
      { status: 503 },
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      // "gemini-1.5-flash" was retired and returns 404 on this API version —
      // confirmed live against the account's actual /v1beta/models listing.
      // "gemini-flash-latest" is a stable alias Google keeps pointed at the
      // current recommended Flash model, so this doesn't silently break
      // again the next time a dated model name is deprecated.
      model: "gemini-flash-latest",
      systemInstruction: CHATBOT_KNOWLEDGE,
      generationConfig: {
        // Keeps a single reply short and bounded — protects against runaway
        // token usage/cost on the paid tier and keeps the widget snappy.
        maxOutputTokens: 400,
        temperature: 0.6,
      },
    });

    // The widget seeds its local state with a scripted greeting bubble
    // (role: "model") that was never an actual Gemini turn — the Gemini API
    // rejects a history whose first entry isn't role "user" ("First content
    // should be with role 'user', got model"), which broke every first
    // real exchange. Strip any leading "model"-role messages (the scripted
    // greeting, and defensively any others) before building history.
    const historySource = messages.slice(0, -1);
    let firstUserIndex = historySource.findIndex((m) => m.role === "user");
    if (firstUserIndex === -1) firstUserIndex = historySource.length;
    const history = historySource.slice(firstUserIndex).map((message) => ({
      role: message.role,
      parts: [{ text: message.text }],
    }));

    const chat = model.startChat({ history });

    // Gemini's shared free-tier capacity returns transient 503 "high
    // demand" errors under normal, expected load (confirmed live — not
    // rate-limit exhaustion, the same request succeeds moments later). One
    // short retry meaningfully improves real-world reliability for
    // visitors instead of surfacing an error on an ordinary transient
    // blip; a second failure is treated as real and reported normally.
    let result;
    try {
      result = await chat.sendMessage(lastMessage.text);
    } catch (firstError) {
      const message = firstError instanceof Error ? firstError.message : "";
      if (!message.includes("503")) throw firstError;
      console.error("[api/chat] Gemini 503, retrying once:", message);
      await new Promise((resolve) => setTimeout(resolve, 800));
      result = await chat.sendMessage(lastMessage.text);
    }

    const text = result.response.text().trim();

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return NextResponse.json({ ok: true, reply: text });
  } catch (error) {
    // Never leak internal error details (bad key, quota, network) to the
    // client — log server-side, return a generic, user-safe message.
    console.error("[api/chat] Gemini API call failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "The chat concierge couldn't respond right now. Please try again, or reach us directly via /contact.",
      },
      { status: 502 },
    );
  }
}
