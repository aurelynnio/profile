'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/section';
import PageIntro from '@/components/page-intro';
import { useUiStore, useTranslation } from '@/stores/ui-store';
import type { Project } from '@/lib/content-types';

const ExperimentCard: React.FC<{
  experiment: Project;
  buttonText: string;
}> = ({ experiment, buttonText }) => {
  const language = useUiStore((s) => s.language);

  return (
    <Link href={`/experiments/${experiment.slug}`} className="group block">
      <div className="w-full aspect-video mb-4 overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10 relative">
        <Image
          src={experiment.cover}
          alt={experiment.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.3]"
        />
        {experiment.experiment && (
          <span className="absolute top-3 left-3 bg-black/60 text-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
            {experiment.experiment.name}
          </span>
        )}
      </div>
      <div className="text-center px-2">
        <h4 className="mt-3 text-xl font-serif font-bold text-ink dark:text-stone-100 group-hover:text-jade transition-colors">
          {experiment.title}
        </h4>
        <p className="text-base text-stone-600 dark:text-stone-300 font-light mt-1 line-clamp-2">
          {experiment.subtitle[language]}
        </p>
        {experiment.experiment && (
          <p className="text-[11px] font-mono text-stone-400 dark:text-stone-400 mt-2">
            {experiment.experiment.theme} · {experiment.experiment.duration}
          </p>
        )}
        <span className="inline-block mt-3 text-xs font-medium text-jade opacity-100 md:opacity-0 transform translate-y-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
          {buttonText} →
        </span>
      </div>
    </Link>
  );
};

interface ExperimentsListProps {
  experiments: Project[];
}

export default function ExperimentsList({ experiments }: ExperimentsListProps) {
  const t = useTranslation();

  return (
    <div>
      <Section>
        <PageIntro title={t('experiments.title')} kicker={t('experiments.kicker')} description={t('experiments.description')} />
      </Section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pb-10">
        {experiments.map((experiment, index) => (
          <Section key={experiment.slug} delay={index * 0.1}>
            <ExperimentCard experiment={experiment} buttonText={t('experiments.read_more')} />
          </Section>
        ))}
      </div>
    </div>
  );
}