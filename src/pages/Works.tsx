import React, {
  useEffect,
  useState,
} from 'react';
import Section from '../components/Section';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import {
  EmptyState,
  LoadingState,
} from '../components/ContentState';
import {
  getContent,
  MarkdownPost,
} from '../utils/markdown';

const ProjectCard: React.FC<{
  project: MarkdownPost;
  buttonText: string;
}> = ({ project, buttonText }) => (
  <Link
    to={`/works/${project.slug}`}
    className="w-full group cursor-pointer block"
  >
    <div className="w-full h-48 mb-4 overflow-hidden rounded-2xl shadow-sm border border-white/50 dark:border-white/10 relative">
      <img
        src={
          project.thumbnail ||
          '/images/placeholder.jpg'
        }
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.3]"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    </div>
    <div className="text-center px-2">
      <h4 className="mt-3 text-xl font-serif font-bold text-ink dark:text-stone-100 group-hover:text-jade transition-colors">
        {project.title}
      </h4>
      <p className="text-base text-stone-600 dark:text-stone-400 font-light mt-1 line-clamp-2">
        {project.description}
      </p>
      <span className="inline-block mt-3 text-xs font-medium text-jade opacity-100 md:opacity-0 transform translate-y-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
        {buttonText} →
      </span>
    </div>
  </Link>
);

const Works: React.FC = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<
    MarkdownPost[] | null
  >(null);
  const [loadError, setLoadError] =
    useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getContent('works');
        setProjects(data);
      } catch {
        setLoadError(true);
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <Section>
        <PageIntro
          title={t('works.title')}
          kicker={t('works.kicker')}
          description={t('works.description')}
        />
      </Section>

      {loadError ? (
        <EmptyState
          title={t('content.unavailable_title')}
          description={t(
            'content.unavailable_desc',
          )}
        />
      ) : projects === null ? (
        <LoadingState
          label={t('works.loading')}
        />
      ) : projects.length === 0 ? (
        <EmptyState
          title={t('works.empty_title')}
          description={t('works.empty_desc')}
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Section
              key={project.slug}
              delay={index * 0.1}
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
