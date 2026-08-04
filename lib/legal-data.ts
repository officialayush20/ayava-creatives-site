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
 * Placeholder-only structural outlines for Privacy Policy / Terms of
 * Service, per docs/legal-pages-copy.md. Every section body is a bracketed
 * placeholder line — no real legal text has been drafted, and none should
 * be invented here. draftStatus stays "draft" until counsel-reviewed copy
 * replaces every placeholder and this flips to "final".
 */
export const privacyDoc: LegalDoc = {
  title: "Privacy Policy",
  draftStatus: "draft",
  lastUpdated: null,
  sections: [
    {
      id: "information-we-collect",
      heading: "Information We Collect",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: what personal data is collected via the Contact form, newsletter/insights sign-up (if added), and analytics/tracking tools in use on the site]",
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      heading: "How We Use Your Information",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: purposes for processing collected data — responding to inquiries, service delivery, marketing communications, analytics — and the legal basis for each]",
        },
      ],
    },
    {
      id: "data-sharing-third-parties",
      heading: "Data Sharing & Third Parties",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: any third-party processors, tools, or platforms (e.g. analytics providers, email/CRM tools, hosting) that receive or process visitor data on Ayava Creatives' behalf]",
        },
      ],
    },
    {
      id: "cookies-tracking",
      heading: "Cookies & Tracking",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: categories of cookies/tracking technologies used, their purpose, and how a visitor can control or opt out of them]",
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your Rights",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: applicable data-subject rights (access, correction, deletion, objection) and the process for a visitor to exercise them]",
        },
      ],
    },
    {
      id: "data-retention",
      heading: "Data Retention",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: how long collected data is retained and the criteria used to determine retention periods]",
        },
      ],
    },
    {
      id: "contact-for-privacy-concerns",
      heading: "Contact for Privacy Concerns",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: the designated contact method/email for privacy-related inquiries, complaints, or rights requests]",
        },
      ],
    },
    {
      id: "governing-law",
      heading: "Governing Law",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: jurisdiction and governing law — India / Dehradun — under which this policy and any related disputes are interpreted]",
        },
      ],
    },
  ],
};

export const termsDoc: LegalDoc = {
  title: "Terms of Service",
  draftStatus: "draft",
  lastUpdated: null,
  sections: [
    {
      id: "acceptance-of-terms",
      heading: "Acceptance of Terms",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: what constitutes a visitor's or client's acceptance of these terms and when they take effect]",
        },
      ],
    },
    {
      id: "services-described",
      heading: "Services Described",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: a description of the services Ayava Creatives offers — web design, development, branding, and related engagements — and the scope these terms apply to]",
        },
      ],
    },
    {
      id: "payment-engagement-terms",
      heading: "Payment & Engagement Terms",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: invoicing, payment schedules, deposits, late payment terms, and engagement start/scope-change process for client projects]",
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual Property",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: ownership and licensing of deliverables, pre-existing IP, and usage rights before/after final payment]",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of Liability",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: the extent and limits of Ayava Creatives' liability for damages arising from use of the site or delivered services]",
        },
      ],
    },
    {
      id: "termination",
      heading: "Termination",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: conditions under which an engagement or these terms may be terminated by either party, and consequences of termination]",
        },
      ],
    },
    {
      id: "governing-law",
      heading: "Governing Law",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: jurisdiction and governing law — India / Dehradun — under which these terms and any disputes are interpreted]",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      body: [
        {
          type: "paragraph",
          text: "[Placeholder — to be drafted with legal counsel, covering: the designated contact method/email for questions regarding these terms]",
        },
      ],
    },
  ],
};
