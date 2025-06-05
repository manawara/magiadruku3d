// app/actions/translateField.ts (Next.js z "use server")
"use server";

export async function translateField(
  text: string,
  from: string = "pl",
  to: string = "en"
) {
  const encodedText = encodeURIComponent(text);
  const url = `https://lingva.ml/api/v1/${from}/${to}/${encodedText}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.translation;
  } catch (e) {
    console.error("Translation error:", e);
    return "";
  }
}
