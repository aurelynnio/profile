create extension if not exists pgcrypto;

create table if not exists public.contents (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('works', 'writing')),
  slug text not null,
  title text not null,
  date timestamptz not null default now(),
  thumbnail text,
  description text,
  summary text,
  body text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contents_type_slug_unique unique (type, slug)
);

create index if not exists contents_type_date_idx
  on public.contents (type, date desc);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.contents enable row level security;
alter table public.admin_users enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'contents'
      and policyname = 'Public read contents'
  ) then
    create policy "Public read contents"
      on public.contents
      for select
      to anon, authenticated
      using (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'contents'
      and policyname = 'Admin insert contents'
  ) then
    create policy "Admin insert contents"
      on public.contents
      for insert
      to authenticated
      with check (
        exists (
          select 1
          from public.admin_users au
          where au.user_id = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'contents'
      and policyname = 'Admin update contents'
  ) then
    create policy "Admin update contents"
      on public.contents
      for update
      to authenticated
      using (
        exists (
          select 1
          from public.admin_users au
          where au.user_id = auth.uid()
        )
      )
      with check (
        exists (
          select 1
          from public.admin_users au
          where au.user_id = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'contents'
      and policyname = 'Admin delete contents'
  ) then
    create policy "Admin delete contents"
      on public.contents
      for delete
      to authenticated
      using (
        exists (
          select 1
          from public.admin_users au
          where au.user_id = auth.uid()
        )
      );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'admin_users'
      and policyname = 'Admin users read own row'
  ) then
    create policy "Admin users read own row"
      on public.admin_users
      for select
      to authenticated
      using (user_id = auth.uid());
  end if;
end $$;
