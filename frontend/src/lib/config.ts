import type { AppConfig } from "./types";

export const config: AppConfig = {
  user: {
    name: "Punnatorn Boonkrajang",
    surname: "Boonkrajang",
    given: "Punnatorn",
    nickname: "Pun",
    handle: "Punkharb",
    roleSought: "Software Engineering Intern",
    season: "Summer 2026",
    bio: "I'm a second-year Computer Science student at KMUTT in Bangkok, working at the edge of mobile and full-stack. I like small, type-safe tools, careful APIs, and shipping things that other students actually use.",
    aboutLong:
      "I started writing code at 14, building Flutter apps for my school's clubs. Since then I've drifted across stacks — Spring on the backend, React Native on mobile, Go for self-hosted side projects, and a PyTorch detour last semester for a Thai-handwriting classifier. I care most about the seam between systems: making mobile clients that don't lie about state, and backends that don't make mobile clients lie. Outside of code I read essays, run badly, and brew filter coffee.",
    now: [
      { label: "Building", value: "a KMUTT shuttle-bus tracker that ~600 students rely on" },
      { label: "Learning", value: "Rust — slowly, through Crafting Interpreters" },
      { label: "Reading", value: "“Designing Data-Intensive Applications”" },
      { label: "Listening", value: "lo-fi while I shower-thought my way through bugs" },
    ],
    spokenLanguages: [
      { name: "Thai", level: "Native" },
      { name: "English", level: "Professional · C1" },
      { name: "Japanese", level: "Conversational · N4" },
    ],
    activities: [
      { year: "2024", title: "National Olympiad in Informatics — Thailand", detail: "Participant · top regional round" },
      { year: "2025", title: "KMUTT Mini-Hackathon", detail: "Built shuttle-bus tracker · 1st place, mobile track" },
      { year: "2025", title: "OSS contributions", detail: "Patches to flutter-riverpod and a Spring Boot HTMX starter" },
      { year: "2025", title: "KMUTT CS Society", detail: "Co-organiser of weekly study sessions for first-year CS" },
    ],
    email: "punnatorn.bo@mail.kmutt.ac.th",
    github: "github.com/Punkharb",
    githubUrl: "https://github.com/Punkharb",
    linkedin: "linkedin.com/in/punnatorn",
    location: "Bangkok, Thailand",
    cvFile: "punnatorn-boonkrajang-cv.pdf",
    avatarInitials: "PB",
  },
  pinnedRepos: [
    "flutter-pomodoro",
    "spring-tasks",
    "pytorch-thai-handwriting",
    "flutter-bus-tracker",
    "react-native-receipts",
    "go-rss",
  ],
  education: [
    {
      school: "King Mongkut’s University of Technology Thonburi (KMUTT)",
      degree: "B.Eng. Computer Science · 2nd year",
      years: "2024 — 2028",
      detail:
        "GPAX 3.78 / 4.00 · Coursework: Data Structures, OOP, Database Systems, Software Engineering, Discrete Math",
    },
  ],
  skills: {
    Languages: ["TypeScript", "Dart", "Python", "Java", "Go", "SQL"],
    Mobile: ["Flutter", "React Native", "Material 3"],
    Frontend: ["React", "Next.js", "Tailwind", "Vite"],
    Backend: ["Spring Boot", "Node.js", "Express", "PostgreSQL", "Redis"],
    "ML / Data": ["PyTorch", "NumPy", "pandas", "scikit-learn"],
    Tooling: ["Git", "Docker", "Linux", "GitHub Actions"],
  },
};
