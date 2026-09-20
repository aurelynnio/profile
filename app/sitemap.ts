import type { MetadataRoute } from 'next';
import { works } from '@/lib/works';
import { experiments } from '@/lib/experiments';
import { writing } from '@/lib/writing';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://example.com';
  const staticRoutes = ['', '/works', '/experiments', '/writing'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const projectRoutes = [...works, ...experiments].map((item) => ({
    url: `${base}/${item.kind === 'work' ? 'works' : 'experiments'}/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const postRoutes = writing.map((item) => ({
    url: `${base}/writing/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}