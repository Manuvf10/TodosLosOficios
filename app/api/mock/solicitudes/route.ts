import { NextResponse } from "next/server";

let cache: any[] = [];

export async function GET() { return NextResponse.json(cache); }
export async function POST(req: Request) {
  const body = await req.json();
  cache = [body, ...cache];
  return NextResponse.json(body, { status: 201 });
}
