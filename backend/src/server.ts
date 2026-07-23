import { randomUUID } from 'node:crypto';
import path from 'node:path';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import { requireAdmin } from './auth.js';
import {
  databasePayload,
  toContentRecord,
} from './content.js';
import { config } from './config.js';
import { supabase } from './supabase.js';
import {
  contentTypes,
  ContentInput,
  ContentType,
} from './types.js';

export const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use(cors({ origin: config.clientOrigin }));
app.use(express.json({ limit: '2mb' }));

const isContentType = (
  value: string,
): value is ContentType =>
  contentTypes.includes(value as ContentType);

const readContentInput = (
  body: unknown,
): ContentInput | null => {
  const value = body as Partial<ContentInput>;
  if (
    !value ||
    typeof value.slug !== 'string' ||
    typeof value.title !== 'string' ||
    typeof value.date !== 'string' ||
    typeof value.body !== 'string'
  )
    return null;
  return value as ContentInput;
};

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.get(
  '/api/content/:type',
  async (request, response, next) => {
    try {
      const type = request.params.type;
      if (
        typeof type !== 'string' ||
        !isContentType(type)
      ) {
        response.status(404).json({
          error: 'Unknown content type.',
        });
        return;
      }
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('type', type)
        .eq('is_published', true)
        .order('date', { ascending: false });
      if (error) throw error;
      response.json(
        (data || []).map(toContentRecord),
      );
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  '/api/content/:type/:slug',
  async (request, response, next) => {
    try {
      const type = request.params.type;
      if (
        typeof type !== 'string' ||
        !isContentType(type)
      ) {
        response.status(404).json({
          error: 'Unknown content type.',
        });
        return;
      }
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('type', type)
        .eq('slug', request.params.slug)
        .eq('is_published', true)
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        response
          .status(404)
          .json({ error: 'Content not found.' });
        return;
      }
      response.json(toContentRecord(data));
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  '/api/content/:type',
  requireAdmin,
  async (request, response, next) => {
    try {
      const type = request.params.type;
      if (
        typeof type !== 'string' ||
        !isContentType(type)
      ) {
        response.status(404).json({
          error: 'Unknown content type.',
        });
        return;
      }
      const input = readContentInput(
        request.body,
      );
      if (!input) {
        response.status(400).json({
          error:
            'slug, title, date, and body are required.',
        });
        return;
      }
      const { data, error } = await supabase
        .from('contents')
        .insert(databasePayload(type, input))
        .select()
        .single();
      if (error) throw error;
      response
        .status(201)
        .json(toContentRecord(data));
    } catch (error) {
      next(error);
    }
  },
);

app.patch(
  '/api/content/:type/:slug',
  requireAdmin,
  async (request, response, next) => {
    try {
      const type = request.params.type;
      if (
        typeof type !== 'string' ||
        !isContentType(type)
      ) {
        response.status(404).json({
          error: 'Unknown content type.',
        });
        return;
      }
      const input = readContentInput(
        request.body,
      );
      if (!input) {
        response.status(400).json({
          error:
            'slug, title, date, and body are required.',
        });
        return;
      }
      const { data, error } = await supabase
        .from('contents')
        .update(databasePayload(type, input))
        .eq('type', type)
        .eq('slug', request.params.slug)
        .select()
        .single();
      if (error) throw error;
      response.json(toContentRecord(data));
    } catch (error) {
      next(error);
    }
  },
);

app.delete(
  '/api/content/:type/:slug',
  requireAdmin,
  async (request, response, next) => {
    try {
      const type = request.params.type;
      if (
        typeof type !== 'string' ||
        !isContentType(type)
      ) {
        response.status(404).json({
          error: 'Unknown content type.',
        });
        return;
      }
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('type', type)
        .eq('slug', request.params.slug);
      if (error) throw error;
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  '/api/uploads',
  requireAdmin,
  upload.single('file'),
  async (request, response, next) => {
    try {
      if (!request.file) {
        response
          .status(400)
          .json({ error: 'A file is required.' });
        return;
      }
      const extension = path
        .extname(request.file.originalname)
        .toLowerCase();
      const filePath = `${new Date().getUTCFullYear()}/${randomUUID()}${extension}`;
      const { error } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, request.file.buffer, {
          contentType: request.file.mimetype,
          upsert: false,
        });
      if (error) throw error;
      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);
      response.status(201).json({
        path: filePath,
        url: data.publicUrl,
      });
    } catch (error) {
      next(error);
    }
  },
);

app.use(
  (
    error: Error,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);
    response.status(500).json({
      error:
        'The server could not complete this request.',
    });
  },
);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(
      `Content API listening on http://localhost:${config.port}`,
    );
  });
}
