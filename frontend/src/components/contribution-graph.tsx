"use client";

import { CONTRIB, CONTRIB_PALETTE, CONTRIB_TOTAL } from "@/lib/contrib";
import { Kicker, useCountUp } from "./primitives";

export function ContributionGraph() {
  const total = useCountUp(CONTRIB_TOTAL, 1500);
  return (
    <div className="bg-paper-2 border border-rule p-5">
      <div className="flex items-baseline justify-between mb-4 gap-3 flex-wrap">
        <div>
          <Kicker>Activity · last 12 months</Kicker>
          <div className="font-serif text-[28px] text-ink leading-none tnum mt-1">
            {total.toLocaleString()}{" "}
            <span className="text-ink-3 text-[14px]">contributions</span>
          </div>
        </div>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3 flex items-center gap-1.5">
          Less
          {CONTRIB_PALETTE.map((c, i) => (
            <span
              key={c}
              className="inline-block w-2.5 h-2.5 rounded-[1px]"
              style={{
                background: c,
                border: i === 0 ? "1px solid #D9D1BC" : "none",
              }}
            />
          ))}
          More
        </div>
      </div>
      <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-[3px] min-w-[720px]">
          {Array.from({ length: 53 }).map((_, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, d) => {
                const v = CONTRIB[w * 7 + d];
                return (
                  <div
                    key={d}
                    className="w-[11px] h-[11px] rounded-[1px] contrib-pop"
                    style={{
                      background: CONTRIB_PALETTE[v],
                      border: v === 0 ? "1px solid #D9D1BC" : "none",
                      animationDelay: `${w * 14 + d * 6}ms`,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
