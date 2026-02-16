import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, description, onClear }: { title: string; description: string; onClear?: () => void }) {
  return (
    <div className="glass rounded-2xl p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10"><SearchX className="h-6 w-6 text-amber" /></div>
      <h3 className="text-cream">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
      {onClear && <Button variant="outline" className="mt-4" onClick={onClear}>Limpiar filtros</Button>}
    </div>
  );
}
