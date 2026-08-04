# Ayava Creatives — Careers Holding Page Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft
Route: `/careers` (currently only linked in footer, no page exists)

Inherits all Foundations from `homepage-layout-spec.md` §0. Reuses `Button`, `SectionHeader`, `Container`, `CtaBand`, `FormField` (from `components/sections/contact/FormField.tsx`) as-is.

**Binding constraint (client-confirmed):** this is an honest holding page — "not currently hiring, but interested in hearing from you." It must NOT be built as a job-listing template (no open-roles grid, no department filters, no "apply now" per-role flow). It is a single, short, static page with one lightweight interest-capture form. Keep it inviting, not closed-door — the framing should read as "not yet, but talk to us," not "nothing to see here."

**Relationship to Contact form:** this page's form must be visibly and structurally lighter than the Contact page's 5-step-turned-3-step intake flow (`contact-page-layout-spec.md` §2) — a single-screen form, 4 fields, no multi-step wrapper, no `ProgressIndicator`. Do not reuse `IntakeForm`'s multi-step machinery here; reuse only the underlying `FormField` primitive.

**Gold discipline:** gold restricted to hairlines/focus rings only. This page has no numeric content of substance (no headcount claims, no "X open roles" counters) — there is nothing here that should ever be gold-filled or gold-bordered as decoration.

---

## Page section order

1. Hero — honest "not currently hiring" framing, inviting tone
2. Why Ayava (Eventually) — culture/values at small scale
3. Interest Form — lightweight, single-screen
4. CTA — redirect actual client inquiries to `/contact`
5. Footer

**Background rhythm:** ivory (Hero) → ink (Why Ayava Eventually) → ivory (Interest Form) → ink (CTA / client-inquiry redirect, short band) → ink (Footer). Confirm no 2 consecutive ink sections land adjacent once the CTA band's height is finalized against the footer — if both end up ink with no visual break, add a `1px` bronze hairline top-border to the CTA band per the homepage's "no more than 2 consecutive same-background without a break" rule (footer already gets a bronze top-border per homepage §14, so this may resolve itself — verify at build time).

---

## 1. Hero — Honest, Inviting Framing

**Layout:** Ivory background, content-driven height `~50vh` desktop min (shortest hero class on the site, matching Contact page's "fast lane" precedent — this is a low-traffic, low-density page and should not overstate its own importance with a full-viewport treatment). Centered column, cols 3–10.

- Eyebrow (Label, bronze): "Careers"
- H1 (display, `clamp(32px, 4.5vw, 60px)`, centered, max 2 lines): honest but warm, e.g. "We're not hiring right now — but we'd still like to hear from you."
- Subhead (Body-L, max-width 52ch, centered, `20px` below H1): clarifies what this page actually is, e.g. "Ayava is a lean, founder-led studio today. When that changes, we'd rather already know who's interested than start from zero. Tell us a bit about yourself below."
- No CTA button in the hero — the form is the CTA, reached by scroll or an anchor link, matching the Contact page's pattern (`Button` variant="primary" tone="on-ivory" size="large", label "Introduce Yourself", `href="#interest-form"`) if the page runs long enough to warrant a jump link; given this page is short, a direct anchor CTA is still worth including for scannability.

**Responsive:**
- 1920/1440: as above.
- 1024/768: column narrows to cols 2–7 of 8-col grid.
- 428/375: H1 `clamp(26px, 8vw, 32px)`, 3 lines max, CTA (if present) full-width.

**Components:** `CareersHero` (new, same simplicity class as `ContactHero`/`PhilosophyHero`), `Button` (reused).

**Content slots:** H1, subhead, CTA label/anchor — copywriter, tone must stay warm/inviting per the brief (avoid anything that reads like a closed door, e.g. never phrase this as "we don't have any positions" without immediately pivoting to the invitation).

---

## 2. Why Ayava (Eventually)

**Layout:** Ink background, `96px`/`64px` padding (shorter than the standard `160px` rhythm — this section is a brief culture note, not a content-dense block; matches Response-Time Band's "short/punchy" precedent from the Contact spec rather than a full section). `SectionHeader` cols 1–6, left-aligned, eyebrow "Why People Might Want to Work Here," H2 e.g. "What it's like at Ayava, even at this size."

Below: 2–3 short paragraphs (Body-L, cols 1–8, NOT a bullet/value-card grid — keep this conversational and brief, this is a single founder speaking honestly about culture, not an HR values deck) covering things like: direct ownership of work (no bureaucracy at this scale), working alongside the founder directly rather than through management layers, the kind of work Ayava does (range of real industries/projects) as a signal of what a future hire would actually touch.

**Responsive:** Column narrows to full-width minus margin at 1024 and below; no structural changes.

**Components:** `NarrativeColumn` (reused from About page spec — same typographic prose wrapper), `SectionHeader`.

**Interaction/state notes:** Static, standard scroll-fade-in, no interactive elements.

**Content slots:** 2–3 paragraphs — copywriter, working from founder's actual voice/values (can draw lightly from the About page's Values section §5 without duplicating it verbatim — this version should feel written to a prospective hire, not a prospective client).

---

## 3. Interest Form (Lightweight)

`id="interest-form"` for the hero anchor link. Ivory background, `96px`/`64px` padding. `SectionHeader` cols 1–6, left-aligned, eyebrow "Stay on Our Radar," H2 e.g. "Tell us a little about yourself."

**Layout:** Single card, cols 3–10 desktop (centered framing, matching the page's overall centered/direct rhythm rather than an asymmetric editorial layout — consistent with Contact page's form card treatment, but this card is NOT ink/ink-raise — keep it ivory-on-ivory with just a `1px` slate-deep border, since this is a much lower-stakes, lower-density form than the Contact intake flow and doesn't need the same visual weight). Padding `48px` desktop / `24px` mobile.

**Fields (single screen, no steps, all wrapped in `FormField` — reused directly from `components/sections/contact/FormField.tsx`):**
- Full Name — text input, required.
- Email — email input, required, same validation pattern as Contact form (RFC-basic, on blur + submit-attempt).
- Role/Area of Interest — text input or a small single-select of broad categories (recommend a simple `<select>` here rather than a full `Tag`/`MultiSelectGrid` treatment — this form should stay visibly lighter-weight than the Contact intake form's tile grids). Options if select: "Design," "Development," "Marketing/Growth," "Strategy/Account," "Other." Optional field, not required — someone may not know yet.
- Optional Note — `textarea`, 3 rows, placeholder "Anything you'd like us to know — portfolio link, background, timing." Optional, no character-counter needed (lower-stakes than the Contact form's goal-notes field, a short cap like 500 chars can still apply silently via `maxLength` without a visible counter, to avoid over-instrumenting a simple form).

**Layout of fields:** Single column at all breakpoints — this form is short enough that a 2-col arrangement (as used on Contact's Step 1) isn't necessary and would only add visual complexity to what should read as the simplest form on the site. `20px` gap between fields.

Submit button: `Button` variant="primary" tone="on-ivory" size="default" (NOT `size="large"` — this is a lower-stakes action than the Contact form's "Send My Project Details," a default-size button keeps the visual weight proportionate), label "Send Introduction."

**Components:** `CareersInterestForm` (new — a single-screen wrapper, explicitly NOT `IntakeForm`/`FormStep`/`ProgressIndicator`), `FormField` (reused as-is).

**Interaction/state notes — full state set, same rigor as the Contact form's but without the multi-step complexity:**
- **Default:** all fields empty, submit enabled (validation on submit-attempt, matching Contact form's low-friction pattern).
- **Focus:** standard 2px gold-on-ivory ring, offset 2px, per accessibility baseline.
- **Hover:** input border shift (slate-deep → ink) on hover; button uses existing `Button` hover treatment.
- **Validation error:** same error-color token flagged as a gap in `contact-page-layout-spec.md` §2.7/Cross-Section-Notes item 3 — reuse whatever token resolution comes out of that flag rather than inventing a second one here. Field border switches to error color, message below field, `aria-invalid`/`aria-describedby` wired identically to the Contact form's pattern.
- **Loading (submit):** button shows spinner + disabled state, label → "Sending...", fields become read-only (not removed), matching Contact form's §2.7 loading-state pattern exactly.
- **Success:** form content replaced in-place with a short confirmation: viridian checkmark (same restrained single-use pattern as Contact form's success state — if viridian is already "spent" as this page's one permitted use elsewhere, confirm with creative-director whether a second use on a different page is fine; per the homepage token rule viridian's restriction was scoped per-page on Contact, so a careers-page use should be fine as its own page's single instance), H3 "Thanks — we'll keep this on file," short confirmation body ("We'll reach out if something opens up that fits."), no further CTA needed in the confirmation itself (the page's own §4 CTA band handles the "what if I'm actually a client" redirect separately, don't conflate the two in the success message).
- **Error (submission failed):** banner above the form, `aria-live="assertive"`, same pattern as Contact form — "Something went wrong sending this. Please try again, or email us directly at info@ayavacreatives.com." + Try Again + mailto fallback.

**Submission behavior:** same no-real-backend caveat as the Contact form (`contact-page-layout-spec.md` §2.7) — define a `CareersInterestPayload` shape (`fullName`, `email`, `areaOfInterest?`, `note?`, `submittedAt`) and use the identical interim strategy (mailto fallback or POST-stub, whichever the engineer selects for Contact should be mirrored here for consistency rather than choosing a different mechanism per page).

**Content slots:** Field labels/placeholders as specified above — no copywriter-heavy content needed beyond the section header and micro-copy on the confirmation state.

---

## 4. CTA — Redirect Client Inquiries

**Layout:** Short ink band, `64px`/`48px` padding (shorter than a standard `CtaBand` invocation — this is a single clarifying line, not a full conversion push, since this page's actual primary action already happened in §3). Centered, narrow column cols 4–9.

- Short statement (Body-L or H3, centered): "Looking to work *with* Ayava rather than *at* Ayava?" (emphasis via italics or a subtle weight shift, not gold — avoid gold-as-emphasis on non-numeric text per token rule).
- `Button` variant="secondary" tone="on-ink", label "Get in Touch About a Project", `href="/contact"`.

**Purpose:** explicitly disambiguates job-seekers from prospective clients who might land on this page by mistake (e.g. via footer nav) — this is the one place on the page that exists purely to route the wrong-audience visitor to the right place, per the brief's explicit callout ("avoid confusing job-seekers with the sales form").

**Responsive:** Standard type clamp, button remains reasonably sized (not full-width even at mobile, since this is a low-emphasis secondary action, not the page's main CTA).

**Components:** Custom lightweight band, NOT the full `CtaBand` component (that component's default framing — large H2, primary gold-adjacent button, dual-button row — is disproportionate to this section's actual job; build as a simpler inline block using `Container` + `Button` directly rather than force-fitting `CtaBand`'s props for a much smaller ask). Flag to frontend-engineer: name it `RedirectBand` or similar if a reusable pattern, since a Pricing/About page might want a similar lightweight cross-link band in the future.

**Content slots:** Redirect copy + button label/href.

---

## Cross-Section Notes for Engineer

1. **New components introduced on this page:** `CareersHero`, `CareersInterestForm`, `RedirectBand` (or equivalent lightweight cross-link block). **Reused as-is:** `SectionHeader`, `Container`, `Button`, `FormField` (from Contact page inventory — do NOT reuse `IntakeForm`, `FormStep`, or `ProgressIndicator`, this page is intentionally single-screen), `NarrativeColumn` (from About page spec), `MegaFooter`.
2. **Explicitly out of scope for this page:** job-listing grid, department/role filters, per-role "Apply" flow, headcount/"open roles" counters. If a future business need requires real job listings, that is a distinct project requiring its own spec, not an extension of this holding page.
3. **Form parity note:** the interest form's error/loading/success state machinery should mirror the Contact form's implementation patterns (`contact-page-layout-spec.md` §2.7) for consistency and code reuse, but the form itself must remain visibly simpler — single screen, 4 fields, no step indicator, no tile grids, default-size (not large) submit button.
4. **Content dependency:** §2's culture paragraphs and §1's hero copy should be reviewed by the founder for tone (this page speaks in his voice to a very different audience than the Contact/Pricing pages) before publishing.
5. **Accessibility baseline from homepage §0 applies in full** — landmark structure, focus rings, AA contrast, `aria-live` regions for form success/error states per the Contact form's established pattern, reduced-motion handling on scroll-fades.
