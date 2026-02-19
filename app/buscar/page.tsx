"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCategorias, fetchProfesionales } from "@/lib/api";
import { ProCard } from "@/components/common/pro-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { distanciaKm } from "@/lib/geo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/empty-state";

const POPULAR = ["Madrid", "Barcelona", "Valencia", "Sevilla"];
const RECENT_KEY = "tlo_recent_searches";




export default function BuscarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ciudad, setCiudad] = useState(searchParams.get("ciudad") || "Madrid");
  const [categoria, setCategoria] = useState(searchParams.get("categoria") || "");
  const [radioKm, setRadioKm] = useState(searchParams.get("radioKm") || "10");
  const [orden, setOrden] = useState(searchParams.get("orden") || "valorados");
  const [recent, setRecent] = useState<string[]>([]);

  const { data: cats = [] } = useQuery({ queryKey: ["cats"], queryFn: fetchCategorias });
  const { data = [], isLoading, error } = useQuery({ queryKey: ["pros", ciudad, categoria, radioKm, orden], queryFn: () => fetchProfesionales({ ciudad, categoria, radioKm, orden }) });

  useEffect(() => {
    const params = new URLSearchParams();
    if (ciudad) params.set("ciudad", ciudad);
    if (categoria) params.set("categoria", categoria);
    params.set("radioKm", radioKm);
    params.set("orden", orden);
    router.replace(`/buscar?${params.toString()}`);
  }, [ciudad, categoria, radioKm, orden, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]") as string[];
    setRecent(saved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !ciudad) return;
    const next = [ciudad, ...recent.filter((c) => c !== ciudad)].slice(0, 4);
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ciudad]);

  const activeFilters = useMemo(() => [
    ciudad && `Ubicación: ${ciudad}`,
    categoria && `Oficio: ${categoria}`,
    `Radio: ${radioKm} km`,
    `Orden: ${orden === "valorados" ? "Mejor valorados" : orden === "cercanos" ? "Más cercanos" : "Más económicos"}`,
  ].filter(Boolean), [ciudad, categoria, radioKm, orden]);

  const clearFilters = () => {
    setCategoria("");
    setRadioKm("10");
    setOrden("valorados");
  };

  return (
    <div className="space-y-5">
      <header className="glass rounded-2xl p-5">
        <h1>Encuentra profesionales en tu zona</h1>
        <p className="mt-2 text-muted">Introduce tu ciudad o código postal, elige el radio y compara perfiles con reseñas verificadas.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="glass top-20 h-fit space-y-4 rounded-2xl p-4 lg:sticky">
          <div>
            <h2 className="text-xl">Filtra tu búsqueda</h2>
            <p className="text-xs text-muted">Paso 1: ubicación · Paso 2: oficio · Paso 3: ordena resultados</p>
          </div>

          <div className="space-y-3">
            <Input value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ciudad o CP (ej: 28001)" />

            <div className="space-y-2">
              <p className="text-xs text-muted">Ciudades populares</p>
              <div className="flex flex-wrap gap-2">{POPULAR.map((c) => <button key={c} onClick={() => setCiudad(c)} className="rounded-full border border-sand/25 px-2.5 py-1 text-xs text-muted hover:bg-white/10">{c}</button>)}</div>
            </div>

            {recent.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted">Tus búsquedas recientes</p>
                <div className="flex flex-wrap gap-2">{recent.map((c) => <button key={c} onClick={() => setCiudad(c)} className="rounded-full border border-sand/25 px-2.5 py-1 text-xs text-muted hover:bg-white/10">{c}</button>)}</div>
              </div>
            )}

            <Select value={categoria} onValueChange={setCategoria}><SelectTrigger><SelectValue placeholder="Selecciona oficio" /></SelectTrigger><SelectContent>{cats.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            <Select value={radioKm} onValueChange={setRadioKm}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["5", "10", "25"].map((v) => <SelectItem key={v} value={v}>{v} km</SelectItem>)}</SelectContent></Select>
            <Select value={orden} onValueChange={setOrden}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="valorados">Mejor valorados</SelectItem><SelectItem value="cercanos">Más cercanos</SelectItem><SelectItem value="economicos">Más económicos</SelectItem></SelectContent></Select>
            <Button variant="outline" className="w-full" onClick={clearFilters}>Limpiar filtros</Button>
          </div>

          <div className="rounded-xl border border-sand/20 bg-white/5 p-3 text-xs text-muted">
            <p className="font-semibold text-cream">Información útil</p>
            <p className="mt-1">Reseñas verificadas, profesionales revisados y respuesta media rápida para que elijas con tranquilidad.</p>
          </div>
        </aside>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted"><strong className="text-cream">{data.length}</strong> resultados para tu búsqueda actual</p>
            <div className="flex flex-wrap gap-2">{activeFilters.map((f) => <Badge key={f}>{f}</Badge>)}</div>
          </div>

          {error && <p className="text-terracotta">No hemos podido cargar resultados. Inténtalo de nuevo.</p>}
          {isLoading && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80" />)}</div>}
          {!isLoading && data.length === 0 && <EmptyState title="No encontramos profesionales en ese radio" description="Prueba con 25 km, cambia de ciudad o quita el filtro de oficio para ver más opciones." onClear={clearFilters} />}
          {!isLoading && data.length > 0 && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.map((pro) => <ProCard key={pro.id} pro={pro} distance={distanciaKm(ciudad, pro.city)} />)}</div>}
        </section>
      </div>
    </div>
  );
}
