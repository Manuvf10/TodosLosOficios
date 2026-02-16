import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { createServerSupabaseAdmin } from "@/lib/supabase/server";

const schema = z.object({
  professionalId: z.string().uuid(),
  message: z.string().min(8),
  preferredDate: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "CLIENTE") {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const payload = schema.safeParse(await req.json());
  if (!payload.success) return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });

  const supabase = createServerSupabaseAdmin();

  const { data: created, error } = await supabase
    .from("leads")
    .insert({
      client_id: session.user.id,
      professional_id: payload.data.professionalId,
      message: payload.data.message,
      preferred_date: payload.data.preferredDate || null,
      status: "enviado",
    })
    .select("id, created_at")
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 400 });

  const [{ data: proUser }, { data: clientUser }] = await Promise.all([
    supabase.from("users").select("name").eq("id", payload.data.professionalId).maybeSingle(),
    supabase.from("users").select("name").eq("id", session.user.id).maybeSingle(),
  ]);

  const [{ data: proAuth }, { data: cliAuth }] = await Promise.all([
    supabase.auth.admin.getUserById(payload.data.professionalId),
    supabase.auth.admin.getUserById(session.user.id),
  ]);

  try {
    await fetch(new URL("/api/email/lead-created", req.url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        professionalEmail: proAuth.user?.email || "demo@demo.com",
        clientEmail: cliAuth.user?.email || "demo@demo.com",
        professionalName: proUser?.name || "Profesional",
        clientName: clientUser?.name || "Cliente",
        message: payload.data.message,
      }),
    });
  } catch {
    // No bloqueamos la creación del lead si el email falla.
  }

  return NextResponse.json({ id: created.id, createdAt: created.created_at, status: "enviado" });
}
