import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

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
      className={`scroll-smooth ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-ink text-ivory font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
