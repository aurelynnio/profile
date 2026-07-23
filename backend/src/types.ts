export const contentTypes = [
  'works',
  'writing',
] as const;
export type ContentType =
  (typeof contentTypes)[number];

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

export interface ContentRecord extends ContentInput {
  id: string;
  type: ContentType;
  createdAt: string;
  updatedAt: string;
}
