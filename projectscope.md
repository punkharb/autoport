---
name: RepoFolio
pitch: AI-summarized GitHub portfolio that auto-presents every repo to recruiters in under 30 seconds (codename autoport)
domain: portfolio personal-site developer-branding
target_users: tech recruiters, engineering managers, peers and future collaborators
key_entities:
  - Repository
  - Profile
  - Skill
  - Activity
  - Theme
  - Project
auth: keep-supabase
backend: keep-express
testing: none
deploy: vercel
conventions: |
  - Editorial-archival aesthetic on warm off-white surface, ink near-black, single forest-green accent
  - Three live themes: Sans (Space Grotesk), Mono (JetBrains Mono), Serif (Newsreader + IBM Plex Mono)
  - Hairline 1px borders, generous spacing, sectioned with section markers
  - No shadows, no gradients, hover = border-color shift only (no scale transforms)
  - Config-driven content: profile, pinnedRepos, repoCache live in config objects, never inlined in components
  - Tailwind utilities for styling; inline SVG icons; no UI component libraries (no shadcn / MUI / Radix avoided in original spec — blueprint ships shadcn, allow but use sparingly)
  - All animations respect prefers-reduced-motion
  - Pages: Home (hero + pinned grid + numerics band), Projects (search + filter + sort), About (bio + education + activities + skills), Repo Detail modal
---

## Notes

- repoCache simulates an AI-summarization pipeline. Production version regenerates nightly via cron that reads each repo README and writes a cached JSON file.
- 53-week GitHub-style contribution heatmap on Home.
- Recent repos (<=30 days) show pulsing WIP badge. First pinned card enlarged with FEATURED tag.
- Skeleton loading state ~700ms on Projects mount; deliberate empty state when filters return zero.
- Repo Detail modal: AI summary, feature list, full tech stack, language breakdown bar, meta (stars / forks / updated), README preview, GitHub link. Closes on backdrop / X / Esc. Locks body scroll while open.
- Languages spoken: Thai / English / Japanese.
- Skills categorized: Languages, Mobile, Frontend, Backend, ML/Data, Tooling.
- Out of scope v1: SSR / real GitHub OAuth + live data / actual AI pipeline / CMS / i18n / mobile-first refinements / custom domain.
- Owner: Punnatorn Boonkrajang, 2nd-year CS at KMUTT, building this for internship apps.
