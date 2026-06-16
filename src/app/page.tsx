import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const Problems = dynamic(() => import("@/components/sections/Problems").then(mod => mod.Problems));
const Scenarios = dynamic(() => import("@/components/sections/Scenarios").then(mod => mod.Scenarios));
const Benefits = dynamic(() => import("@/components/sections/Benefits").then(mod => mod.Benefits));
const Details = dynamic(() => import("@/components/sections/Details").then(mod => mod.Details));
const Cases = dynamic(() => import("@/components/sections/Cases").then(mod => mod.Cases));
const Final = dynamic(() => import("@/components/sections/Final").then(mod => mod.Final));
import { GlobalBackground } from "@/components/GlobalBackground";
import { PrivacyModal } from "@/components/ui/privacy-modal";
import { Preloader } from "@/components/layout/Preloader";
import { FloatingNav } from "@/components/layout/FloatingNav";
import Script from "next/script";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "МЗТА Инжиниринг",
    "image": "https://mzta.ru/logo.webp",
    "description": "Модернизация и сборка шкафов автоматики вентиляции для бизнес-центров в Москве.",
    "telephone": "+7 925 850 46 02",
    "email": "gerasimov@mzta.ru",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Москва",
      "addressCountry": "RU"
    },
    "url": "https://mzta.ru"
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Preloader />
      <FloatingNav />
      <Header />
      <Hero />
      <div className="relative z-20 bg-background border-t border-border/50">
        <GlobalBackground />
        <div className="-mt-[100dvh] relative z-10">
          <Problems />
          <Scenarios />
          <Benefits />
          <Details />
          <Cases />
          <Final />
        </div>
      </div>
      
      {/* Footer minimal */}
      <footer className="py-8 border-t border-border/50 bg-background relative z-40">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Инжиниринг МЗТА. Все права защищены.
          </p>
          <PrivacyModal>
            <button 
              type="button" 
              className="text-muted-foreground text-sm hover:text-foreground transition-colors underline underline-offset-4"
            >
              Политика конфиденциальности
            </button>
          </PrivacyModal>
        </div>
      </footer>
    </main>
  );
}
