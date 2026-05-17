# RepoFolio

> AI-summarized GitHub portfolio. Codename: `autoport`.

[![ci](https://github.com/punkharb/autoport/actions/workflows/ci.yml/badge.svg)](https://github.com/punkharb/autoport/actions/workflows/ci.yml)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Personal portfolio for **Punnatorn Boonkrajang** (handle `Punkharb`). Pulls every public repo from GitHub, summarizes each with Gemini, and presents the whole thing on a single page with three editorial themes. Real data, no hand-authored repo cards.

**Stack:** Next.js 16 (App Router, TS) · Tailwind 4 · pnpm workspaces. No backend, no auth — repo data is fetched server-side from `api.github.com` with 1-hour ISR.

Originally scaffolded from the [vibestack](https://github.com/punkharb/vibestack) blueprint and adapted via `/adapt`; the Claude Code toolkit shipped in `.claude/` is vendored from [`affaan-m/everything-claude-code`](https://github.com/affaan-m/everything-claude-code) (MIT — see [`NOTICE.md`](./NOTICE.md)).

## Layout

```
.
├── frontend/        Next.js 16 app (port 3000) — the portfolio itself
├── design/          1:1 design reference (single-file React + Babel CDN)
├── PROJECT_SCOPE.md full v1 spec
├── projectscope.md  /adapt front matter
└── .claude/         agent + skill toolkit, pruned to portfolio domain
```

## Prerequisites

- Node `>= 20`
- pnpm `>= 9`

## Setup

```bash
git clone https://github.com/punkharb/autoport.git
cd autoport
pnpm install
cp frontend/.env.local.example frontend/.env.local
# (optional) put a GITHUB_TOKEN in frontend/.env.local for 5000 req/hr
pnpm dev
```

Open <http://localhost:3000>.

## How real data lands on the page

`frontend/src/app/page.tsx` is a server component that calls `fetchRepos('Punkharb')` from `frontend/src/lib/github.ts`. That fetcher:

1. Lists public, non-fork repos via `GET /users/Punkharb/repos`.
2. Fetches per-repo language byte counts in parallel via `GET /repos/Punkharb/{name}/languages`.
3. Maps each result into the design's `Repo` shape (name, description, languages, primary, stars, forks, pushedAt, url, techStack, features).

Caching is handled by Next.js `revalidate: 3600` — the homepage is statically prerendered and refreshes hourly via ISR.

Without `GITHUB_TOKEN`, GitHub allows 60 requests/hour per IP. With any classic or fine-grained read-only token, that becomes 5000/hour. The token is opt-in.

## Build

```bash
pnpm build
# output: frontend/.next/
```

## Deploy to Vercel

The project is already wired for Vercel. To ship a production deploy:

1. Go to <https://vercel.com/new>.
2. Import `punkharb/autoport`.
3. **Root Directory:** `frontend`.
4. **Framework Preset:** Next.js (auto-detected).
5. **Environment Variables:** add `GITHUB_TOKEN` with a read-only PAT for `Punkharb` public repos.
6. Click **Deploy**.

Subsequent pushes to `main` deploy automatically; PRs get preview URLs.

## CI

`.github/workflows/ci.yml` runs lint, typecheck, and build on every push to `main` and every PR. The build step reads `secrets.GH_PORTFOLIO_TOKEN` if present (optional — anon GitHub works for a single build but can flake on rate limits).

## Working with this repo

The user-facing portfolio lives entirely in `frontend/src/`:

- `app/page.tsx` — server entry, fetches repos.
- `app/layout.tsx` — fonts, metadata, favicon.
- `app/globals.css` — design tokens, themes, animations.
- `components/app-shell.tsx` — client state owner (page, theme, modal).
- `components/{home,projects,about}.tsx` — the three pages.
- `components/repo-card.tsx`, `repo-modal.tsx`, `header.tsx`, `footer.tsx`, `tech-stack-bar.tsx`, `contribution-graph.tsx`, `primitives.tsx`.
- `lib/{config,types,helpers,icons,contrib,github}.ts(x)`.

The owner profile (bio, education, activities, skills, pinned repo slugs) is in `lib/config.ts` — edit there.

## Credits

- Claude Code toolkit content (agents / skills / commands / rules / MCP config) is vendored from [`affaan-m/everything-claude-code`](https://github.com/affaan-m/everything-claude-code) (MIT, © 2026 Affaan Mustafa). See [`NOTICE.md`](./NOTICE.md).
- Blueprint base from [`punkharb/vibestack`](https://github.com/punkharb/vibestack).
- Visual design + content: Punnatorn Boonkrajang.

## License

[MIT](./LICENSE).
