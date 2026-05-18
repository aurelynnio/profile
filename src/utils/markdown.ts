import {
  hasSupabaseConfig,
  supabase,
} from '../lib/supabase';

export interface MarkdownPost {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  description?: string;
  summary?: string;
  body: string;
  [key: string]: any;
}

interface ContentRow {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string | null;
  description?: string | null;
  summary?: string | null;
  body: string;
  metadata?: Record<string, any> | null;
}

const ensureSupabaseConfigured = () => {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    );
  }
};

const contentCache: Record<
  string,
  MarkdownPost[]
> = {};
const postCache: Record<string, MarkdownPost> =
  {};

const normalizeDbPost = (
  row: ContentRow,
): MarkdownPost => ({
  slug: row.slug,
  title: row.title || 'Untitled',
  date: row.date
    ? new Date(row.date).toISOString()
    : new Date().toISOString(),
  thumbnail: row.thumbnail || undefined,
  description: row.description || undefined,
  summary: row.summary || undefined,
  body: row.body,
  ...(row.metadata || {}),
});

const getContentFromSupabase = async (
  type: 'works' | 'writing',
): Promise<MarkdownPost[]> => {
  ensureSupabaseConfigured();

  const { data, error } = await supabase!
    .from('contents')
    .select(
      'slug,title,date,thumbnail,description,summary,body,metadata',
    )
    .eq('type', type)
    .order('date', { ascending: false });

  if (error) {
    console.error(
      'Supabase getContent error:',
      error,
    );
    throw error;
  }

  if (!data || data.length === 0) {
    return [];
  }

  const posts = (data as ContentRow[]).map(
    normalizeDbPost,
  );

  posts.forEach((post) => {
    postCache[`${type}/${post.slug}`] = post;
  });

  return posts;
};

const getPostBySlugFromSupabase = async (
  type: 'works' | 'writing',
  slug: string,
): Promise<MarkdownPost | null> => {
  ensureSupabaseConfigured();

  const { data, error } = await supabase!
    .from('contents')
    .select(
      'slug,title,date,thumbnail,description,summary,body,metadata',
    )
    .eq('type', type)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error(
      'Supabase getPostBySlug error:',
      error,
    );
    throw error;
  }

  if (!data) {
    return null;
  }

  return normalizeDbPost(data as ContentRow);
};

export const getContent = async (
  type: 'works' | 'writing',
): Promise<MarkdownPost[]> => {
  if (contentCache[type]) {
    return contentCache[type];
  }

  const dbPosts = await getContentFromSupabase(
    type,
  );

  contentCache[type] = dbPosts;
  return dbPosts;
};

export const getPostBySlug = async (
  type: 'works' | 'writing',
  slug: string,
): Promise<MarkdownPost | null> => {
  const cacheKey = `${type}/${slug}`;

  if (postCache[cacheKey]) {
    return postCache[cacheKey];
  }

  const dbPost = await getPostBySlugFromSupabase(
    type,
    slug,
  );

  if (!dbPost) {
    return null;
  }

  postCache[cacheKey] = dbPost;
  return dbPost;
};
