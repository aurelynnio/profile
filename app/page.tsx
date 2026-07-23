'use client';

import React, { Suspense, useState, startTransition } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '@/components/section';
import MarkdownRenderer from '@/components/markdown-renderer';
import { useUiStore } from '@/stores/ui-store';

const ScholarRock = dynamic(() => import('@/components/scholar-rock'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center relative">
      <div className="text-stone-400 animate-pulse relative z-10">Loading 3D...</div>
    </div>
  ),
});

export default function HomePage() {
  const t = useUiStore((s) => s.t);
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
            <p className="text-stone-600 dark:text-stone-400 text-lg font-serif tracking-wider">
              {t('home.role')}
            </p>
          </div>
          <div className="shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-stone-100 dark:ring-stone-800 border border-stone-200 dark:border-white/10 relative group">
              <img
                src="/img/av.png"
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-110"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="relative w-full my-8 py-4 flex flex-col items-center justify-center">
          <div className="w-full relative z-10 h-[400px]">
            {shouldRender3D ? (
              <Suspense fallback={<div className="text-stone-400 animate-pulse">Loading 3D...</div>}>
                <ScholarRock />
              </Suspense>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-stone-400 animate-pulse">Loading 3D...</div>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section delay={0.3}>
        <h3 className="text-2xl font-serif font-bold underline decoration-2 decoration-cinnabar/30 dark:decoration-cinnabar-light/30 underline-offset-8 mb-6 text-ink dark:text-stone-100">
          {t('home.work_title')}
        </h3>
        <div className="text-stone-700 dark:text-stone-300 leading-relaxed text-lg mb-6 font-sans text-justify">
          <MarkdownRenderer content={t('home.work_desc')} />
        </div>
        <div className="flex justify-center my-10">
          <Link href="/works" className="button-primary group">
            {t('home.portfolio_btn')}{' '}
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
            { year: '2022', key: 'home.master' as const },
            { year: '2025', key: 'home.freelance' as const },
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
