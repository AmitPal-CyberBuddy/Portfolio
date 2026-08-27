# Portfolio Fix — Overlapping, Oversized Text & Portfolio Feel

Date: 2026-08-27 — Build: 412.95KB JS gzip 121.18KB, CSS 22.13KB gzip 4.99KB
Preview: http://localhost:5173/Portfolio/ via portfolio-preview-ce9c847f (port 5173)

## User Feedback Addressed
> "Text are overlapping, some text seems too extra large, some areas feels like not a part of this, also doesnot give the feel of a portfolio"

### Root Causes Found
1. **Watermarks 14-20vw** with `white-space: nowrap` — `TRAILER NOT MOVIE 18vw`, `PRACTICAL • APPSEC 16vw`, `RESEARCH → SECURITY 18vw`, `BUILD 16vw`, `EXPERIMENTS 14vw`, `CORS • JWT • CSP • HEADERS 18vw`, `GROWTH 20vw`, `NOW • 2026 18vw`, `AMIT PAL • 2026 20vw` — on 1280px laptop these exceed viewport and overlap content, causing horizontal scroll risk.
2. **Hero & Section titles too large for portfolio** — hero `clamp(64px,11vw,168px)` and section `clamp(48px,8vw,120px)` feel like poster, not portfolio. Portfolio needs confidence without shouting.
3. **Meta strategy boxes** — border boxes with internal notes: "Honest story — previous role not cybersecurity — ...", "Not every certificate needs to appear...", "Strategy: Real screenshots contain...", "Working across a growing range..." border, "Currently active — Building..." border — feel like design spec, not visitor content.
4. **Tagline density** — hero tagline 5 bullets, ApproachMinimal "Spec vs reality • Browser behavior proves impact • Evidence-grade • Identifying Vulnerabilities..." feels like internal checklist.

### What Changed (Commit d6e5337)

**Watermarks — All reduced to portfolio scale:**
- Hero: `22vw → 12vw → 9vw` opacity `0.02 → 0.015 → 0.01`
- TRAILER NOT MOVIE: `18vw → 10vw` opacity `0.015 → 0.01`
- PRACTICAL • APPSEC: `16vw → 10vw` `0.015 → 0.01`
- RESEARCH → SECURITY: `18vw → 9vw` `0.012 → 0.01`
- BUILD: `16vw → 9vw` `0.02 → 0.015`
- EXPERIMENTS: `14vw → 9vw` `0.015 → 0.01`
- CORS • JWT • CSP • HEADERS: `18vw → 9vw` `0.035 → 0.02`
- GROWTH: `20vw → 9vw` `0.02 → 0.01`, quote mark `180px → 100px`
- NOW • 2026: `18vw → 9vw` `0.02 → 0.015`
- AMIT PAL • 2026: `20vw → 10vw` `0.015 → 0.01`
- Loader: `22vw → 10vw`
- All watermarks now have `overflow:hidden` to prevent scroll.

**Typography Scale — Portfolio feel, not poster:**
- `index.css` hero-title: `clamp(64px,11vw,168px) → clamp(52px,8vw,112px)`
- `index.css` section-title: `clamp(48px,8vw,120px) → clamp(36px,6vw,72px)`
- Manifesto: `clamp(32px,4.5vw,56px) → clamp(28px,3.8vw,44px)` line-height 0.9→0.95
- Transition: `clamp(40px,5vw,68px) → clamp(36px,4.5vw,56px)`
- VAPT/CyberBuddy: `clamp(48px,6vw,84px) → clamp(40px,5vw,64px)`
- Writing: `clamp(48px,7vw,96px) → clamp(36px,5vw,64px)`
- Growth Signals: `clamp(48px,6vw,72px) → clamp(36px,5vw,56px)`
- Now: `clamp(48px,8vw,120px) → clamp(40px,6vw,64px)`
- Connect: `clamp(48px,9vw,136px) → clamp(40px,6vw,84px)`

**Meta Boxes Removed / Simplified:**
- ProfessionalFocus: border box "Working across growing range..." → plain 13px sans text "Working across growing range... Web & API focus."
- Lifecycle: 10 steps → 5 steps (`Scope & Recon → Web & API Testing → Manual Validation → Impact Analysis → Reporting`), font 10px→11px, padding larger for readability.
- Focus Areas: 10 tags → 5 tags.
- Transition: border box "Honest story..." removed entirely. Desc shortened: "Joined Ampcus Cyber Nov 2023 as fresher — Lead Generation Executive. Research, OSINT, intelligence. Transition Feb 2026 into VAPT."
- Milestone: border box "Not every certificate..." removed.
- Milestone appreciation: `DESIGNED INTERPRETATION` and `CONFIDENTIALITY` tags removed, strategy border box removed, quote shortened, description simplified to sans 13px.
- Now: border box "Currently active — Building..." removed, "Living snapshot..." simplified to single sans line with Roots • Building • Last Aug 2026 • Live time.
- ApproachMinimal: dual-span meta "Spec vs reality • Browser behavior..." → single line "Identifying Vulnerabilities Before Attackers Do"
- Writing: "More — Curated, not exhaustive — Tap to reveal on mobile" → "More — Curated"
- Hero tagline: 5 bullets → 3 concise.

**Result:**
- No horizontal scroll at 375/768/1280/1440 (watermarks hidden overflow)
- Hierarchy: Work (strongest visual weight with canvas) → Writing (editorial) → Growth (tertiary) → Now (concise) → Connect (invitation) — portfolio feel restored.
- Text no longer competes with watermarks.
- Mono labels increased earlier 9→10px (previous commit) + lifecycle now 11px for readability.

## What Intentionally NOT Added & Why

Per task: do NOT blindly add everything as text, do NOT create résumé.

- **Full CyberBuddy tool list (7 tools detailed):** Excluded. Portfolio is trailer. Project site https://amitpal-cyberbuddy.github.io/CyberBuddy/ already has details. Portfolio shows visual metaphor "One roof, many checks" with floating browser windows — few words, strong visual.
- **Full VAPT Checklist breakdown (25 cats 196 families / 623 legacy):** Excluded. Numbers evolving, would become documentation page. Portfolio shows canvas "Fragmented → Taxonomy → Workflow" and link to live dev. Keeps trailer-not-movie.
- **Certificate wall / Awards cards:** Excluded. Would be generic identical cards. Growth curated to 3 moments: Early 2025 Rewards & Recognition, Feb 2026 Transition, Q1 2026 Performer — shows deliberate learning, adaptability, ownership. Not award wall.
- **Skills cloud (Burp, Postman, Nmap dump):** Excluded. Focus Areas reduced to 5, tooling mentioned contextually "where useful — not a dump".
- **Raw client appreciation screenshots:** Excluded (SKIP or DESIGNED). Real screenshots contain client names/emails/internal info. Strategy: use anonymized editorial quote, no private data. If safe redacted screenshot exists, can replace with designed treatment (see Asset Decisions).
- **Lead Generation Executive detailed timeline:** Not equal visual weight to security work. Honest mention in Transition, muted opacity 0.6, not overstated as cybersecurity.
- **Education BCA Techno Main 2020-2023 as headline:** Secondary footer in Now, not dominant. Portfolio weight remains current security work, VAPT/appsec, independent projects, writing, growth.
- **Mobile PT as already done:** Not claimed. Journey and Now reflect "Web & API only so far, Mobile PT learning next" — accurate.
- **Titles like Cybersecurity Expert/Guru/Leader:** Never used. Confident professional credible only.

## Asset Decisions — Explicit Per Category

All current visuals are code (canvas/SVG), no external images. This is intentional for performance (no tracking, static-only, no WebGL). Below is decision matrix for future real assets.

**Folder convention:** `/public/assets/` — create if needed. Easy replacement: drop file with same name, rebuild. No code change if filename same. Use WebP for photos, SVG for diagrams. Optimize: <200KB per image, max 1600px wide, 72dpi.

### 1. Hero — Amit Pal Identity
- **Status:** DESIGNED (canvas nodes + SVG grid) — TEMPORARY abstract, works for trailer.
- **NEEDED NOW?** OPTIONAL — Real asset could strengthen but not required.
- **If adding:** `hero-workspace.webp` — 1200x800, 16:10, shows minimal workspace (laptop, notebook, no face needed), cropped 10% top, desaturated 20%, overlay `rgba(5,5,7,0.4)`. Folder `public/assets/hero/`. Replacement: replace canvas with `<img>` in `HeroVisual` fallback.
- **Why not now:** Keeps portfolio code-only, no personal photo pressure, abstract network matches appsec.

### 2. Professional Focus — Current Work VAPT
- **Status:** DESIGNED (grid pattern + lifecycle tags)
- **NEEDED NOW:** NOT NEEDED — text + tags sufficient, visual weight from surrounding sections.
- **OPTIONAL:** `focus-workflow.svg` — 800x400, simple 5-step flow Scope→Recon→Testing→Validation→Reporting, stroke 1px white, no fill. Folder `public/assets/focus/`.

### 3. Work — VAPT Checklist
- **Status:** DESIGNED — Cinematic canvas (dots organizing)
- **NEEDED NOW:** DESIGNED is intentional — trailer, not movie. Real UI screenshot would turn portfolio into documentation.
- **TEMPORARY vs FINAL:** Canvas is FINAL for portfolio, even when product matures. Product depth lives at https://amitpal-cyberbuddy.github.io/VAPT-Checklist/
- **OPTIONAL enhancement:** `vapt-checklist-hero.webp` — 1400x900, 16:9, screenshot of checklist taxonomy view, cropped to hide counts if evolving, blurred 2px background, centered. Folder `public/assets/work/`. Use only if you want to replace canvas with image — but keep canvas as primary.
- **Replacement instruction:** In `VaptCinematic`, swap canvas for `<img src="/assets/work/vapt-checklist-hero.webp" style="width:100%;height:100%;object-fit:cover;opacity:0.6" />`. Keep border `rgba(0,255,157,0.12)`.

### 4. Work — CyberBuddy
- **Status:** DESIGNED — Floating browser windows (visual metaphor)
- **NEEDED NOW:** DESIGNED — shows "one roof" concept without listing 7 tools.
- **Why not real screenshots:** Would be list of tools (violates "do not list every CyberBuddy tool"). Project site already does.
- **OPTIONAL:** `cyberbuddy-composite.webp` — 1200x800, composite of 2-3 tool UIs (e.g., clickjacking + JWT), 80% opacity, with 24px gap. Folder `public/assets/work/`. Only if you want more literal — but current abstract is stronger.

### 5. Experiments — ScriptSentry Python
- **Status:** TEXT ONLY — Minimal
- **NEEDED NOW:** NOT NEEDED — secondary experiment, not major showcase.
- **OPTIONAL:** `scriptsentry-terminal.webp` — 800x500, terminal screenshot showing "Watch every line" output, cropped to 16:10, no sensitive paths. Folder `public/assets/experiments/`.

### 6. Writing — Research Log
- **Status:** TEXT + editorial, no images
- **NEEDED NOW:** NOT NEEDED — Medium holds depth.
- **OPTIONAL:** `writing-texture.webp` — 800x600, subtle paper texture, 5% opacity overlay for cream section, not content. Folder `public/assets/writing/`.

### 7. Growth — Milestones
- **Status:** DESIGNED INTERPRETATION — text timeline, no certificate images
- **NEEDED NOW:** DESIGNED — intentional to avoid certificate wall.
- **Certificate images:** NOT NEEDED — would be generic. If you must: `growth-2025-recognition.webp` — 600x400, 3:2, certificate cropped to hide internal IDs, redacted 100%, border 1px `rgba(255,255,255,0.08)`. Folder `public/assets/growth/`. But recommend SKIP — keep designed.
- **Replacement:** To add, insert after milestone item as `<img>` with same border style, but keep timeline dominant.

### 8. Appreciation — Client Feedback
- **Status:** DESIGNED INTERPRETATION — anonymized editorial quote
- **NEEDED NOW:** SKIP real screenshot — confidentiality.
- **Asset decision matrix:**
  - **USE REAL:** Only if screenshot has zero client names/emails/internal URLs/IPs, and client gave explicit permission to publish. File `appreciation-real.webp` 800x400, cropped to feedback text only, redacted top 20% where names usually appear, blur 8px on any identifier.
  - **DESIGNED (current):** Anonymized quote — FINAL, no asset needed.
  - **TEMPORARY:** Could add `appreciation-redacted.webp` — 800x400, real screenshot with black bars over confidential parts, border `rgba(255,255,255,0.06)`, background `rgba(0,0,0,0.2)`. But designed is cleaner for premium feel.
  - **NOT NEEDED:** Large testimonial section with multiple quotes — would feel generic.
- **Folder:** `public/assets/growth/` if ever added.
- **Cropping instruction:** Crop to 16:9, focus on 2 lines of praise, remove email headers. Optimize <100KB WebP. Replacement: swap quote div for img, keep italic serif style as caption.

### 9. Now — Snapshot
- **Status:** TEXT ONLY — living snapshot
- **NEEDED NOW:** NOT NEEDED — no image, keeps concise.
- **OPTIONAL:** `now-bengaluru.webp` — 400x400, 1:1, subtle city texture or desk, 10% opacity, as background of live badge. Folder `public/assets/now/`. But recommend SKIP to keep minimal.

### 10. Connect — AP Monogram
- **Status:** DESIGNED — SVG monogram unique to Amit Pal
- **NEEDED NOW:** DESIGNED — FINAL signature motif. No real asset needed.
- **OPTIONAL:** `ap-monogram.svg` — 48x48, current inline SVG could be extracted to file for reuse. Folder `public/assets/brand/`. Replacement: `<img src="/assets/brand/ap-monogram.svg" />` same size.

## Easy Asset Replacement System

**Current:** No external assets, all visuals code. Zero config.

**To add real asset later:**
1. Create folder `public/assets/{section}/` (e.g., `public/assets/work/`)
2. Export image: WebP, max 1600px wide, <200KB, 72dpi, sRGB.
3. Name exactly: `vapt-checklist-hero.webp` or `hero-workspace.webp` (see above)
4. In `src/App.jsx`, find component (e.g., `VaptCinematic`) — replace canvas block with:
   ```jsx
   <img src="/Portfolio/assets/work/vapt-checklist-hero.webp" alt="VAPT Checklist taxonomy view" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.6}} />
   ```
   Note: Vite base is `/Portfolio/` — use `/Portfolio/assets/...` or import.
5. Keep border: `1px solid rgba(0,255,157,0.12)` and backdrop `blur(16px)` wrapper for consistency.
6. Rebuild: `npm run build` — check gzip stays <130KB JS, <6KB CSS.
7. No other code change needed.

**Cropping rules:**
- Hero: 16:10, focus center, crop top 10% if needed.
- Work: 16:9, center, hide evolving counts by cropping bottom 15%.
- Growth certs: 3:2, redact IDs, border 1px `rgba(255,255,255,0.08)`.
- Appreciation: 16:9, crop to feedback text only, black bars over confidential.

**Optimization:**
- Use Squoosh or `cwebp -q 80`
- Lazy load if below fold: `loading="lazy"`
- Keep canvas as fallback for performance — images optional.

## Visitor Perspective — Before vs After

**Before (user feedback):**
- Watermarks competing with content, overlapping at 1280px
- Hero title 168px + section 120px = poster, not portfolio
- Border boxes felt like internal spec, not curated story
- Some sections felt disconnected (Approach, Experiments)

**After:**
- Watermarks 9-10vw, 1% opacity, `overflow:hidden` — subtle texture, no overlap
- Titles 112px hero, 72px sections, 44px manifesto — confident, readable, portfolio hierarchy
- Meta boxes removed, replaced with plain sans 13px or removed entirely — visitor sees story, not strategy notes
- Lifecycle 10→5, Focus 10→5, tagline simplified — less density, more visual breathing
- Strongest weight remains Work (VAPT + CyberBuddy canvases), Writing editorial, Growth curated — awards/certs/education secondary, as required.

## IA — Final (Matches Requirement 1-8)

1. **Who I am now** — Hero + Manifesto (Amit Pal, AppSec, Trailer not movie, Identifying Vulnerabilities...)
2. **What I work on** — ProfessionalFocusMinimal (Practical AppSec, VAPT end-to-end, Web & API)
3. **How transitioned** — TransitionMinimal (Nov 2023 Lead Gen → Feb 2026 VAPT, honest, not overstated)
4. **Kind of security work** — Work VAPT Checklist + CyberBuddy (visual showcases, own motion language)
5. **What independently build** — ExperimentsMinimal (ScriptSentry) + Work projects (independent)
6. **What write about** — Writing (CORS, Smuggling, Client-Side Crypto, spec vs reality)
7. **Selected growth/recognition** — MilestoneMinimal (Early 2025, Feb 2026, Q1 2026, anonymized appreciation)
8. **What continuing toward** — Now (Building, Writing, Maintaining, Learning Mobile PT next, Roots WB → Building BLR)

Not ABOUT ME/EXPERIENCE/SKILLS/PROJECTS/CERTIFICATIONS/EDUCATION/AWARDS/CONTACT — visitor gradually understands.

## Checklist — No Regressions

- [x] Authoritative links only (GitHub, LinkedIn, Medium, live project sites)
- [x] VAPT as In Development/Currently Building
- [x] No invented quals
- [x] Milestones anonymized, no private names/emails/systems
- [x] No clichés (no Matrix rain, hooded hackers, padlocks, skulls, neon code, glassmorphism)
- [x] Visual ambition controlled (canvas pauses offscreen, no WebGL, custom SVG)
- [x] Mobile designed not shrunk (auto heights, visual reflow, no sticky, 44px tap targets, no horizontal scroll, reduced canvas)
- [x] Roots West Bengal • Building in Bengaluru subtle
- [x] Web & API only so far, Mobile PT learning next — accurate
- [x] Bio tagline "Identifying Vulnerabilities Before Attackers Do" authentic
- [x] No Cybersecurity Expert/Guru/Leader/World-Class/Elite Hacker titles
- [x] Numbers qualitative "Working across growing range..." not permanent headline
- [x] No large certificate wall, generic testimonial, awards cards, skills cloud

## Next Steps for Owner

1. Review preview at 375/768/1280/1440 — confirm no overlap, portfolio feel.
2. If you have safe redacted appreciation screenshot, decide USE REAL vs keep DESIGNED (recommend DESIGNED for premium feel).
3. If you want hero photo, add `hero-workspace.webp` per spec — optional.
4. Keep updating Now section time live, building status — easy single source.
5. When Mobile PT learning starts, update Now tag from "Learning Mobile PT" to "Building Mobile PT" and adjust Focus Areas.
