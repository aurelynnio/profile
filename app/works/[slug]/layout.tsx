import type { Metadata } from 'next';
import { getWork } from '@/lib/works';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: 'Project not found' };

  return {
    title: work.title,
    description: work.description.en,
    openGraph: {
      title: `${work.title} | GuoYing`,
      description: work.description.en,
      type: 'article',
      images: [{ url: work.cover }],
    },
  };
}

export default function WorkDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}