"use client";

import type { PageId, ThemeId } from "@/lib/types";
import { config } from "@/lib/config";
import { DownloadIcon } from "@/lib/icons";

interface ThemeSwitcherProps {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

function ThemeSwitcher({ theme, setTheme }: ThemeSwitcherProps) {
  const themes: { id: ThemeId; label: string; hint: string }[] = [
    { id: "sans", label: "Sans", hint: "Modern grotesk" },
    { id: "mono", label: "Mono", hint: "Developer brutalist" },
    { id: "serif", label: "Serif", hint: "Editorial classic" },
  ];
  return (
    <div className="ml-2 mr-1 flex items-center gap-0 border border-rule bg-paper-2">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.hint}
          aria-pressed={theme === t.id}
          className={`px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors ${
            theme === t.id
              ? "bg-ink text-paper"
              : "text-ink-3 hover:text-ink"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

interface HeaderProps {
  page: PageId;
  setPage: (p: PageId) => void;
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

export function Header({ page, setPage, theme, setTheme }: HeaderProps) {
  const pages: PageId[] = ["home", "projects", "about"];
  return (
    <header className="sticky top-0 z-30 bg-paper/85 backdrop-blur-sm border-b border-rule">
      <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <button
          onClick={() => setPage("home")}
          className="flex items-baseline gap-1 group"
        >
          <span className="font-serif text-[20px] text-ink leading-none">
            {config.user.given}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3 group-hover:text-forest transition-colors">
            — {config.user.handle}
          </span>
        </button>
        <nav className="flex items-center gap-1" aria-label="Primary">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              aria-current={page === p ? "page" : undefined}
              className={`px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors ${
                page === p
                  ? "text-ink underline-forest"
                  : "text-ink-3 hover:text-ink"
              }`}
            >
              {p}
            </button>
          ))}
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
          <a
            href={`/${config.user.cvFile}`}
            className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-paper hover:bg-forest font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors"
          >
            <DownloadIcon className="w-3 h-3" /> CV
          </a>
        </nav>
      </div>
    </header>
  );
}
