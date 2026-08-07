import type { RichContentBlock } from "@/lib/insights-data";

export type LegalSubsection = {
  heading: string;
  body: RichContentBlock[];
};

export type LegalSectionData = {
  id: string;
  heading: string;
  subsections?: LegalSubsection[];
  body?: RichContentBlock[];
};

export type LegalDoc = {
  title: string;
  draftStatus: "draft" | "final";
  lastUpdated: string | null;
  sections: LegalSectionData[];
};

/**
 * Full draft Privacy Policy / Terms of Service, written to genuinely
 * reflect this site's actual, real data flows — not generic boilerplate
 * and not fabricated claims. Grounded specifically in:
 *  - The Contact form (app/api/contact/route.ts): fields collected, sent
 *    via Resend to info@ayavacreatives.com, optionally best-effort synced
 *    to HubSpot CRM if HUBSPOT_API_KEY is configured.
 *  - The Careers form (app/api/careers/route.ts): same email pattern, no
 *    CRM sync.
 *  - The AI chat concierge (app/api/chat/route.ts): messages sent to
 *    Google's Gemini API per-request, not persisted server-side, rate
 *    limited by IP.
 *  - The client portal (app/(portal)/): single founder-admin login only,
 *    no client accounts or client data stored yet.
 *  - No analytics/tracking cookies are currently wired into the site (GA4
 *    was explicitly deferred). The only client-side storage in use is a
 *    theme-preference value in localStorage (see components/ui/ThemeToggle.tsx)
 *    — not a cookie, and not used for tracking.
 *  - No payment processing occurs on the site itself; pricing is
 *    quote-based via /contact.
 *
 * This is still explicitly a DRAFT (draftStatus stays "draft", surfaced by
 * the persistent DraftNotice component on both legal pages) — genuinely
 * substantive and specific to this business, not filler, but not a
 * substitute for review by a licensed advocate before being relied upon as
 * legally binding. If the site's actual data practices change (e.g. GA4 or
 * a cookie-based tool is added later), this file must be updated to match
 * — a privacy policy that doesn't match real practice is worse than none.
 */
export const privacyDoc: LegalDoc = {
  title: "Privacy Policy",
  draftStatus: "draft",
  lastUpdated: "2026-08-06",
  sections: [
    {
      id: "information-we-collect",
      heading: "Information We Collect",
      body: [
        {
          type: "paragraph",
          text: "We collect information you provide directly to us, and a limited amount of information collected automatically when you use this site.",
        },
        {
          type: "h3",
          text: "Information you provide to us",
        },
        {
          type: "list",
          items: [
            "Contact / project inquiry form: full name, email address, and optionally company name, role, phone number, website URL, project goal, budget range, services of interest, and any additional notes or file you choose to attach (only the file's name and size are transmitted to us — the file itself is not uploaded or stored by this website).",
            "Careers interest form: full name, email address, and optionally your area of interest and a note.",
            "AI chat concierge: any message you type into the chat widget, for the duration needed to generate a reply.",
            "Client portal: if you are given portal access, your login email and password (stored only as an irreversible cryptographic hash, never in plain text).",
          ],
        },
        {
          type: "h3",
          text: "Information collected automatically",
        },
        {
          type: "paragraph",
          text: "This site does not currently run third-party analytics or advertising tracking (for example, we do not currently use Google Analytics or any similar tool). Our hosting provider and email/CRM providers may automatically log standard technical information — such as IP address, browser type, and request timestamps — as an ordinary part of operating a website and delivering email; we do not separately collect or combine this information for profiling or advertising. If we add analytics, advertising pixels, or cookie-based tracking in the future, this policy will be updated before that tool goes live, and a cookie-consent mechanism will be added if legally required.",
        },
        {
          type: "paragraph",
          text: "The only information this site currently stores in your browser is a single, non-personal preference — whether you selected the light or dark visual theme — saved in your browser's local storage. This is not a cookie, is never transmitted to our servers, is not used to identify or track you, and can be cleared at any time by clearing your browser's site data.",
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      heading: "How We Use Your Information",
      body: [
        {
          type: "paragraph",
          text: "We use the information described above only for the following purposes:",
        },
        {
          type: "list",
          items: [
            "To respond to your inquiry, quote request, or careers submission.",
            "To evaluate and, where relevant, record your inquiry in our sales/lead pipeline (see Data Sharing & Third Parties below) so our team can follow up appropriately.",
            "To generate a relevant reply within the AI chat concierge, using only the current conversation you're having — the concierge is grounded in a fixed, curated knowledge base about our business and does not use your messages to answer other visitors.",
            "To operate and secure the client portal for authorized users.",
            "To comply with applicable law, or to establish, exercise, or defend legal claims.",
          ],
        },
        {
          type: "paragraph",
          text: "We do not use the information you submit to us for targeted advertising, and we do not sell personal information to any third party.",
        },
      ],
    },
    {
      id: "data-sharing-third-parties",
      heading: "Data Sharing & Third Parties",
      body: [
        {
          type: "paragraph",
          text: "We share information with the following categories of service providers, solely to operate the site and respond to you — never for their own independent marketing use:",
        },
        {
          type: "list",
          items: [
            "Resend (email delivery) — processes Contact and Careers form submissions to deliver them as email to info@ayavacreatives.com.",
            "HubSpot (CRM) — if configured on our end, Contact form submissions are additionally created or updated as a contact record in our HubSpot CRM, so our team can track and follow up on inquiries. This does not apply to Careers submissions.",
            "Google (Gemini API) — messages you send to the AI chat concierge are transmitted to Google's Gemini API to generate a reply, subject to Google's own API data-handling terms. We do not control how Google's infrastructure processes that request beyond generating the response.",
            "Our hosting provider — necessarily processes all site traffic, including form submissions in transit, to serve the website and its backend functions.",
          ],
        },
        {
          type: "paragraph",
          text: "We do not share your information with any other third party for their own marketing purposes, and we do not sell personal information.",
        },
      ],
    },
    {
      id: "cookies-tracking",
      heading: "Cookies & Tracking",
      body: [
        {
          type: "paragraph",
          text: "This site does not currently set any tracking or advertising cookies. The only browser-side storage in use is the non-personal theme preference described in \"Information We Collect\" above, stored in local storage rather than a cookie.",
        },
        {
          type: "paragraph",
          text: "If we introduce analytics, advertising, or other cookie-based tools in the future, this section will be updated first to describe exactly what is used and why, and a cookie-consent banner will be added if required under applicable law before any non-essential cookie is set.",
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your Rights",
      body: [
        {
          type: "paragraph",
          text: "Depending on your location, you may have rights to access, correct, delete, or object to our processing of your personal information, and to request a copy of the data we hold about you. Under India's Digital Personal Data Protection Act, 2023, individuals in India have corresponding rights to access information about processing, seek correction and erasure of personal data, and grievance redressal.",
        },
        {
          type: "paragraph",
          text: "To exercise any of these rights, contact us using the details in \"Contact for Privacy Concerns\" below. We will respond within a reasonable time and in accordance with applicable law. We may need to verify your identity before acting on a request involving personal data.",
        },
      ],
    },
    {
      id: "data-retention",
      heading: "Data Retention",
      body: [
        {
          type: "paragraph",
          text: "We retain Contact and Careers form submissions, and any associated CRM record, for as long as reasonably necessary to respond to your inquiry, maintain a record of business communications, and comply with legal or accounting obligations — and no longer than necessary for those purposes. If you ask us to delete your information and we have no legal or legitimate business reason to retain it, we will do so.",
        },
        {
          type: "paragraph",
          text: "AI chat concierge conversations are not persisted in a database by this website once your session ends; they exist only for the duration needed to generate each reply. Client portal credentials are retained for as long as portal access remains active.",
        },
      ],
    },
    {
      id: "contact-for-privacy-concerns",
      heading: "Contact for Privacy Concerns",
      body: [
        {
          type: "paragraph",
          text: "For any question, concern, or request relating to this Privacy Policy or your personal information, contact us at info@ayavacreatives.com, or by phone at +91 95486 01929 or +91 96754 00058. Founder Ayush Saini is the current point of contact for privacy-related requests until a dedicated Grievance Officer is formally designated.",
        },
      ],
    },
    {
      id: "governing-law",
      heading: "Governing Law",
      body: [
        {
          type: "paragraph",
          text: "This Privacy Policy is governed by the laws of India, including the Digital Personal Data Protection Act, 2023, and any dispute arising from it is subject to the exclusive jurisdiction of the courts at Dehradun, Uttarakhand, India, without regard to conflict-of-law principles.",
        },
        {
          type: "paragraph",
          text: "If we begin serving clients located outside India (for example, in the European Union or United Kingdom, where GDPR would apply, or California, where the CCPA would apply), this policy will be reviewed and expanded to address those regimes directly before such engagements begin.",
        },
      ],
    },
  ],
};

export const termsDoc: LegalDoc = {
  title: "Terms of Service",
  draftStatus: "draft",
  lastUpdated: "2026-08-06",
  sections: [
    {
      id: "acceptance-of-terms",
      heading: "Acceptance of Terms",
      body: [
        {
          type: "paragraph",
          text: "These Terms of Service (\"Terms\") govern your use of the ayavacreatives.com website (the \"Site\"), operated by Ayava Creatives (\"Ayava,\" \"we,\" \"us,\" or \"our\"), based in Dehradun, Uttarakhand, India. By using the Site — browsing it, submitting a form, or using the chat concierge — you agree to these Terms. If you do not agree, please do not use the Site.",
        },
        {
          type: "paragraph",
          text: "These Terms govern use of the website itself. A separate, individually negotiated engagement agreement or statement of work governs the actual delivery of paid services once a project is scoped and confirmed — these Terms do not by themselves create a client engagement.",
        },
      ],
    },
    {
      id: "services-described",
      heading: "Services Described",
      body: [
        {
          type: "paragraph",
          text: "Ayava Creatives is a digital marketing and web development agency offering services including, but not limited to, social media marketing, Meta Ads and Google Ads management, SEO, website design and development, branding, content marketing, influencer marketing, email/CRM marketing, app store optimization, video and motion production, PR and reputation management, e-commerce growth, analytics and conversion-rate optimization, and AI marketing consulting, as described on the Site's Services pages.",
        },
        {
          type: "paragraph",
          text: "We do not sell fixed-price packages through this Site. Every engagement is scoped individually based on a conversation about your goals, budget, and the channels involved, as described on the Pricing page. Nothing on this Site constitutes a binding quote or offer until confirmed in writing for a specific engagement.",
        },
      ],
    },
    {
      id: "payment-engagement-terms",
      heading: "Payment & Engagement Terms",
      body: [
        {
          type: "paragraph",
          text: "This Site does not process payments directly. Payment schedules, invoicing terms, deposit requirements, and any late-payment terms for an actual client engagement are set out in that engagement's individually agreed proposal, statement of work, or contract — not by these Terms.",
        },
        {
          type: "paragraph",
          text: "Submitting the Contact or Careers form does not itself create a paid engagement, obligation to pay, or contractual relationship beyond an initial inquiry. A project begins only once both parties confirm scope, pricing, and terms in writing.",
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual Property",
      body: [
        {
          type: "paragraph",
          text: "All content on this Site — including text, graphics, logos, the visual design system, and underlying code — is the property of Ayava Creatives or its licensors and is protected by applicable intellectual property law, except where explicitly identified as belonging to a named client (for example, the real portfolio project screenshots and names shown on the Work pages, which remain the property of their respective owners and are displayed with the founder's own work-history context).",
        },
        {
          type: "paragraph",
          text: "Ownership and licensing of deliverables created for a client during a paid engagement (a website, creative assets, ad campaigns, etc.) is governed by that engagement's individual contract, not by these Terms. As a general default absent a specific agreement, Ayava retains ownership of pre-existing tools, templates, and proprietary methods used to deliver the work, while final client-specific deliverables transfer to the client upon full payment, unless the engagement contract states otherwise.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of Liability",
      body: [
        {
          type: "paragraph",
          text: "The Site, including its AI chat concierge, is provided \"as is\" for informational purposes. While we take reasonable care to keep information on the Site accurate, we do not guarantee that all content is complete, current, or error-free, and the chat concierge is an AI system that may occasionally produce an imperfect or incomplete answer despite being grounded in real business information.",
        },
        {
          type: "paragraph",
          text: "To the fullest extent permitted by applicable law, Ayava Creatives shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the Site. This limitation does not apply to liability arising from a separately agreed client engagement contract, which is governed by that contract's own terms, nor does it exclude liability that cannot lawfully be excluded under Indian law.",
        },
      ],
    },
    {
      id: "termination",
      heading: "Termination",
      body: [
        {
          type: "paragraph",
          text: "We may suspend or restrict access to the Site, including the chat concierge or client portal, for any user who misuses it (for example, attempting to abuse the contact/chat systems, or attempting unauthorized access to the client portal), without prior notice.",
        },
        {
          type: "paragraph",
          text: "Termination of an actual client engagement — including notice periods, wind-down obligations, and handling of work in progress — is governed by that engagement's individual contract, not by these Terms.",
        },
      ],
    },
    {
      id: "governing-law",
      heading: "Governing Law",
      body: [
        {
          type: "paragraph",
          text: "These Terms are governed by the laws of India. Any dispute arising from these Terms or your use of the Site is subject to the exclusive jurisdiction of the courts at Dehradun, Uttarakhand, India.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      body: [
        {
          type: "paragraph",
          text: "For any question about these Terms, contact us at info@ayavacreatives.com, by phone at +91 95486 01929 or +91 96754 00058, or by post at ISBT, Haridwar Road, Kargi Chowk, Dehradun, Uttarakhand, India.",
        },
      ],
    },
  ],
};
