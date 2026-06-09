import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { Scenarios } from "@/components/sections/Scenarios";
import { Benefits } from "@/components/sections/Benefits";
import { Details } from "@/components/sections/Details";
import { Cases } from "@/components/sections/Cases";
import { Final } from "@/components/sections/Final";
import { GlobalBackground } from "@/components/GlobalBackground";
import { PrivacyModal } from "@/components/ui/privacy-modal";
import { Preloader } from "@/components/layout/Preloader";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Preloader />
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
            <button type="button" className="text-muted-foreground text-sm hover:text-foreground transition-colors underline underline-offset-4">
              Политика конфиденциальности
            </button>
          </PrivacyModal>
        </div>
      </footer>
    </main>
  );
}
