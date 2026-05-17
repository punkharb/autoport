import { AppShell } from "@/components/app-shell";
import { fetchRepos } from "@/lib/github";
import { fetchContributions } from "@/lib/contributions-graphql";
import { config } from "@/lib/config";

export const revalidate = 3600;

export default async function Page() {
  const [reposResult, contributionsResult] = await Promise.allSettled([
    fetchRepos(config.user.handle),
    fetchContributions(config.user.handle),
  ]);

  const repos = reposResult.status === "fulfilled" ? reposResult.value : [];
  const contributions =
    contributionsResult.status === "fulfilled" ? contributionsResult.value : null;

  if (reposResult.status === "rejected") {
    console.error("[autoport] GitHub fetch failed:", reposResult.reason);
  }

  return <AppShell repos={repos} contributions={contributions} />;
}
