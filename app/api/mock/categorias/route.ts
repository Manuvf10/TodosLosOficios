import { NextResponse } from "next/server";
import { categorias } from "@/data/categorias";

export async function GET() { return NextResponse.json(categorias); }
