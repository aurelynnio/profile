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

const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api').replace(/\/$/, '');

const fetchContent = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${path}`);
  if (!response.ok) {
    throw new Error(`Content API request failed (${response.status}).`);
  }
  return response.json() as Promise<T>;
};

export const getContent = async (
  type: 'works' | 'writing',
): Promise<MarkdownPost[]> => {
  return fetchContent<MarkdownPost[]>(`/content/${type}`);
};

export const getPostBySlug = async (
  type: 'works' | 'writing',
  slug: string,
): Promise<MarkdownPost | null> => {
  try {
    return await fetchContent<MarkdownPost>(`/content/${type}/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes('(404)')) return null;
    throw error;
  }
};
