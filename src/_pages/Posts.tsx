import React, {
  useEffect,
  useState,
} from 'react';
import Section from '../components/Section';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import {
  getContent,
  MarkdownPost,
} from '../utils/markdown';
import { format } from 'date-fns';
import PageIntro from '../components/PageIntro';
import {
  EmptyState,
  LoadingState,
} from '../components/ContentState';

const PostItem: React.FC<{
  post: MarkdownPost;
}> = ({ post }) => (
  <Link
    to={`/posts/${post.slug}`}
    className="block group cursor-pointer mb-8 md:mb-10"
  >
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
      <h4 className="text-lg md:text-xl font-serif font-bold text-ink dark:text-stone-100 group-hover:text-jade transition-colors group-hover:underline decoration-1 underline-offset-4">
        {post.title}
      </h4>
      <span className="text-xs font-mono text-stone-400 shrink-0 sm:ml-4 mt-1 sm:mt-0">
        {format(
          new Date(post.date),
          'yyyy-MM-dd',
        )}
      </span>
    </div>
    <p className="text-stone-600 dark:text-stone-400 text-base font-light line-clamp-2 leading-relaxed">
      {post.summary || post.excerpt}
    </p>
  </Link>
);

const Posts: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<
    MarkdownPost[] | null
  >(null);
  const [loadError, setLoadError] =
    useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getContent('writing');
        setPosts(data);
      } catch {
        setLoadError(true);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Section>
        <PageIntro
          title={t('posts.title')}
          kicker={t('posts.kicker')}
          description={t('posts.description')}
        />
      </Section>

      {loadError ? (
        <EmptyState
          title={t('content.unavailable_title')}
          description={t(
            'content.unavailable_desc',
          )}
        />
      ) : posts === null ? (
        <LoadingState
          label={t('posts.loading')}
        />
      ) : posts.length === 0 ? (
        <EmptyState
          title={t('posts.empty_title')}
          description={t('posts.empty_desc')}
        />
      ) : (
        <div className="max-w-3xl">
          {posts.map((post, index) => (
            <Section
              key={post.slug}
              delay={index * 0.1}
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
