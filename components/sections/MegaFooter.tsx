import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

const linkColumns = [
  {
    heading: "Services",
    links: [
      { label: "Meta Ads", href: "/services/meta-ads" },
      { label: "Google Ads", href: "/services/google-ads" },
      { label: "SEO", href: "/services/seo" },
      { label: "Website Design", href: "/services/website-design" },
      { label: "Branding", href: "/services/branding" },
      { label: "E-commerce Growth", href: "/services/ecommerce-growth" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Case Studies", href: "/work" },
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
    <footer aria-labelledby="footer-heading" className="border-t border-hairline bg-surface py-16 md:py-24">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Image
              src="/logo-mark-dark-bg.png"
              alt="Ayava Creatives"
              width={160}
              height={128}
              className="site-logo-dark h-14 w-auto"
            />
            <Image
              src="/logo-mark-light-bg.png"
              alt="Ayava Creatives"
              width={160}
              height={128}
              className="site-logo-light h-14 w-auto"
            />
            <p className="mt-2 font-sans text-sm text-hairline-strong">
              Marketing, engineered like infrastructure.
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-9 md:grid-cols-4">
            {linkColumns.map((column) => (
              <div key={column.heading}>
                <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-hairline-strong">
                  {column.heading}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-content underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-hairline-strong">
            &copy; {new Date().getFullYear()} Ayava Creatives, Dehradun, India. All rights
            reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link
                href="/privacy"
                className="font-sans text-xs text-hairline-strong underline-offset-4 hover:underline hover:text-content"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="font-sans text-xs text-hairline-strong underline-offset-4 hover:underline hover:text-content"
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
