# Portfolio Audit — Security, Privacy, Performance, Accessibility, Content

Date: 2026-08-27 — Commit 08e8763 → 09e... — Build 417KB JS gzip 123KB, CSS 23.95KB

## Applied Fixes (2026-08-27 post-audit)

- ✅ `rel="noopener noreferrer"` on all 16 external links (was `noreferrer` only)
- ✅ Added CSP meta: `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:; object-src 'none'` + `referrer strict-origin-when-cross-origin`
- ✅ Added canonical link + JSON-LD Person schema + og:image width/height/type
- ✅ Optimized OG image: 1.6MB → 799KB PNG + 60KB WebP (1200x630), now points to WebP
- ✅ Removed 6 extra watermarks: PRACTICAL•APPSEC, RESEARCH→SECURITY, EXPERIMENTS, CORS•JWT•CSP•HEADERS, GROWTH, NOW•2026 — kept only 3: Hero I AM AMIT PAL, Manifesto TRAILER NOT MOVIE, Connect I AM AMIT PAL•2026
- ✅ Removed live badge circle in Now, removed duplicate roots, simplified ApproachMinimal static (removed framer motion x transforms)
- ✅ Reduced Now tags 4→3 (removed Maintaining), updated copy to "Based in Bengaluru, open to remote collab"
- ✅ Added "How I can help" sentence in Connect: specific but not salesy
- ✅ Removed repeated "Trailer, Not Movie" from headers, hero scroll, loader, connect — kept only in manifesto concept
- ✅ Build reduced 421KB → 417KB

Date: 2026-08-27 — Commit 08e8763 — Build 421KB JS gzip 124KB, CSS 23.95KB (pre-fix baseline)

## 1. Security Audit

### ✅ Pass
- **No XSS vectors:** No `dangerouslySetInnerHTML`, no `innerHTML`, no `eval`, no `new Function`, no user-controlled DOM insertion. All content static.
- **No secrets:** No API keys, tokens, env vars in repo. Email hardcoded is public by design.
- **Dependencies:** `npm audit` → 0 vulnerabilities (react 19.2.8, framer-motion 13.1.1, gsap 3.15, lucide-react). Vite 8.2.2 dev only.
- **External links:** All `target="_blank"` have `rel="noreferrer"` (modern browsers treat as noopener). No `window.open` without noopener.
- **No tracking:** No Google Analytics, no third-party scripts, no cookies. Only Google Fonts (fonts.googleapis.com, fonts.gstatic.com).
- **Canvas:** Hero/VAPT visuals use no user input, `requestAnimationFrame` pauses offscreen via IntersectionObserver — no DoS.
- **Clipboard:** `navigator.clipboard.writeText` only writes static email, no sensitive data read.
- **LocalStorage:** Only `theme` (dark/light) stored, no PII.
- **OG image:** Served from same origin `/og-image.png`, no external hotlink.

### ⚠️ Improve (Low risk)
- **rel attribute:** Change `rel="noreferrer"` → `rel="noopener noreferrer"` everywhere for explicit defense (older browsers). 12 occurrences in App.jsx.
- **CSP:** No Content-Security-Policy meta. Recommend add in `index.html`:
  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https:; font-src https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:; object-src 'none'">
  ```
  Note: Vite needs `unsafe-inline` for HMR in dev; production can be stricter with hashes.
- **Security headers via GitHub Pages:** Add `public/_headers` (if using Cloudflare Pages) or configure via repo:
  ```
  /*
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: camera=(), microphone=(), geolocation=()
  ```
  GitHub Pages doesn't support `_headers` natively, but can add via `meta` for frame-ancestors and via `<meta http-equiv="X-Content-Type-Options" content="nosniff">` is not respected — recommend document in README.
- **Google Fonts SRI:** No `integrity` attribute. Low risk, but could self-host fonts for full self-containment (privacy + security). Fonts currently 5 families (Syne 800, Space Grotesk, Instrument Serif, Newsreader, IBM Plex Mono) — ~80KB.
- **OG image size:** `public/og-image.png` is 1.6MB — too large, slows link previews. Optimize to `og-image.webp` 1200x630, <200KB, and keep PNG fallback.
- **Base path:** `vite.config.js` `allowedHosts: true` is needed for preview `https://{port}-{sandboxId}.e2b.app` but in production build irrelevant. Document as dev-only.

### Verdict: **Secure for static portfolio** — no critical issues.

---

## 2. Privacy
- **No telemetry, no cookies, no local analytics** — as claimed "Built with care, no tracking" is true.
- **Google Fonts** is only third-party — leaks IP to Google. Mitigation: self-host fonts in `public/fonts/` and remove preconnect to google.
- **Theme:** Stored in localStorage, not synced.

---

## 3. Performance
- **JS:** 421KB (124KB gzip) — okay for framer-motion + lucide + gsap + canvas. Could code-split but not critical.
- **CSS:** 23.95KB (5.31KB gzip) — good.
- **Images:** 4 generated JPGs 61-167KB = 438KB total, all `loading="lazy"` except hero (above fold). Good. `hero.png` 13KB decorative. `og-image.png` 1.6MB not loaded on page, only for link previews — should optimize.
- **Canvas:** 16 nodes mobile / 28 desktop, dpr capped 1.2 mobile, pauses offscreen — good for battery.
- **Fonts:** 5 families, many weights — could reduce to 3 (Syne 800, Space Grotesk 300/400, IBM Plex Mono 400) to save ~30KB.
- **No WebGL, no heavy libs** — as intended.

**Recommend:** Convert JPGs to WebP (`cwebp -q 80`) → ~40% smaller, add `decoding="async"`, add `srcset` for 400w/800w/1200w.

---

## 4. Accessibility
- **Pass:** Skip link present, `a:focus-visible` outline, `aria-label` on nav toggle, `aria-hidden` on canvas, decorative images `alt=""`, semantic sections (`nav`, `section`), `lang="en"`, `color-scheme` meta.
- **Improve:**
  - Nav toggle needs `aria-controls` pointing to mobile nav id.
  - Mobile nav links: `font-size: clamp(28px,9vw,40px)` but tap target 44px enforced via CSS — good, but add `min-height:44px` explicitly.
  - Light mode contrast: black `#0A0A0F` on `#FFFEF9` → 19:1 AAA, white on `#0A0A0F` → 19:1 AAA — passes.
  - Writing section: cream `#FFF8EC` bg with black text in dark mode? Actually writing uses `var(--cream)` which is `#FFF8EC` in dark mode, text black — contrast good. In light mode, same — good.
  - Add `aria-live="polite"` to copy feedback (already present).
  - Add `alt` to `hero.png` is empty decorative — correct.

---

## 5. SEO / Social
- **Pass:** Title, description, author, keywords, theme-color, OG type/url/title/description/image/site_name, Twitter card, `preconnect` to fonts, `preload` favicon, noscript fallback with links.
- **Improve:**
  - Add `og:image:width` `1200` and `og:image:height` `630` for faster rendering.
  - Add `link rel="canonical"` to `https://amitpal-cyberbuddy.github.io/Portfolio/`
  - Add JSON-LD Person schema:
    ```json
    {
      "@context":"https://schema.org",
      "@type":"Person",
      "name":"Amit Pal",
      "jobTitle":"Security Analyst - VAPT",
      "url":"https://amitpal-cyberbuddy.github.io/Portfolio/",
      "sameAs":["https://github.com/AmitPal-CyberBuddy","https://www.linkedin.com/in/amitpal-wb/","https://amitpxl.medium.com/"]
    }
    ```

---

## 6. Content Completeness — Does it answer what a portfolio should?

**Visitor questions → Current answer:**

| Question | Answered? | Where | Quality |
|----------|-----------|-------|---------|
| Who are you? | ✅ | Hero "I'm Amit Pal" + Manifesto "I'm Amit Pal — I do appsec..." | First-person, confident, no guru titles |
| What do you do now? | ✅ | Focus "I work as Security Analyst • VAPT" + lifecycle 5 steps + focus 5 tags | Practical, not tools dump |
| How did you get here? | ✅ | Journey "From research to security" timeline 01-04 | Honest: Lead Gen → Research → VAPT, not overstated |
| What have you built? | ✅ | Work VAPT Checklist + CyberBuddy with images + live links | Trailer-not-movie, visual identity, not doc page |
| What else? | ✅ | Experiments ScriptSentry | Shows breadth beyond browser |
| What do you write? | ✅ | Writing Research Log 3 articles with insights | Connects to tools, spec vs reality |
| Growth? | ✅ | Growth Signals 3 curated + anonymized impact quote | No certificate wall, ownership signal |
| What now? | ✅ | Now "I'm building / writing / maintaining / learning" + roots WB→BLR + live time | Living snapshot, easy update |
| How to contact? | ✅ | Connect email circle magnetic + links + "Let's build together" | Clear CTA |

**Score: 9/9 core questions answered.**

### What to INCLUDE (missing but valuable)
- **How I can help you (1 sentence):** In Connect, add specific: "If you're a team needing Web/API VAPT that explains impact clearly, or you want feedback on browser security tooling, I can help." Currently says "Available for research collabs..." — make slightly more client-facing without becoming salesy.
- **What I'm learning now (1 line):** Already "I'm learning Mobile PT next" — good, keep. Could add link to learning repo or notes if exists.
- **One-line availability:** "Based in Bengaluru, open to remote collab" — already subtle via "Building in Bengaluru" — could make explicit 1 line.
- **Security ethos:** "Authorized testing only" is present — good, keep for trust.

### What to REMOVE (still feels like dev notes / off-beat)
- **Remaining watermarks:** `PRACTICAL • APPSEC`, `RESEARCH → SECURITY`, `GROWTH`, `BUILD`, `EXPERIMENTS`, `CORS • JWT • CSP • HEADERS`, `NOW • 2026`, `AMIT PAL • 2026` — even at 9vw 1% opacity, 8 watermarks is many. Keep max 3: Hero `I AM AMIT PAL`, Work `BUILD`, Connect `I AM AMIT PAL`. Remove others to reduce noise and improve portfolio feel.
- **Section header meta:** "What I build — 01 / 02 — My visual showcases — Trailer, Not Movie" — "Trailer, Not Movie" repeated 5 times across site. Keep in manifesto only, remove from headers.
- **Approach tags:** "How I work" is good, but Test→Build→Research→Write animation could be simplified to static "I test, build, research, write" without motion x transforms — motion feels dev demo.
- **Now tags:** 4 tags "I'm Building / Writing / Maintaining / Learning" — 3 is enough (Building, Writing, Learning). Maintaining is implied.
- **Live badge:** "LIVE • time" circle in Now — feels like dev dashboard, not portfolio. Could remove or make tiny mono line.
- **Repeated roots:** "My roots West Bengal • I'm building in Bengaluru" appears 3 times (Hero tags, Manifesto, Now). Keep once in Now or footer.
- **Loader "I built this"** — remove, keep "Trailer, Not Movie — 2026"

### Contrast — is much contrast better or off-beat?
- **Current after fix:** Dark `#0A0A0F` for all work sections in dark mode, light `#FFFEF9` in light mode — cohesive. Before had green `#0A0F0D` and purple `#0F0A1A` full bleeds which felt off-beat (too saturated). Now fixed.
- **Remaining contrast:** Writing light break in dark mode + Now light break + Milestone dark + Connect dark — 2 light islands in dark page is intentional and good. In light mode, Milestone + Connect dark islands only — also good. **Contrast is now intentional, not off-beat.**
- **Recommendation:** Keep 2 light breaks max in dark mode, 2 dark breaks max in light mode. Don't add more color tints.

---

## 7. Actionable Cleanup List (Hosted Site Should NOT Have)

**Remove before hosting:**
- [ ] All watermarks except Hero and Connect (keep 2, remove 6)
- [ ] "Visual — Chaos → Structure" boxes (already removed, verify)
- [ ] "Hover canvas →" / "Hover windows →" instructional text (already removed)
- [ ] Footer dev spec "Custom canvas • SVG • Framer Motion..." (already removed, now minimal)
- [ ] Font list "Syne 800 • Space Grotesk..." (already removed)
- [ ] "Trailer, Not Movie" repetition in section headers (keep only in manifesto + loader)
- [ ] Live badge circle "LIVE • time" in Now — replace with simple mono "Last updated Aug 2026 • IST"
- [ ] Duplicate roots lines — keep 1

**Keep (visitor-facing, not dev notes):**
- "Identifying Vulnerabilities Before Attackers Do" — authentic tagline, keep
- "Authorized testing only — non-destructive — local-first" — trust signal, keep 1 time
- "No tracking • Static-only" — privacy ethos, keep in footer minimal
- Icons — keep, now adds personality without being dev note

---

## 8. Final Verdict

**Security:** ✅ Secure, 0 vulns, no tracking, privacy-first. Add `noopener` and CSP meta for hardening.

**Portfolio completeness:** ✅ Answers all 9 core questions. First-person voice fixed, icons added, images used responsively, light/dark works across 320-1600px.

**What to include:** 1 sentence "How I can help" in Connect — specific but not salesy.

**What to remove:** 6 extra watermarks, repeated "Trailer, Not Movie", live badge circle, duplicate roots — to make it feel like hosted portfolio, not dev playground.

**Contrast:** After cohesion fix, contrast is intentional and good — 2 breaks per theme, not off-beat.

**Next step:** Apply cleanup list, optimize og-image.png → og-image.webp 1200x630 <200KB, add `rel="noopener noreferrer"`, add CSP meta, push.
