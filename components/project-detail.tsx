'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Section from '@/components/section';
import MarkdownRenderer from '@/components/markdown-renderer';
import ProjectMetadata from '@/components/project-metadata';
import VideoFacade from '@/components/video-facade';
import { ProjectScreens, ProjectSystems } from '@/components/project-screens';
import { useUiStore, useTranslation } from '@/stores/ui-store';
import type { Project } from '@/lib/content-types';
import type { TranslationKey } from '@/messages/en';

interface ProjectDetailProps {
  project: Project;
  backHref: string;
  backLabelKey: TranslationKey;
}

/**
 * Shared detail view for web projects and experiments.
 */
const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  backHref,
  backLabelKey,
}) => {
  const t = useTranslation();
  const language = useUiStore((s) => s.language);
  const backLabel = t(backLabelKey);

  return (
    <div className="pb-20">
      <Section>
        <div className="flex items-center gap-1.5 mb-8 text-sm font-medium">
          <Link href={backHref} className="button-secondary group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {backLabel}
          </Link>
          <span className="text-stone-400 dark:text-stone-500 opacity-50 dark:opacity-70 px-1">&gt;</span>
          <h1 className="text-xl font-bold text-ink dark:text-stone-100 truncate">
            {project.title}
          </h1>
          <span className="bg-stone-200/50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-1.5 py-0.5 rounded text-[10px] font-mono ml-1">
            {project.yearBadge}
          </span>
        </div>
      </Section>

      <Section delay={0.1}>
        <div className="mb-10">
          {project.trailerId ? (
            <VideoFacade
              title={project.title}
              poster={project.cover}
              youtubeId={project.trailerId}
              watchLabel={t('project.watch')}
            />
          ) : (
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-stone-200 dark:border-white/10 relative">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 960px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-stone-300 dark:border-stone-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-lg text-stone-700 dark:text-stone-300 font-light leading-relaxed mb-8 max-w-3xl">
            {project.description[language]}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            {project.websiteUrl && (
              <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="button-primary">
                <Globe size={16} /> {t('project.website')}
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="button-jade">
                <ExternalLink size={16} /> {t('project.demo')}
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="button-outline">
                <FaGithub size={16} /> {t('project.github')}
              </a>
            )}
          </div>

          <ProjectMetadata project={project} />
        </div>
      </Section>

      <Section delay={0.3}>
        <MarkdownRenderer content={project.body[language]} />
      </Section>

      {project.screens && project.screens.length > 0 && (
        <div className="mt-16">
          <ProjectScreens screens={project.screens} />
        </div>
      )}

      {project.systems && project.systems.length > 0 && (
        <div className="mt-16">
          <ProjectSystems systems={project.systems} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
