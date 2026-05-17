"use client";

import type { PageId, Repo } from "@/lib/types";
import type { Contributions } from "@/lib/contributions-graphql";
import { config } from "@/lib/config";
import { techAggregate } from "@/lib/helpers";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, ArrowURIcon } from "@/lib/icons";
import { Kicker, useCountUp } from "./primitives";
import { RepoCard } from "./repo-card";
import { TechStackBar } from "./tech-stack-bar";
import { ContributionGraph } from "./contribution-graph";
import { Footer } from "./footer";

interface HomeProps {
  repos: readonly Repo[];
  contributions: Contributions | null;
  setPage: (p: PageId) => void;
  openRepo: (r: Repo) => void;
}

export function Home({ repos, contributions, setPage, openRepo }: HomeProps) {
  const pinned = config.pinnedRepos
    .map((slug) => repos.find((r) => r.name.toLowerCase() === slug.toLowerCase()))
    .filter((r): r is Repo => r !== undefined);

  const fallback = pinned.length === 0 ? repos.slice(0, 6) : pinned;
  const shown = fallback;

  const totalStars = repos.reduce((a, r) => a + r.stars, 0);
  const agg = techAggregate(repos);

  const animStars = useCountUp(totalStars, 1400);
  const animRepos = useCountUp(repos.length, 900);
  const animLangs = useCountUp(agg.length, 900);

  return (
    <div>
      <section className="max-w-[1100px] mx-auto px-6 pt-16 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <h1 className="font-serif text-[clamp(48px,7.4vw,96px)] leading-[0.92] tracking-[-0.025em] text-ink">
              <span className="block fade-up d-0">{config.user.given}</span>
              <span className="block fade-up d-1 surname-hover">
                <em className="italic text-forest">{config.user.surname}.</em>
              </span>
            </h1>
            <p className="font-serif text-[20px] md:text-[22px] leading-[1.5] text-ink-2 mt-7 max-w-[640px] fade-up d-2">
              {config.user.bio}
            </p>
          </div>
          <div className="md:col-span-4 md:pt-3 slide-in-right d-2">
            <div className="border-t-2 border-ink pt-6 space-y-6 relative">
              <div className="fade-up d-3">
                <Kicker>Find</Kicker>
                <ul className="mt-2 font-mono text-[12.5px] text-ink space-y-1">
                  <li className="flex items-center gap-2">
                    <GitHubIcon aria-hidden="true" className="w-3.5 h-3.5" />
                    <a
                      className="hover:text-forest"
                      href={config.user.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {config.user.github}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <LinkedInIcon aria-hidden="true" className="w-3.5 h-3.5" />
                    <a
                      className="hover:text-forest"
                      href={`https://${config.user.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {config.user.linkedin}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MailIcon aria-hidden="true" className="w-3.5 h-3.5" />
                    <a className="hover:text-forest" href={`mailto:${config.user.email}`}>
                      {config.user.email}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 pt-1 fade-up d-6">
                <a
                  href={`/${config.user.cvFile}`}
                  download
                  aria-label="Download CV (PDF)"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-ink text-paper hover:bg-forest font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors"
                >
                  <DownloadIcon aria-hidden="true" className="w-3.5 h-3.5" /> CV
                </a>
                <a
                  href={`mailto:${config.user.email}`}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-ink text-ink hover:bg-ink hover:text-paper font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors"
                >
                  <MailIcon aria-hidden="true" className="w-3.5 h-3.5" /> Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-12">
        <div className="flex items-end justify-between mb-10 gap-3 flex-wrap">
          <div>
            <Kicker>§ 02 · Pinned · {shown.length}</Kicker>
            <h2 className="font-serif text-[40px] md:text-[48px] leading-[1.0] tracking-[-0.02em] text-ink mt-2">
              The <em className="italic text-forest">good</em> stuff.
            </h2>
          </div>
          <button
            onClick={() => setPage("projects")}
            className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-2 hover:text-forest flex items-center gap-1.5"
          >
            All {repos.length} repositories <ArrowURIcon aria-hidden="true" className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((r, i) => (
            <RepoCard
              key={r.name}
              repo={r}
              index={repos.findIndex((x) => x.name === r.name) + 1}
              featured={i === 0}
              animateDelay={i * 90}
              onClick={() => openRepo(r)}
            />
          ))}
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-12">
        <div className="mb-10">
          <Kicker>§ 03 · Numerics</Kicker>
          <h2 className="font-serif text-[40px] md:text-[48px] leading-[1.0] tracking-[-0.02em] text-ink mt-2">
            By the <em className="italic text-forest">numbers</em>.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-px bg-rule border border-rule mb-5">
          {[
            { label: "Repositories", value: animRepos },
            { label: "Stars earned", value: animStars },
            { label: "Languages", value: animLangs },
          ].map((s) => (
            <div key={s.label} className="bg-paper-2 p-5">
              <Kicker>{s.label}</Kicker>
              <div className="font-serif text-[clamp(36px,5vw,56px)] leading-[1.0] tracking-[-0.02em] text-ink tnum mt-2">
                {s.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <TechStackBar repos={repos} />
          <ContributionGraph contributions={contributions} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
