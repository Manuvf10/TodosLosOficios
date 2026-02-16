import { NextResponse } from "next/server";
import { profesionales } from "@/data/profesionales";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = profesionales.find((p) => p.id === params.id);
  return item ? NextResponse.json(item) : NextResponse.json({ message: "Not found" }, { status: 404 });
}
