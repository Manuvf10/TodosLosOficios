"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { listSolicitudesCliente } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const estadoHelp = {
  enviado: "Solicitud enviada. El profesional aún no ha respondido.",
  aceptado: "¡Buena noticia! El profesional ha aceptado tu solicitud.",
  rechazado: "No disponible ahora. Te recomendamos contactar otro perfil.",
};

export default function ClienteDashboard() {
  const { data } = useSession();
  const solicitudes = listSolicitudesCliente(data?.user?.id || "");

  return (
    <div className="space-y-4">
      <h1>Tus solicitudes</h1>
      <p className="text-sm text-muted">Sigue el estado de cada presupuesto y da el siguiente paso cuando te respondan.</p>

      {solicitudes.length === 0 && (
        <Card className="text-muted">
          <p>Aún no tienes solicitudes enviadas.</p>
          <p className="mt-1 text-xs">Empieza buscando un profesional y compara opciones en tu zona.</p>
          <Link href="/buscar" className="mt-3 inline-block text-amber underline">Ir a buscar profesionales</Link>
        </Card>
      )}

      {solicitudes.map((s) => (
        <Card key={s.id} className="space-y-2">
          <div className="flex items-center justify-between gap-3"><p className="font-semibold text-cream">{s.professionalName}</p><Badge>{s.estado}</Badge></div>
          <p className="text-sm text-muted">{estadoHelp[s.estado]}</p>
          <p className="text-muted">{s.message}</p>
          <p className="text-xs text-muted/80">Fecha preferida: {s.preferredDate || "No indicada"}</p>
        </Card>
      ))}
    </div>
  );
}
