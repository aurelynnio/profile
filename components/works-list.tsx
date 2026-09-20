'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/section';
import PageIntro from '@/components/page-intro';
import { useUiStore, useTranslation } from '@/stores/ui-store';
import type { Project } from '@/lib/content-types';

const WorkRow: React.FC<{
  work: Project;
  buttonText: string;
  index: number;
}> = ({ work, buttonText, index }) => {
  const language = useUiStore((s) => s.language);

  return (
    <Link href={`/works/${work.slug}`} className="surface-card group flex flex-col sm:flex-row overflow-hidden">
      <div className="relative w-full sm:w-[46%] aspect-video sm:aspect-auto sm:min-h-[230px] shrink-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-stone-200 dark:border-white/10">
        <Image
          src={work.cover}
          alt={work.title}
          fill
          sizes="(max-width: 640px) 100vw, 380px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={index === 0}
        />
      </div>
      <div className="grow p-5 md:p-6 flex flex-col">
        <h4 className="text-xl font-serif font-bold text-ink dark:text-stone-100 group-hover:text-jade transition-colors">
          {work.title}
        </h4>
        <p className="text-base text-stone-600 dark:text-stone-300 font-light mt-1.5 leading-relaxed">
          {work.subtitle[language]}
        </p>
        <p className="text-sm text-stone-500 dark:text-stone-400 font-light mt-3 line-clamp-3 leading-relaxed">
          {work.description[language]}
        </p>
        {work.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {work.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-stone-300 dark:border-stone-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="inline-block mt-4 text-xs font-medium text-jade">
          {buttonText} →
        </span>
      </div>
    </Link>
  );
};

interface WorksListProps {
  works: Project[];
}

export default function WorksList({ works }: WorksListProps) {
  const t = useTranslation();

  return (
    <div>
      <Section>
        <PageIntro title={t('works.title')} kicker={t('works.kicker')} description={t('works.description')} />
      </Section>

      <div className="space-y-8 pb-10">
        {works.map((work, index) => (
          <Section key={work.slug} delay={index * 0.1}>
            <WorkRow work={work} buttonText={t('works.read_more')} index={index} />
          </Section>
        ))}
      </div>
    </div>
  );
}