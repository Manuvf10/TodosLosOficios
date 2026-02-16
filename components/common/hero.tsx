import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  return (
    <section className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <Badge className="mb-4">Marketplace local · Demo premium</Badge>
          <h1 className="heading-gradient text-4xl font-extrabold leading-tight md:text-5xl">
            Encuentra profesionales verificados cerca de ti
          </h1>
          <p className="mt-4 max-w-xl text-slate-300">
            Compara perfiles, reputación y precio en segundos. Solicita presupuestos y recibe respuesta rápida.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/buscar"><Button size="lg">Buscar profesional</Button></Link>
            <Link href="/registro?role=PROFESIONAL"><Button size="lg" variant="outline">Soy profesional</Button></Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
            <Badge>+30 profesionales</Badge><Badge>4.8⭐ media</Badge><Badge>Respuesta &lt; 2h</Badge>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/15 bg-slate-900/50 p-4">
          <p className="text-sm font-semibold text-slate-200">Simula una búsqueda rápida</p>
          <Input placeholder="Ciudad o código postal" defaultValue="Madrid" />
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
            <div className="rounded-xl border border-white/15 bg-white/5 p-3">Fontanería</div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-3">Radio 10 km</div>
          </div>
          <div className="rounded-xl border border-cyan-300/40 bg-cyan-400/10 p-3 text-sm text-cyan-100">
            18 profesionales encontrados en tu zona.
          </div>
        </div>
      </div>
    </section>
  );
}
