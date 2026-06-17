"use client";

import { m } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { typograph } from "@/lib/utils";

// Removed unused icons from import since they aren't rendered in the UI anymore
// The original code had icons in the array but the slider didn't render them

const benefits = [
  {
    title: "Понятная логика управления",
    desc: "Режимы работы, аварийные сценарии, расписания и команды управления описаны и переданы эксплуатационной службе.",
  },
  {
    title: "Видимость статусов и аварий",
    desc: "При интеграции с диспетчеризацией эксплуатация видит состояние вентиляционной системы в едином интерфейсе здания.",
  },
  {
    title: "Меньше ручного контроля",
    desc: "Часть операций, которые раньше требовали ручной проверки или обхода, может быть переведена в автоматическое управление и мониторинг.",
  },
  {
    title: "Актуальная документация",
    desc: "После работ передаются схемы, спецификации, описание логики и другие материалы, необходимые для обслуживания.",
  },
  {
    title: "Проверка в реальных режимах",
    desc: "На этапе ПНР проверяются режимы работы, сигналы, аварии и взаимодействие шкафа с вентиляционным оборудованием.",
  },
  {
    title: "Возможность развития",
    desc: "Шкаф можно проектировать с учетом будущей диспетчеризации, замены компонентов или расширения системы.",
  }
];

export function BenefitsSlider() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <>
      <div className="relative h-[450px] w-full flex items-center justify-center perspective-[1000px] mb-8 overflow-hidden py-10 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
        {benefits.map((benefit, i) => {
          const N = benefits.length;
          const normalizedActive = ((activeIndex % N) + N) % N;
          let offset = i - normalizedActive;
          
          if (offset > N / 2) offset -= N;
          if (offset < -N / 2) offset += N;
          
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          
          if (absOffset > 2) return null;

          return (
              <m.div
                key={i}
                className="absolute w-[280px] sm:w-[320px] md:w-[380px] border border-white/60 bg-white/40 backdrop-blur-md cursor-pointer flex flex-col group overflow-hidden"
                style={{ 
                  height: '320px',
                  boxShadow: "10px 10px 30px rgba(48,99,122,0.05), -10px -10px 30px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)"
                }}
                animate={{
                  x: offset * (typeof window !== 'undefined' ? (window.innerWidth < 768 ? 80 : 180) : 180),
                  scale: 1 - absOffset * 0.15,
                  zIndex: 10 - absOffset,
                  opacity: isActive ? 1 : Math.max(0, 1 - absOffset * 0.4),
                  filter: `blur(${absOffset * 2}px)`,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveIndex(activeIndex + offset)}
              >
                <div className="absolute top-0 left-0 w-full h-16 px-8 flex items-center bg-[#182025]">
                  <div className="font-display font-bold text-2xl text-white">
                    0{i + 1}
                  </div>
                </div>

                <div className="pt-24 px-8 pb-8 flex flex-col flex-1 justify-center">
                  <h3 className="font-display font-medium text-xl mb-4 text-foreground">{typograph(benefit.title)}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{typograph(benefit.desc)}</p>
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
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full border-border h-12 w-12 hover:bg-muted transition-colors"
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 h-[2px] bg-border/50 relative overflow-hidden">
          <m.div 
            className="absolute top-0 left-0 h-full w-full bg-primary origin-left"
            initial={false}
            animate={{ scaleX: ((((activeIndex % benefits.length) + benefits.length) % benefits.length) + 1) / benefits.length }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      </div>
    </>
  );
}
