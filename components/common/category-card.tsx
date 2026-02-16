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
  const count = (name.length * 3) % 14 + 6;
  return (
    <Card className="group warm-glow cursor-pointer rounded-2xl p-5 transition duration-200 hover:-translate-y-0.5">
      <div className="mb-3 inline-flex rounded-lg bg-copper/25 p-2 text-amber transition group-hover:scale-110">{iconMap[name] ?? <Sparkles className="h-5 w-5" />}</div>
      <h3 className="text-cream">{name}</h3>
      <p className="mt-1 text-sm text-muted">{count} profesionales disponibles cerca de ti</p>
    </Card>
  );
}
