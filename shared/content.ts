export const contentTypes = ['works', 'writing'] as const;
export type ContentType = (typeof contentTypes)[number];

/** Fields a client sends when creating/updating content. */
export interface ContentInput {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  description?: string;
  summary?: string;
  body: string;
  metadata?: Record<string, unknown>;
  isPublished?: boolean;
}

/** A stored content record returned by the API. */
export interface ContentRecord extends ContentInput {
  id: string;
  type: ContentType;
  createdAt: string;
  updatedAt: string;
}

/**
 * Frontend-friendly view of a content record.
 * `metadata` is flattened so components can read known keys (Role, Stack, ...)
 * without drilling into a nested object.
 */
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
