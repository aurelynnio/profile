'use client';

import React from 'react';
import Image from 'next/image';
import Section from '@/components/section';
import { useUiStore, useTranslation } from '@/stores/ui-store';
import type { ProjectScreen, ProjectSystem } from '@/lib/content-types';

/**
 * Captured application screens, each paired with the specs behind it.
 */
export const ProjectScreens: React.FC<{ screens: ProjectScreen[] }> = ({ screens }) => {
  const t = useTranslation();
  const language = useUiStore((s) => s.language);

  return (
    <>
      <Section>
        <div className="page-intro">
          <p className="page-kicker">{t('screens.kicker')}</p>
          <h2 className="page-title">{t('screens.title')}</h2>
          <p className="page-description">
            {t('screens.description')}{' '}
            <span className="font-mono text-xs text-stone-400 dark:text-stone-500">
              {screens.length} {t('screens.count')}
            </span>
          </p>
        </div>
      </Section>

      <div className="space-y-6">
        {screens.map((screen, index) => (
          <Section key={`${screen.route}-${screen.src}`} delay={Math.min(index * 0.05, 0.3)}>
            <article className="surface-card overflow-hidden md:grid md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
              <div
                className={`relative aspect-[16/10] border-b border-stone-200 dark:border-white/10 md:border-b-0 ${
                  index % 2 === 1 ? 'md:order-2 md:border-l' : 'md:border-r'
                }`}
              >
                <Image
                  src={screen.src}
                  alt={screen.title[language]}
                  fill
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="object-cover object-top"
                />
              </div>

              <div className="flex flex-col p-5 md:p-7">
                <div className="flex items-center gap-2">
                  <span className="meta-label">{t('screens.route')}</span>
                  <code className="font-mono text-xs text-stone-500 dark:text-stone-400">
                    {screen.route}
                  </code>
                </div>

                <h3 className="mt-4 font-serif text-xl font-bold text-ink dark:text-stone-100">
                  {screen.title[language]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {screen.description[language]}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-stone-200 pt-4 dark:border-white/10">
                  {screen.specs.map((spec) => (
                    <li
                      key={spec.en}
                      className="flex gap-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300"
                    >
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-jade" />
                      <span>{spec[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Section>
        ))}
      </div>
    </>
  );
};

/**
 * Engineering systems that do not show up in a screenshot.
 */
export const ProjectSystems: React.FC<{ systems: ProjectSystem[] }> = ({ systems }) => {
  const t = useTranslation();
  const language = useUiStore((s) => s.language);

  return (
    <Section>
      <div className="page-intro">
        <p className="page-kicker">{t('systems.kicker')}</p>
        <h2 className="page-title">{t('systems.title')}</h2>
        <p className="page-description">{t('systems.description')}</p>
      </div>

      <ol className="surface-card divide-y divide-stone-200 dark:divide-white/10">
        {systems.map((system, index) => (
          <li key={system.name} className="flex flex-col gap-2 p-5 md:flex-row md:gap-6 md:p-6">
            <span className="font-mono text-xs text-stone-400 dark:text-stone-500 md:w-8 md:pt-1">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="grow">
              <h3 className="font-serif text-base font-bold text-ink dark:text-stone-100">
                {system.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {system.summary[language]}
              </p>
              {system.where && (
                <p className="mt-2 font-mono text-[11px] text-stone-400 dark:text-stone-500">
                  {t('systems.where')}: {system.where}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
};