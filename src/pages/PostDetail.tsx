import React, {
  useEffect,
  useState,
} from 'react';
import {
  useParams,
  useNavigate,
} from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import Section from '../components/Section';
import PageState from '../components/PageState';
import { useLanguage } from '../context/LanguageContext';
import {
  getPostBySlug,
  MarkdownPost,
} from '../utils/markdown';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { format } from 'date-fns';
import { hasSupabaseConfig } from '../lib/supabase';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [post, setPost] =
    useState<MarkdownPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
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

  if (!post) {
    return (
      <PageState
        title={t('common.empty_title')}
        description={t('post.not_found')}
      />
    );
  }

  return (
    <div className="pt-4 pb-20">
      <Section>
        <button
          onClick={() => navigate('/posts')}
          className="btn-secondary mb-8"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {t('back')}
        </button>
      </Section>

      <article>
        <Section delay={0.1}>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="eyebrow mb-5">
              Writing
            </span>
            <h1 className="mb-6 text-4xl font-serif leading-tight text-ink dark:text-stone-100 md:text-5xl">
              {post.title}
            </h1>
            <div className="mb-8 flex items-center justify-center gap-6 text-sm font-mono text-stone-500 dark:text-stone-400">
              <span className="meta-pill">
                <Calendar size={14} />{' '}
                {format(
                  new Date(post.date),
                  'MMMM dd, yyyy',
                )}
              </span>
            </div>

            {post.thumbnail && (
              <div className="card-surface-strong aspect-video w-full overflow-hidden rounded-[2rem]">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </Section>

        <Section delay={0.2}>
          <div className="card-surface mx-auto max-w-3xl rounded-[2rem] p-6 md:p-12">
            <MarkdownRenderer
              content={post.body}
            />

            <div className="mt-16 border-t border-stone-100 pt-8 text-center font-serif italic text-stone-400 dark:border-stone-700">
              ***
            </div>
          </div>
        </Section>
      </article>
    </div>
  );
};

export default PostDetail;
