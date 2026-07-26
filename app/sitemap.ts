import type { MetadataRoute } from 'next';
import { apiClient } from '@/lib/api-client';
import type { ContentCard } from '@/lib/content-types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://example.com';
  const staticRoutes = ['', '/works', '/posts'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  try {
    const [works, posts] = await Promise.all([
      apiClient.get<ContentCard[]>('/content/works'),
      apiClient.get<ContentCard[]>('/content/writing'),
    ]);
    const workRoutes = works.data.map((item) => ({
      url: `${base}/works/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
    const postRoutes = posts.data.map((item) => ({
      url: `${base}/posts/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
    return [...staticRoutes, ...workRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
