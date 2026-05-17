"use client";

import { useState } from "react";
import type { PageId, Repo, ThemeId } from "@/lib/types";
import { Header } from "./header";
import { Home } from "./home";
import { Projects } from "./projects";
import { About } from "./about";
import { RepoModal } from "./repo-modal";

interface AppShellProps {
  repos: readonly Repo[];
}

export function AppShell({ repos }: AppShellProps) {
  const [page, setPageState] = useState<PageId>("home");
  const [theme, setTheme] = useState<ThemeId>("sans");
  const [openRepoData, setOpenRepoData] = useState<Repo | null>(null);

  const setPage = (p: PageId) => {
    setPageState(p);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-paper" data-theme={theme}>
      <Header page={page} setPage={setPage} theme={theme} setTheme={setTheme} />
      <main key={page} className="fade-up">
        {page === "home" && (
          <Home repos={repos} setPage={setPage} openRepo={setOpenRepoData} />
        )}
        {page === "projects" && (
          <Projects repos={repos} openRepo={setOpenRepoData} />
        )}
        {page === "about" && <About />}
      </main>
      <RepoModal repo={openRepoData} onClose={() => setOpenRepoData(null)} />
    </div>
  );
}
