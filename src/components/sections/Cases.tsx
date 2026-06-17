"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import dynamic from "next/dynamic";

const CasesSlider = dynamic(() => import("./CasesSlider").then(mod => mod.CasesSlider), {
  ssr: false,
  loading: () => <div className="w-full min-h-[850px] lg:min-h-[750px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
});
import { typograph } from "@/lib/utils";

export function Cases() {
  const [activeAdv, setActiveAdv] = useState(0);

  const advantages = [
    { title: "Анализ задачи", desc: "Смотрим не только на компоненты, но и на состояние системы, документацию и требования." },
    { title: "Работа с объектами", desc: "Учитываем ограничения БЦ: арендаторов, окна работ и необходимость аккуратного запуска." },
    { title: "Полный цикл (ПНР)", desc: "Шкаф должен не просто быть собран, а стабильно работать в реальной системе." },
    { title: "Диспетчеризация", desc: "Предусматриваем передачу статусов и параметров в BMS." },
    { title: "Документация", desc: "Эксплуатация будет понимать, как устроено решение и как его обслуживать." }
  ];

  return (
    <div id="cases-wrapper" className="bg-background relative z-50">
      {/* Section 9: Cases */}
      <section id="cases" className="py-16 md:py-24 border-t border-border/50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <m.div 
            initial={{ opacity: 0, x: -60, rotateY: -60 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            style={{ transformOrigin: "left center", transformPerspective: 1200 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              {typograph("Примеры задач, ")}<span className="text-[#577E95]">{typograph("с которыми обращаются")}</span>
            </h2>
          </m.div>

          {/* Lazy Loaded Coverflow Slider for Cases */}
          <CasesSlider />
        </div>
      </section>

      {/* Section 10: Why MZTA */}
      <section className="py-24 bg-transparent border-t border-border/50 relative">

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <m.div
              initial={{ opacity: 0, x: -60, rotateY: -60 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              style={{ transformOrigin: "left center", transformPerspective: 1200 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                {typograph("Не просто собираем шкаф, а ")}<span className="text-[#577E95]">{typograph("решаем задачу")}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {typograph("Для бизнес-центра важен не только корпус с компонентами. Важно, чтобы шкаф был спроектирован под конкретную вентиляционную систему, корректно запрограммирован, проверен на объекте, понятен эксплуатации и связан с диспетчеризацией здания.")}
              </p>
            </m.div>

            <m.div 
              initial={{ opacity: 0, x: -60, rotateY: -60 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              style={{ transformOrigin: "left center", transformPerspective: 1200 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1], delay: 0.03 }}
              className="flex flex-col h-[650px] sm:h-[600px] md:h-[600px] gap-4"
            >
              {advantages.map((adv, i) => {
                const isActive = activeAdv === i;
                return (
                <m.div
                  key={i}
                  onClick={() => setActiveAdv(i)}
                  initial={false}
                  animate={{ flex: isActive ? 5 : 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative overflow-hidden cursor-pointer flex flex-col justify-center px-6 border border-white/60 backdrop-blur-md transition-all duration-500 group ${isActive ? 'bg-white/60' : 'bg-white/30 hover:bg-white/40'}`}
                  style={{
                    boxShadow: "10px 10px 30px rgba(48,99,122,0.05), -10px -10px 30px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)"
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <h4 className={`font-display font-medium text-lg md:text-xl transition-colors duration-500 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {typograph(adv.title)}
                    </h4>
                    <div className="opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 shrink-0 ml-4">
                      <ArrowDownRight 
                        className={`w-6 h-6 text-foreground transition-transform duration-500 ${isActive ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} 
                        strokeWidth={1} 
                      />
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-[200px] mt-4 opacity-100 delay-200' : 'max-h-0 mt-0 opacity-0'}`}>
                    <p className="text-muted-foreground leading-relaxed">{typograph(adv.desc)}</p>
                  </div>
                </m.div>
              )})}
            </m.div>
          </div>
        </div>
      </section>
    </div>
  );
}
