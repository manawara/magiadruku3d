import { NextRequest, NextResponse } from "next/server";

const AUTH_TOKEN = process.env.FURGONETKA_API_TOKEN; // ustaw w .env

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Przykładowe dane zamówień
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
    },
  ];

  return NextResponse.json(orders);
}
