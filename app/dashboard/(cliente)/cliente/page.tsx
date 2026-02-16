"use client";
import { useSession } from "next-auth/react";
import { listSolicitudesCliente } from "@/lib/api";
import { Card } from "@/components/ui/card";

export default function ClienteDashboard() {
  const { data } = useSession();
  const solicitudes = listSolicitudesCliente(data?.user?.id || "");
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Mis solicitudes</h1>
      <div className="space-y-3">{solicitudes.map((s)=><Card key={s.id}><p className="font-medium">{s.professionalName}</p><p>{s.message}</p><p className="text-sm">Estado: {s.estado}</p></Card>)}{solicitudes.length===0&&<Card>No hay solicitudes aún.</Card>}</div>
    </div>
  );
}
