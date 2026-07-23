import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../src/lib/supabase.js', () => {
  const chain = {
    eq: vi.fn(() => chain),
    order: vi.fn(() => ({ data: [], error: null })),
    maybeSingle: vi.fn(() => ({ data: null, error: null })),
    single: vi.fn(() => ({ data: null, error: null })),
  };
  return {
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => chain),
        insert: vi.fn(() => ({
          select: vi.fn(() => chain),
        })),
      })),
    },
  };
});

import { contentService } from '../src/services/content.service.js';

describe('contentService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('listPublished returns an array', async () => {
    const result = await contentService.listPublished('works');
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([]);
  });

  it('getBySlug returns null when not found', async () => {
    const result = await contentService.getBySlug('works', 'missing');
    expect(result).toBeNull();
  });
});
