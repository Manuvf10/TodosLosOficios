alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.professional_profiles enable row level security;
alter table public.leads enable row level security;
alter table public.reviews enable row level security;

-- Limitar updates por columnas para usuarios autenticados.
revoke update on public.users from authenticated;
grant update(name) on public.users to authenticated;

revoke update on public.leads from authenticated;
grant update(status) on public.leads to authenticated;

drop policy if exists users_self_read on public.users;
create policy users_self_read on public.users
for select using (auth.uid() = id);

drop policy if exists users_self_update on public.users;
create policy users_self_update on public.users
for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories
for select using (true);

drop policy if exists profiles_public_read on public.professional_profiles;
create policy profiles_public_read on public.professional_profiles
for select using (true);

drop policy if exists profiles_self_update on public.professional_profiles;
create policy profiles_self_update on public.professional_profiles
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists leads_client_select on public.leads;
create policy leads_client_select on public.leads
for select using (client_id = auth.uid());

drop policy if exists leads_client_insert on public.leads;
create policy leads_client_insert on public.leads
for insert with check (client_id = auth.uid());

drop policy if exists leads_prof_select on public.leads;
create policy leads_prof_select on public.leads
for select using (professional_id = auth.uid());

drop policy if exists leads_prof_update on public.leads;
create policy leads_prof_update on public.leads
for update using (professional_id = auth.uid()) with check (professional_id = auth.uid());

drop policy if exists reviews_public_read on public.reviews;
create policy reviews_public_read on public.reviews
for select using (true);
