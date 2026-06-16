"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Phone, MapPin, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { CasesModal } from "@/components/modals/CasesModal";
import { CertificatesModal } from "@/components/modals/CertificatesModal";
import { ContactsModal } from "@/components/modals/ContactsModal";
import { HeroTzModal } from "@/components/modals/HeroTzModal";
import { HeroConsultModal } from "@/components/modals/HeroConsultModal";
import { useModal } from "@/components/providers/modal-provider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { openModal } = useModal();

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
    <m.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 3.8 }}
      style={{ zIndex: 100 }}
      className={`fixed top-0 w-full transition-colors duration-300 ${
        modalOpen ? "bg-background border-b border-border/50 shadow-sm" :
        mobileMenuOpen ? "bg-background" :
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* Logo (Left) */}
        <Link href="/" className="flex items-center group relative z-50">
          <Image 
            src="/logo.webp" 
            alt="МЗТА" 
            width={120} 
            height={65} 
            priority
            className="grayscale brightness-0 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Nav & CTA (Right) */}
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => openModal('cases')} className="text-sm font-medium text-[#182025] hover:text-[#182025]/70 transition-colors relative group">
              Кейсы
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => openModal('certificates')} className="text-sm font-medium text-[#182025] hover:text-[#182025]/70 transition-colors relative group">
              Сертификаты
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <Button onClick={() => openModal('contacts')} variant="outline" className="rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors h-10 px-6">
              Контакты
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#182025] hover:bg-muted rounded-full transition-colors z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, rotateY: -90, scale: 0.95 },
              visible: { 
                opacity: 1,
                rotateY: 0,
                scale: 1,
                transition: { 
                  duration: 0.45, 
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.1, 
                  delayChildren: 0.15
                }
              },
              exit: {
                opacity: 0,
                rotateY: -90,
                scale: 0.95,
                transition: { 
                  duration: 0.35, 
                  ease: [0.7, 0, 0.84, 0],
                  staggerChildren: 0.05, 
                  staggerDirection: -1, 
                  when: "afterChildren" 
                }
              }
            }}
            style={{ transformOrigin: "0% 50%", perspective: "1500px" }}
            className="fixed inset-0 w-full h-[100dvh] bg-background md:hidden flex flex-col items-center justify-center gap-8 z-40"
          >
            <m.button 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                exit: { opacity: 0, x: -30, transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] } }
              }}
              onClick={() => {
                openModal('cases');
                setMobileMenuOpen(false);
              }} 
              className="text-3xl font-display font-medium text-[#182025] hover:text-[#182025]/70 transition-colors relative group"
            >
              Кейсы
            </m.button>
            <m.button 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                exit: { opacity: 0, x: -30, transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] } }
              }}
              onClick={() => {
                openModal('certificates');
                setMobileMenuOpen(false);
              }} 
              className="text-3xl font-display font-medium text-[#182025] hover:text-[#182025]/70 transition-colors relative group"
            >
              Сертификаты
            </m.button>
            
            <m.div 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                exit: { opacity: 0, x: -30, transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] } }
              }}
              className="mt-6"
            >
              <Button 
                variant="outline" 
                className="rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors h-14 px-10 text-lg font-medium" 
                onClick={() => {
                  openModal('contacts');
                  setMobileMenuOpen(false);
                }}
              >
                Контакты
              </Button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Controlled Modals */}
      <CasesModal />
      <CertificatesModal />
      <ContactsModal />
      <HeroTzModal />
      <HeroConsultModal />
    </m.header>
  );
}
