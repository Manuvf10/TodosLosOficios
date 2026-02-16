import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Professional } from "@/types";

export function ProCard({ pro, distance }: { pro: Professional; distance: number }) {
  return (
    <Card className="space-y-3">
      <img src={pro.photo} alt={pro.name} className="h-44 w-full rounded-md object-cover" />
      <div className="flex items-center justify-between"><h3 className="font-semibold">{pro.name}</h3><span>{pro.rating}⭐</span></div>
      <p className="text-sm text-slate-600">{pro.category} · {distance} km · Desde {pro.baseRate}€</p>
      <div className="flex gap-2">{pro.verified && <Badge>Verificado</Badge>}{pro.urgent && <Badge className="bg-amber-100">Urgencias</Badge>}</div>
      <Link href={`/profesional/${pro.id}`} className="text-primary underline">Ver perfil</Link>
    </Card>
  );
}
