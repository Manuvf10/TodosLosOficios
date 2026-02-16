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
      <h1 className="text-3xl font-bold text-slate-100">Solicitudes enviadas</h1>
      {solicitudes.length === 0 && <Card>No has enviado solicitudes todavía.</Card>}
      {solicitudes.map((s) => (
        <Card key={s.id} className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-slate-100">{s.professionalName}</p>
            <Badge>{s.estado}</Badge>
          </div>
          <p className="text-slate-300">{s.message}</p>
          <p className="text-xs text-slate-400">Fecha preferida: {s.preferredDate || "No indicada"}</p>
        </Card>
      ))}
    </div>
  );
}
