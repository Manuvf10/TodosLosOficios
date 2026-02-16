import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Professional } from "@/types";

export function ProCard({ pro, distance }: { pro: Professional; distance: number }) {
  return (
    <Card className="group warm-glow overflow-hidden p-0">
      <div className="relative h-44 w-full overflow-hidden">
        <Image src={pro.photo} alt={pro.name} fill className="object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-cream">{pro.name}</h3>
            <p className="text-sm text-muted">{pro.category}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-amber"><Star className="h-4 w-4 fill-amber" />{pro.rating}</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{distance} km</span>
          <span>Desde {pro.baseRate}€</span>
          <span>{pro.reviewsCount} reseñas</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {pro.verified && <Badge className="text-amber"><ShieldCheck className="mr-1 h-3.5 w-3.5" />Verificado</Badge>}
          {pro.urgent && <Badge className="text-terracotta"><Zap className="mr-1 h-3.5 w-3.5" />Urgencias</Badge>}
          {pro.rating >= 4.8 && <Badge className="text-amber">Top Pro</Badge>}
        </div>

        <Link href={`/profesional/${pro.id}`} className="inline-flex rounded-lg border border-copper/40 bg-copper/20 px-3 py-2 text-sm text-cream transition hover:bg-copper/30">Ver perfil y pedir presupuesto</Link>
      </div>
    </Card>
  );
}
