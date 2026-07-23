'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import Section from '@/components/section';
import MarkdownRenderer from '@/components/markdown-renderer';
import ProjectMetadata from '@/components/project-metadata';
import { EmptyState, LoadingState } from '@/components/content-state';
import { useContentDetail } from '@/hooks/use-content';
import { useUiStore } from '@/stores/ui-store';

export default function WorkDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const t = useUiStore((s) => s.t);
  const { data: project, isLoading, isError } = useContentDetail('works', slug);

  if (isLoading) return <LoadingState label={t('project.loading')} />;

  if (!project) {
    return (
      <EmptyState
        title={isError ? t('content.unavailable_title') : t('project.missing_title')}
        description={isError ? t('content.unavailable_desc') : t('project.missing_desc')}
        action={{ label: isError ? t('back') : t('project.browse'), to: '/works' }}
      />
    );
  }

  return (
    <div className="pb-20">
      <Section>
        <div className="flex items-center gap-1.5 mb-8 text-sm font-medium">
          <Link href="/works" className="text-jade hover:underline transition-colors">
            Works
          </Link>
          <span className="text-stone-400 opacity-50 px-1">&gt;</span>
          <h1 className="text-xl font-bold text-ink dark:text-stone-100 truncate">
            {project.title}
          </h1>
          <span className="bg-stone-200/50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-1.5 py-0.5 rounded text-[10px] font-mono ml-1">
            {project.yearBadge || `${new Date(project.date).getFullYear()}-`}
          </span>
        </div>
      </Section>

      <Section delay={0.1}>
        <div className="mb-12">
          <p className="text-lg text-stone-700 dark:text-stone-300 font-light leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>
          <ProjectMetadata project={project} />
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-stone-200 dark:border-white/10 mb-10 relative">
          <Image
            src={project.thumbnail || '/images/placeholder.svg'}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </Section>

      <Section delay={0.3}>
        <MarkdownRenderer content={project.body} />
        {project.link && (
          <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex justify-center">
            <a
              href={project.link}
              className="button-primary bg-ink hover:bg-jade dark:bg-stone-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live <ExternalLink size={16} />
            </a>
          </div>
        )}
      </Section>
    </div>
  );
}
