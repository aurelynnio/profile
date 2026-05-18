import React, { Suspense, lazy } from 'react';
import Section from '../components/Section';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MarkdownRenderer from '../components/MarkdownRenderer';

const ScholarRock = lazy(
  () => import('../components/ScholarRock'),
);

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [shouldRender3D, setShouldRender3D] =
    React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      React.startTransition(() => {
        setShouldRender3D(true);
      });
    }, 800); // Delay to allow page transition to finish smoothly
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-4">
      <Section>
        <div className="card-surface rounded-[1.75rem] p-4 text-center mb-6">
          <motion.p
            className="inline-flex items-center gap-3 text-stone-700 dark:text-stone-300"
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            <span className="eyebrow">
              {t('home.intro_eyebrow')}
            </span>
            {t('home.greeting')}
          </motion.p>
        </div>
      </Section>

      <Section delay={0.1}>
        <div className="card-surface-strong mb-8 flex flex-col items-center gap-8 rounded-[2rem] px-6 py-8 md:flex-row md:items-start md:px-8">
          <div className="grow text-center md:text-left">
            <h2 className="text-5xl font-brush font-bold text-ink dark:text-stone-100 md:text-6xl mb-3 tracking-wide">
              Quoc Anh
            </h2>
            <p className="text-lg font-serif tracking-[0.08em] text-stone-600 dark:text-stone-400">
              {t('home.role')}
            </p>
          </div>
          <div className="shrink-0">
            <div className="group relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-white/70 shadow-xl dark:ring-stone-800">
              <img
                src="/img/av.jpg"
                alt="Profile"
                width="128"
                height="128"
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-110"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="relative my-8 flex w-full flex-col items-center justify-center py-4">
          <div className="w-full relative z-10 h-[400px]">
            {shouldRender3D ? (
              <Suspense
                fallback={
                  <div className="loading-state h-full w-full relative">
                    <div
                      className="absolute w-[300px] h-[300px] rounded-full dark:opacity-20 opacity-50"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(220,56,45,0.1) 0%, rgba(168,162,158,0.15) 100%)',
                      }}
                    />
                    <div className="relative z-10 text-sm uppercase tracking-[0.18em] text-faint">
                      {t('home.showcase_loading')}
                    </div>
                  </div>
                }
              >
                <ScholarRock />
              </Suspense>
            ) : (
              <div className="loading-state h-full w-full relative">
                <div
                  className="absolute w-[300px] h-[300px] rounded-full dark:opacity-20 opacity-50"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(220,56,45,0.1) 0%, rgba(168,162,158,0.15) 100%)',
                  }}
                />
                <div className="relative z-10 text-sm uppercase tracking-[0.18em] text-faint">
                  {t('home.showcase_loading')}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section delay={0.3}>
        <h3 className="section-title mb-6">
          {t('home.work_title')}
        </h3>
        <div className="card-surface rounded-[1.75rem] p-6 md:p-8 text-lg text-justify">
          <MarkdownRenderer
            content={t('home.work_desc')}
          />
        </div>
        <div className="flex justify-center my-10">
          <Link
            to="/works"
            className="btn-primary group font-serif"
          >
            {t('home.portfolio_btn')}{' '}
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </Section>

      <Section delay={0.4}>
        <h3 className="section-title mb-6">
          {t('home.bio_title')}
        </h3>
        <div className="card-surface rounded-[1.75rem] p-4 md:p-6 space-y-3">
          <div className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-white/50 dark:hover:bg-white/5">
            <span className="min-w-12 pt-1 text-base font-serif font-bold text-ink dark:text-stone-200">
              2004
            </span>
            <span className="text-lg font-sans text-stone-700 dark:text-stone-300">
              {t('home.born')}
            </span>
          </div>
          <div className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-white/50 dark:hover:bg-white/5">
            <span className="min-w-12 pt-1 text-base font-serif font-bold text-ink dark:text-stone-200">
              2022
            </span>
            <span className="text-lg font-sans text-stone-700 dark:text-stone-300">
              {t('home.master')}
            </span>
          </div>
          <div className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-white/50 dark:hover:bg-white/5">
            <span className="min-w-12 pt-1 text-base font-serif font-bold text-ink dark:text-stone-200">
              2025
            </span>
            <span className="text-lg font-sans text-stone-700 dark:text-stone-300">
              {t('home.freelance')}
            </span>
          </div>
        </div>
      </Section>

      <Section delay={0.5}>
        <h3 className="section-title mb-6">
          {t('home.love_title')}
        </h3>
        <div className="card-surface rounded-[1.75rem] p-6 md:p-8 text-lg">
          <MarkdownRenderer
            content={t('home.love_desc')}
          />
        </div>
      </Section>
    </div>
  );
};

export default Home;
