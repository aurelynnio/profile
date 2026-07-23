import {
  ContentInput,
  ContentRecord,
  ContentType,
} from './types.js';

type DatabaseContent = {
  id: string;
  type: ContentType;
  slug: string;
  title: string;
  date: string;
  thumbnail: string | null;
  description: string | null;
  summary: string | null;
  body: string;
  metadata: Record<string, unknown> | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export const databasePayload = (
  type: ContentType,
  input: ContentInput,
) => ({
  type,
  slug: input.slug,
  title: input.title,
  date: input.date,
  thumbnail: input.thumbnail || null,
  description: input.description || null,
  summary: input.summary || null,
  body: input.body,
  metadata: input.metadata || {},
  is_published: input.isPublished ?? true,
});

export const toContentRecord = (
  row: DatabaseContent,
): ContentRecord => ({
  id: row.id,
  type: row.type,
  slug: row.slug,
  title: row.title,
  date: row.date,
  thumbnail: row.thumbnail || undefined,
  description: row.description || undefined,
  summary: row.summary || undefined,
  body: row.body,
  metadata: row.metadata || {},
  isPublished: row.is_published,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});
