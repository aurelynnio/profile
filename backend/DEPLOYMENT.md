# Content API deployment

The API is an independent Express service. Deploy the `backend` directory to any Node.js or Docker host (Railway, Render, Fly.io, a VPS, and similar services).

## Required settings

Configure these values in the API host rather than committing an `.env` file:

```env
NODE_ENV=production
PORT=4000
CLIENT_ORIGINS=https://your-frontend.vercel.app,https://www.your-domain.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=...
DATABASE_URL=postgresql://...
ADMIN_EMAILS=you@example.com
```

`PORT` is normally supplied by the host; do not hard-code it in the deployment UI.

Use `npm ci && npm run build` as a build command and `npm run start` as a start command, or deploy using this directory's `Dockerfile`. After deploy, verify `GET https://your-api-domain/api/health` returns `{ "ok": true }`.

## Connect the frontend

Copy the deployed API domain into the Vercel frontend environment variable:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain/api
```

The API CORS `CLIENT_ORIGINS` list must contain every frontend domain that will call it, including the Vercel production domain and any custom domain.
