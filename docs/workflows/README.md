# Deploying to GitHub Pages

The site is a **built** Vite app. GitHub Pages must serve `dist/`, not the repo root.
Two independent things have to be true for https://amitpal-cyberbuddy.github.io/Portfolio/
to work. Doing only one of them leaves the site broken.

---

## Step 1 — Put the workflow where Actions can find it

The Arena GitHub App cannot create `.github/workflows/**`. Verified on
`arena/01a041b8-portfolio`:

```
! [remote rejected] (refusing to allow a GitHub App to create or update workflow
  `.github/workflows/deploy.yml` without `workflows` permission)
```

The Contents API is refused the same way (`403 Resource not accessible by integration`).
So this one file has to be added by a maintainer. From a clone of `main`:

```bash
mkdir -p .github/workflows
cp docs/workflows/deploy.yml .github/workflows/deploy.yml
git add .github/workflows/deploy.yml
git commit -m "ci: enable GitHub Pages deploy workflow"
git push origin main
```

The file is also available un-encoded from the API, if you would rather not clone:

```bash
gh api repos/AmitPal-CyberBuddy/Portfolio/contents/docs/workflows/deploy.yml \
  --jq '.content' | base64 -d > .github/workflows/deploy.yml
```

---

## Step 2 — Switch the Pages source to GitHub Actions

**This step is easy to miss and the workflow will fail without it.**

Pages is currently configured as a *legacy branch* deployment:

```json
{ "build_type": "legacy", "source": { "branch": "main", "path": "/" } }
```

`actions/deploy-pages@v4` only works when Pages is configured to build **from Actions**.
Against a branch source the deploy step fails with:

> Get Pages site failed. Please verify that the repository has Pages enabled and
> configured to build using GitHub Actions.

Fix it once in the UI — **Settings → Pages → Build and deployment → Source →
GitHub Actions → Save**. Or by API:

```bash
gh api -X PUT repos/AmitPal-CyberBuddy/Portfolio/pages -f build_type=workflow
```

Both need admin. After this, the built-in `pages-build-deployment` workflow stops
running and `Deploy Portfolio to GitHub Pages` takes over.

> `actions/configure-pages@v5` has an `enablement: true` input that would do this
> automatically, but per its `action.yml` it "requires a token other than
> `GITHUB_TOKEN`". The workflow deliberately does not use it — it would 403.

---

## Step 3 — Confirm

Push to `main` (or **Actions → Deploy Portfolio to GitHub Pages → Run workflow**)
and check the run goes green, then hard-refresh the site.

Expected artifact, reproduced locally with `npm ci && npm run build &&
cp dist/index.html dist/404.html`:

| File | Size |
| --- | --- |
| `index.html` | 5.42 kB |
| `assets/index-*.css` | 23.95 kB (gzip 5.31 kB) |
| `assets/index-*.js` | 421.72 kB (gzip 124.41 kB) |
| `404.html` | copy of `index.html`, for SPA routing |
| images, `favicon.svg`, `og-image.*`, `robots.txt`, `sitemap.xml` | ~1.8 MB total |

`vite.config.js` sets `base: '/Portfolio/'`, so every emitted asset reference is
prefixed (`/Portfolio/assets/index-*.js`). If the site loads a blank page with the
console showing 404s on `/assets/...`, `base` has drifted from the Pages subpath.

---

## Why the live site is currently broken

Until both steps above land, Pages serves the **repo root** — including the
unbuilt `index.html`, whose only script tag is:

```html
<script type="module" src="/src/main.jsx"></script>
```

Browsers cannot execute raw JSX or resolve the bare `react` import, so React never
mounts and `#root` stays empty. The page renders its `<title>` and the
"Skip to main content" link and nothing else — which is exactly what the live URL
does today. This is not a caching problem; a rebuild of the same source will keep
doing it.
