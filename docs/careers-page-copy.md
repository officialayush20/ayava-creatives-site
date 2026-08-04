# Ayava Creatives — Careers Holding Page Copy
Route: `/careers` | For: Frontend Engineer implementation | Status: v1 draft, pending founder tone review

Voice: warm but honest — "not yet, but talk to us," never a closed door. First person (Ayush speaking), consistent with the About page's POV.

---

## 1. Hero

**Eyebrow:** Careers

**H1:**
We're not hiring right now — but we'd still like to hear from you.

**Subhead:**
Ayava is a lean, founder-led studio today. When that changes, I'd rather already know who's interested than start from zero. Tell me a bit about yourself below.

**CTA (anchor link):** Introduce Yourself → `#interest-form`

---

## 2. Why Ayava (Eventually)

**Eyebrow:** Why People Might Want to Work Here
**H2:** What it's like at Ayava, even at this size.

Right now, Ayava is me — which means whoever joins next won't be the fifth hire in a department, they'll be working directly alongside the person who scopes, builds, and runs every account. No management layers to route through, no bureaucracy sized for a company that doesn't exist yet.

The work itself spans further than most agencies at this stage: real estate, e-commerce, EdTech, B2B SaaS, and more — the same range covered on the [About](/about) page. Whoever comes on board will touch work with actual production and revenue stakes attached, not internal practice projects.

If that sounds like the kind of place you'd want to build something early, I'd rather have your details on file now than post a generic job listing later and start from a cold list.

---

## 3. Interest Form

**Eyebrow:** Stay on Our Radar
**H2:** Tell us a little about yourself.

**Fields:**

- **Full Name** — text input, required. Label: "Full Name" · Placeholder: "Your name"
- **Email** — email input, required. Label: "Email" · Placeholder: "you@email.com" · Helper text (on error): "Enter a valid email address."
- **Role/Area of Interest** — select, optional. Label: "Area of Interest (optional)" · Placeholder/default option: "Select an area" · Options: Design, Development, Marketing/Growth, Strategy/Account, Other
- **Optional Note** — textarea, 3 rows, optional. Label: "Anything Else? (optional)" · Placeholder: "Anything you'd like us to know — portfolio link, background, timing."

**Submit button label:** Send Introduction

**Loading state label:** Sending...

**Success state:**
H3: Thanks — we'll keep this on file.
Body: We'll reach out if something opens up that fits.

**Error state (submission failed):**
Banner: Something went wrong sending this. Please try again, or email us directly at info@ayavacreatives.com.
Buttons: Try Again · Email Us Instead (mailto fallback)

---

## 4. CTA — Redirect Client Inquiries

**Statement:**
Looking to work *with* Ayava rather than *at* Ayava?

**Button:** Get in Touch About a Project → `/contact`

---

## Open Items for Founder Review
1. §2 culture paragraphs are written in Ayush's voice speaking to a prospective hire — recommend founder review for tone before publishing, since this page addresses a different audience than About/Pricing/Contact.
2. No factual claims requiring separate sign-off identified in this page's copy (no headcount, no open-roles claims, per the spec's explicit ban) — copy stays inside the "not hiring, lean team" framing already confirmed for About page §6.
