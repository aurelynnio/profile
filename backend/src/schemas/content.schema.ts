import { z } from 'zod';
import { contentTypes } from '../../../shared/content.js';

export const contentTypeSchema = z.enum(contentTypes);

export const contentInputSchema = z.object({
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(300),
  date: z.string().min(1),
  thumbnail: z.string().url().optional(),
  description: z.string().optional(),
  summary: z.string().optional(),
  body: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
  isPublished: z.boolean().optional(),
});

export type ContentInputParsed = z.infer<typeof contentInputSchema>;
