"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

import { CasesModal } from "@/components/modals/CasesModal";
import { CertificatesModal } from "@/components/modals/CertificatesModal";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { rootMargin: "-50px 0px 0px 0px" }
    );
    
    let topEl = document.getElementById("header-scroll-detector");
    if (!topEl) {
      topEl = document.createElement("div");
      topEl.id = "header-scroll-detector";
      topEl.style.position = "absolute";
      topEl.style.top = "0";
      topEl.style.height = "1px";
      topEl.style.width = "1px";
      topEl.style.visibility = "hidden";
      document.body.prepend(topEl);
    }
    observer.observe(topEl);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkModal = () => {
      setModalOpen(document.body.hasAttribute("data-scroll-locked"));
    };
    checkModal();
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 3.8 }}
      style={{ zIndex: 100 }}
      className={`fixed top-0 w-full transition-colors duration-300 ${
        modalOpen ? "bg-background border-b border-border/50 shadow-sm" :
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* Logo (Left) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-foreground flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-4 h-4 bg-background" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">МЗТА</span>
        </Link>
        
        {/* Nav & CTA (Right) */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <CasesModal>
              <button className="text-sm font-medium text-[#182025] hover:text-[#182025]/70 transition-colors relative group">
                Кейсы
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
              </button>
            </CasesModal>
            <CertificatesModal>
              <button className="text-sm font-medium text-[#182025] hover:text-[#182025]/70 transition-colors relative group">
                Сертификаты
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
              </button>
            </CertificatesModal>
          </nav>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors h-10 px-6">
                Контакты
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-none border-border p-0 overflow-hidden">
              <div className="p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl font-display font-bold">Свяжитесь с нами</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <a href="tel:+74951234567" className="flex items-start gap-4 p-4 border border-border hover:bg-muted/50 transition-colors group">
                    <div className="w-10 h-10 bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">По телефону</div>
                      <div className="text-lg font-medium">+7 (495) 123-45-67</div>
                    </div>
                  </a>
                  
                  <a href="mailto:info@mzta.ru" className="flex items-start gap-4 p-4 border border-border hover:bg-muted/50 transition-colors group">
                    <div className="w-10 h-10 bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">По почте</div>
                      <div className="text-lg font-medium">info@mzta.ru</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 border border-border">
                    <div className="w-10 h-10 bg-muted flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Офис</div>
                      <div className="text-base font-medium">г. Москва, ул. Примерная, 12</div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
      </div>
    </motion.header>
  );
}
