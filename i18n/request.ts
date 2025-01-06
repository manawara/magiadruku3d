import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { SupportedLocale } from "@/types";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as SupportedLocale)) {
    locale = routing.defaultLocale;
  }
  console.log(locale);
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
