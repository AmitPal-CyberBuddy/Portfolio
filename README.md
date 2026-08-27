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
- **VAPT Checklist Live Dev:** https://amitpal-cyberbuddy.github.io/VAPT-Checklist/ — **In Active Development**
- **Email:** amitpal.secure@gmail.com

## Visual Concept

**Deconstructed Security** — Premium, art-directed, experimental digital experience. Not a résumé website.

**Identity emerges through work, not biography:** Who is Amit Pal through the work he does, the systems he tests, the things he builds, and the ideas he writes about?

- No Matrix rain, green terminals, hooded hackers, binary, padlocks, skulls, neon code
- No glassmorphism, purple blobs, rounded cards, skill bars, generic metrics
- Yes: bold typography (Syne, Space Grotesk, Instrument Serif, IBM Plex Mono), experimental layouts, custom graphics, kinetic type, scroll-driven color transitions

### Color Environments (Cohesive Journey)

- **Hero:** Deep black #050507 / Electric blue #3A5BFF / Cyan #6EFFE5 — interactive node network (client→api→auth→data), technical frame
- **VAPT Checklist:** Teal dark #0A0F0D / Signal green #00FF9D — **In Development** badge, taxonomy convergence canvas (623→25)
- **CyberBuddy:** Deep purple #0F0A1A / Electric purple #8A5CFF / Pink #FF5CA1 — live product, 7 tools
- **Writing:** Cream #FFF8EC / Orange #FF4D00 — editorial, real Medium articles
- **Journey:** Black — signal path, not CV timeline
- **Milestones:** Gold #FFD60A / Black #111111 — anonymized, meaningful moments
- **Now:** White — living, concise, easy to update
- **Connect:** Black with interactive gradients, magnetic CTA, email prominent

## Projects — Storytelling, Not Cards

### VAPT Checklist — In Active Development
- **Live Dev:** https://amitpal-cyberbuddy.github.io/VAPT-Checklist/
- **Repo:** https://github.com/AmitPal-CyberBuddy/VAPT-Checklist
- **Status:** Currently Building / Active Project / In Development — **not production-final**
- Story: `Fragmented security checks → Taxonomy and normalization → Structured testing workflow → Operator-focused VAPT workspace`
- 623 original checks normalized into 25 categories, 196 families, 15 attack-chain graphs, 40 payload refs, 12 Burp workflows
- Context-aware workspace: 7 presets, 18 scoping questions, multi-role matrix, honest coverage states (tested · testing now · blocked · N/A · not tested)
- Check ≠ coverage ≠ finding — evidence packs, Markdown coverage, CSV export
- Local-first, no backend, no telemetry, under active development

### CyberBuddy — Browser-Based Security Assessment Suite — Live
- **Live:** https://amitpal-cyberbuddy.github.io/CyberBuddy/
- **Repo:** https://github.com/AmitPal-CyberBuddy/CyberBuddy
- Why built: Tooling scattered, heavy setups, external data. CyberBuddy is local-first where it matters, no framework, static HTML/CSS/JS + Python stdlib, same graders in browser and server.py
- 7 tools: Clickjacking Validator, Security Headers Auditor, CORS Validator, CSP Auditor, DNS Analyzer, CSRF PoC Generator, JWT Workbench
- Guides under /guides/ — short, tool-connected, OWASP/CWE/MDN/specs references
- Authorized testing only — GET baseline + analyst-selected HEAD/OPTIONS + CORS preflight simulation, never POST/PUT/PATCH/DELETE to target

### Writing — Real Articles (Verified)
- **Medium:** https://amitpxl.medium.com/
- 1. **CORS Misconfiguration: When Reflecting the Origin Is Not the Whole Story** (2h ago) — https://amitpxl.medium.com/cors-misconfiguration-when-reflecting-the-origin-is-not-the-whole-story-956e2e6e18bc — Everyone notices reflected ACAO, fewer verify authenticated impact. Pairs with CORS Validator.
- 2. **HTTP Request Smuggling vs HTTP Request Pipelining: Why They’re Often Confused** (Jun 19) — https://amitpxl.medium.com/http-request-smuggling-vs-http-request-pipelining-why-theyre-often-confused-44ffe6e528eb
- 3. **How I Broke Client-Side Encryption By Frontend JavaScript Analysis** (May 27) — https://amitpxl.medium.com/how-i-broke-encrypted-requests-by-reading-frontend-javascript-b016c5b9078d
- Editorial layout, not card grid — featured article + code visual + list. Architecture supports future articles without redesign, no invented titles.

## Sections

```
HOME — Amit Pal, Application Security, VAPT•Web&API•Tooling•Research, breaking systems tagline, interactive architecture
→ MANIFESTO — Not a résumé, living archive, Research→Tooling→Writing→Repeat, focus areas
→ SELECTED WORK 01/03 — Tools that test real systems
  → VAPT Checklist — In Development story, taxonomy convergence, operator flow
  → CyberBuddy — Live product, 7 tools, architecture, guides
→ RESEARCH LOG 02 — Editorial writing, real Medium articles, code visual
→ JOURNEY 03 — Signal path, not CV, learning by breaking, work/learning/building
→ MILESTONES — Gold/black, anonymized feedback, protected confidentiality
→ NOW 04 — Living, concise: Building VAPT Checklist, Writing & Research browser security, Maintaining CyberBuddy
→ CONNECT 05 — Let's build more secure things, email prominent, authoritative links only, magnetic CTA
```

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
- Framer Motion — premium motion, scroll-linked, parallax
- Canvas — abstract security structures (node networks, taxonomy convergence)
- SVG — technical diagrams, grids, frames
- No heavy WebGL, respects `prefers-reduced-motion`, accessible, keyboard nav, high contrast
- Build: 388kb JS (120kb gzipped), 27kb CSS

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
- `WRITING_REAL` — Real Medium articles, verified links, no invented titles
- `VAPT_CATEGORIES` — 25 categories
- `CYBERBUDDY_TOOLS` — 7 tools
- Now section — 3 items: Building, Writing & Research, Maintaining

Future tools/articles/milestones can be added without redesign — grid and list architectures support it.

## Design Principles — Final Audit Passed

**First Impression:** Immediately impactful — huge AMIT PAL, interactive architecture, VAPT in-dev badge, memorable within seconds, different from generic portfolio.

**Visual Design:** Distinctive — custom canvas, taxonomy convergence, editorial writing, gold milestones, magnetic CTA. Nothing template-like.

**Color:** Cohesive journey — black→teal→purple→cream→black→gold→white→black. Each section distinctive atmosphere, transitions intentional, expressive not chaotic.

**Motion:** Premium and intentional — loader, hero stagger, marquee, node network, dots convergence, CountUp, scroll progress, parallax glows, magnetic button, whileInView reveals. Alive not distracting.

**Graphics:** Strong memorable moments — hero client→api→auth→data diagram, VAPT 623→25 convergence, taxonomy flow labels, tool grid, code visual. Specifically designed for this portfolio, contributes to storytelling.

**Typography:** Major visual element — Syne 800 for display, Instrument Serif for editorial, Space Grotesk for sans, IBM Plex Mono for technical. Hierarchy strong, readable despite experimental.

**Navigation:** Minimal, supports journey — Work 01, Writing 02, Journey 03, Now 04, Connect 05, time display. One cohesive journey.

**Responsiveness:** Intentionally designed — mobile not just shrunk, grids collapse, typography scales, canvas degrades gracefully.

**Project Storytelling:** VAPT tells progression Fragmented→Taxonomy→Workflow→Workspace, emphasized as Currently Building, not finished. CyberBuddy communicates what/why/practical tasks/how fits broader work.

**Links Verified:** All authoritative — LinkedIn amitpal-wb, Medium amitpxl (3 real articles), CyberBuddy live, VAPT-Checklist live dev (in dev), email amitpal.secure@gmail.com, GitHub. No placeholders, no invented.

**Writing:** Editorial, real articles only, supports future without fake placeholders.

**Now:** Living, concise, honest snapshot per spec.

**Future:** Architecture supports adding tools/research without redesign.

**Milestones:** Anonymized, confidentiality protected, meaningful moments not testimonial carousel.

**Visual Ambition:** Ambitious but controlled — exceptional design, custom graphics, expressive colors, modern animation, kinetic type, scroll storytelling, experimental composition, interactive elements, memorable transitions, premium motion.

**Final Test:** If discovered via LinkedIn/GitHub/Medium/projects, visitor sees memorable, distinctive representation of Amit Pal's work — not another React portfolio. Could this be given to another random cybersecurity professional with only text changes? No — visual identity and storytelling specific to VAPT Checklist and CyberBuddy.

## License

Portfolio design and code © 2026 Amit Pal. VAPT Checklist and CyberBuddy under their respective licenses.
