// Server-only fetcher for real GitHub contribution data via GraphQL.
// Requires a GitHub PAT with `read:user` (any scope works for the viewer's
// own public contribution graph as long as the token belongs to that user).
// Returns null when no token, on error, or on rate-limit so callers can fall
// back to the deterministic placeholder in contrib.ts.

export interface Contributions {
  cells: number[]; // length 53*7 = 371, bucketed 0..4 like GitHub's UI
  total: number;
}

interface GqlResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              contributionCount: number;
              date: string;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
}

function bucketize(count: number, max: number): number {
  if (count === 0) return 0;
  if (max === 0) return 0;
  const ratio = count / max;
  if (ratio < 0.25) return 1;
  if (ratio < 0.5) return 2;
  if (ratio < 0.75) return 3;
  return 4;
}

export async function fetchContributions(
  login: string,
): Promise<Contributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as GqlResponse;
    const cal = data.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;

    // Flatten weeks into a 53*7 array of counts. GitHub returns weeks
    // starting Sunday with up to 7 days; the current week may be partial.
    const counts: number[] = [];
    for (const w of cal.weeks) {
      for (const d of w.contributionDays) {
        counts.push(d.contributionCount);
      }
    }

    // Take the last 53*7 days so the grid stays the design's exact size.
    const want = 53 * 7;
    const tail = counts.slice(Math.max(0, counts.length - want));
    // Pad if GitHub returned fewer days than expected.
    while (tail.length < want) tail.unshift(0);

    const max = Math.max(...tail);
    const cells = tail.map((c) => bucketize(c, max));

    return { cells, total: cal.totalContributions };
  } catch {
    return null;
  }
}
