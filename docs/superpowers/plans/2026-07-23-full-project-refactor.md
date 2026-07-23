# Full Project Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio site from Vite + React Router (manual data fetching, duplicated logic, weak types) into Next.js App Router + Express (zod-validated, split routes) with TanStack Query, Axios, Zustand, proper SEO, and a clean DX setup — without changing the public design.

**Architecture:** Monorepo kept as-is: Next.js app at repo root, Express API in `backend/`, shared types in `shared/`. Frontend reads content via Axios → Express → Supabase. TanStack Query handles caching/state, Zustand holds UI state (theme, language). Next.js App Router gives file-based routing, `generateMetadata` for SEO, `next/image` for asset optimization, and server components for first paint.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS v4, TanStack Query v5, Zustand, Axios, Framer Motion, React Three Fiber; Express 5, Supabase JS, zod, multer; Vitest, ESLint, Prettier.

---

## Guiding Decisions (locked with user)

1. **Migrate Vite → Next.js** (App Router). Keep public UI/design identical.
2. **Keep monorepo**: Next.js at root, `backend/` stays as sibling folder (no npm workspaces). Shared types via `shared/` folder + relative imports.
3. **Backend**: split `server.ts` into `routes/` + `controllers/` + `services/` + `schemas/` (zod) + `middleware/`. Keep Express.
4. **All four priorities**: code quality, performance, SEO/social, DX.
5. **No gradient, border-over-shadow, teal/cyan accents, professional/clean** (from user profile — applies to any new UI).
6. **npm**, not pnpm. Step-by-step, learner-friendly commits.

---

## Target File Structure

```
profile/
├── app/                              # Next.js App Router (NEW)
│   ├── [locale]/                     # en | zh routing (optional, Phase 4)
│   ├── layout.tsx
│   ├── page.tsx                      # Home
│   ├── works/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── posts/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── section.tsx
│   ├── page-intro.tsx
│   ├── content-state.tsx
│   ├── markdown-renderer.tsx
│   ├── scholar-rock.tsx              # 3D, dynamic import only
│   ├── project-metadata.tsx
│   ├── theme-toggle.tsx
│   └── providers.tsx                 # QueryClient + Zustand hydration
├── lib/
│   ├── api-client.ts                 # Axios instance
│   ├── content-api.ts                # typed content endpoints
│   ├── query-keys.ts
│   └── utils.ts                      # clsx/cn helper
├── hooks/
│   ├── use-content.ts                # useQuery wrappers
│   └── use-theme.ts                  # Zustand theme hook
├── stores/
│   └── ui-store.ts                   # Zustand: theme, language
├── messages/                         # i18n strings (split from LanguageContext)
│   ├── en.ts
│   └── zh.ts
├── public/                           # cleaned up assets (Phase 0)
├── shared/                           # shared FE/BE types + zod schemas (NEW)
│   ├── content.ts
│   └── package.json                  # name: "@profile/shared", private
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── content.routes.ts
│   │   │   ├── upload.routes.ts
│   │   │   └── health.routes.ts
│   │   ├── controllers/
│   │   │   └── content.controller.ts
│   │   ├── services/
│   │   │   └── content.service.ts
│   │   ├── schemas/
│   │   │   └── content.schema.ts     # zod
│   │   ├── middleware/
│   │   │   ├── error.middleware.ts
│   │   │   ├── auth.middleware.ts
│   │   │   └── validate.middleware.ts
│   │   ├── lib/
│   │   │   ├── supabase.ts
│   │   │   └── env.ts
│   │   ├── server.ts                 # slim app composition
│   │   └── types.ts                  # removed (uses shared/)
│   ├── scripts/
│   │   ├── migrate.ts
│   │   ├── seed.ts                   # decoupled from frontend data
│   │   └── verify.ts
│   └── package.json
├── tests/                            # NEW (Phase 7)
├── .env.example                      # fixed (Phase 0)
├── next.config.ts                    # NEW
├── eslint.config.mjs                 # NEW
├── tsconfig.json                     # Next.js preset
└── package.json                      # Next.js app
```

**Files deleted during migration:** `vite.config.ts`, `src/index.tsx`, `src/App.tsx`, `index.html`, `postcss.config.js` (Tailwind v4 uses `@tailwindcss/postcss` via Next plugin), `src/utils/markdown.ts` (replaced by `lib/content-api.ts`), `src/context/LanguageContext.tsx` (replaced by `stores/` + `messages/`), `metadata.json`, `netlify.toml` (replaced by `vercel.json`), `src/data/works.ts` & `src/data/writing.ts` (moved to `backend/scripts/seed-data/`).

---

## Execution Order & Checkpoints

Execute phases sequentially. After each phase, the app should still build.

- **Phase 0** → cleanup + shared foundation (no runtime change)
- **Phase 1** → backend refactor (API contract unchanged, tests added)
- **Phase 2** → Next.js skeleton + design system (Home renders)
- **Phase 3** → data layer (Axios + Query + Zustand wired)
- **Phase 4** → all pages migrated (full feature parity)
- **Phase 5** → remaining components (3D, markdown, metadata)
- **Phase 6** → SEO + performance
- **Phase 7** → DX (lint, tests, docs)

---

# Phase 0: Foundation & Cleanup

**Goal:** Remove dead code/assets, fix config drift, create shared types module. No behavior change.

### Task 0.1: Remove dead code & duplicate deps

**Files:**
- Modify: `c:\Users\cyhin\profile\package.json`
- Delete: `c:\Users\cyhin\profile\public\images\uploads\on.png`, `on2.png`, `hehe.png`, `redsi.jpg` (typos/test files — keep `aws-*.jpg` and `system_architecture.png`)

- [ ] **Step 1: Remove duplicate `react-icon` package (keep `react-icons`)**

In `package.json`, delete the line:
```json
    "react-icon": "^1.0.0",
```

- [ ] **Step 2: Remove dead `GEMINI_API_KEY` config from `vite.config.ts`**

This will be removed entirely in Phase 2 (Vite deleted), so no edit needed now — just note it. Skip if Phase 2 runs immediately after.

- [ ] **Step 3: Delete test/placeholder images**

Delete: `public/images/uploads/on.png`, `public/images/uploads/on2.png`, `public/images/uploads/hehe.png`, `public/images/uploads/redsi.jpg`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove duplicate react-icon dep and test images"
```

### Task 0.2: Fix env example files

**Files:**
- Modify: `c:\Users\cyhin\profile\.env.example`
- Modify: `c:\Users\cyhin\profile\backend\.env.example`

- [ ] **Step 1: Replace frontend `.env.example`**

Current file only lists `GEMINI_API_KEY` (unused). The app actually uses `VITE_API_URL` (see `src/utils/markdown.ts:12`). After Next.js migration this becomes `NEXT_PUBLIC_API_URL`.

```env
# Frontend (Next.js) environment
# Base URL of the content API (no trailing slash)
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

- [ ] **Step 2: Trim stale backend env vars**

`backend/.env.example` lists `SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_JWKS_URL` which `src/config.ts` never reads. Remove them:

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
DATABASE_URL=postgresql://...
# Comma-separated emails allowed to create, update, delete content, and upload assets.
ADMIN_EMAILS=you@example.com
```

Note `CLIENT_ORIGIN` changes from `:3001` (Vite) to `:3000` (Next.js default).

- [ ] **Step 3: Commit**

```bash
git add .env.example backend/.env.example
git commit -m "chore: fix env examples to match actual usage"
```

### Task 0.3: Create shared types module

**Files:**
- Create: `c:\Users\cyhin\profile\shared\content.ts`
- Create: `c:\Users\cyhin\profile\shared\package.json`

This module is imported by both Next.js (`@/../shared/content` via relative path) and backend (`../shared/content`). zod schemas live in backend (`backend/src/schemas/`) per decision #3, but the plain TS types live here so FE and BE agree on shapes.

- [ ] **Step 1: Create `shared/package.json`**

```json
{
  "name": "@profile/shared",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "./content.ts",
  "types": "./content.ts"
}
```

- [ ] **Step 2: Create `shared/content.ts`**

```typescript
export const contentTypes = ['works', 'writing'] as const;
export type ContentType = (typeof contentTypes)[number];

/** Fields a client sends when creating/updating content. */
export interface ContentInput {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  description?: string;
  summary?: string;
  body: string;
  metadata?: Record<string, unknown>;
  isPublished?: boolean;
}

/** A stored content record returned by the API. */
export interface ContentRecord extends ContentInput {
  id: string;
  type: ContentType;
  createdAt: string;
  updatedAt: string;
}

/**
 * Frontend-friendly view of a content record.
 * `metadata` is flattened so components can read known keys (Role, Stack, ...)
 * without drilling into a nested object.
 */
export interface ContentCard {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  description?: string;
  summary?: string;
  body: string;
  link?: string;
  platform?: string;
  stack?: string;
  source?: string;
  blogpost?: string;
  role?: string;
  status?: string;
  yearBadge?: string;
  [key: string]: unknown;
}
```

- [ ] **Step 3: Commit**

```bash
git add shared/
git commit -m "feat(shared): add shared content types for FE/BE contract"
```

---

# Phase 1: Backend Refactor

**Goal:** Split `server.ts` into routes/controllers/services/schemas/middleware, add zod validation and structured error handling. API contract unchanged so frontend keeps working.

### Task 1.1: Install backend deps & scaffold folders

**Files:**
- Modify: `c:\Users\cyhin\profile\backend\package.json`
- Create: empty folder structure under `backend/src/`

- [ ] **Step 1: Install zod**

```bash
cd backend
npm install zod
```

- [ ] **Step 2: Create folder structure**

```bash
mkdir src/routes src/controllers src/services src/schemas src/middleware src/lib
```

- [ ] **Step 3: Commit**

```bash
git add backend/package.json backend/package-lock.json
git commit -m "build(backend): add zod and scaffold route/controller/service folders"
```

### Task 1.2: zod schemas

**Files:**
- Create: `c:\Users\cyhin\profile\backend\src\schemas\content.schema.ts`

- [ ] **Step 1: Write schemas**

```typescript
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
  metadata: z.record(z.unknown()).optional(),
  isPublished: z.boolean().optional(),
});

export type ContentInputParsed = z.infer<typeof contentInputSchema>;
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/schemas/content.schema.ts
git commit -m "feat(backend): add zod schemas for content input"
```

### Task 1.3: Validate middleware

**Files:**
- Create: `c:\Users\cyhin\profile\backend\src\middleware\validate.middleware.ts`

- [ ] **Step 1: Write validate middleware**

```typescript
import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodSchema } from 'zod';

export const validateBody = (schema: ZodSchema) =>
  (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      response.status(400).json({
        error: 'Invalid request body.',
        details: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }
    request.body = result.data;
    next();
  };

export const isZodError = (error: unknown): error is ZodError =>
  error instanceof ZodError;
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/middleware/validate.middleware.ts
git commit -m "feat(backend): add zod validateBody middleware"
```

### Task 1.4: Error middleware

**Files:**
- Create: `c:\Users\cyhin\profile\backend\src\middleware\error.middleware.ts`

- [ ] **Step 1: Write error middleware**

```typescript
import type { NextFunction, Request, Response } from 'express';
import { isZodError } from './validate.middleware.js';

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.error(error);

  if (isZodError(error)) {
    response.status(400).json({
      error: 'Validation failed.',
      details: error.issues,
    });
    return;
  }

  const message =
    error instanceof Error ? error.message : 'Unexpected server error.';
  response.status(500).json({ error: message });
};
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/middleware/error.middleware.ts
git commit -m "feat(backend): add structured error handler middleware"
```

### Task 1.5: Move config & supabase into lib/

**Files:**
- Move: `backend/src/config.ts` → `backend/src/lib/env.ts` (rename export)
- Move: `backend/src/supabase.ts` → `backend/src/lib/supabase.ts`
- Move: `backend/src/auth.ts` → `backend/src/middleware/auth.middleware.ts`

- [ ] **Step 1: Create `backend/src/lib/env.ts`**

```typescript
import 'dotenv/config';

const required = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const env = {
  port: Number(process.env.PORT || 4000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  supabaseUrl: required('SUPABASE_URL'),
  supabaseSecretKey: required('SUPABASE_SECRET_KEY'),
  databaseUrl: required('DATABASE_URL'),
  adminEmails: new Set(
    (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  ),
} as const;
```

- [ ] **Step 2: Create `backend/src/lib/supabase.ts`**

```typescript
import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

export const supabase = createClient(
  env.supabaseUrl,
  env.supabaseSecretKey,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  },
);
```

- [ ] **Step 3: Create `backend/src/middleware/auth.middleware.ts`**

```typescript
import type { NextFunction, Request, Response } from 'express';
import { env } from '../lib/env.js';
import { supabase } from '../lib/supabase.js';

export const requireAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request
    .header('authorization')
    ?.replace(/^Bearer\s+/i, '');
  if (!token) {
    response.status(401).json({ error: 'Authentication is required.' });
    return;
  }

  const { data, error } = await supabase.auth.getUser(token);
  const email = data.user?.email?.toLowerCase();
  if (error || !email || !env.adminEmails.has(email)) {
    response.status(403).json({ error: 'Administrator access is required.' });
    return;
  }

  next();
};
```

- [ ] **Step 4: Delete old files** `backend/src/config.ts`, `backend/src/supabase.ts`, `backend/src/auth.ts`

- [ ] **Step 5: Commit**

```bash
git add -A backend/src
git commit -m "refactor(backend): move config/supabase/auth into lib and middleware"
```

### Task 1.6: Content service layer

**Files:**
- Create: `backend/src/services\content.service.ts`
- Delete: `backend/src/content.ts`
- Delete: `backend/src/types.ts` (replaced by shared)

- [ ] **Step 1: Create the service**

```typescript
import type {
  ContentInput,
  ContentRecord,
  ContentType,
} from '../../../shared/content.js';
import { supabase } from '../lib/supabase.js';

type DatabaseContent = {
  id: string;
  type: ContentType;
  slug: string;
  title: string;
  date: string;
  thumbnail: string | null;
  description: string | null;
  summary: string | null;
  body: string;
  metadata: Record<string, unknown> | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

const TABLE = 'contents';

const toRecord = (row: DatabaseContent): ContentRecord => ({
  id: row.id,
  type: row.type,
  slug: row.slug,
  title: row.title,
  date: row.date,
  thumbnail: row.thumbnail || undefined,
  description: row.description || undefined,
  summary: row.summary || undefined,
  body: row.body,
  metadata: row.metadata || {},
  isPublished: row.is_published,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const toInsert = (type: ContentType, input: ContentInput) => ({
  type,
  slug: input.slug,
  title: input.title,
  date: input.date,
  thumbnail: input.thumbnail || null,
  description: input.description || null,
  summary: input.summary || null,
  body: input.body,
  metadata: input.metadata || {},
  is_published: input.isPublished ?? true,
});

export const contentService = {
  async listPublished(type: ContentType): Promise<ContentRecord[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('type', type)
      .eq('is_published', true)
      .order('date', { ascending: false });
    if (error) throw error;
    return (data || []).map(toRecord);
  },

  async getBySlug(
    type: ContentType,
    slug: string,
  ): Promise<ContentRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('type', type)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();
    if (error) throw error;
    return data ? toRecord(data) : null;
  },

  async create(
    type: ContentType,
    input: ContentInput,
  ): Promise<ContentRecord> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(toInsert(type, input))
      .select()
      .single();
    if (error) throw error;
    return toRecord(data);
  },

  async update(
    type: ContentType,
    slug: string,
    input: ContentInput,
  ): Promise<ContentRecord> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(toInsert(type, input))
      .eq('type', type)
      .eq('slug', slug)
      .select()
      .single();
    if (error) throw error;
    return toRecord(data);
  },

  async remove(type: ContentType, slug: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('type', type)
      .eq('slug', slug);
    if (error) throw error;
  },
};
```

- [ ] **Step 2: Delete `backend/src/content.ts` and `backend/src/types.ts`**

- [ ] **Step 3: Commit**

```bash
git add -A backend/src
git commit -m "refactor(backend): extract content.service from content.ts"
```

### Task 1.7: Content controller

**Files:**
- Create: `backend/src/controllers/content.controller.ts`

- [ ] **Step 1: Write controller**

```typescript
import type { NextFunction, Request, Response } from 'express';
import { contentTypes, type ContentType } from '../../../shared/content.js';
import { contentService } from '../services/content.service.js';

const isContentType = (value: string): value is ContentType =>
  contentTypes.includes(value as ContentType);

const rejectUnknownType = (
  response: Response,
): false | ContentType => {
  response.status(404).json({ error: 'Unknown content type.' });
  return false;
};

export const contentController = {
  async list(request: Request, response: Response, next: NextFunction) {
    try {
      const type = request.params.type;
      if (!isContentType(type)) {
        rejectUnknownType(response);
        return;
      }
      const items = await contentService.listPublished(type);
      response.json(items);
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(request: Request, response: Response, next: NextFunction) {
    try {
      const type = request.params.type;
      if (!isContentType(type)) {
        rejectUnknownType(response);
        return;
      }
      const record = await contentService.getBySlug(type, request.params.slug);
      if (!record) {
        response.status(404).json({ error: 'Content not found.' });
        return;
      }
      response.json(record);
    } catch (error) {
      next(error);
    }
  },

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const type = request.params.type;
      if (!isContentType(type)) {
        rejectUnknownType(response);
        return;
      }
      const record = await contentService.create(type, request.body);
      response.status(201).json(record);
    } catch (error) {
      next(error);
    }
  },

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const type = request.params.type;
      if (!isContentType(type)) {
        rejectUnknownType(response);
        return;
      }
      const record = await contentService.update(type, request.params.slug, request.body);
      response.json(record);
    } catch (error) {
      next(error);
    }
  },

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const type = request.params.type;
      if (!isContentType(type)) {
        rejectUnknownType(response);
        return;
      }
      await contentService.remove(type, request.params.slug);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/controllers/content.controller.ts
git commit -m "feat(backend): add content controller"
```

### Task 1.8: Routes

**Files:**
- Create: `backend/src/routes/health.routes.ts`
- Create: `backend/src/routes/content.routes.ts`
- Create: `backend/src/routes/upload.routes.ts`

- [ ] **Step 1: Health routes**

```typescript
import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/health', (_request, response) => {
  response.json({ ok: true });
});
```

- [ ] **Step 2: Content routes (with zod validation on write paths)**

```typescript
import { Router } from 'express';
import { contentController } from '../controllers/content.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { contentInputSchema } from '../schemas/content.schema.js';

export const contentRouter = Router();

contentRouter.get('/:type', contentController.list);
contentRouter.get('/:type/:slug', contentController.getBySlug);

contentRouter.post(
  '/:type',
  requireAdmin,
  validateBody(contentInputSchema),
  contentController.create,
);
contentRouter.patch(
  '/:type/:slug',
  requireAdmin,
  validateBody(contentInputSchema),
  contentController.update,
);
contentRouter.delete(
  '/:type/:slug',
  requireAdmin,
  contentController.remove,
);
```

- [ ] **Step 3: Upload routes (moved verbatim from server.ts)**

```typescript
import { Router } from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { supabase } from '../lib/supabase.js';

export const uploadRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

uploadRouter.post(
  '/',
  requireAdmin,
  upload.single('file'),
  async (request, response, next) => {
    try {
      if (!request.file) {
        response.status(400).json({ error: 'A file is required.' });
        return;
      }
      const extension = path.extname(request.file.originalname).toLowerCase();
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
      response.status(201).json({ path: filePath, url: data.publicUrl });
    } catch (error) {
      next(error);
    }
  },
);
```

- [ ] **Step 4: Commit**

```bash
git add backend/src/routes
git commit -m "feat(backend): split routes into health/content/upload routers"
```

### Task 1.9: Slim server.ts

**Files:**
- Modify: `c:\Users\cyhin\profile\backend\src\server.ts` (rewrite)

- [ ] **Step 1: Rewrite server.ts as composition only**

```typescript
import cors from 'cors';
import express from 'express';
import { env } from './lib/env.js';
import { contentRouter } from './routes/content.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { uploadRouter } from './routes/upload.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

export const app = express();

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json({ limit: '2mb' }));

app.use('/api', healthRouter);
app.use('/api/content', contentRouter);
app.use('/api/uploads', uploadRouter);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(env.port, () => {
    console.log(`Content API listening on http://localhost:${env.port}`);
  });
}
```

- [ ] **Step 2: Run verify script**

```bash
cd backend
npm run verify:api
```
Expected: `API verified: N works, M articles, and one detail route.`

- [ ] **Step 3: Commit**

```bash
git add backend/src/server.ts
git commit -m "refactor(backend): slim server.ts to route composition"
```

### Task 1.10: Decouple seed script from frontend data

**Files:**
- Create: `c:\Users\cyhin\profile\backend\scripts\seed-data\works.ts`
- Create: `c:\Users\cyhin\profile\backend\scripts\seed-data\writing.ts`
- Modify: `c:\Users\cyhin\profile\backend\scripts\seed.ts`
- Delete: `c:\Users\cyhin\profile\src\data\works.ts`, `src\data\writing.ts` (after copy)

The current `seed.ts` imports `../../src/data/works.ts` — this breaks when the frontend moves to Next.js. Move the seed data into the backend.

- [ ] **Step 1: Copy the two data files into `backend/scripts/seed-data/`**

Copy the full contents of `src/data/works.ts` → `backend/scripts/seed-data/works.ts` and `src/data/writing.ts` → `backend/scripts/seed-data/writing.ts`. Change the `MarkdownPost` import to a local interface:

```typescript
// backend/scripts/seed-data/works.ts (and writing.ts)
export interface SeedItem {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  description?: string;
  summary?: string;
  body: string;
  [key: string]: unknown;
}

export const worksData: SeedItem[] = [
  /* ...existing array contents... */
];
```

- [ ] **Step 2: Rewrite `backend/scripts/seed.ts`**

```typescript
import 'dotenv/config';
import { worksData } from './seed-data/works.js';
import { writingData } from './seed-data/writing.js';
import { contentService } from '../src/services/content.service.js';
import type { ContentInput } from '../../shared/content.js';

const toInput = (item: SeedItem): ContentInput => {
  const { slug, title, date, thumbnail, description, summary, body, ...metadata } = item;
  return { slug, title, date, thumbnail, description, summary, body, metadata };
};

const works = worksData.map((item) =>
  contentService.create('works', toInput(item)).catch(() => {
    /* upsert path */
  }),
);
// NOTE: supabase upsert is preferred. If create() conflicts, use service.update.
// For simplicity keep the existing upsert behavior by adding an upsert helper to the service
// if needed during execution.
```

> **Note for executor:** The original `seed.ts` used `supabase.from('contents').upsert(..., { onConflict: 'type,slug' })`. To preserve that, add an `upsert(type, input)` method to `contentService` and call it here instead of `create`. The exact method body:

```typescript
async upsert(type: ContentType, input: ContentInput): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .upsert(toInsert(type, input), { onConflict: 'type,slug' });
  if (error) throw error;
},
```

Then `seed.ts`:

```typescript
import 'dotenv/config';
import { worksData } from './seed-data/works.js';
import { writingData } from './seed-data/writing.js';
import { contentService } from '../src/services/content.service.js';
import type { ContentInput, ContentType } from '../../shared/content.js';

const toInput = (item: typeof worksData[number]): ContentInput => {
  const { slug, title, date, thumbnail, description, summary, body, ...metadata } = item;
  return { slug, title, date, thumbnail, description, summary, body, metadata };
};

const seedType = async (type: ContentType, items: typeof worksData) => {
  for (const item of items) {
    await contentService.upsert(type, toInput(item));
  }
};

await seedType('works', worksData);
await seedType('writing', writingData);
console.log(`Seeded ${worksData.length} works and ${writingData.length} articles.`);
```

- [ ] **Step 3: Delete `src/data/works.ts` and `src/data/writing.ts`** (only after confirming seed runs).

- [ ] **Step 4: Run seed & verify**

```bash
cd backend
npm run db:seed
npm run verify:api
```

- [ ] **Step 5: Commit**

```bash
git add -A backend/scripts
git rm src/data/works.ts src/data/writing.ts
git commit -m "refactor(backend): move seed data out of frontend, decouple from Vite"
```

---

# Phase 2: Next.js Migration Setup

**Goal:** Replace Vite with Next.js App Router, restore the design system (Tailwind v4 + theme tokens + fonts), wire the app shell. Home renders at `http://localhost:3000` by end of phase.

### Task 2.1: Init Next.js & remove Vite

**Files:**
- Create: `c:\Users\cyhin\profile\next.config.ts`
- Create: `c:\Users\cyhin\profile\tsconfig.json` (overwrite)
- Modify: `c:\Users\cyhin\profile\package.json` (overwrite)
- Delete: `vite.config.ts`, `index.html`, `postcss.config.js`, `metadata.json`, `netlify.toml`, `src/index.tsx`, `src/App.tsx`, `src/vite-env.d.ts`

- [ ] **Step 1: Install Next.js + retain runtime deps**

```bash
npm install next@latest react@latest react-dom@latest
npm install -D @types/node @types/react @types/react-dom typescript
```

- [ ] **Step 2: Overwrite `package.json` scripts**

```json
{
  "name": "profile",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.4.0",
    "@tanstack/react-query": "^5.59.0",
    "axios": "^1.7.7",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.554.0",
    "next": "^15.0.0",
    "react": "^19.0.2",
    "react-dom": "^19.0.2",
    "react-icons": "^5.5.0",
    "react-markdown": "^10.1.0",
    "three": "^0.181.2",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.17",
    "@types/node": "^22.19.1",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "prettier": "^3.7.4",
    "tailwindcss": "^4.1.17",
    "typescript": "~5.8.2"
  }
}
```

- [ ] **Step 3: Create `next.config.ts`**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'fonts.googleapis.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Overwrite `tsconfig.json` (Next.js preset + path alias)**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "backend"]
}
```

- [ ] **Step 5: Create `postcss.config.mjs` (Tailwind v4)**

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 6: Delete Vite-specific files**

```bash
rm vite.config.ts index.html postcss.config.js metadata.json netlify.toml
rm src/index.tsx src/App.tsx src/vite-env.d.ts
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "build(web): swap Vite for Next.js App Router"
```

### Task 2.2: Tailwind v4 + theme tokens + fonts

**Files:**
- Create: `c:\Users\cyhin\profile\app\globals.css`
- Create: `c:\Users\cyhin\profile\app\layout.tsx` (font wiring — full layout in Task 2.4)

- [ ] **Step 1: Create `app/globals.css`**

Port the existing `src/index.css` verbatim. Only change: remove `@import 'tailwindcss';` line is kept (Tailwind v4 entry). The whole `@theme` block, `@layer base`, `@layer components`, and the custom `body`/`::selection`/scrollbar rules move unchanged.

```css
@import 'tailwindcss';

@variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: 'Outfit', 'Roboto Mono', monospace;
  --font-mono: 'Roboto Mono', monospace;
  --font-serif: 'Outfit', serif;
  --font-brush: 'Space Mono', monospace;

  --color-paper: #f0e7db;
  --color-ink: #202023;
  --color-cinnabar: #8c2f25;
  --color-cinnabar-light: #b94b40;
  --color-jade: #00a86b;
  --color-purple: #9333ea;

  --color-surface: #fffdf9;
  --color-surface-muted: #f7f2eb;
  --color-outline: #ded5c9;

  --color-stone-50: #f9f8f6;
  --color-stone-100: #f2efeb;
  --color-stone-200: #e6e0d8;
  --color-stone-300: #d1c5b8;
  --color-stone-400: #b0a090;
  --color-stone-500: #8f7e6d;
  --color-stone-600: #6e5f50;
  --color-stone-700: #52463a;
  --color-stone-800: #3d342b;
  --color-stone-900: #26201a;

  --animate-spin-slow: spin 8s linear infinite;
  --backdrop-blur-xs: 2px;
}

@layer base {
  *, ::before, ::after {
    border-color: var(--color-outline);
  }
  :focus-visible {
    outline: 2px solid var(--color-jade);
    outline-offset: 3px;
  }
}

@layer components {
  .page-shell {
    @apply mx-auto w-full max-w-5xl px-4 pt-28 sm:px-6 lg:px-8;
  }
  .page-intro {
    @apply mb-10 border-b border-stone-200 pb-6 dark:border-stone-800;
  }
  .page-kicker {
    @apply mb-2 text-xs font-bold uppercase tracking-[0.18em] text-jade;
  }
  .page-title {
    @apply font-serif text-3xl font-bold tracking-tight text-ink dark:text-stone-100 md:text-4xl;
  }
  .page-description {
    @apply mt-3 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400;
  }
  .surface-card {
    @apply rounded-2xl border border-stone-200 bg-white/50 transition-colors dark:border-white/10 dark:bg-white/5;
  }
  .button-primary {
    @apply inline-flex items-center justify-center gap-2 rounded-full border border-cinnabar bg-cinnabar px-5 py-2.5 font-serif text-sm font-bold text-white transition-colors hover:bg-cinnabar-light;
  }
  .button-secondary {
    @apply inline-flex items-center gap-2 rounded-full px-1 text-sm font-medium text-stone-500 transition-colors hover:text-jade dark:text-stone-400;
  }
  .meta-label {
    @apply inline-flex w-20 shrink-0 justify-center rounded border border-jade/30 bg-jade/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-jade dark:bg-jade/15;
  }
}

body {
  background-color: var(--color-paper);
  color: var(--color-ink);
  transition: background-color 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  letter-spacing: -0.015em;
  line-height: 1.6;
  font-weight: 300;
}

.dark body {
  background-color: #202023;
  color: #eeeeee;
}

::selection {
  background: rgba(140, 47, 37, 0.2);
  color: #8c2f25;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background-color: var(--color-stone-300); border-radius: 10px; }
.dark ::-webkit-scrollbar-thumb { background-color: #44403c; }
```

> **Note:** `.surface-card` and `.button-primary` had `shadow-sm` / `hover:shadow-lg` in the original. Per user preference ("border-over-shadow, hạn chế shadow ở các card"), shadows are replaced with borders. `.surface-card` keeps a border only; `.button-primary` keeps a border instead of `hover:shadow-lg`.

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat(web): port design tokens to globals.css (border-over-shadow)"
```

### Task 2.3: Root layout with fonts & metadata

**Files:**
- Create: `c:\Users\cyhin\profile\app\layout.tsx`

- [ ] **Step 1: Write root layout**

```tsx
import type { Metadata, Viewport } from 'next';
import { Outfit, Roboto_Mono, Space_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['300', '400', '700'], variable: '--font-roboto-mono', display: 'swap' });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--font-space-mono', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'GuoYing | Digital Craftsman',
    template: '%s | GuoYing',
  },
  description: 'Digital Craftsman based in Vietnam. Portfolio of web development, 3D experiences, and creative coding.',
  metadataBase: new URL('https://example.com'),
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0e7db' },
    { media: '(prefers-color-scheme: dark)', color: '#202023' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${robotoMono.variable} ${spaceMono.variable} antialiased`} suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col font-sans text-ink dark:text-stone-200 transition-colors duration-500">
            <Navbar />
            <main className="grow">
              <div className="page-shell">{children}</div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
```

> **Note:** Update `globals.css` `@theme` font vars to reference the next/font CSS variables (`--font-outfit`, `--font-roboto-mono`, `--font-space-mono`) instead of hardcoded Google Fonts names. Replace:
> ```css
> --font-sans: var(--font-outfit), 'Roboto Mono', monospace;
> --font-mono: var(--font-roboto-mono), monospace;
> --font-serif: var(--font-outfit), serif;
> --font-brush: var(--font-space-mono), monospace;
> ```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(web): root layout with next/font and metadata"
```

### Task 2.4: Providers + Navbar + Footer (shell)

**Files:**
- Create: `c:\Users\cyhin\profile\components\providers.tsx`
- Create: `c:\Users\cyhin\profile\components\navbar.tsx`
- Create: `c:\Users\cyhin\profile\components\footer.tsx`

`Providers` wires TanStack Query + Zustand hydration + theme bootstrap. It's a stub now (Query/Zustand added in Phase 3); create the shell so Home renders.

- [ ] **Step 1: Create `components/providers.tsx` (stub, filled in Phase 3)**

```tsx
'use client';

import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // TanStack QueryClientProvider + Zustand theme bootstrap added in Phase 3.
  return <>{children}</>;
}
```

- [ ] **Step 2: Create `components/navbar.tsx`** — port from `src/components/Navbar.tsx`, replacing `react-router-dom` `Link`/`useLocation` with `next/link` and `usePathname`.

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import ThemeToggle from './theme-toggle';
import { useUiStore } from '@/stores/ui-store';

const navItems = [
  { path: '/', labelKey: 'nav.about' as const },
  { path: '/works', labelKey: 'nav.works' as const },
  { path: '/posts', labelKey: 'nav.posts' as const },
];

export default function Navbar() {
  const pathname = usePathname();
  const { t, language, toggleLanguage } = useUiStore();

  const isPathActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <div className="fixed top-6 w-full z-50 flex justify-center pointer-events-none px-4">
      <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-[#f0e7db]/25 dark:bg-[#202023]/80 backdrop-blur-md border border-white/20 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 transition-colors duration-500 max-w-full overflow-hidden">
        <div className="flex items-center">
          {navItems.map((item) => {
            const isActive = isPathActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={clsx(
                  'relative px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap',
                  isActive
                    ? 'text-cinnabar dark:text-cinnabar-light font-serif font-bold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-ink dark:hover:text-stone-200 font-serif',
                )}
              >
                {t(item.labelKey)}
                {isActive && (
                  <motion.div
                    layoutId="navbar-bg"
                    className="absolute inset-0 bg-stone-100 dark:bg-stone-800 rounded-full z-[-1]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        <div className="w-px h-4 bg-stone-300 dark:bg-stone-700 mx-1 shrink-0" />
        <div className="flex items-center gap-1 pr-1 shrink-0">
          <button
            onClick={toggleLanguage}
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-700/50 transition-colors"
            aria-label="Switch Language"
          >
            <span className="font-serif font-bold text-xs md:text-sm pt-0.5">
              {language === 'en' ? 'EN' : '中'}
            </span>
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/footer.tsx`** — port from `src/components/Footer.tsx`.

```tsx
'use client';

import { Github, Mail, Linkedin } from 'lucide-react';
import { useUiStore } from '@/stores/ui-store';

export default function Footer() {
  const { t } = useUiStore();
  return (
    <footer className="mt-32 pb-10 text-center text-stone-400 dark:text-stone-600 text-sm">
      <div className="flex justify-center space-x-8 mb-6">
        <a href="https://github.com/cyhinverse" aria-label="GitHub Profile" className="hover:text-jade transition-colors transform hover:scale-110 duration-300">
          <Github size={20} strokeWidth={1.5} />
        </a>
        <a href="https://www.linkedin.com/in/tranphanquocanh/" aria-label="LinkedIn Profile" className="hover:text-jade transition-colors transform hover:scale-110 duration-300">
          <Linkedin size={20} strokeWidth={1.5} />
        </a>
        <a href="#" aria-label="Email Contact" className="hover:text-jade transition-colors transform hover:scale-110 duration-300">
          <Mail size={20} strokeWidth={1.5} />
        </a>
      </div>
      <p className="font-serif opacity-80 tracking-wide">{t('footer.text')}</p>
    </footer>
  );
}
```

- [ ] **Step 4: Create stub `stores/ui-store.ts`** (filled in Phase 3)

```ts
'use client';
export const useUiStore = () => ({
  t: (key: string) => key,
  language: 'en' as 'en' | 'zh',
  toggleLanguage: () => {},
  theme: 'light' as 'light' | 'dark',
  toggleTheme: () => {},
});
```

- [ ] **Step 5: Commit**

```bash
git add components/ stores/
git commit -m "feat(web): app shell (providers, navbar, footer stubs)"
```

---

# Phase 3: Data Layer

**Goal:** Axios client, TanStack Query provider, typed content hooks, Zustand UI store (theme + language + i18n). Replaces raw `fetch` + `useEffect` + `LanguageContext`.

### Task 3.1: Axios API client

**Files:**
- Create: `c:\Users\cyhin\profile\lib\api-client.ts`
- Create: `c:\Users\cyhin\profile\lib\content-api.ts`
- Create: `c:\Users\cyhin\profile\lib\query-keys.ts`

- [ ] **Step 1: Create Axios instance**

```typescript
import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || 'Request failed.';
    return Promise.reject(new Error(message));
  },
);
```

- [ ] **Step 2: Create typed content endpoints**

```typescript
import { apiClient } from './api-client';
import type { ContentCard, ContentType } from '@/shared/content';

/** Flatten a ContentRecord into a ContentCard the UI consumes. */
const toCard = (record: any): ContentCard => {
  const { id, type, createdAt, updatedAt, isPublished, metadata, ...rest } = record;
  return { ...rest, ...(metadata || {}) } as ContentCard;
};

export const contentApi = {
  list: async (type: ContentType): Promise<ContentCard[]> => {
    const { data } = await apiClient.get(`/content/${type}`);
    return data.map(toCard);
  },
  getBySlug: async (type: ContentType, slug: string): Promise<ContentCard | null> => {
    try {
      const { data } = await apiClient.get(`/content/${type}/${encodeURIComponent(slug)}`);
      return toCard(data);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) return null;
      throw error;
    }
  },
};
```

- [ ] **Step 3: Create query keys factory**

```typescript
import type { ContentType } from '@/shared/content';

export const queryKeys = {
  content: {
    all: ['content'] as const,
    list: (type: ContentType) => ['content', type, 'list'] as const,
    detail: (type: ContentType, slug: string) => ['content', type, 'detail', slug] as const,
  },
};
```

- [ ] **Step 4: Commit**

```bash
git add lib/
git commit -m "feat(web): axios client + typed content api + query keys"
```

### Task 3.2: TanStack Query provider

**Files:**
- Modify: `c:\Users\cyhin\profile\components\providers.tsx`

- [ ] **Step 1: Install TanStack Query**

```bash
npm install @tanstack/react-query
```

- [ ] **Step 2: Update `components/providers.tsx`**

```tsx
'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUiStore } from '@/stores/ui-store';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  // Bootstrap theme class before paint to avoid flash.
  useUiStore((state) => state.theme);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/providers.tsx
git commit -m "feat(web): wire TanStack Query provider"
```

### Task 3.3: Content query hooks

**Files:**
- Create: `c:\Users\cyhin\profile\hooks\use-content.ts`

- [ ] **Step 1: Write hooks**

```typescript
import { useQuery } from '@tanstack/react-query';
import { contentApi } from '@/lib/content-api';
import { queryKeys } from '@/lib/query-keys';
import type { ContentType } from '@/shared/content';

export function useContentList(type: ContentType) {
  return useQuery({
    queryKey: queryKeys.content.list(type),
    queryFn: () => contentApi.list(type),
  });
}

export function useContentDetail(type: ContentType, slug: string) {
  return useQuery({
    queryKey: queryKeys.content.detail(type, slug),
    queryFn: () => contentApi.getBySlug(type, slug),
    enabled: Boolean(slug),
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add hooks/use-content.ts
git commit -m "feat(web): add useContentList and useContentDetail hooks"
```

### Task 3.4: Zustand UI store + i18n messages

**Files:**
- Create: `c:\Users\cyhin\profile\messages\en.ts`
- Create: `c:\Users\cyhin\profile\messages\zh.ts`
- Create: `c:\Users\cyhin\profile\stores\ui-store.ts` (replace stub)
- Modify: `c:\Users\cyhin\profile\components\theme-toggle.tsx` (use store)

- [ ] **Step 1: Create `messages/en.ts`** — copy the `en` object from `src/context/LanguageContext.tsx:16-80` and export it:

```typescript
export const en = {
  'nav.about': 'Home',
  'nav.works': 'Works',
  'nav.posts': 'Writing',
  // ... (all keys from the original translations.en)
  'not_found.home_btn': 'Return Home',
} as const;

export type TranslationKey = keyof typeof en;
```

- [ ] **Step 2: Create `messages/zh.ts`** — copy the `zh` object from `LanguageContext.tsx:81-138`:

```typescript
import type { TranslationKey } from './en';
export const zh: Record<TranslationKey, string> = {
  'nav.about': '首页',
  // ... (all keys from translations.zh)
  'not_found.home_btn': '返回首页',
};
```

- [ ] **Step 3: Create `stores/ui-store.ts`**

```typescript
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { en, type TranslationKey } from '@/messages/en';
import { zh } from '@/messages/zh';

type Language = 'en' | 'zh';
type Theme = 'light' | 'dark';

interface UiState {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (key: TranslationKey) => string;
}

const dictionaries = { en, zh };

const applyThemeClass = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      language: 'en',
      theme: 'light',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === 'en' ? 'zh' : 'en' })),
      setTheme: (theme) => {
        applyThemeClass(theme);
        set({ theme });
      },
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'light' ? 'dark' : 'light';
          applyThemeClass(next);
          return { theme: next };
        }),
      t: (key) => {
        const { language } = get();
        return dictionaries[language][key] || en[key] || key;
      },
    }),
    {
      name: 'profile-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ language: state.language, theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) applyThemeClass(state.theme);
      },
    },
  ),
);
```

- [ ] **Step 4: Add theme bootstrap script in `app/layout.tsx` `<head>`** to prevent FOUC. Add before `<body>`:

```tsx
<head>
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(){try{var s=localStorage.getItem('profile-ui');if(s){var t=JSON.parse(s).state.theme;if(t==='dark')document.documentElement.classList.add('dark');}}catch(e){}})();`,
    }}
  />
</head>
```

- [ ] **Step 5: Rewrite `components/theme-toggle.tsx`**

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useUiStore } from '@/stores/ui-store';

export default function ThemeToggle() {
  const theme = useUiStore((s) => s.theme);
  const toggleTheme = useUiStore((s) => s.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-700/50 transition-colors"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? (
            <Sun size={18} className="text-orange-400" />
          ) : (
            <Moon size={18} className="text-indigo-300" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
```

- [ ] **Step 6: Install zustand**

```bash
npm install zustand
```

- [ ] **Step 7: Delete `src/context/LanguageContext.tsx` and `src/utils/markdown.ts`** (replaced).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(web): zustand UI store + split i18n messages + theme bootstrap"
```

---

# Phase 4: Pages (App Router)

**Goal:** Migrate all 5 pages to App Router with TanStack Query. Full feature parity.

### Task 4.1: Shared components (Section, PageIntro, ContentState)

**Files:**
- Create: `c:\Users\cyhin\profile\components\section.tsx`
- Create: `c:\Users\cyhin\profile\components\page-intro.tsx`
- Create: `c:\Users\cyhin\profile\components\content-state.tsx`

- [ ] **Step 1: `components/section.tsx`** — port from `src/components/Section.tsx` unchanged (it's already framework-agnostic, just remove the `React` default import style if desired):

```tsx
'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  delay?: number;
}

const Section: React.FC<SectionProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    className="mb-6"
    style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
  >
    {children}
  </motion.div>
);

export default Section;
```

- [ ] **Step 2: `components/page-intro.tsx`** — port from `src/components/PageIntro.tsx` verbatim.

- [ ] **Step 3: `components/content-state.tsx`** — port `LoadingState` and `EmptyState` from `src/components/ContentState.tsx`, swap `react-router-dom` `Link` for `next/link`.

```tsx
import Link from 'next/link';
import React from 'react';

interface ContentStateProps {
  title: string;
  description?: string;
  action?: { label: string; to: string };
}

export const LoadingState: React.FC<{ label?: string }> = ({
  label = 'Loading content…',
}) => (
  <div className="flex min-h-48 items-center justify-center" aria-live="polite">
    <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-cinnabar dark:border-stone-600" />
      {label}
    </div>
  </div>
);

export const EmptyState: React.FC<ContentStateProps> = ({ title, description, action }) => (
  <div className="surface-card flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">
    <h2 className="font-serif text-xl font-bold text-ink dark:text-stone-100">{title}</h2>
    {description && (
      <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-400">
        {description}
      </p>
    )}
    {action && (
      <Link className="button-primary mt-6" href={action.to}>
        {action.label}
      </Link>
    )}
  </div>
);
```

- [ ] **Step 4: Commit**

```bash
git add components/section.tsx components/page-intro.tsx components/content-state.tsx
git commit -m "feat(web): port Section, PageIntro, ContentState components"
```

### Task 4.2: Home page

**Files:**
- Create: `c:\Users\cyhin\profile\app\page.tsx`

- [ ] **Step 1: Write Home page** — port from `src/pages/Home.tsx`, swapping `Link` and `useLanguage`. Keep `ScholarRock` lazy via `next/dynamic`.

```tsx
'use client';

import React, { Suspense, useState, startTransition } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '@/components/section';
import MarkdownRenderer from '@/components/markdown-renderer';
import { useUiStore } from '@/stores/ui-store';

const ScholarRock = dynamic(() => import('@/components/scholar-rock'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center relative">
      <div className="text-stone-400 animate-pulse relative z-10">Loading 3D...</div>
    </div>
  ),
});

export default function HomePage() {
  const t = useUiStore((s) => s.t);
  const [shouldRender3D, setShouldRender3D] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => setShouldRender3D(true));
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-4">
      <Section>
        <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center mb-6 border border-white/40 dark:border-white/10 backdrop-blur-sm" style={{ transform: 'translateZ(0)' }}>
          <motion.p
            className="text-stone-700 dark:text-stone-300 font-serif italic inline-block"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 -20% 0 0)' }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          >
            {t('home.greeting')}
          </motion.p>
        </div>
      </Section>

      <Section delay={0.1}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="grow text-center md:text-left">
            <h2 className="text-4xl font-brush font-bold text-ink dark:text-stone-100 mb-3 tracking-wide">
              Quoc Anh
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg font-serif tracking-wider">
              {t('home.role')}
            </p>
          </div>
          <div className="shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-stone-100 dark:ring-stone-800 border border-stone-200 dark:border-white/10 relative group">
              <img
                src="/img/av.png"
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-110"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="relative w-full my-8 py-4 flex flex-col items-center justify-center">
          <div className="w-full relative z-10 h-[400px]">
            {shouldRender3D ? (
              <Suspense fallback={<div className="text-stone-400 animate-pulse">Loading 3D...</div>}>
                <ScholarRock />
              </Suspense>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-stone-400 animate-pulse">Loading 3D...</div>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section delay={0.3}>
        <h3 className="text-2xl font-serif font-bold underline decoration-2 decoration-cinnabar/30 dark:decoration-cinnabar-light/30 underline-offset-8 mb-6 text-ink dark:text-stone-100">
          {t('home.work_title')}
        </h3>
        <div className="text-stone-700 dark:text-stone-300 leading-relaxed text-lg mb-6 font-sans text-justify">
          <MarkdownRenderer content={t('home.work_desc')} />
        </div>
        <div className="flex justify-center my-10">
          <Link href="/works" className="button-primary group">
            {t('home.portfolio_btn')}{' '}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Section delay={0.4}>
        <h3 className="text-2xl font-serif font-bold underline decoration-2 decoration-cinnabar/30 dark:decoration-cinnabar-light/30 underline-offset-8 mb-6 text-ink dark:text-stone-100">
          {t('home.bio_title')}
        </h3>
        <div className="space-y-4">
          {[
            { year: '2004', key: 'home.born' as const },
            { year: '2022', key: 'home.master' as const },
            { year: '2025', key: 'home.freelance' as const },
          ].map((row) => (
            <div key={row.year} className="flex gap-3 group hover:bg-white/50 dark:hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2">
              <span className="font-bold text-ink dark:text-stone-200 font-serif text-base pt-1 min-w-12">
                {row.year}
              </span>
              <span className="text-stone-700 dark:text-stone-300 text-lg font-sans">
                {t(row.key)}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section delay={0.5}>
        <h3 className="text-2xl font-serif font-bold underline decoration-2 decoration-cinnabar/30 dark:decoration-cinnabar-light/30 underline-offset-8 mb-6 text-ink dark:text-stone-100">
          {t('home.love_title')}
        </h3>
        <div className="text-stone-700 dark:text-stone-300 leading-loose text-lg font-sans">
          <MarkdownRenderer content={t('home.love_desc')} />
        </div>
      </Section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat(web): migrate Home page to App Router"
```

### Task 4.3: Works list page

**Files:**
- Create: `c:\Users\cyhin\profile\app\works\page.tsx`

- [ ] **Step 1: Write Works page** — port from `src/pages/Works.tsx`, replace `useEffect`/`useState` with `useContentList`.

```tsx
'use client';

import Link from 'next/link';
import Section from '@/components/section';
import PageIntro from '@/components/page-intro';
import { EmptyState, LoadingState } from '@/components/content-state';
import { useContentList } from '@/hooks/use-content';
import { useUiStore } from '@/stores/ui-store';
import type { ContentCard } from '@/shared/content';

const ProjectCard: React.FC<{
  project: ContentCard;
  buttonText: string;
}> = ({ project, buttonText }) => (
  <Link href={`/works/${project.slug}`} className="w-full group cursor-pointer block">
    <div className="w-full h-48 mb-4 overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10 relative">
      <img
        src={project.thumbnail || '/images/placeholder.jpg'}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.3]"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    </div>
    <div className="text-center px-2">
      <h4 className="mt-3 text-xl font-serif font-bold text-ink dark:text-stone-100 group-hover:text-jade transition-colors">
        {project.title}
      </h4>
      <p className="text-base text-stone-600 dark:text-stone-400 font-light mt-1 line-clamp-2">
        {project.description}
      </p>
      <span className="inline-block mt-3 text-xs font-medium text-jade opacity-100 md:opacity-0 transform translate-y-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
        {buttonText} →
      </span>
    </div>
  </Link>
);

export default function WorksPage() {
  const t = useUiStore((s) => s.t);
  const { data: projects, isLoading, isError } = useContentList('works');

  return (
    <div>
      <Section>
        <PageIntro title={t('works.title')} kicker={t('works.kicker')} description={t('works.description')} />
      </Section>

      {isError ? (
        <EmptyState title={t('content.unavailable_title')} description={t('content.unavailable_desc')} />
      ) : isLoading || !projects ? (
        <LoadingState label={t('works.loading')} />
      ) : projects.length === 0 ? (
        <EmptyState title={t('works.empty_title')} description={t('works.empty_desc')} />
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Section key={project.slug} delay={index * 0.1}>
              <ProjectCard project={project} buttonText={t('works.read_more')} />
            </Section>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/works/page.tsx
git commit -m "feat(web): migrate Works list page to App Router + TanStack Query"
```

### Task 4.4: Posts list page

**Files:**
- Create: `c:\Users\cyhin\profile\app\posts\page.tsx`

- [ ] **Step 1: Write Posts page** — port from `src/pages/Posts.tsx`, same pattern as Works but type `'writing'`.

```tsx
'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import Section from '@/components/section';
import PageIntro from '@/components/page-intro';
import { EmptyState, LoadingState } from '@/components/content-state';
import { useContentList } from '@/hooks/use-content';
import { useUiStore } from '@/stores/ui-store';
import type { ContentCard } from '@/shared/content';

const PostItem: React.FC<{ post: ContentCard }> = ({ post }) => (
  <Link href={`/posts/${post.slug}`} className="block group cursor-pointer mb-8 md:mb-10">
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
      <h4 className="text-lg md:text-xl font-serif font-bold text-ink dark:text-stone-100 group-hover:text-jade transition-colors group-hover:underline decoration-1 underline-offset-4">
        {post.title}
      </h4>
      <span className="text-xs font-mono text-stone-400 shrink-0 sm:ml-4 mt-1 sm:mt-0">
        {format(new Date(post.date), 'yyyy-MM-dd')}
      </span>
    </div>
    <p className="text-stone-600 dark:text-stone-400 text-base font-light line-clamp-2 leading-relaxed">
      {post.summary || post.description}
    </p>
  </Link>
);

export default function PostsPage() {
  const t = useUiStore((s) => s.t);
  const { data: posts, isLoading, isError } = useContentList('writing');

  return (
    <div>
      <Section>
        <PageIntro title={t('posts.title')} kicker={t('posts.kicker')} description={t('posts.description')} />
      </Section>

      {isError ? (
        <EmptyState title={t('content.unavailable_title')} description={t('content.unavailable_desc')} />
      ) : isLoading || !posts ? (
        <LoadingState label={t('posts.loading')} />
      ) : posts.length === 0 ? (
        <EmptyState title={t('posts.empty_title')} description={t('posts.empty_desc')} />
      ) : (
        <div className="max-w-3xl">
          {posts.map((post, index) => (
            <Section key={post.slug} delay={index * 0.1}>
              <PostItem post={post} />
            </Section>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/posts/page.tsx
git commit -m "feat(web): migrate Posts list page to App Router + TanStack Query"
```

### Task 4.5: Work detail page

**Files:**
- Create: `c:\Users\cyhin\profile\app\works\[slug]\page.tsx`

- [ ] **Step 1: Write Work detail page** — port from `src/pages/WorkDetail.tsx`, use `useContentDetail`.

```tsx
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import Section from '@/components/section';
import MarkdownRenderer from '@/components/markdown-renderer';
import ProjectMetadata from '@/components/project-metadata';
import { EmptyState, LoadingState } from '@/components/content-state';
import { useContentDetail } from '@/hooks/use-content';
import { useUiStore } from '@/stores/ui-store';

export default function WorkDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const t = useUiStore((s) => s.t);
  const { data: project, isLoading, isError } = useContentDetail('works', slug);

  if (isLoading) return <LoadingState label={t('project.loading')} />;

  if (!project) {
    return (
      <EmptyState
        title={isError ? t('content.unavailable_title') : t('project.missing_title')}
        description={isError ? t('content.unavailable_desc') : t('project.missing_desc')}
        action={{ label: isError ? t('back') : t('project.browse'), to: '/works' }}
      />
    );
  }

  return (
    <div className="pb-20">
      <Section>
        <div className="flex items-center gap-1.5 mb-8 text-sm font-medium">
          <Link href="/works" className="text-jade hover:underline transition-colors">
            Works
          </Link>
          <span className="text-stone-400 opacity-50 px-1">&gt;</span>
          <h1 className="text-xl font-bold text-ink dark:text-stone-100 truncate">
            {project.title}
          </h1>
          <span className="bg-stone-200/50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-1.5 py-0.5 rounded text-[10px] font-mono ml-1">
            {project.yearBadge || `${new Date(project.date).getFullYear()}-`}
          </span>
        </div>
      </Section>

      <Section delay={0.1}>
        <div className="mb-12">
          <p className="text-lg text-stone-700 dark:text-stone-300 font-light leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>
          <ProjectMetadata project={project} />
        </div>
      </Section>

      <Section delay={0.2}>
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-stone-200 dark:border-white/10 mb-10">
          <img
            src={project.thumbnail || '/images/placeholder.jpg'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Section>

      <Section delay={0.3}>
        <MarkdownRenderer content={project.body} />
        {project.link && (
          <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex justify-center">
            <a
              href={project.link}
              className="button-primary bg-ink hover:bg-jade dark:bg-stone-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live <ExternalLink size={16} />
            </a>
          </div>
        )}
      </Section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/works/[slug]/page.tsx
git commit -m "feat(web): migrate Work detail page to App Router"
```

### Task 4.6: Post detail page

**Files:**
- Create: `c:\Users\cyhin\profile\app\posts\[slug]\page.tsx`

- [ ] **Step 1: Write Post detail page** — port from `src/pages/PostDetail.tsx`.

```tsx
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Section from '@/components/section';
import MarkdownRenderer from '@/components/markdown-renderer';
import { EmptyState, LoadingState } from '@/components/content-state';
import { useContentDetail } from '@/hooks/use-content';
import { useUiStore } from '@/stores/ui-store';

export default function PostDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const t = useUiStore((s) => s.t);
  const { data: post, isLoading, isError } = useContentDetail('writing', slug);

  if (isLoading) return <LoadingState label={t('article.loading')} />;

  if (!post) {
    return (
      <EmptyState
        title={isError ? t('content.unavailable_title') : t('article.missing_title')}
        description={isError ? t('content.unavailable_desc') : t('article.missing_desc')}
        action={{ label: isError ? t('back') : t('article.browse'), to: '/posts' }}
      />
    );
  }

  return (
    <div className="pb-20">
      <Section>
        <Link href="/posts" className="button-secondary group mb-8">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t('back')}
        </Link>
      </Section>

      <article>
        <Section delay={0.1}>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink dark:text-stone-100 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-stone-500 dark:text-stone-400 font-mono mb-8">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {format(new Date(post.date), 'MMMM dd, yyyy')}
              </span>
            </div>
            {post.thumbnail && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700">
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </Section>

        <Section delay={0.2}>
          <div className="surface-card mx-auto max-w-2xl p-5 md:p-12">
            <MarkdownRenderer content={post.body} />
            <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-700 text-center font-serif italic text-stone-400">
              ***
            </div>
          </div>
        </Section>
      </article>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/posts/[slug]/page.tsx
git commit -m "feat(web): migrate Post detail page to App Router"
```

### Task 4.7: NotFound, loading, error boundaries

**Files:**
- Create: `c:\Users\cyhin\profile\app\not-found.tsx`
- Create: `c:\Users\cyhin\profile\app\loading.tsx`
- Create: `c:\Users\cyhin\profile\app\error.tsx`

- [ ] **Step 1: `app/not-found.tsx`** — port from `src/pages/NotFound.tsx`, swap `Link`.

```tsx
'use client';

import Link from 'next/link';
import Section from '@/components/section';
import { useUiStore } from '@/stores/ui-store';

export default function NotFound() {
  const t = useUiStore((s) => s.t);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center pt-20">
      <Section>
        <h1 className="text-9xl font-serif font-bold text-stone-200 dark:text-stone-800 select-none opacity-50">
          404
        </h1>
        <div className="-mt-12 relative z-10">
          <h2 className="text-2xl font-serif font-bold text-ink dark:text-stone-100 mb-4">
            {t('not_found.title')}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-8 font-light">
            {t('not_found.desc')}
          </p>
          <Link href="/" className="button-primary bg-jade hover:bg-jade">
            {t('not_found.home_btn')}
          </Link>
        </div>
      </Section>
    </div>
  );
}
```

- [ ] **Step 2: `app/loading.tsx`**

```tsx
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" aria-label="Loading page">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-cinnabar dark:border-stone-700" />
    </div>
  );
}
```

- [ ] **Step 3: `app/error.tsx`**

```tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-serif font-bold text-ink dark:text-stone-100 mb-4">
        Something went wrong
      </h2>
      <p className="text-stone-600 dark:text-stone-400 mb-8">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="button-primary">
          Try again
        </button>
        <Link href="/" className="button-secondary">
          Return Home
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run dev server and verify all routes**

```bash
npm run dev
```
Visit `/`, `/works`, `/works/ecommerce-platform`, `/posts`, `/posts/getting-started-with-react`, `/nonexistent`.

- [ ] **Step 5: Delete `src/` folder entirely**

```bash
rm -rf src
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(web): add not-found/loading/error boundaries; remove old src/"
```

---

# Phase 5: Remaining Components

**Goal:** Port MarkdownRenderer, ScholarRock (3D), ProjectMetadata. Remove the `declare global JSX` hack.

### Task 5.1: MarkdownRenderer

**Files:**
- Create: `c:\Users\cyhin\profile\components\markdown-renderer.tsx`

- [ ] **Step 1: Port from `src/components/MarkdownRenderer.tsx`** — content is framework-agnostic, copy verbatim with `'use client'` directive added at top.

```tsx
'use client';

import ReactMarkdown from 'react-markdown';
import React from 'react';

// ... (copy entire body of src/components/MarkdownRenderer.tsx unchanged)
// Add 'use client' as the first line.
```

- [ ] **Step 2: Commit**

```bash
git add components/markdown-renderer.tsx
git commit -m "feat(web): port MarkdownRenderer component"
```

### Task 5.2: ScholarRock (remove JSX hack)

**Files:**
- Create: `c:\Users\cyhin\profile\components\scholar-rock.tsx`

- [ ] **Step 1: Port and remove the `declare global { namespace JSX }` hack** (lines 19-28 of original). Three.js elements are typed by `@react-three/fiber` automatically; the hack was masking a missing types issue.

```tsx
'use client';

import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, useGLTF, Environment, ContactShadows, Center, Html, OrbitControls } from '@react-three/drei';
import { Group } from 'three';
import { useInView } from 'framer-motion';

const Loader = () => (
  <Html center>
    <div className="text-stone-400 text-xs font-serif animate-pulse whitespace-nowrap">...</div>
  </Html>
);

const CustomModel: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  const meshRef = useRef<Group>(null);
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if ((child as any).isMesh) {
        (child as any).castShadow = true;
        (child as any).receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  return (
    <primitive ref={meshRef} object={clonedScene} scale={0.4} position={[0, 0, 0]} rotation={[0, -Math.PI / 4, 0]} />
  );
};

const ScholarRock: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '100px' });

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[600px] h-[400px] mx-auto overflow-hidden rounded-3xl border border-stone-200/50 dark:border-stone-800/30 bg-stone-100/5 dark:bg-stone-900/10 backdrop-blur-sm transition-all duration-500 relative group"
    >
      <Canvas
        shadows
        className="pointer-events-none"
        camera={{ position: [6, 5, 8], fov: 22 }}
        dpr={[1, 2]}
        gl={{ antialias: true, stencil: false, depth: true }}
        frameloop={isInView ? 'always' : 'never'}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#fff7ed" castShadow shadow-mapSize={[1024, 1024]} />
        <spotLight position={[-5, 10, -5]} intensity={2} color="#ffffff" angle={0.5} penumbra={1} castShadow />
        <Environment preset="studio" />
        <Suspense fallback={<Loader />}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[-0.05, 0.05]} position={[0, 0.2, 0]}>
            <Center>
              <CustomModel url="/computer.glb" />
            </Center>
          </Float>
        </Suspense>
        <ContactShadows position={[0, -0.8, 0]} opacity={0.5} scale={10} blur={2.5} far={1.5} resolution={256} color="#000000" frames={1} />
        <OrbitControls makeDefault enableRotate={false} enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.8} />
      </Canvas>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">Automated Showcase</p>
      </div>
    </div>
  );
};

export default ScholarRock;
useGLTF.preload('/computer.glb');
```

- [ ] **Step 2: Commit**

```bash
git add components/scholar-rock.tsx
git commit -m "feat(web): port ScholarRock 3D component, remove JSX global hack"
```

### Task 5.3: ProjectMetadata

**Files:**
- Create: `c:\Users\cyhin\profile\components\project-metadata.tsx`

- [ ] **Step 1: Port from `src/components/ProjectMetadata.tsx`** — change the `MarkdownPost` import to `ContentCard`.

```tsx
'use client';

import { ExternalLink } from 'lucide-react';
import type { ContentCard } from '@/shared/content';

interface MetadataRow {
  label: string;
  value?: string;
  href?: string;
}

const ProjectMetadata: React.FC<{ project: ContentCard }> = ({ project }) => {
  const rows: MetadataRow[] = [
    { label: 'Website', value: project.link as string, href: project.link as string },
    { label: 'Status', value: project.status as string },
    { label: 'Role', value: project.role as string },
    { label: 'Platform', value: project.platform as string },
    { label: 'Stack', value: project.stack as string },
    {
      label: 'Source',
      value: project.source ? 'Source code' : undefined,
      href: project.source as string,
    },
    {
      label: 'Article',
      value: project.blogpost ? 'Related article' : undefined,
      href: project.blogpost as string,
    },
  ];

  return (
    <dl className="grid gap-3">
      {rows.filter((row) => row.value).map((row) => (
        <div className="flex items-start gap-4" key={row.label}>
          <dt className="meta-label">{row.label}</dt>
          <dd className="min-w-0 pt-0.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
            {row.href ? (
              <a href={row.href} className="inline-flex break-all text-jade hover:underline" target="_blank" rel="noopener noreferrer">
                {row.value} <ExternalLink className="ml-1 mt-0.5 shrink-0" size={12} />
              </a>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default ProjectMetadata;
```

> **Note:** The original read `project['Current Status']` and `project.Role`. These come from `metadata` flattened by `contentApi`'s `toCard`. Confirm the seed data uses keys `Current Status` and `Role` — the flatten step preserves them, but `ContentCard`'s typed fields use `status`/`role`. Either (a) normalize keys in `toCard` (`status: metadata['Current Status']`) or (b) keep reading `project['Current Status']`. Option (a) is cleaner — update `lib/content-api.ts` `toCard`:

```typescript
const toCard = (record: any): ContentCard => {
  const { id, type, createdAt, updatedAt, isPublished, metadata = {}, ...rest } = record;
  return {
    ...rest,
    link: metadata.link,
    platform: metadata.platform,
    stack: metadata.stack,
    source: metadata.source,
    blogpost: metadata.blogpost,
    role: metadata.Role,
    status: metadata['Current Status'],
    yearBadge: metadata.yearBadge,
  } as ContentCard;
};
```

- [ ] **Step 2: Commit**

```bash
git add components/project-metadata.tsx lib/content-api.ts
git commit -m "feat(web): port ProjectMetadata, normalize metadata keys in toCard"
```

---

# Phase 6: SEO & Performance

**Goal:** Per-page metadata, OG images, sitemap, robots, next/image, bundle analysis.

### Task 6.1: Per-page `generateMetadata`

**Files:**
- Modify: `c:\Users\cyhin\profile\app\works\page.tsx` (export metadata)
- Modify: `c:\Users\cyhin\profile\app\posts\page.tsx` (export metadata)
- Create: `c:\Users\cyhin\profile\app\works\[slug]\page.tsx` metadata (split client component + server metadata)

- [ ] **Step 1: Add static metadata to list pages**

At the top of `app/works/page.tsx` (above the component, after `'use client'` is NOT allowed for metadata — so split into a server `layout.tsx` for the route). Create `app/works/layout.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Works',
  description: 'Selected projects and systems I have designed and built.',
  openGraph: {
    title: 'Works | GuoYing',
    description: 'Selected projects and systems I have designed and built.',
    type: 'website',
  },
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Do the same for `app/posts/layout.tsx` with title `Writing`.

- [ ] **Step 2: Add dynamic metadata for detail pages**

Since the detail pages are client components (they use hooks), extract metadata into a server-side `generateMetadata` in a `layout.tsx` is not ideal. Instead, convert detail pages to a server component wrapper that fetches via the API directly (server-side) for metadata, and renders a client child for interaction. Simpler: keep client component and set metadata via a route `layout.tsx` that reads params and fetches.

Create `app/works/[slug]/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { apiClient } from '@/lib/api-client';
import type { ContentCard } from '@/shared/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await apiClient.get(`/content/works/${slug}`);
    const card = data as ContentCard;
    return {
      title: card.title,
      description: card.description || card.summary,
      openGraph: {
        title: `${card.title} | GuoYing`,
        description: card.description || card.summary,
        type: 'article',
        images: card.thumbnail ? [{ url: card.thumbnail }] : undefined,
      },
    };
  } catch {
    return { title: 'Work not found' };
  }
}

export default function WorkDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Mirror for `app/posts/[slug]/layout.tsx` using `/content/writing/${slug}`.

- [ ] **Step 3: Commit**

```bash
git add app/works/layout.tsx app/posts/layout.tsx app/works/[slug]/layout.tsx app/posts/[slug]/layout.tsx
git commit -m "feat(seo): add static and dynamic metadata for content pages"
```

### Task 6.2: OG image + favicon

**Files:**
- Create: `c:\Users\cyhin\profile\app\opengraph-image.tsx` (ImageResponse)
- Add: `c:\Users\cyhin\profile\public\favicon.ico` (or keep the emoji SVG from old `index.html` in `app/icon.tsx`)

- [ ] **Step 1: Create dynamic OG image**

```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GuoYing — Digital Craftsman';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f0e7db',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ color: '#00a86b', fontSize: 28, letterSpacing: 6, marginBottom: 24 }}>
          DIGITAL CRAFTSMAN
        </div>
        <div style={{ color: '#202023', fontSize: 96, fontWeight: 700 }}>GuoYing</div>
        <div style={{ color: '#8f7e6d', fontSize: 32, marginTop: 16 }}>
          Web development · 3D · Creative coding
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 2: Create `app/icon.tsx` (emoji favicon)**

```tsx
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ background: '#202023', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
        🐱
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx app/icon.tsx
git commit -m "feat(seo): dynamic OG image and favicon via ImageResponse"
```

### Task 6.3: Sitemap + robots

**Files:**
- Create: `c:\Users\cyhin\profile\app\sitemap.ts`
- Create: `c:\Users\cyhin\profile\app\robots.ts`

- [ ] **Step 1: Sitemap**

```typescript
import type { MetadataRoute } from 'next';
import { apiClient } from '@/lib/api-client';
import type { ContentCard } from '@/shared/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://example.com';
  const staticRoutes = ['', '/works', '/posts'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  try {
    const [works, posts] = await Promise.all([
      apiClient.get<ContentCard[]>('/content/works'),
      apiClient.get<ContentCard[]>('/content/writing'),
    ]);
    const workRoutes = works.data.map((item) => ({
      url: `${base}/works/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
    const postRoutes = posts.data.map((item) => ({
      url: `${base}/posts/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
    return [...staticRoutes, ...workRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
```

- [ ] **Step 2: Robots**

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat(seo): add sitemap.ts and robots.ts"
```

### Task 6.4: next/image migration

**Files:**
- Modify: `app/page.tsx`, `app/works/page.tsx`, `app/works/[slug]/page.tsx`, `app/posts/[slug]/page.tsx`, `components/markdown-renderer.tsx`, `components/project-metadata.tsx`

- [ ] **Step 1: Replace `<img>` with `<Image>`** in all pages. Add `fill` + `sizes` for responsive images, or explicit `width`/`height` when known.

Example for `ProjectCard` in `app/works/page.tsx`:

```tsx
import Image from 'next/image';
// ...
<div className="relative w-full h-48 mb-4 overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10">
  <Image
    src={project.thumbnail || '/images/placeholder.jpg'}
    alt={project.title}
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.3]"
  />
</div>
```

- [ ] **Step 2: For markdown images**, update `components/markdown-renderer.tsx` `img` renderer to use `next/image` with the same pattern.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "perf(web): migrate img tags to next/image"
```

### Task 6.5: Bundle analysis

- [ ] **Step 1: Install analyzer**

```bash
npm install -D @next/bundle-analyzer
```

- [ ] **Step 2: Wire into `next.config.ts`**

```typescript
import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

const nextConfig = { /* ...existing... */ };
export default withBundleAnalyzer(nextConfig);
```

- [ ] **Step 3: Add script to `package.json`**

```json
"analyze": "ANALYZE=true next build"
```

- [ ] **Step 4: Run and review**

```bash
npm run analyze
```
Expected: opens a report at `.next/analyze`. Verify three.js chunks are isolated and not loaded on list pages.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts package.json
git commit -m "perf(web): add bundle analyzer"
```

---

# Phase 7: DX & Quality

**Goal:** ESLint + Prettier, type-check scripts, basic tests, README rewrite.

### Task 7.1: ESLint + Prettier (root + backend)

**Files:**
- Create: `c:\Users\cyhin\profile\eslint.config.mjs`
- Modify: `c:\Users\cyhin\profile\package.json` (lint script already added in 2.1)

- [ ] **Step 1: Install ESLint deps**

```bash
npm install -D eslint eslint-config-next @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier
```

- [ ] **Step 2: Create `eslint.config.mjs`**

```javascript
import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';

export default [
  ...next,
  prettier,
  {
    ignores: ['backend/**', 'node_modules/**', '.next/**', 'dist/**'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/react-in-jsx-scope': 'off',
    },
  },
];
```

- [ ] **Step 3: Update `.prettierrc`** (already exists — verify it has):

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```

- [ ] **Step 4: Run lint**

```bash
npm run lint
```
Expected: 0 errors (warnings allowed). Fix any reported issues.

- [ ] **Step 5: Commit**

```bash
git add eslint.config.mjs .prettierrc package.json
git commit -m "chore(dx): add ESLint + Prettier config for frontend"
```

### Task 7.2: Type-check scripts

**Files:**
- Modify: `c:\Users\cyhin\profile\package.json` (already has `typecheck`)
- Modify: `c:\Users\cyhin\profile\backend\package.json`

- [ ] **Step 1: Add typecheck script to backend**

```json
"typecheck": "tsc --noEmit"
```

- [ ] **Step 2: Run both type-checks**

```bash
npm run typecheck
cd backend && npm run typecheck && cd ..
```
Expected: both pass with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add backend/package.json
git commit -m "chore(dx): add typecheck scripts"
```

### Task 7.3: Vitest + backend tests

**Files:**
- Create: `c:\Users\cyhin\profile\backend\tests\content.service.test.ts`
- Modify: `c:\Users\cyhin\profile\backend\package.json`

- [ ] **Step 1: Install Vitest in backend**

```bash
cd backend
npm install -D vitest
```

- [ ] **Step 2: Add test script**

```json
"test": "vitest run"
```

- [ ] **Step 3: Write a service smoke test** (mocks supabase)

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../src/lib/supabase.js', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({ data: [], error: null })),
            maybeSingle: vi.fn(() => ({ data: null, error: null })),
          })),
        })),
      })),
      insert: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(() => ({ data: null, error: null })) })) })),
    })),
  },
}));

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
```

- [ ] **Step 4: Run tests**

```bash
npm test
```
Expected: 2 passing.

- [ ] **Step 5: Commit**

```bash
git add backend/tests backend/package.json
git commit -m "test(backend): add Vitest smoke tests for content service"
```

### Task 7.4: README rewrite

**Files:**
- Modify: `c:\Users\cyhin\profile\README.md`
- Modify: `c:\Users\cyhin\profile\backend\README.md`

- [ ] **Step 1: Rewrite root `README.md`**

```markdown
# Profile Site

Personal portfolio + writing site. Next.js App Router frontend, Express + Supabase content API.

## Structure

- `app/` — Next.js App Router pages
- `components/` — React components
- `lib/`, `hooks/`, `stores/`, `messages/` — frontend modules
- `shared/` — types shared between frontend and backend
- `backend/` — Express API (see `backend/README.md`)
- `public/` — static assets

## Setup

1. Copy `.env.example` to `.env` and fill `NEXT_PUBLIC_API_URL`.
2. Start the backend (see `backend/README.md`).
3. Install and run:

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
- `npm run analyze` — bundle report

## Deployment

Frontend deploys to Vercel (see `vercel.json`). Backend deploys separately.
```

- [ ] **Step 2: Update `backend/README.md`** to reflect new folder structure (routes/controllers/services/schemas) and the zod-validated endpoints. Keep the endpoint list unchanged.

- [ ] **Step 3: Commit**

```bash
git add README.md backend/README.md
git commit -m "docs: rewrite README for Next.js + refactored backend"
```

---

## Final Verification

- [ ] **Step 1: Full type-check**

```bash
npm run typecheck && cd backend && npm run typecheck
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```

- [ ] **Step 3: Backend tests + verify**

```bash
cd backend && npm test && npm run verify:api
```

- [ ] **Step 4: Production build**

```bash
cd .. && npm run build
```
Expected: build succeeds, no type errors.

- [ ] **Step 5: Run production server and smoke test all routes**

```bash
npm run start
```
Visit: `/`, `/works`, `/works/<slug>`, `/posts`, `/posts/<slug>`, `/nonexistent`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: final verification after full refactor"
```

---

## Self-Review Notes

**Spec coverage check:**
- Next.js migration ✓ (Phase 2, 4)
- Backend split routes + zod ✓ (Phase 1)
- TanStack Query ✓ (Phase 3)
- Axios ✓ (Phase 3)
- Zustand ✓ (Phase 3)
- Type safety / shared types ✓ (Phase 0.3, used throughout)
- Code quality / DRY ✓ (hook-based data layer removes duplication)
- Performance ✓ (Phase 6: dynamic imports, next/image, bundle analysis)
- SEO ✓ (Phase 6: metadata, OG image, sitemap, robots)
- DX ✓ (Phase 7: ESLint, Prettier, tests, typecheck, README)
- Design preservation ✓ (globals.css ported verbatim, border-over-shadow applied)
- Monorepo kept ✓ (no workspaces, shared/ via relative imports)

**Known follow-ups (out of scope for this plan):**
- i18n routing via `app/[locale]/` — current plan keeps client-side language toggle; locale-prefixed routes can be a future phase.
- Admin UI — the README mentions `/admin` but no admin UI exists in the current codebase. Not added here.
- `shared/` as a proper workspace package — currently imported via relative paths; can upgrade to npm workspaces later without breaking changes.
