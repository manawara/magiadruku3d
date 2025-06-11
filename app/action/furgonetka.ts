// Definicja typu dla przewoźnika
interface Carrier {
  id: string;
  name: string;
  // dodaj inne pola zgodnie z API
}
export const fetchCarriers = async (): Promise<Carrier[]> => {
  const response = await fetch("/api/carriers");

  if (!response.ok) {
    throw new Error("Failed to fetch carriers");
  }

  return response.json();
};
