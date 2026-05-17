import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper-2">
      <div className="max-w-[1100px] mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-3 font-mono text-[11.5px] text-ink-3">
        <span>© 2026 {config.user.name} · Made in Bangkok</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-forest opacity-50 pulse-dot" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-forest" />
          </span>
          Synced with GitHub · today
        </span>
      </div>
    </footer>
  );
}
