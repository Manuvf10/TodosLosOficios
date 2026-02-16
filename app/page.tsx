import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CategoryCard } from "@/components/common/category-card";
import { Hero } from "@/components/common/hero";
import { Stats } from "@/components/common/stats";
import { categorias } from "@/data/categorias";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Encuentra profesionales de confianza | TodosLosOficios",
  description: "Compara profesionales verificados en tu zona y solicita presupuestos sin compromiso en menos de un minuto.",
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <Stats />

      <section className="section-stack">
        <h2>Oficios disponibles cerca de ti</h2>
        <p className="max-w-3xl text-muted">Selecciona la categoría, compara perfiles y elige con tranquilidad. Verás valoración, experiencia, precio orientativo y disponibilidad.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categorias.map((c) => <CategoryCard key={c} name={c} />)}</div>
      </section>

      <section className="section-stack">
        <h2>Cómo funciona en 3 pasos</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Cuéntanos qué necesitas", body: "Indica ciudad, oficio y cuándo te viene bien. Ejemplo: ‘Arreglo fuga urgente hoy’." },
            { title: "Compara y decide", body: "Revisa perfiles con reseñas verificadas, tiempos de respuesta y precio desde." },
            { title: "Solicita presupuesto", body: "Envía tu solicitud y recibe respuesta sin compromiso para elegir con confianza." },
          ].map((step, i) => (
            <article key={step.title} className="glass rounded-2xl p-5">
              <Badge className="mb-3">Paso {i + 1}</Badge>
              <h3>{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <h2>Por qué confiar en TodosLosOficios</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass rounded-2xl p-5">
            <ul className="space-y-3 text-sm text-muted">
              {["Perfiles revisados y reseñas visibles.", "Comparación clara de precio orientativo y zona.", "Proceso de solicitud simple, rápido y sin compromiso.", "Panel para seguir tus solicitudes y próximos pasos."].map((item) => (
                <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-amber" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="mb-3">Garantía y seguridad (demo)</h3>
            <p className="text-sm text-muted">Publicamos información clara de cada profesional y damos trazabilidad de tus solicitudes desde el panel. Tú decides a quién contratar y cuándo.</p>
          </div>
        </div>
      </section>

      <section className="section-stack">
        <h2>Opiniones de clientes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { quote: "Pedí presupuesto para una fuga y en una hora ya tenía varias opciones.", name: "Laura, Madrid" },
            { quote: "Me gustó poder comparar reseñas y precio antes de decidir.", name: "Marcos, Valencia" },
            { quote: "Proceso claro y sin llamadas incómodas. Repetiré.", name: "Ana, Sevilla" },
          ].map((item, i) => (
            <blockquote key={item.name} className="glass rounded-2xl p-5 text-cream">
              <div className="mb-2 flex items-center gap-3">
                <Image src={`https://i.pravatar.cc/100?img=${i + 20}`} alt={item.name} width={36} height={36} className="rounded-full" />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="inline-flex items-center gap-1 text-amber"><Star className="h-4 w-4 fill-amber" />4,9</p>
                </div>
              </div>
              “{item.quote}”
            </blockquote>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-sand/20 bg-gradient-to-r from-cacao via-copper/35 to-amber/25 p-8 text-center">
        <h2>¿Necesitas un profesional hoy?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">Empieza ahora, compara perfiles en tu zona y solicita presupuesto en menos de un minuto.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/buscar"><Button size="lg">Buscar y comparar <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          <Link href="/registro?role=PROFESIONAL"><Button size="lg" variant="outline">Quiero recibir solicitudes</Button></Link>
        </div>
      </section>
    </div>
  );
}
