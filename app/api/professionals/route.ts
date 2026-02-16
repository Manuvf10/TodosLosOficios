import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseAdmin } from "@/lib/supabase/server";
import { distanciaKm } from "@/lib/geo";

const querySchema = z.object({
  ciudad: z.string().optional(),
  city: z.string().optional(),
  categoria: z.string().optional(),
  category: z.string().optional(),
  radioKm: z.coerce.number().min(1).max(200).optional(),
  order: z.string().optional(),
  orden: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const parsed = querySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams.entries()));
  if (!parsed.success) return NextResponse.json({ message: "Parámetros inválidos" }, { status: 400 });

  const q = parsed.data;
  const supabase = createServerSupabaseAdmin();
  const categoria = q.categoria || q.category || "";
  const ciudad = q.ciudad || q.city || "Alicante";
  const radioKm = q.radioKm ?? 10;
  const orden = q.orden || q.order || "valorados";

  const { data, error } = await supabase
    .from("professional_profiles")
    .select("user_id, city, postal_code, categories, base_price, bio, photo_url, verified, emergency, availability, users!inner(name)");

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  let rows = (data || []).map((p: any) => ({
    id: p.user_id,
    name: p.users.name,
    category: p.categories?.[0] || "General",
    categories: p.categories || [],
    city: p.city,
    postalCode: p.postal_code,
    baseRate: Number(p.base_price || 0),
    description: p.bio || "",
    verified: !!p.verified,
    urgent: !!p.emergency,
    rating: 4.7,
    reviewsCount: 18,
    photo: p.photo_url || "https://placehold.co/400x300",
    availability: p.availability || [],
    services: p.categories || [],
    role: "PROFESIONAL",
    email: "",
  }));

  if (categoria) rows = rows.filter((p) => p.category === categoria || p.categories.includes(categoria));
  rows = rows.filter((p) => distanciaKm(ciudad, p.city) <= radioKm);

  rows.sort((a, b) => {
    if (orden === "cercanos") return distanciaKm(ciudad, a.city) - distanciaKm(ciudad, b.city);
    if (orden === "economicos") return a.baseRate - b.baseRate;
    return b.rating - a.rating;
  });

  return NextResponse.json(rows);
}
