"use client";

import { useEffect, useMemo, useState } from "react";
import type { Repo } from "@/lib/types";
import { techAggregate } from "@/lib/helpers";
import { SearchIcon, XIcon } from "@/lib/icons";
import { Kicker } from "./primitives";
import { RepoCard } from "./repo-card";
import { Footer } from "./footer";

type Sort = "stars" | "updated" | "name";

interface ProjectsProps {
  repos: readonly Repo[];
  openRepo: (r: Repo) => void;
}

export function Projects({ repos, openRepo }: ProjectsProps) {
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("All");
  const [sort, setSort] = useState<Sort>("stars");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const langs = useMemo(
    () => ["All", ...Array.from(new Set(repos.map((r) => r.primary)))],
    [repos],
  );

  const agg = useMemo(() => techAggregate(repos), [repos]);

  const filtered = useMemo(() => {
    let out = [...repos];
    if (q.trim()) {
      const s = q.toLowerCase();
      out = out.filter(
        (r) =>
          r.name.toLowerCase().includes(s) ||
          r.aiSummary.toLowerCase().includes(s) ||
          r.techStack.some((t) => t.toLowerCase().includes(s)),
      );
    }
    if (lang !== "All") out = out.filter((r) => r.primary === lang);
    out.sort((a, b) =>
      sort === "stars"
        ? b.stars - a.stars
        : sort === "updated"
          ? new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
          : a.name.localeCompare(b.name),
    );
    return out;
  }, [q, lang, sort, repos]);

  return (
    <div>
      <section className="max-w-[1100px] mx-auto px-6 pt-14 pb-8">
        <Kicker className="fade-up d-0">§ 01 · All work, all repositories</Kicker>
        <h1 className="font-serif text-[clamp(48px,7vw,88px)] leading-[0.95] tracking-[-0.02em] text-ink mt-3 fade-up d-1">
          The <em className="italic text-forest">complete</em> catalogue.
        </h1>
        <p className="font-serif text-[18px] leading-[1.5] text-ink-2 mt-5 max-w-[640px] fade-up d-2">
          Every repository on my GitHub, summarised by an AI that reads the
          README so you don&apos;t have to. {repos.length} repos · {agg.length}{" "}
          languages.
        </p>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-6">
        <div className="bg-paper-2 border border-rule p-3 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-paper border border-rule flex-1 min-w-[200px]">
            <SearchIcon aria-hidden="true" className="w-3.5 h-3.5 text-ink-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search repos, tech, summaries…"
              aria-label="Search repositories"
              className="bg-transparent outline-none w-full font-mono text-[13px] text-ink placeholder:text-ink-4"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                aria-label="Clear search"
                className="text-ink-3 hover:text-ink"
              >
                <XIcon aria-hidden="true" className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 flex-wrap" role="group" aria-label="Filter by language">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                  lang === l
                    ? "bg-ink text-paper border border-ink"
                    : "border border-rule text-ink-2 hover:border-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-paper border border-rule">
            <label className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3" htmlFor="sort-select">
              Sort
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent font-mono text-[12px] outline-none text-ink"
            >
              <option value="stars">Most stars</option>
              <option value="updated">Recently updated</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-20">
        {loading ? (
          <div
            role="status"
            aria-live="polite"
            aria-label="Loading repositories"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-paper-2 border border-rule h-[320px]">
                <div className="h-9 border-b border-rule shimmer" />
                <div className="p-5 space-y-3">
                  <div className="h-7 w-3/4 shimmer rounded-[1px]" />
                  <div className="h-3 w-full shimmer rounded-[1px]" />
                  <div className="h-3 w-5/6 shimmer rounded-[1px]" />
                  <div className="flex gap-1.5 pt-2">
                    <div className="h-5 w-14 shimmer rounded-[1px]" />
                    <div className="h-5 w-16 shimmer rounded-[1px]" />
                    <div className="h-5 w-12 shimmer rounded-[1px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div role="status" className="bg-paper-2 border border-rule p-12 text-center">
            <div className="font-serif text-[32px] italic text-forest mb-2">
              Nothing here yet.
            </div>
            <p className="font-serif text-[15px] text-ink-2 max-w-[400px] mx-auto leading-[1.5]">
              No repositories match. Try a softer search — or clear the filters
              and browse the full catalogue.
            </p>
            <button
              onClick={() => {
                setQ("");
                setLang("All");
              }}
              className="mt-5 px-4 py-2 border border-ink text-ink hover:bg-ink hover:text-paper font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r, i) => (
              <RepoCard
                key={r.name}
                repo={r}
                index={repos.findIndex((x) => x.name === r.name) + 1}
                animateDelay={i * 60}
                onClick={() => openRepo(r)}
              />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
