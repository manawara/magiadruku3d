"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getCarriers, updateCarriers } from "@/app/action/carrier";
import { fetchCarriers } from "@/app/action/globkurier";

import Button from "@/backend/components/button/Button";
import Card from "@/backend/components/card/Card";
import Divider from "@/backend/components/divider/Divider";
import SpinLoader from "@/backend/components/loading/components/spin/Spin";
import Carrier from "@/backend/feature/carrier/components/Carrier";
import FormHeading from "@/backend/feature/form/components/form-heading/FormHeading";
import { Notyfi } from "@/backend/feature/notyfi/components/Notyfi/Notyfi";

// Typ odpowiedzi z API
type FetchCarriersResponse = {
  carriers: {
    carrierName: string;
    logo?: string;
  }[];
};

type CarrierItem = {
  name: string;
  logo?: string;
  active: boolean;
};

const CarriersPage = () => {
  const queryClient = useQueryClient();

  const [shouldFetch, setShouldFetch] = useState(false);
  const [selectedCarriers, setSelectedCarriers] = useState<CarrierItem[]>([]);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  const {
    data: fetchedCarriers,
    isSuccess,
    isError,
    isFetched,
  } = useQuery<FetchCarriersResponse, Error>({
    queryKey: ["carriers"],
    queryFn: fetchCarriers,
    enabled: shouldFetch,
  });

  const { data: dbCarriers, isLoading: isLoadingDbCarriers } = useQuery({
    queryKey: ["carriersDataBase"],
    queryFn: getCarriers,
  });

  const saveMutation = useMutation({
    mutationFn: async (carriers: CarrierItem[]) => {
      await updateCarriers(
        carriers.map(({ name, active }) => ({ name, active }))
      );
    },
    onMutate: () => {
      setSaveStatus("pending");
    },
    onSuccess: () => {
      setSaveStatus("success");
      queryClient.invalidateQueries({ queryKey: ["carriersDataBase"] });
    },
    onError: () => {
      setSaveStatus("error");
    },
  });

  const carriersMapped: CarrierItem[] = useMemo(() => {
    return (
      fetchedCarriers?.carriers.map((carrier: any) => ({
        name: carrier.carrierName,
        logo: carrier.logo || undefined,
        active: false,
      })) ?? []
    );
  }, [fetchedCarriers]);

  const handleFetchCarriers = useCallback(() => {
    setShouldFetch(true);
    setFetchStatus("pending");
  }, []);
  useEffect(() => {
    if (!shouldFetch) return;

    if (isError) {
      setFetchStatus("error");
      setShouldFetch(false);
    } else if (isSuccess) {
      setFetchStatus("success");
      setShouldFetch(false);
    } else if (isFetched) {
      // opcjonalnie, fallback
      setFetchStatus("idle");
      setShouldFetch(false);
    }
  }, [shouldFetch, isError, isSuccess, isFetched]);

  useEffect(() => {
    const compareAndUpdate = async () => {
      if (!shouldFetch || !fetchedCarriers || !dbCarriers) return;

      const carriersFromApi = carriersMapped;
      const dbCarrierNames = dbCarriers.map((c: { name: string }) => c.name);

      const hasDifference =
        carriersFromApi.length !== dbCarrierNames.length ||
        carriersFromApi.some((c) => !dbCarrierNames.includes(c.name));

      if (hasDifference) {
        try {
          await updateCarriers(carriersFromApi);
          setFetchStatus("success");
          setSelectedCarriers(carriersFromApi);
          queryClient.invalidateQueries({ queryKey: ["carriersDataBase"] });
        } catch (e) {
          console.error(e);
          setFetchStatus("error");
        }
      } else {
        setFetchStatus("success");
        setSelectedCarriers(dbCarriers);
      }

      setShouldFetch(false);
    };

    compareAndUpdate();
  }, [shouldFetch, fetchedCarriers, dbCarriers, carriersMapped, queryClient]);

  useEffect(() => {
    if (dbCarriers && !shouldFetch) {
      const carriers = dbCarriers.map(
        ({ name, active, logo }: CarrierItem) => ({
          name,
          active,
          logo,
        })
      );
      setSelectedCarriers(carriers);
    }
  }, [dbCarriers, shouldFetch]);

  const toggleCarrier = (name: string) => {
    setSelectedCarriers((prev) => {
      const found = prev.find((carrier) => carrier.name === name);
      if (found) {
        return prev.map((carrier) =>
          carrier.name === name
            ? { ...carrier, active: !carrier.active }
            : carrier
        );
      } else {
        return [...prev, { name, active: true }];
      }
    });
  };

  const handleClear = () => {
    setSelectedCarriers((prev) => prev.map((c) => ({ ...c, active: false })));
  };

  const handleSave = () => {
    saveMutation.mutate(selectedCarriers);
  };

  return (
    <div>
      <Card>
        <FormHeading title="Moduł kurierzy" />

        <header className="p-4 relative">
          <Button
            colorFill="primary"
            variant="basic"
            className="normal-case"
            type="button"
            onClick={handleFetchCarriers}
            disabled={fetchStatus === "pending"}
          >
            Pobierz listę kurierów z API
          </Button>
        </header>

        <main className="relative top-0 left-0 px-4">
          <h2 className="pb-4 px-6 font-semibold text-sm">
            Wybierz kurierów do wysyłki
          </h2>

          <Divider
            color="bg-grayBackned-700"
            position="horizontal"
            className="absolute left-0"
          />

          {isLoadingDbCarriers && (
            <div className="flex justify-center w-full">
              <SpinLoader />
            </div>
          )}

          <div className="grid grid-cols-4 gap-3">
            {dbCarriers &&
              dbCarriers.map((carrier: CarrierItem) => {
                const isActive =
                  selectedCarriers.find((c) => c.name === carrier.name)
                    ?.active ?? false;
                const imagePath =
                  carrier.logo || `/carriers/${carrier.name}.png`;

                return (
                  <Carrier
                    key={carrier.name}
                    name={carrier.name}
                    image={imagePath}
                    isActive={isActive}
                    onToogle={toggleCarrier}
                  />
                );
              })}
          </div>
          {dbCarriers && dbCarriers.length === 0 && (
            <div className="flex justify-center py-8">Brak danych w bazie</div>
          )}
          {dbCarriers && dbCarriers.length > 0 && (
            <div className="flex gap-2 my-3">
              <Button
                colorFill="primary"
                variant="basic"
                onClick={handleSave}
                disabled={saveStatus === "pending"}
              >
                Zapisz
              </Button>
              <Button colorFill="primary" variant="basic" onClick={handleClear}>
                Wyczyść
              </Button>
            </div>
          )}
        </main>
      </Card>

      <Notyfi
        pendingMessage={
          fetchStatus === "pending"
            ? "Trwa pobieranie kurierów z API..."
            : "Zapisywanie aktywnych kurierów..."
        }
        successMessage={
          fetchStatus === "success"
            ? "Pobrano kurierów z API."
            : "Zapisano kurierów do bazy danych!"
        }
        hasError={fetchStatus === "error" || saveStatus === "error"}
        isSubmitSuccessful={
          fetchStatus === "success" || saveStatus === "success"
        }
        isSubmitting={fetchStatus === "pending" || saveStatus === "pending"}
      />
    </div>
  );
};

export default CarriersPage;
