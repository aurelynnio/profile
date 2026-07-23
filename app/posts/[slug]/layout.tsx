import type { Metadata } from 'next';
import { apiClient } from '@/lib/api-client';
import type { ContentCard } from '@/shared/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await apiClient.get(`/content/writing/${slug}`);
    const card = data as ContentCard;
    return {
      title: card.title,
      description: card.description || card.summary,
      openGraph: {
        title: `${card.title} | GuoYing`,
        description: card.description || card.summary,
        type: 'article',
        images: card.thumbnail ? [{ url: card.thumbnail }] : undefined,
      },
    };
  } catch {
    return { title: 'Post not found' };
  }
}

export default function PostDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
