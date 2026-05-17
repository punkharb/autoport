// Server-only Gemini summarizer for repo cards.
// Activates when GEMINI_API_KEY is present in the environment; otherwise
// callers must fall back. Cached transparently because page.tsx wraps the
// whole fetch chain in Next.js ISR (revalidate: 3600).

const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export interface SummaryInput {
  name: string;
  description: string;
  primary: string;
  languages: readonly string[];
  topics: readonly string[];
}

interface GenContentResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
  promptFeedback?: { blockReason?: string };
}

function buildPrompt(r: SummaryInput): string {
  const langs = r.languages.slice(0, 4).join(", ") || r.primary;
  const topics = r.topics.length > 0 ? r.topics.join(", ") : "—";
  return [
    "Write a single-sentence portfolio summary of this GitHub repository for a recruiter.",
    "Hard rules:",
    "- 1 sentence, 14–28 words.",
    "- Plain prose, no markdown, no quotes, no emojis, no trailing period.",
    "- Lead with what it does, not the stack.",
    "- Be specific. Avoid: 'A modern X application.', 'A simple tool that...'.",
    "",
    `Name: ${r.name}`,
    `Primary language: ${r.primary}`,
    `Languages: ${langs}`,
    `Topics: ${topics}`,
    `Description: ${r.description || "(none)"}`,
  ].join("\n");
}

export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

export async function summarizeRepo(
  input: SummaryInput,
): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: buildPrompt(input) }] }],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 96,
          topP: 0.9,
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const data = (await res.json()) as GenContentResponse;
    if (data.promptFeedback?.blockReason) return null;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) return null;

    // Collapse whitespace, strip any trailing period/quote.
    return text.replace(/\s+/g, " ").replace(/^["']|["']$/g, "").replace(/\.$/, "");
  } catch {
    return null;
  }
}
