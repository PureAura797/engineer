"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { m } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";

interface CasesModalProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const cases = [
  {
    id: 1,
    title: "Завод «Полиэф» (Холдинг СИБУР)",
    desc: "Комплексная автоматизация систем корпуса полимеризации. Управление 5 приточно-вытяжными системами и 20 кондиционерами. Установка локальных пультов управления и полная диспетчеризация инженерной инфраструктуры объекта.",
    img: "/images/cases/polief.webp",
    className: "md:col-span-2 md:row-span-2 min-h-[400px]",
  },
  {
    id: 2,
    title: "Завод «Тойота Моторс»",
    desc: "Реализация систем автоматизации инженерной инфраструктуры завода. Выполнен мониторинг расхода энергосистем, управление воздушным отоплением и вентиляцией. Установлены локальные пульты и внедрена комплексная диспетчеризация.",
    img: "/images/cases/toyota.webp",
    className: "md:col-span-1 md:row-span-1 min-h-[250px]",
  },
  {
    id: 3,
    title: "ЦКБ №1 ОАО «РЖД»",
    desc: "Автоматизация и диспетчеризация систем жизнеобеспечения 4 корпусов. Управление центральным тепловым пунктом, десятками вентиляционных систем (включая 131 установку в главном корпусе), холодильными машинами и дымоудалением.",
    img: "/images/cases/rzhd.webp",
    className: "md:col-span-1 md:row-span-1 min-h-[250px]",
  },
  {
    id: 4,
    title: "УКБ №1 Первого МГМУ им. Сеченова",
    desc: "Автоматизированное управление системами жизнеобеспечения клиники. Реализована строгая поддержка параметров микроклимата, экономичный расход электроэнергии и диспетчеризация вентиляции в реальном времени с возможностью удаленного управления.",
    img: "/images/cases/mgmu.webp",
    className: "md:col-span-2 md:row-span-1 min-h-[300px]",
  },
  {
    id: 5,
    title: "Музыкальная школа им. Л.Н. Оборина",
    desc: "Автоматизация и диспетчеризация систем жизнеобеспечения. Реализовано управление 27 приточно-вытяжными установками и системами подпора воздуха, а также противопожарной защитой на базе 44 огнезащитных клапанов.",
    img: "/images/cases/oborin.webp",
    className: "md:col-span-1 md:row-span-1 min-h-[300px]",
  },
  {
    id: 6,
    title: "БЦ «Кутузов Тауэр»",
    desc: "Комплексная диспетчеризация бизнес-центра. Интеграция индивидуального теплового пункта, водоснабжения, дренажа и сложной вентиляционной сети (включая 30 кондиционеров, ПВУ с рекуператором и 22 вытяжные системы).",
    img: "/images/cases/kutuzov.webp",
    className: "md:col-span-3 md:row-span-1 min-h-[350px] lg:min-h-[400px]",
  },
  {
    id: 7,
    title: "БЦ «Премьер»",
    desc: "Автоматизированное управление и диспетчерский мониторинг. Автоматизация отопления, вентиляции и насосных станций. Непрерывный контроль температур всех систем, электропитания, давления и аварийных ситуаций.",
    img: "/images/cases/premier.webp",
    className: "md:col-span-2 md:row-span-1 min-h-[300px]",
  },
  {
    id: 8,
    title: "Банк «Русский Стандарт»",
    desc: "Комплексная диспетчеризация объектов банка. Внедрено управление индивидуальным тепловым пунктом, водо- и электроснабжением, вентиляцией, пожарными насосами и климатическим оборудованием.",
    img: "/images/cases/rsb.webp",
    className: "md:col-span-1 md:row-span-1 min-h-[300px]",
  },
  {
    id: 9,
    title: "МВЦ «Казань Экспо»",
    desc: "Автоматизация инженерной инфраструктуры выставочного комплекса. Внедрено управление горячим водоснабжением, отоплением и общеобменной вентиляцией. Установлены локальные пульты и произведена комплексная диспетчеризация объектов.",
    img: "/images/cases/kazan_expo.webp",
    className: "md:col-span-3 md:row-span-1 min-h-[350px] lg:min-h-[400px]",
  },
];

import { useModal } from "@/components/providers/modal-provider";

export function CasesModal({ children, open, onOpenChange }: CasesModalProps) {
  const { activeModal, openModal, closeModal } = useModal();
  
  const isOpen = open !== undefined ? open : activeModal === 'cases';
  const handleOpenChange = onOpenChange !== undefined ? onOpenChange : (val: boolean) => {
    if (val) openModal('cases');
    else closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-6xl sm:max-w-6xl lg:max-w-[90vw] xl:max-w-[1400px] w-[95vw] h-[calc(100vh-140px)] p-0 rounded-none border-border overflow-hidden flex flex-col bg-background">
        <DialogHeader className="px-8 py-6 border-b border-border/50 shrink-0 bg-background/95 backdrop-blur-sm z-10">
          <DialogTitle className="text-3xl font-display font-bold">Выполненные проекты</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar" data-lenis-prevent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
            {cases.map((project) => (
              <div 
                key={project.id} 
                className={`relative group overflow-hidden border border-border/50 bg-muted/20 ${project.className}`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.img})` }}
                />
                
                {/* Overlay that darkens on hover */}
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/70" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-display font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {project.title}
                  </h3>
                  
                  {/* Hidden description that slides up and fades in */}
                  <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-white/80 mt-2 text-sm md:text-base leading-relaxed border-l-2 border-primary pl-4">
                        {project.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
