# Amit Pal — Living Portfolio

**Amit Pal — Application Security**
VAPT • Web & API Security • Mobile • Security Tooling • Research • Writing

> Breaking systems to understand security. Building tools that test real applications. Writing about browser security and real-world impact.

**Live:** https://amitpal-cyberbuddy.github.io/Portfolio/

## Authoritative Links

- **LinkedIn:** https://www.linkedin.com/in/amitpal-wb/
- **Medium:** https://amitpxl.medium.com/ (3 articles published)
- **GitHub:** https://github.com/AmitPal-CyberBuddy
- **CyberBuddy Live:** https://amitpal-cyberbuddy.github.io/CyberBuddy/ — Browser-based security assessment suite
- **VAPT Checklist Live:** https://amitpal-cyberbuddy.github.io/VAPT-Checklist/ — **v1.0.0-r29 release candidate; browser and visual QA sign-off pending**
- **Email:** amitpal.secure@gmail.com

## Visual Concept

**Deconstructed Security** — Premium, art-directed, experimental digital experience. Not a résumé website.

**Identity emerges through work, not biography:** Who is Amit Pal through the work he does, the systems he tests, the things he builds, and the ideas he writes about?

- No Matrix rain, green terminals, hooded hackers, binary, padlocks, skulls, neon code
- No glassmorphism, purple blobs, rounded cards, skill bars, generic metrics
- Yes: bold typography (Syne, Space Grotesk, Newsreader, IBM Plex Mono), evidence-led visual cues, contained project imagery, and purposeful interaction states

### Visual System

- **Dark mode:** deep blue-black background, layered slate surfaces, high-contrast white text, and restrained mint/blue/violet signals.
- **Light mode:** cool blue-gray page background, white elevated surfaces, ink text, and darker accessible accents.
- **Every section:** one spacing scale, one card/border treatment, shared monospace labels, and consistent button/link states.
- **Project imagery:** contained in labelled media frames; it supports the project narrative instead of becoming a full-bleed poster.
- **Connect:** an intentional, high-clarity closing panel with a direct mailto action and verified profile links.

## Projects — Storytelling, Not Cards

### VAPT Checklist — v1.0.0-r29 Release Candidate
- **Live preview:** https://amitpal-cyberbuddy.github.io/VAPT-Checklist/
- **Repo:** https://github.com/AmitPal-CyberBuddy/VAPT-Checklist
- **Status:** v1.0.0-r29 release candidate — browser and visual QA sign-off is still pending, so it is **not production-final**.
- Story: `Fragmented security checks → Taxonomy and normalization → Structured testing workflow → Operator-focused VAPT workspace`
- Project-documented snapshot: 623 validated items across 25 categories. The [VAPT-Checklist repo](https://github.com/AmitPal-CyberBuddy/VAPT-Checklist) remains the authoritative source when these evolve.
- Context-aware workspace: presets, scoping questions, multi-role matrix, honest coverage states (tested · testing now · blocked · N/A · not tested)
- Check ≠ coverage ≠ finding — evidence packs, Markdown coverage, CSV export
- Local-first, no backend, no telemetry

### CyberBuddy — Browser-Based Security Assessment Suite — Live
- **Live:** https://amitpal-cyberbuddy.github.io/CyberBuddy/
- **Repo:** https://github.com/AmitPal-CyberBuddy/CyberBuddy
- Why built: Tooling scattered, heavy setups, external data. CyberBuddy is a no-account, browser-based suite with a static HTML/CSS/JS frontend and a Python stdlib helper for supported checks.
- 7 tools: Clickjacking Validator, Security Headers Auditor, CORS Validator, CSP Auditor, DNS Analyzer, CSRF PoC Generator, JWT Workbench
- Guides under /guides/ — short, tool-connected, OWASP/CWE/MDN/specs references
- Authorized testing only — GET baseline + analyst-selected HEAD/OPTIONS + CORS preflight simulation, never POST/PUT/PATCH/DELETE to target

### Writing — Real Articles (Verified)
- **Medium:** https://amitpxl.medium.com/
- 1. **CORS Misconfiguration: When Reflecting the Origin Is Not the Whole Story** (2h ago) — https://amitpxl.medium.com/cors-misconfiguration-when-reflecting-the-origin-is-not-the-whole-story-956e2e6e18bc — Everyone notices reflected ACAO, fewer verify authenticated impact. Pairs with CORS Validator.
- 2. **HTTP Request Smuggling vs HTTP Request Pipelining: Why They’re Often Confused** (Jun 19) — https://amitpxl.medium.com/http-request-smuggling-vs-http-request-pipelining-why-theyre-often-confused-44ffe6e528eb
- 3. **How I Broke Client-Side Encryption By Frontend JavaScript Analysis** (May 27) — https://amitpxl.medium.com/how-i-broke-encrypted-requests-by-reading-frontend-javascript-b016c5b9078d
- A consistent research-note card system for all verified articles, followed by a direct “View all writing on Medium” link. Architecture supports future articles without redesign, with no invented titles.

## Sections

Order below is the actual render order in `src/App.jsx` — Hero → Projects → Focus → How I work → Writing → The Loop → Journey → Growth Signals → Now → Contact → Footer.

```
HERO — Amit Pal, Security Analyst (VAPT) • Ampcus Cyber; direct routes to projects and writing,
       plus a compact evidence-capture artifact
→ FOCUS — an accessible explanation of VAPT, end-to-end testing flow, focus areas, and working principles
→ HOW I WORK — Test → Build → Research → Write
→ PROJECTS — CyberBuddy (live), VAPT Checklist (v1.0.0-r29 release candidate; QA pending), and ScriptSentry (Python)
→ WRITING — consistent research-note cards for all verified Medium articles, followed by a direct view-all link
→ THE LOOP — Learn → Practice → Apply → Build & Share
→ JOURNEY — fresher → recognition → VAPT transition → Performer of the Quarter
→ GROWTH SIGNALS — building, research, and writing habits; one anonymized client-appreciation quote
→ NOW — current work and learning with direct links
→ CONTACT — email, LinkedIn, Medium, GitHub, and a clear mailto CTA
→ FOOTER
```

Journey owns the chronology and the recognition. Growth Signals deliberately does **not**
repeat those milestones — it carries only additional evidence, so the same story is never
told twice on the page.

## Professional Focus (Authoritative)

- Application Security
- Vulnerability Assessment and Penetration Testing
- Web Application Security
- API Security
- Security Testing
- Security Research
- Building security-focused tools and projects
- Technical writing and knowledge sharing

## Tech Stack

- React 19 + Vite (base `/Portfolio/` for GitHub Pages)
- A token-based CSS design system with responsive component layouts
- Framer Motion for the loading screen, sectional reveals, and restrained project-data animations
- Lucide icons and semantic HTML for technical visual cues, navigation, and CTAs
- `prefers-reduced-motion`, keyboard focus, clear interaction states, and contrast are built in
- Build: ~358kb JS (113kb gzipped), ~41kb CSS

## Development

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5173
npm run build
```

Dev server serves at `/Portfolio/` base to match GitHub Pages.

## Deployment

GitHub Pages via Actions. Workflow file in `docs/workflows/deploy.yml` (GitHub App cannot push `.github/workflows/**` directly — copy to `.github/workflows/` after merge, same pattern as VAPT-Checklist repo).

Workflow:
- Build Vite
- Copy `dist/index.html` → `dist/404.html` for SPA routing
- Upload artifact to Pages

## Content Updates — Easy

All authoritative content in `src/App.jsx` top:

- `LINKS` — LinkedIn, Medium, GitHub, live projects, email (authoritative only)
- `WRITING` — Real Medium articles, verified links, no invented titles
- `FOCUS_STEPS`, `LOOP_STEPS`, `JOURNEY`, `SIGNALS`, and `NOW_ITEMS` — concise, data-driven content blocks that map to the reusable section layouts.

There are no `VAPT_CATEGORIES`, `CYBERBUDDY_TOOLS`, or `WRITING_REAL` constants — earlier revisions of this README described them, but they were never in the code.

### VAPT Checklist status and numbers: one authoritative source

The portfolio reflects the project-documented release-candidate snapshot: **v1.0.0-r29**,
**623 validated items**, and **25 categories**. Browser and visual QA sign-off remains
pending. Status and counts can evolve, so the authoritative source is the project itself:
https://github.com/AmitPal-CyberBuddy/VAPT-Checklist

These figures are a snapshot at the time of writing, not a claim of final production
release. If a number or status needs verification, cite the project repository rather
than this portfolio documentation.


Future tools/articles/milestones can be added without redesign — grid and list architectures support it.

## Design Principles — Visual Audit

- **Coherent modes:** both themes use named design tokens for page/background surfaces, text, borders, accents, and the contact panel. Light mode is a cool technical system, not an inverted dark theme.
- **Readable hierarchy:** Syne is reserved for display headings, Newsreader for editorial lead copy, Space Grotesk for body text, and IBM Plex Mono for compact metadata and labels. Primary and secondary text pairs meet comfortable contrast targets in both modes.
- **Deliberate responsive behavior:** paired layouts stay side-by-side across laptop and intermediate widths, then collapse at controlled breakpoints. Project visuals are capped media frames after stacking rather than oversized posters.
- **Interaction clarity:** every visible action is a semantic link or button, including project previews, Medium/GitHub destinations, navigation, the theme switcher, and mailto contact actions. Hover and keyboard focus treatments are shared.
- **Accessibility:** skip navigation, visible focus rings, reduced-motion support, labelled controls, responsive touch targets, and readable overlays are part of the baseline.

## License

Portfolio design and code © 2026 Amit Pal. VAPT Checklist and CyberBuddy under their respective licenses.
