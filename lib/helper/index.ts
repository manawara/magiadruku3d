import { country as countries } from "../data/country";

export const findIndexCountry = (country: string) => {
  const id = countries.findIndex(
    (item) =>
      item.short.toLowerCase() === country || item.tag.toLowerCase() === country
  );
  return id;
};
