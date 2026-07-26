import type { ContentType } from '@/lib/content-types';

export const queryKeys = {
  content: {
    all: ['content'] as const,
    list: (type: ContentType) => ['content', type, 'list'] as const,
    detail: (type: ContentType, slug: string) => ['content', type, 'detail', slug] as const,
  },
};
