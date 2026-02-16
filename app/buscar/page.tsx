"use client";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
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

export default function BuscarPage() {
  const [ciudad, setCiudad] = useState("Madrid");
  const [categoria, setCategoria] = useState("");
  const [radioKm, setRadioKm] = useState("10");
  const [orden, setOrden] = useState("valorados");

  const { data: cats = [] } = useQuery({ queryKey: ["cats"], queryFn: fetchCategorias });
  const { data = [], isLoading, error } = useQuery({ queryKey: ["pros", ciudad, categoria, radioKm, orden], queryFn: () => fetchProfesionales({ ciudad, categoria, radioKm, orden }) });

  const activeFilters = useMemo(() => [ciudad && `📍 ${ciudad}`, categoria && `🧰 ${categoria}`, `📏 ${radioKm} km`, `↕ ${orden}`].filter(Boolean), [ciudad, categoria, radioKm, orden]);
  const clearFilters = () => { setCategoria(""); setRadioKm("10"); setOrden("valorados"); };

  return (
    <div className="space-y-5">
      <header className="glass rounded-2xl p-5">
        <h1 className="text-3xl font-bold text-cream">Buscar profesionales</h1>
        <p className="mt-2 text-muted">{data.length} resultados para tu búsqueda. Ajusta filtros para afinar.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <aside className="glass top-20 h-fit rounded-2xl p-4 lg:sticky">
          <h2 className="mb-3 text-lg font-semibold text-cream">Filtros</h2>
          <div className="space-y-3">
            <Input value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ciudad o CP" />
            {!ciudad && <div className="flex flex-wrap gap-2">{POPULAR.map((c) => <button key={c} onClick={() => setCiudad(c)} className="rounded-full border border-sand/25 px-2.5 py-1 text-xs text-muted hover:bg-white/10">{c}</button>)}</div>}
            <Select value={categoria} onValueChange={setCategoria}><SelectTrigger><SelectValue placeholder="Categoría" /></SelectTrigger><SelectContent>{cats.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            <Select value={radioKm} onValueChange={setRadioKm}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["5", "10", "25"].map((v) => <SelectItem key={v} value={v}>{v} km</SelectItem>)}</SelectContent></Select>
            <Select value={orden} onValueChange={setOrden}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="valorados">Mejor valorados</SelectItem><SelectItem value="cercanos">Más cercanos</SelectItem><SelectItem value="economicos">Más económicos</SelectItem></SelectContent></Select>
            <Button variant="outline" className="w-full" onClick={clearFilters}>Limpiar filtros</Button>
          </div>
        </aside>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted"><strong className="text-cream">{data.length}</strong> profesionales encontrados</p>
            <div className="flex flex-wrap gap-2">{activeFilters.map((f) => <Badge key={f}>{f}</Badge>)}</div>
          </div>

          {error && <p className="text-terracotta">Error al cargar resultados</p>}
          {isLoading && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80" />)}</div>}
          {!isLoading && data.length === 0 && <EmptyState title="No encontramos profesionales" description="Prueba ampliar el radio, cambiar ciudad o ajustar categoría." onClear={clearFilters} />}
          {!isLoading && data.length > 0 && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.map((pro) => <ProCard key={pro.id} pro={pro} distance={distanciaKm(ciudad, pro.city)} />)}</div>}
        </section>
      </div>
    </div>
  );
}
