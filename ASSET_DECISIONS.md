# Asset Decisions — Amit Pal Portfolio — Aug 2026

Portfolio is code-generated visuals (canvas + SVG) — no external images required for launch. This keeps premium feel, small bundle, no tracking, static-only, trailer-not-movie.

---

## NEEDED NOW — No external assets required for launch

Current implementation uses:
- HeroVisual canvas nodes (16 mobile / 28 desktop) + SVG watermark
- VaptCinematic canvas dots (70 mobile / 180 desktop) + grid pattern
- CyberBuddyCinematic SVG grid + floating browser windows (CSS + motion)
- ApproachMinimal SVG pattern
- ProfessionalFocusMinimal SVG pattern + pathLength scroll
- TransitionMinimal SVG RESEARCH→... watermark + pathLength
- WritingCinematic SVG lines + watermark CORS•JWT•CSP•HEADERS
- MilestoneMinimal watermark GROWTH + quote mark
- Connect SVG radial + grid + AP monogram SVG

**Result**: No image files needed. Bundle: JS 417KB gzip 122KB, CSS 15KB gzip 4KB.

**Action**: Ship as is. No assets to add.

---

## OPTIONAL — Only if you want to enhance later, with exact specs

### 1. CyberBuddy UI Preview (Real Screenshot)

- **Purpose**: Secondary hover preview in CyberBuddy section, not primary visual
- **Decision**: OPTIONAL — current cinematic visual already communicates one roof many checks
- **Filename**: `cyberbuddy-ui-preview.jpg` (and `cyberbuddy-ui-preview.webp` for modern)
- **Folder**: `public/assets/projects/`
- **Dimensions**: 1200x750 px (16:10 ratio) — captures full browser window with tools
- **Type**: JPG quality 80 + WebP quality 75
- **Cropping**: Center crop, include browser chrome (traffic lights), hide any sensitive URLs (use example.com or localhost)
- **Optimization**: <200KB JPG, <150KB WebP, use Squoosh
- **Where in code**: `CyberBuddyCinematic` component secondary info box (right side) — currently text tags, can add `<img>` below tags
- **Replacement instructions**: 
  1. Create folder `public/assets/projects/` if not exists
  2. Drop files there
  3. In App.jsx CyberBuddy section secondary box, add: `<img src="/assets/projects/cyberbuddy-ui-preview.webp" alt="CyberBuddy UI" style={{width:'100%', marginTop:'16px', border:'1px solid rgba(138,92,255,0.15)'}} />`
  4. Keep existing canvas visual as background, image as secondary
  5. `npm run build` to verify size increase <200KB

### 2. VAPT Checklist Taxonomy Preview (Real Screenshot)

- **Purpose**: Show taxonomy/structure, not statistics dump
- **Decision**: OPTIONAL — current chaos→structure canvas already communicates intent
- **Filename**: `vapt-taxonomy-preview.jpg` + `.webp`
- **Folder**: `public/assets/projects/`
- **Dimensions**: 1200x750 px (16:10)
- **Type**: JPG + WebP
- **Cropping**: Focus on category list or guided families view, blur any client-specific data if present, show 479 families count is okay (public)
- **Optimization**: <200KB JPG, <150KB WebP
- **Where**: VAPT section secondary info box (right side)
- **Replacement**: Same as CyberBuddy — add img below tags in VaptCinematic secondary box

### 3. Certificate Thumbnails — Redacted Minimal

- **Purpose**: Secondary proof in Now section, not certificate wall
- **Decision**: OPTIONAL — currently tags are enough, avoids large wall
- **Filenames**: 
  - `cert-apisec-pentest-2026.jpg`
  - `cert-apisec-fundamentals-2025.jpg`
- **Folder**: `public/assets/certs/`
- **Dimensions**: 800x600 px (4:3) — cropped to show title + date + name, hide cert ID if sensitive
- **Type**: JPG quality 75
- **Cropping**: Center on certificate title area, redact/hide any private IDs with blur box, keep Amit Pal name visible
- **Optimization**: <150KB each
- **Where**: Now section secondary tags — tags could become clickable that open modal with image
- **Replacement**:
  1. Create `public/assets/certs/`
  2. Drop files
  3. In Now section, wrap tag spans with `<a href="/assets/certs/cert-apisec-pentest-2026.jpg" target="_blank">` or implement lightbox
  4. Keep tags as primary, images as secondary on click

### 4. Profile Photo — Minimal (If You Want)

- **Purpose**: Personal touch, but trailer-not-movie can stay without photo (current)
- **Decision**: OPTIONAL — not needed for launch, keeps focus on work not face
- **Filename**: `amit-pal-profile-2026.jpg` + `.webp`
- **Folder**: `public/assets/profile/`
- **Dimensions**: 800x800 px (1:1 square) — headshot
- **Type**: JPG + WebP, black-white or desaturated, low contrast
- **Cropping**: Face center, 10% padding around, no busy background (solid #0A0A0F or blurred)
- **Optimization**: <100KB JPG, <80KB WebP
- **Where**: Hero left near AP monogram or Connect section near monogram — as small watermark 36x36 or 48x48, not large hero image
- **Replacement**:
  1. Create `public/assets/profile/`
  2. Drop files
  3. In Hero left, replace 36x36 AP SVG with `<img src="/assets/profile/amit-pal-profile-2026.webp" style={{width:'36px', height:'36px', borderRadius:'50%', border:'1px solid rgba(110,255,229,0.2)', objectFit:'cover'}} />` or keep both side by side
  4. Ensure alt text "Amit Pal"

### 5. AP Monogram — Already SVG, No Asset Needed

- Current SVG in Connect section is code, unique to Amit Pal
- No external file needed
- If you want high-res version for social: export SVG to PNG 512x512

---

## TEMPORARY — Use only if you have safe redacted version

### Client Appreciation — Redacted Screenshot

- **Purpose**: Replace anonymized editorial quote with designed image treatment if you have safe version
- **Decision**: TEMPORARY — only if you can redact confidential info without losing authenticity
- **Filename**: `appreciation-redacted-2026.png` (PNG to preserve text clarity) + `.webp` fallback
- **Folder**: `public/assets/feedback/`
- **Dimensions**: 1200x800 px (3:2) — enough to read feedback but not full email thread
- **Type**: PNG (text sharp) + WebP
- **Cropping**: 
  - Crop to feedback paragraph only, exclude email headers, client names, emails, system names
  - Blur/redact with solid black boxes any remaining PII (use image editor, not just blur — blur can be reversed)
  - Add border 1px solid rgba(255,214,10,0.25) to match existing tag style
  - Add small label overlay "ANONYMIZED — CONFIDENTIALITY PROTECTED" at bottom
- **Optimization**: PNG <300KB, WebP <200KB, compress text areas carefully
- **Where**: MilestoneMinimal Impact section — currently editorial quote, can add image below quote as secondary proof
- **Replacement**:
  1. Create `public/assets/feedback/`
  2. Drop redacted files
  3. In MilestoneMinimal second grid (Impact), below quote div, add:
     ```jsx
     <img src="/assets/feedback/appreciation-redacted-2026.webp" alt="Client feedback redacted" style={{marginTop:'24px', width:'100%', maxWidth:'640px', border:'1px solid rgba(255,214,10,0.15)', background:'rgba(0,0,0,0.4)'}} />
     ```
  4. Keep editorial quote as primary, image as secondary
  5. If you cannot safely redact, SKIP and keep current designed interpretation (recommended)

**Important**: Do NOT force ugly screenshots into premium portfolio. If redaction makes it look messy, keep designed interpretation — it is more premium.

---

## NOT NEEDED — Do not add, would hurt curation

- Large certificate wall images (e.g., 10+ certs grid) — would become résumé, not trailer. Keep secondary tags.
- Award ceremony photos with identical cards — generic, not curated. Timeline is better.
- Generic testimonial section background images (e.g., stock office photos) — cliché, not premium.
- Project statistics infographics (e.g., 12+ clients, 30 apps, 10 APIs, 623 checks) — belongs on project sites, not portfolio. Qualitative box is better.
- Skills cloud icons (e.g., 20+ tool logos) — user explicitly said no skills cloud. Keep minimal tags where contextually useful.
- Education degree scans (BCA certificate) — secondary footer enough, no scan needed.
- Mobile PT visuals (e.g., phone mockups with vulnerabilities) — learning next, not claiming already. Don't invent visuals.
- Matrix rain, hooded hackers, padlocks, skulls, neon code, glassmorphism backgrounds — explicitly banned, keep custom canvas/SVG.
- Profile photo large hero (e.g., full-screen face) — would shift weight from work to face, not trailer-not-movie.
- Writing article thumbnails (Medium covers) — full content lives on Medium, portfolio is curiosity then depth, not thumbnail grid.

---

## Folder Structure for Easy Replacement

```
public/
  assets/
    projects/
      cyberbuddy-ui-preview.jpg
      cyberbuddy-ui-preview.webp
      vapt-taxonomy-preview.jpg
      vapt-taxonomy-preview.webp
    certs/
      cert-apisec-pentest-2026.jpg
      cert-apisec-fundamentals-2025.jpg
    profile/
      amit-pal-profile-2026.jpg
      amit-pal-profile-2026.webp
    feedback/
      appreciation-redacted-2026.png
      appreciation-redacted-2026.webp
```

- Create folders as needed, no need to commit empty folders
- All paths referenced as `/assets/...` (Vite serves public as root)
- No import statements needed for public assets — keeps HMR fast
- Optimize before committing: use https://squoosh.app/ or similar, target <200KB per image
- For WebP fallback, use `<picture>` or just WebP with JPG fallback via CSS
- Keep original high-res in local backup, commit only optimized versions

---

## How to Replace — Step by Step

1. **Prepare image** per dimensions/type/cropping above
2. **Optimize** via Squoosh to target size
3. **Place** in correct folder under `public/assets/...`
4. **Edit App.jsx** where noted — add `<img src="/assets/..." />` or wrap existing tag
5. **Test mobile**: run `npm run dev`, check 768px and 480px, ensure no horizontal scroll, image scales to 100% width
6. **Build**: `npm run build` — check size increase, should be <500KB total increase for all optional assets
7. **Commit**: `git add public/assets/... src/App.jsx` + commit message

---

## Current State — No Assets Needed

- All visuals are code-generated, no external images
- Bundle size: JS 417KB gzip 122KB, CSS 15KB gzip 4KB (Aug 2026 build)
- Premium, bold, experimental, polished — trailer not movie maintained
- Easy to add optional assets later without redesign

---

## Links

- Portfolio Repo: https://github.com/AmitPal-CyberBuddy/Portfolio
- CyberBuddy Live: https://amitpal-cyberbuddy.github.io/CyberBuddy/
- VAPT Checklist Live Dev: https://amitpal-cyberbuddy.github.io/VAPT-Checklist/
