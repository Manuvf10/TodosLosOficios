"use client";
import { useSession } from "next-auth/react";
import { listSolicitudesCliente } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ClienteDashboard() {
  const { data } = useSession();
  const solicitudes = listSolicitudesCliente(data?.user?.id || "");

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-cream">Solicitudes enviadas</h1>
      {solicitudes.length === 0 && <Card className="text-muted">No has enviado solicitudes todavía.</Card>}
      {solicitudes.map((s) => (
        <Card key={s.id} className="space-y-2">
          <div className="flex items-center justify-between gap-3"><p className="font-semibold text-cream">{s.professionalName}</p><Badge>{s.estado}</Badge></div>
          <p className="text-muted">{s.message}</p>
          <p className="text-xs text-muted/80">Fecha preferida: {s.preferredDate || "No indicada"}</p>
        </Card>
      ))}
    </div>
  );
}
