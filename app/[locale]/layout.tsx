import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Public_Sans } from "next/font/google";
import { SupportedLocale } from "@/types";
import "../../app/globals.css";
import Header from "@/feature/header/Header";
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-public-sans",
});

async function validateLocale(locale: string) {
  if (!routing.locales.includes(locale as SupportedLocale)) {
    notFound();
  }
  return locale;
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params object first
  const params = await props.params;

  const [validatedLocale, messages] = await Promise.all([
    validateLocale(params.locale),
    getMessages(),
  ]);

  return (
    <html lang={validatedLocale}>
      <body className={`${publicSans.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex flex-col">{props.children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
