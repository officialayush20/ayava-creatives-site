import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Must match the frontend's CareersInterestPayload exactly — see
// components/sections/careers/CareersInterestForm.tsx.
type CareersInterestPayload = {
  fullName: string;
  email: string;
  areaOfInterest?: string;
  note?: string;
  submittedAt: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Max 5 submissions per IP per minute. See lib/rate-limit.ts for caveats
// about this being in-memory only.
const MAX_REQUESTS_PER_MINUTE = 5;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (!checkRateLimit(`careers:${clientKey}`, MAX_REQUESTS_PER_MINUTE)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: Partial<CareersInterestPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Server-side validation — never trust client-side validation alone.
  const fieldErrors: string[] = [];
  if (!isNonEmptyString(body.fullName) || body.fullName.trim().length < 2) {
    fieldErrors.push("A valid full name is required.");
  }
  if (!isNonEmptyString(body.email) || !EMAIL_RE.test(body.email)) {
    fieldErrors.push("A valid email address is required.");
  }

  if (fieldErrors.length > 0) {
    return NextResponse.json({ ok: false, error: fieldErrors.join(" ") }, { status: 400 });
  }

  const payload = body as CareersInterestPayload;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/careers] RESEND_API_KEY is not set — cannot send email.");
    return NextResponse.json(
      { ok: false, error: "Email delivery is not yet configured." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const lines = [
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    payload.areaOfInterest ? `Area of interest: ${payload.areaOfInterest}` : null,
    payload.note ? `Note: ${payload.note}` : null,
    "",
    `Submitted at: ${payload.submittedAt}`,
  ].filter((line): line is string => line !== null);

  const text = lines.join("\n");
  const html = `<div style="font-family:sans-serif;font-size:14px;line-height:1.6">${lines
    .map((line) => (line === "" ? "<br/>" : `<p style="margin:0">${escapeHtml(line)}</p>`))
    .join("\n")}</div>`;

  try {
    await resend.emails.send({
      // TODO(founder): once the ayavacreatives.com domain is verified in
      // the Resend dashboard (Domains tab), change this `from` address to
      // a verified sender, e.g. "Ayava Creatives <careers@ayavacreatives.com>".
      // Until then, onboarding@resend.dev is Resend's shared test sender
      // and works without domain verification.
      from: "Ayava Creatives Website <onboarding@resend.dev>",
      to: "info@ayavacreatives.com",
      replyTo: payload.email,
      subject: "New careers interest — Ayava Creatives",
      text,
      html,
    });
  } catch (error) {
    console.error("[api/careers] Failed to send email via Resend:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
