import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { ChatWidget } from "@/components/chat/ChatWidget";

// Interim stand-ins for the licensed display/sans typefaces (see
// app/globals.css for the full fallback rationale). Both are free on Google
// Fonts and are named candidates in the type spec, so swapping in the
// licensed fonts later is a no-op — just change these two imports.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayava Creatives",
  description: "Ayava Creatives — enterprise marketing agency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable}`}
    >
      <head>
        {/*
          No-flash theme init: this must be the very first thing in <head>,
          before any stylesheet or content, and must be a synchronous
          blocking script (not useEffect, which fires after hydration/paint).
          It reads the persisted preference from localStorage and sets
          `data-theme` on <html> before the browser paints anything. Default
          for new visitors (no stored preference) is dark, per the
          "dark-first" brand ruling — so the attribute is only ever set for
          "light". This keeps the root layout (and every page under it)
          fully static — no next/headers cookies() read, no forced dynamic
          rendering. See docs/light-theme-application-map.md.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('ayava-theme')==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}",
          }}
        />
        {/*
          Root cause of the "loads scrolled near the bottom" bug: the browser's
          native `history.scrollRestoration` defaults to "auto", so on any
          reload/re-navigation to a URL the tab has visited before, the browser
          restores the scrollY recorded on that history entry — before React
          hydrates and before Lenis/ScrollTrigger take over the scroll. Because
          this page is scroll-animation-heavy (long, so testers/users scroll far
          down it), that restored offset can land deep in the page, and it
          differs run to run because it's whatever scrollY happened to be
          recorded last time this history entry was left. This is unrelated to
          document height math — it happens before any of our JS runs.

          Fix: disable native scroll restoration synchronously, before the
          browser has a chance to apply it, via a blocking inline script (must
          run in <head>, before paint — a useEffect/useLayoutEffect fires too
          late, after hydration, by which point the browser has already
          restored and painted the wrong position). SmoothScrollProvider adds a
          belt-and-suspenders `window.scrollTo(0, 0)` for the same reason.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }",
          }}
        />
      </head>
      <body className="min-h-screen bg-surface text-content font-sans antialiased">
        <SmoothScrollProvider />
        {children}
        {/*
          Mounted at the true root (not app/(marketing)/layout.tsx) because
          route groups only wrap files physically nested inside them, and
          app/page.tsx (the homepage) lives outside the (marketing) folder —
          that layout never applied to "/". ChatWidget self-excludes from
          /portal via a pathname check instead, so it doesn't depend on
          route-group folder placement staying correct as pages are added.
        */}
        <ChatWidget />
      </body>
    </html>
  );
}
