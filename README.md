# Profile Site (Supabase-only)

## 1) Setup env

Create `.env` from `.env.example` and fill:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 2) Create schema + policies

Run SQL in [supabase/schema.sql](supabase/schema.sql) on Supabase SQL Editor.

This creates:

- `public.contents` (public read)
- `public.admin_users` (allow-list for write access)
- RLS policies so only authenticated users in `admin_users` can write

## 3) Create admin user

1. Create user in Supabase Auth (Dashboard -> Authentication -> Users).
2. Insert that user id into `public.admin_users`:

```sql
insert into public.admin_users (user_id)
values ('<AUTH_USER_UUID>')
on conflict (user_id) do nothing;
```

## 4) Run app

```bash
npm install
npm run dev
```

App reads content from Supabase.

## 5) Admin UI

Open `/admin`.

- Sign in with Supabase Auth email/password.
- CRUD data directly in `public.contents`.
- First load asks for Supabase URL + anon key and stores them in `localStorage`.
