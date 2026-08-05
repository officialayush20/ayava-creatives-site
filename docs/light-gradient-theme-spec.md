# Ayava — "Atelier Light" Theme Spec

Parallel system, not a revision. The obsidian/ivory/gold theme at `app/globals.css` stays untouched. Theme key: `data-theme="light"`.

Carried over in spirit: one accent hue only; the accent is *earned*, never decorative; gradient inherits gold's viewport-budget discipline; left-aligned editorial asymmetry (no centered eyebrow/headline/paragraph starter-kit heroes); no stock photography, no glassmorphism.

## 1. Base palette

Pure `#FFFFFF` is banned — cold, cheap, and it kills the gradient, because a gradient only reads as *light in a room* if the base isn't already maximum light. Pure `#000000` banned. The system is **warm porcelain surfaces / cool near-black ink** — that temperature tension is the whole reason this reads expensive instead of default-Tailwind.

| Role | Hex | Use |
|---|---|---|
| canvas | `#F6F3F2` | Primary background |
| canvas-raise | `#FCF9F8` | Cards, sticky bars. Elevation by *lightness*, never shadow |
| canvas-sink | `#EAE8E8` | Recessed bands, quotes, alternating sections |
| ink | `#1C1B1B` | Display + primary UI text |
| ink-body | `#434656` | Body copy |
| ink-muted | `#61647A` | Metadata, captions. **Floor — never lighter** |
| rule | `#DAD9DE` | Hairlines, default borders |
| rule-strong | `#B6B5C1` | Hover/active borders, table head rules |
| inverse-surface | `#0F1114` | Rare flat dark slab when not using Gradient B |
| inverse-ink | `#F6F3F2` | Text on any dark/gradient surface |

*(Revised 2026-08-05: palette shifted cooler/bluer per creative-director review; accent renamed verdigris → cobalt throughout, see §3/§6.)*

Section rhythm replaces ink/ivory alternation with `canvas → canvas-sink → canvas → gradient slab`. **The same-tone adjacency ban stands** — two `canvas` sections may never touch (this defect has already shipped 4–5 times in the dark theme per the phase-2 review; pre-banned here). **No `box-shadow` in this theme except the focus ring** — soft shadows are the fastest route to SaaS-template.

## 2. Gradient system — the signature

Three gradients, all named. Nothing else in the codebase may be a gradient.

**Gradient A — "Dawn Mesh"** (light ambient). Decisive: a multi-stop radial mesh, *not* a 2-stop linear. A 2-stop ramp reads as a CSS default and dates on arrival; the mesh is what Linear/Stripe actually do. Chroma held very low — felt before it's seen.

```css
background-color: #F7F5F2;
background-image:
  radial-gradient(80% 70% at 12% 8%,  #D9E6E4 0%, rgba(217,230,228,0) 62%),
  radial-gradient(70% 60% at 88% 18%, #DDE3EE 0%, rgba(221,227,238,0) 58%),
  radial-gradient(90% 80% at 62% 96%, #EDE5D6 0%, rgba(237,229,214,0) 66%);
```

Pale cobalt → pale glacial blue → pale sand. The sand bloom is the ghost of the dark theme's gold: brand continuity without putting literal gold on a light page. **No magenta/violet/pink anywhere** — the purple→pink AI ramp is the exact cliché this theme exists to avoid. Motion: bloom centers may drift ≤4% of viewport over ≥20s on `cubic-bezier(0.16,1,0.3,1)`; static under `prefers-reduced-motion`. No hue rotation, no pulse, no mouse-follow.

**Gradient B — "Cobalt Deep"** (inverted closing slab):
```css
linear-gradient(152deg, #071734 0%, #0E2E6E 48%, #17203C 100%);
```
Deep navy → cobalt → near-ink.

**Gradient C — "Accent Rule"** (hairline only): `linear-gradient(90deg, #0B39A8 0%, #4A7FBF 100%)`. Permitted **only at 1–2px** — active nav/filter underline, top rule of a stat block, progress rail. Direct heir of the gold-hairline rule. Never a fill, never all four sides.

**Allowed:** Dawn Mesh = page hero, one per page, above the fold. Cobalt Deep = exactly one slab per page (closing CTA *or* a results section, not both). Accent Rule = hairlines, subject to §3 budget.

**Not allowed:** never behind body copy (Dawn Mesh may sit behind an H1 + one lead paragraph — never a paragraph stack, form, table, or card grid); never two gradient surfaces in one viewport; never on cards, buttons, chips, badges, icons, avatars (gradient buttons are the strongest template tell in 2026); never `background-clip: text`, banned permanently; never scroll-scrubbed (reveals scrub, gradients don't); total gradient surface ≤35% of page scroll height.

## 3. Accent — definitive call

**Gold is retired in this theme.** `#CBA135` on `#F7F5F2` is ~2.1:1 — fails AA at every size. Darkening it to pass makes it bronze, at which point it isn't the brand's gold. On light grounds gold also stops reading as bullion and starts reading as wedding stationery. It survives only as the pale-sand bloom in Dawn Mesh.

**The accent is Cobalt `#0B39A8`** — ~8.76:1 on canvas, so unlike gold it can actually *be* the accent rather than a decoration. It's the light-theme heir of the dark theme's viridian: same bloodline, different job, so the two themes are one brand at two temperatures. On dark/gradient-B surfaces use `accent-raise #A5C3FF`; `#0B39A8` on dark fails and is banned. The two may not share a viewport.

*(Revised 2026-08-05: accent renamed verdigris → cobalt, hue shifted teal → blue per creative-director review. Same usage discipline carries over unchanged.)*

**Rule (successor to "gold = evidence"): Cobalt marks proof and intent — nothing else.** Permitted: real metric values, Gradient-C hairlines, focus rings, hover link underlines, one active-state bottom edge. **Banned:** list ordinals, step numbers, filter/result counters, icon fills, badges, section eyebrows, large headings, hover color-change on display-scale type — every one of these is a logged dark-theme violation, pre-banned here. Budget ≤4% of viewport.

**No second jewel tone.** The gradient *is* the chromatic range; a data-viz jewel on top of a three-hue mesh is where this becomes decoration. Data-viz uses accent + neutral tints of `ink`.

**Error:** `#A33826` on light, `#E0947F` on inverse. All existing rust rules carry verbatim (≤16px fill, never bold/uppercase, never on the submit button, never sharing a viewport with the accent, no shake/flash).

## 4. Typography — same families, unchanged

**Ruling: no new typeface.** Two themes with two pairings is two brands; the temperature change does the differentiation, the letterforms prove it's still Ayava. Instrument Serif → GT Sectra Display and Inter → Söhne all stand as in `globals.css`.

Optical adjustments, because dark-on-light is a different problem: display tracking tightens (`-0.02em` hero, `-0.015em` section, `-0.01em` card) — dark lets type bloom optically, the same setting reads loose on light. Body drops one perceived weight step (Inter 400, never below). `lining-nums tabular-nums` stays mandatory on metrics — the numeral is still the argument. Measure unchanged (44ch lead, 68ch long-form). **No 200/300 display weights** — hairline strokes on near-white is exactly what makes light themes look flimsy.

## 5. Contrast — including on gradients

On `#F6F3F2`: ink ~16.8:1 (AAA) · ink-body ~9.2:1 (AAA) · ink-muted ~4.7:1 (AA, floor) · accent ~8.76:1 (AAA) · error 5.9:1 (AA). On `canvas-sink` ink-muted drops below floor — margin too thin, so **ink-muted is banned on canvas-sink**; use ink-body.

**Gradients, explicitly:** Dawn Mesh contrast is guaranteed *by stop selection*, not overlay — every stop sits at high relative luminance, so worst-case ink and ink-body stay comfortably AA/AAA. **ink-muted is banned on Dawn Mesh**. No scrim needed and **no scrim permitted** — a scrim mutes the exact thing that makes the mesh premium. Cobalt Deep is contrast-safe by construction: lightest stop `#17203C` is well above 10:1 against `#F6F3F2`, so headlines, body and buttons all sit directly on it; `accent-raise` on it stays high-contrast. If a fourth gradient is ever introduced, text on it requires a solid ≥0.72-alpha scrim — but the correct answer is to not introduce one. Focus ring: `2px solid #0B39A8` (`#A5C3FF` on dark) with 2px surface-colored offset; the ring is never a gradient.

*(Revised 2026-08-05: all hex/contrast figures updated for the cobalt palette shift — see §1/§3/§6.)*

## 6. Token naming + coexistence

**Approach: semantic role aliases remapped by `[data-theme]`, both raw palettes kept literal.** Components stop consuming brand literals (`bg-ink`, `text-ivory`) for anything theme-variant and consume roles instead — that's what lets one component tree serve both themes without a fork.

```css
@theme {
  /* existing dark literals unchanged — --color-ink, --color-ivory, --color-gold, ... */

  /* Atelier Light literals (namespaced, no collision) */
  --color-porcelain: #f6f3f2;      --color-porcelain-raise: #fcf9f8;
  --color-porcelain-sink: #eae8e8; --color-graphite: #1c1b1b;
  --color-graphite-body: #434656;  --color-graphite-muted: #61647a;
  --color-rule: #dad9de;           --color-rule-strong: #b6b5c1;
  --color-cobalt: #0b39a8;         --color-cobalt-raise: #a5c3ff;
  --color-rust-light: #a33826;

  /* semantic roles — what components consume (dark defaults) */
  --color-surface: var(--color-ink);
  --color-surface-raise: var(--color-ink-raise);
  --color-content: var(--color-ivory);
  --color-content-body: var(--color-slate);
  --color-content-muted: var(--color-slate);
  --color-hairline: var(--color-slate-deep);
  --color-accent: var(--color-gold);
  --color-inverse-surface: var(--color-ivory);
  --color-inverse-content: var(--color-ink);
  --color-danger: var(--color-rust-raise);
}

[data-theme="light"] {
  --color-surface: var(--color-porcelain);
  --color-surface-raise: var(--color-porcelain-raise);
  --color-surface-sink: var(--color-porcelain-sink);
  --color-content: var(--color-graphite);
  --color-content-body: var(--color-graphite-body);
  --color-content-muted: var(--color-graphite-muted);
  --color-hairline: var(--color-rule);
  --color-hairline-strong: var(--color-rule-strong);
  --color-accent: var(--color-cobalt);
  --color-accent-raise: var(--color-cobalt-raise);
  --color-inverse-surface: #0f1114;
  --color-inverse-content: var(--color-porcelain);
  --color-danger: var(--color-rust-light);

  --gradient-dawn-mesh:
    radial-gradient(80% 70% at 12% 8%,  #e4ebf7 0%, rgba(228,235,247,0) 62%),
    radial-gradient(70% 60% at 88% 18%, #dee5f2 0%, rgba(222,229,242,0) 58%),
    radial-gradient(90% 80% at 62% 96%, #efe9e0 0%, rgba(239,233,224,0) 66%);
  --gradient-cobalt-deep:
    linear-gradient(152deg, #071734 0%, #0e2e6e 48%, #17203c 100%);
  --gradient-accent-rule:
    linear-gradient(90deg, #0b39a8 0%, #4a7fbf 100%);

  /* Gradient buttons + glass header/CTA-card — added by a later creative
     review pass; see app/globals.css for --gradient-cobalt-action(-hover),
     --glass-porcelain, --glass-hairline, and the .btn-primary-gradient /
     .site-header / .gradient-band-card rules. Deliberately not repeated
     here verbatim to avoid this doc drifting from the implementation. */
}
```

*(Revised 2026-08-05: literals/roles renamed verdigris → cobalt with new hex values throughout this block, matching app/globals.css exactly.)*

Engineer rules: theme set server-rendered on `<html data-theme="light">`, **no `prefers-color-scheme`** (stays an editorial choice, consistent with the existing decision documented in `globals.css`). Every gradient must come from a `--gradient-*` token — a raw `linear-gradient(`/`radial-gradient(` literal anywhere in `components/` is a review failure; that's how the budget stays auditable by grep. The existing `tone="on-ink" | "on-ivory"` prop generalizes to `tone="default" | "inverse"` resolving through semantic tokens, so `Button`, `SectionHeader`, `ArrowLink`, `Tag`, `StatCounter` get one refactor, not duplicate light-theme components. Nothing in this spec edits or deletes the dark literals.

## 7. Reject on sight

1. Gradient button/chip/badge/icon. 2. Gradient text. 3. Any purple/violet/magenta/pink in the mesh. 4. `box-shadow` for card elevation. 5. Pure `#FFF` or `#000` anywhere. 6. Two gradient surfaces in one viewport. 7. Verdigris on an ordinal, step number, or results counter. 8. Centered eyebrow → headline → paragraph → two-buttons hero. 9. Gold reintroduced "just for the logo" on a light page. 10. Glass/blur panels floating over the mesh.

**Relevant files:** `app/globals.css` (token home), `docs/homepage-creative-review.md`, `docs/phase2-batch-creative-review.md`.
