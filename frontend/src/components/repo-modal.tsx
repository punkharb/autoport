"use client";

import { useEffect, useRef } from "react";
import type { Repo } from "@/lib/types";
import { langColour, langPct, relTime } from "@/lib/helpers";
import { ArrowURIcon, GitHubIcon, XIcon } from "@/lib/icons";
import { Kicker, SplitName } from "./primitives";

interface RepoModalProps {
  repo: Repo | null;
  onClose: () => void;
}

export function RepoModal({ repo, onClose }: RepoModalProps) {
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!repo) return;
    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      restoreFocusTo.current?.focus?.();
    };
  }, [repo, onClose]);

  if (!repo) return null;
  const pct = langPct(repo.languages);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="repo-modal-title"
      className="fixed inset-0 z-40 bg-ink/40 flex items-start md:items-center justify-center p-3 md:p-8 overflow-y-auto scale-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[820px] bg-paper border border-ink shadow-[0_1px_0_rgba(0,0,0,0.04)] my-auto"
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-ink-3 hover:text-ink hover:bg-paper-3"
        >
          <XIcon className="w-4 h-4" />
        </button>

        <div className="px-7 pt-7 pb-5 border-b border-rule">
          <Kicker>
            Repository · {repo.primary} · ★ {repo.stars}
          </Kicker>
          <h2
            id="repo-modal-title"
            className="font-serif text-[44px] leading-[1.0] tracking-[-0.015em] text-ink mt-2"
          >
            <SplitName name={repo.name} />
          </h2>
          <p className="font-serif text-[18px] leading-[1.5] text-ink-2 mt-3 max-w-[640px]">
            {repo.aiSummary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2 px-7 py-6 border-r border-rule">
            {repo.features.length > 0 && (
              <>
                <Kicker>What&apos;s in it</Kicker>
                <ul className="mt-3 space-y-2.5">
                  {repo.features.map((f) => (
                    <li
                      key={f}
                      className="font-serif text-[15px] leading-[1.5] text-ink flex items-start gap-3"
                    >
                      <span className="mt-2 inline-block w-1.5 h-1.5 bg-forest rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className={repo.features.length > 0 ? "mt-7" : ""}>
              <Kicker>README preview</Kicker>
              <div className="mt-3 bg-paper-3/40 border border-rule p-4 font-mono text-[12px] leading-[1.7] text-ink-2">
                <div className="text-ink font-medium"># {repo.name}</div>
                <div>{repo.description || repo.aiSummary}</div>
                <div className="mt-2 text-ink-3">## Install</div>
                <div>$ git clone {repo.url}</div>
                <div>$ cd {repo.name} &amp;&amp; make</div>
                {repo.techStack.length > 0 && (
                  <>
                    <div className="mt-2 text-ink-3">## Stack</div>
                    <div>— {repo.techStack.join(" · ")}</div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="px-7 py-6">
            {repo.techStack.length > 0 && (
              <>
                <Kicker>Tech stack</Kicker>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {repo.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 font-mono text-[11px] text-ink-2 border border-rule bg-paper-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}
            {pct.length > 0 && (
              <div className={repo.techStack.length > 0 ? "mt-6" : ""}>
                <Kicker>Languages</Kicker>
                <div className="mt-3 flex h-2 overflow-hidden border border-rule">
                  {pct.map((p) => (
                    <div
                      key={p.name}
                      style={{
                        width: `${p.pct}%`,
                        background: langColour(p.name),
                      }}
                    />
                  ))}
                </div>
                <div className="mt-2 space-y-1">
                  {pct.map((p) => (
                    <div
                      key={p.name}
                      className="flex items-center justify-between font-mono text-[11px]"
                    >
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: langColour(p.name) }}
                        />{" "}
                        {p.name}
                      </span>
                      <span className="text-ink-3 tnum">{p.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6">
              <Kicker>Meta</Kicker>
              <dl className="mt-3 font-mono text-[11.5px] space-y-1">
                <div className="flex justify-between">
                  <dt className="text-ink-3">Stars</dt>
                  <dd className="text-ink tnum">{repo.stars}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-3">Forks</dt>
                  <dd className="text-ink tnum">{repo.forks}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-3">Updated</dt>
                  <dd className="text-ink">{relTime(repo.pushedAt)}</dd>
                </div>
              </dl>
            </div>
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-ink text-paper hover:bg-forest font-mono text-[12px] uppercase tracking-[0.14em] transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5" /> View on GitHub{" "}
              <ArrowURIcon className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
