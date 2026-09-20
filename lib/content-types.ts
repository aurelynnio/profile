export type Language = 'en' | 'zh';

export interface LocalizedText {
  en: string;
  zh: string;
}

/** A captured application screen with the specs behind it. */
export interface ProjectScreen {
  /** Image under /public, e.g. /img-work/vietrailway/home.png */
  src: string;
  /** Route the screen was captured from, e.g. /search */
  route: string;
  title: LocalizedText;
  description: LocalizedText;
  /** Implementation notes rendered next to the screen. */
  specs: LocalizedText[];
}

/** An engineering system worth calling out on a case study. */
export interface ProjectSystem {
  name: string;
  summary: LocalizedText;
  /** Where it lives in the repository. */
  where?: string;
}

export interface Project {
  slug: string;
  kind: 'work' | 'experiment';
  title: string;
  /** One-line hook shown on cards. */
  subtitle: LocalizedText;
  /** ISO date (yyyy-MM-dd). */
  date: string;
  yearBadge: string;
  cover: string;
  /** YouTube video id for a demo/trailer (click-to-play facade). */
  trailerId?: string;
  description: LocalizedText;
  /** Case study / write-up in markdown. */
  body: LocalizedText;
  websiteUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  status?: LocalizedText;
  role?: LocalizedText;
  platform?: string;
  stack?: string;
  tags: string[];
  experiment?: {
    name: string;
    theme: string;
    duration: string;
  };
  /** Captured screens of the running app, shown with their specs. */
  screens?: ProjectScreen[];
  /** Engineering systems implemented behind the product. */
  systems?: ProjectSystem[];
}

export interface Post {
  slug: string;
  title: LocalizedText;
  /** ISO date (yyyy-MM-dd). */
  date: string;
  summary: LocalizedText;
  tags: string[];
  body: LocalizedText;
  /** Related project slug, if the article is about one. */
  relatedProject?: string;
}
