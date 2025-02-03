import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Public_Sans } from "next/font/google";
import { SupportedLocale } from "@/types";
import "../../app/globals.css";
import Header from "@/feature/header/Header";
import QueryProvider from "@/provider/QueryProvider";
import { ReactNode } from "react";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-public-sans",
});

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = params.locale as SupportedLocale;

  // Direct redirect if the locale is invalid
  if (!routing.locales.includes(locale)) {
    return redirect(`/${routing.defaultLocale}`);
  }

  // Fetch messages for the given locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${publicSans.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <Header />
            <main className="flex flex-col z-0 overflow-hidden px-4 max-md:mb-[66px]">
              {children}
            </main>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
