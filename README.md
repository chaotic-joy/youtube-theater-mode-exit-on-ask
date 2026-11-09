# Auto-Summarize for YouTube

A small Chrome extension: if you're watching YouTube in theater mode and
click the "Ask" (Gemini) button, the player switches to default (non-theater)
view before the Ask panel opens, and "Summarize the video" is selected for
you automatically.

## How it works

`content.js` watches for clicks on YouTube's "Ask" button. If the page is in
theater mode, it cancels that click, clicks YouTube's own theater/default
toggle button, waits 0.1s, then clicks the Ask button itself so YouTube's
real Ask panel opens into the default (non-theater) layout. In either view,
once the panel's suggestion chips render, it clicks "Summarize the video" for
you.

## Install (unpacked, for development/personal use)

1. Open `chrome://extensions`.
2. Enable "Developer mode" (top right).
3. Click "Load unpacked" and select this folder.
4. Open any YouTube video, switch to theater mode, click "Ask" — it should
   switch to default view.

## Releasing

- Build the store zip: `zip -r extension.zip manifest.json content.js icons`
- After the first manual upload, releases are automatic: bump `version` in
  `manifest.json`, commit, then `git tag v1.0.1 && git push --tags`.
  `.github/workflows/publish.yml` uploads it and submits it for review.
- Store listing text and graphics: `store/`. Privacy policy: `PRIVACY.md`.

## Limitations

- Only matches `www.youtube.com` watch pages.
- Detects the "Ask" button by its `aria-label`, which YouTube localizes —
  only works on an English-language YouTube UI.
- Chrome/Chromium-based browsers only (Manifest V3).
