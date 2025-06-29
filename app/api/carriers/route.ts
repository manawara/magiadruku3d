// app/api/carriers/route.ts
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.carrier.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch carriers:", error);
    return NextResponse.json(
      { error: "Failed to fetch carriers" },
      { status: 500 }
    );
  }
}
