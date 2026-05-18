import React from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../context/LanguageContext';
import { clsx } from 'clsx';

const navItems = [
  { path: '/', labelKey: 'nav.about' },
  { path: '/works', labelKey: 'nav.works' },
  { path: '/posts', labelKey: 'nav.posts' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const { t, language, toggleLanguage } =
    useLanguage();

  const isPathActive = (path: string) => {
    if (path === '/')
      return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed top-6 w-full z-50 flex justify-center pointer-events-none px-4">
      <nav
        className="pointer-events-auto flex items-center gap-1 rounded-full card-surface px-1.5 py-1.5 max-w-full overflow-hidden"
        style={{
          transform: 'translateZ(0)',
          contain: 'layout style',
        }}
      >
        <div className="flex items-center">
          {navItems.map((item) => {
            const isActive = isPathActive(
              item.path,
            );
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'relative px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap',
                  isActive
                    ? 'text-cinnabar dark:text-cinnabar-light font-serif font-bold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-ink dark:hover:text-stone-200 font-serif',
                )}
              >
                {t(item.labelKey)}
                {isActive && (
                  <motion.div
                    layoutId="navbar-bg"
                    className="absolute inset-0 rounded-full bg-white/70 dark:bg-stone-800/80 shadow-sm z-[-1]"
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="w-px h-4 bg-stone-300/80 dark:bg-stone-700 mx-1 shrink-0" />

        <div className="flex items-center gap-1 pr-1 shrink-0">
          <button
            onClick={toggleLanguage}
            className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-700/60 md:h-9 md:w-9"
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
};

export default Navbar;
