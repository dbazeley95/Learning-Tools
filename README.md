# XCET Learning Tools

A touch-first collection of classroom teaching tools — built for iPad, and usable on any touchscreen device. Tap a tile on the home screen to open a full-screen tool.

## Tools

- **Whiteboard** — freehand drawing with color picker, eraser, and clear.
- **Traffic Lights** — red / yellow / green status indicator.
- **Countdown** — a timer with presets, custom duration, and an alert at zero.
- **True or False** — big tap zones for quick student responses.
- **ABCD** — a 2×2 grid for multiple-choice voting/reveal.
- **Fraction Wall** — tappable bars for teaching fraction concepts.
- **Smiley** — tap-to-tally happy / neutral / sad faces for feedback polling.
- **Thermometer** — a drag- or button-adjustable level gauge.
- **Stopwatch** — elapsed time with lap tracking.

## Tech stack

Plain HTML, CSS, and JavaScript (ES modules). No framework, no dependencies, no build step.

## Running locally

Browsers block ES module imports over `file://`, so serve the folder over HTTP:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

This site is deployed via GitHub Pages, serving directly from the `main` branch root (`index.html` lives at the repo root — no build/publish step).

One-time setup (manual, in the repo's GitHub settings): **Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder `/ (root)`**.

All internal paths (`js/`, `css/`, `icons/`, `manifest.json`) are relative, since this repo is served from a subpath (`https://<user>.github.io/<repo>/`), not domain root.

## Project structure

```
index.html        App shell: home grid + tool view containers
manifest.json      Add to Home Screen (standalone display) config
css/
  tokens.css        Design tokens (colors, spacing, typography)
  base.css          Touch-tuned reset (viewport, safe-area, no hover reliance)
  layout.css        Home grid + top bar chrome
  tools/*.css        Per-tool styles
js/
  app.js             Entry point
  router.js          Hash-based router (#/  and  #/tool/:id)
  registry.js         Tool registry — the source of truth for the home grid
  icons.js            Inline SVG icons
  chrome.js            Top bar title handling
  home.js              Renders home tiles from the registry
  utils/format.js       Shared time-formatting helpers
  tools/*.js            One module per tool (mount/unmount)
icons/              App icons (source SVG + generated PNGs)
```

## Adding a new tool

1. Create `js/tools/<id>.js` exporting `mount(container)` and `unmount(container)`.
2. Add `css/tools/<id>.css` if it needs its own styling, and link it in `index.html`.
3. Add an icon entry to `js/icons.js`.
4. Add one entry to the `TOOLS` array in `js/registry.js` (id, name, color, icon, mount).

The home grid and router pick up the new tool automatically — no other code changes needed.

## Browser support

Built for modern iPadOS Safari and Chromium-based touch browsers. Relies on Pointer Events, ES modules, `env(safe-area-inset-*)`, and `dvh` units.
