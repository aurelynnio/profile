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
