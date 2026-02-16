import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-white/10 py-8">
      <div className="app-shell flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
        <p>© {new Date().getFullYear()} TodosLosOficios · Marketplace local</p>
        <div className="flex gap-4">
          <Link href="/como-funciona" className="hover:text-slate-100">Cómo funciona</Link>
          <Link href="/categorias" className="hover:text-slate-100">Categorías</Link>
          <Link href="/buscar" className="hover:text-slate-100">Buscar</Link>
        </div>
      </div>
    </footer>
  );
}
