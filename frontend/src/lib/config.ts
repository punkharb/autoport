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
    bio: "I'm a second-year CS student at KMUTT in Bangkok. I build for web and mobile — sometimes with a plan, usually by vibing through it.",
    aboutLong:
      "Java got me into coding and I haven't found a reason to stop using it. Since then I've added Flutter, React, TypeScript, and enough Firebase to get by. I've shipped across the stack — frontend, backend, testing — depending on what the team needs. I like starting from zero and figuring things out fast. Recently I've been getting into ML and local AI tooling, which is a rabbit hole I don't regret. I'm looking for a software engineering internship where I can actually build things.",
    spokenLanguages: [
      { name: "Thai", level: "Native" },
      { name: "English", level: "Professional" },
    ],
    activities: [
      { year: "2025", title: "SIT Hackathon 2025", detail: "Hackathon participant" },
      { year: "2026", title: "IBM Bob Hackathon", detail: "Hackathon participant" },
    ],
    email: "ppbthunder@gmail.com",
    github: "github.com/Punkharb",
    githubUrl: "https://github.com/Punkharb",
    linkedin: "linkedin.com/in/punnatorn-boonkrajang-3a0573378",
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
    Mobile: ["Flutter", "React Native"],
    Frontend: ["React", "Next.js", "Tailwind", "Vite"],
    Backend: ["Node.js"],
    "ML / Data": ["NumPy", "pandas", "scikit-learn"],
    Tooling: ["Git", "Linux", "GitHub Actions"],
  },
};
