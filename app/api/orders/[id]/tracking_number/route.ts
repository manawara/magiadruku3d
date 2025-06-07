import { NextRequest, NextResponse } from "next/server";

const AUTH_TOKEN = process.env.FURGONETKA_API_TOKEN;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = await req.json();
  const trackingNumber = data.tracking_number;

  // Tu możesz np. zapisać tracking number w bazie danych
  console.log(`Odebrano tracking dla zamówienia ${id}: ${trackingNumber}`);

  return NextResponse.json({ status: "ok" });
}
