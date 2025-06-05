import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Public_Sans } from "next/font/google";
import { SupportedLocale } from "@/types";
import "../../app/globals.css";
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
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as SupportedLocale)) {
    return redirect(`/${routing.defaultLocale}`);
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`${publicSans.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <main className="flex flex-col z-0 overflow-hidden max-md:mb-[66px]">
              {children}
            </main>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
