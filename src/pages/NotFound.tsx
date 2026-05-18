import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import { useLanguage } from '../context/LanguageContext';

const NotFound: React.FC = () => {
  const { t } = useLanguage();

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
          <p className="text-stone-600 dark:text-stone-400 mb-8 font-light">
            {t('not_found.desc')}
          </p>
          <Link
            to="/"
            className="inline-block bg-jade hover:bg-jade-light text-white px-6 py-2 rounded-full transition-colors text-sm shadow-sm hover:shadow-md"
          >
            {t('not_found.home_btn')}
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default NotFound;
