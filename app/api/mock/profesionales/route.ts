import { NextRequest, NextResponse } from "next/server";
import { profesionales } from "@/data/profesionales";
import { distanciaKm } from "@/lib/geo";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const categoria = searchParams.get("categoria");
  const ciudad = searchParams.get("ciudad") || "Madrid";
  const radioKm = Number(searchParams.get("radioKm") || 10);
  const orden = searchParams.get("orden") || "valorados";

  let rows = profesionales.filter((p) => !categoria || p.category === categoria).filter((p) => distanciaKm(ciudad, p.city) <= radioKm);

  rows = rows.sort((a, b) => {
    if (orden === "cercanos") return distanciaKm(ciudad, a.city) - distanciaKm(ciudad, b.city);
    if (orden === "economicos") return a.baseRate - b.baseRate;
    return b.rating - a.rating;
  });

  return NextResponse.json(rows);
}
