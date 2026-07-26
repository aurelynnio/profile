'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import ThemeToggle from './theme-toggle';
import { useUiStore } from '@/stores/ui-store';

const navItems = [
  { path: '/', labelKey: 'nav.about' },
  { path: '/works', labelKey: 'nav.works' },
  { path: '/posts', labelKey: 'nav.posts' },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const t = useUiStore((s) => s.t);
  const language = useUiStore((s) => s.language);
  const toggleLanguage = useUiStore((s) => s.toggleLanguage);

  const isPathActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <div className="fixed top-6 w-full z-50 flex justify-center pointer-events-none px-4">
      <nav
        className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-[#f0e7db]/25 dark:bg-[#202023]/80 backdrop-blur-md border border-white/20 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 transition-colors duration-500 max-w-full overflow-hidden"
        style={{ transform: 'translateZ(0)', contain: 'layout style' }}
      >
        <div className="flex items-center">
          {navItems.map((item) => {
            const isActive = isPathActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={clsx(
                  'relative px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap',
                  isActive
                    ? 'text-cinnabar dark:text-cinnabar-light font-serif font-bold'
                    : 'text-stone-500 dark:text-stone-300 hover:text-ink dark:hover:text-stone-100 font-serif',
                )}
              >
                {t(item.labelKey)}
                {isActive && (
                  <motion.div
                    layoutId="navbar-bg"
                    className="absolute inset-0 bg-stone-100 dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700 z-[-1]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="w-px h-4 bg-stone-300 dark:bg-stone-700 mx-1 shrink-0" />

        <div className="flex items-center gap-1 pr-1 shrink-0">
          <button
            onClick={toggleLanguage}
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-stone-500 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-700/50 transition-colors"
            aria-label="Switch Language"
          >
            <span className="font-serif font-bold text-xs md:text-sm pt-0.5">
              {language === 'en' ? 'EN' : '中'}
            </span>
          </button>

          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
