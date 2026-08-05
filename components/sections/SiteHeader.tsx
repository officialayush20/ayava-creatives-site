"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
  // Scroll-aware glass treatment — light theme only (see `.site-header` /
  // `.site-header--scrolled` in globals.css, both scoped under
  // [data-theme="light"]). In dark theme these classes are inert no-ops;
  // the header keeps its existing bg-surface/95 + backdrop-blur classes
  // below unchanged in both themes, so dark rendering never changes.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b border-hairline bg-surface/95 backdrop-blur ${
        scrolled ? "site-header--scrolled" : ""
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg font-normal text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Ayava Creatives
          </Link>

          <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-6">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-hairline-strong transition-colors duration-200 ease-out hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <span aria-hidden="true" className="h-4 w-px bg-hairline" />
            <ThemeToggle />
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm p-2 text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface md:hidden"
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
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="mobile-nav-panel border-t border-hairline md:hidden"
        >
          <Container>
            <ul className="flex flex-col gap-1 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-sans text-base text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-hairline py-4">
              <span className="font-sans text-sm text-hairline-strong">Theme</span>
              <ThemeToggle />
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
