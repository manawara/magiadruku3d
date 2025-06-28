import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const carriers: { name: string; active: boolean }[] = await req.json();

    if (!Array.isArray(carriers)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    for (const carrier of carriers) {
      if (!carrier?.name || typeof carrier.active !== "boolean") {
        console.warn("Pominięto nieprawidłowego kuriera:", carrier);
        continue;
      }

      console.log("upserting carrier:", carrier);

      await db.carrier.upsert({
        where: { name: carrier.name },
        update: {
          active: carrier.active,
        },
        create: {
          name: carrier.name,
          active: carrier.active,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof Error) {
      console.error("Błąd aktualizacji kurierów:", e.message);
    } else {
      console.error("Błąd aktualizacji kurierów:", e ?? "Unknown error");
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
