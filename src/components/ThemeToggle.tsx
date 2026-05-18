import React, {
  useEffect,
  useState,
} from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<string>(
    () => {
      if (typeof window !== 'undefined') {
        return (
          localStorage.getItem('theme') || 'light'
        );
      }
      return 'light';
    },
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'light' ? 'dark' : 'light',
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-700/50 transition-colors"
      aria-label="Toggle theme"
    >
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.div
          key={theme}
          initial={{
            y: -20,
            opacity: 0,
            rotate: -90,
          }}
          animate={{
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? (
            <Sun
              size={18}
              className="text-orange-400"
            />
          ) : (
            <Moon
              size={18}
              className="text-indigo-300"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
