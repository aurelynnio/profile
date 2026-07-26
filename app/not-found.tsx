'use client';

import Link from 'next/link';
import Section from '@/components/section';
import { useUiStore } from '@/stores/ui-store';

export default function NotFound() {
  const t = useUiStore((s) => s.t);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center pt-20">
      <Section>
        <h1 className="text-9xl font-serif font-bold text-stone-200 dark:text-stone-800 select-none opacity-50">
          404
        </h1>
        <div className="-mt-12 relative z-10">
          <h2 className="text-2xl font-serif font-bold text-ink dark:text-stone-100 mb-4">
            {t('not_found.title')}
          </h2>
          <p className="text-stone-600 dark:text-stone-300 mb-8 font-light">
            {t('not_found.desc')}
          </p>
          <Link href="/" className="button-primary bg-jade hover:bg-jade">
            {t('not_found.home_btn')}
          </Link>
        </div>
      </Section>
    </div>
  );
}
