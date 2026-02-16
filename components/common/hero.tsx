import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  return (
    <section className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="section-stack">
          <Badge>Servicio local · Presupuestos sin compromiso</Badge>
          <h1 className="heading-gradient">Encuentra profesionales fiables en tu zona, compara y solicita presupuestos en 1 minuto</h1>
          <p className="max-w-2xl text-muted">Desde una fuga urgente hoy hasta una reforma completa. Compara perfiles verificados, reseñas reales y precios orientativos antes de decidir.</p>

          <div className="flex flex-wrap gap-3">
            <Link href="/buscar"><Button size="lg">Buscar y comparar</Button></Link>
            <Link href="/registro?role=PROFESIONAL"><Button size="lg" variant="outline">Unirme como profesional</Button></Link>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-muted">
            <Badge>✅ Profesionales verificados</Badge>
            <Badge>⭐ Reseñas reales</Badge>
            <Badge>⏱️ Respuesta media rápida</Badge>
            <Badge>💬 Sin compromiso</Badge>
          </div>
        </div>

        <div className="glass warm-glow space-y-4 rounded-2xl border border-sand/20 bg-cacao/50 p-4 transition duration-200 hover:-translate-y-0.5">
          <p className="text-sm font-semibold text-cream">Prueba una búsqueda (demo)</p>
          <label className="text-xs text-muted">Ciudad o código postal</label>
          <Input placeholder="Ej: Madrid o 28001" defaultValue="Madrid" />
          <div className="grid grid-cols-2 gap-3 text-sm text-muted">
            <div className="rounded-xl border border-sand/20 bg-white/5 p-3">Fontanería</div>
            <div className="rounded-xl border border-sand/20 bg-white/5 p-3">Radio 10 km</div>
          </div>
          <p className="rounded-xl border border-amber/40 bg-amber/10 p-3 text-sm text-amber">Te mostramos 18 profesionales disponibles con valoración y precio desde.</p>
          <Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop" alt="Profesional local trabajando" width={800} height={480} className="h-36 w-full rounded-xl object-cover" />
        </div>
      </div>
    </section>
  );
}
