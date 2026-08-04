import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-ink text-ivory font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
