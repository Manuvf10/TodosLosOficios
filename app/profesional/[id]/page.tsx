"use client";
import Link from "next/link";
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
import { ArrowLeft, Star, ShieldCheck, Zap, MapPin, Clock3 } from "lucide-react";

export default function ProfesionalPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const { data: pro } = useQuery({ queryKey: ["pro", id], queryFn: () => fetchProfesionalById(id) });
  const { data: reviews = [] } = useQuery({ queryKey: ["reviews", id], queryFn: () => fetchReviews(id) });
  const [message, setMessage] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [tab, setTab] = useState<"servicios" | "zona" | "resenas">("servicios");
  const [notice, setNotice] = useState<string | null>(null);

  if (!pro) return <p className="text-muted">Cargando perfil...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 text-sm">
        <Link href="/buscar" className="inline-flex items-center gap-1 text-muted hover:text-cream"><ArrowLeft className="h-4 w-4" />Volver a resultados</Link>
        <p className="text-xs text-muted">Siguiente paso: revisa perfil y solicita presupuesto</p>
      </div>

      <section className="glass overflow-hidden rounded-3xl p-0">
        <div className="h-44 bg-gradient-to-r from-cacao via-copper/35 to-amber/35" />
        <div className="-mt-16 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex items-end gap-4">
              <img src={pro.photo} alt={pro.name} className="h-24 w-24 rounded-2xl border border-sand/25 object-cover" />
              <div>
                <h1>{pro.name}</h1>
                <p className="text-muted">{pro.category} · {pro.city}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pro.verified && <Badge><ShieldCheck className="mr-1 h-3.5 w-3.5" />Perfil verificado</Badge>}
                  {pro.urgent && <Badge className="text-terracotta"><Zap className="mr-1 h-3.5 w-3.5" />Atiende urgencias</Badge>}
                  <Badge><Star className="mr-1 h-3.5 w-3.5 fill-amber text-amber" />{pro.rating} ({pro.reviewsCount} reseñas)</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="inline-flex items-center gap-1 text-xs text-muted"><Clock3 className="h-3.5 w-3.5" />Respuesta estimada en menos de 2 horas</p>
              <Dialog>
                <DialogTrigger asChild><Button size="lg">Solicitar presupuesto</Button></DialogTrigger>
                <DialogContent>
                  <h3 className="text-xl font-semibold text-cream">Cuéntale lo que necesitas</h3>
                  <p id="dialog-description" className="mb-3 text-sm text-muted">Ejemplo: “Arreglo fuga urgente hoy por la tarde”. Cuanto más detalle, mejor presupuesto recibirás.</p>
                  <div className="space-y-3">
                    <label className="text-sm text-muted">Descripción del trabajo</label>
                    <Textarea placeholder="Describe el problema, ubicación y urgencia" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <label className="text-sm text-muted">Fecha preferida (opcional)</label>
                    <Input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />
                    <Button onClick={() => {
                      if (!session?.user) return alert("Debes iniciar sesión");
                      if (message.trim().length < 8) return alert("Por favor, añade más detalle para recibir mejor propuesta");
                      createSolicitud({ id: `sol-${Date.now()}`, professionalId: pro.id, professionalName: pro.name, clientId: session.user.id, clientName: session.user.name || "Cliente", message, preferredDate, createdAt: new Date().toISOString(), estado: "enviado" });
                      setMessage("");
                      setPreferredDate("");
                      setNotice("Solicitud enviada ✅. Puedes ver su estado en tu dashboard de cliente.");
                    }}>Enviar solicitud</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {notice && <div className="glass rounded-xl p-3 text-sm text-amber">{notice}</div>}

      <div className="flex flex-wrap gap-2">
        <Button variant={tab === "servicios" ? "default" : "outline"} size="sm" onClick={() => setTab("servicios")}>Servicios</Button>
        <Button variant={tab === "zona" ? "default" : "outline"} size="sm" onClick={() => setTab("zona")}>Zona y disponibilidad</Button>
        <Button variant={tab === "resenas" ? "default" : "outline"} size="sm" onClick={() => setTab("resenas")}>Reseñas</Button>
      </div>

      {tab === "servicios" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2>Sobre mí</h2>
            <p className="mt-2 text-muted">Profesional especializado en {pro.category.toLowerCase()} con experiencia en trabajos domésticos y pequeños negocios. Trato cercano, explicación clara y presupuesto detallado.</p>
            <h3 className="mt-4">Servicios ofrecidos</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">{pro.services.map((s) => <li key={s}>{s}</li>)}</ul>
          </Card>
          <Card>
            <h2>¿Qué incluye el presupuesto?</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Diagnóstico inicial del trabajo a realizar.</li>
              <li>Detalle de materiales y mano de obra estimada.</li>
              <li>Plazo aproximado de ejecución.</li>
              <li>Condiciones básicas y garantías del servicio (demo).</li>
            </ul>
          </Card>
        </div>
      )}

      {tab === "zona" && (
        <Card>
          <h2>Zona de trabajo y disponibilidad</h2>
          <p className="mt-2 inline-flex items-center gap-1 text-muted"><MapPin className="h-4 w-4" />Trabaja principalmente en {pro.city} ({pro.postalCode}) y alrededores.</p>
          <p className="mt-3 text-sm text-muted">Franja habitual de atención:</p>
          <div className="mt-2 flex flex-wrap gap-2">{pro.availability.map((d) => <Badge key={d}>{d}</Badge>)}</div>
        </Card>
      )}

      {tab === "resenas" && (
        <Card>
          <h2>Opiniones de clientes ({reviews.length})</h2>
          <div className="mt-3 space-y-3">
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
