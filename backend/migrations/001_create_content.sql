create extension if not exists pgcrypto;

create table if not exists public.contents (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('works', 'writing')),
  slug text not null,
  title text not null,
  date timestamptz not null,
  thumbnail text,
  description text,
  summary text,
  body text not null,
  metadata jsonb not null default '{}'::jsonb,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (type, slug)
);

create index if not exists contents_public_list_idx
  on public.contents (type, is_published, date desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contents_set_updated_at on public.contents;
create trigger contents_set_updated_at
before update on public.contents
for each row execute procedure public.set_updated_at();

alter table public.contents enable row level security;

drop policy if exists "Published portfolio content is readable" on public.contents;
create policy "Published portfolio content is readable"
on public.contents for select
using (is_published = true);

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = true;
