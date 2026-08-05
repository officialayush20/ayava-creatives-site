# Ayava — "Atelier Light" Theme Spec

Parallel system, not a revision. The obsidian/ivory/gold theme at `app/globals.css` stays untouched. Theme key: `data-theme="light"`.

Carried over in spirit: one accent hue only; the accent is *earned*, never decorative; gradient inherits gold's viewport-budget discipline; left-aligned editorial asymmetry (no centered eyebrow/headline/paragraph starter-kit heroes); no stock photography, no glassmorphism.

## 1. Base palette

Pure `#FFFFFF` is banned — cold, cheap, and it kills the gradient, because a gradient only reads as *light in a room* if the base isn't already maximum light. Pure `#000000` banned. The system is **warm porcelain surfaces / cool near-black ink** — that temperature tension is the whole reason this reads expensive instead of default-Tailwind.

| Role | Hex | Use |
|---|---|---|
| canvas | `#F7F5F2` | Primary background |
| canvas-raise | `#FCFBF9` | Cards, sticky bars. Elevation by *lightness*, never shadow |
| canvas-sink | `#EFECE7` | Recessed bands, quotes, alternating sections |
| ink | `#14161B` | Display + primary UI text |
| ink-body | `#3A3F47` | Body copy |
| ink-muted | `#666C76` | Metadata, captions. **Floor — never lighter** |
| rule | `#DCD8D1` | Hairlines, default borders |
| rule-strong | `#B9B3A9` | Hover/active borders, table head rules |
| inverse-surface | `#0F1114` | Rare flat dark slab when not using Gradient B |
| inverse-ink | `#F7F5F2` | Text on any dark/gradient surface |

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

Pale verdigris → pale glacial blue → pale sand. The sand bloom is the ghost of the dark theme's gold: brand continuity without putting literal gold on a light page. **No magenta/violet/pink anywhere** — the purple→pink AI ramp is the exact cliché this theme exists to avoid. Motion: bloom centers may drift ≤4% of viewport over ≥20s on `cubic-bezier(0.16,1,0.3,1)`; static under `prefers-reduced-motion`. No hue rotation, no pulse, no mouse-follow.

**Gradient B — "Verdigris Deep"** (inverted closing slab):
```css
linear-gradient(152deg, #06201F 0%, #0E4B47 46%, #10365C 100%);
```
Teal → deep teal → ink-cobalt.

**Gradient C — "Accent Rule"** (hairline only): `linear-gradient(90deg, #0E6E6B 0%, #2E6FA8 100%)`. Permitted **only at 1–2px** — active nav/filter underline, top rule of a stat block, progress rail. Direct heir of the gold-hairline rule. Never a fill, never all four sides.

**Allowed:** Dawn Mesh = page hero, one per page, above the fold. Verdigris Deep = exactly one slab per page (closing CTA *or* a results section, not both). Accent Rule = hairlines, subject to §3 budget.

**Not allowed:** never behind body copy (Dawn Mesh may sit behind an H1 + one lead paragraph — never a paragraph stack, form, table, or card grid); never two gradient surfaces in one viewport; never on cards, buttons, chips, badges, icons, avatars (gradient buttons are the strongest template tell in 2026); never `background-clip: text`, banned permanently; never scroll-scrubbed (reveals scrub, gradients don't); total gradient surface ≤35% of page scroll height.

## 3. Accent — definitive call

**Gold is retired in this theme.** `#CBA135` on `#F7F5F2` is ~2.1:1 — fails AA at every size. Darkening it to pass makes it bronze, at which point it isn't the brand's gold. On light grounds gold also stops reading as bullion and starts reading as wedding stationery. It survives only as the pale-sand bloom in Dawn Mesh.

**The accent is Verdigris `#0E6E6B`** — 5.6:1 on canvas, so unlike gold it can actually *be* the accent rather than a decoration. It's the light-theme heir of the dark theme's viridian: same bloodline, different job, so the two themes are one brand at two temperatures. On dark/gradient-B surfaces use `accent-raise #6FD3C6`; `#0E6E6B` on dark fails and is banned. The two may not share a viewport.

**Rule (successor to "gold = evidence"): Verdigris marks proof and intent — nothing else.** Permitted: real metric values, Gradient-C hairlines, focus rings, hover link underlines, one active-state bottom edge. **Banned:** list ordinals, step numbers, filter/result counters, icon fills, badges, section eyebrows, large headings, hover color-change on display-scale type — every one of these is a logged dark-theme violation, pre-banned here. Budget ≤4% of viewport.

**No second jewel tone.** The gradient *is* the chromatic range; a data-viz jewel on top of a three-hue mesh is where this becomes decoration. Data-viz uses accent + neutral tints of `ink`.

**Error:** `#A33826` on light, `#E0947F` on inverse. All existing rust rules carry verbatim (≤16px fill, never bold/uppercase, never on the submit button, never sharing a viewport with the accent, no shake/flash).

## 4. Typography — same families, unchanged

**Ruling: no new typeface.** Two themes with two pairings is two brands; the temperature change does the differentiation, the letterforms prove it's still Ayava. Instrument Serif → GT Sectra Display and Inter → Söhne all stand as in `globals.css`.

Optical adjustments, because dark-on-light is a different problem: display tracking tightens (`-0.02em` hero, `-0.015em` section, `-0.01em` card) — dark lets type bloom optically, the same setting reads loose on light. Body drops one perceived weight step (Inter 400, never below). `lining-nums tabular-nums` stays mandatory on metrics — the numeral is still the argument. Measure unchanged (44ch lead, 68ch long-form). **No 200/300 display weights** — hairline strokes on near-white is exactly what makes light themes look flimsy.

## 5. Contrast — including on gradients

On `#F7F5F2`: ink 17.1:1 (AAA) · ink-body 9.6:1 (AAA) · ink-muted 4.86:1 (AA, floor) · accent 5.6:1 (AA) · error 5.9:1 (AA). On `canvas-sink` ink-muted drops to ~4.55:1 — margin too thin, so **ink-muted is banned on canvas-sink**; use ink-body.

**Gradients, explicitly:** Dawn Mesh contrast is guaranteed *by stop selection*, not overlay — every stop sits at ≥0.76 relative luminance, so worst-case ink is ~14:1 and ink-body ~8:1. **ink-muted is banned on Dawn Mesh** (worst case ~4.1:1, fails). No scrim needed and **no scrim permitted** — a scrim mutes the exact thing that makes the mesh premium. Verdigris Deep is contrast-safe by construction: lightest stop `#10365C` is 11.3:1 against `#F7F5F2`, so headlines, body and buttons all sit directly on it; `accent-raise` on it is ~10:1. If a fourth gradient is ever introduced, text on it requires a solid ≥0.72-alpha scrim — but the correct answer is to not introduce one. Focus ring: `2px solid #0E6E6B` (`#6FD3C6` on dark) with 2px surface-colored offset; the ring is never a gradient.

## 6. Token naming + coexistence

**Approach: semantic role aliases remapped by `[data-theme]`, both raw palettes kept literal.** Components stop consuming brand literals (`bg-ink`, `text-ivory`) for anything theme-variant and consume roles instead — that's what lets one component tree serve both themes without a fork.

```css
@theme {
  /* existing dark literals unchanged — --color-ink, --color-ivory, --color-gold, ... */

  /* Atelier Light literals (namespaced, no collision) */
  --color-porcelain: #f7f5f2;      --color-porcelain-raise: #fcfbf9;
  --color-porcelain-sink: #efece7; --color-graphite: #14161b;
  --color-graphite-body: #3a3f47;  --color-graphite-muted: #666c76;
  --color-rule: #dcd8d1;           --color-rule-strong: #b9b3a9;
  --color-verdigris: #0e6e6b;      --color-verdigris-raise: #6fd3c6;
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
  --color-accent: var(--color-verdigris);
  --color-accent-raise: var(--color-verdigris-raise);
  --color-inverse-surface: #0f1114;
  --color-inverse-content: var(--color-porcelain);
  --color-danger: var(--color-rust-light);

  --gradient-dawn-mesh:
    radial-gradient(80% 70% at 12% 8%,  #d9e6e4 0%, rgba(217,230,228,0) 62%),
    radial-gradient(70% 60% at 88% 18%, #dde3ee 0%, rgba(221,227,238,0) 58%),
    radial-gradient(90% 80% at 62% 96%, #ede5d6 0%, rgba(237,229,214,0) 66%);
  --gradient-verdigris-deep:
    linear-gradient(152deg, #06201f 0%, #0e4b47 46%, #10365c 100%);
  --gradient-accent-rule:
    linear-gradient(90deg, #0e6e6b 0%, #2e6fa8 100%);
}
```

Engineer rules: theme set server-rendered on `<html data-theme="light">`, **no `prefers-color-scheme`** (stays an editorial choice, consistent with the existing decision documented in `globals.css`). Every gradient must come from a `--gradient-*` token — a raw `linear-gradient(`/`radial-gradient(` literal anywhere in `components/` is a review failure; that's how the budget stays auditable by grep. The existing `tone="on-ink" | "on-ivory"` prop generalizes to `tone="default" | "inverse"` resolving through semantic tokens, so `Button`, `SectionHeader`, `ArrowLink`, `Tag`, `StatCounter` get one refactor, not duplicate light-theme components. Nothing in this spec edits or deletes the dark literals.

## 7. Reject on sight

1. Gradient button/chip/badge/icon. 2. Gradient text. 3. Any purple/violet/magenta/pink in the mesh. 4. `box-shadow` for card elevation. 5. Pure `#FFF` or `#000` anywhere. 6. Two gradient surfaces in one viewport. 7. Verdigris on an ordinal, step number, or results counter. 8. Centered eyebrow → headline → paragraph → two-buttons hero. 9. Gold reintroduced "just for the logo" on a light page. 10. Glass/blur panels floating over the mesh.

**Relevant files:** `app/globals.css` (token home), `docs/homepage-creative-review.md`, `docs/phase2-batch-creative-review.md`.
