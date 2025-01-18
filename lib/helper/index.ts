import { country as countries } from "../data/country";

export const findIndexCountry = (country: string) => {
  const id = countries.findIndex(
    (item) =>
      item.short.toLowerCase() === country || item.tag.toLowerCase() === country
  );
  return id;
};

export const slugify = (text: string) => {
  const polishChars: { [key: string]: string } = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
  };
  let formattedText = text.toLowerCase();
  for (const char in polishChars) {
    formattedText = formattedText.replaceAll(char, polishChars[char]);
  }
  formattedText = formattedText.replaceAll(" ", "-");
  return formattedText;
};
