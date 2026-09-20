# Profile frontend

Next.js portfolio for a full-stack web developer: three web projects (an e-commerce marketplace, a railway ticketing platform, a social platform), UI experiments, and a technical blog.

## Architecture

The site is **fully static** — there is no backend and no runtime data fetching. Content lives in typed TypeScript modules and every page is prerendered at build time:

- `lib/works.ts` — case studies for the shipped products (screens + engineering systems)
- `lib/experiments.ts` — experiments (prototypes)
- `lib/writing.ts` — articles
- `lib/content-types.ts` — the `Project` / `ProjectScreen` / `ProjectSystem` / `Post` models

Pages are server components that import this data directly. Dynamic routes use `generateStaticParams` together with `dynamicParams = false`, so every slug is generated at build time and unknown slugs return a static 404.

UI copy for the language toggle lives in `messages/en.ts` / `messages/zh.ts` (the toggle affects UI labels; the content itself is bilingual in the data files).

## Local development

```bash
npm ci
npm run dev                              # http://localhost:3000
```

## Editing content

Edit the arrays in `lib/works.ts`, `lib/experiments.ts` and `lib/writing.ts` and rebuild. Covers live in `public/img-work/` (captured screens of the VietRailway / Mekong Line app in `public/img-work/vietrailway/`), article images in `public/images/uploads/`.

## Vercel deployment

Import this repository as a Vercel project. The Root Directory is the repo
root (no subdirectory needed). No environment variables are required.

## Replacing placeholder content

- Swap the `https://example.com` placeholders in `lib/works.ts`, `lib/experiments.ts`, `app/sitemap.ts` and `components/footer.tsx` for your real URLs.

