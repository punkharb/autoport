import { AppShell } from "@/components/app-shell";
import { fetchRepos } from "@/lib/github";
import { config } from "@/lib/config";

export const revalidate = 3600;

export default async function Page() {
  let repos: Awaited<ReturnType<typeof fetchRepos>> = [];
  try {
    repos = await fetchRepos(config.user.handle);
  } catch (err) {
    console.error("[autoport] GitHub fetch failed:", err);
  }
  return <AppShell repos={repos} />;
}
