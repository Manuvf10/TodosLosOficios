# TodosLosOficios (MVP real con Supabase + Resend)

Marketplace de servicios locales (España, foco Alicante) con **Next.js 14 App Router**, **TypeScript**, **Tailwind/shadcn/ui**, **NextAuth**, **React Query** y backend real en **Supabase**.

## Stack operativo

- Auth real (email+password) con Supabase Auth + roles `CLIENTE` / `PROFESIONAL`.
- Datos persistentes en Postgres (Supabase): perfiles, categorías, leads.
- Seguridad por sesión + API server validation + RLS.
- Emails transaccionales con Resend al crear un lead.

---

## 1) Variables de entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Variables obligatorias:

- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (**o** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`)
- `SUPABASE_SERVICE_ROLE_KEY` (**o** `SUPABASE_SECRET_KEY`) → **solo servidor**
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

> Modelo nuevo de keys de Supabase: `sb_publishable_*` (pública) y `sb_secret_*` (secreta).

### Seguridad de claves

- Nunca commitees `.env.local`.
- Si una key se expone, **róta la key inmediatamente** en Supabase/Resend.
- La publishable key solo es segura con RLS bien configurado.
- La secret/service key nunca debe llegar al cliente.

---

## 2) Configurar Supabase

1. Crea un proyecto en Supabase.
2. En **Authentication → URL Configuration**, añade:
   - `http://localhost:3000`
   - Tu dominio de Vercel (`https://tu-app.vercel.app`)
3. En **SQL Editor**, ejecuta en orden:
   1. `supabase/schema.sql`
   2. `supabase/rls.sql`
   3. `supabase/seed.sql` (categorías)
4. Crea profesionales demo (Auth + users + profiles):

```bash
npm run seed:supabase
```

Script de apoyo:

```bash
npm run db:setup
```

---

## 3) Arranque local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

Para validación de compilación:

```bash
npm run typecheck
npm run build
```

---

## 4) Deploy en Vercel

1. Importa el repo en Vercel.
2. Define todas las variables de `.env.example` en **Project Settings → Environment Variables**.
3. Asegura `NEXTAUTH_URL=https://tu-dominio-vercel`.
4. Redeploy.

---

## 5) Flujo funcional E2E

- Visitante navega y busca profesionales.
- Cliente se registra/login como `CLIENTE`.
- Cliente envía lead desde `/profesional/[id]`.
- Lead aparece en dashboard cliente y dashboard profesional.
- Profesional cambia estado (`enviado` → `aceptado/rechazado`).
- Se envía email al profesional y confirmación al cliente (si Resend está configurado).

---

## 6) Manual test checklist

1. **Cliente**
   - Registro cliente → login cliente.
   - Buscar profesional → abrir perfil → enviar presupuesto.
   - Ver lead en `/dashboard/cliente`.

2. **Profesional**
   - Registro profesional → login profesional.
   - Ver lead en `/dashboard/profesional`.
   - Cambiar estado de lead y comprobar refresco.

3. **RLS / Seguridad**
   - Cliente A no puede leer leads de Cliente B.
   - Profesional X no puede actualizar leads de Profesional Y.
   - Endpoints públicos no exponen emails privados.

4. **Emails**
   - Con `RESEND_API_KEY` activa, comprobar correo al profesional y confirmación al cliente.

---

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm run db:setup`
- `npm run seed:supabase`
