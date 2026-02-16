import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServerSupabaseAdmin } from "@/lib/supabase/server";

const profileSchema = z.object({
  description: z.string().min(10),
  baseRate: z.number().min(10),
  city: z.string().min(2),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "PROFESIONAL") {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const supabase = createServerSupabaseAdmin();
  const { data, error } = await supabase
    .from("professional_profiles")
    .select("user_id, city, postal_code, categories, base_price, bio")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ message: "Perfil no encontrado" }, { status: 404 });

  return NextResponse.json({
    id: data.user_id,
    city: data.city,
    postalCode: data.postal_code,
    category: data.categories?.[0] ?? "General",
    baseRate: Number(data.base_price ?? 0),
    description: data.bio ?? "",
  });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "PROFESIONAL") {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const parsed = profileSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });
  }

  const supabase = createServerSupabaseAdmin();
  const { data: current, error: getError } = await supabase
    .from("professional_profiles")
    .select("categories, postal_code")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (getError || !current) {
    return NextResponse.json({ message: "Perfil no encontrado" }, { status: 404 });
  }

  const { error } = await supabase
    .from("professional_profiles")
    .update({
      city: parsed.data.city,
      base_price: parsed.data.baseRate,
      bio: parsed.data.description,
      categories: current.categories,
      postal_code: current.postal_code,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", session.user.id);

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
