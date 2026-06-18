"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { typograph } from "@/lib/utils";

const cases = [
  {
    title: "Модернизация старого шкафа вентиляции в действующем БЦ",
    situation: "На объекте установлен шкаф автоматики вентиляции, документация частично устарела, эксплуатация сталкивается с нестабильной работой и сложностями диагностики.",
    action: "Обследуем шкаф, фиксируем состав оборудования, проверяем схему, определяем компоненты для замены, обновляем логику управления и готовим документацию.",
    result: "Понятную систему управления, актуализированные материалы и возможность дальнейшего обслуживания."
  },
  {
    title: "Сборка нового шкафа по проектной документации",
    situation: "Для реконструкции или fit-out офисного здания есть проект, но требуется подрядчик, который соберет шкаф, запрограммирует контроллер и выполнит ПНР.",
    action: "Проверяем проект, уточняем состав компонентов, собираем шкаф, выполняем программирование, тестирование и подготовку к запуску.",
    result: "Готовый шкаф под конкретную вентиляционную установку и согласованный комплект документации."
  },
  {
    title: "Подключение вентиляции к диспетчеризации",
    situation: "В здании есть BMS, но вентиляционная система не передает статусы, аварии и параметры в единый интерфейс эксплуатации.",
    action: "Анализируем существующую архитектуру, определяем доступные протоколы, готовим шкаф или контроллер к обмену данными, проверяем передачу сигналов.",
    result: "Видимость состояния вентиляционной системы в диспетчеризации здания."
  }
];

export function CasesSlider() {
  const [activeCase, setActiveCase] = useState(0);

  return (
    <>
      <div className="relative h-[750px] sm:h-[700px] md:h-[750px] lg:h-[750px] w-full flex items-start justify-center perspective-[1200px] mb-8 overflow-visible pt-10 pb-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
        {cases.map((c, i) => {
          const N = cases.length;
          const normalizedActive = ((activeCase % N) + N) % N;
          let offset = i - normalizedActive;
          
          if (offset > N / 2) offset -= N;
          if (offset < -N / 2) offset += N;
          
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          
          if (absOffset > 2) return null;

          return (
            <m.div
              key={i}
              style={{ transformOrigin: 'top center' }}
              className={`absolute w-[320px] sm:w-[450px] md:w-[600px] lg:w-[700px] h-max min-h-[500px] border border-white/60 cursor-pointer flex flex-col group overflow-hidden ${isActive ? 'bg-white/40 backdrop-blur-md shadow-2xl' : 'bg-white/20 backdrop-blur-md'}`}
              animate={{
                x: offset * (typeof window !== 'undefined' ? (window.innerWidth < 768 ? 90 : window.innerWidth < 1024 ? 200 : 300) : 300),
                scale: 1 - absOffset * 0.1,
                zIndex: 10 - absOffset,
                opacity: isActive ? 1 : Math.max(0.2, 1 - absOffset * 0.4),
                filter: `blur(${absOffset * 3}px)`,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveCase(activeCase + offset)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="absolute top-0 left-0 w-full h-12 md:h-16 px-5 md:px-8 flex items-center bg-[#182025] z-20 shrink-0">
                <div className="font-display font-bold text-lg md:text-2xl text-white">
                  0{i + 1}
                </div>
              </div>
              
              <div className="pt-16 px-5 pb-6 md:pt-16 md:px-10 md:pb-8 flex-1 flex flex-col relative z-10">
                <div className="flex-1">
                  <div className="mb-4 md:mb-6">
                    <h3 className="font-display font-medium text-xl md:text-3xl leading-tight text-foreground/90">{typograph(c.title)}</h3>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                      <div className="h-px w-6 bg-muted-foreground/30" />
                      <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">Ситуация</span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                      {typograph(c.situation)}
                    </p>
                  </div>

                  <div className="mb-4 md:mb-6 pl-4 md:pl-6 border-l border-primary/20">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                      <span className="font-display text-[10px] uppercase tracking-widest text-primary">Что делаем</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {typograph(c.action)}
                    </p>
                  </div>
                </div>

                <div className="mt-2 md:mt-6 bg-card py-4 px-5 md:py-5 md:px-6 border border-border/50 border-l-2 border-l-primary/40 shrink-0 shadow-sm flex flex-col justify-center">
                  <p className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Что получает эксплуатация</p>
                  <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">{typograph(c.result)}</p>
                </div>
              </div>
            </m.div>
          );
        })}
      </div>

      <div className="flex items-center gap-8 w-full">
        <div className="flex gap-2 shrink-0">
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full border-border h-12 w-12 hover:bg-muted transition-colors"
            onClick={() => setActiveCase(activeCase - 1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full border-border h-12 w-12 hover:bg-muted transition-colors"
            onClick={() => setActiveCase(activeCase + 1)}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 h-[2px] bg-border/50 relative overflow-hidden">
          <m.div 
            className="absolute top-0 left-0 h-full w-full bg-primary origin-left"
            initial={false}
            animate={{ scaleX: ((((activeCase % cases.length) + cases.length) % cases.length) + 1) / cases.length }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      </div>
    </>
  );
}
