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
  const [tab, setTab] = useState<"servicios" | "zona" | "resenas">("servicios");

  if (!pro) return <p className="text-muted">Cargando...</p>;

  return (
    <div className="space-y-6">
      <section className="glass overflow-hidden rounded-3xl p-0">
        <div className="h-44 bg-gradient-to-r from-cacao via-copper/35 to-amber/35" />
        <div className="-mt-16 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex items-end gap-4">
              <img src={pro.photo} alt={pro.name} className="h-24 w-24 rounded-2xl border border-sand/25 object-cover" />
              <div>
                <h1 className="text-3xl font-bold text-cream">{pro.name}</h1>
                <p className="text-muted">{pro.category} · {pro.city}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pro.verified && <Badge><ShieldCheck className="mr-1 h-3.5 w-3.5" />Verificado</Badge>}
                  {pro.urgent && <Badge className="text-terracotta"><Zap className="mr-1 h-3.5 w-3.5" />Urgencias</Badge>}
                  <Badge><Star className="mr-1 h-3.5 w-3.5 fill-amber text-amber" />{pro.rating}</Badge>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild><Button size="lg">Solicitar presupuesto</Button></DialogTrigger>
              <DialogContent>
                <h3 className="text-xl font-semibold text-cream">Nueva solicitud</h3>
                <p id="dialog-description" className="mb-3 text-sm text-muted">Describe tu necesidad y una fecha preferida. Te responderán pronto.</p>
                <div className="space-y-3">
                  <Textarea placeholder="Ej: instalación eléctrica y revisión general" value={message} onChange={(e) => setMessage(e.target.value)} />
                  <Input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
                  <Button onClick={() => {
                    if (!session?.user) return alert("Debes iniciar sesión");
                    if (message.trim().length < 8) return alert("Describe mejor la solicitud");
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

      <div className="flex flex-wrap gap-2">
        <Button variant={tab === "servicios" ? "default" : "outline"} size="sm" onClick={() => setTab("servicios")}>Servicios</Button>
        <Button variant={tab === "zona" ? "default" : "outline"} size="sm" onClick={() => setTab("zona")}>Zona y disponibilidad</Button>
        <Button variant={tab === "resenas" ? "default" : "outline"} size="sm" onClick={() => setTab("resenas")}>Reseñas</Button>
      </div>

      {tab === "servicios" && (
        <Card>
          <h2 className="mb-2 text-xl font-semibold text-cream">Servicios y descripción</h2>
          <p className="text-muted">{pro.description}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">{pro.services.map((s) => <li key={s}>{s}</li>)}</ul>
        </Card>
      )}

      {tab === "zona" && (
        <Card>
          <h2 className="mb-2 text-lg font-semibold text-cream">Zona y disponibilidad</h2>
          <p className="mb-2 inline-flex items-center gap-1 text-muted"><MapPin className="h-4 w-4" />{pro.city} ({pro.postalCode})</p>
          <div className="flex flex-wrap gap-2">{pro.availability.map((d) => <Badge key={d}>{d}</Badge>)}</div>
        </Card>
      )}

      {tab === "resenas" && (
        <Card>
          <h2 className="mb-3 text-xl font-semibold text-cream">Reseñas ({reviews.length})</h2>
          <div className="space-y-3">
            {reviews.map((r) => (
              <article key={r.id} className="rounded-xl border border-sand/20 bg-white/5 p-3">
                <p className="font-medium text-cream">{r.author} · <span className="text-amber">{r.rating}⭐</span></p>
                <p className="text-xs text-muted/80">{r.date}</p>
                <p className="mt-2 text-muted">{r.comment}</p>
              </article>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
