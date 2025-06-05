// app/api/furgonetka/orders/route.ts

import { NextRequest } from "next/server";

const AUTH_TOKEN = process.env.FURGONETKA_INTEGRATION_TOKEN;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Przykładowe dane zamówienia – powinny pochodzić z Twojej bazy danych
  const orders = [
    {
      external_order_id: "order-001",
      delivery: {
        address: {
          street: "ul. Przykładowa 12",
          city: "Warszawa",
          post_code: "00-001",
          country: "PL",
        },
        person: {
          first_name: "Jan",
          last_name: "Kowalski",
          email: "jan@kowalski.pl",
          phone: "123456789",
        },
      },
      parcels: [
        {
          weight: 1.2, // w kg
          length: 30, // w cm
          width: 20,
          height: 10,
        },
      ],
      items: [
        {
          name: "Figurka 3D",
          quantity: 1,
        },
      ],
      cod_amount: 0, // pobranie
    },
  ];

  return Response.json(orders);
}
