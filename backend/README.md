# Portfolio content API

The API supplies the portfolio's Works and Writing pages from Supabase instead of client-side data files.

## Structure

```
backend/
  migrations/       SQL migrations (Supabase)
  scripts/          seed + verification scripts
  src/
    controllers/    route handlers (content.controller.ts)
    routes/         Express routers (content, health, upload)
    services/       data-access layer (content.service.ts)
    schemas/        zod validation schemas (content.schema.ts)
    middleware/     auth, error, validate middleware
    lib/            env + supabase clients
    server.ts       Express app entrypoint
  tests/            Vitest smoke tests
```

Requests flow: `routes → validate(schema) → controllers → services → supabase`. All admin-write endpoints are zod-validated and guarded by `auth.middleware.ts` (Supabase token + `ADMIN_EMAILS` allow-list).

## Run locally

```bash
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

The API listens at `http://localhost:4000`; the Next.js app defaults to `http://localhost:4000/api`. Set `NEXT_PUBLIC_API_URL` in the frontend environment only when the API is deployed elsewhere.

## Scripts

- `npm run dev` — dev server (tsx watch)
- `npm run build` — compile to `dist/`
- `npm run start` — serve compiled build
- `npm run db:migrate` — run SQL migrations
- `npm run db:seed` — seed sample content
- `npm run verify:api` — smoke-test endpoints
- `npm run typecheck` — TypeScript check
- `npm test` — Vitest smoke tests

## Content API

- `GET /api/content/works`
- `GET /api/content/works/:slug`
- `GET /api/content/writing`
- `GET /api/content/writing/:slug`

Admin-only endpoints require a Supabase access token in `Authorization: Bearer <token>` and an email listed in `ADMIN_EMAILS`:

- `POST /api/content/:type`
- `PATCH /api/content/:type/:slug`
- `DELETE /api/content/:type/:slug`
- `POST /api/uploads` (multipart field: `file`)

Uploads are placed in the public `portfolio-assets` Supabase Storage bucket. Store the returned `url` as a content thumbnail or inside its Markdown body.

Never commit `backend/.env`; use `backend/.env.example` as the deployment template.
