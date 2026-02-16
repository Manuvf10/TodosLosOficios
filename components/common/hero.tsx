import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  return (
    <section className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <Badge className="mb-4">Marketplace cálido · Demo premium</Badge>
          <h1 className="heading-gradient text-4xl font-extrabold leading-tight md:text-5xl">Encuentra profesionales confiables con una experiencia premium</h1>
          <p className="mt-4 max-w-xl text-muted">Compara reputación, distancia y tarifas en segundos. Solicita presupuesto con un flujo claro y profesional.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/buscar"><Button size="lg">Buscar profesional</Button></Link>
            <Link href="/registro?role=PROFESIONAL"><Button size="lg" variant="outline">Soy profesional</Button></Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
            <Badge>+30 profesionales</Badge><Badge>4.8⭐ media</Badge><Badge>Respuesta &lt; 2h</Badge>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-sand/20 bg-cacao/50 p-4 transition duration-200 hover:-translate-y-0.5">
          <p className="text-sm font-semibold text-cream">Preview de búsqueda</p>
          <Input placeholder="Ciudad o código postal" defaultValue="Madrid" />
          <div className="grid grid-cols-2 gap-3 text-sm text-muted">
            <div className="rounded-xl border border-sand/20 bg-white/5 p-3">Electricidad</div>
            <div className="rounded-xl border border-sand/20 bg-white/5 p-3">Radio 10 km</div>
          </div>
          <div className="rounded-xl border border-amber/40 bg-amber/10 p-3 text-sm text-amber">18 profesionales encontrados en tu zona.</div>
          <Image src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=1200&auto=format&fit=crop" alt="Vista previa marketplace" width={800} height={480} className="h-36 w-full rounded-xl object-cover" />
        </div>
      </div>
    </section>
  );
}
