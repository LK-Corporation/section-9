# SECTION 9

> CYBER-BRAIN DIVISION // PUBLIC SECURITY // TACTICAL ESPIONAGE OPERATION

A cyberpunk operator HUD as a single-page web artifact, plus 7 thematic sub-pages.
Vanilla web, no framework, no backend. Tribute to Ghost in the Shell, The Matrix,
Metal Gear Solid, Neon Genesis Evangelion, and Serial Experiments Lain.

**Live**: <https://lk-corporation.github.io/section-9/>

```
   ____  _____ ____ _____ ___ ___  _   _   ___
  / ___|| ____/ ___|_   _|_ _/ _ \| \ | | / _ \
  \___ \|  _|| |     | |  | | | | |  \| || (_) |
   ___) | |__| |___  | |  | | |_| | |\  | \__, |
  |____/|_____\____| |_| |___\___/|_| \_|   /_/
```

---

## what is it

A landing page that pretends to be the operator console of a fictional cyber-brain
division. The main HUD locks the viewport at full-screen and lays out the room as
left telemetry / center cards & ops log / right command-input + topology + codec
+ MAGI + A.T. field + mother base.

Sub-pages each take a single franchise or concept and expand it into a tribute
dossier (tachikomas, eva angels, foxhound, instrumentality, puppet master, lain,
about).

It is decorative. It does not call any backend. It does not know who you are.

---

## features

- **Multi-phase boot** (~7s): Matrix wake-up → NERV glitch → auth checks → SECTION 9 dot-matrix stamp built cell-by-cell. Skip on subsequent visits in the same session.
- **~70 easter eggs** typeable in the command input (`?` shows the full list). Wrong commands trigger a YOU DIED Dark Souls homage.
- **3D WebGL dive** (Three.js, lazy-loaded) — type `dive`, `matrix`, or `jackin`.
- **Web Audio ambient drone** + beep feedback on every interaction. Toggle bottom-left.
- **Pixel-art confetti background** — 90 colored blocks drifting, twinkling, glowing.
- **Custom SVG cursor**: crosshair on idle, target-acquired brackets on clickables.
- **Orders board** — editable mission slots (status / priority cycles, localStorage persist, max 8).
- **Codec calls** — click any frequency to open a character dossier.
- **MAGI vote** / **A.T. field** / **Mother Base aggregate** — clickable telemetry panels with their own micro-interactions.
- **Konami code** → SAC mode.
- **PWA-lite**: installable, manifest inline, service worker network-first.
- **Mobile-aware**: vertical stack ≤900px, 3D dive disabled, touch-friendly hit targets, custom cursor disabled.

---

## structure

```
section-9/
├── index.html           HUD + boot sequence
├── styles.css           ~3700 lines
├── script.js            ~3000 lines
├── sw.js                service worker (network-first)
└── pages/
    ├── page.css         shared sub-page styles
    ├── page.js          modal expand on card click
    ├── tachikomas.html  real MCP think-tanks of this operator's setup
    ├── codex.html       17 Eva angels with stats
    ├── foxhound.html    FOXHOUND emblem · Shadow Moses ops · CQC · timeline
    ├── instrumentality.html  Human Instrumentality Project · 12 SEELE monoliths
    ├── puppetmaster.html  Project 2501 · 1995 incident · doctrinal echoes
    ├── lain.html        Serial Experiments Lain · the wired · 13 layers
    └── about.html       credits · tech stack · PWA notes
```

---

## stack

- HTML / CSS / JS vanilla. No build step.
- [Three.js](https://threejs.org/) loaded lazily from CDN for the 3D dive.
- Web Audio API for ambient drone (60Hz + 90.5Hz overlay) and click beeps.
- Service Worker (`sw.js`) — network-first so deploys are visible immediately, with cache fallback for offline.
- Persistence: `localStorage` (visit count, orders board) and `sessionStorage` (boot already played, audio hint shown).

---

## run locally

```bash
git clone https://github.com/LK-Corporation/section-9.git
cd section-9
# any static server works
python -m http.server 8080
# open http://localhost:8080
```

To bust the service-worker cache after a deploy, hard-reload (`Ctrl+Shift+R` /
`Cmd+Shift+R`) once.

---

## try these commands

After the boot finishes, focus the command input on the right and type:

```
ramiel       eva angel · octahedron
dive         3D WebGL deep dive
snake        SNAAAAAKE!!! alert
rabbit       follow the white rabbit
lain         enter the wired
replay       rewatch the boot stamp
?            show all 70+ commands
```

Wrong command? You die.

---

## credits

Fan-work. Not affiliated with any rightsholder. All trademarks belong to their
respective owners.

- Ghost in the Shell — Shirow Masamune / Mamoru Oshii / Kenji Kamiyama
- The Matrix — Wachowskis
- Metal Gear Solid — Hideo Kojima
- Neon Genesis Evangelion — Hideaki Anno / Khara
- Serial Experiments Lain — Yoshitoshi ABe / Chiaki J. Konaka

Design inspirations sampled during iteration: [y-n10.com](https://y-n10.com/)
(pixel-art particle drift, dot-matrix logo aesthetics).

Built and maintained by [@LK-Corporation](https://github.com/LK-Corporation).

---

```
the net is vast and infinite
```
