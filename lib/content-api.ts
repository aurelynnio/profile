import { apiClient } from './api-client';
import type { ContentCard, ContentType } from '@/lib/content-types';

/** Flatten a ContentRecord into a ContentCard the UI consumes. */
const toCard = (record: any): ContentCard => {
  const { id, type, createdAt, updatedAt, isPublished, metadata = {}, ...rest } = record;
  return {
    ...rest,
    link: metadata.link,
    platform: metadata.platform,
    stack: metadata.stack,
    source: metadata.source,
    blogpost: metadata.blogpost,
    role: metadata.Role,
    status: metadata['Current Status'],
    yearBadge: metadata.yearBadge,
  } as ContentCard;
};

export const contentApi = {
  list: async (type: ContentType): Promise<ContentCard[]> => {
    const { data } = await apiClient.get(`/content/${type}`);
    return data.map(toCard);
  },
  getBySlug: async (type: ContentType, slug: string): Promise<ContentCard | null> => {
    try {
      const { data } = await apiClient.get(`/content/${type}/${encodeURIComponent(slug)}`);
      return toCard(data);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) return null;
      throw error;
    }
  },
};
