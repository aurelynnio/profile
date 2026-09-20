'use client';

import React, { Suspense, useState, startTransition } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '@/components/section';
import MarkdownRenderer from '@/components/markdown-renderer';
import { useUiStore, useTranslation } from '@/stores/ui-store';
import type { Project } from '@/lib/content-types';

const Loading3D = () => {
  const t = useTranslation();
  return (
    <div className="h-full w-full flex items-center justify-center relative">
      <div className="text-stone-400 animate-pulse relative z-10">{t('home.loading_3d')}</div>
    </div>
  );
};

const ScholarRock = dynamic(() => import('@/components/scholar-rock'), {
  ssr: false,
  loading: Loading3D,
});

const WorkCard: React.FC<{ work: Project }> = ({ work }) => {
  const t = useTranslation();
  const language = useUiStore((s) => s.language);

  return (
    <Link
      href={`/works/${work.slug}`}
      className="surface-card group flex flex-col sm:flex-row overflow-hidden"
    >
      <div className="relative w-full sm:w-[46%] aspect-video sm:aspect-auto sm:min-h-[210px] shrink-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-stone-200 dark:border-white/10">
        <Image
          src={work.cover}
          alt={work.title}
          fill
          sizes="(max-width: 640px) 100vw, 350px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="grow p-5 md:p-6 flex flex-col">
        <h4 className="text-xl font-serif font-bold text-ink dark:text-stone-100 group-hover:text-jade transition-colors">
          {work.title}
        </h4>
        <p className="text-base text-stone-600 dark:text-stone-300 font-light mt-1.5 leading-relaxed">
          {work.subtitle[language]}
        </p>
        {work.status && (
          <span className="inline-flex self-start mt-3 rounded border border-jade/30 bg-jade/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-jade dark:bg-jade/15">
            {work.status[language]}
          </span>
        )}
        <span className="inline-block mt-4 text-xs font-medium text-jade">
          {t('works.read_more')} →
        </span>
      </div>
    </Link>
  );
};

interface HomeContentProps {
  works: Project[];
  experiments: Project[];
}

export default function HomeContent({ works, experiments }: HomeContentProps) {
  const t = useTranslation();
  const [shouldRender3D, setShouldRender3D] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => setShouldRender3D(true));
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-4">
      <Section>
        <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center mb-6 border border-white/40 dark:border-white/10 backdrop-blur-sm" style={{ transform: 'translateZ(0)' }}>
          <motion.p
            className="text-stone-700 dark:text-stone-300 font-serif italic inline-block"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 -20% 0 0)' }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          >
            {t('home.greeting')}
          </motion.p>
        </div>
      </Section>

      <Section delay={0.1}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="grow text-center md:text-left">
            <h2 className="text-4xl font-brush font-bold text-ink dark:text-stone-100 mb-3 tracking-wide">
              Quoc Anh
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-lg font-serif tracking-wider">
              {t('home.role')}
            </p>
          </div>
          <div className="shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-stone-100 dark:ring-stone-800 border border-stone-200 dark:border-white/10 relative group">
              <Image
                src="/img/av.png"
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="relative w-full my-8 py-4 flex flex-col items-center justify-center">
          <div className="w-full relative z-10 h-[400px]">
            {shouldRender3D ? (
              <Suspense fallback={<div className="text-stone-400 animate-pulse">{t('home.loading_3d')}</div>}>
                <ScholarRock />
              </Suspense>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-stone-400 animate-pulse">{t('home.loading_3d')}</div>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section delay={0.3}>
        <h3 className="text-2xl font-serif font-bold underline decoration-2 decoration-cinnabar/30 dark:decoration-cinnabar-light/30 underline-offset-8 mb-6 text-ink dark:text-stone-100">
          {t('home.works_title')}
        </h3>
        <div className="text-stone-700 dark:text-stone-300 leading-relaxed text-lg mb-8 font-sans text-justify">
          <MarkdownRenderer content={t('home.works_desc')} />
        </div>
        <div className="space-y-6 mb-8">
          {works.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
        <div className="flex justify-center mb-6">
          <Link href="/works" className="button-primary group">
            {t('home.works_btn')}{' '}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Section delay={0.35}>
        <h3 className="text-2xl font-serif font-bold underline decoration-2 decoration-cinnabar/30 dark:decoration-cinnabar-light/30 underline-offset-8 mb-4 text-ink dark:text-stone-100">
          {t('home.experiments_title')}
        </h3>
        <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-lg font-sans mb-6">
          {t('home.experiments_desc')}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {experiments.map((experiment) => (
            <Link key={experiment.slug} href={`/experiments/${experiment.slug}`} className="group">
              <div className="relative aspect-video rounded-xl border border-stone-200 dark:border-white/10 overflow-hidden">
                <Image
                  src={experiment.cover}
                  alt={experiment.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 220px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-xs font-medium text-stone-600 dark:text-stone-300 group-hover:text-jade transition-colors truncate">
                {experiment.title}
              </p>
              {experiment.experiment && (
                <p className="text-[10px] font-mono text-stone-400 dark:text-stone-400 truncate">
                  {experiment.experiment.name}
                </p>
              )}
            </Link>
          ))}
        </div>
        <div className="flex justify-center my-10">
          <Link href="/experiments" className="button-outline group">
            {t('home.experiments_btn')}{' '}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Section delay={0.4}>
        <h3 className="text-2xl font-serif font-bold underline decoration-2 decoration-cinnabar/30 dark:decoration-cinnabar-light/30 underline-offset-8 mb-6 text-ink dark:text-stone-100">
          {t('home.bio_title')}
        </h3>
        <div className="space-y-4">
          {[
            { year: '2004', key: 'home.born' as const },
            { year: '2022', key: 'home.study' as const },
            { year: '2023', key: 'home.first_web' as const },
            { year: '2025', key: 'home.web_products' as const },
          ].map((row) => (
            <div key={row.year} className="flex gap-3 group hover:bg-white/50 dark:hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2">
              <span className="font-bold text-ink dark:text-stone-200 font-serif text-base pt-1 min-w-12">
                {row.year}
              </span>
              <span className="text-stone-700 dark:text-stone-300 text-lg font-sans">
                {t(row.key)}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section delay={0.5}>
        <h3 className="text-2xl font-serif font-bold underline decoration-2 decoration-cinnabar/30 dark:decoration-cinnabar-light/30 underline-offset-8 mb-6 text-ink dark:text-stone-100">
          {t('home.love_title')}
        </h3>
        <div className="text-stone-700 dark:text-stone-300 leading-loose text-lg font-sans">
          <MarkdownRenderer content={t('home.love_desc')} />
        </div>
      </Section>
    </div>
  );
}
