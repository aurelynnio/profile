import React from 'react';
import {
  Github,
  FileText,
  Linkedin,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-28 pb-10">
      <div className="card-surface mx-auto max-w-3xl rounded-[2rem] px-6 py-8 text-center">
        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-faint">
          Elsewhere
        </div>
        <div className="mb-6 flex justify-center space-x-8">
        <a
          href="https://github.com/cyhinverse"
          aria-label="GitHub Profile"
          className="text-stone-500 hover:text-jade transition-colors hover:scale-110 duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={20} strokeWidth={1.5} />
        </a>
        <a
          href="https://www.linkedin.com/in/tranphanquocanh/"
          aria-label="LinkedIn Profile"
          className="text-stone-500 hover:text-jade transition-colors hover:scale-110 duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={20} strokeWidth={1.5} />
        </a>
        <a
          href="/CV/resume.pdf"
          aria-label="Resume"
          className="text-stone-500 hover:text-jade transition-colors hover:scale-110 duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText size={20} strokeWidth={1.5} />
        </a>
      </div>
        <p className="font-serif text-xl tracking-wide text-stone-500 dark:text-stone-400">
          {t('footer.text')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
