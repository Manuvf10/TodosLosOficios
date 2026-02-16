"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { BriefcaseBusiness, Menu, X, UserCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAuth = !!data?.user;
  const role = data?.user?.role;

  const links = useMemo(() => {
    if (!isAuth) {
      return [
        { href: "/buscar", label: "Buscar" },
        { href: "/como-funciona", label: "Cómo funciona" },
        { href: "/categorias", label: "Categorías" },
      ];
    }
    if (role === "CLIENTE") {
      return [
        { href: "/buscar", label: "Buscar" },
        { href: "/dashboard/cliente", label: "Mis solicitudes" },
        { href: "/como-funciona", label: "Ayuda" },
      ];
    }
    return [
      { href: "/dashboard/profesional", label: "Solicitudes recibidas" },
      { href: "/dashboard/profesional/perfil", label: "Mi perfil" },
      { href: "/como-funciona", label: "Ajustes" },
    ];
  }, [isAuth, role]);

  return (
    <header className="sticky top-0 z-50 border-b border-sand/15 bg-espresso/70 backdrop-blur-xl">
      <nav className="app-shell flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-cream">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-copper/30 text-amber"><BriefcaseBusiness className="h-4 w-4" /></span>
          TodosLosOficios
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn("rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/10 hover:text-cream", pathname === link.href && "bg-white/10 text-cream")}>{link.label}</Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {!isAuth && <Badge className="hidden lg:inline-flex">Reseñas verificadas</Badge>}

          {!isAuth ? (
            <>
              <Link href="/buscar"><Button size="sm">Buscar profesionales</Button></Link>
              <Link href="/registro?role=PROFESIONAL"><Button size="sm" variant="outline">Soy profesional</Button></Link>
              <Link href="/login"><Button size="sm" variant="ghost">Entrar</Button></Link>
            </>
          ) : role === "CLIENTE" ? (
            <>
              <Link href="/buscar"><Button size="sm">Nueva solicitud</Button></Link>
              <Link href="/dashboard/cliente"><Button size="sm" variant="outline">Dashboard</Button></Link>
              <Badge>Cliente</Badge>
              <details className="relative">
                <summary className="list-none cursor-pointer rounded-lg p-1 text-muted hover:bg-white/10"><UserCircle2 className="h-6 w-6" /></summary>
                <div className="glass absolute right-0 mt-2 w-48 rounded-xl p-2 text-sm">
                  <Link className="block rounded px-2 py-1 hover:bg-white/10" href="/dashboard/cliente">Dashboard</Link>
                  <Link className="block rounded px-2 py-1 hover:bg-white/10" href="/dashboard/cliente">Mis solicitudes</Link>
                  <button className="w-full rounded px-2 py-1 text-left hover:bg-white/10" onClick={() => signOut({ callbackUrl: "/" })}>Cerrar sesión</button>
                </div>
              </details>
            </>
          ) : (
            <>
              <Link href="/dashboard/profesional/perfil"><Button size="sm">Optimizar perfil</Button></Link>
              <Link href="/dashboard/profesional"><Button size="sm" variant="outline">Ver solicitudes</Button></Link>
              <Badge>Profesional</Badge>
              <details className="relative">
                <summary className="list-none cursor-pointer rounded-lg p-1 text-muted hover:bg-white/10"><UserCircle2 className="h-6 w-6" /></summary>
                <div className="glass absolute right-0 mt-2 w-52 rounded-xl p-2 text-sm">
                  <Link className="block rounded px-2 py-1 hover:bg-white/10" href="/dashboard/profesional">Dashboard profesional</Link>
                  <Link className="block rounded px-2 py-1 hover:bg-white/10" href="/dashboard/profesional/perfil">Editar perfil</Link>
                  <button className="w-full rounded px-2 py-1 text-left hover:bg-white/10" onClick={() => signOut({ callbackUrl: "/" })}>Cerrar sesión</button>
                </div>
              </details>
            </>
          )}
        </div>

        <button className="rounded-lg p-2 text-muted hover:bg-white/10 md:hidden" aria-label="Abrir menú" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="app-shell pb-4 md:hidden">
          <div className="glass space-y-2 rounded-xl p-3">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded px-2 py-2 text-sm text-muted hover:bg-white/10 hover:text-cream">{link.label}</Link>)}
            <div className="h-px bg-sand/20" />
            {!isAuth ? (
              <>
                <Link href="/buscar" onClick={() => setOpen(false)} className="block rounded px-2 py-2 text-sm text-cream">Buscar profesionales</Link>
                <Link href="/registro?role=PROFESIONAL" onClick={() => setOpen(false)} className="block rounded px-2 py-2 text-sm text-cream">Soy profesional</Link>
                <Link href="/login" onClick={() => setOpen(false)} className="block rounded px-2 py-2 text-sm text-cream">Entrar</Link>
              </>
            ) : (
              <>
                <p className="px-2 py-1 text-xs text-muted">Rol: {role}</p>
                <Link href={role === "CLIENTE" ? "/dashboard/cliente" : "/dashboard/profesional"} onClick={() => setOpen(false)} className="block rounded px-2 py-2 text-sm text-cream">Ir al dashboard</Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full rounded px-2 py-2 text-left text-sm text-cream hover:bg-white/10">Cerrar sesión</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
