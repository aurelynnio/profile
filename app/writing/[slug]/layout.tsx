import type { Metadata } from 'next';
import { getPost } from '@/lib/writing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: post.title.en,
    description: post.summary.en,
    openGraph: {
      title: `${post.title.en} | GuoYing`,
      description: post.summary.en,
      type: 'article',
    },
  };
}

export default function PostDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}