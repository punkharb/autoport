"use client";

import { config } from "@/lib/config";
import { GitHubIcon, MailIcon, DownloadIcon } from "@/lib/icons";
import { Kicker, SectionHead } from "./primitives";
import { Footer } from "./footer";

export function About() {
  return (
    <div>
      <section className="max-w-[860px] mx-auto px-6 pt-14 pb-12">
        <Kicker className="fade-up d-0">§ 01 · About — {config.user.nickname}</Kicker>
        <h1 className="font-serif text-[clamp(48px,7vw,88px)] leading-[0.95] tracking-[-0.02em] text-ink mt-3 fade-up d-1">
          Hello — I&apos;m <em className="italic text-forest">{config.user.nickname}.</em>
        </h1>
        <p className="font-serif text-[19px] leading-[1.6] text-ink-2 mt-6 max-w-[640px] fade-up d-2">
          {config.user.bio}
        </p>
        <p className="font-serif text-[18px] leading-[1.65] text-ink mt-5 max-w-[640px] fade-up d-3">
          {config.user.aboutLong}
        </p>
      </section>

      <section className="max-w-[860px] mx-auto px-6 pb-12">
        <SectionHead num="02" title="Education" />
        <div className="space-y-px">
          {config.education.map((e, i) => (
            <div
              key={`${e.school}-${i}`}
              className="bg-paper-2 border border-rule p-5 fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-serif text-[22px] leading-[1.2] text-ink">{e.school}</h3>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 whitespace-nowrap">
                  {e.years}
                </div>
              </div>
              <div className="font-serif italic text-[15px] text-forest mt-1">{e.degree}</div>
              <div className="font-mono text-[12px] text-ink-2 mt-2 leading-[1.6]">{e.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[860px] mx-auto px-6 pb-12">
        <SectionHead num="03" title="Activities" />
        <div className="relative pl-5">
          <div className="absolute left-1.5 top-1.5 bottom-1.5 w-px bg-rule" />
          <ul className="space-y-5">
            {config.user.activities.map((a, i) => (
              <li
                key={a.title}
                className="relative fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="absolute -left-[18px] top-2 w-2.5 h-2.5 rounded-full bg-forest ring-4 ring-paper" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-serif text-[19px] leading-[1.2] text-ink">{a.title}</h3>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 tnum whitespace-nowrap">
                    {a.year}
                  </div>
                </div>
                <p className="font-mono text-[12px] text-ink-2 leading-[1.6] mt-1">{a.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-[860px] mx-auto px-6 pb-12">
        <SectionHead num="04" title="Languages" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule border border-rule">
          {config.user.spokenLanguages.map((l, i) => (
            <div
              key={l.name}
              className="bg-paper-2 p-5 fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Kicker>{l.level}</Kicker>
              <div className="font-serif text-[28px] leading-[1.0] tracking-[-0.01em] text-ink mt-2">
                {l.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[860px] mx-auto px-6 pb-12">
        <SectionHead num="05" title="Skills" />
        <div className="bg-paper-2 border border-rule divide-y divide-rule">
          {Object.entries(config.skills).map(([cat, items]) => (
            <div key={cat} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-5">
              <div className="md:col-span-1">
                <Kicker>{cat}</Kicker>
              </div>
              <div className="md:col-span-3 flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 font-mono text-[11.5px] text-ink border border-rule bg-paper"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[860px] mx-auto px-6 pb-20">
        <SectionHead num="06" title="Get in touch" />
        <div className="bg-paper-2 border border-rule p-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-serif text-[18px] text-ink max-w-[440px] leading-[1.5]">
            I&apos;m <em className="italic text-forest">open</em> for{" "}
            {config.user.season} internships and reading interesting cold emails.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${config.user.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-paper hover:bg-forest font-mono text-[12px] uppercase tracking-[0.14em] transition-colors"
            >
              <MailIcon className="w-3.5 h-3.5" /> Email
            </a>
            <a
              href={config.user.githubUrl}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-ink text-ink hover:bg-ink hover:text-paper font-mono text-[12px] uppercase tracking-[0.14em] transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href={`/${config.user.cvFile}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-ink text-ink hover:bg-ink hover:text-paper font-mono text-[12px] uppercase tracking-[0.14em] transition-colors"
            >
              <DownloadIcon className="w-3.5 h-3.5" /> Download CV
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
