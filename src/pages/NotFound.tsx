import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import { useLanguage } from '../context/LanguageContext';

const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center pt-20">
      <Section>
        <h1 className="select-none text-9xl font-serif text-stone-200 opacity-50 dark:text-stone-800">
          404
        </h1>
        <div className="-mt-12 relative z-10">
          <h2 className="mb-4 text-4xl font-serif text-ink dark:text-stone-100">
            {t('not_found.title')}
          </h2>
          <p className="mb-8 text-stone-600 dark:text-stone-400">
            {t('not_found.desc')}
          </p>
          <Link
            to="/"
            className="btn-primary"
          >
            {t('not_found.home_btn')}
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default NotFound;
