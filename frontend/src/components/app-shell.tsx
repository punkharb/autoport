"use client";

import { useCallback, useState } from "react";
import type { PageId, Repo, ThemeId } from "@/lib/types";
import type { Contributions } from "@/lib/contributions-graphql";
import { Header } from "./header";
import { Home } from "./home";
import { Projects } from "./projects";
import { About } from "./about";
import { RepoModal } from "./repo-modal";

interface AppShellProps {
  repos: readonly Repo[];
  contributions: Contributions | null;
}

export function AppShell({ repos, contributions }: AppShellProps) {
  const [page, setPageState] = useState<PageId>("home");
  const [theme, setTheme] = useState<ThemeId>("sans");
  const [openRepoData, setOpenRepoData] = useState<Repo | null>(null);

  const setPage = useCallback((p: PageId) => {
    setPageState(p);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);
  const closeRepo = useCallback(() => setOpenRepoData(null), []);

  return (
    <div className="min-h-screen bg-paper" data-theme={theme}>
      <Header page={page} setPage={setPage} theme={theme} setTheme={setTheme} />
      <main key={page} className="fade-up">
        {page === "home" && (
          <Home
            repos={repos}
            contributions={contributions}
            setPage={setPage}
            openRepo={setOpenRepoData}
          />
        )}
        {page === "projects" && (
          <Projects repos={repos} openRepo={setOpenRepoData} />
        )}
        {page === "about" && <About />}
      </main>
      <RepoModal repo={openRepoData} onClose={closeRepo} />
    </div>
  );
}
