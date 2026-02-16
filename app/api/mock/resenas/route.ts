import { NextRequest, NextResponse } from "next/server";
import { reviews } from "@/data/reviews";

export async function GET(req: NextRequest) {
  const pid = req.nextUrl.searchParams.get("profesionalId");
  return NextResponse.json(reviews.filter((r) => !pid || r.professionalId === pid));
}
