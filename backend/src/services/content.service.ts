import type {
  ContentInput,
  ContentRecord,
  ContentType,
} from '../types/content.js';
import { supabase } from '../lib/supabase.js';

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

const TABLE = 'contents';

const toRecord = (row: DatabaseContent): ContentRecord => ({
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

const toInsert = (type: ContentType, input: ContentInput) => ({
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

export const contentService = {
  async listPublished(type: ContentType): Promise<ContentRecord[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('type', type)
      .eq('is_published', true)
      .order('date', { ascending: false });
    if (error) throw error;
    return (data || []).map(toRecord);
  },

  async getBySlug(
    type: ContentType,
    slug: string,
  ): Promise<ContentRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('type', type)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();
    if (error) throw error;
    return data ? toRecord(data) : null;
  },

  async create(
    type: ContentType,
    input: ContentInput,
  ): Promise<ContentRecord> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(toInsert(type, input))
      .select()
      .single();
    if (error) throw error;
    return toRecord(data);
  },

  async update(
    type: ContentType,
    slug: string,
    input: ContentInput,
  ): Promise<ContentRecord> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(toInsert(type, input))
      .eq('type', type)
      .eq('slug', slug)
      .select()
      .single();
    if (error) throw error;
    return toRecord(data);
  },

  async remove(type: ContentType, slug: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('type', type)
      .eq('slug', slug);
    if (error) throw error;
  },

  async upsert(type: ContentType, input: ContentInput): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .upsert(toInsert(type, input), { onConflict: 'type,slug' });
    if (error) throw error;
  },
};
