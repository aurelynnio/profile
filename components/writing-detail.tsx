'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Section from '@/components/section';
import MarkdownRenderer from '@/components/markdown-renderer';
import { useUiStore, useTranslation } from '@/stores/ui-store';
import type { Post } from '@/lib/content-types';

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const t = useTranslation();
  const language = useUiStore((s) => s.language);

  return (
    <div className="pb-20">
      <Section>
        <Link href="/writing" className="button-secondary group mb-8">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t('detail.back')}
        </Link>
      </Section>

      <article>
        <Section delay={0.1}>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink dark:text-stone-100 mb-6 leading-tight">
              {post.title[language]}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-stone-500 dark:text-stone-300 font-mono mb-8">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {format(new Date(post.date), 'MMMM dd, yyyy')}
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="text-stone-400 dark:text-stone-400">
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section delay={0.2}>
          <div className="surface-card mx-auto max-w-2xl p-5 md:p-12">
            <MarkdownRenderer content={post.body[language]} />
            <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-700 text-center font-serif italic text-stone-400">
              ***
            </div>
          </div>
        </Section>
      </article>
    </div>
  );
}
