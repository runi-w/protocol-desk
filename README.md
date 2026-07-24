# Protocol Desk — front end

Customer-service protocol desk for Gage Court Clothiers.
Live at **https://protocol.gcclothiers.net** (GitHub Pages, served from `index.html` in the repo root).

## Files
- **`App.jsx`** — the entire single-file React app (the source of truth; edit this).
- **`index.html`** — the compiled, self-contained build (all JS/CSS inlined). **This is what Pages serves.**
- **`build/`** — the Vite harness that turns `App.jsx` into `index.html`.
- `CNAME` / `.nojekyll` — Pages config: custom domain, and disabling Jekyll (which breaks the inlined `{{`/`{%` in the JS).

## Build & deploy
```bash
cd build
npm install
cp ../App.jsx src/App.jsx
npm run build                 # -> build/dist/index.html
cp dist/index.html ../index.html
cd .. && git add App.jsx index.html && git commit -m "update" && git push
```
GitHub Pages redeploys automatically on push to `main` (usually within a minute or two).

## Backend
The AI features call a separate **private** service (`protocol-desk-ai`, hosted on Railway).
Its URL lives in `AI_BACKEND_URL` near the top of `App.jsx`. The Anthropic + Resend keys live only on that backend.
