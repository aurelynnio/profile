export const contentTypes = ['works', 'writing'] as const;
export type ContentType = (typeof contentTypes)[number];

export interface ContentCard {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  description?: string;
  summary?: string;
  body: string;
  link?: string;
  platform?: string;
  stack?: string;
  source?: string;
  blogpost?: string;
  role?: string;
  status?: string;
  yearBadge?: string;
  [key: string]: unknown;
}
