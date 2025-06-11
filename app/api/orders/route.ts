// app/api/furgonetka/orders/route.ts
import { NextRequest, NextResponse } from "next/server";

const AUTH_TOKEN = process.env.FURGONETKA_API_TOKEN; // ustaw w .env

// Dodaj obsługę CORS
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() });
}

export async function GET(req: NextRequest) {
  console.log("GET /api/furgonetka/orders - wywołanie API");
  console.log("Headers:", Object.fromEntries(req.headers.entries()));

  const auth = req.headers.get("authorization");
  console.log("Authorization header:", auth);
  console.log("Expected token:", AUTH_TOKEN ? "SET" : "NOT SET");

  if (!AUTH_TOKEN) {
    console.error("FURGONETKA_API_TOKEN nie jest ustawiony");
    return NextResponse.json(
      { error: "Server configuration error" },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }

  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    console.log("Autoryzacja nieudana");
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
        headers: corsHeaders(),
      }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Prosta walidacja minimalnych danych
    if (!body?.id || !body?.recipient || !body?.items) {
      return NextResponse.json(
        { error: "Missing order data" },
        { status: 400 }
      );
    }

    // W prawdziwej aplikacji tutaj możesz np. zapisać do bazy
    console.log("Odebrano nowe zamówienie:", body);

    return NextResponse.json(
      {
        success: true,
        message: "Zamówienie odebrane pomyślnie",
        order: body,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
