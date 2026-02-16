import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const parsedId = z.string().uuid().safeParse(params.id);
  if (!parsedId.success) return NextResponse.json({ message: "ID inválido" }, { status: 400 });

  const supabase = createServerSupabaseAdmin();
  const { data, error } = await supabase
    .from("professional_profiles")
    .select("user_id, city, postal_code, categories, base_price, bio, photo_url, verified, emergency, availability, users!inner(name)")
    .eq("user_id", parsedId.data)
    .maybeSingle();

  if (error || !data) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const item = {
    id: data.user_id,
    name: (data as any).users.name,
    category: data.categories?.[0] || "General",
    categories: data.categories || [],
    city: data.city,
    postalCode: data.postal_code,
    baseRate: Number(data.base_price || 0),
    description: data.bio || "",
    verified: !!data.verified,
    urgent: !!data.emergency,
    rating: 4.7,
    reviewsCount: 18,
    photo: data.photo_url || "https://placehold.co/400x300",
    availability: data.availability || [],
    services: data.categories || [],
    role: "PROFESIONAL",
    email: "",
  };

  return NextResponse.json(item);
}
