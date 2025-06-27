type ApiCarrier = {
  carrierName: string;
};

type FetchCarriersResponse = {
  carriers: ApiCarrier[];
};
export const fetchCarriers = async (): Promise<FetchCarriersResponse> => {
  const response = await fetch("/api/globalkurier/carriers");

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch carriers");
  }

  return response.json();
};
