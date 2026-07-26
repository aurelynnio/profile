# Profile frontend

This directory is a self-contained Next.js application. It is deployed independently of the API.

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

`NEXT_PUBLIC_API_URL` must be the public API base URL and include `/api`, for example:

```env
NEXT_PUBLIC_API_URL=https://profile-api.example.com/api
```

## Vercel deployment

Create or update the Vercel project with **Root Directory** set to `frontend`.
Vercel detects Next.js automatically; use the default install command and build command (`npm run build`).

Set `NEXT_PUBLIC_API_URL` for Production, Preview, and Development as appropriate, then redeploy after changing it. This is a public browser variable, so it must not contain a secret.

No SPA fallback rewrite is required: Next.js owns page and dynamic-route handling.
