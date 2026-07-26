'use client';

import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/section';
import PageIntro from '@/components/page-intro';
import { EmptyState, LoadingState } from '@/components/content-state';
import { useContentList } from '@/hooks/use-content';
import { useUiStore } from '@/stores/ui-store';
import type { ContentCard } from '@/lib/content-types';

const ProjectCard: React.FC<{
  project: ContentCard;
  buttonText: string;
}> = ({ project, buttonText }) => (
  <Link href={`/works/${project.slug}`} className="w-full group cursor-pointer block">
    <div className="w-full h-48 mb-4 overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10 relative">
      <Image
        src={project.thumbnail || '/images/placeholder.svg'}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.3]"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    </div>
    <div className="text-center px-2">
      <h4 className="mt-3 text-xl font-serif font-bold text-ink dark:text-stone-100 group-hover:text-jade transition-colors">
        {project.title}
      </h4>
      <p className="text-base text-stone-600 dark:text-stone-300 font-light mt-1 line-clamp-2">
        {project.description}
      </p>
      <span className="inline-block mt-3 text-xs font-medium text-jade opacity-100 md:opacity-0 transform translate-y-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
        {buttonText} →
      </span>
    </div>
  </Link>
);

export default function WorksPage() {
  const t = useUiStore((s) => s.t);
  const { data: projects, isLoading, isError } = useContentList('works');

  return (
    <div>
      <Section>
        <PageIntro title={t('works.title')} kicker={t('works.kicker')} description={t('works.description')} />
      </Section>

      {isError ? (
        <EmptyState title={t('content.unavailable_title')} description={t('content.unavailable_desc')} />
      ) : isLoading || !projects ? (
        <LoadingState label={t('works.loading')} />
      ) : projects.length === 0 ? (
        <EmptyState title={t('works.empty_title')} description={t('works.empty_desc')} />
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Section key={project.slug} delay={index * 0.1}>
              <ProjectCard project={project} buttonText={t('works.read_more')} />
            </Section>
          ))}
        </div>
      )}
    </div>
  );
}
