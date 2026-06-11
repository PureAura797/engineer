"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";

interface CasesModalProps {
  children: ReactNode;
}

const cases = [
  {
    id: 1,
    title: "Бизнес-центр класса А",
    desc: "Полная модернизация 12 шкафов управления приточно-вытяжной вентиляцией без остановки арендаторов. Переход на современные отечественные ПЛК с сохранением прежней кабельной трассы. Бесшовная интеграция с существующей BMS здания по протоколу BACnet/IP.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    className: "md:col-span-2 md:row-span-2 min-h-[400px]",
  },
  {
    id: 2,
    title: "Логистический хаб",
    desc: "Сборка щитов автоматики для 15 приточных установок. Разработка пользовательского SCADA-интерфейса для дежурного инженера.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    className: "md:col-span-1 md:row-span-1 min-h-[250px]",
  },
  {
    id: 3,
    title: "ТРЦ «Галактика»",
    desc: "Замена сгоревших контроллеров на чиллерах и градирнях. Оперативное восстановление алгоритмов работы холодильного центра в разгар летнего сезона.",
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    className: "md:col-span-1 md:row-span-1 min-h-[250px]",
  },
  {
    id: 4,
    title: "Завод фармпрепаратов",
    desc: "Проектирование и ПНР прецизионной системы климат-контроля для чистых помещений (ISO 7). Поддержание влажности с точностью до 1% и температуры до 0.5°C.",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
    className: "md:col-span-2 md:row-span-1 min-h-[300px]",
  },
];

export function CasesModal({ children }: CasesModalProps) {
  return (
    <Dialog>
      <DialogTrigger render={children as any} />
      <DialogContent className="max-w-6xl sm:max-w-6xl lg:max-w-[90vw] xl:max-w-[1400px] w-[95vw] h-[calc(100vh-140px)] p-0 rounded-none border-border overflow-hidden flex flex-col bg-background">
        <DialogHeader className="px-8 py-6 border-b border-border/50 shrink-0 bg-background/95 backdrop-blur-sm z-10">
          <DialogTitle className="text-3xl font-display font-bold">Выполненные проекты</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
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
