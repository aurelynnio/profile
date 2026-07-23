import React, {
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import Section from '../components/Section';
import { useLanguage } from '../context/LanguageContext';
import {
  getPostBySlug,
  MarkdownPost,
} from '../utils/markdown';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
  EmptyState,
  LoadingState,
} from '../components/ContentState';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [post, setPost] =
    useState<MarkdownPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] =
    useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const data = await getPostBySlug(
            'writing',
            id,
          );
          setPost(data);
        }
      } catch {
        setLoadError(true);
      }
      setLoading(false);
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <LoadingState
        label={t('article.loading')}
      />
    );
  }

  if (!post) {
    return (
      <EmptyState
        title={
          loadError
            ? t('content.unavailable_title')
            : t('article.missing_title')
        }
        description={
          loadError
            ? t('content.unavailable_desc')
            : t('article.missing_desc')
        }
        action={{
          label: loadError
            ? t('back')
            : t('article.browse'),
          to: '/posts',
        }}
      />
    );
  }

  return (
    <div className="pb-20">
      <Section>
        <Link
          to="/posts"
          className="button-secondary group mb-8"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {t('back')}
        </Link>
      </Section>

      <article>
        <Section delay={0.1}>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink dark:text-stone-100 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-stone-500 dark:text-stone-400 font-mono mb-8">
              <span className="flex items-center gap-2">
                <Calendar size={14} />{' '}
                {format(
                  new Date(post.date),
                  'MMMM dd, yyyy',
                )}
              </span>
            </div>

            {post.thumbnail && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-stone-200 dark:border-stone-700">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </Section>

        <Section delay={0.2}>
          <div className="surface-card mx-auto max-w-2xl p-5 md:p-12">
            <MarkdownRenderer
              content={post.body}
            />

            <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-700 text-center font-serif italic text-stone-400">
              ***
            </div>
          </div>
        </Section>
      </article>
    </div>
  );
};

export default PostDetail;
