"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";

interface CertificatesModalProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const certificates = [
  {
    id: 1,
    title: "Сертификат ТР ТС на шкафы автоматизации",
    img: "/images/certificates/eng-sert-1.webp",
  },
  {
    id: 2,
    title: "Допуск СРО: Проектирование инженерных систем",
    img: "/images/certificates/eng-sert-2.webp",
  },
  {
    id: 3,
    title: "Свидетельство СРО: Проектная документация",
    img: "/images/certificates/eng-sert-3.webp",
  },
  {
    id: 4,
    title: "Допуск СРО: Монтаж инженерных систем",
    img: "/images/certificates/eng-sert-4.webp",
  },
  {
    id: 5,
    title: "Свидетельство СРО: Строительно-монтажные работы",
    img: "/images/certificates/eng-sert-5.webp",
  },
];

import { useModal } from "@/components/providers/modal-provider";

export function CertificatesModal({ children, open, onOpenChange }: CertificatesModalProps) {
  const { activeModal, openModal, closeModal } = useModal();
  
  const isOpen = open !== undefined ? open : activeModal === 'certificates';
  const handleOpenChange = onOpenChange !== undefined ? onOpenChange : (val: boolean) => {
    if (val) openModal('certificates');
    else closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-5xl sm:max-w-5xl lg:max-w-[80vw] xl:max-w-[1200px] w-[95vw] h-[calc(100vh-140px)] p-0 rounded-none border-border overflow-hidden flex flex-col bg-background">
        <DialogHeader className="px-8 py-6 border-b border-border/50 shrink-0 bg-background/95 backdrop-blur-sm z-10">
          <DialogTitle className="text-3xl font-display font-bold">Лицензии и сертификаты</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-8 bg-muted/10 custom-scrollbar" data-lenis-prevent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div 
                key={cert.id} 
                className="group cursor-pointer flex flex-col gap-4"
              >
                {/* Document wrapper */}
                <div className="relative aspect-[1/1.4] bg-white border border-border/50 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ backgroundImage: `url(${cert.img})` }}
                  />
                  {/* Subtle glass overlay for placeholder effect */}
                  <div className="absolute inset-0 border-[8px] border-white/10 mix-blend-overlay" />
                </div>
                
                {/* Title */}
                <h3 className="text-center font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {cert.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
