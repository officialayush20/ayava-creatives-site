# Ayava Creatives — Legal Pages Draft Copy (Privacy Policy / Terms of Service)
Owner: Copywriter/Content Strategist · Companion to `docs/legal-page-layout-spec.md` · Status: STRUCTURAL PLACEHOLDER ONLY — not legal advice, not for publication as-is

**This document does not contain real legal content.** Every line under every heading is a structural placeholder marking what a real privacy policy / terms of service will need to cover once drafted and reviewed by qualified legal counsel. Writing actual binding policy language is outside this role's remit and a genuine liability risk for the business — nothing below should be treated as, copied into production as, or represented to a visitor as an actual policy. Route both pages through counsel before removing the draft-status banner.

---

## 0. `DraftNotice` component copy (exact text, both pages)

**Label (bold, uppercase, `text-ivory` on `bg-ink`):**

> DRAFT — PENDING LEGAL REVIEW

**Body sentence (plain-language, immediately below label):**

> This page is placeholder content for structural/design purposes only. It has not been reviewed by counsel and must not be treated as Ayava Creatives' actual privacy/terms policy until replaced with reviewed copy.

This banner is non-dismissible and must persist on every view, per spec §0. Do not soften, shorten, or remove either sentence without legal sign-off — both the label and the sentence are load-bearing for liability purposes, not just tone.

---

## 1. Hero copy (shared pattern, both pages)

### Privacy Policy
- Eyebrow: Legal
- H1: Privacy Policy
- Last-updated line (draft state, per spec §1.1 — do not print a fabricated date): **Draft — not yet published**

### Terms of Service
- Eyebrow: Legal
- H1: Terms of Service
- Last-updated line (draft state): **Draft — not yet published**

**Last updated field (both pages, once real content is finalized):** `[DATE — to be set upon real publication]`

---

## 2. Privacy Policy — Structural Outline (placeholder per section)

Each heading below is a real H2 a finished privacy policy will need. The line under each is the only copy that should render there until legal counsel drafts the actual clause — nothing more.

### 1. Information We Collect
[Placeholder — to be drafted with legal counsel, covering: what personal data is collected via the Contact form, newsletter/insights sign-up (if added), and analytics/tracking tools in use on the site]

### 2. How We Use Your Information
[Placeholder — to be drafted with legal counsel, covering: purposes for processing collected data — responding to inquiries, service delivery, marketing communications, analytics — and the legal basis for each]

### 3. Data Sharing & Third Parties
[Placeholder — to be drafted with legal counsel, covering: any third-party processors, tools, or platforms (e.g. analytics providers, email/CRM tools, hosting) that receive or process visitor data on Ayava Creatives' behalf]

### 4. Cookies & Tracking
[Placeholder — to be drafted with legal counsel, covering: categories of cookies/tracking technologies used, their purpose, and how a visitor can control or opt out of them]

### 5. Your Rights
[Placeholder — to be drafted with legal counsel, covering: applicable data-subject rights (access, correction, deletion, objection) and the process for a visitor to exercise them]

### 6. Data Retention
[Placeholder — to be drafted with legal counsel, covering: how long collected data is retained and the criteria used to determine retention periods]

### 7. Contact for Privacy Concerns
[Placeholder — to be drafted with legal counsel, covering: the designated contact method/email for privacy-related inquiries, complaints, or rights requests]

### 8. Governing Law
[Placeholder — to be drafted with legal counsel, covering: jurisdiction and governing law — India / Dehradun — under which this policy and any related disputes are interpreted]

---

## 3. Terms of Service — Structural Outline (placeholder per section)

### 1. Acceptance of Terms
[Placeholder — to be drafted with legal counsel, covering: what constitutes a visitor's or client's acceptance of these terms and when they take effect]

### 2. Services Described
[Placeholder — to be drafted with legal counsel, covering: a description of the services Ayava Creatives offers — web design, development, branding, and related engagements — and the scope these terms apply to]

### 3. Payment & Engagement Terms
[Placeholder — to be drafted with legal counsel, covering: invoicing, payment schedules, deposits, late payment terms, and engagement start/scope-change process for client projects]

### 4. Intellectual Property
[Placeholder — to be drafted with legal counsel, covering: ownership and licensing of deliverables, pre-existing IP, and usage rights before/after final payment]

### 5. Limitation of Liability
[Placeholder — to be drafted with legal counsel, covering: the extent and limits of Ayava Creatives' liability for damages arising from use of the site or delivered services]

### 6. Termination
[Placeholder — to be drafted with legal counsel, covering: conditions under which an engagement or these terms may be terminated by either party, and consequences of termination]

### 7. Governing Law
[Placeholder — to be drafted with legal counsel, covering: jurisdiction and governing law — India / Dehradun — under which these terms and any disputes are interpreted]

### 8. Contact
[Placeholder — to be drafted with legal counsel, covering: the designated contact method/email for questions regarding these terms]

---

## 4. Implementation notes

- Per spec §1.5, neither page ends with a `CtaBand` — both go straight into `MegaFooter` after the last section. Do not add a "Start Your Project" CTA to either page.
- No gold accent anywhere on either page (spec §0) — this copy assumes ink/bronze/slate only, including for the bronze-left-border blockquote treatment if a defined term ever needs one.
- `lastUpdated` field stays `null` / renders the draft-state hero line until `draftStatus` flips from `"draft"` to `"final"` — that flip should only happen after counsel sign-off, alongside real copy replacing every `[Placeholder — …]` line above.
- Footer links in `components/sections/MegaFooter.tsx` currently point both the Legal-column and bottom-bar Privacy/Terms links at `href="#"` — these must be repointed to `/privacy` and `/terms` once these pages ship, per spec §3 footer-link-wiring note. (Flagging here for whoever wires the routes; not a copy change.)
