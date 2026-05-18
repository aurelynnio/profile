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
import PageState from '../components/PageState';
import { useLanguage } from '../context/LanguageContext';
import {
  getPostBySlug,
  MarkdownPost,
} from '../utils/markdown';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { hasSupabaseConfig } from '../lib/supabase';

const detailFields = [
  ['link', 'Website'],
  ['Current Status', 'Status'],
  ['Role', 'Role'],
  ['platform', 'Platform'],
  ['stack', 'Stack'],
  ['source', 'Source'],
  ['blogpost', 'Blogpost'],
] as const;

const WorkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [project, setProject] =
    useState<MarkdownPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <PageState
        tone="loading"
        title={t('common.loading_title')}
        description={t('common.loading_desc')}
      />
    );
  }

  if (hasError) {
    return (
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
    );
  }

  if (!project) {
    return (
      <PageState
        title={t('common.empty_title')}
        description={t('project.not_found')}
      />
    );
  }

  return (
    <div className="pt-4 pb-20">
      <Section>
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium">
          <Link
            to="/works"
            className="meta-pill"
          >
            Works
          </Link>
          <span className="px-1 text-stone-400 opacity-50">
            &gt;
          </span>
          <h1 className="text-xl font-serif text-ink dark:text-stone-100">
            {project.title}
          </h1>
          <span className="meta-pill ml-1">
            {project.yearBadge ||
              `${new Date(project.date).getFullYear()}-`}
          </span>
        </div>
      </Section>

      <Section delay={0.1}>
        <div className="card-surface rounded-[2rem] p-6 md:p-8 mb-12">
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-stone-700 dark:text-stone-300">
            {project.description}
          </p>

          <div className="space-y-3">
            {detailFields.map(([field, label]) => {
              const value = project[field];
              if (!value) {
                return null;
              }

              const isLink = [
                'link',
                'source',
                'blogpost',
              ].includes(field);

              return (
                <div
                  key={field}
                  className="flex flex-col gap-2 rounded-2xl bg-white/40 px-4 py-3 dark:bg-white/5 md:flex-row md:items-center"
                >
                  <span className="meta-label">
                    {label}
                  </span>
                  {isLink ? (
                    <a
                      href={String(value)}
                      className="meta-value flex items-center gap-2 text-jade hover:text-jade-light"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {field === 'source'
                        ? 'Source Code'
                        : field === 'blogpost'
                          ? 'Related Article'
                          : String(value)}
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="meta-value">
                      {String(value)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="card-surface-strong mb-10 aspect-video w-full overflow-hidden rounded-[2rem]">
          <img
            src={
              project.thumbnail ||
              '/images/placeholder.jpg'
            }
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
      </Section>

      <Section delay={0.3}>
        <div className="card-surface rounded-[2rem] p-6 md:p-10">
          <MarkdownRenderer
            content={project.body}
          />

          {project.link && (
            <div className="mt-12 flex justify-center border-t border-stone-200 pt-8 dark:border-stone-800">
              <a
                href={project.link}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default WorkDetail;
