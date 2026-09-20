'use client';

import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import Section from '@/components/section';
import PageIntro from '@/components/page-intro';
import { useUiStore, useTranslation } from '@/stores/ui-store';
import type { Post } from '@/lib/content-types';

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const language = useUiStore((s) => s.language);

  return (
    <Link href={`/writing/${post.slug}`} className="block group cursor-pointer mb-8 md:mb-10">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
        <h4 className="text-lg md:text-xl font-serif font-bold text-ink dark:text-stone-100 group-hover:text-jade transition-colors group-hover:underline decoration-1 underline-offset-4">
          {post.title[language]}
        </h4>
        <span className="text-xs font-mono text-stone-400 dark:text-stone-300 shrink-0 sm:ml-4 mt-1 sm:mt-0">
          {format(new Date(post.date), 'yyyy-MM-dd')}
        </span>
      </div>
      <p className="text-stone-600 dark:text-stone-300 text-base font-light line-clamp-2 leading-relaxed">
        {post.summary[language]}
      </p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-stone-400 dark:text-stone-400">
              #{tag.toLowerCase()}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};

interface WritingListProps {
  posts: Post[];
}

export default function WritingList({ posts }: WritingListProps) {
  const t = useTranslation();

  return (
    <div>
      <Section>
        <PageIntro title={t('writing.title')} kicker={t('writing.kicker')} description={t('writing.description')} />
      </Section>

      <div className="max-w-3xl pb-10">
        {posts.map((post, index) => (
          <Section key={post.slug} delay={index * 0.1}>
            <PostItem post={post} />
          </Section>
        ))}
      </div>
    </div>
  );
}
