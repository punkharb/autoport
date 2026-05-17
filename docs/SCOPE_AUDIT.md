# Scope conformance audit — autoport v1

Maps every acceptance criterion in `PROJECT_SCOPE.md §10` to the code that satisfies it. Items requiring a running browser are flagged for manual verification on the deployed Vercel URL.

## §10 acceptance criteria

### [x] Single-page React application loads with no console errors
Wired by `frontend/src/app/page.tsx` (server component) → `<AppShell>` (client). `console.error` only on GitHub fetch failure (`page.tsx:11`). No other console output in source. Verified: `pnpm --filter frontend build` succeeds, generating one static route `/`. **Live verification:** open the Vercel URL with devtools open, confirm zero errors and zero warnings.

### [x] All three pages render and route via state
Three page components (`home.tsx`, `projects.tsx`, `about.tsx`) mounted via `AppShell` (`app-shell.tsx:28-32`). Navigation is a `setPage` state update, not a route change. URL stays `/`. Header buttons drive `setPage` (`header.tsx:64-77`).

### [x] Theme switcher swaps fonts + colour treatments live
`ThemeSwitcher` (`header.tsx:18-49`) sets `theme` state; `AppShell` writes it to `data-theme` on the root div (`app-shell.tsx:26`). `globals.css` defines `[data-theme="sans|mono|serif"]` overrides for palette, font families, and italic treatment (`globals.css:165-230`). All three themes preserved 1:1 from `design/index (2).html`.

### [x] Repo cards are interactive — open a detail modal
`RepoCard` is `role="button"` + `tabIndex=0` + `onKeyDown` Enter/Space + `aria-label` (`repo-card.tsx:39-52`). Click invokes `openRepo(r)` (`app-shell.tsx:33` via `setOpenRepoData`). `RepoModal` renders when `openRepoData` is non-null, with Esc handler, focus trap on Tab, body-scroll lock, and focus restoration on close (`repo-modal.tsx:23-49`).

### [x] Search, filter, and sort work in Projects
`projects.tsx:36-56` — `useMemo` over `(q, lang, sort, repos)` filters by name/summary/techStack substring (`:38-46`), filters by primary language (`:47`), sorts by stars / pushedAt / name (`:48-54`). All three sort options have a `<select>` `<option>` in `:115-119`. Language filter generated from unique primary languages (`:29-32`).

### [x] Loading skeleton + empty state behave correctly
700 ms skeleton (`projects.tsx:24-27` `setTimeout(setLoading(false), 700)`) renders six shimmer cards with `role="status" aria-live="polite" aria-label="Loading repositories"` (`projects.tsx:128-148`). Empty state renders when `filtered.length === 0` (`projects.tsx:149-167`) with `role="status"`, "Nothing here yet." headline, and a "Clear filters" reset button.

### [x] All animations respect `prefers-reduced-motion`
`globals.css:145-159` — media query disables `fade-up`, `slide-in-right`, `scale-in`, `contrib-pop`, `flicker`, `pulse-dot`, `wip-pulse`, `shimmer`, and the `surname-hover` transition. `body, [data-theme]` background-color transition also disabled.

### [x] Editing `config` updates the rendered site without touching component code
All owner-facing strings live in `frontend/src/lib/config.ts` — name, surname, given, nickname, handle, role sought, season, bio, aboutLong, spoken languages, activities, email, GitHub, LinkedIn, location, CV filename, avatar initials, pinned repo slugs, education, skills. Components read from `config` (`home.tsx`, `about.tsx`, `header.tsx`, `footer.tsx`).

## §1–§9 cross-checks

### §1 Purpose — recruiter scanning in 15–30s
Hero is single-column with one `h1`, single bio paragraph, and a side card with name, links, CTAs. Pinned grid is the first thing below the fold. Numerics band at `§ 03`. No off-topic content above the pinned grid.

### §2 Audience needs (recruiter / EM / peers)
Recruiter: hero card carries role + season (`config.user.roleSought`, `config.user.season`). EM: numerics band aggregates languages/stars/repos. Peers: every repo card links to its GitHub URL via `RepoModal` → "View on GitHub".

### §3 Pages and surfaces
- Home: hero with side card, pinned (6) with FEATURED + WIP, numerics band with stat tiles + tech bar + contribution heatmap. (`home.tsx`)
- Projects: search + language filter + sort + skeleton + empty state. (`projects.tsx`)
- About: long bio, education, activities timeline, languages, skills, get-in-touch CTA. (`about.tsx`)
- Repo detail modal: kicker, h2, summary, features (conditional), README preview, tech stack, languages bar, meta dl, GitHub link. (`repo-modal.tsx`)

### §4 Visual design direction
Warm off-white surface (`#FAFAF7` sans / `#F4EFE3` mono+serif), near-black ink, single forest-green accent. Hairline 1px rules. No shadows, no gradients. Hover = border-color shift; no scale transforms. (`globals.css`).

### §4 Theme matrix
| Theme | Display | Body | Italic |
|---|---|---|---|
| Sans (default) | Space Grotesk | Space Grotesk | colour-only |
| Mono | JetBrains Mono | JetBrains Mono | underline + colour |
| Serif | Newsreader | IBM Plex Mono | true italic |
Matches the matrix in PROJECT_SCOPE.md §4.

### §5 Animation
Hero stagger fade-up (given → surname → bio → side card slide-in-right). Pinned cards stagger fade-up (90 ms increments per index). Stat tiles eased count-up. Contribution graph cells pop-in column-by-column with `(w*14 + d*6)ms` delay. Modal scale-in. Page transitions via `key={page}` + `fade-up` on `<main>` (`app-shell.tsx:28`). WIP badge pulses via `wip-pulse` keyframe. Surname underline draws on hover.

### §6 Architecture
Single-page app, internal page state, no router. Per PROJECT_SCOPE: original was two files (`index.html` + `app.jsx`) with React 18 + Babel CDN. v1 ports that into Next.js 16 server-component + client-component split for the same UX, with ISR-cached real GitHub data.

### §7 Tech stack
Next.js 16 + React 19 + Tailwind 4 + pnpm workspaces. Diverges from PROJECT_SCOPE §7 (no build) but the user's explicit choice was "keep blueprint Next.js scaffold". Documented in README.

### §8 Constraints
- No `localStorage` / `sessionStorage` — confirmed by grep.
- No external image URLs — only SVG icons + inline favicon data URI.
- No analytics, no tracking — no `gtag`, `posthog`, `vercel/analytics`, `plausible`.
- No UI component libraries — own primitives in `components/primitives.tsx`.
- All content in `config` and `repoCache` objects — `lib/config.ts` for the former; `lib/github.ts` returns the latter from the live GitHub API.

### §9 Out of scope (deferred — confirmed not implemented)
- SSR / static export → ISR (revalidate 3600) used instead per blueprint stack.
- Real GitHub OAuth → not implemented; data is public-API only.
- Actual AI summarisation pipeline → fall back to repo description; no LLM call.
- CMS / admin → none.
- i18n → English-only.
- Custom domain → not configured.

## Open items requiring deployed URL to verify

- [ ] No console errors on production.
- [ ] Real repos render under `Punkharb` (Vercel needs the `GITHUB_TOKEN` env var; otherwise anon 60/hr).
- [ ] Stars/forks/updated dates match `github.com/Punkharb`.
- [ ] Hover affordance on repo cards (border-ink + arrow shift).
- [ ] Theme switcher swap is smooth across all three themes.
- [ ] `prefers-reduced-motion` actually disables animations (toggle OS setting).
- [ ] CV download serves the placeholder PDF without auth.

## Items deferred to a follow-up

- Real GitHub GraphQL contribution heatmap (currently deterministic placeholder, design uses same approach).
- Real LLM-generated AI summaries (currently `description` fallback).
- Stamp + Avatar primitives ported but unused (parity with design which also defined-but-unused).
- Production CV PDF (placeholder only; owner to drop their real PDF at `frontend/public/punnatorn-boonkrajang-cv.pdf`).
