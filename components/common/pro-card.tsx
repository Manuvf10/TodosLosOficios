import Link from "next/link";
import { MapPin, Star, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Professional } from "@/types";

export function ProCard({ pro, distance }: { pro: Professional; distance: number }) {
  return (
    <Card className="group overflow-hidden p-0">
      <img src={pro.photo} alt={pro.name} className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" />
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-100">{pro.name}</h3>
            <p className="text-sm text-slate-300">{pro.category}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-amber-300"><Star className="h-4 w-4 fill-amber-300" />{pro.rating}</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{distance} km</span>
          <span>Desde {pro.baseRate}€</span>
          <span>{pro.reviewsCount} reseñas</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {pro.verified && <Badge className="text-emerald-200"><ShieldCheck className="mr-1 h-3.5 w-3.5" />Verificado</Badge>}
          {pro.urgent && <Badge className="text-amber-200"><Zap className="mr-1 h-3.5 w-3.5" />Urgencias</Badge>}
          {pro.rating >= 4.8 && <Badge className="text-cyan-200">Top Pro</Badge>}
        </div>

        <Link href={`/profesional/${pro.id}`} className="inline-flex rounded-lg border border-cyan-300/30 bg-cyan-400/15 px-3 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/25">
          Ver perfil
        </Link>
      </div>
    </Card>
  );
}
