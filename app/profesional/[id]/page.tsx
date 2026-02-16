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
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, Zap, MapPin } from "lucide-react";

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
      <section className="glass overflow-hidden rounded-3xl p-0">
        <div className="h-44 bg-gradient-to-r from-cyan-500/35 via-indigo-500/25 to-emerald-500/30" />
        <div className="-mt-16 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex items-end gap-4">
              <img src={pro.photo} alt={pro.name} className="h-24 w-24 rounded-2xl border border-white/20 object-cover" />
              <div>
                <h1 className="text-3xl font-bold text-slate-100">{pro.name}</h1>
                <p className="text-slate-300">{pro.category} · {pro.city}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pro.verified && <Badge><ShieldCheck className="mr-1 h-3.5 w-3.5" />Verificado</Badge>}
                  {pro.urgent && <Badge><Zap className="mr-1 h-3.5 w-3.5" />Urgencias</Badge>}
                  <Badge><Star className="mr-1 h-3.5 w-3.5 fill-amber-300 text-amber-300" />{pro.rating}</Badge>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild><Button size="lg">Solicitar presupuesto</Button></DialogTrigger>
              <DialogContent>
                <h3 className="text-xl font-semibold text-slate-100">Nueva solicitud</h3>
                <p id="dialog-description" className="mb-3 text-sm text-slate-300">Describe tu necesidad y cuándo te viene mejor la visita.</p>
                <div className="space-y-3">
                  <Textarea placeholder="Ej: fuga en cocina, necesito visita esta semana" value={message} onChange={(e) => setMessage(e.target.value)} />
                  <Input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
                  <Button onClick={() => {
                    if (!session?.user) return alert("Debes iniciar sesión");
                    createSolicitud({ id: `sol-${Date.now()}`, professionalId: pro.id, professionalName: pro.name, clientId: session.user.id, clientName: session.user.name || "Cliente", message, preferredDate, createdAt: new Date().toISOString(), estado: "enviado" });
                    setMessage("");
                    setPreferredDate("");
                    alert("✨ Solicitud enviada correctamente");
                  }}>Enviar solicitud</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <h2 className="mb-2 text-xl font-semibold text-slate-100">Servicios y descripción</h2>
          <p className="text-slate-300">{pro.description}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">{pro.services.map((s) => <li key={s}>{s}</li>)}</ul>
        </Card>
        <Card>
          <h2 className="mb-2 text-lg font-semibold text-slate-100">Zona y disponibilidad</h2>
          <p className="mb-2 inline-flex items-center gap-1 text-slate-300"><MapPin className="h-4 w-4" />{pro.city} ({pro.postalCode})</p>
          <div className="flex flex-wrap gap-2">{pro.availability.map((d) => <Badge key={d}>{d}</Badge>)}</div>
        </Card>
      </div>

      <Card>
        <h2 className="mb-3 text-xl font-semibold text-slate-100">Reseñas ({reviews.length})</h2>
        <div className="space-y-3">
          {reviews.map((r) => (
            <article key={r.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="font-medium text-slate-100">{r.author} · <span className="text-amber-300">{r.rating}⭐</span></p>
              <p className="text-xs text-slate-400">{r.date}</p>
              <p className="mt-2 text-slate-300">{r.comment}</p>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
