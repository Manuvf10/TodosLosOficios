import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseAdmin } from "@/lib/supabase/server";

const schema = z.object({ email: z.string().email() });

export async function GET(req: NextRequest) {
  const parsed = schema.safeParse({ email: req.nextUrl.searchParams.get("email") || "" });
  if (!parsed.success) return NextResponse.json({ role: null });

  const supabase = createServerSupabaseAdmin();
  const { data: authUsers } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const authUser = authUsers.users.find((u) => u.email?.toLowerCase() === parsed.data.email.toLowerCase());
  if (!authUser) return NextResponse.json({ role: null });

  const { data } = await supabase.from("users").select("role").eq("id", authUser.id).maybeSingle();
  return NextResponse.json({ role: data?.role ?? null });
}
