'use client';

import { useCallback } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { en, type TranslationKey } from '@/messages/en';
import { zh } from '@/messages/zh';

type Language = 'en' | 'zh';
type Theme = 'light' | 'dark';

interface UiState {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const dictionaries = { en, zh };

/** Read initial theme from DOM (set by bootstrap script in layout.tsx). */
const getInitialTheme = (): Theme => {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const applyThemeClass = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: getInitialTheme(),
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === 'en' ? 'zh' : 'en' })),
      setTheme: (theme) => {
        applyThemeClass(theme);
        set({ theme });
      },
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'light' ? 'dark' : 'light';
          applyThemeClass(next);
          return { theme: next };
        }),
    }),
    {
      name: 'profile-ui',
      storage: createJSONStorage(() => localStorage),
      /**
       * Persisted state is read after mount (see Providers) so that the first
       * client render matches the server-rendered HTML and does not throw a
       * hydration mismatch when a non-default language is stored.
       */
      skipHydration: true,
      partialize: (state) => ({ language: state.language, theme: state.theme }),
    },
  ),
);

/**
 * Translator bound to the current language.
 * Subscribes to `language`, so every component calling it re-renders when the
 * language changes.
 */
export const useTranslation = () => {
  const language = useUiStore((s) => s.language);

  return useCallback(
    (key: TranslationKey) => dictionaries[language][key] ?? en[key] ?? key,
    [language],
  );
};
