// app/api/carriers/route.ts

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.FURGONETKA_API_URL}/v2/account/services`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FURGONETKA_API_KEY}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching carriers:", error);
    return Response.json(
      { error: "Failed to fetch carriers" },
      { status: 500 }
    );
  }
}
