import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServerSupabaseAdmin } from "@/lib/supabase/server";

const schema = z.object({ estado: z.enum(["enviado", "aceptado", "rechazado"]) });

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "PROFESIONAL") return NextResponse.json({ message: "No autorizado" }, { status: 401 });

  const payload = schema.safeParse(await req.json());
  if (!payload.success) return NextResponse.json({ message: "Payload inválido" }, { status: 400 });

  const supabase = createServerSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .update({ status: payload.data.estado })
    .eq("id", params.id)
    .eq("professional_id", session.user.id)
    .select("id,status")
    .maybeSingle();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ message: "No encontrado" }, { status: 404 });

  return NextResponse.json({ ok: true, id: data.id, estado: data.status });
}
