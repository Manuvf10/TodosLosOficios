create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key,
  role text not null check (role in ('CLIENTE','PROFESIONAL')),
  name text not null,
  pro_plan text not null default 'FREE' check (pro_plan in ('FREE','PRO')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id bigserial primary key,
  slug text unique not null,
  name text not null,
  icon text,
  created_at timestamptz not null default now()
);

create table if not exists public.professional_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  city text not null,
  postal_code text not null,
  categories text[] not null default '{}',
  base_price numeric(10,2) not null default 0,
  bio text,
  photo_url text,
  verified boolean not null default false,
  emergency boolean not null default false,
  availability jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.users(id) on delete cascade,
  professional_id uuid not null references public.users(id) on delete cascade,
  message text not null,
  preferred_date timestamptz,
  status text not null default 'enviado' check (status in ('enviado','aceptado','rechazado')),
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.users(id) on delete cascade,
  author_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text,
  review_date date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists idx_users_role on public.users(role);
create index if not exists idx_users_created_at on public.users(created_at desc);
create index if not exists idx_profiles_city on public.professional_profiles(city);
create index if not exists idx_profiles_postal on public.professional_profiles(postal_code);
create index if not exists idx_profiles_categories_gin on public.professional_profiles using gin(categories);
create index if not exists idx_profiles_updated_at on public.professional_profiles(updated_at desc);
create index if not exists idx_leads_client on public.leads(client_id, created_at desc);
create index if not exists idx_leads_professional on public.leads(professional_id, created_at desc);
