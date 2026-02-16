import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServerSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "PROFESIONAL") return NextResponse.json({ message: "No autorizado" }, { status: 401 });

  const supabase = createServerSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .select("id, message, preferred_date, created_at, status, client_id")
    .eq("professional_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  const ids = [...new Set((data || []).map((d) => d.client_id))];
  const { data: clients } = await supabase.from("users").select("id,name").in("id", ids);
  const map = new Map((clients || []).map((p) => [p.id, p.name]));

  const rows = (data || []).map((d) => ({
    id: d.id,
    message: d.message,
    preferredDate: d.preferred_date ?? "",
    createdAt: d.created_at,
    estado: d.status,
    clientId: d.client_id,
    clientName: map.get(d.client_id) || "Cliente",
  }));

  return NextResponse.json(rows);
}
