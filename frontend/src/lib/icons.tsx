import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export const StarIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88L2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const StarOutIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  </svg>
);

export const ForkIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...p}>
    <circle cx="6" cy="5" r="2" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="9" r="2" />
    <path d="M6 7v6a4 4 0 004 4h2" />
    <path d="M18 11v2a4 4 0 01-4 4h-2" />
  </svg>
);

export const GitHubIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5 3.3 9.3 7.8 10.8.6.1.8-.2.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8C23.5 5.7 18.3.5 12 .5z" />
  </svg>
);

export const LinkedInIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 18.34H5.67V9.75h2.67v8.59zM7 8.58A1.55 1.55 0 1110 8.58a1.55 1.55 0 01-2.99 0zm11.34 9.76h-2.67v-4.66c0-1.11-.02-2.55-1.55-2.55s-1.79 1.21-1.79 2.47v4.74h-2.67V9.75h2.56v1.17h.04c.36-.67 1.22-1.38 2.52-1.38 2.7 0 3.2 1.78 3.2 4.09v4.71z" />
  </svg>
);

export const MailIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const SearchIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const XIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...p}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const ArrowURIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export const DownloadIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...p}>
    <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
  </svg>
);

export const MapPinIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...p}>
    <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const SparkleIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.5L13.6 9 20 10.5 13.6 12 12 18.5 10.4 12 4 10.5 10.4 9z" />
  </svg>
);
