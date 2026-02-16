import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseAdmin } from "@/lib/supabase/server";

const schema = z.object({
  role: z.enum(["CLIENTE", "PROFESIONAL"]),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  city: z.string().min(2),
  postalCode: z.string().min(4),
  category: z.string().optional(),
  baseRate: z.number().optional(),
  description: z.string().optional(),
});

export async function POST(req: Request) {
  const payload = schema.safeParse(await req.json());
  if (!payload.success) return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });

  const supabase = createServerSupabaseAdmin();
  const body = payload.data;

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true,
    user_metadata: { name: body.name },
  });

  if (createError || !created.user) {
    return NextResponse.json({ message: createError?.message ?? "No se pudo registrar" }, { status: 400 });
  }

  const userId = created.user.id;

  const { error: userError } = await supabase.from("users").insert({
    id: userId,
    role: body.role,
    name: body.name,
    pro_plan: "FREE",
  });

  if (userError) return NextResponse.json({ message: userError.message }, { status: 400 });

  if (body.role === "PROFESIONAL") {
    const { error: profileError } = await supabase.from("professional_profiles").insert({
      user_id: userId,
      city: body.city,
      postal_code: body.postalCode,
      categories: [body.category || "General"],
      base_price: body.baseRate || 30,
      bio: body.description || "",
      photo_url: "https://placehold.co/400x300",
      verified: false,
      emergency: false,
      availability: ["Lun"],
    });
    if (profileError) return NextResponse.json({ message: profileError.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, userId });
}
