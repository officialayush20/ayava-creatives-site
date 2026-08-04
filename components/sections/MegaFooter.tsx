import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

const linkColumns = [
  {
    heading: "Services",
    links: [
      { label: "Meta Ads", href: "#" },
      { label: "Google Ads", href: "#" },
      { label: "SEO", href: "#" },
      { label: "Website Design", href: "#" },
      { label: "Branding", href: "#" },
      { label: "E-commerce Growth", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Work", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights", href: "#" },
      { label: "Case Studies", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function MegaFooter() {
  return (
    <footer aria-labelledby="footer-heading" className="border-t border-slate-deep bg-ink py-16 md:py-24">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-display text-lg font-normal">Ayava Creatives</p>
            <p className="mt-2 font-sans text-sm text-slate">
              Marketing, engineered like infrastructure.
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-9 md:grid-cols-4">
            {linkColumns.map((column) => (
              <div key={column.heading}>
                <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-slate">
                  {column.heading}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-ivory underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-slate-deep pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-slate">
            &copy; {new Date().getFullYear()} Ayava Creatives, Dehradun, India. All rights
            reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link
                href="/privacy"
                className="font-sans text-xs text-slate underline-offset-4 hover:underline hover:text-ivory"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="font-sans text-xs text-slate underline-offset-4 hover:underline hover:text-ivory"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
