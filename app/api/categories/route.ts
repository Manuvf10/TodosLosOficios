import { NextResponse } from "next/server";
import { createServerSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerSupabaseAdmin();
  const { data, error } = await supabase.from("categories").select("name").order("name");
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json((data || []).map((c) => c.name));
}
