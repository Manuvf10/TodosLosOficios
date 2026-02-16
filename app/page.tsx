import Link from "next/link";
import { categorias } from "@/data/categorias";

export const metadata = { title: "Inicio | TodosLosOficios", description: "Encuentra profesionales de confianza" };

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-10 text-white">
        <h1 className="text-4xl font-bold">Conecta con profesionales locales en minutos</h1>
        <p className="mt-3 max-w-xl">Busca por ubicación, compara y solicita presupuestos sin compromiso.</p>
        <div className="mt-6 flex gap-3">
          <Link className="rounded-md bg-white px-4 py-2 font-semibold text-blue-700" href="/buscar">Buscar profesional</Link>
          <Link className="rounded-md border border-white px-4 py-2" href="/registro?role=PROFESIONAL">Soy profesional</Link>
        </div>
      </section>
      <section><h2 className="mb-4 text-2xl font-semibold">Categorías</h2><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{categorias.map((c)=><div key={c} className="rounded-lg bg-white p-4 text-center shadow">{c}</div>)}</div></section>
      <section><h2 className="text-2xl font-semibold">Cómo funciona</h2><ol className="mt-4 grid gap-4 md:grid-cols-3"><li className="rounded bg-white p-4">1. Busca por oficio y zona</li><li className="rounded bg-white p-4">2. Compara perfiles y reseñas</li><li className="rounded bg-white p-4">3. Solicita presupuesto</li></ol></section>
      <section><h2 className="text-2xl font-semibold">Testimonios</h2><div className="mt-4 grid gap-4 md:grid-cols-2"><blockquote className="rounded bg-white p-4">“Encontré electricista en 20 minutos.” — Laura</blockquote><blockquote className="rounded bg-white p-4">“Me llegan clientes de calidad cada semana.” — Sergio</blockquote></div></section>
    </div>
  );
}
