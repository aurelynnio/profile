import 'dotenv/config';
import { worksData } from './seed-data/works.js';
import { writingData } from './seed-data/writing.js';
import { contentService } from '../src/services/content.service.js';
import type { ContentInput, ContentType } from '../src/types/content.js';

type SeedItem = {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  description?: string;
  summary?: string;
  body: string;
  [key: string]: unknown;
};

const toInput = (item: SeedItem): ContentInput => {
  const { slug, title, date, thumbnail, description, summary, body, ...metadata } = item;
  return { slug, title, date, thumbnail, description, summary, body, metadata };
};

const seedType = async (type: ContentType, items: SeedItem[]) => {
  for (const item of items) {
    await contentService.upsert(type, toInput(item));
  }
};

await seedType('works', worksData);
await seedType('writing', writingData);
console.log(`Seeded ${worksData.length} works and ${writingData.length} articles.`);
