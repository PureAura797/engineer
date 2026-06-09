"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, ArrowLeft, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cases() {
  const [activeCase, setActiveCase] = useState(0);
  const [activeAdv, setActiveAdv] = useState(0);

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
      <section id="cases" className="py-24 border-t border-border/50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Примеры задач, <span className="text-muted-foreground">с которыми обращаются</span>
            </h2>
          </motion.div>

          {/* Coverflow Slider for Cases */}
          <div className="relative h-[850px] md:h-[750px] lg:h-[700px] w-full flex items-center justify-center perspective-[1200px] mb-12 overflow-hidden py-10 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">

            {cases.map((c, i) => {
              const N = cases.length;
              const normalizedActive = ((activeCase % N) + N) % N;
              let offset = i - normalizedActive;
              
              if (offset > N / 2) offset -= N;
              if (offset < -N / 2) offset += N;
              
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;
              
              // Only render items close to active
              if (absOffset > 2) return null;

              return (
                <motion.div
                  key={i}
                  className="absolute w-[320px] sm:w-[450px] md:w-[600px] lg:w-[700px] border border-white/60 bg-white/40 backdrop-blur-md cursor-pointer flex flex-col group overflow-hidden"
                  style={{ 
                    height: 'max-content', 
                    minHeight: '600px',
                    boxShadow: "10px 10px 30px rgba(48,99,122,0.05), -10px -10px 30px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)"
                  }}
                  animate={{
                    x: offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : window.innerWidth < 1024 ? 200 : 300),
                    scale: 1 - absOffset * 0.1,
                    zIndex: 10 - absOffset,
                    opacity: isActive ? 1 : Math.max(0.3, 1 - absOffset * 0.5),
                    filter: `blur(${absOffset * 3}px)`,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveCase(activeCase + offset)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10">
                    <div className="flex-1">
                      {/* Title */}
                      <div className="mb-8">
                        <div className={`w-12 h-12 flex items-center justify-center border border-border/50 mb-6 transition-colors duration-500 ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          0{i + 1}
                        </div>
                        <h3 className="font-display font-medium text-2xl md:text-3xl leading-tight text-foreground/90">{c.title}</h3>
                      </div>

                      {/* Situation */}
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-px w-6 bg-muted-foreground/30" />
                          <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">Ситуация</span>
                        </div>
                        <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                          {c.situation}
                        </p>
                      </div>

                      {/* Action */}
                      <div className="mb-8 pl-6 border-l border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-display text-[10px] uppercase tracking-widest text-primary">Что делаем</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                          {c.action}
                        </p>
                      </div>
                    </div>

                    {/* Result */}
                    <div className="mt-8 bg-card p-5 md:p-6 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Что получает эксплуатация</p>
                        <p className="text-sm font-medium text-foreground">{c.result}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-8 w-full">
            <div className="flex-1 h-[2px] bg-border/50 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary"
                initial={false}
                animate={{ width: `${((((activeCase % cases.length) + cases.length) % cases.length) + 1) / cases.length * 100}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-none border-border h-12 w-12 hover:bg-muted transition-colors"
                onClick={() => setActiveCase(activeCase - 1)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-none border-border h-12 w-12 hover:bg-muted transition-colors"
                onClick={() => setActiveCase(activeCase + 1)}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Why MZTA */}
      <section className="py-24 bg-transparent border-t border-border/50 relative">

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Не просто собираем шкаф, а <span className="text-muted-foreground">решаем задачу</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Для бизнес-центра важен не только корпус с компонентами. Важно, чтобы шкаф 
                был спроектирован под конкретную вентиляционную систему, корректно запрограммирован, 
                проверен на объекте, понятен эксплуатации и связан с диспетчеризацией здания.
              </p>
            </motion.div>

            <div className="flex flex-col h-[500px] md:h-[600px] gap-4">
              {advantages.map((adv, i) => {
                const isActive = activeAdv === i;
                return (
                <motion.div
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
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 flex items-center justify-center shrink-0 border transition-all duration-500 ${isActive ? 'bg-card text-foreground scale-110 shadow-sm' : 'bg-transparent text-muted-foreground border-border/50 group-hover:scale-105'}`}>
                      <span className="font-display font-bold">{i + 1}</span>
                    </div>
                    <h4 className={`font-display font-medium text-lg md:text-xl transition-colors duration-500 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {adv.title}
                    </h4>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-[200px] mt-4 opacity-100 delay-200' : 'max-h-0 mt-0 opacity-0'}`}>
                    <p className="text-muted-foreground leading-relaxed pl-[72px]">{adv.desc}</p>
                  </div>
                  
                  <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowDownRight 
                      className={`w-6 h-6 text-foreground transition-transform duration-500 ${isActive ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} 
                      strokeWidth={1} 
                    />
                  </div>
                </motion.div>
              )})}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
