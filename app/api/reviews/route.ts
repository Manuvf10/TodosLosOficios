import { NextRequest, NextResponse } from "next/server";
import { reviews } from "@/data/reviews";

export async function GET(req: NextRequest) {
  const professionalId = req.nextUrl.searchParams.get("professionalId") || "";
  return NextResponse.json(reviews.filter((r) => !professionalId || r.professionalId === professionalId));
}
