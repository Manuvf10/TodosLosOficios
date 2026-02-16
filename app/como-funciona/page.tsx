import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Cómo funciona | TodosLosOficios", description: "Descubre cómo pedir presupuestos y contratar profesionales con confianza." };

export default function ComoFuncionaPage() {
  return (
    <div className="space-y-6">
      <header className="glass rounded-3xl p-6">
        <Badge className="mb-3">Guía rápida</Badge>
        <h1>Cómo contratar en 3 pasos</h1>
        <p className="mt-2 text-muted">Proceso claro para pedir presupuestos, comparar opciones y elegir con tranquilidad.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { t: "Publica tu necesidad", d: "Indica ciudad, oficio y prioridad. Ejemplo: ‘Cambio de termo esta semana’." },
          { t: "Compara profesionales", d: "Revisa reseñas, precio desde, zona de trabajo y disponibilidad." },
          { t: "Elige y coordina", d: "Acepta la mejor propuesta y sigue el estado desde tu panel." },
        ].map((item, i) => (
          <article key={item.t} className="glass rounded-2xl p-5">
            <p className="mb-2 text-xs text-muted/80">Paso {i + 1}</p>
            <h2>{item.t}</h2>
            <p className="mt-2 text-sm text-muted">{item.d}</p>
          </article>
        ))}
      </div>

      <section className="glass rounded-2xl p-5">
        <h2>Preguntas frecuentes</h2>
        <div className="mt-3 space-y-3 text-sm text-muted">
          <p><strong className="text-cream">¿Tiene coste pedir presupuesto?</strong><br />No, puedes solicitar y comparar sin compromiso (demo).</p>
          <p><strong className="text-cream">¿Cómo se verifican las reseñas?</strong><br />Mostramos reseñas vinculadas a solicitudes registradas en la plataforma (mock).</p>
          <p><strong className="text-cream">¿Qué pasa si un profesional no responde?</strong><br />Puedes enviar tu solicitud a otros perfiles cercanos en pocos clics.</p>
          <p><strong className="text-cream">¿Puedo usarlo como profesional?</strong><br />Sí, crea tu perfil y empieza a recibir leads de tu zona.</p>
        </div>
      </section>

      <section className="glass rounded-2xl p-5">
        <h2>Planes para profesionales (demo)</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-sand/20 bg-white/5 p-4">
            <p className="font-semibold text-cream">Plan Inicio</p>
            <p className="text-sm text-muted">Hasta 10 solicitudes/mes · perfil visible · panel básico.</p>
          </div>
          <div className="rounded-xl border border-amber/35 bg-amber/10 p-4">
            <p className="font-semibold text-cream">Plan Pro</p>
            <p className="text-sm text-muted">Solicitudes prioritarias · insignia destacada · estadísticas avanzadas.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
