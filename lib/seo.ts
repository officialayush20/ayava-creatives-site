import type { Metadata } from "next";

/**
 * Production domain assumption. No env var or next.config.ts reference to a
 * real domain exists anywhere in the codebase yet, so this is a placeholder
 * — CONFIRM AND UPDATE this constant (and NEXT_PUBLIC_SITE_URL if one gets
 * added later) once the site is actually deployed to its real domain. Every
 * canonical URL, sitemap entry, and OG/Twitter `url` field in the site
 * derives from this single constant, so fixing it here fixes it everywhere.
 */
export const SITE_URL = "https://ayavacreatives.com";

export const BUSINESS = {
  name: "Ayava Creatives",
  legalName: "Ayava Creatives",
  founder: "Ayush Saini",
  telephone: ["+91 9548601929", "+91 9675400058"],
  email: "info@ayavacreatives.com",
  streetAddress: "ISBT, Haridwar Road, Kargi Chowk",
  addressLocality: "Dehradun",
  addressRegion: "Uttarakhand",
  addressCountry: "IN",
  sameAs: ["https://www.instagram.com/ayavacreatives"],
} as const;

/**
 * OG image gap: no real Open Graph/social-share image asset exists anywhere
 * in the codebase (no /public/og-*.png, no per-page image data). Per the
 * task's explicit instruction not to fabricate fake image URLs, `og:image`
 * and `twitter:image` are deliberately omitted from every page's metadata
 * below rather than pointed at a placeholder that doesn't exist. FLAGGED
 * GAP: commission/produce a real 1200x630 default OG image (plus, ideally,
 * per-template variants for service/industry/case-study pages) and wire it
 * into `buildMetadata()`'s `openGraph.images` / `twitter.images` once it
 * exists — until then, shared links will render without a preview image on
 * platforms that require one.
 */

type BuildMetadataOptions = {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/services/meta-ads". "" for homepage. */
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path: string): string {
  const clean = path === "" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

/**
 * Shared metadata builder — every page's `metadata`/`generateMetadata`
 * export should route through this so canonical, Open Graph, and Twitter
 * Card fields stay consistent site-wide instead of being hand-rolled per
 * page (and drifting).
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS.name,
      type,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

// ---------------------------------------------------------------------
// JSON-LD builders
// ---------------------------------------------------------------------

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS.name,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone[0],
    founder: {
      "@type": "Person",
      name: BUSINESS.founder,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: BUSINESS.addressCountry,
    },
    sameAs: BUSINESS.sameAs,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  datePublished,
  authorName,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: absoluteUrl(path),
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
  };
}
