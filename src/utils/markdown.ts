import { worksData } from '../data/works';
import { writingData } from '../data/writing';

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

const dataMap: Record<string, MarkdownPost[]> = {
  works: worksData,
  writing: writingData,
};

export const getContent = async (
  type: 'works' | 'writing',
): Promise<MarkdownPost[]> => {
  return dataMap[type] || [];
};

export const getPostBySlug = async (
  type: 'works' | 'writing',
  slug: string,
): Promise<MarkdownPost | null> => {
  const items = dataMap[type] || [];
  return (
    items.find((item) => item.slug === slug) ||
    null
  );
};
