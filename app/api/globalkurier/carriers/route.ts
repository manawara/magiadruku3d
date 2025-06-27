// app/api/carriers/route.ts
import { NextResponse } from "next/server";
import { fetchWithToken } from "@/lib/globkurier-auth";

export async function GET() {
  try {
    const carriers = await fetchWithToken("/carriers");
    return NextResponse.json(carriers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
