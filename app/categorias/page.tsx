import { categorias } from "@/data/categorias";
export const metadata = { title: "Categorías", description: "Oficios disponibles" };
export default function CategoriasPage() {
  return <div><h1 className="text-3xl font-bold">Categorías</h1><ul className="mt-4 grid gap-2 md:grid-cols-3">{categorias.map((c)=><li key={c} className="rounded bg-white p-3">{c}</li>)}</ul></div>;
}
