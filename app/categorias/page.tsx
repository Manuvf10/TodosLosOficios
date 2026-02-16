import { CategoryCard } from "@/components/common/category-card";
import { categorias } from "@/data/categorias";

export const metadata = { title: "Categorías", description: "Oficios disponibles" };

export default function CategoriasPage() {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-cream">Categorías</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categorias.map((c) => <CategoryCard key={c} name={c} />)}</div>
    </div>
  );
}
