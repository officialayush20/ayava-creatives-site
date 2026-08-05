import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Native Next.js robots convention — served at /robots.txt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /portal/ is the authenticated client-portal shell (see
      // app/(portal)/) — never public marketing content, so it's excluded
      // here and also absent from app/sitemap.ts.
      disallow: ["/api/", "/portal/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
