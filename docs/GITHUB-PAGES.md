# 🌐 Hosting the Shopping Center on GitHub Pages

> The website lives at the **repo root** (`index.html`, `styles.css`, `app.js`,
> `data.js`) on purpose — that's the simplest possible GitHub Pages setup. Here's how
> to put it online for free, plus how to preview it locally on Windows first.

---

## 0. Preview it locally first (Windows, 5 seconds)

The site is built to need **no server** — it loads its data from `data.js` via a normal
`<script>` tag, so there are no `file://` CORS problems.

- **Just double-click `index.html`** in File Explorer. It opens in your browser. Done.
- Prefer a real local server? From the repo folder in PowerShell:
  ```powershell
  python -m http.server 8000
  # then open http://localhost:8000
  ```

If it looks right locally, it'll look right on Pages.

---

## 1. Make sure the site files are on GitHub

They were committed and pushed to your working branch (`claude/relaxed-franklin-UCDM9`).
You have two ways to publish:

### Option A — Publish from `main` (recommended, cleanest)
1. Merge your branch into `main` (open a PR on GitHub, or locally):
   ```powershell
   git checkout main
   git merge claude/relaxed-franklin-UCDM9
   git push origin main
   ```
2. Continue to step 2 with **Branch = `main`**.

### Option B — Publish straight from the working branch (fastest)
Skip the merge and just point Pages at `claude/relaxed-franklin-UCDM9` in step 2.
(You can switch it to `main` later.)

---

## 2. Turn on GitHub Pages (one time, ~1 minute)

1. Go to your repo on GitHub: **`https://github.com/HIRAKHANJI/AI_CONTEXT`**
2. Click **Settings** (top-right of the repo).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Set **Branch** to `main` (Option A) or `claude/relaxed-franklin-UCDM9` (Option B),
   and **Folder** to **`/ (root)`**.
6. Click **Save**.

GitHub will build it (you'll see a "GitHub Pages" action run). After ~1 minute, the
Pages section shows a green **"Your site is live at…"** link.

---

## 3. Your live URL

```
https://hirakhanji.github.io/AI_CONTEXT/
```

> 📝 Note the casing: GitHub **lowercases the username** in the domain
> (`hirakhanji`), but **keeps the repo name's case** in the path (`/AI_CONTEXT/`).
> If you ever get a 404, that casing is the usual culprit — try the exact string above.

---

## 4. Updating the site later

The site is **data-driven**. To add/remove a tool, you (or Claude) edit **`data.js`**
only — the page rebuilds itself from that array. Then:

```powershell
git add data.js
git commit -m "catalog: add <tool>"
git push
```

GitHub Pages redeploys automatically within a minute. No build step, no framework, no
dependencies to update. That's the whole point — it'll still work in five years.

---

## 5. Troubleshooting

| Symptom | Fix |
|---------|-----|
| 404 at the URL | Check casing (`/AI_CONTEXT/`). Confirm Pages Source branch/folder is set. Wait 1–2 min after first enable. |
| Page loads but no tool cards | `data.js` failed to parse — check the browser console (F12). A trailing comma or stray quote in `data.js` is the usual cause. |
| Old version showing | Hard refresh: **Ctrl+F5**. Pages caches aggressively. |
| Styles missing | Confirm `styles.css` is at the repo root next to `index.html` and was pushed. |

---

## 6. (Optional) Custom domain

If you ever want `tools.yourdomain.com`:
1. Settings → Pages → **Custom domain** → enter it → Save (creates a `CNAME` file).
2. At your DNS provider, add a `CNAME` record pointing the subdomain to
   `hirakhanji.github.io`.
3. Tick **Enforce HTTPS** once the certificate provisions.

Not needed to get started — the `github.io` URL is free and permanent.
