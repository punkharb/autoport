"use client";

import { useEffect, useState, type ReactNode } from "react";

interface KickerProps {
  children: ReactNode;
  className?: string;
}

export function Kicker({ children, className = "" }: KickerProps) {
  return (
    <div
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 whitespace-nowrap ${className}`}
    >
      {children}
    </div>
  );
}

interface RuleProps {
  className?: string;
}

export function Rule({ className = "" }: RuleProps) {
  return <div className={`h-px bg-rule ${className}`} />;
}

interface SectionHeadProps {
  num: string;
  title: ReactNode;
  sub?: ReactNode;
}

export function SectionHead({ num, title, sub }: SectionHeadProps) {
  return (
    <div className="mb-8">
      <Kicker>
        § {num} {sub && <>· {sub}</>}
      </Kicker>
      <h2 className="font-serif text-[36px] md:text-[44px] leading-[1.0] tracking-[-0.02em] text-ink mt-2">
        {title}
      </h2>
    </div>
  );
}

interface StampProps {
  children: ReactNode;
  rotate?: number;
}

export function Stamp({ children, rotate = -4 }: StampProps) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2 py-1 border-2 border-forest text-forest font-mono text-[10px] uppercase tracking-[0.18em] whitespace-nowrap"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-forest opacity-50 pulse-dot" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-forest" />
      </span>
      {children}
    </div>
  );
}

interface AvatarProps {
  initials?: string;
  size?: number;
}

export function Avatar({ initials = "PB", size = 72 }: AvatarProps) {
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 80 80"
        width={size}
        height={size}
        className="absolute inset-0"
      >
        <circle
          cx="40"
          cy="40"
          r="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ink/15"
        />
        <circle
          cx="40"
          cy="40"
          r="38"
          fill="none"
          stroke="#1E4D2B"
          strokeWidth="1.5"
          strokeDasharray="239"
          strokeDashoffset="239"
          pathLength="239"
          style={{
            animation:
              "avatarStroke 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s forwards",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-serif text-[28px] text-ink tracking-[-0.02em] leading-none">
        {initials}
      </div>
    </div>
  );
}

export function useCountUp(to: number, ms = 1200): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    // Reset to 0 on every `to` change so the ramp restarts from zero
    // rather than from the previous animation's frozen final value.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setV(0);
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return v;
}

export function SplitName({ name }: { name: string }) {
  const parts = name.split("-");
  return (
    <>
      {parts.map((p, i) => (
        <span key={`${p}-${i}`}>
          {i === parts.length - 1 && parts.length > 1 ? (
            <em className="italic text-forest">{p}</em>
          ) : (
            p
          )}
          {i < parts.length - 1 && <span className="text-ink-4">-</span>}
        </span>
      ))}
    </>
  );
}
