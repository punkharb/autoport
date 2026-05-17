"use client";

import type { Repo } from "@/lib/types";
import { langColour, techAggregate } from "@/lib/helpers";
import { Kicker } from "./primitives";

interface TechStackBarProps {
  repos: readonly Repo[];
}

export function TechStackBar({ repos }: TechStackBarProps) {
  const agg = techAggregate(repos);
  return (
    <div className="bg-paper-2 border border-rule p-5">
      <div className="flex items-baseline justify-between mb-4">
        <Kicker>Aggregated tech stack</Kicker>
        <span className="font-mono text-[10.5px] text-ink-3 tnum whitespace-nowrap">
          {agg.length} languages · {repos.length} repos
        </span>
      </div>
      <div className="w-full h-3 flex overflow-hidden border border-rule mb-4">
        {agg.map((s) => (
          <div
            key={s.name}
            title={`${s.name} ${s.pct}%`}
            style={{ width: `${s.pct}%`, background: langColour(s.name) }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {agg.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-1.5 font-mono text-[12px]"
          >
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: langColour(s.name) }}
            />
            <span className="text-ink">{s.name}</span>
            <span className="text-ink-4 tnum">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
