"use client";

import { useEffect, useState } from "react";
import type { Repo } from "@/lib/types";
import { langColour, langPct, relTime } from "@/lib/helpers";
import { ArrowURIcon, StarIcon } from "@/lib/icons";
import { SplitName } from "./primitives";

interface RepoCardProps {
  repo: Repo;
  index: number;
  onClick?: () => void;
  featured?: boolean;
  animateDelay?: number;
}

export function RepoCard({
  repo,
  index,
  onClick,
  featured,
  animateDelay,
}: RepoCardProps) {
  const swatch = langColour(repo.primary);
  const pct = langPct(repo.languages);
  const [active, setActive] = useState(false);
  // Defer "WIP" badge to post-mount: avoids Date.now() in render (purity rule)
  // and avoids server/client hydration drift from a wall-clock comparison.
  useEffect(() => {
    const pushedMs = new Date(repo.pushedAt).getTime();
    if (Number.isNaN(pushedMs)) return;
    const daysSince = (Date.now() - pushedMs) / 86_400_000;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(daysSince < 30);
  }, [repo.pushedAt]);
  const animClass = animateDelay != null ? "fade-up" : "";
  const style =
    animateDelay != null ? { animationDelay: `${animateDelay}ms` } : undefined;

  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={style}
      className={`repo-card group relative bg-paper-2 border border-rule hover:border-ink transition-colors duration-150 cursor-pointer flex flex-col ${animClass} ${
        featured ? "md:col-span-2 md:row-span-1" : ""
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-rule bg-paper-3/30">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3 whitespace-nowrap flex items-center gap-2">
          № {String(index).padStart(3, "0")} · {repo.primary}
          {featured && (
            <span className="inline-flex items-center gap-1 px-1.5 py-px bg-forest text-paper rounded-[1px] tracking-[0.14em]">
              ★ FEATURED
            </span>
          )}
          {active && !featured && (
            <span className="inline-flex items-center gap-1 px-1.5 py-px border border-forest text-forest rounded-[1px] tracking-[0.14em]">
              <span className="relative inline-flex h-1 w-1 rounded-full bg-forest wip-pulse" />{" "}
              WIP
            </span>
          )}
        </div>
        <div className="font-mono text-[10.5px] tnum text-ink-3 flex items-center gap-1">
          <StarIcon className="w-2.5 h-2.5 text-forest" /> {repo.stars}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3
          className={`font-serif ${
            featured ? "text-[34px] md:text-[38px]" : "text-[26px]"
          } leading-[1.05] text-ink tracking-[-0.01em] mb-3`}
        >
          <SplitName name={repo.name} />
        </h3>
        <p
          className={`font-serif ${
            featured ? "text-[17px] md:text-[18px] max-w-[640px]" : "text-[15px]"
          } leading-[1.5] text-ink-2 mb-4 flex-1`}
        >
          {repo.aiSummary}
        </p>
        {repo.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.techStack.slice(0, featured ? 6 : 4).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 font-mono text-[10.5px] tracking-[0.04em] text-ink-2 border border-rule bg-paper rounded-[1px]"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-rule font-mono text-[10.5px] text-ink-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: swatch }}
          />
          {repo.primary}{" "}
          {pct[0] && <span className="text-ink-4">· {pct[0].pct}%</span>}
        </div>
        <div className="flex items-center gap-2 tnum">
          <span>updated {relTime(repo.pushedAt)}</span>
          <span className="arrow-affordance text-forest">
            <ArrowURIcon className="w-3 h-3" />
          </span>
        </div>
      </div>
    </article>
  );
}
