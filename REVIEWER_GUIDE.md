# Reviewer Guide — Complete Context 0 → All

If you received `Portfolio-Full-From-Zero.patch` (2.0MB, 30 files, 4797 insertions), you have the entire portfolio from zero. This guide explains what you're seeing, so you don't need to guess.

## What the patch contains

**From:** `f611f70 Initial commit` (only 1-line README)
**To:** Current `arena/01a03f60-portfolio` (full portfolio)

```
30 files:
- src/App.jsx (1434 lines) — Entire UI: hero, focus, approach, manifesto bridge, projects (VAPT Checklist in dev, CyberBuddy live, ScriptSentry), writing, journey, milestones, now, connect
- src/index.css (680 lines) — Design system: Syne 800, Space Grotesk, Instrument Serif, IBM Plex Mono, variables, canvas, motion
- index.html — SEO: title "Security Analyst (VAPT) • Web & API • Ampcus Cyber", meta, OG webp 60KB, CSP, canonical, JSON-LD Person
- public/assets/ (5 JPGs) — hero-abstract 61KB, hero.png 13KB, vapt-workflow 167KB, cyberbuddy-tools 76KB, writing-research 134KB — all as textures, 16/10 rounded 12px
- public/og-image.webp 60KB + og-image.png 799KB — LinkedIn preview
- package.json + vite.config.js + docs/workflows/deploy.yml — build: vite 8.2.2, 421KB JS gzip 124KB
- README.md — Living portfolio overview, authoritative links, visual concept, projects storytelling
- AUDIT.md — Security + completeness hardening (rel noopener, CSP, canonical, OG, watermark cleanup, build 417KB)
- LINKEDIN_AUDIT.md — LinkedIn entry-point audit: first 30-60s gaps, IA reorder, hero clarity, navigation, what kept out, asset strategy
- PORTFOLIO_REVIEW.md, PORTFOLIO_FIXES.md, ASSET_DECISIONS.md — Earlier reviews, visual ambition vs clarity decisions
```

**Binary included:** 8 images via `GIT binary patch` — yes, patch is complete, you can `git apply` and get images.

## What patch does NOT contain (external context)

Reviewer should open these to understand full ecosystem — portfolio is trailer, not movie:

- **Live Portfolio:** https://amitpal-cyberbuddy.github.io/Portfolio/
- **CyberBuddy Live:** https://amitpal-cyberbuddy.github.io/CyberBuddy/ — 7 browser tools, local-first, evidence-grade
- **VAPT Checklist Dev:** https://amitpal-cyberbuddy.github.io/VAPT-Checklist/ — 479 guided families, 1524 catalog, taxonomy workflow, In Development
- **Medium:** https://amitpxl.medium.com/ — 3 articles (CORS 3h ago, Smuggling Jun 19, Client-Side Encryption May 27)
- **GitHub:** https://github.com/AmitPal-CyberBuddy — 4 repos, ScriptSentry experimental

## How to review — 3 levels

### Level 1 — Quick (5 min, patch file only)
Open `LINKEDIN_AUDIT.md` — it has:
- First 30-60s audit: what was already clear vs gaps
- What changed: hero chip "Security Analyst (VAPT) • Ampcus Cyber • Since Feb 2026", IA reorder, nav Focus/Projects/Writing/Journey/Now/Connect, VAPT expansion for general visitor, project why for recruiter/pro/collaborator
- What intentionally kept out: no ABOUT/EXPERIENCE/SKILLS/CERTS wall, no FAQ, no confidential data
- Asset strategy: USE REAL/DESIGNED/TEMPORARY/SKIP per file with purpose/filename/folder/ratio/dimensions/where/cropping/optimization

### Level 2 — Code (15 min, apply patch)
```bash
git checkout -b review main
git apply Portfolio-Full-From-Zero.patch
npm install
npx vite build # should be 421KB JS gzip 124KB
npm run dev -- --host 0.0.0.0 --port 5173
```
Then check:
- Hero: Does it answer in 30s who/what/focus/worth exploring?
- IA: hero → focus (who I am today) → approach → manifesto bridge (why this site) → projects (independent, live & in dev) → writing → journey (research→growth→transition→testing→building) → milestone → now → connect
- Visual: Bold but not costing clarity? Kinetic typography, canvas nodes (28 desktop/16 mobile, pauses offscreen), SVG patterns, meaningful motion
- Mobile: Auto heights, no sticky, 44px targets, no horizontal scroll, reduced canvas, touch-friendly
- Security: rel=noopener noreferrer on all external, CSP default-src 'self', canonical, no tracking

### Level 3 — Live experience (10 min, browser)
Open live link, test as 4 visitors:
- **Recruiter:** In 30s, do you know name, current identity, primary focus (Web & API Security, Practical VAPT), credibility, projects, differentiator, trajectory, contact?
- **Sec pro:** Depth Web/API? Genuine projects? Practical knowledge (end-to-end VAPT: scope→recon→manual→impact→reporting)? Continuous learning (Mobile PT next, APIsec Jan 2026)?
- **Collaborator:** Active projects discoverable? Current work? Interest areas? Connect CTA specific? (Web/API VAPT that explains impact, tooling feedback)
- **General visitor:** Who/what built/journey/where find work without VAPT jargon assumption? (VAPT = Vulnerability Assessment & Penetration Testing explained in projects)

## Key decisions to evaluate

1. **Professional clarity + visual distinctiveness balance:** Not résumé page (no ABOUT ME/EXPERIENCE/SKILLS/EDUCATION/CERTS/PROJECTS/CONTACT sequence), not experimental scroll only. Does it achieve both?

2. **First 30-60s hierarchy:** Hero chip + subtitle + chips + CTAs to projects/writing — does it establish name, current professional identity, primary technical focus, AppSec/VAPT, worth exploring via hierarchy/typography/composition/interaction/concise copy not paragraph dump?

3. **Entire journey:** Does visitor gradually understand 1 Who I am now, 2 What I work on, 3 How transitioned, 4 Kind of security work, 5 What independently build, 6 What write about, 7 Selected growth/recognition moments, 8 What continuing toward?

4. **Technical depth without exposing confidential:** End-to-end VAPT practical, no fake case studies, "growing range" qualitative not permanent headline numbers, anonymized impact quote only

5. **Intentionally kept out:** No FAQ, no skills wall, no certificate wall, no testimonial wall, no reproduction of app functionality — portfolio = curated experience, project sites = what product contains

## Build verification

```
vite v8.2.2
dist/index.html 5.42 kB gzip 1.91 kB
dist/assets/index-D92cyrnW.css 23.95 kB gzip 5.31 kB
dist/assets/index-*.js 421.72 kB gzip 124.41 kB
✓ built in ~600ms
```

## Final success criteria

"If someone who knows nothing about me clicks Portfolio link on LinkedIn, does experience quickly establish who I am, what I do, what I'm focused on, what I've built, how I've grown, and where they can explore or connect next?"

- Visually unforgettable? (art direction, kinetic typography, custom graphics, meaningful motion)
- Professionally clear? (AMIT PAL Security Analyst Web App & API Security Practical VAPT + Independent projects + Writing + visible growth)

Both must be true.

---

**Files to read in order for complete idea 0→All:**
1. README.md (overview + authoritative links)
2. LINKEDIN_AUDIT.md (latest audit, gaps, changes, recommendations)
3. AUDIT.md (security hardening)
4. ASSET_DECISIONS.md (asset strategy)
5. src/App.jsx (implementation, IA order, copy)
6. index.html (SEO for LinkedIn preview)
