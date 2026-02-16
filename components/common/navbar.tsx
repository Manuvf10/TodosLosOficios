"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const links = [
  { href: "/buscar", label: "Buscar" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/categorias", label: "Categorías" },
];

export function Navbar() {
  const { data } = useSession();
  const pathname = usePathname();

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

        <div className="flex items-center gap-2">
          <Badge className="hidden sm:inline-flex">Reseñas verificadas</Badge>
          {data?.user ? (
            <>
              <Link href="/dashboard"><Button size="sm" variant="outline">Mi panel</Button></Link>
              <Button size="sm" variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>Salir</Button>
            </>
          ) : (
            <>
              <Link href="/login"><Button size="sm" variant="ghost">Entrar</Button></Link>
              <Link href="/registro"><Button size="sm">Crear cuenta</Button></Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
