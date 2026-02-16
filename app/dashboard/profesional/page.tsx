"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { listSolicitudesProfesional, updateSolicitudEstado } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfesionalDashboard() {
  const { data } = useSession();
  const solicitudes = listSolicitudesProfesional(data?.user?.id || "");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-bold text-cream">Solicitudes recibidas</h1><Link href="/dashboard/profesional/perfil" className="text-sm text-amber underline">Editar perfil</Link></div>
      {solicitudes.length === 0 && <Card className="text-muted">No hay solicitudes nuevas.</Card>}
      {solicitudes.map((s) => (
        <Card key={s.id} className="space-y-3">
          <div className="flex items-center justify-between gap-2"><p className="font-semibold text-cream">{s.clientName}</p><Badge>{s.estado}</Badge></div>
          <p className="text-muted">{s.message}</p>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => updateSolicitudEstado(s.id, "aceptado")}>Aceptar</Button>
            <Button size="sm" variant="outline" onClick={() => updateSolicitudEstado(s.id, "rechazado")}>Rechazar</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
