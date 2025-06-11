// Definicja typu dla przewoźnika
interface Carrier {
  id: string;
  name: string;
  // dodaj inne pola zgodnie z API
}

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://magiadruku3d.vercel.app"
    : "https://magiadruku3d.vercel.app"; // lokal;

export const fetchCarriers = async (): Promise<Carrier[]> => {
  const response = await fetch(`${API_BASE_URL}/api/carriers`);

  if (!response.ok) {
    throw new Error("Failed to fetch carriers");
  }

  return response.json();
};
