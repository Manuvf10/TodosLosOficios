import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-sand/15 py-8">
      <div className="app-shell flex flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
        <p>© {new Date().getFullYear()} TodosLosOficios · Boutique marketplace local</p>
        <div className="flex gap-4">
          <Link href="/como-funciona" className="hover:text-cream">Cómo funciona</Link>
          <Link href="/categorias" className="hover:text-cream">Categorías</Link>
          <Link href="/buscar" className="hover:text-cream">Buscar</Link>
        </div>
      </div>
    </footer>
  );
}
