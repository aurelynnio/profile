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
        <div
          className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center mb-6 border border-white/40 dark:border-white/10 backdrop-blur-sm"
          style={{ transform: 'translateZ(0)' }}
        >
          <motion.p
            className="text-stone-700 dark:text-stone-300 font-serif italic inline-block"
            initial={{
              clipPath: 'inset(0 100% 0 0)',
            }}
            animate={{
              clipPath: 'inset(0 -20% 0 0)',
            }}
            transition={{
              duration: 2.5,
              ease: 'easeOut',
            }}
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
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-stone-100 dark:ring-stone-800 shadow-xl relative group">
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

      {/* Redesigned 3D Stage Area */}
      <Section delay={0.2}>
        <div className="relative w-full my-8 py-4 flex flex-col items-center justify-center">
          <div className="w-full relative z-10 h-[400px]">
            {shouldRender3D ? (
              <Suspense
                fallback={
                  <div className="h-full w-full flex items-center justify-center relative">
                    <div
                      className="absolute w-[300px] h-[300px] rounded-full dark:opacity-20 opacity-50"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(220,56,45,0.1) 0%, rgba(168,162,158,0.15) 100%)',
                      }}
                    />
                    <div className="text-stone-400 animate-pulse relative z-10">
                      Loading 3D...
                    </div>
                  </div>
                }
              >
                <ScholarRock />
              </Suspense>
            ) : (
              <div className="h-full w-full flex items-center justify-center relative">
                <div
                  className="absolute w-[300px] h-[300px] rounded-full dark:opacity-20 opacity-50"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(220,56,45,0.1) 0%, rgba(168,162,158,0.15) 100%)',
                  }}
                />
                <div className="text-stone-400 animate-pulse relative z-10">
                  Loading 3D...
                </div>
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
          <MarkdownRenderer
            content={t('home.work_desc')}
          />
        </div>
        <div className="flex justify-center my-10">
          <Link
            to="/works"
            className="group flex items-center gap-2 bg-cinnabar hover:bg-cinnabar-light text-white px-6 py-3 rounded-full font-serif transition-all hover:shadow-xl hover:shadow-cinnabar/20 hover:-translate-y-0.5"
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
        <h3 className="text-2xl font-serif font-bold underline decoration-2 decoration-cinnabar/30 dark:decoration-cinnabar-light/30 underline-offset-8 mb-6 text-ink dark:text-stone-100">
          {t('home.bio_title')}
        </h3>
        <div className="space-y-4">
          <div className="flex gap-3 group hover:bg-white/50 dark:hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2">
            <span className="font-bold text-ink dark:text-stone-200 font-serif text-base pt-1 min-w-12">
              2004
            </span>
            <span className="text-stone-700 dark:text-stone-300 text-lg font-sans">
              {t('home.born')}
            </span>
          </div>
          <div className="flex gap-3 group hover:bg-white/50 dark:hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2">
            <span className="font-bold text-ink dark:text-stone-200 font-serif text-base pt-1 min-w-12">
              2022
            </span>
            <span className="text-stone-700 dark:text-stone-300 text-lg font-sans">
              {t('home.master')}
            </span>
          </div>
          <div className="flex gap-3 group hover:bg-white/50 dark:hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2">
            <span className="font-bold text-ink dark:text-stone-200 font-serif text-base pt-1 min-w-12">
              2025
            </span>
            <span className="text-stone-700 dark:text-stone-300 text-lg font-sans">
              {t('home.freelance')}
            </span>
          </div>
        </div>
      </Section>

      <Section delay={0.5}>
        <h3 className="text-2xl font-serif font-bold underline decoration-2 decoration-cinnabar/30 dark:decoration-cinnabar-light/30 underline-offset-8 mb-6 text-ink dark:text-stone-100">
          {t('home.love_title')}
        </h3>
        <div className="text-stone-700 dark:text-stone-300 leading-loose text-lg font-sans">
          <MarkdownRenderer
            content={t('home.love_desc')}
          />
        </div>
      </Section>
    </div>
  );
};

export default Home;
