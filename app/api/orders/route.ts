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

  // Przykładowe dane zamówień dla Furgonetka.pl
  const orders = [
    {
      id: "123",
      name: "Zamówienie 123",
      recipient: {
        name: "Jan Kowalski",
        street: "ul. Przykładowa 1",
        city: "Warszawa",
        postcode: "00-001",
        country: "PL",
        phone: "500500500",
        email: "jan@example.com",
      },
      items: [{ name: "Produkt A", quantity: 1 }],
      weight: 1.5,
      dimensions: {
        length: 20,
        width: 15,
        height: 10,
      },
      value: 99.99,
      cod_amount: 0,
      created_at: new Date().toISOString(),
      status: "pending",
    },
    {
      id: "124",
      name: "Zamówienie 124",
      recipient: {
        name: "Anna Nowak",
        street: "ul. Testowa 5/10",
        city: "Kraków",
        postcode: "30-001",
        country: "PL",
        phone: "600600600",
        email: "anna@example.com",
      },
      items: [
        { name: "Produkt B", quantity: 2 },
        { name: "Produkt C", quantity: 1 },
      ],
      weight: 2.3,
      dimensions: {
        length: 25,
        width: 20,
        height: 15,
      },
      value: 149.99,
      cod_amount: 149.99,
      created_at: new Date().toISOString(),
      status: "ready_to_ship",
    },
  ];

  console.log("Zwracam zamówienia:", orders.length);
  return NextResponse.json(orders, { headers: corsHeaders() });
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { order_id } = body;

    if (!order_id) {
      return NextResponse.json(
        { error: "order_id is required" },
        { status: 400 }
      );
    }

    const order = {
      id: order_id,
      name: `Zamówienie ${order_id}`,
      recipient: {
        name: "Jan Kowalski",
        street: "ul. Przykładowa 1",
        city: "Warszawa",
        postcode: "00-001",
        country: "PL",
        phone: "500500500",
        email: "jan@example.com",
      },
      items: [{ name: "Produkt A", quantity: 1 }],
      weight: 1.5,
      dimensions: {
        length: 20,
        width: 15,
        height: 10,
      },
      value: 99.99,
      cod_amount: 0,
      created_at: new Date().toISOString(),
      status: "pending",
    };

    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
