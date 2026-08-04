"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

/**
 * Primary site navigation. Static/wordmark logo (no real logo asset yet, per
 * the "no fake logos" rule) plus top-level links matching the sitemap.
 * Target routes (/services, /work, etc.) don't exist as pages yet — that's
 * expected at this stage of the build.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-deep bg-ink/95 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg font-normal text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Ayava Creatives
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-slate transition-colors duration-200 ease-out hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm p-2 text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span aria-hidden="true" className="block h-4 w-5">
              {open ? (
                <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 20 16" fill="none" className="h-4 w-5">
                  <path d="M0 1h20M0 8h20M0 15h20" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-slate-deep md:hidden">
          <Container>
            <ul className="flex flex-col gap-1 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-sans text-base text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
