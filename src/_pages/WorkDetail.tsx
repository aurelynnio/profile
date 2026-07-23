import React, {
  useEffect,
  useState,
} from 'react';
import {
  useParams,
  Link,
} from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Section from '../components/Section';
import { useLanguage } from '../context/LanguageContext';
import {
  getPostBySlug,
  MarkdownPost,
} from '../utils/markdown';
import MarkdownRenderer from '../components/MarkdownRenderer';
import {
  EmptyState,
  LoadingState,
} from '../components/ContentState';
import ProjectMetadata from '../components/ProjectMetadata';

const WorkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [project, setProject] =
    useState<MarkdownPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] =
    useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const data = await getPostBySlug(
            'works',
            id,
          );
          setProject(data);
        }
      } catch {
        setLoadError(true);
      }
      setLoading(false);
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <LoadingState
        label={t('project.loading')}
      />
    );
  }

  if (!project) {
    return (
      <EmptyState
        title={
          loadError
            ? t('content.unavailable_title')
            : t('project.missing_title')
        }
        description={
          loadError
            ? t('content.unavailable_desc')
            : t('project.missing_desc')
        }
        action={{
          label: loadError
            ? t('back')
            : t('project.browse'),
          to: '/works',
        }}
      />
    );
  }

  return (
    <div className="pb-20">
      <Section>
        <div className="flex items-center gap-1.5 mb-8 text-sm font-medium">
          <Link
            to="/works"
            className="text-jade hover:underline transition-colors"
          >
            Works
          </Link>
          <span className="text-stone-400 opacity-50 px-1">
            &gt;
          </span>
          <h1 className="text-xl font-bold text-ink dark:text-stone-100 truncate">
            {project.title}
          </h1>
          <span className="bg-stone-200/50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-1.5 py-0.5 rounded text-[10px] font-mono ml-1">
            {project.yearBadge ||
              `${new Date(project.date).getFullYear()}-`}
          </span>
        </div>
      </Section>

      <Section delay={0.1}>
        <div className="mb-12">
          <p className="text-lg text-stone-700 dark:text-stone-300 font-light leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>

          <ProjectMetadata project={project} />
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-stone-200 dark:border-white/10 mb-10">
          <img
            src={
              project.thumbnail ||
              '/images/placeholder.jpg'
            }
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Section>

      <Section delay={0.3}>
        <MarkdownRenderer
          content={project.body}
        />

        {project.link && (
          <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex justify-center">
            <a
              href={project.link}
              className="button-primary bg-ink hover:bg-jade dark:bg-stone-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live <ExternalLink size={16} />
            </a>
          </div>
        )}
      </Section>
    </div>
  );
};

export default WorkDetail;
