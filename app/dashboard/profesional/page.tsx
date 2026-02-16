"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { listSolicitudesProfesional, updateSolicitudEstado } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfesionalDashboard() {
  const { data } = useSession();
  const solicitudes = listSolicitudesProfesional(data?.user?.id || "");
  return (
    <div>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-3xl font-bold">Solicitudes recibidas</h1><Link href="/dashboard/profesional/perfil" className="text-primary underline">Editar perfil</Link></div>
      <div className="space-y-3">{solicitudes.map((s)=><Card key={s.id}><p className="font-medium">{s.clientName}</p><p>{s.message}</p><div className="mt-2 flex gap-2"><Button variant="secondary" onClick={()=>updateSolicitudEstado(s.id,"aceptado")}>Aceptar</Button><Button variant="outline" onClick={()=>updateSolicitudEstado(s.id,"rechazado")}>Rechazar</Button></div></Card>)}{solicitudes.length===0&&<Card>No hay solicitudes.</Card>}</div>
    </div>
  );
}
