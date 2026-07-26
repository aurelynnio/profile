# Profile frontend

Next.js application for the personal portfolio. Deployed independently of the content API.

The backend API lives in a separate repository: [aurelynnio/profile-backend](https://github.com/aurelynnio/profile-backend).

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

Import this repository as a Vercel project. The Root Directory is the repo root (no subdirectory needed) — Vercel detects Next.js automatically and uses the default install + build commands (`npm run build`).

Set `NEXT_PUBLIC_API_URL` for Production, Preview, and Development as appropriate, then redeploy after changing it. This is a public browser variable, so it must not contain a secret.

No SPA fallback rewrite is required: Next.js owns page and dynamic-route handling.
