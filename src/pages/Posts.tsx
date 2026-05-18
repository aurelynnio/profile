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
import { format } from 'date-fns';
import { hasSupabaseConfig } from '../lib/supabase';

const PostItem: React.FC<{
  post: MarkdownPost;
}> = ({ post }) => (
  <Link
    to={`/posts/${post.slug}`}
    className="group block rounded-[1.75rem] card-surface px-5 py-5 md:px-6 md:py-6"
  >
    <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
      <h4 className="text-2xl font-serif text-ink transition-colors group-hover:text-jade group-hover:underline decoration-1 underline-offset-4 dark:text-stone-100">
        {post.title}
      </h4>
      <span className="shrink-0 text-xs font-mono uppercase tracking-[0.14em] text-stone-400 sm:ml-4 sm:mt-0">
        {format(
          new Date(post.date),
          'yyyy-MM-dd',
        )}
      </span>
    </div>
    <p className="line-clamp-2 text-base leading-relaxed text-stone-600 dark:text-stone-400">
      {post.summary || post.excerpt}
    </p>
  </Link>
);

const Posts: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<
    MarkdownPost[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getContent('writing');
        setPosts(data);
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="pt-4">
      <Section>
        <div className="mb-10">
          <span className="eyebrow mb-4">
            Essays
          </span>
          <h3 className="section-title mb-3">
          {t('posts.title')}
          </h3>
          <p className="section-subtitle">
            Notes on engineering, architecture, and the tradeoffs behind real product work.
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
      ) : posts.length === 0 ? (
        <PageState
          title={t('common.empty_title')}
          description={t('posts.empty')}
        />
      ) : (
        <div className="max-w-3xl space-y-5">
          {posts.map((post, index) => (
            <Section
              key={post.slug}
              delay={index * 0.08}
            >
              <PostItem post={post} />
            </Section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
