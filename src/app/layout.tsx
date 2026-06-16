import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/ui/cookie-banner";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mzta.ru"),
  title: "МЗТА Инжиниринг | Модернизация и сборка шкафов автоматики",
  description: "Модернизируем и собираем шкафы автоматики вентиляции для бизнес-центров в Москве — от обследования и схемы до ПНР, документации и интеграции в диспетчеризацию.",
  keywords: ["шкаф автоматики", "модернизация вентиляции", "сборка щитов управления", "ПНР вентиляции", "диспетчеризация", "BMS", "МЗТА"],
  openGraph: {
    title: "МЗТА Инжиниринг | Модернизация и сборка шкафов автоматики",
    description: "Комплексные решения для автоматизации вентиляции бизнес-центров в Москве.",
    url: "/",
    siteName: "МЗТА Инжиниринг",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "МЗТА Инжиниринг",
    description: "Модернизация и сборка шкафов автоматики вентиляции в Москве.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScrollProvider>
          <ModalProvider>
            {children}
            <CookieBanner />
          </ModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
