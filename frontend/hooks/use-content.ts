import { useQuery } from '@tanstack/react-query';
import { contentApi } from '@/lib/content-api';
import { queryKeys } from '@/lib/query-keys';
import type { ContentType } from '@/lib/content-types';

export function useContentList(type: ContentType) {
  return useQuery({
    queryKey: queryKeys.content.list(type),
    queryFn: () => contentApi.list(type),
  });
}

export function useContentDetail(type: ContentType, slug: string) {
  return useQuery({
    queryKey: queryKeys.content.detail(type, slug),
    queryFn: () => contentApi.getBySlug(type, slug),
    enabled: Boolean(slug),
  });
}
