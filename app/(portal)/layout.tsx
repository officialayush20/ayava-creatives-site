import type { Metadata } from "next";

/**
 * Client portal route group. Deliberately excluded from search indexing
 * (see app/robots.ts — /portal/ is disallowed) since everything under here
 * is authenticated, client-specific content, not public marketing content.
 * Also intentionally absent from app/sitemap.ts.
 */
export const metadata: Metadata = {
  title: "Client Portal | Ayava Creatives",
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-surface">{children}</div>;
}
