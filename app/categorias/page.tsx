import { CategoryCard } from "@/components/common/category-card";
import { categorias } from "@/data/categorias";

export const metadata = { title: "Categorías de servicio | TodosLosOficios", description: "Explora oficios disponibles y encuentra el profesional que necesitas." };

export default function CategoriasPage() {
  return (
    <div className="space-y-4">
      <h1>Categorías de servicio</h1>
      <p className="max-w-3xl text-muted">Elige un oficio para ver profesionales cercanos, comparar valoraciones y solicitar presupuesto de forma rápida.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categorias.map((c) => <CategoryCard key={c} name={c} />)}</div>
    </div>
  );
}
