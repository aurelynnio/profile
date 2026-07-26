# Profile platform

The repository contains two independently deployable applications:

| Directory | Application | Deployment |
| --- | --- | --- |
| `frontend/` | Next.js portfolio and writing UI | Vercel, with Vercel Root Directory set to `frontend` |
| `backend/` | Express content API backed by Supabase | Any Node.js/Docker host, deployed from `backend` |

Neither application is built or started by the other. They communicate only over the public API URL configured through environment variables.

## Local development

Install dependencies separately once for each app:

```bash
cd frontend && npm ci
cd ../backend && npm ci
```

Run the API first (`npm run dev` in `backend`), then the frontend (`npm run dev` in `frontend`). Root shortcut commands are available as `npm run dev:frontend` and `npm run dev:backend`.

## Deployment order

1. Deploy `backend/` and verify `/api/health`.
2. Add the frontend domain to backend `CLIENT_ORIGINS`.
3. Set Vercel's `NEXT_PUBLIC_API_URL` to the API's public `/api` URL.
4. Deploy `frontend/` with Vercel Root Directory set to `frontend`.

Detailed instructions are in [frontend/README.md](frontend/README.md) and [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md).
