-- Seed SQL base: categorías públicas.
-- Para crear profesionales demo con usuarios reales de auth.users usa:
--   npm run seed:supabase

insert into public.categories (slug, name, icon)
values
  ('fontaneria','Fontanería','wrench'),
  ('electricidad','Electricidad','bolt'),
  ('jardineria','Jardinería','leaf'),
  ('pintura','Pintura','paintbrush'),
  ('carpinteria','Carpintería','hammer'),
  ('limpieza','Limpieza','sparkles')
on conflict (slug) do update
set name = excluded.name,
    icon = excluded.icon;
