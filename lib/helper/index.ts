import { country as countries } from "../data/country";
import { locales } from "@/lib/locales"; // ['pl', 'en', 'de']

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

export const parseField = (item: string, lang: string) => {
  if (typeof item === "object" && item !== null) {
    return item[lang] || ""; // Return empty string as fallback if language key doesn't exist
  }
  return item; // Return the item itself if it's not an object
};

export const parseImage = (image: string | string[]) => {
  console.log(typeof image);
  if (typeof image === "object" && image !== null) {
    return JSON.parse(image[0]);
  }
  return JSON.parse(image);
};

export const formatLanguages = (mainCategory: string[]) => {
  const result: Record<string, string[]> = {};

  locales.forEach((locale) => {
    result[locale] = [...mainCategory];
  });

  return result;
};
export async function translateHTMLPreserveTags(
  html: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const container = document.createElement("div");
  container.innerHTML = html;

  async function walk(node: Node): Promise<void> {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        const translated = await handleTranslate(text, sourceLang, targetLang);
        node.textContent = translated;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (const child of Array.from(node.childNodes)) {
        await walk(child);
      }
    }
  }

  for (const child of Array.from(container.childNodes)) {
    await walk(child);
  }

  return container.innerHTML;
}

export async function handleTranslate(
  text: string,
  from: string,
  to: string
): Promise<string> {
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, from, to }),
    });

    if (!res.ok) throw new Error("Failed to translate");

    const data = await res.json();
    return data.translation;
  } catch (error) {
    console.error(`Translation error (${from} to ${to}):`, error);
    return text;
  }
}

export async function convertTargetLang(
  data: Record<string, any>,
  sourceLang: string
): Promise<Record<string, Record<string, any>>> {
  // Get all target languages (excluding the source language)
  const targets = locales.filter((lang) => lang !== sourceLang);

  const result: Record<string, Record<string, any>> = {};

  // Process each field in the data object
  for (const fieldKey of Object.keys(data)) {
    const fieldValue = data[fieldKey];

    // Skip empty values or non-translatable fields
    if (
      !fieldValue ||
      fieldValue === "" ||
      fieldKey === "images" ||
      typeof fieldValue === "number" ||
      (typeof fieldValue === "string" && fieldValue.includes("placeholder"))
    ) {
      continue;
    }

    // Handle string values
    if (typeof fieldValue === "string") {
      // Initialize with source language value
      result[fieldKey] = { [sourceLang]: fieldValue };

      // Translate to all target languages
      for (const lang of targets) {
        try {
          let translated;
          if (fieldKey === "description") {
            translated = await translateHTMLPreserveTags(
              fieldValue,
              sourceLang,
              lang
            );
          } else {
            translated = await handleTranslate(fieldValue, sourceLang, lang);
          }
          result[fieldKey][lang] = translated;
        } catch (error) {
          console.error(`Error translating ${fieldKey} to ${lang}:`, error);
          // Use original value as fallback
          result[fieldKey][lang] = fieldValue;
        }
      }
    }

    // Handle array values (like categoryChildName)
    else if (Array.isArray(fieldValue) && fieldValue.length > 0) {
      // Initialize with source language array
      result[fieldKey] = { [sourceLang]: fieldValue };

      // Translate each item in the array for all target languages
      for (const lang of targets) {
        try {
          const translatedArray = await Promise.all(
            fieldValue.map(async (item) => {
              if (typeof item === "string") {
                return await handleTranslate(item, sourceLang, lang);
              }
              return item;
            })
          );
          result[fieldKey][lang] = translatedArray;
        } catch (error) {
          console.error(
            `Error translating array ${fieldKey} to ${lang}:`,
            error
          );
          // Use original array as fallback
          result[fieldKey][lang] = fieldValue;
        }
      }
    }
  }

  return result;
}

export const getLocalizedValue = (value: any, locale: string): string => {
  if (value && typeof value === "object" && locale in value) {
    return value[locale];
  } else if (value && typeof value === "object" && "pl" in value) {
    return value["pl"];
  }
  return value; // jeśli nie jest obiektem, zwróć jak jest
};

export const localizedData = (
  product: any,
  locale: string
): Record<string, any> =>
  Object.entries(product).reduce((acc, [key, value]) => {
    acc[key] = getLocalizedValue(value, locale);
    return acc;
  }, {} as Record<string, any>);
