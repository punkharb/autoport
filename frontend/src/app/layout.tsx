import type { Metadata } from "next";
import {
  Newsreader,
  Space_Grotesk,
  IBM_Plex_Mono,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const FAVICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='12' fill='%231E4D2B'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='Georgia,serif' font-weight='600' font-size='32' fill='%23F4EFE3'>PB</text></svg>`,
  );

export const metadata: Metadata = {
  title: "Punnatorn Boonkrajang — Software Engineering Intern · RepoFolio",
  description:
    "RepoFolio — AI-summarized GitHub portfolio for Punnatorn Boonkrajang, second-year Computer Science student at KMUTT. Real repos, real activity, real shipped projects.",
  icons: { icon: FAVICON },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
