"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCategorias, fetchProfesionales } from "@/lib/api";
import { ProCard } from "@/components/common/pro-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { distanciaKm } from "@/lib/geo";

export default function BuscarPage() {
  const [ciudad, setCiudad] = useState("Madrid");
  const [categoria, setCategoria] = useState("");
  const [radioKm, setRadioKm] = useState("10");
  const [orden, setOrden] = useState("valorados");

  const { data: cats = [] } = useQuery({ queryKey: ["cats"], queryFn: fetchCategorias });
  const { data = [], isLoading, error } = useQuery({ queryKey: ["pros", ciudad, categoria, radioKm, orden], queryFn: () => fetchProfesionales({ ciudad, categoria, radioKm, orden }) });

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Buscar profesionales</h1>
      <div className="mb-5 grid gap-3 rounded-xl bg-white p-4 md:grid-cols-4">
        <Input value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ciudad o CP" />
        <Select onValueChange={setCategoria}><SelectTrigger><SelectValue placeholder="Categoría" /></SelectTrigger><SelectContent>{cats.map((c)=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
        <Select defaultValue="10" onValueChange={setRadioKm}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["5","10","25"].map((v)=><SelectItem key={v} value={v}>{v} km</SelectItem>)}</SelectContent></Select>
        <Select defaultValue="valorados" onValueChange={setOrden}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="valorados">Mejor valorados</SelectItem><SelectItem value="cercanos">Más cercanos</SelectItem><SelectItem value="economicos">Más económicos</SelectItem></SelectContent></Select>
      </div>
      {error && <p className="text-red-600">Error al cargar resultados</p>}
      {isLoading ? <div className="grid gap-4 md:grid-cols-3">{Array.from({length:6}).map((_,i)=><Skeleton key={i} className="h-64" />)}</div> : (
        <div className="grid gap-4 md:grid-cols-3">{data.map((pro)=><ProCard key={pro.id} pro={pro} distance={distanciaKm(ciudad, pro.city)} />)}</div>
      )}
    </div>
  );
}
