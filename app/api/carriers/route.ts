// app/api/carriers/route.ts
import { NextResponse } from "next/server";

const clientId = process.env.FURGONETKA_CLIENT_ID!;
const clientSecret = process.env.FURGONETKA_CLIENT_SECRET!;
const apiUrl =
  process.env.FURGONETKA_API_URL! || "https://api.sandbox.furgonetka.pl";

async function getAccessToken() {
  const res = await fetch(`${apiUrl}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    throw new Error("Nie udało się pobrać tokena");
  }

  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const res = await fetch(`${apiUrl}/v2/account/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching carriers:", error);
    return NextResponse.json(
      { error: "Failed to fetch carriers" },
      { status: 500 }
    );
  }
}
