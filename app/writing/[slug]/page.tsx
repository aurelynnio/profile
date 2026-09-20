import { notFound } from 'next/navigation';
import PostDetail from '@/components/writing-detail';
import { getPost, writing } from '@/lib/writing';

export const dynamicParams = false;

export function generateStaticParams() {
  return writing.map((post) => ({ slug: post.slug }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} />;
}