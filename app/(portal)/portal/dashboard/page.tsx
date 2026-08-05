import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Container } from "@/components/ui/Container";
import { LogoutButton } from "./LogoutButton";

export const metadata: Metadata = {
  title: "Dashboard | Client Portal | Ayava Creatives",
  robots: { index: false, follow: false },
};

/**
 * Portal dashboard shell. Route-level access is already enforced by
 * middleware.ts, but this server component also reads the session directly
 * (defence in depth, and to render the signed-in account's email).
 *
 * Every section below is a structural placeholder with an honest empty
 * state — no fabricated campaign numbers, charts, reports, or invoices.
 * Wiring instructions for the real integrations live inline as comments
 * next to each section.
 */
export default async function PortalDashboardPage() {
  const session = await auth();

  return (
    <main className="py-16 md:py-20">
      <Container>
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-8">
          <div>
            <h1 className="font-display text-3xl font-normal text-content md:text-4xl">Client Dashboard</h1>
            <p className="mt-2 font-sans text-sm text-content-body">
              Signed in as {session?.user?.email ?? "unknown"}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/*
            Campaign Performance: will pull live spend/impressions/conversions
            from the Meta Marketing API and Google Ads API once a client's ad
            accounts are connected (server-side OAuth token exchange + a
            scheduled or on-request sync job — not built yet, no accounts to
            connect to). Never render placeholder numbers here in the
            meantime; an honest empty state is correct until real data
            exists.
          */}
          <DashboardCard
            title="Campaign Performance"
            description="Live spend, impressions, and conversion data from your connected Meta Ads and Google Ads accounts."
          >
            <EmptyState
              heading="No active campaigns connected yet"
              body="This will populate automatically once your Meta Ads and Google Ads accounts are linked to your portal."
            />
          </DashboardCard>

          {/*
            Reports: will list generated monthly/quarterly PDF or in-app
            reports pulled from the CMS or a reports table once report
            generation is built (out of scope for this shell).
          */}
          <DashboardCard title="Reports" description="Monthly performance reports and campaign summaries.">
            <EmptyState heading="No reports yet" body="Monthly reports will appear here once they're published." />
          </DashboardCard>

          {/*
            Invoices: will list billing history pulled from the payment/
            billing provider once that integration exists (out of scope for
            this shell — no payment processor is wired up yet).
          */}
          <DashboardCard title="Invoices" description="Billing history and contract documents.">
            <EmptyState heading="No billing history yet" body="Invoices and contracts will appear here." />
          </DashboardCard>
        </div>

        {/*
          Messaging: full section deliberately omitted from this shell (not
          even an empty-state card) — the blueprint calls for it but it
          depends on a decision about which messaging backend to use
          (in-app thread vs. email-based) that hasn't been made yet. Adding
          it here prematurely would mean either dead UI or a fake stub thread, so it is left out entirely until that call is made.
        */}
      </Container>
    </main>
  );
}

function DashboardCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col rounded-sm border border-hairline bg-surface-raise p-6">
      <h2 className="font-display text-xl font-normal text-content">{title}</h2>
      <p className="mt-1 font-sans text-sm text-content-body">{description}</p>
      <div className="mt-6 flex-1">{children}</div>
    </section>
  );
}

function EmptyState({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="flex h-full flex-col items-start justify-center gap-2 rounded-sm border border-dashed border-hairline-strong px-5 py-10 text-left">
      <p className="font-sans text-sm font-medium text-content">{heading}</p>
      <p className="font-sans text-xs text-content-muted">{body}</p>
    </div>
  );
}
