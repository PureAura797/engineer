"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { typograph, formatContact, isValidContact } from "@/lib/utils";
import { PrivacyModal } from "@/components/ui/privacy-modal";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import { FocusScrollBlock } from "@/components/ui/focus-scroll-block";

export function Scenarios() {
  const [contact, setContact] = useState("");

  const scenarios = [
    {
      id: "item-1",
      title: "Сборка нового шкафа по проекту",
      situations: [
        "реконструкция офисного здания;",
        "fit-out;",
        "новый объект;",
        "замена шкафа по готовой документации;",
        "проект уже есть, нужен подрядчик на сборку, программирование и ПНР."
      ],
      text: "Собираем шкаф автоматики вентиляции по проектной документации или ТЗ заказчика. Проверяем состав компонентов, уточняем логику управления, программируем контроллер и готовим шкаф к запуску на объекте.",
      results: [
        "шкаф под конкретную вентиляционную установку;",
        "проверенную схему;",
        "собранное и промаркированное оборудование;",
        "подготовку к ПНР;",
        "документацию для эксплуатации."
      ]
    },
    {
      id: "item-2",
      title: "Модернизация существующего шкафа",
      situations: [
        "шкаф устарел;",
        "часть компонентов снята с производства;",
        "нет документации;",
        "вентиляция работает нестабильно;",
        "нужно обновить управление без полной переделки системы."
      ],
      text: "Обследуем действующий шкаф, анализируем схему и состав оборудования, определяем, что можно сохранить, а что нужно заменить. После этого предлагаем вариант модернизации: от замены отдельных компонентов до сборки нового шкафа.",
      results: [
        "понятный план модернизации;",
        "снижение риска лишней замены оборудования;",
        "обновленную логику управления;",
        "актуализацию документации;",
        "подготовку системы к дальнейшей эксплуатации."
      ]
    },
    {
      id: "item-3",
      title: "Интеграция вентиляции в диспетчеризацию",
      situations: [
        "в здании уже есть BMS;",
        "вентиляция работает отдельно;",
        "эксплуатация не видит аварии и статусы;",
        "нужно передавать параметры в единый интерфейс."
      ],
      text: "Настраиваем передачу данных от шкафа автоматики вентиляции в систему диспетчеризации здания. В зависимости от оборудования и архитектуры объекта могут передаваться статусы, аварии, режимы работы, параметры датчиков и команды управления.",
      results: [
        "вентиляция становится видимой для эксплуатации;",
        "аварии и статусы попадают в общую систему мониторинга;",
        "обслуживание становится понятнее;",
        "инженерная служба быстрее реагирует на отклонения."
      ]
    }
  ];

  return (
    <section id="scenarios" className="pt-16 md:pt-24 pb-0 bg-transparent relative z-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <m.div 
            initial={{ opacity: 0, x: -60, rotateY: -60 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            style={{ transformOrigin: "left center", transformPerspective: 1200 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              {typograph("Работаем с тремя ")}<span className="text-[#577E95]">{typograph("типовыми задачами")}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {typograph("Не даем длинный список услуг, а раскладываем нашу работу по понятным сценариям. Если у вас нестандартная задача — обсудим её индивидуально.")}
            </p>
          </m.div>
        </div>

        <m.div 
          initial={{ opacity: 0, x: -60, rotateY: -60 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          style={{ transformOrigin: "left center", transformPerspective: 1200 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1], delay: 0.03 }}
          className="mb-24"
        >
          <Accordion className="w-full" defaultValue={["item-1"]}>
            {scenarios.map((scenario) => (
              <AccordionItem key={scenario.id} value={scenario.id} className="border-border/50 py-2">
                <AccordionTrigger className="text-xl md:text-3xl font-display hover:no-underline hover:text-muted-foreground transition-colors py-6 data-[state=open]:text-primary">
                  {scenario.title}
                </AccordionTrigger>
                <AccordionContent className="pb-12">
                  <div className="pt-6">
                    <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/80 max-w-4xl mb-12">
                      {scenario.text}
                    </p>
                    
                    <div className="flex flex-col">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12 border-t border-border/50 pt-8 pb-8">
                        <div className="lg:col-span-1">
                          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{typograph("Для каких ситуаций")}</h4>
                        </div>
                        <div className="lg:col-span-3">
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                            {scenario.situations.map((sit, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-foreground/70">
                                <span className="text-muted-foreground/40 mt-0.5">—</span>
                                <span className="leading-relaxed">{typograph(sit)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12 border-t border-border/50 pt-8">
                        <div className="lg:col-span-1">
                          <h4 className="text-sm font-medium text-primary uppercase tracking-wider">{typograph("Что получает клиент")}</h4>
                        </div>
                        <div className="lg:col-span-3">
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                            {scenario.results.map((res, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-foreground">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                                <span className="font-medium leading-relaxed">{typograph(res)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </m.div>

      </div>

      <FocusScrollBlock bgClass="bg-[#182025]" shadowClass="shadow-[0_30px_60px_-15px_rgba(24,32,37,0.5)]">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center w-full max-w-6xl py-16 md:py-24 gap-12">
          <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">

            <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-[#E6F0F4]">
              {typograph("Когда шкаф автоматики пора модернизировать?")}
            </h3>
            <p className="text-[#E6F0F4] opacity-80 text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {typograph("Не уверены, нужен ли новый шкаф или достаточно модернизации? Подготовили короткий чек-лист признаков, по которым эксплуатация может оценить состояние автоматики вентиляции.")}
            </p>
          </div>
          
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h4 className="text-xl font-display font-medium mb-6 text-[#E6F0F4] text-center lg:text-left">{typograph("Скачать чек-лист")}</h4>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              if (isValidContact(contact)) {
                const link = document.createElement('a');
                link.href = '/downloads/check_list_modernizatsiya.docx';
                link.download = 'check_list_modernizatsiya.docx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder={typograph("Имя")} className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" />
                <Input placeholder={typograph("Компания")} className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" />
              </div>
              <Input 
                placeholder={typograph("Телефон или Email *")}
                required 
                value={contact}
                onChange={(e) => setContact(formatContact(e.target.value))}
                className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" 
              />
              <Button 
                type="submit" 
                disabled={!isValidContact(contact)}
                className="w-full rounded-full h-14 bg-[#E6F0F4] text-[#182025] hover:bg-[#FAFCFD] text-base font-medium transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {typograph("Скачать материал")}
              </Button>
              <p className="text-[11px] text-[#577E95] text-center mt-3 leading-tight">
                Нажимая кнопку, вы соглашаетесь с <PrivacyModal><button type="button" className="underline underline-offset-2 hover:text-[#E6F0F4] transition-colors cursor-pointer">Политикой конфиденциальности</button></PrivacyModal>
              </p>
            </form>
          </div>
        </div>
      </FocusScrollBlock>
    </section>
  );
}
