import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Protects every /portal/* route except /portal/login itself. Unauthenticated
 * requests to protected portal routes are redirected to /portal/login with a
 * `from` query param so the login page can send the user back after signing
 * in. This is the single enforcement point for portal access — future
 * /portal/* routes (reports, invoices, messaging, etc.) are protected
 * automatically by the matcher below with no extra wiring needed.
 */
export default auth((req: NextRequest & { auth?: unknown }) => {
  const { pathname } = req.nextUrl;
  const isLoginRoute = pathname === "/portal/login";
  const isAuthed = Boolean(req.auth);

  if (!isAuthed && !isLoginRoute) {
    const loginUrl = new URL("/portal/login", req.nextUrl.origin);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthed && isLoginRoute) {
    return NextResponse.redirect(new URL("/portal/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portal/:path*"],
};
