"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { typograph } from "@/lib/utils";
import { Upload, ArrowRight } from "lucide-react";
import { PrivacyModal } from "@/components/ui/privacy-modal";

import { FocusScrollBlock } from "@/components/ui/focus-scroll-block";

export function Final() {
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");

  const faqs = [
    { q: "Можно ли начать, если у нас нет полного ТЗ?", a: "Да. Можно начать с фото шкафа, схемы, спецификации, описания вентиляционной установки или проблемы. Инженер подскажет, каких данных не хватает для предварительной оценки." },
    { q: "Можно ли модернизировать старый шкаф, а не менять его полностью?", a: "Да, если состояние оборудования и архитектура системы позволяют это сделать. Сначала анализируем текущий шкаф и документацию, после чего предлагаем частичную модернизацию, замену отдельных компонентов или сборку нового шкафа." },
    { q: "Можно ли подключить шкаф к существующей BMS?", a: "Да, если текущая система и оборудование поддерживают необходимые интерфейсы обмена. Возможность интеграции определяется после анализа BMS, контроллеров, протоколов и перечня требуемых сигналов." },
    { q: "Можно ли выполнить работы без остановки вентиляции?", a: "Это зависит от состояния системы и состава работ. На действующих объектах заранее согласуются этапы, окна работ и порядок проверки. Возможность работы без длительной остановки определяется после обследования." },
    { q: "Что нужно прислать для расчета?", a: "Желательно прислать ТЗ, схему, спецификацию, перечень оборудования, фото текущего шкафа, требования к режимам работы и информацию о необходимости интеграции с диспетчеризацией." },
    { q: "От чего зависит стоимость?", a: "От количества сигналов, состава компонентов, типа контроллера, необходимости панели оператора, программирования, ПНР, интеграции с BMS, монтажных работ и комплекта документации." },
    { q: "Вы делаете только сборку шкафа или полный цикл?", a: "Состав работ зависит от проекта. Возможны обследование, проектирование, сборка, программирование, тестирование, монтаж, ПНР, документация и интеграция с диспетчеризацией." },
    { q: "Какие документы передаются после работ?", a: "Комплект документов зависит от состава проекта. Обычно это схемы, спецификация, описание логики работы, перечень сигналов, паспорт шкафа и материалы для эксплуатации." }
  ];

  return (
    <div id="final-wrapper" className="bg-card relative z-40">
      {/* Section 11: FAQ */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 lg:sticky lg:top-32 h-fit"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                {typograph("Частые ")}<span className="text-[#577E95]">{typograph("вопросы")}</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                {typograph("Собрали ответы на самые популярные вопросы от инженеров и руководителей эксплуатации.")}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <Accordion className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                    <AccordionTrigger className="text-lg md:text-xl font-display hover:no-underline hover:text-muted-foreground text-left py-6">
                      {typograph(faq.q)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pr-12">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{typograph(faq.a)}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead Magnet 4 (Focus Mode) */}
      <FocusScrollBlock bgClass="bg-[#182025]" shadowClass="shadow-[0_30px_60px_-15px_rgba(24,32,37,0.5)]">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-7xl py-16 md:py-24">
          <div className="max-w-2xl text-center lg:text-left">
            <Badge variant="outline" className="mb-6 rounded-none bg-white border-none text-[#182025]">{typograph("Инструмент для подготовки")}</Badge>
            <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 text-[#E6F0F4]">
              {typograph("Шаблон исходных данных для оценки шкафа автоматики")}
            </h3>
            <p className="text-[#E6F0F4] opacity-80 text-lg mb-8 leading-relaxed">
              {typograph("Подготовьте данные для инженера быстрее: скачайте шаблон, в котором перечислены параметры вентиляционной установки, шкафа, сигналов, требований к управлению и диспетчеризации.")}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-[#577E95] font-medium uppercase tracking-wider">
              <span>{typograph("Полезно инженеру")}</span>
              <span className="text-[#577E95]/50 px-2">•</span>
              <span>{typograph("Проектировщику")}</span>
              <span className="text-[#577E95]/50 px-2">•</span>
              <span>{typograph("Интегратору")}</span>
            </div>
          </div>
          <form className="w-full max-w-md lg:w-auto shrink-0 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Имя" className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12 w-full lg:w-80" />
            <Input placeholder="Компания" className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12 w-full lg:w-80" />
            <Input 
              placeholder="Email или телефон *" 
              required 
              value={contact1}
              onChange={(e) => setContact1(e.target.value)}
              className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12 w-full lg:w-80" 
            />
            <div className="pt-6">
              <Button 
                size="lg" 
                disabled={!contact1.trim()}
                className="w-full lg:w-80 h-14 rounded-full text-base bg-[#E6F0F4] text-[#182025] hover:bg-[#FAFCFD] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {typograph("Скачать шаблон")}
              </Button>
              <p className="text-[11px] text-[#577E95] text-center lg:text-left mt-4 leading-tight">
                {typograph("Скачивая шаблон, вы соглашаетесь с ")}<PrivacyModal><button type="button" className="underline underline-offset-2 hover:text-[#E6F0F4] transition-colors cursor-pointer">{typograph("Политикой конфиденциальности")}</button></PrivacyModal>
              </p>
            </div>
          </form>
        </div>
      </FocusScrollBlock>

      {/* Section 12: Final Form (Focus Mode) */}
      <div id="final-form">
        <FocusScrollBlock bgClass="bg-[#30637A]" shadowClass="shadow-2xl">
          <div className="container mx-auto px-4 md:px-6 w-full max-w-6xl py-16 md:py-24">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 rounded-none bg-white border-none text-[#182025]">{typograph("Инструмент для подготовки")}</Badge>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-8 text-[#E6F0F4] leading-tight">
                {typograph("Отправьте данные инженеру")}
              </h2>
              <p className="text-lg md:text-xl text-[#E6F0F4]/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                {typograph("Приложите исходные данные по вентиляционной системе. Мы изучим задачу и предложим следующий шаг: оценку, обследование, расчет или модернизацию.")}
              </p>
            </div>

            <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
                {/* Left Col */}
                <div className="space-y-8">
                  <h3 className="font-display font-medium text-2xl text-white border-b border-white/20 pb-4">Контактные данные</h3>
                  <div className="space-y-4">
                    <Input placeholder="Имя" className="bg-white/10 border-transparent focus:bg-white/20 focus:border-white text-white placeholder:text-white/50 rounded-none h-14 transition-colors text-lg" />
                    <Input placeholder="Компания" className="bg-white/10 border-transparent focus:bg-white/20 focus:border-white text-white placeholder:text-white/50 rounded-none h-14 transition-colors text-lg" />
                    <Input placeholder="Должность" className="bg-white/10 border-transparent focus:bg-white/20 focus:border-white text-white placeholder:text-white/50 rounded-none h-14 transition-colors text-lg" />
                    <Input 
                      placeholder="Телефон или Email *" 
                      required 
                      value={contact2}
                      onChange={(e) => setContact2(e.target.value)}
                      className="bg-white/10 border-transparent focus:bg-white/20 focus:border-white text-white placeholder:text-white/50 rounded-none h-14 transition-colors text-lg" 
                    />
                  </div>

                  <h3 className="font-display font-medium text-2xl text-white border-b border-white/20 pb-4 mt-12">Объект</h3>
                  <Input placeholder="Бизнес-центр, офис, коммерческий объект" className="bg-white/10 border-transparent focus:bg-white/20 focus:border-white text-white placeholder:text-white/50 rounded-none h-14 transition-colors text-lg" />
                </div>

                {/* Right Col */}
                <div className="space-y-8 flex flex-col h-full">
                  <h3 className="font-display font-medium text-2xl text-white border-b border-white/20 pb-4">Что нужно сделать</h3>
                  <textarea 
                    placeholder="Например: Собрать новый шкаф по проекту, модернизировать существующий, подключить к BMS..."
                    className="w-full bg-white/10 border-transparent p-6 min-h-[160px] rounded-none focus:outline-none focus:bg-white/20 focus:border-white text-white placeholder:text-white/50 transition-colors text-lg"
                  />

                  <h3 className="font-display font-medium text-2xl text-white border-b border-white/20 pb-4 mt-auto pt-8">Исходные данные</h3>
                  <div className="border border-dashed border-white/30 bg-white/5 hover:bg-white/10 transition-colors p-8 flex flex-col items-center justify-center cursor-pointer group mt-2 min-h-[140px]">
                    <Upload className="w-10 h-10 text-white/60 mb-4 group-hover:text-white transition-colors" />
                    <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">Загрузить фото/схемы/ТЗ/другое</span>
                    <span className="text-sm text-white/50 mt-2 text-center">До 10 МБ. Файлы: pdf, docx, jpg, png</span>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex flex-col items-center border-t border-white/20 pt-12">
                <Button 
                  size="lg" 
                  disabled={!contact2.trim()}
                  className="w-full md:w-auto px-20 h-20 text-xl rounded-full bg-white text-[#30637A] hover:bg-[#F3F7F9] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Отправить материалы
                </Button>
                <p className="text-xs text-white/60 text-center mt-6 leading-tight">
                  Отправляя данные, вы соглашаетесь с <PrivacyModal><button type="button" className="underline underline-offset-2 hover:text-white transition-colors cursor-pointer">Политикой конфиденциальности</button></PrivacyModal>
                </p>
                <p className="text-base text-white/50 mt-8 text-center max-w-xl">
                  Если полного комплекта документов нет, опишите задачу в свободной форме. 
                  Инженер подскажет, какие данные потребуются.
                </p>
              </div>
            </form>
          </div>
        </FocusScrollBlock>
      </div>
    </div>
  );
}
