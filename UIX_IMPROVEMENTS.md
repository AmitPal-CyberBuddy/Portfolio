# UI/UX Improvement Pass — September 2026

Driven by two referenced resources:

- **nextlevelbuilder/ui-ux-pro-max-skill** — its searchable rule bases
  (119 UX guidelines, pre-delivery checklist, design-system reasoning for the
  "Real-Time / Operations Landing" pattern and "Editorial Grid" style) were
  queried directly and used as the audit checklist.
- **21st-dev/magic-mcp (21st.dev)** — its component library's signature
  interaction patterns (magnetic CTAs, animated counters, masked line reveals,
  copy-to-clipboard feedback) were hand-adapted to this codebase's no-Tailwind,
  dossier-editorial design language.

The pass deliberately keeps the existing "security dossier" direction
(the skill's own style search confirmed Editorial Grid fits this product);
every change is additive polish, mapped to a guideline priority.

## What changed

### 1. Entrance choreography (Animation / Spatial continuity)
- **Hero headline lines now rise out of overflow masks**, staggered, using the
  shared `MOTION_EASE` token. Mask padding compensates descenders, italic
  overhang, and the 2px text-stroke so nothing clips mid-animation.
- **All hero entrance delays re-timed** (mast → title → copy → evidence →
  metrics at +1.1s) so they play as the loading screen lifts instead of
  finishing unseen behind it.
- Section-header hairlines sweep in from the left on first reveal.

### 2. Metrics with live count-up (Style / Perceived quality)
- `CountUp` primitive: hero stats (135+, 03, 03, 2,006) count up on first
  scroll into view. Animated digits are `aria-hidden`; each `dd` carries a
  `.sr-only` final value so screen readers announce one stable number.
- Reduced motion renders final values with zero animation and zero effects.

### 3. Magnetic primary CTA (Touch & Interaction / 21st.dev pattern)
- `Magnetic` primitive with spring physics (stiffness 170 / damping 15),
  applied to the hero "See how I work" button. Engages only for
  `(hover: hover) and (pointer: fine)` on wide screens; fully inert for touch
  and reduced motion.

### 4. Feedback everywhere (Touch & Interaction / Forms & Feedback)
- **Copy-email button** beside the contact email line: clipboard API with a
  `document.execCommand` fallback, mailto fallback on failure, a
  "Copied ✓" state that auto-resets, and an `aria-live` status announcement.
- **Press states under ~100ms** on `.button`, `.header-cta`, and `.contact-copy`
  (`:active { transform: scale(0.97) }`, 90ms) — tap feedback within the
  guideline's 80–150ms window.
- **Custom cursor press frame**: the ring contracts on `pointerdown`.

### 5. Header (Navigation / Real-time pattern — "primary CTA in nav")
- New `useScrolled` hook; the header gains elevation (shadow + spectral seam)
  and the brand mark condenses once past ~28px scroll.
- Desktop **Resume CTA** (≥1280px) opening the in-browser resume viewer —
  the landing-pattern recommendation of a persistent primary action.

### 6. Performance (stop offscreen work)
- Project consoles' ambient image drift and scanline now **pause when the
  figure leaves the viewport** (`useInView`-gated), instead of compositing
  infinitely offscreen.

### 7. Accessibility parity (WCAG 2.2 focus-appearance / state parity)
- Every hover affordance now has a `:focus-visible` twin: project-index name
  slide, article-row accent bar + title color, connect-row label slide,
  text-links, mobile nav links.

### 8. Chrome details
- Theme-matched thin scrollbar (WebKit + `scrollbar-color`), accent hover thumb.
- Loading screen shows a live `000% → 100%` counter driven by the same motion
  value as the progress bar.

## Verification
- `npm run lint` — 0 errors, 0 warnings (oxlint, 104 rules).
- `npm run build` — clean; ~127 kB gzip JS, ~13 kB gzip CSS.
- Reduced motion, touch, and small-screen fallbacks are first-class in every
  new primitive (all gates via `useReducedMotion` / `matchMedia`).

---

# Round 2 — content freshness audit + deeper visual upgrade

## Content truthfulness (details verified against live sources, 2026-09-15)

Every outward claim was re-verified against the live sites and repos:

- **VAPT Checklist had evolved past the copy.** The live product
  (library v1.3.1) is now a context-driven checklist — **178+ tests / 18
  categories**, OWASP & CWE mapped, ~20 scoping answers, 6-step assessment
  workflow, keyboard-first workspace, **5-sheet Excel export**, JSON backup —
  not the "2,006 checks / 631 families / 52 plans / 48 attack paths /
  6-stage loop / Android-iOS beta" the portfolio described. All references
  rewritten (hero metric, project card + console, NOW, resume web + print,
  README) to the verifiable claims.
- **ScriptSentry** is now a privacy-first local engine: tree-sitter AST,
  source→sink taint analysis, 0–100 evidence-weighted scoring, HTML/TXT/CSV/
  SARIF + JSON/OpenAPI exports, scan history & build diffing, pairing-token
  localhost engine, optional runtime evidence and local-AI triage. Copy,
  tags, console data and resume entries updated accordingly.
- **CyberBuddy** (7 tools: clickjacking, headers, CORS, CSP, DNS, CSRF PoC,
  JWT) and the **three Medium studies** (Aug 26 / Jun 19 / May 27) verified
  live and consistent — left as is. All 10 outbound links resolve.

## Bug fix — hero headline clipped ("Vulnerabilities")

The masked-line reveal clipped the unbreakable 15-letter word once real font
metrics exceeded the container (visible tail "es" cut). Root cause treated,
not patched per-viewport: new `useFitText` hook measures each
`[data-fit-line]` against the heading and scales the font until every line
fits — re-measuring on resize and once web fonts swap in (fallback metrics
differ). Writes are guarded against ResizeObserver height feedback loops.

## Visual depth (still dossier, now cinematic)

- **Film grain** — fixed SVG-noise veil (overlay blend, ~5% opacity,
  print-free, CSP-safe) so fills stop reading flat.
- **Living hero artifact** — the evidence panel now tilts in 3D toward the
  pointer (perspective on wrapper so framer's entrance never conflicts), a
  glow follows the cursor, and a scan beam sweeps the capture every ~7s.
  Beam rests invisible under reduced motion by keyframe design.
- **Ambient glow drift** — hero/contact radial glows slowly wander
  (24–34s alternates, `no-preference` media-gated).
- **Approach band → infinite ticker** — Test → Build → Research → Write runs
  as a seamless two-set marquee (aria-hidden; pauses on hover/focus; its
  resting keyframe is identical, so reduced motion shows a static frame
  with zero special-casing).
- **Console spotlight** — a signal-tinted radial wash tracks the cursor over
  each project console; scanline/drift loops already pause offscreen.
- **CTA sheen sweep** — solid buttons sweep a soft highlight on hover, parked
  via background-position so no overflow clipping hurts focus outlines.
- **Back-to-top FAB** — appears past 640px, conic ring shows live scroll
  progress, safe-area-aware, exits on print.
- **Mobile nav cascade** — drawer links stagger in on open
  (`no-preference`-gated).
