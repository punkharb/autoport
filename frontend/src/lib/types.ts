export type RepoLanguages = Record<string, number>;

export interface Repo {
  name: string;
  description: string;
  aiSummary: string;
  techStack: readonly string[];
  features: readonly string[];
  languages: RepoLanguages;
  primary: string;
  stars: number;
  forks: number;
  pushedAt: string;
  url: string;
}

export interface LangPct {
  name: string;
  pct: number;
}

export interface Activity {
  year: string;
  title: string;
  detail: string;
}

export interface SpokenLanguage {
  name: string;
  level: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  years: string;
  detail: string;
}

export interface NowItem {
  label: string;
  value: string;
}

export interface UserConfig {
  name: string;
  surname: string;
  given: string;
  nickname: string;
  handle: string;
  roleSought: string;
  season: string;
  bio: string;
  aboutLong: string;
  now: readonly NowItem[];
  spokenLanguages: readonly SpokenLanguage[];
  activities: readonly Activity[];
  email: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  location: string;
  cvFile: string;
  avatarInitials: string;
}

export interface AppConfig {
  user: UserConfig;
  pinnedRepos: readonly string[];
  education: readonly EducationEntry[];
  skills: Readonly<Record<string, readonly string[]>>;
}

export type ThemeId = "sans" | "mono" | "serif";
export type PageId = "home" | "projects" | "about";
