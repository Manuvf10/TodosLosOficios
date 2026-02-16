# TodosLosOficios (MVP operativo con Supabase + Resend)

Marketplace de servicios locales (España, foco Alicante) construido con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind**, **shadcn/ui**, **NextAuth**, **React Query** y backend real con **Supabase Postgres/Auth**.

## Qué incluye

- Registro/Login real con email+password y rol (`CLIENTE` / `PROFESIONAL`).
- Catálogo real de categorías y profesionales desde Supabase.
- Gestión de leads real en base de datos.
- Dashboard cliente/profesional conectado a datos persistentes.
- Emails transaccionales con Resend al crear un lead.
- UI warm/cocoa premium ya existente.

## 1) Requisitos

- Node.js 18+
- Proyecto en Supabase
- Cuenta en Resend

## 2) Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```bash
cp .env.example .env.local
```

Variables necesarias:

- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (solo servidor)
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

> En Vercel, configura las mismas en **Project Settings → Environment Variables**.

## 3) Configuración de base de datos (Supabase)

En el SQL Editor de Supabase ejecuta en este orden:

1. `supabase/schema.sql`
2. `supabase/rls.sql`
3. `supabase/seed.sql`

También tienes script recordatorio:

```bash
npm run db:setup
```

## 4) Instalación y arranque local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## 5) Flujo funcional esperado

1. Visitante entra en landing y busca profesionales.
2. Cliente se registra/inicia sesión y envía solicitud.
3. Lead se guarda en Supabase (`leads`).
4. Profesional ve y gestiona lead en `/dashboard/profesional`.
5. Se envía email a profesional y confirmación al cliente (Resend).

## 6) Scripts útiles

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm run db:setup`

## Notas de seguridad

- `SUPABASE_SERVICE_ROLE_KEY` **nunca** debe exponerse al cliente.
- La autorización de acceso se valida en API + sesión + políticas RLS.
