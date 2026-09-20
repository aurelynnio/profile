'use client';

import { Github, Mail, Linkedin, Globe } from 'lucide-react';
import { useTranslation } from '@/stores/ui-store';

export default function Footer() {
  const t = useTranslation();
  return (
    <footer className="mt-32 pb-10 text-center text-stone-400 dark:text-stone-400 text-sm">
      <div className="flex justify-center space-x-8 mb-6">
        <a href="https://github.com/cyhinverse" aria-label="GitHub Profile" className="hover:text-jade transition-colors transform hover:scale-110 duration-300">
          <Github size={20} strokeWidth={1.5} />
        </a>
        <a href="https://www.linkedin.com/in/tranphanquocanh/" aria-label="LinkedIn Profile" className="hover:text-jade transition-colors transform hover:scale-110 duration-300">
          <Linkedin size={20} strokeWidth={1.5} />
        </a>
        <a href="https://example.com" aria-label="Portfolio" className="hover:text-jade transition-colors transform hover:scale-110 duration-300">
          <Globe size={20} strokeWidth={1.5} />
        </a>
        <a href="#" aria-label="Email Contact" className="hover:text-jade transition-colors transform hover:scale-110 duration-300">
          <Mail size={20} strokeWidth={1.5} />
        </a>
      </div>
      <p className="font-serif opacity-80 dark:opacity-100 tracking-wide">{t('footer.text')}</p>
    </footer>
  );
}
