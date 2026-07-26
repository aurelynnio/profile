'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import Section from '@/components/section';
import PageIntro from '@/components/page-intro';
import { EmptyState, LoadingState } from '@/components/content-state';
import { useContentList } from '@/hooks/use-content';
import { useUiStore } from '@/stores/ui-store';
import type { ContentCard } from '@/lib/content-types';

const PostItem: React.FC<{ post: ContentCard }> = ({ post }) => (
  <Link href={`/posts/${post.slug}`} className="block group cursor-pointer mb-8 md:mb-10">
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
      <h4 className="text-lg md:text-xl font-serif font-bold text-ink dark:text-stone-100 group-hover:text-jade transition-colors group-hover:underline decoration-1 underline-offset-4">
        {post.title}
      </h4>
      <span className="text-xs font-mono text-stone-400 dark:text-stone-300 shrink-0 sm:ml-4 mt-1 sm:mt-0">
        {format(new Date(post.date), 'yyyy-MM-dd')}
      </span>
    </div>
    <p className="text-stone-600 dark:text-stone-300 text-base font-light line-clamp-2 leading-relaxed">
      {post.summary || post.description}
    </p>
  </Link>
);

export default function PostsPage() {
  const t = useUiStore((s) => s.t);
  const { data: posts, isLoading, isError } = useContentList('writing');

  return (
    <div>
      <Section>
        <PageIntro title={t('posts.title')} kicker={t('posts.kicker')} description={t('posts.description')} />
      </Section>

      {isError ? (
        <EmptyState title={t('content.unavailable_title')} description={t('content.unavailable_desc')} />
      ) : isLoading || !posts ? (
        <LoadingState label={t('posts.loading')} />
      ) : posts.length === 0 ? (
        <EmptyState title={t('posts.empty_title')} description={t('posts.empty_desc')} />
      ) : (
        <div className="max-w-3xl">
          {posts.map((post, index) => (
            <Section key={post.slug} delay={index * 0.1}>
              <PostItem post={post} />
            </Section>
          ))}
        </div>
      )}
    </div>
  );
}
