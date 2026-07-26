'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Section from '@/components/section';
import MarkdownRenderer from '@/components/markdown-renderer';
import { EmptyState, LoadingState } from '@/components/content-state';
import { useContentDetail } from '@/hooks/use-content';
import { useUiStore } from '@/stores/ui-store';

export default function PostDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const t = useUiStore((s) => s.t);
  const { data: post, isLoading, isError } = useContentDetail('writing', slug);

  if (isLoading) return <LoadingState label={t('article.loading')} />;

  if (!post) {
    return (
      <EmptyState
        title={isError ? t('content.unavailable_title') : t('article.missing_title')}
        description={isError ? t('content.unavailable_desc') : t('article.missing_desc')}
        action={{ label: isError ? t('back') : t('article.browse'), to: '/posts' }}
      />
    );
  }

  return (
    <div className="pb-20">
      <Section>
        <Link href="/posts" className="button-secondary group mb-8">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t('back')}
        </Link>
      </Section>

      <article>
        <Section delay={0.1}>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink dark:text-stone-100 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-stone-500 dark:text-stone-300 font-mono mb-8">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {format(new Date(post.date), 'MMMM dd, yyyy')}
              </span>
            </div>
            {post.thumbnail && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 relative">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </Section>

        <Section delay={0.2}>
          <div className="surface-card mx-auto max-w-2xl p-5 md:p-12">
            <MarkdownRenderer content={post.body} />
            <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-700 text-center font-serif italic text-stone-400">
              ***
            </div>
          </div>
        </Section>
      </article>
    </div>
  );
}
