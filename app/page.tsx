import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CategoryCard } from "@/components/common/category-card";
import { Hero } from "@/components/common/hero";
import { Stats } from "@/components/common/stats";
import { categorias } from "@/data/categorias";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Inicio | TodosLosOficios",
  description: "Marketplace visual premium para encontrar profesionales locales.",
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <Stats />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-100">Explora por categorías</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((c) => (
            <CategoryCard key={c} name={c} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-100">Cómo funciona</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {["Describe tu necesidad", "Compara perfiles y precios", "Contrata con confianza"].map((step, i) => (
            <article key={step} className="glass rounded-2xl p-5">
              <Badge className="mb-3">Paso {i + 1}</Badge>
              <h3 className="font-semibold text-slate-100">{step}</h3>
              <p className="mt-2 text-sm text-slate-300">Flujo simple y transparente, con profesionales verificados y reseñas reales.</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-100">Lo que dicen nuestros clientes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {["Encontré fontanero en media hora.", "Más confianza que en apps genéricas.", "Me encantó la calidad del servicio."].map((quote, i) => (
            <blockquote key={i} className="glass rounded-2xl p-5 text-slate-200">
              “{quote}”
              <footer className="mt-3 text-sm text-slate-400">Usuario verificado</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="glass rounded-3xl p-8 text-center">
        <h2 className="text-3xl font-bold text-slate-100">¿Listo para contratar o captar clientes?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">Empieza en menos de un minuto y gestiona tus solicitudes desde un panel elegante y simple.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/buscar"><Button size="lg">Buscar ahora <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          <Link href="/registro?role=PROFESIONAL"><Button size="lg" variant="outline">Unirme como profesional</Button></Link>
        </div>
      </section>
    </div>
  );
}
