/**
 * Marketing route group layout.
 *
 * The AI chat concierge widget previously mounted here, but this layout
 * never wraps app/page.tsx (the homepage) — route groups only apply to
 * files physically nested inside them, and the homepage lives at the app
 * root, outside this (marketing) folder. That left the widget completely
 * absent from "/". Moved to app/layout.tsx with a pathname-based
 * self-exclusion for /portal instead — see components/chat/ChatWidget.tsx.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
