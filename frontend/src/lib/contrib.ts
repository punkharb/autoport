// Deterministic 53-week × 7-day contribution grid.
// Placeholder for live GitHub contribution data — drop-in replace with a
// GraphQL `contributionsCollection.contributionCalendar` fetch when a token
// is available. Kept deterministic so the visual matches the design source.

const hash = (i: number): number => {
  const x = Math.sin(i * 1313.7) * 10000;
  return x - Math.floor(x);
};

function buildGrid(): number[] {
  const out: number[] = [];
  for (let w = 0; w < 53; w++) {
    for (let d = 0; d < 7; d++) {
      const r = hash(w * 7 + d);
      const weekend = d === 0 || d === 6;
      const boost = (w > 6 && w < 18) || (w > 28 && w < 38) ? 0.3 : 0;
      const base = (weekend ? 0.2 : 0.5) + boost;
      const v = r < 1 - base ? 0 : Math.min(4, Math.floor((r - (1 - base)) * 9));
      out.push(v);
    }
  }
  return out;
}

export const CONTRIB: readonly number[] = buildGrid();
export const CONTRIB_TOTAL: number = CONTRIB.reduce((a, b) => a + b, 0) * 2;
export const CONTRIB_PALETTE: readonly string[] = [
  "#EBE4D2",
  "#C7D7C5",
  "#7AA288",
  "#3A7A4D",
  "#1E4D2B",
];
