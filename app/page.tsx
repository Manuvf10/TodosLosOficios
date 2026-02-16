import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CategoryCard } from "@/components/common/category-card";
import { Hero } from "@/components/common/hero";
import { Stats } from "@/components/common/stats";
import { categorias } from "@/data/categorias";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Inicio | TodosLosOficios",
  description: "Marketplace premium cálido para encontrar profesionales locales.",
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <Stats />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-cream">Explora por categorías</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((c) => <CategoryCard key={c} name={c} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-cream">Cómo funciona</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {["Describe tu necesidad", "Compara perfiles y precios", "Contrata con confianza"].map((step, i) => (
            <article key={step} className="glass rounded-2xl p-5">
              <Badge className="mb-3">Paso {i + 1}</Badge>
              <h3 className="font-semibold text-cream">{step}</h3>
              <p className="mt-2 text-sm text-muted">Flujo simple y transparente para clientes y profesionales.</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-cream">Testimonios</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <blockquote key={i} className="glass rounded-2xl p-5 text-cream">
              <div className="mb-2 flex items-center gap-3">
                <Image src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="avatar" width={36} height={36} className="rounded-full" />
                <div>
                  <p className="text-sm font-semibold">Usuario verificado</p>
                  <p className="inline-flex text-amber"><Star className="h-4 w-4 fill-amber" />4.9</p>
                </div>
              </div>
              “Servicio impecable y respuesta rapidísima.”
            </blockquote>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-sand/20 bg-gradient-to-r from-cacao via-copper/35 to-amber/25 p-8 text-center">
        <h2 className="text-3xl font-bold text-cream">¿Listo para contratar o captar clientes?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">Empieza en menos de un minuto y gestiona tus solicitudes desde un panel profesional.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/buscar"><Button size="lg">Buscar ahora <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          <Link href="/registro?role=PROFESIONAL"><Button size="lg" variant="outline">Unirme como profesional</Button></Link>
        </div>
      </section>
    </div>
  );
}
