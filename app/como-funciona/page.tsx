import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Cómo funciona", description: "Proceso para contratar profesionales" };

export default function ComoFuncionaPage() {
  return (
    <div className="space-y-5">
      <header className="glass rounded-3xl p-6">
        <Badge className="mb-3">Proceso simple</Badge>
        <h1 className="text-3xl font-bold text-cream">Cómo funciona</h1>
        <p className="mt-2 text-muted">Encuentra al profesional ideal en 3 pasos.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {["Busca por oficio y ubicación", "Compara valoraciones y tarifas", "Solicita y recibe presupuesto"].map((t, i) => (
          <article key={t} className="glass rounded-2xl p-5">
            <p className="mb-2 text-xs text-muted/80">Paso {i + 1}</p>
            <h2 className="font-semibold text-cream">{t}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}
