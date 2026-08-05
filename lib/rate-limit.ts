/**
 * Minimal in-memory rate limiter for public API routes (contact form,
 * careers form, future public endpoints).
 *
 * IMPORTANT — this is a stopgap, not a production-grade solution:
 * - State lives in a plain module-level Map, which means it is per-process.
 * - Serverless/edge deployments (Vercel, etc.) frequently spin up multiple
 *   instances and recycle them on cold starts, so this limiter's counts do
 *   NOT survive across instances or restarts — a determined abuser can
 *   trivially bypass it by hitting a fresh instance.
 * - Before this app sees meaningful public traffic or becomes a real target
 *   for abuse, replace this with a shared, durable store — e.g. Upstash
 *   Redis (@upstash/ratelimit) or a similar edge-compatible KV — so limits
 *   are enforced consistently across all instances.
 *
 * For now, at current traffic levels, this is an acceptable first line of
 * defense against basic spam/bot abuse of the contact and careers forms.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // 1 minute

/**
 * Returns true if the request identified by `key` is within the allowed
 * rate (`maxRequests` per rolling 1-minute window), and records this
 * request against that key. Returns false if the caller should be
 * rejected (429).
 */
export function checkRateLimit(key: string, maxRequests: number): boolean {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (existing.count >= maxRequests) {
    return false;
  }

  existing.count += 1;
  return true;
}

/**
 * Best-effort extraction of a client identifier from standard proxy
 * headers (Vercel/most reverse proxies set x-forwarded-for). Falls back to
 * a constant so the limiter still functions (shared bucket for all
 * unidentified clients) rather than throwing.
 */
export function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
