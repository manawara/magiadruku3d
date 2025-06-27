export const updateCarriers = async (
  data: { name: string; active: boolean }[]
) => {
  const res = await fetch("/api/carriers/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Błąd podczas aktualizacji kurierów");
  }

  return res.json();
};

export const getCarriers = async () => {
  const res = await fetch("/api/carriers", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Błąd podczas pobierania kurierów");
  }

  return res.json();
};
