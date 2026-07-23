import 'dotenv/config';
import { worksData } from '../../src/data/works.ts';
import { writingData } from '../../src/data/writing.ts';
import { databasePayload } from '../src/content.js';
import { supabase } from '../src/supabase.js';

const toInput = (
  item: (typeof worksData)[number],
) => {
  const {
    slug,
    title,
    date,
    thumbnail,
    description,
    summary,
    body,
    ...metadata
  } = item;
  return {
    slug,
    title,
    date,
    thumbnail,
    description,
    summary,
    body,
    metadata,
  };
};

const works = worksData.map((item) =>
  databasePayload('works', toInput(item)),
);
const writing = writingData.map((item) =>
  databasePayload('writing', toInput(item)),
);
const { error } = await supabase
  .from('contents')
  .upsert([...works, ...writing], {
    onConflict: 'type,slug',
  });
if (error) throw error;
console.log(
  `Seeded ${works.length} works and ${writing.length} articles.`,
);
