# Ayava Creatives — Contact / Start a Project Page Layout Spec
Owner: UI/UX Designer · For: Frontend Engineer implementation · Status: v1 draft
Route: `/contact` (currently 404s — every homepage CTA points here, this is the primary conversion page on the site)

This doc inherits all Foundations from `homepage-layout-spec.md` §0 (12-col grid, spacing scale, breakpoints, section rhythm, color usage baseline, type scale, accessibility baseline) and the Button `tone` system now implemented in `components/ui/Button.tsx` (`tone="on-ink" | "on-ivory"`, `variant="primary" | "secondary" | "ghost"`). Not restated in full below, only extended/referenced. Reuses homepage/service-template component inventory (`Button`, `SectionHeader`, `Tag`, `MediaFrame`, `ArrowLink`, `Breadcrumb`) wherever equivalent; new components follow the same PascalCase convention.

**Brand-token discipline for this page specifically:** gold (`#CBA135`) is used ONLY for: focus rings (already baked into `Button`), the progress-indicator's numeric step count ("Step 2 of 5"), and the response-time number if/when a real figure is confirmed. Gold must never fill the progress bar track, form field backgrounds, or badge/pill backgrounds on this page — this is a hard rule per the homepage review correction. Viridian (`#0F5C4B`) gets its one permitted use-per-page on the multi-step form's **success state** checkmark/icon only (a single, meaningful confirmation moment — not decorative).

**Data model implication for engineer:** the intake form is fully client-side state (React state/context or form library, e.g. `react-hook-form` + a step-index state) — no real backend exists yet. Define a `ContactFormPayload` shape now so the frontend contract is stable regardless of backend timing (see §2.7).

---

## Page section order

1. Hero — direct, low-friction headline
2. Smart Intake Form (multi-step, 5 steps)
3. Alternative Contact Paths
4. Office/HQ Card
5. Response-Time Guarantee Band
6. FAQ / Reassurance Block
7. Footer (reuse `MegaFooter` from homepage)

**Background rhythm:** ivory (Hero) → ink (Intake Form — this is the page's centerpiece, ink gives it weight and matches the "Start Your Project" CTA framing from the homepage hero) → ivory (Alt Contact Paths) → ivory (Office Card, no hard break needed, hairline divider per homepage §Cross-Section-Notes rule) → ink (Response-Time Band, short/punchy) → ivory (FAQ) → ink (Footer). No more than 2 consecutive same-background sections without a visual break, per homepage rule.

---

## 1. Hero — Low-Friction Headline

**Layout:** Ivory background (deliberately NOT ink/cinematic like the homepage hero — this page should feel like a fast lane, not another marketing pitch; a quieter, faster-feeling entry signals "we're ready to just talk," not "sit through a reel"). Height: content-driven, `~48vh desktop` min, NOT full-viewport — this is intentionally the shortest hero on the site so the intake form is reachable with minimal scroll.

Content: centered, narrow column, cols 3–10 (not the asymmetric 7/5 split used elsewhere — a centered layout here reads as direct/uncomplicated rather than editorial). No breadcrumb (this is a top-level conversion page, not a service subpage — omit `Breadcrumb`).

- Eyebrow label (Label token, bronze): "Start a Project"
- H1: direct, low-friction framing — e.g. "Tell us what you're building. We'll take it from there." (H1, display font, `clamp(36px, 5vw, 64px)`, line-height 1.05, max 2 lines, centered)
- Subhead (Body-L, max-width 52ch, centered, `20px` below H1): one line reinforcing speed/ease, e.g. "A 3-minute form. No sales call required to get a real answer." (copywriter to finalize — must stay honest, do not promise a speed we can't back with a confirmed response-time number; coordinate wording with §5)
- Single CTA: `Button` variant="primary" tone="on-ivory" size="large", label "Start the Intake Form", `href="#intake-form"` (anchor down to §2, since the form lives on this same page — no route change). `32px` below subhead.
- Optional secondary micro-link below the button (Ghost/Body, not a full `Button`): "Prefer to talk first? Jump to contact options ↓" anchored to §3. This gives users who don't want a form an immediate low-commitment escape hatch, framed as an aid not a competing CTA.

**Responsive:**
- 1920/1440: as above.
- 1024/768: column narrows to cols 2–7 of 8-col grid, still centered, H1 clamp unchanged.
- 428/375: H1 `clamp(28px, 8vw, 36px)`, 3 lines max, subhead `18ch`-ish wrap acceptable, CTA full-width, secondary link stays centered below.

**Components:** `ContactHero` (new, thin wrapper — simpler than homepage `Hero`, no `HeroCanvasSlot`/`StatTicker`), `Button` (reused).

**Interaction/state notes:** No count-up, no marquee, no video — this hero is intentionally static/fast-loading (supports the "fast lane" positioning and keeps LCP fast on the site's highest-intent page). Anchor-link scroll uses native smooth-scroll (`scroll-behavior: smooth` at the CSS level, respecting `prefers-reduced-motion: reduce` → falls back to instant jump). Button: default/hover/focus/active per `Button` primitive's existing states, no new states needed.

**Content slots:** H1 copy, subhead copy, CTA label + anchor href, secondary link copy + anchor href — copywriter, final language must stay honest about response-time framing (do not lock in a specific number in hero copy; keep it generic like "no sales call required to get a real answer" until §5's number is founder-confirmed, then optionally echo it here).

---

## 2. Smart Intake Form (multi-step, client-side)

`id="intake-form"` on the section for the hero anchor link. Ink background, `160px`/`64px` top padding standard, but bottom padding tightened to `96px`/`48px` since the next section (Alt Contact Paths) is closely related in intent.

### 2.0 Overall structure

This is a genuine multi-step client-side form — one step visible at a time, not a single long scroll with fieldsets. **5 steps:**

| Step | Name | Purpose |
|---|---|---|
| 1 | Business Info | Who's asking |
| 2 | Goals | What they want |
| 3 | Budget Range | What they can spend |
| 4 | Services Needed | Multi-select from the 15 services |
| 5 | Brief / Upload (optional) + Review | Optional file/brief, final review, submit |

**Layout (all steps):** Centered card, cols 3–10 desktop (narrower than full-width, matches Hero's centered framing for consistency — this whole page avoids the homepage's asymmetric editorial layout in favor of a focused, linear feel appropriate to a form). Card surface: `ink-raise` (#141210) background, `1px` solid `slate` border, `border-radius` consistent with existing card radius conventions in codebase, padding `64px` desktop / `24px` mobile (428/375: `20px`, matching outer margin at that breakpoint so the card reads full-bleed-ish without violating the margin token).

**Vertical anatomy inside the card, top to bottom, every step:**
1. `ProgressIndicator` (see 2.1)
2. Step heading (H3, e.g. "Tell us about your business") + optional 1-line step description (Body, slate)
3. `FormStep` content — the fields for that step (see 2.2–2.6)
4. Navigation row: Back button (left) + Next/Submit button (right), `48px` above nav row, `32px` below last field

**Responsive card behavior:**
- 1920/1440: cols 3–10, padding 64px.
- 1024: cols 2–11 of 12-col (widen slightly since container is narrower), padding 40px.
- 768: full container width (cols 1–8), padding 32px.
- 428/375: full container width, padding 20–24px, nav row buttons stack full-width (Back above or below Next — recommend Next/Submit as the full-width primary button on top, Back as a smaller ghost/text link below it, since Next is the expected action and shouldn't be second in the visual/tab order on mobile... but tab order must still be Back-then-Next in DOM to match reading order; see accessibility note in 2.8 for the resolution).

### 2.1 `ProgressIndicator`

**Layout:** Horizontal row of 5 segments (one per step) OR a simpler "Step X of 5" label + thin progress bar — recommend the latter for build simplicity and because 5 numbered dots at 375px width get cramped: a single-line label + bar reads clearly at every breakpoint.

- Label (Label token, ivory): "Step {current} of 5 — {Step Name}" — the numeric "{current}" and "5" are literal numeric values, so **gold is permitted here** per the token restriction (numeric/metric values only), rendered as `<span className="text-gold">{current}</span> of 5`.
- Bar below label, `4px` height, full-width of card, track = `slate-deep`, fill = `ivory` (NOT gold — gold stays restricted to the numeral only, the bar itself is not a "number" so it must not be gold-filled), fill width = `(current / 5) * 100%`, `border-radius: 2px`.
- `12px` gap between label and bar.

**Responsive:** identical at all breakpoints, this component is inherently compact.

**Components:** `ProgressIndicator` (new).

**Interaction/state notes:** Bar fill transitions smoothly on step change (`transition: width 300ms ease-out`), respects `prefers-reduced-motion` (instant width change, no transition). Must be wrapped so screen readers announce step changes — see 2.8 ARIA live region notes; the `ProgressIndicator` itself should have `role="progressbar"` with `aria-valuenow`, `aria-valuemin="1"`, `aria-valuemax="5"`, `aria-valuetext="Step {current} of 5, {Step Name}"`.

### 2.2 Step 1 — Business Info

**Fields (all in a `FormField` wrapper: label + input + helper/error slot):**
- Full Name — text input, required. Placeholder: "Jane Doe". Validation: non-empty, min 2 chars.
- Email — email input, required. Placeholder: "jane@company.com". Validation: RFC-basic email pattern match on blur + on submit-attempt.
- Company Name — text input, optional. Placeholder: "Company or brand name".
- Role/Title — text input, optional. Placeholder: "e.g. Marketing Lead, Founder".
- Phone — tel input, optional. Placeholder: "+91 XXXXX XXXXX". No hard validation beyond basic digit-count sanity check (international formats vary — do not over-validate and block legitimate numbers).

**Layout:** Single column on all breakpoints EXCEPT 1024+ where Full Name / Email can sit side-by-side (2-col within the card, `24px` gap) since the card is wide enough, and Company/Role can similarly pair up. Phone full-width alone. Below 1024: all fields stack single column, `20px` gap.

**Components:** `FormField` (new, reusable across all steps — label + input/select/textarea + helper text slot + error message slot), `FormStep` (new, wrapper providing consistent heading/description/content/nav structure per step).

### 2.3 Step 2 — Goals

**Fields:**
- "What's the primary goal for this project?" — required, single-select presented as a `Tag`-style button group (reuse `Tag` visual language, but interactive/selectable — technically a new variant, name it `SelectableTag` or extend `Tag` with a `selected` boolean prop, flag to engineer which approach fits the existing `Tag` component's API better). Options: "Launch something new," "Grow an existing channel," "Fix something that's underperforming," "Not sure yet — need guidance." 2x2 grid desktop, single column mobile.
- "Anything else we should know about your goals?" — optional `textarea`, 4 rows, placeholder "Optional — a sentence or two is plenty.", max-length soft cap 500 chars with a live character counter (Caption, bottom-right of textarea, e.g. "120/500") — this is the one field on the page that benefits from a live counter since it's free text with a practical cap.

**Layout:** Single column, full-width within card at all breakpoints (goal selector grid noted above is the only 2-col element, collapses to 1-col below 768).

### 2.4 Step 3 — Budget Range

**Fields:**
- "What's your estimated budget range for this project?" — required, single-select as a vertical list of radio-styled cards (NOT a native `<select>` — a button-group of 4–5 ranges reads faster and matches the form's tactile, low-friction feel). Suggested ranges (placeholder — confirm real tiers with founder/sales before launch): "Under ₹1,00,000," "₹1,00,000 – ₹3,00,000," "₹3,00,000 – ₹7,00,000," "₹7,00,000+," "Not sure yet / need a recommendation." Each option is a full-width row card, `16px` padding, `1px` slate border, selected state = `1px` gold hairline border (numeric-adjacent context — a budget figure is itself a number, so a gold border on the selected numeric-range option is within the token rule's spirit; confirm this reading with creative-director if in doubt, otherwise default to an ivory border for selected state to stay safely within the "gold = numeric text only" rule) + subtle ivory-tinted background at ~8% opacity (not a gold fill).
- **Flag to founder/PM:** these currency figures are placeholder ranges for UX/build purposes only — real tier boundaries must be confirmed before this ships to production, since incorrect ranges could misqualify or discourage real leads.

**Layout:** Single column, full-width list, `12px` gap between range cards, all breakpoints.

### 2.5 Step 4 — Services Needed (multi-select from 15 services)

**Fields:**
- "Which services are you interested in?" — required (min 1 selection), multi-select grid of all 15 services (pull exact names from `components/sections/ServicesShowcase.tsx`'s existing list: SMM, Meta Ads, Google Ads, SEO, Website Design, Branding, Content Marketing, Influencer Marketing, Email/CRM Marketing, App Store Marketing/ASO, Video & Motion Production, PR/Reputation Management, E-commerce Growth, Analytics/CRO, AI Marketing).
- Helper text below the heading: "Select all that apply."

**Layout:** `MultiSelectGrid` (new) — 3-col grid desktop (1920/1440), each tile a toggle-button: service name (Body, medium weight) + checkmark icon (appears only when selected, ink-raise-on-ivory-tile or ivory-on-ink-tile checkmark depending on selected-state background — reuse the same ink/bronze checkmark convention as service-template's `ChecklistItem`, NOT viridian, NOT gold). Tile default: `1px` slate border, transparent bg. Tile selected: `1px` ivory border + ivory-tinted 8% background fill + checkmark visible. `12px` gap, tile min-height `56px`, padding `16px`.

**Responsive:**
- 1920/1440: 3 cols (5 rows of 3).
- 1024: 2 cols.
- 768/428/375: 1 col, full-width stacked toggle rows (still tiles, not a native multi-select — better touch target and clearer selected-state visibility than a native `<select multiple>`).

**Components:** `MultiSelectGrid` (new), `MultiSelectTile` (new — the individual toggle button).

**Interaction/state notes:** Each tile is a real `<button type="button" aria-pressed="true|false">` — not a styled checkbox hidden visually (keeps native keyboard/AT semantics without extra ARIA wiring beyond `aria-pressed`). Tab order follows grid reading order (row-by-row). Validation: if user attempts Next with 0 selected, show a form-level inline error above the grid ("Select at least one service," `role="alert"`) rather than blocking silently.

### 2.6 Step 5 — Brief / Upload (optional) + Review

**Fields:**
- "Anything else you'd like to share?" — optional `textarea`, 5 rows, placeholder "Links, brand guidelines, specific requirements — anything helpful."
- File upload — optional. Label: "Upload a brief or reference file (optional)." Accepts common doc/image/pdf types (`.pdf,.doc,.docx,.png,.jpg,.jpeg`, max size flagged as e.g. 10MB — exact limit to confirm with backend-engineer once real upload handling exists). Drag-and-drop zone + "Browse files" button fallback, dashed `1px` slate border, `120px` min-height, centered icon + instructional text.
  - **Backend note:** since there is no real backend yet, the file upload's client-side behavior must still be fully functional (file selection, client-side validation of type/size, preview of filename+size, remove/replace action) but the actual persistence is a `TODO` — see §2.7 for the placeholder submission strategy. Do not silently drop the file with no feedback; show it as "attached" in the UI even though it isn't yet sent anywhere real.
- **Review summary block** below the upload field: a read-only recap of Steps 1–4's answers (name, email, company, goal, budget range, selected services as a `Tag` list), each with a small "Edit" `ArrowLink`-style link that jumps back to that specific step (not just "Back one step" — direct jump, since review-then-fix is a core use case here). This is the moment before commit, so it must be scannable, not another form to fill.
- Submit button: `Button` variant="primary" tone="on-ink" size="large", label "Send My Project Details" (avoid generic "Submit" — reinforce what's happening).

**Layout:** Textarea + upload zone stacked single column, `24px` gap. Review block below, `32px` above it, presented as a simple label/value list (`dl`/`dt`/`dd` semantics recommended for the review pairs), `12px` gap between rows, `1px` slate-deep hairline dividers between rows (not gold).

**Components:** `FileUploadField` (new), `ReviewSummary` (new).

### 2.7 Submission behavior (no real backend yet)

**Placeholder submission strategy — TODO for backend-engineer:**
- Frontend collects all step data into a single `ContactFormPayload` object client-side:
  ```
  {
    fullName: string
    email: string
    company?: string
    role?: string
    phone?: string
    primaryGoal: string
    goalNotes?: string
    budgetRange: string
    servicesNeeded: string[]   // slugs from the 15-service list
    additionalNotes?: string
    attachedFile?: { name: string; size: number } // metadata only client-side; actual file object held in memory until real upload endpoint exists
    submittedAt: ISO8601 string
  }
  ```
- On submit, the frontend should call a single abstracted function, e.g. `submitContactForm(payload)`, currently implemented as a **stub** with two realistic near-term options (engineer/PM to pick one for launch):
  1. **`mailto:` fallback** — construct a `mailto:info@ayavacreatives.com` link with a pre-filled subject/body summarizing the payload, opened via `window.location.href` on submit. Pro: zero backend needed, works today. Con: doesn't actually "submit" silently, relies on the user having a mail client configured, file attachments cannot be included this way (flag that clearly to the user before they hit submit if a file was attached — e.g. a note: "Your file will need to be attached manually to the email that opens" or better, instruct them to email it separately).
  2. **Form-endpoint-ready POST** — `fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })` against a route that does not exist yet, structured so `backend-engineer` can drop in a real handler (email-send via a transactional service, DB write, or both) without the frontend changing. This is the **recommended default** since it degrades better (loading/error states make sense, works for the file too via `FormData` instead of JSON when a file is attached) and doesn't force a mail-client dependency on the user.
- **Explicit TODO flag in code comments at the submit handler:** `// TODO(backend-engineer): wire to real endpoint — see docs/contact-page-layout-spec.md §2.7 for payload shape and interim strategy.`
- Until a real endpoint exists, the submit handler should be built against option 2's `fetch` call but engineer may temporarily mock the response (simulate a 1–2s delay + success) so the full loading/success/error UI states are genuinely testable end-to-end before backend work lands — this must NOT ship to production silently mocked; gate the mock behind an obvious flag/env var so it's impossible to accidentally ship a fake-success form.

**Full state set for the overall multi-step flow and Step 5's submit action:**
- **Default:** Step 1 shown, all fields empty, Next button enabled (validation runs on Next-click attempt, not disabled-until-valid — matches the low-friction positioning, less punishing than pre-emptively disabled buttons).
- **Focus:** standard 2px gold-on-ink ring (per accessibility baseline) on every field/button/tile, offset 2px.
- **Hover:** inputs get subtle border-color shift (slate → ivory) on hover; buttons/tiles use existing `Button`/tile hover treatments.
- **Validation error (per field):** red-adjacent error state — since red isn't in the current token set, use a desaturated warm tone consistent with the palette rather than inventing a bright red (flag to creative-director: recommend a muted terracotta/rust derived from existing warm-neutral tokens, or if no error color exists yet in `globals.css`, this is a genuine token gap to raise — do not invent a one-off hex value without sign-off). Field border switches to this error color, error message appears below field (Caption size, same error color), field gets `aria-invalid="true"` and `aria-describedby` pointing to the error message id.
- **Step-level validation error (e.g. Step 4's "select at least 1 service"):** banner-style inline alert at the top of the `FormStep` content, `role="alert"`, same error color treatment, dismisses automatically once the condition is satisfied.
- **Navigating forward (Next):** if current step is valid, advance `current step + 1`, update `ProgressIndicator`, scroll the card into view if it's now below viewport (only if user has scrolled away, not a forced scroll every time), move focus to the new step's heading (see 2.8).
- **Navigating backward (Back):** always allowed regardless of validation state (never trap a user on a step), preserves previously entered data in all steps (state persists across the whole session — no data loss on Back/Next).
- **Loading (final submit):** Submit button shows spinner + disabled state, label changes to "Sending...", entire Step 5 content becomes `aria-busy="true"` and fields become read-only (not fully disabled/removed from DOM — read-only preserves values visibly and avoids focus loss), Back button also disabled during this window to prevent inconsistent state.
- **Success:** Step 5's content is replaced in-place (same card, not a route change) with a confirmation state: viridian checkmark icon (this page's one permitted viridian use), H3 "Got it — thank you," confirmation body copy restating the response-time commitment (pulls the same figure as §5, single source of truth — do not hardcode a duplicate/differing number here), and two secondary actions: `Button` variant="secondary" "Back to Homepage" (`href="/"`) and a ghost link "Explore our other contact options ↓" anchored to §3 for users who want to also reach out directly. Announce via `aria-live="polite"` region so screen-reader users hear the confirmation without needing to re-navigate.
- **Error (submission failed):** banner at top of Step 5 card, `aria-live="assertive"` (unexpected failure, needs immediate announcement), copy: "Something went wrong sending your details. Please try again, or email us directly at info@ayavacreatives.com." with a "Try Again" button (re-attempts the same submit call) and the direct mailto as a visible fallback link right in the error message — never leave a failed-submit user with only a dead-end retry and no alternative path.
- **Empty (N/A for this form)** — no meaningful empty state beyond Default, since Default already reads as "empty, ready to fill."

---

### 2.8 Accessibility notes specific to this multi-step form

- **Focus management between steps:** on every successful step transition (Next or Back or a Review-block "Edit" jump), move keyboard focus to the new step's `<h3>` heading (give it `tabIndex={-1}` so it's programmatically focusable without being in the normal tab sequence). This is the standard SPA-route-change-equivalent pattern for in-page step changes — without it, keyboard/screen-reader users lose their place when content swaps.
- **ARIA live region for step changes:** a visually-hidden `aria-live="polite"` region (separate from the focused heading, can be a shared utility region reused across the site) announces "Step {current} of 5: {Step Name}" whenever the step changes, so screen-reader users get an explicit spoken confirmation in addition to the focus move.
- **ARIA live region for errors:** field-level errors use `aria-live="polite"` (non-disruptive, tied via `aria-describedby`); the step-level "can't proceed" banner and the final submission-failure banner use `aria-live="assertive"` since they represent a blocked action the user needs to know about immediately.
- **Full keyboard operability:** every interactive element (text inputs, textarea, radio-style budget cards, `MultiSelectTile` toggle buttons, file-upload dropzone's "Browse files" button, Back/Next/Submit, Review block's Edit links) must be reachable via Tab in visual/reading order and operable via Enter/Space (no mouse-only affordances — the drag-and-drop file zone MUST have a fully keyboard-operable "Browse files" button as a first-class alternative, not a hidden fallback).
- **Mobile Back/Next reordering caveat (from §2.0):** if Next is placed visually above Back at 428/375 for thumb-reach reasons, the underlying DOM/tab order must still follow logical reading order (Back, then Next) OR the visual reorder must be achieved via CSS (`order` in a flex/grid container) so DOM order stays semantically correct while visual order adapts — never reorder in a way that makes Tab-order visually confusing (i.e., if CSS visually places Next first, ensure that doesn't make Tab jump visually backward across the screen in a disorienting way; test this specific case manually. Recommend the simpler, safer choice: keep Back-then-Next in both DOM and visual order at all breakpoints, both full-width stacked, Next on top only if `order` is used consistently and verified — flag as a build-time judgment call for frontend-engineer, default to DOM-visual match if in doubt).
- **Progress semantics:** `ProgressIndicator`'s `role="progressbar"` (see §2.1) gives assistive tech a single, clear signal of overall completion independent of the step-change live-region announcement.
- **Multi-select semantics (Step 4):** `aria-pressed` on each `MultiSelectTile` communicates selected state without requiring a separate visually-hidden label; the step's `<h3>` should be programmatically associated with the tile grid via `aria-describedby` referencing the "Select all that apply" helper text.
- **No reliance on color alone:** selected states (budget cards, multi-select tiles, goal tags) must pair a border/background change with a checkmark icon or equivalent non-color indicator — never border-color-only.
- **Contrast:** ivory text/borders on the `ink-raise` card background must be checked against WCAG 2.2 AA the same as any other ink-surface content per homepage baseline; error-state color (once finalized, see note in §2.7) must independently pass AA against `ink-raise`.

---

## 3. Alternative Contact Paths

**Layout:** Ivory background, `160px`/`64px` top padding (new distinct section after the ink form block). Header cols 1–6, left-aligned: eyebrow "Prefer to Talk Directly?" + H2 "Reach us however's easiest." Below: 4-item grid, 12-col → 3 cols each desktop.

Each `ContactMethodCard`: icon slot (simple line icon, ink/bronze, `aria-hidden`), method label (H3), method value (Body, the actual actionable info), single `Button` variant="secondary" tone="on-ivory" or a plain `ArrowLink` if the action is just "go to this link" rather than a distinct CTA (recommend `ArrowLink` for consistency with lighter-weight link patterns elsewhere).

1. **Book a Call** — icon: calendar. Label: "Book a Call." Value: "See our live availability." Action: opens `CalendarEmbedSlot` (see below) — either inline expand within the card's section or a modal/drawer; recommend inline expand below the grid (full-width) to avoid modal-focus-trap complexity for a first build, triggered by clicking this card.
2. **WhatsApp Business** — icon: chat bubble. Label: "WhatsApp Us." Value: "Fastest for quick questions." Action: `<a>` to `https://wa.me/919548601929` (WhatsApp deep link format, confirm which of the two numbers is the designated WhatsApp Business line with founder before hardcoding — placeholder uses +91 9548601929), `target="_blank" rel="noopener"`, visually-hidden "opens in new tab" text per site-wide external-link convention.
3. **Email** — icon: envelope. Label: "Email Us." Value: "info@ayavacreatives.com" (displayed as visible text AND the link, `<a href="mailto:info@ayavacreatives.com">`).
4. **Call Us** — icon: phone. Label: "Call Us." Value: both real numbers listed, each as its own `<a href="tel:+919548601929">+91 95486 01929</a>` / `<a href="tel:+919675400058">+91 96754 00058</a>`, stacked with `4px` gap, both tappable independently (do not merge into one non-actionable text block — `tel:` links matter especially on mobile where this section will get real use).

**`CalendarEmbedSlot`:** since no real calendar tool is wired up yet, this is a placeholder region: dashed-border card, `240px` min-height, centered text "Calendar booking coming soon — email or WhatsApp us to schedule a call in the meantime," with `Button` variant="ghost" tone="on-ivory" linking to the mailto or WhatsApp option as an immediate fallback. **Flag to founder/PM:** recommend Calendly or a similar embeddable scheduler once selected; component is built now as a slot ready to receive that iframe/embed later without a layout change.

**Responsive:**
- 1024: 2x2 grid.
- 768: 2x2 grid retained if card min-width allows, else single column.
- 428/375: single column stacked, `16px` gap, each card full-width.

**Components:** `ContactMethodCard` (new), `CalendarEmbedSlot` (new, placeholder), `ArrowLink` (reused).

**Interaction/state notes:** All external links (WhatsApp, tel, mailto) get standard hover/focus underline treatment. `tel:`/`mailto:` links have no special "state" beyond default/hover/focus (they hand off to native apps, no in-page loading state applies). Calendar card's expand/collapse (if inline-expand approach is used): trigger is a real `<button aria-expanded="true|false" aria-controls="calendar-embed-panel">`, panel `id` matches, same accordion-pattern accessibility as service-template's `FAQAccordion` (§8 of service-page-layout-spec.md) — reuse that interaction pattern rather than inventing a new one.

**Content slots:** icons (creative-director/asset sourcing), the two real phone numbers, real email, WhatsApp number confirmation (flag above), calendar-tool selection (flag above, TBD).

---

## 4. Office / Location Info

**Layout:** Ivory background, tightly coupled to §3 above (no full section-break padding — `1px` slate-deep hairline divider + `96px` padding, reads as "part of" the contact-options block, mirroring the service-template's Deliverables→Tools coupling pattern). Single card, NOT a multi-region directory — per blueprint correction, this is one real HQ, not fabricated global offices.

`OfficeCard`: cols 3–10 centered (matches the page's centered-column rhythm established in Hero/Form) OR cols 1–7 left-aligned with a `MediaFrame` image slot cols 8–12 (a simple building/street photo or a static map screenshot of the HQ area) — recommend the latter (asymmetric with image) since a photo of the actual location adds legitimacy/warmth that a plain text card lacks, and this is the one place on the page where a visual breaks the otherwise text-heavy, form-focused rhythm.

- Label: "Our Studio" or "Headquarters" (H3)
- Address, exact real text: "Ayava Creatives, ISBT, Haridwar Road, Kargi Chowk, Dehradun, India" (Body-L)
- Optional: a "Get Directions" `ArrowLink` to a Google Maps search URL built from the address string (`https://www.google.com/maps/search/?api=1&query=` + URL-encoded address) — simple, no interactive embedded map/JS map library needed for a single location, avoids the complexity/weight the blueprint's "interactive map" language implied but that this simplified single-office version doesn't warrant.

**Responsive:**
- 1024/768: image stacks above or below text, full-width, 16:9 frame.
- 428/375: same stack, image locks to 4:5 or 1:1.

**Components:** `OfficeCard` (new), `MediaFrame` (reused), `ArrowLink` (reused).

**Interaction/state notes:** Static content, no special states beyond the "Get Directions" link's standard hover/focus. If no real photo exists yet, flag as **STUB** — do not fabricate a generic stock "office" photo that isn't actually Ayava's location; acceptable interim: omit the image and run the card as text-only + Get Directions link until a real photo is sourced.

**Content slots:** real address (given, above — use verbatim, do not paraphrase/reformat in a way that could create inconsistency with what's indexed elsewhere e.g. Google Business Profile), HQ photo (STUB — flag), Get Directions href.

---

## 5. Response-Time Guarantee Band

**Layout:** Ink background, short/punchy band, `96px`/`48px` padding (shorter than a full `160px` section since this is a single-line statement, not a content-dense block). Centered, narrow column cols 4–9.

- H2 or large Body-L statement, centered: e.g. "We reply within **[X] business hours.**" — the bracketed number is the ONLY gold text on this band (numeric/metric value, permitted per token rule), rendered as `<span className="text-gold">[X]</span>`.
- **CRITICAL — do not invent a number.** This entire band's copy must ship with a literal placeholder until the founder signs off on a real, honest commitment (e.g. "24," "1 business day," "same business day") — engineer should render this as a CMS-editable single field (`responseTimeCommitment: string`) defaulting to an obviously-placeholder value like `"[response time TBD — confirm with founder before launch]"` in the dev/staging environment specifically so it cannot accidentally ship silently as a fabricated number. Flag this in the content checklist per homepage §Cross-Section-Notes precedent (fabricated commitments are a reputational/legal risk exactly like the fabricated-metrics flags elsewhere in the blueprint).
- Optional short qualifier line below (Body, `12px` below headline): "Usually much faster — this is our worst case, not our average." (only include once real data supports this framing; omit if unconfirmed).

**Responsive:** Type scales per standard clamp; column narrows to full-width minus margin at 428/375, text remains centered.

**Components:** `Button`? — none needed, this band is a pure statement, no CTA (the CTA already happened in §2's form or will happen via §3's direct contact options — this band's job is reassurance, not another conversion ask).

**Interaction/state notes:** None — static text band.

**Content slots:** `responseTimeCommitment` (STUB/placeholder per above, founder sign-off required), optional qualifier line (only once real).

---

## 6. FAQ / Reassurance Block

**Layout:** Ivory background, standard `160px`/`64px` rhythm. Header cols 1–6, centered or left-aligned (recommend left-aligned to match the page's other section headers, keeping only the Hero/Form/Response-Band centered for emphasis). Reuse `FAQAccordion`/`FAQItem` components directly from `service-page-layout-spec.md` §8 — same component, same interaction rules (multiple-open-allowed, `aria-expanded`/`aria-controls` pattern, collapsed by default, chevron rotation respecting reduced-motion). Narrower reading column, cols 1–8.

**Suggested question set (reassurance-focused, not SEO-long-tail like the service-page FAQs — copywriter to finalize, these are illustrative):**
1. "What happens after I submit the form?" — sets expectation for what the team does next (review, respond within the §5 window, no immediate sales-call ambush).
2. "Do I need to know exactly what I want before reaching out?" — reassures the "Not sure yet" segment from Step 2's goal options.
3. "Is there a minimum project size you work with?" — addresses budget-anxiety; answer should be honest per whatever the real answer is, not evasive.
4. "How is my information used?" — brief, honest privacy note (link out to a real Privacy Policy page if one exists on the site; if not, flag as a gap — do not claim a policy exists if it doesn't).
5. "Can I just email instead of filling out the form?" — explicitly validates the §3 alternative paths, reduces form-anxiety for users who don't want to commit to 5 steps.

**Responsive:** Same collapse-to-full-width pattern as service template's FAQ at 768 and below.

**Components:** `FAQAccordion` (reused), `FAQItem` (reused).

**Interaction/state notes:** Identical to service-template §8 — full keyboard operability, `aria-expanded`/`aria-controls`, collapsed by default, no loading/error/empty states (static content, though if FAQ count were ever 0 the section should not render, same rule as service template).

**Content slots:** 5 Q&A pairs per above (copywriter to draft real answers, especially #3 and #4 which touch real business facts — do not let copywriter improvise a minimum-project-size claim or a privacy claim without founder/legal input).

---

## Cross-Section Notes for Engineer

1. **New components introduced on this page** (register alongside homepage/service-template inventories): `ContactHero`, `ProgressIndicator`, `FormStep`, `FormField`, `SelectableTag`/`Tag` extension with `selected` prop (confirm approach with frontend-engineer against existing `Tag` API), `MultiSelectGrid`, `MultiSelectTile`, `FileUploadField`, `ReviewSummary`, `ContactMethodCard`, `CalendarEmbedSlot`, `OfficeCard`.
2. **Reused-as-is:** `Button` (with `tone`/`variant` props exactly as implemented in `components/ui/Button.tsx`), `SectionHeader`, `Tag`, `MediaFrame`, `ArrowLink`, `FAQAccordion`/`FAQItem` (from service-page template), `MegaFooter`.
3. **Error-color token gap flagged in §2.7** — this page is the first place on the site that needs a genuine form-validation error color; there is currently no error/danger token in `globals.css`. This must be resolved (extend the token set, do not invent a one-off hex) before Step-level and field-level error states can be built to spec — raise with creative-director before implementation.
4. **Placeholder/STUB flags to track (do not ship unconfirmed to production):** WhatsApp number designation (§3), calendar-tool selection (§3), HQ photo (§4), response-time commitment number (§5, the most reputationally sensitive placeholder on this page), budget-range tier boundaries (§2.4), FAQ answers touching real business facts (§6 items 3–4).
5. **Backend contract:** `ContactFormPayload` shape defined in §2.7 is the frontend/backend handoff contract — `backend-engineer` should treat this as the source of truth for the eventual `/api/contact` route, rather than the frontend needing to change once a real endpoint lands.
6. **Accessibility baseline from homepage §0 applies in full** on top of the form-specific notes in §2.8 — landmark structure (`<section aria-labelledby>` for every top-level section: Hero, Intake Form, Alt Contact Paths, Office Card, Response-Time Band, FAQ), focus rings, contrast, reduced-motion handling, full keyboard operability.
7. **This is the highest-priority build item on the site** — every homepage CTA currently 404s pointing here; recommend engineer sequence §1 (Hero) + §2 (Intake Form through a working, even if mock-backed, submit flow) as the first shippable slice, with §3–§6 following, since a working form alone resolves the immediate 404 problem even before the surrounding reassurance sections are fully polished.
