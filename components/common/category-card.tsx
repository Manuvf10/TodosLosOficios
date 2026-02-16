import { ReactNode } from "react";
import { Wrench, Zap, Trees, Paintbrush, Hammer, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const iconMap: Record<string, ReactNode> = {
  Fontanería: <Wrench className="h-5 w-5" />,
  Electricidad: <Zap className="h-5 w-5" />,
  Jardinería: <Trees className="h-5 w-5" />,
  Pintura: <Paintbrush className="h-5 w-5" />,
  Carpintería: <Hammer className="h-5 w-5" />,
  Limpieza: <Sparkles className="h-5 w-5" />,
};

export function CategoryCard({ name }: { name: string }) {
  return (
    <Card className="group cursor-pointer rounded-2xl p-5">
      <div className="mb-3 inline-flex rounded-lg bg-cyan-400/20 p-2 text-cyan-200 transition group-hover:scale-110">
        {iconMap[name] ?? <Sparkles className="h-5 w-5" />}
      </div>
      <h3 className="font-semibold text-slate-100">{name}</h3>
      <p className="mt-1 text-sm text-slate-300">Profesionales verificados y reseñados.</p>
    </Card>
  );
}
