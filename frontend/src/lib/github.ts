import type { Repo, RepoLanguages } from "./types";
import { summarizeRepo } from "./gemini";

const API_BASE = "https://api.github.com";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: buildHeaders(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} on ${path}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

function topLanguages(langs: RepoLanguages, n: number): string[] {
  return Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name]) => name);
}

function deriveTechStack(langs: RepoLanguages, topics: readonly string[]): readonly string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  topLanguages(langs, 3).forEach((l) => {
    if (!seen.has(l.toLowerCase())) {
      seen.add(l.toLowerCase());
      out.push(l);
    }
  });
  topics.slice(0, 6).forEach((t) => {
    const cap = t.charAt(0).toUpperCase() + t.slice(1);
    if (!seen.has(cap.toLowerCase())) {
      seen.add(cap.toLowerCase());
      out.push(cap);
    }
  });
  return out.slice(0, 8);
}

function summarize(repo: GitHubRepo, primary: string): string {
  const desc = (repo.description ?? "").trim();
  if (desc) return desc;
  return `A ${primary} project on GitHub.`;
}

export async function fetchRepos(handle: string): Promise<Repo[]> {
  const list = await gh<GitHubRepo[]>(
    `/users/${encodeURIComponent(handle)}/repos?per_page=100&sort=updated&type=owner`,
  );
  const filtered = list.filter((r) => !r.fork && !r.private);

  const enriched = await Promise.all(
    filtered.map(async (r): Promise<Repo> => {
      let languages: RepoLanguages = {};
      try {
        languages = await gh<RepoLanguages>(
          `/repos/${encodeURIComponent(handle)}/${encodeURIComponent(r.name)}/languages`,
        );
      } catch {
        languages = r.language ? { [r.language]: 1 } : {};
      }
      const primary = r.language ?? topLanguages(languages, 1)[0] ?? "Other";
      const pushedMs = new Date(r.pushed_at).getTime();
      const active =
        Number.isFinite(pushedMs) &&
        (Date.now() - pushedMs) / 86_400_000 < 30;

      const fallback = summarize(r, primary);
      const aiSummary =
        (await summarizeRepo({
          name: r.name,
          description: r.description ?? "",
          primary,
          languages: Object.keys(languages),
          topics: r.topics ?? [],
        })) ?? fallback;

      return {
        name: r.name,
        description: r.description ?? "",
        aiSummary,
        techStack: deriveTechStack(languages, r.topics ?? []),
        features: [],
        languages,
        primary,
        stars: r.stargazers_count,
        forks: r.forks_count,
        pushedAt: r.pushed_at,
        url: r.html_url,
        active,
      };
    }),
  );

  return enriched.sort(
    (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime(),
  );
}
