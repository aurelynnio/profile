'use client';

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
  t: (key: TranslationKey) => string;
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
    (set, get) => ({
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
      t: (key) => {
        const { language } = get();
        return dictionaries[language][key] || en[key] || key;
      },
    }),
    {
      name: 'profile-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ language: state.language, theme: state.theme }),
    },
  ),
);
