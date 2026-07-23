# Portfolio content API

The API supplies the portfolio's Works and Writing pages from Supabase instead of client-side data files.

## Run locally

```bash
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

The API listens at `http://localhost:4000`; the Vite app defaults to `http://localhost:4000/api`. Set `VITE_API_URL` in the frontend environment only when the API is deployed elsewhere.

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
