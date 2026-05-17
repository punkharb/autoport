import type { LangPct, Repo, RepoLanguages } from "./types";

export const LANG_COLOURS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  Dart: "#00B4AB",
  Python: "#3572A5",
  Go: "#00ADD8",
  Java: "#B07219",
  Rust: "#DEA584",
  CSS: "#563D7C",
  HTML: "#E34C26",
  Markdown: "#7A7264",
  Astro: "#FF5D01",
  Shell: "#89E051",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  EJS: "#A91E50",
  C: "#555555",
  "C++": "#F34B7D",
  Ruby: "#701516",
  Vue: "#41B883",
  Svelte: "#FF3E00",
  PHP: "#4F5D95",
};

export const langColour = (name: string): string =>
  LANG_COLOURS[name] ?? "#7A7264";

export function relTime(iso: string, now: Date = new Date()): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "—";
  const d = (now.getTime() - t) / 86_400_000;
  if (d < 2) return "yesterday";
  if (d < 14) return `${Math.round(d)} days ago`;
  if (d < 60) return `${Math.round(d / 7)} weeks ago`;
  if (d < 365) return `${Math.round(d / 30)} months ago`;
  const years = Math.round(d / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export function langPct(langs: RepoLanguages): LangPct[] {
  const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(langs).map(([name, v]) => ({
    name,
    pct: Math.round((v / total) * 100),
  }));
}

export function techAggregate(repos: readonly Repo[]): LangPct[] {
  const sum: Record<string, number> = {};
  repos.forEach((r) => {
    Object.entries(r.languages).forEach(([name, v]) => {
      sum[name] = (sum[name] ?? 0) + v;
    });
  });
  const total = Object.values(sum).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(sum)
    .map(([name, v]) => ({ name, pct: +((v / total) * 100).toFixed(1) }))
    .sort((a, b) => b.pct - a.pct);
}
