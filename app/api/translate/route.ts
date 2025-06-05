import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, from, to } = await request.json();

    const res = await fetch(
      `https://lingva.ml/api/v1/${from}/${to}/${encodeURIComponent(text)}`
    );

    if (!res.ok) throw new Error("Failed to translate");

    const data = await res.json();
    return NextResponse.json({ translation: data.translation });
  } catch (error) {
    console.error(`Translation error:`, error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
