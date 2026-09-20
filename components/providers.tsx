'use client';

import React, { useEffect } from 'react';
import { useUiStore } from '@/stores/ui-store';

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = useUiStore((s) => s.theme);
  const language = useUiStore((s) => s.language);

  // Read persisted language/theme only after mount, so the first client render
  // matches the server HTML (avoids a hydration mismatch).
  useEffect(() => {
    useUiStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  return <>{children}</>;
}
