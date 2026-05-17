# Project Scope

**Project:** Personal Portfolio — Punnatorn Boonkrajang
**Type:** Single-page web portfolio (React, client-rendered)
**Status:** v1 — shipped

---

## 1. Purpose

A personal portfolio site for a second-year Computer Science student at KMUTT, intended to support internship applications and serve as a public profile alongside GitHub. The site auto-summarizes repositories with AI-generated descriptions and presents the developer's work to recruiters and engineering managers in 15–30 seconds of scanning.

---

## 2. Audience

| Audience | Need |
|---|---|
| Tech recruiters | Immediately understand who the candidate is, what role they want, and what they have built |
| Engineering managers | Quickly assess technical depth, recent activity, and the quality of small projects |
| Peers / future collaborators | Browse repositories, read AI summaries, find contact information |

---

## 3. Pages & Surfaces

The site routes via React state (no router library) and exposes three pages plus a modal:

### 3.1 Home (`/`)
- Hero with the candidate's name, short bio, and a side card containing GitHub / LinkedIn / Email and CTAs (Download CV, Email)
- **Pinned (6)** — a featured grid of selected repositories. The first card is enlarged and tagged `★ FEATURED`. Recent repos (≤30 days) show a pulsing `WIP` badge.
- **Numerics band** — three counted-up stat tiles (Repositories / Stars Earned / Languages) and two visualisations:
  - Aggregated tech-stack bar across all repos
  - 53-week GitHub-style contribution heatmap

### 3.2 Projects (`/projects`)
- Full catalogue of all repositories
- Real-time **search** (name, summary, tech)
- **Filter** by primary language
- **Sort** by stars / recently updated / name
- 700 ms skeleton loading state on mount
- Deliberate empty state when filters return nothing

### 3.3 About (`/about`)
- Extended bio
- **Education** — KMUTT entry with degree, years, and detail
- **Activities** — timeline of competitions, hackathons, OSS work, and society involvement
- **Languages spoken** — Thai / English / Japanese with proficiency
- **Skills** — categorised by Languages, Mobile, Frontend, Backend, ML / Data, Tooling
- **Get in touch** — email, GitHub, CV download CTAs

### 3.4 Repo Detail Modal
- Triggered by clicking any repo card
- Sections: AI summary, feature list, full tech stack, language breakdown bar + percentages, meta (stars / forks / updated), README preview, link to GitHub
- Closes on backdrop click, X button, or `Esc`. Locks body scroll while open.

---

## 4. Visual & Design Direction

**Aesthetic:** editorial-archival hybrid on warm off-white paper. Typography carries the heavy lifting; colour is used as punctuation, not wallpaper.

- **Surface:** warm off-white (#FAFAF7 → #F4EFE3 across themes), no shadows, no gradients
- **Ink:** near-black neutral #1A1815 with three subdued tone levels
- **Accent:** single forest green #1E4D2B used only on italics, the live sync dot, micro-rules and CTAs
- **Hover:** subtle border-colour shift to ink; no scale transforms
- **Layout:** hairline 1px borders, generous spacing, sectioned with `§` numbering

### Theme switcher
Three themes can be selected live in the header:

| Theme | Display | Body | Italic treatment |
|---|---|---|---|
| **Sans** *(default)* | Space Grotesk | Space Grotesk | colour-only |
| **Mono** | JetBrains Mono | JetBrains Mono | underline + colour |
| **Serif** | Newsreader | IBM Plex Mono | true italic |

Each theme adjusts surface tones, fonts, and italic semantics so the design feels intentional in each mode rather than a colour swap.

---

## 5. Animation

Motion is restrained and purposeful. All animations honour `prefers-reduced-motion`.

- Hero stagger fade-up (given name → surname → bio → side card slides in)
- Pinned cards stagger fade-up
- Stat tiles eased count-up from 0
- Contribution graph cells pop-in column by column
- Modal scale-in
- Page transitions fade between Home / Projects / About
- WIP badge pulses
- Surname underline draws on hover

---

## 6. Architecture

The codebase is intentionally simple — two files, no build step, no SDK:

```
index.html         <- loads React 18 + Tailwind CDN + Babel + fonts
app.jsx            <- all components, config, and repoCache
```

**Data is config-driven** so content can change without touching components:

```js
const config = {
  user: { name, nickname, bio, links, education, skills,
          activities, spokenLanguages },
  pinnedRepos: ['repo-slug-1', ...],   // string array of slugs
};

const repoCache = [
  { name, description, aiSummary, techStack, features,
    languages: { Dart: 88, Swift: 7, ... },
    primary, stars, forks, pushedAt },
  ...
];
```

`repoCache` simulates what an AI-summarisation pipeline would output — in production this would be regenerated nightly by a cron job that reads each repo's README and pushes the result to a cached JSON file.

---

## 7. Tech Stack

| Layer | Choice |
|---|---|
| Markup / Styling | HTML, **Tailwind CSS** (CDN, core utilities only) |
| Components | **React 18** with **Babel Standalone** |
| Fonts | Google Fonts (Newsreader, Space Grotesk, IBM Plex Mono, JetBrains Mono) |
| Icons | **Inline SVG** components |
| State | `React.useState` only — no router, no global store |
| Build | None — single HTML file references one JSX file |
| Hosting | Static (any host: Vercel, Netlify, GitHub Pages, S3) |

---

## 8. Constraints

- No `localStorage` / `sessionStorage`
- No external image URLs
- No analytics, no tracking
- No UI component libraries (no shadcn, no MUI, no Radix)
- All content in `config` and `repoCache` objects — never inlined in components

---

## 9. Out of Scope (v1)

- Server-side rendering / static export
- Real GitHub OAuth + live data fetching (mock data only)
- Actual AI summarisation pipeline (cache is hand-authored)
- CMS / admin interface
- i18n (English-only UI; Thai content reserved for the user's own copy)
- Mobile-first refinements beyond responsive grid (focused on desktop scan)
- Custom domain configuration

---

## 10. Acceptance Criteria

- [x] Single-page React application loads with no console errors
- [x] All three pages render and route via state
- [x] Theme switcher swaps fonts + colour treatments live
- [x] Repo cards are interactive — open a detail modal
- [x] Search, filter, and sort work in Projects
- [x] Loading skeleton + empty state behave correctly
- [x] All animations respect `prefers-reduced-motion`
- [x] Editing `config` updates the rendered site without touching component code
