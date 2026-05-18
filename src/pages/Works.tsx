import React, {
  useEffect,
  useState,
} from 'react';
import Section from '../components/Section';
import PageState from '../components/PageState';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import {
  getContent,
  MarkdownPost,
} from '../utils/markdown';
import { hasSupabaseConfig } from '../lib/supabase';

const ProjectCard: React.FC<{
  project: MarkdownPost;
  buttonText: string;
}> = ({ project, buttonText }) => (
  <Link
    to={`/works/${project.slug}`}
    className="group block w-full"
  >
    <div className="card-surface-strong relative mb-4 h-52 w-full overflow-hidden rounded-[1.75rem]">
      <img
        src={
          project.thumbnail ||
          '/images/placeholder.jpg'
        }
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out grayscale-[0.15] group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(22,18,15,0.12)_100%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
    <div className="text-center px-2">
      <h4 className="mt-3 text-2xl font-serif text-ink transition-colors group-hover:text-jade dark:text-stone-100">
        {project.title}
      </h4>
      <p className="mt-2 line-clamp-2 text-base text-stone-600 dark:text-stone-400">
        {project.description}
      </p>
      <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-jade opacity-100 transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        {buttonText} →
      </span>
    </div>
  </Link>
);

const Works: React.FC = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<
    MarkdownPost[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getContent('works');
        setProjects(data);
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="pt-4">
      <Section>
        <div className="mb-8">
          <span className="eyebrow mb-4">
            Archive
          </span>
          <h3 className="section-title mb-3">
          {t('works.title')}
          </h3>
          <p className="section-subtitle">
            Selected builds, shipped products, and experiments with clear product intent.
          </p>
        </div>
      </Section>

      {loading ? (
        <PageState
          tone="loading"
          title={t('common.loading_title')}
          description={t('common.loading_desc')}
        />
      ) : hasError ? (
        <PageState
          tone="error"
          title={
            hasSupabaseConfig
              ? t('common.unavailable_title')
              : t('common.config_title')
          }
          description={
            hasSupabaseConfig
              ? t('common.unavailable_desc')
              : t('common.config_desc')
          }
        />
      ) : projects.length === 0 ? (
        <PageState
          title={t('common.empty_title')}
          description={t('works.empty')}
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {projects.map((project, index) => (
            <Section
              key={project.slug}
              delay={index * 0.08}
            >
              <ProjectCard
                project={project}
                buttonText={t('works.read_more')}
              />
            </Section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Works;
