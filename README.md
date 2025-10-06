# DedNoob Dorker

DedNoob Dorker is a browser-based Google dork launcher tailored for bug bounty hunters and security researchers. It centralises common Blind XSS discovery queries, file exposure searches, and URL pattern lookups in a single, polished UI—complete with light/dark mode and cursor-responsive visuals.

## Features
- **Blind XSS Dorker:** Tap-ready cards that launch domain-scoped searches for contact forms, feedback portals, support pages, and other likely XSS capture points.
- **Files Dorker:** Multi-select file-type hunting (PDF, Excel, DOCX, CSV, logs, `.env`, etc.) with optional `after:` / `before:` date restriction sliders for time-boxed reconnaissance.
- **URL Matcher:** Operator-aware builder that accepts custom keywords for `allintext`, `intext`, `inurl`, `allinurl`, `intitle`, `allintitle`, and `link`, plus curated helpers and a quick-reference cheat sheet.
- **Dynamic theme + motion:** Cursor-highlighted background, glassmorphism cards, and a one-click theme toggle keep visibility high in both light and dark environments.

## Usage
1. **Open the tool:** Double-click `index.html` (or serve it locally) and load it in your browser of choice.
2. **Set a target:** Enter the domain you’d like to investigate (e.g., `example.com`) in the domain input at the top.
3. **Pick a workflow:**
   - *Blind XSS Dorker:* Click any card to open the associated Google search in a new tab.
   - *Files Dorker:* Check one or more file types, optionally provide `after` / `before` dates, and press **Search Selected Files**.
   - *URL Matcher:* Fill in any operator fields you need (leave blank to skip), add a custom `inurl` keyword if desired, then hit **Build URL Dork**.
4. **Review results:** Each action opens a new Google tab populated with the constructed dork query so you can iterate quickly.

## Customisation
- To tweak colours, shadows, or typography, edit the CSS variables and classes inline within `index.html`.
- To expand the dork catalogue, append to the `dorks`, `fileDorks`, or operator sections in the script near the bottom of `index.html`.

## Requirements
- A modern browser (Chrome, Firefox, Edge, or Safari). No build step or server runtime is required.

## Credits
Inspired by the work of CoffinXP - Lostsec. Watch more on [Lostsec YouTube](https://www.youtube.com/@lostsecc) or visit [lostsec.xyz](https://lostsec.xyz/coffin/dorking.html).
