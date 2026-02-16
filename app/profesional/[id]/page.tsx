"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProfesionalById, fetchReviews, createSolicitud } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfesionalPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const { data: pro } = useQuery({ queryKey: ["pro", id], queryFn: () => fetchProfesionalById(id) });
  const { data: reviews = [] } = useQuery({ queryKey: ["reviews", id], queryFn: () => fetchReviews(id) });
  const [message, setMessage] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  if (!pro) return <p>Cargando...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{pro.name}</h1>
      <img src={pro.photo} alt={pro.name} className="h-64 w-full rounded-xl object-cover" />
      <Card><p>{pro.description}</p><p className="mt-2 text-sm">Zona: {pro.city} · Disponibilidad: {pro.availability.join(", ")}</p></Card>
      <Card><h2 className="mb-3 text-xl font-semibold">Reseñas ({reviews.length})</h2>{reviews.map((r)=><div key={r.id} className="mb-2 border-b pb-2"><p className="font-medium">{r.author} · {r.rating}⭐</p><p>{r.comment}</p></div>)}</Card>
      <Dialog>
        <DialogTrigger asChild><Button>Solicitar presupuesto</Button></DialogTrigger>
        <DialogContent>
          <h3 className="text-xl font-semibold">Nueva solicitud</h3>
          <Textarea placeholder="Describe tu necesidad" value={message} onChange={(e)=>setMessage(e.target.value)} />
          <Input type="date" value={preferredDate} onChange={(e)=>setPreferredDate(e.target.value)} />
          <Button onClick={() => {
            if (!session?.user) return alert("Debes iniciar sesión");
            createSolicitud({ id: `sol-${Date.now()}`, professionalId: pro.id, professionalName: pro.name, clientId: session.user.id, clientName: session.user.name || "Cliente", message, preferredDate, createdAt: new Date().toISOString(), estado: "enviado" });
            alert("Solicitud enviada");
          }}>Enviar</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
