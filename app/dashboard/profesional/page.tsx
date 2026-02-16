"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listSolicitudesProfesional, updateSolicitudEstado } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/common/toast-provider";

export default function ProfesionalDashboard() {
  const { data } = useSession();
  const { pushToast } = useToast();
  const queryClient = useQueryClient();
  const [openId, setOpenId] = useState<string | null>(null);
  const { data: solicitudes = [], isLoading } = useQuery({ queryKey: ["leads", "pro"], queryFn: listSolicitudesProfesional });

  const mutation = useMutation({
    mutationFn: ({ id, estado }: { id: string; estado: "aceptado" | "rechazado" }) => updateSolicitudEstado(id, estado),
    onSuccess: async (_, vars) => {
      pushToast(
        vars.estado === "aceptado" ? "Solicitud aceptada" : "Solicitud rechazada",
        vars.estado === "aceptado" ? "El cliente verá tu respuesta en su panel." : "Puedes centrarte en otras solicitudes activas.",
      );
      await queryClient.invalidateQueries({ queryKey: ["leads", "pro"] });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1>Nuevas solicitudes</h1>
          <p className="text-sm text-muted">Prioriza las solicitudes urgentes y responde cuanto antes para mejorar conversión.</p>
        </div>
        <Link href="/dashboard/profesional/perfil" className="text-sm text-amber underline">Editar perfil</Link>
      </div>

      <Card>
        <h2 className="text-lg">Acciones rápidas</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/dashboard/profesional"><Button size="sm">Ver nuevas solicitudes</Button></Link>
          <Link href="/dashboard/profesional/perfil"><Button size="sm" variant="outline">Optimizar perfil</Button></Link>
          <Button size="sm" variant="outline" onClick={() => navigator?.clipboard?.writeText(window.location.origin + "/profesional/" + (data?.user?.id || ""))}>Compartir perfil</Button>
        </div>
      </Card>

      {isLoading && <Card className="text-sm text-muted">Cargando solicitudes...</Card>}
      {!isLoading && solicitudes.length === 0 && <Card className="text-muted">Todavía no hay solicitudes. Completa tu perfil con servicios y disponibilidad para recibir más leads.</Card>}

      {solicitudes.map((s) => (
        <Card key={s.id} className="space-y-3">
          <div className="flex items-center justify-between gap-2"><p className="font-semibold text-cream">{s.clientName}</p><Badge>{s.estado}</Badge></div>
          <p className="text-xs text-muted">Cliente (mock): ciudad pendiente de confirmar por mensaje.</p>
          <p className="text-muted">{s.message}</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={() => mutation.mutate({ id: s.id, estado: "aceptado" })}>Aceptar</Button>
            <Button size="sm" variant="outline" onClick={() => mutation.mutate({ id: s.id, estado: "rechazado" })}>Rechazar</Button>
            <Button size="sm" variant="ghost" onClick={() => setOpenId((v) => (v === s.id ? null : s.id))}>Ver detalles</Button>
          </div>
          {openId === s.id && <div className="rounded-lg border border-sand/20 bg-white/5 p-3 text-sm text-muted">Detalle: solicitud creada el {new Date(s.createdAt).toLocaleDateString("es-ES")}, preferencia {s.preferredDate || "no indicada"}.</div>}
        </Card>
      ))}
    </div>
  );
}
